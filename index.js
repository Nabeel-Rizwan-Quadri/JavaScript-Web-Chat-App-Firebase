firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        location.href = 'chat/chat.html'
    }
})