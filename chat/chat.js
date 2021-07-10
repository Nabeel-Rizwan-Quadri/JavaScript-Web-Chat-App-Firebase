let message, userId, userAvatar, userName

firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user)
            userId = user.uid
            userAvatar = user.photoURL
            userName = user.displayName
            console.log(userName)
        } else {
            location.href = '../auth-screens/login/login.html'        }
      });

function submit(){
    let message = document.getElementById("userInput").value

    let messageInfo = {
        userId,
        userName,
        userAvatar,
        message,
        // createdOn = firebase.firestore.FieldValue.serverTimestamp().
    }

    // console.log(messageInfo)

    firebase.firestore().collection("Chats").add({messageInfo})
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });

    }

let displayData = () => {

    firebase.firestore().collection("Chats")
    .get()
    .then((querySnapshot) => {
        let htmldiv = ``
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            user = doc.data().messageInfo

            console.log(user)

            let position = userId == user.uid ? 'left': 'right'

            let status = userId == user.uid ? 'status offline': 'status online'
            
            let now = new Date()
            let time = now.toDateString()
            
            htmldiv += `<div class="answer ${position}">
                <div class="avatar">
                  <img src="${user.userAvatar}" alt="${user.userName}">
                  <div class="${status}"></div>
                </div>
                <div class="name">${user.userName}</div>
                <div class="text">
                  ${user.message}
                </div>
                <div class="time">${time}</div>
              </div>`;
            
            document.getElementById('chat').innerHTML = htmldiv
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

}
    
displayData()

let logout = () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        location.href = '../auth-screens/login/login.html'
    }).catch((error) => {
        // An error happened.
    });
}
