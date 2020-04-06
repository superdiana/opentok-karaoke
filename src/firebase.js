//import firebase from 'firebase'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import config from './config'

firebase.initializeApp(config.FIREBASE_CONFIG)

export default firebase