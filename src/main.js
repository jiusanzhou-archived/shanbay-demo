if(!window.store.enabled){window.swal('Sorry')}
import Vue from 'vue'
import Router from 'vue-router'
import { domain, fromNow } from './filters'
import App from './components/App.vue'
import Home from './components/Home.vue'
import About from './components/About.vue'

import LoginRegister from './components/LoginRegister.vue'


import UserView from './components/UserView.vue'

import shanbay from './components/lib/store.js'

Vue.config.debug = true
// install router
Vue.use(Router)
Vue.use(require('vue-resource'))
Vue.use(require('vue-async-data'))

// register filters globally
Vue.filter('fromNow', fromNow)
Vue.filter('domain', domain)

// routing
var router = new Router()


router.map({
  '/login-register/:action': {
    component: LoginRegister
  },

  '/': {
    component: Home
  },
  '/user': {
    component: UserView
  },
  'about': {
    component: About
  }
})

router.redirect({
  '*': '/'
})

if(!shanbay.userinfo.get()||!shanbay.auth.get()){
  router.go('/about')
}

router.start(App, 'app')
