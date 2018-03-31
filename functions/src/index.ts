import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';
import { Notification } from './Interfaces';

const key = require('../key.json');
firebase.initializeApp({
    credential: firebase.credential.cert(key),
    databaseURL: "https://audition-007.firebaseio.com"
});

import Api from './Controllers/Api';


exports.api = functions.https.onRequest(Api);

exports.notification = functions.firestore.document('notifications/{notification_id}').onCreate(e => {

    const notification = <Notification>e.data.data();

    const sendNotification = function(data) {
        const headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Basic YWZlMjg2MmEtM2ZkNi00NjVkLWFiMGYtZWVmZjE5Y2FjMmU4"
        };

        const options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };

        const https = require('https');
        const req = https.request(options, function(raw) {
            raw.on('data', function(res) {
                e.data.ref.collection('logs').add(JSON.parse(res));
            });
        });
        req.end();
    };

    const message = {
        app_id: "95c83b8b-6be6-440c-ad96-f45d004c9e1f",
        contents: { "en": notification.body },
        headings: { "en": notification.title },
        included_segments: ["All"]
    };

    sendNotification(message);
});
