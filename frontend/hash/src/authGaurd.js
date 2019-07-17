import * as firebase from 'firebase'

export default (to, from, next) => {
  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      next({
        path: 'login'
      })
    } else {
      next()
    }
  })
}
