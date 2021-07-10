var db = firebase.firestore();

//for session on bottom

let login = (e) => {
    console.log('event:', e)
    e.preventDefault()

    const email = document.getElementById('inputEmail').value
    const password = document.getElementById('inputPassword').value

    if (!email || !password) {
        return alert('Please enter all the fields')
    }

    

    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
        swal({
            title: "AWESOME!",
            text: "You have successfully logged in!",
            icon: "success",
        }).then((value) => {
            location.href = '../../dashboard/dashboard.html'
        });
  })
  
  .catch((error) => {
    var errorMessage = error.message;
    swal("ERROR", errorMessage, "error");
  });

}

function googleLogin() {

  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;

    location.href = '../../chat/chat.html'
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.error("Error:", errorMessage)
    // ...
  });
}

//for session
// const user = firebase.auth().currentUser;
// if (user !== null) {
//   location.href = '../../chat/chat.html'
// }