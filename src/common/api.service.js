import Vue from "vue"
import VueAxios from "vue-axios"
import axios from "axios"
import JwtService from "@/common/jwt.service"
import { API_URL } from "@/common/config"

const ApiService = {
  init() {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_URL

    Vue.axios.interceptors.request.use(request => {
      console.log("Request: ", request)
      return request
    })

    Vue.axios.interceptors.response.use(
      response => {
        console.log("Response: ", response)
        return response
      },
      error => {
        console.log("Error: ", error.response)
        return Promise.reject(error)
    })
  },
  setHeader() {
    Vue.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${JwtService.getToken()}`
  },
  get(resource) {
    return Vue.axios.get(resource).catch(error => {
      throw new Error(error)
    })
  },
  post(resource, params) {
    return Vue.axios.post(resource, params).catch(error => {
      throw new Error(error)
    })
  },
  patch(resource, params) {
    return Vue.axios.patch(resource, params).catch(error => {
      throw new Error(error)
    })
  },
  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(error)
    })
  }
}

export default ApiService

export const AuthService = {
  signup(params) {
    return ApiService.post("/v1/auth/signup", params)
  },
  signin(params) {
    return ApiService.post("/v1/auth/signin", params)
  },
  confirmEmail(params) {
    return ApiService.post("/v1/auth/confirm_email", params)
  },
  resetPassword(params) {
    return ApiService.post("/v1/auth/reset_password", params)
  },
  sendConfirmEmail(params) {
    return ApiService.post("/v1/auth/send_confirm_email", params)
  },
  sendResetPassword(params) {
    return ApiService.post("/v1/auth/send_reset_password", params)
  },
  signout() {
    return ApiService.get("/v1/auth/signout")
  },
  signoutAll() {
    return ApiService.get("/v1/auth/signout_all")
  },
  refreshToken() {
    return ApiService.get("/v1/auth/refresh_token")
  },
  update(params) {
    return ApiService.patch("/v1/auth/update", params)
  },
  delete() {
    return ApiService.post("/v1/auth/delete")
  }
}
