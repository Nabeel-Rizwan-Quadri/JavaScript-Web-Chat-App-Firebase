// const currentUser = localStorage.getItem('currentUser')
// const parsedUser = currentUser && JSON.parse(currentUser)

// if (parsedUser) {
//     location.href = 'dashboard/dashboard.html'
// }

const user = firebase.auth().currentUser;

if (user) {
  // User is signed in, see docs for a list of available properties
  // https://firebase.google.com/docs/reference/js/firebase.User
  location.href = '../../dashboard/dashboard.html'
  // ...
} 