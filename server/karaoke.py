import json
import requests
import uuid
from flask import Flask, abort, request, jsonify, g
from flask_cors import CORS
from flask_socketio import SocketIO, join_room, emit, send
from opentok import OpenTok, Roles
from os import environ
from os.path import join, dirname
from db import db

app = Flask(__name__)

CORS(app)

app.url_map.strict_slashes = False

socketio = SocketIO(app, cors_allowed_origins="*")

opentok = OpenTok(environ.get("OPENTOK_API_KEY"),
                  environ.get("OPENTOK_API_SECRET"))

db.create_database()


@app.teardown_request
def teardown_request(exception):
    if hasattr(g, 'db'):
        g.db.close()


@app.route('/api/ping', methods=['GET'])
def api_ping():
    return jsonify({"status": "success"}), 200


@app.route('/api/room', methods=['GET'])
def api_get_all_rooms():
    room_data = db.query('SELECT * FROM rooms')
    return jsonify({"status": "success", "data": room_data}), 200


@app.route('/api/room', methods=['POST', 'OPTIONS'])
def api_create_room():
    params = request.get_json() or request.form or request.args

    if 'playlist_id' and 'owner' in params:
        # create OpenTok Session for room
        session = opentok.create_session(environ.get("OPENTOK_SESSION_HOST"))
        roomId = str(uuid.uuid4())
        db.create_room((
            roomId,
            session.session_id,
            params.get('playlist_id'),
            params.get('owner'),
            params.get('room_name')
        ))
        db.create_playlist_table((
            params.get('playlist_id')
        ))
    else:
        return jsonify({"status": "error", "message": "Required params not provided"}), 400
    return jsonify({"status": "success", "id": roomId}), 200


def get_playlist_items(playlist_id):
    response = requests.get(
        f'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId={playlist_id}&key={environ.get("YOUTUBE_API_KEY")}')
    return response.json()


# GET METHOD - GET ROOM BY ID
@app.route('/api/room/<id>', methods=['GET'])
def api_get_room_by_id(id):
    room_data = db.query(f'SELECT * FROM rooms WHERE id="{id}";')
    if room_data:
        return jsonify({"status": "success", "data": room_data}), 200
    return abort(404)

# POST METHOD - CREATE TOKEN BY ROOM ID
@app.route('/api/room/<id>/token', methods=['GET'])
def api_create_token(id):
    room_data = db.query(f'SELECT * FROM rooms WHERE id="{id}";')
    if room_data:
        token = opentok.generate_token(room_data[0].get("session"))
        if token:
            return jsonify({"status": "success", "token": token}), 200
    return abort(404)

# GET METHOD - GET PLAYLIST ITEMS BY ROOM ID
@app.route('/api/room/<id>/playlist', methods=['GET'])
def api_get_playlist(id):
    params = request.get_json() or request.form or request.args
    room_data = db.query(f'SELECT * FROM rooms WHERE id="{id}";')
    if room_data:
        playlist_id = room_data[0].get("playlist_id")
        if params.get("fetch"):
            # ideally this is a delta of the current table and incoming data to delete/add rows
            # for now I'm wiping the table and repopulating
            fetched_items = get_playlist_items(playlist_id)
            db.create_playlist_items(playlist_id, fetched_items.get("items"))
        playlist_items = db.query(f'SELECT * FROM "{playlist_id}";')
        return jsonify({"status": "success", "data": playlist_items}), 200
    return abort(404)

# the next two lines are needed if you start your app with python
if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=80)
    #socketio.run(app, debug=True, host='localhost', port=5000)
