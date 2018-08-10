const functions = require('firebase-functions');
const admin = require('firebase-admin');// // Create and Deploy Your First Cloud Functions
admin.initializeApp(functions.config().firebase);

// https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    var payload;
    if (request.body && request.body.token) {
        payload = {
            notification: {
                title: request.body.title,
                body: request.body.message,
                status: 'WOOH, it runs finnaly',
                click_action: request.body.action || 'www.example.com'
            }
        }
        admin.messaging().sendToDevice(request.body.token, payload)
    }
    response.json({ status: true });
});

exports.sendNotification = functions.database.ref('/user/{chatId}')
    .onWrite(e => {
        const payload = {
            title: 'title',
            body: 'body',
            status: 'fwe',
            click_action: 'www.example.com'
        }
        return admin.database.ref(`/users/${e.userId}`).once('value')
            .then(data => {
                if (!data.val()) return;
                const snapshot = data.val();
                const token = snapshot.token;
                return admin.messaging().sendToDevice(e.token, payload);
            })
    })