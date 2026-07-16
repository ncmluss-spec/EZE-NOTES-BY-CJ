import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getMessaging,
  getToken,
  onMessage
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyCVB2ugk1IxUGd4QHCesg3v0VqcFyxt0c8",
  authDomain: "eze-notes-by-cj.firebaseapp.com",
  projectId: "eze-notes-by-cj",
  storageBucket: "eze-notes-by-cj.firebasestorage.app",
  messagingSenderId: "156592482475",
  appId: "1:156592482475:web:5492a1702d4b92e6e1afee"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

Notification.requestPermission().then(async (permission) => {
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: "BPOMw56AZHGRYRZSAT2COvlLr-r80ubuYyOT6zHW_XyFmQmMhr0HARAUIwobrIEkh21k4luVtOyZeDVz5JpuHMA"
    });

    console.log("FCM Token:", token);

    // TODO:
    // Save this token in Firestore/Realtime Database
    // so you can send notifications to your users later.
  }
});

onMessage(messaging, (payload) => {
  alert(payload.notification.title + "\n" + payload.notification.body);
});
