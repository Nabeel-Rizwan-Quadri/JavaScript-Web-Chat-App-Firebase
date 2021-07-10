let message, userId, userAvatar, userName
let nameDiv = ``
$(document).ready(function() {
    $('#action_menu_btn').click(function() {
        $('.action_menu').toggle();
    });
});

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user)
        userId = user.uid
        userAvatar = user.photoURL
        userName = user.displayName

        nameDiv = `
        
        
            <span >
                <img src="${userAvatar}" class="rounded-circle user_img_msg">
            </span>

            <span >
            <h6>${userName}: </h6>
            </span>
              
        `
        document.getElementById("chatName").innerHTML = nameDiv
        console.log(userId)
    } else {
        location.href = '../auth-screens/login/login.html'
    }
});

let logout = () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        location.href = '../auth-screens/login/login.html'
    }).catch((error) => {
        // An error happened.
    });
}

function submit() {
    let message = document.getElementById("userInput").value
    let now = new Date()
    let createdOn = now.toDateString()

    let messageInfo = {
        userId,
        userName,
        userAvatar,
        message,
        createdOn
        // createdOn = firebase.firestore.FieldValue.serverTimestamp().
    }

    // console.log(messageInfo)

    firebase.firestore().collection("chats").add({ messageInfo })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

}

let displayData = () => {

    firebase.firestore().collection("chats").orderBy("createdOn")
        // .orderBy("createdOn", "desc")
        .onSnapshot((querySnapshot) => {
            let htmldiv = ``
            querySnapshot
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots

                user = doc.data().messageInfo

                console.log(user)

                console.log(userId)
                console.log(user.userId)

                let position = userId == user.userId ? 'd-flex justify-content-end mb-4' : 'd-flex justify-content-start mb-4'

                let status = userId == user.uid ? 'offline' : 'online'

                htmldiv += `
                <div class="${position}">
                </div>
                <div class="${position}">
                    <div class="img_cont">
                        <img src="${user.userAvatar}" class="rounded-circle user_img_msg">
                        <span class="${status}" class="offline"></span>
                    </div>
                    <div class="msg_cotainer">
                    <h6>${user.userName}: </h6>
                        ${user.message}
                    <span class="msg_time">${user.createdOn}</span>
                    </div>     
                </div>`;

                document.getElementById('chat').innerHTML = htmldiv
            });
        })


}

displayData()