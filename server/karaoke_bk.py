from opentok import OpenTok, Roles
from flask import Flask, abort, request, jsonify, g
from flask_cors import CORS
from flask_socketio import SocketIO, join_room, emit, send
from dotenv import load_dotenv
from os import environ
from os.path import join, dirname
import requests
import json
from db import db

# Get env vars from file
envpath = join(dirname(__file__), "./.env")
load_dotenv(envpath)

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

opentok = OpenTok(environ.get("OPENTOK_API_KEY"),
                  environ.get("OPENTOK_API_SECRET"))

rooms = {}
playlist_videos = {}
queue_count = {}
# queue backup for new connected people
queue = {}

db.create_database()

@app.teardown_request
def teardown_request(exception):
    if hasattr(g, 'db'):
        g.db.close()

@app.route('/api/ping', methods=['GET'])
def api_ping():
    return jsonify({"status": "success"}), 200

@app.route('/api/room', methods=['POST'])
def api_create_room():
    conn = db.connect()
    with conn:
        # create OpenTok Session for room
        session = opentok.create_session(environ.get("OPENTOK_SESSION_HOST"))
        db.create_room(conn, (session.session_id, None))
    return jsonify({"status": "success"}), 200

@app.route('/api/room/', methods=['GET'])
def api_get_all_rooms():
    room_data = db.query('SELECT * FROM rooms')
    return jsonify({"status": "success", "data": room_data}), 200

@app.route('/api/room/<id>', methods=['GET'])
def api_get_room_by_id(id):  
    room_data = db.query('SELECT * FROM rooms WHERE session=?;', (id,))
    if room_data:
        return jsonify({"status": "success", "data": room_data}), 200

    return abort(404)


@app.route('/api/room/<id>', methods=['PATCH'])
def api_update_room_by_id(id):
    # room_data = db.query('SELECT * FROM rooms WHERE session=?;', (id,))
    # if room_data:
    #     return jsonify({"status": "success", "data": room_data}), 200

    return jsonify({"status": "success"}), 200

@app.route('/api/room/<id>', methods=['DELETE'])
def api_delete_room_by_id(id):
    return jsonify({"status": "success"}), 200


@app.route('/api/room/<id>/token', methods=['POST'])
def api_create_token(id):
    print(id)
    # token = opentok.generate_token(session_id)
    return jsonify({"status": "success"}), 200


@app.route('/api/get-token', methods=['POST'])
def get_token():
    global rooms
    global queue_count
    #global playlist_room
    params = request.get_json() or request.form or request.args
    # This route its going to receive username and a user level
    if 'username' and 'userlevel' and 'room' in params:
        connection_metadata = "username={username},userLevel={userlevel}".format(
            username=params["username"], userlevel=params["userlevel"])
        # Verify if room exists, if not then create room and session id for room
        # If room exists create a token for user using the session id of the room
        if params['room'] not in rooms:
            # This method is going to return a session_id and a token
            session = opentok.create_session(environ.get("OPENTOK_SESSION_HOST"))
            token = opentok.generate_token(
            session.session_id, Roles.publisher, None, connection_metadata)
            rooms[params["room"]] = session.session_id
            queue_count[session.session_id] = 0
            queue[session.session_id] = []
            #playlist_room[session.session_id] = []
            return jsonify({"status": "success", "token": token, "session_id": session.session_id}), 200
        else:
            token = opentok.generate_token(
                rooms[params['room']], Roles.publisher, None, connection_metadata)
            return jsonify({"status": "success", "token": token, "session_id": rooms[params['room']]}), 200

    else:
        return jsonify({"status": "error", "message": "Required params not provided"}), 200

# We decided get the playlist information from here. And put the data available for the room passing the sameone with request or sockets
@app.route('/api/get-videos-from-playlist', methods=['GET'])
def get_videos():
    global playlist_videos
    global rooms
    params = request.get_json() or request.form or request.args
    if 'playlist_id' and 'room' in params:
        if params["room"] in rooms:
            if params["playlist_id"] in playlist_videos:
                # The playlist exist already. then just retieve it
                data = playlist_videos[params["playlist_id"]]
                # create a litte wrapper
                data = {"status": "success", "playlist": data}
            else:
                # The playlist not exist. Then retrieve from youtube API, save it in playlist_videos and then return it to client
                try:
                    print(params["playlist_id"]+" " +
                          environ.get("YOUTUBE_API_KEY"))
                    data = json.loads(requests.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId={}&key={}'.format(
                        params["playlist_id"], environ.get("YOUTUBE_API_KEY"))).text)
                    playlist_videos[params["playlist_id"]] = data
                    # create a litte wrapper
                    data = {"status": "success", "playlist": data}
                except:
                    print("Error when trying to return videos")
                    data = {"status": "error",
                            "message": "Error when trying to return videos"}
            return jsonify(data), 200
        else:
            return jsonify({"status": "error", "message": "Room not found"}), 200
    else:
        return jsonify({"status": "error", "message": "Required params not provided"}), 200


@app.route('/api/get-queue-count', methods=['GET'])
def get_queue_count():
    global queue_count
    global rooms
    params = request.get_json() or request.form or request.args
    if 'room' in params:
        return jsonify({"status": "success", "queue_count": queue_count[rooms[params["room"]]]}), 200
    else:
        return jsonify({"status": "error", "message": "Required params not provided"}), 200


@socketio.on('join.room')
def on_create(data):
    global rooms
    global queue
    # This method add user to room - room is the session_id from opentok
    if data["room"] in rooms:
        join_room(rooms[data["room"]])
        # Send queue backup when people connected to room
        emit('join.room', {'message': 'Conneted to room: {room} / {room_id}'.format(
            room=data["room"], room_id=rooms[data["room"]]), 'email': data["email"], 'queue': queue[rooms[data["room"]]]})
    else:
        emit('join.room', {'message': 'Not connected because room not found'})


@socketio.on('share.video.stream')
def on_share_video_stream(data):
    global rooms
    # sending to all clients in room except sender
    print(data)
    emit('share.video.stream', data["selector"], room=rooms[data["room"]])

# A queue count for room is necesary to start functionality
@socketio.on('add.to.queue')
def on_add_queue(data):
    global rooms
    global queue_count
    global queue
    # sending to all clients in room except sender
    # print(data)
    queue_count[rooms[data["room"]]] += 1
    # add queue backup in server
    queue[rooms[data["room"]]].append({'vid': data["vid"], 'vname': data["vname"], 'vimage': data["vimage"],
                                       'username': data["username"], 'useremail': data["useremail"], 'videoselector': data["videoselector"]})
    emit('add.to.queue', {'vid': data["vid"], 'vname': data["vname"], 'vimage': data["vimage"], 'username': data["username"],
                          'useremail': data["useremail"], 'videoselector': data["videoselector"], 'queue_count': queue_count[rooms[data["room"]]]}, room=rooms[data["room"]])


@socketio.on('sub.queue')
def on_sub_queue(data):
    global queue_count
    global queue
    queue_count[rooms[data["room"]]] -= 1
    # slice first position of queue
    del queue[rooms[data["room"]]][0:1]
    emit('sub.queue', {}, room=rooms[data["room"]])

# Case to send message to specific client


# the next two lines are needed if you start your app with python
if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=80)
    #socketio.run(app, debug=True, host='localhost', port=5000)
