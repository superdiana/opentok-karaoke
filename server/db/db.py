import sqlite3
from flask import g

DATABASE = './db/karaoke.db'

def create_database():
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()
    create_room_table = '{}{}'.format(
                        'CREATE TABLE IF NOT EXISTS ',
                        'rooms(session TEXT PRIMARY KEY, playlist TEXT)'
    )

    cursor.execute(create_room_table)

    connection.commit()
    connection.close()

    print('Database ready to go')

def make_dicts(cursor, row):
    return dict((cursor.description[idx][0], value)
                for idx, value in enumerate(row))

def connect():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

def query(query, args=(), one=False):
    conn = connect()
    conn.row_factory = make_dicts
    cur = conn.cursor()
    rv = cur.execute(query, args).fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv


def create_room(room):
    conn = connect()
    sql = 'INSERT INTO rooms VALUES(?,?)'
    cur = conn.cursor()
    cur.execute(sql, room)
    return cur.lastrowid


def delete_room(session):
    conn = connect()
    sql = 'DELETE FROM rooms WHERE session=?'
    cur = conn.cursor()
    cur.execute(sql, session)
    return cur.lastrowid
