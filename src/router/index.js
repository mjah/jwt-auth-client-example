import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history', // read https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/views/Home')
    },
    {
      name: 'signin',
      path: '/signin',
      component: () => import('@/views/Signin')
    },
    {
      name: 'signout',
      path: '/signout',
      component: () => import('@/views/Signout')
    },
    {
      name: 'signout_all',
      path: '/signout_all',
      component: () => import('@/views/Signout')
    },
    {
      name: 'signup',
      path: '/signup',
      component: () => import('@/views/Signup')
    },
    {
      name: 'forgot_password',
      path: '/forgot_password',
      component: () => import('@/views/ForgotPassword')
    },
    {
      name: 'reset_password',
      path: '/reset_password',
      component: () => import('@/views/ResetPassword')
    },
    {
      name: 'confirm_email',
      path: '/confirm_email',
      component: () => import('@/views/ConfirmEmail')
    },
    {
      name: 'account',
      path: '/account',
      component: () => import('@/views/restricted/Account')
    },
    {
      name: 'protected',
      path: '/protected',
      component: () => import('@/views/restricted/Protected')
    }
  ]
});
