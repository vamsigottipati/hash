import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'
import profile from './views/profile'
import login from './views/login'
import code from './views/code'
import collab from './views/collab'
import showcase from './views/showcase'
import messages from './views/messages'
import signup from './views/signup'
import authGaurd from './authGaurd'
import singlePost from './views/singlePost'
import test from './views/test'
import test2 from './views/test2'

Vue.use(Router)

export default new Router({
  // mode: process.env.CORDOVA_PLATFORM ? 'hash' : 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: 'home'
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      beforeEnter: authGaurd
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/test2',
      name: 'test2',
      component: test2
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
      beforeEnter: authGaurd
    },
    {
      path: '/singlePost/:id',
      name: 'singlePost',
      component: singlePost,
      beforeEnter: authGaurd
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '/code',
      name: 'code',
      component: code,
      beforeEnter: authGaurd
    },
    {
      path: '/collab',
      name: 'collab',
      component: collab,
      beforeEnter: authGaurd
    },
    {
      path: '/showcase',
      name: 'showcase',
      component: showcase,
      beforeEnter: authGaurd
    },
    {
      path: '/messages',
      name: 'messages',
      component: messages,
      beforeEnter: authGaurd
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
