
var config = {
    apiKey: "AIzaSyCN78iJktEc6i6j4XxQ56at8MHc4HFu8oU",
    authDomain: "learning-notifications.firebaseapp.com",
    databaseURL: "https://learning-notifications.firebaseio.com",
    projectId: "learning-notifications",
    storageBucket: "learning-notifications.appspot.com",
    messagingSenderId: "785566758980"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
const databaseRef = firebase.database()
messaging.requestPermission()
    .then(_ => {
        return messaging.getToken();
    })
    .then(token => {
        databaseRef.ref('tokens').push({ token });
        console.log('token>>>', token);
    })
    .catch(err => {
        console.log('Unable to get permission!');
    })

messaging.onMessage(function (payload) {
    console.log('message', payload);
})

navigator.serviceWorker.register('firebase-messaging-sw.js')
    .then(reg => {
        reg.pushManager.subscribe({
            userVisibleOnly: true
        })
            .then(subscription => {
                console.log('subscription', subscription.toJSON())
                console.log('endpoint: ', subscription.endpoint)
            });
    });