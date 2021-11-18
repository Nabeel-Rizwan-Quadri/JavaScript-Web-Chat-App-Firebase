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
            <h6>${userName}</h6>
            </span>
        `

        imgDiv = `
            <span >
                <img src="${userAvatar}" class="rounded-circle user_img_msg">
            </span>
        `
        document.getElementById("chatName").innerHTML = nameDiv
        document.getElementById("chatImg").innerHTML = imgDiv
            // console.log(userId)
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
        console.log(error.message)
    });
}

async function submit() {
    let message = document.getElementById("userInput").value
    let createdOn = Date.now()

    let messageInfo = {
        userId,
        userName,
        userAvatar,
        message,
        createdOn
        // createdOn = firebase.firestore.FieldValue.serverTimestamp().
    }

    console.log(typeof(messageInfo))

    // console.log(messageInfo)

    await firebase.firestore().collection("chats").add({ messageInfo })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    window.scrollTo(0,document.body.scrollHeight);
}

let displayData = () => {

    firebase.firestore().collection("chats")
        .orderBy("messageInfo.createdOn")
        .onSnapshot((querySnapshot) => {
            let htmldiv = ``
            querySnapshot
            querySnapshot.forEach((doc) => {

                user = doc.data().messageInfo

                let condition = userId == user.userId ? true : false

                if(condition){
                    htmldiv += `
                    <div class="container darker">
                    <h3>${user.userName}<h3/>
                    <img src="${user.userAvatar}" alt="Avatar" class="right">
                    <p>${user.message}</p>
                    <span class="time-left">${Date(user.createdOn).slice(0, 21)}</span>
                    </div>`;
                }
                else{
                    htmldiv += `
                    <div class="container">
                    <h3>${user.userName}<h3/>
                    <img src="${user.userAvatar}" alt="Avatar">
                    <p>${user.message}</p>
                    <span class="time-right">${Date(user.createdOn).slice(0, 21)}</span>
                    </div>`;
                }
                document.getElementById('chat').innerHTML = htmldiv
            });
        })
}

displayData()