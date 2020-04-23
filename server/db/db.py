import sqlite3
from flask import g
import os

DATABASE = './server/db/karaoke.db'

def create_database():
    # if os.path.exists(DATABASE):
    #     os.remove(DATABASE)

    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    create_room_table = '''CREATE TABLE IF NOT EXISTS rooms(
                        id TEXT PRIMARY KEY,
                        session TEXT NOT NULL,
                        playlist_id TEXT NOT NULL,
                        owner TEXT NOT NULL,
                        room_name TEXT,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP); '''
    
    cur.execute(create_room_table)
    conn.commit()
    conn.close()
    print('Database ready to go')

def connect():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE, isolation_level=None)
    return db

def make_dicts(cursor, row):
    return dict((cursor.description[idx][0], value)
                for idx, value in enumerate(row))

def query(query, args=(), one=False):
    conn = connect()
    conn.row_factory = make_dicts
    cur = conn.cursor()
    rv = cur.execute(query, args).fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv


def create_room(room):
    conn = connect()
    sql = 'INSERT INTO rooms(id,session,playlist_id,owner,room_name) VALUES(?,?,?,?,?)'
    cur = conn.cursor()
    cur.execute(sql, room)
    return cur.lastrowid


def delete_room(session):
    conn = connect()
    sql = 'DELETE FROM rooms WHERE session=?'
    cur = conn.cursor()
    cur.execute(sql, session)
    return cur.lastrowid

def create_playlist_table(playlist_id):
    conn = connect()
    cur = conn.cursor()

    create_playlist_table = f'''CREATE TABLE IF NOT EXISTS "{playlist_id}"(
                            video_id TEXT PRIMARY KEY,
                            title TEXT NOT NULL,
                            thumbnail_url TEXT NOT NULL,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);'''

    cur.execute(create_playlist_table)

    conn.commit()
    conn.close()

    print('Database ready to go')


def create_playlist_items(playlist_id, items):
    conn = connect()
    sql = f'''INSERT INTO "{playlist_id}"(video_id,title,thumbnail_url) 
                    VALUES '''

    items_len = len(items)-1
    for index, item in enumerate(items):
        sql = f'{sql} (\"{item["snippet"]["resourceId"]["videoId"]}\",\"{item["snippet"]["title"]}\",\"{item["snippet"]["thumbnails"]["default"]["url"]}\")'
        if index == items_len:
            sql = sql + ";"
        else:
            sql = sql + ","
    cur = conn.cursor()
    cur.execute(f'DELETE FROM "{playlist_id}";')
    cur.execute(sql)
    return cur.lastrowid
