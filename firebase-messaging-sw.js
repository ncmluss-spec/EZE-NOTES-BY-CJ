importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCVB2ugk1IxUGd4QHCesg3v0VqcFyxt0c8",
  authDomain: "eze-notes-by-cj.firebaseapp.com",
  projectId: "eze-notes-by-cj",
  storageBucket: "eze-notes-by-cj.firebasestorage.app",
  messagingSenderId: "156592482475",
  appId: "1:156592482475:web:5492a1702d4b92e6e1afee"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo.png"
  });
});
