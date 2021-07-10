var db = firebase.firestore();
// const userId = firebase.auth().currentUser.user.uid;
let message, userId, userAvatar, userName

firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        location.href = '../auth-screens/login/login.html'
            // ...
    } else {
  
        userId = user.
        userAvatar = 
        userName =

        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        // User is signed out
        // ...
    }
});

function submit(){
    let message = document.getElementById("userInput").value
    let messageInfo = {
        message,
        userId,
        userAvatar,
        userName
    }

}

let logout = () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        location.href = '../auth-screens/login/login.html'
    }).catch((error) => {
        // An error happened.
    });
}

//firebase username on dashboard
// console.log(userName)
// document.getElementById('userName').innerText = `Welcome ${userName}!`