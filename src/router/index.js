import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
  mode: 'history', // read https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
  routers: [
    {
      name: "home",
      path: "/",
      component: () => import("@/views/Home")
    },
    {
      name: "signin",
      path: "/signin",
      component: () => import("@/views/Signin")
    },
    {
      name: "signup",
      path: "/signup",
      component: () => import("@/views/Signup")
    },
    {
      name: "forgotpassword",
      path: "/forgotpassword",
      component: () => import("@/views/ForgotPassword")
    },
    {
      name: "resetpassword",
      path: "/resetpassword",
      component: () => import("@/views/ResetPassword")
    },
    {
      name: "confirm",
      path: "/confirm",
      component: () => import("@/views/Confirm")
    },
    {
      name: "profile",
      path: "/profile",
      component: () => import("@/views/restricted/Profile")
    },
    {
      name: "protected",
      path: "/protected",
      component: () => import("@/views/restricted/Protected")
    },
  ]
})
