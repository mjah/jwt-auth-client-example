import { AuthService } from "@/common/api.service"
import JwtService from "@/common/jwt.service"
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN
} from "@/common/jwt.service"
import {
  CHECK_AUTH,
  SIGNUP,
  SIGNIN,
  SIGNOUT,
  SIGNOUT_ALL
} from "@/store/actions.type"
import {
  SET_REFRESH_TOKEN,
  SET_ACCESS_TOKEN,
  SET_USER,
  SET_ERROR,
  PURGE_AUTH
} from "@/store/mutations.type"

const state = {
  errors: null,
  user: null,
  isAuthenticated: !!JwtService.getToken(REFRESH_TOKEN)
}

const getters = {
  currentUser(state) {
    return state.user
  },
  isAuthenticated(state) {
    return state.isAuthenticated
  }
}

const actions = {
  [CHECK_AUTH](context) {
    if (JwtService.getToken(REFRESH_TOKEN)) {
      AuthService.userDetails()
        .then(response => {
          context.commit(SET_USER, response.data.details)
        })
        .catch(error => {
          context.commit(SET_ERROR, error.response.data.error)
          context.commit(PURGE_AUTH)
        })
    } else {
      context.commit(PURGE_AUTH)
    }
  },
  [SIGNIN](context, payload) {
    return new Promise(resolve => {
      AuthService.signin(payload)
        .then(response => {
          context.commit(SET_REFRESH_TOKEN, response.data.refresh_token)
          context.commit(SET_ACCESS_TOKEN, response.data.access_token)
          resolve(response)
        })
        .catch(error => {
          context.commit(SET_ERROR, error.response.data.error)
        })
    })
  },
  [SIGNUP](context, payload) {
    return new Promise(resolve => {
      AuthService.signup(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          context.commit(SET_ERROR, error.response.data.error)
        })
    })
  },
  [SIGNOUT](context) {
    return new Promise(resolve => {
      AuthService.signout()
        .then(response => {
          context.commit(PURGE_AUTH)
          resolve(response)
        })
        .catch(error => {
          context.commit(PURGE_AUTH)
          context.commit(SET_ERROR, error.response.data.error)
        })
    })
  },
  [SIGNOUT_ALL](context) {
    return new Promise(resolve => {
      AuthService.signoutAll()
        .then(response => {
          context.commit(PURGE_AUTH)
          resolve(response)
        })
        .catch(error => {
          context.commit(PURGE_AUTH)
          context.commit(SET_ERROR, error.response.data.error)
        })
    })
  }
}

const mutations = {
  [SET_ERROR](state, error) {
    if (typeof error.Description !== "undefined") state.errors = [error.Description]
    else state.errors = ["An error has occurred."]
  },
  [SET_REFRESH_TOKEN](state, refreshToken) {
    JwtService.saveToken(REFRESH_TOKEN, refreshToken)
  },
  [SET_ACCESS_TOKEN](state, accessToken) {
    JwtService.saveToken(ACCESS_TOKEN, accessToken)
  },
  [SET_USER](state, user) {
    state.errors = null
    state.user = user
    state.isAuthenticated = true
  },
  [PURGE_AUTH](state) {
    state.errors = null
    state.user = null
    state.isAuthenticated = false
    JwtService.destroyToken(REFRESH_TOKEN)
    JwtService.destroyToken(ACCESS_TOKEN)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
