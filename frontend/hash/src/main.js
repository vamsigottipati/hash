import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import * as firebase from 'firebase'
import vueResource from 'vue-resource'
Vue.use(vueResource)

Vue.config.productionTip = false

var VueScrollTo = require('vue-scrollto')

Vue.use(VueScrollTo, {
  container: 'body',
  duration: 1000,
  easing: 'ease-in-out',
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

var firebaseConfig = {
  apiKey: 'AIzaSyAObAgrd8JXwGImpzHQs_ASR_lXHlANqWw',
  authDomain: 'sip-bphc.firebaseapp.com',
  databaseURL: 'https://sip-bphc.firebaseio.com',
  projectId: 'sip-bphc',
  storageBucket: 'sip-bphc.appspot.com',
  messagingSenderId: '505335552459'
}

firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
