import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';

const key = require('../key.json');
firebase.initializeApp({
    credential: firebase.credential.cert(key),
    databaseURL: "https://audition-007.firebaseio.com"
});

import Api from './Controllers/Api';


exports.api = functions.https.onRequest(Api);
