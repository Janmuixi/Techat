// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import firebaseConfig from './components/firebaseConfig'

Vue.config.productionTip = false
firebase.initializeApp(firebaseConfig)

let app
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: { App }
    })
  }
/* eslint-disable no-new */
})
