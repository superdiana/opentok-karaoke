# opentok-karaoke

## Local deployment

Install app packages, React, opentok

```sh
npm install
```

### Init the Client - React app (For debugging)

```sh
npm start
```

If you have issues starting the app in WSL, then execute the next command first:

```sh
export PATH=$PATH:/mnt/c/Windows/System32
```

Expose your App using ngrok

```sh
ngrok http 3000
```

It's important to use the **https url**, browsers block media resources if you use **http**

### Init the server

CD to `server`

Then execute the command to install requirements:

```sh
pip install -r requirements.txt
```

Execute the command to start the flask application (We will use socketIO to send messages to the room)

```sh
python karaoke.py
```

If you are fan of gunicorn, then please comment the last two lines in the `karaoke.py` script and execute the command:

```sh
gunicorn -b 0.0.0.0:80 --worker-class eventlet karaoke:app
```

Expose the url with ngrok

```sh
ngrok http 80
```

Then copy the https url and paste in the configuration file. This url is used for the react client to create the opentok session and admin users in the opentok session
