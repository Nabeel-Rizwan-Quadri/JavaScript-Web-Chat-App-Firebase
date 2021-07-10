var db = firebase.firestore();
// const userId = firebase.auth().currentUser.user.uid;
var uid

firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        location.href = '../auth-screens/login/login.html'
            // ...
    } else {
        uid = user.uid
        var docRef = db.collection("user").doc(uid);

        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                console.log("Document data:", doc.data().username);

                userName = doc.data().username
                console.log(userName)
                document.getElementById('userName').innerText = `Welcome ${userName}!`

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        // User is signed out
        // ...
    }
});

function submit(){
    let message = document.getElementById("userInput").value
    
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