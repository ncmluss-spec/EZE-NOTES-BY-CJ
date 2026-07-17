import {
getFirestore,
collection,
addDoc,
serverTimestamp,
query,
orderBy,
onSnapshot,
doc,
updateDoc,
deleteDoc,
increment
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
getAuth
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const auth = getAuth(app);

const firebaseConfig = {
apiKey: "AIzaSyCVB2ugk1IxUGd4QHCesg3v0VqcFyxt0c8",
authDomain: "eze-notes-by-cj.firebaseapp.com",
projectId: "eze-notes-by-cj",
storageBucket: "eze-notes-by-cj.firebasestorage.app",
messagingSenderId: "156592482475",
appId: "1:156592482475:web:5492a1702d4b92e6e1afee"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const postBtn = document.getElementById("postBtn");
const commentsDiv = document.getElementById("comments");


postBtn.onclick = async ()=>{

const user = auth.currentUser;

const username = user ? (user.displayName || user.email) : "Guest";

const comment = document.getElementById("comment").value.trim();

if(comment==""){
alert("Write a comment first");
return;
}

await addDoc(collection(db,"comments"),{

uid:user ? user.uid : "guest",

name:username,

comment:comment,

likes:0,

time:serverTimestamp()

});

document.getElementById("comment").value="";

}


const q = query(
collection(db,"comments"),
orderBy("time","desc")
);

onSnapshot(q,(snapshot)=>{

commentsDiv.innerHTML="";

snapshot.forEach((doc)=>{

const data = doc.data();

commentsDiv.innerHTML += `

<div class="comment-card">

<div class="comment-name">
👤 ${data.name}
</div>

<div class="comment-time">
🕒 ${data.time?.toDate().toLocaleString() || "Just now"}
</div>

<div class="comment-text">
${data.comment}
</div>

<div class="comment-actions">

<button
class="action-btn"
onclick="likeComment('${doc.id}')">

❤️ ${data.likes}

</button>

${
auth.currentUser &&
auth.currentUser.uid===data.uid ?

`<button
class="action-btn"
onclick="deleteComment('${doc.id}')">

🗑 Delete

</button>`

:""

}

</div>

</div>

`;


});

});

window.likeComment = async(id)=>{

await updateDoc(
doc(db,"comments",id),
{
likes:increment(1)
}
);

}

window.deleteComment = async(id)=>{

if(confirm("Delete this comment?")){

await deleteDoc(
doc(db,"comments",id)
);

}

}
