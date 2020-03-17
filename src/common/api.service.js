import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
  },
  get(resource, config = null) {
    return Vue.axios.get(resource, config);
  },
  post(resource, data, config = null) {
    return Vue.axios.post(resource, data, config);
  },
  patch(resource, data, config = null) {
    return Vue.axios.patch(resource, data, config);
  },
  delete(resource, config = null) {
    return Vue.axios.delete(resource, config);
  }
};

export default ApiService;

export const AuthService = {
  getDefaultConfig() {
    return {
      baseURL: process.env.VUE_APP_AUTH_API,
      withCredentials: true
    };
  },
  signup(data) {
    return ApiService.post('/signup', data, this.getDefaultConfig());
  },
  signin(data) {
    return ApiService.post('/signin', data, this.getDefaultConfig());
  },
  userDetails() {
    return ApiService.get('/user', this.getDefaultConfig());
  },
  refreshToken() {
    return ApiService.get('/refresh-token', this.getDefaultConfig());
  },
  signout() {
    return ApiService.get('/signout', this.getDefaultConfig());
  },
  signoutAll() {
    return ApiService.get('/signout-all', this.getDefaultConfig());
  },
  sendResetPassword(data) {
    return ApiService.post(
      '/send-reset-password',
      data,
      this.getDefaultConfig()
    );
  },
  resetPassword(data) {
    return ApiService.post('/reset-password', data, this.getDefaultConfig());
  },
  sendConfirmEmail(data) {
    return ApiService.post(
      '/send-confirm-email',
      data,
      this.getDefaultConfig()
    );
  },
  confirmEmail(data) {
    return ApiService.post('/confirm-email', data, this.getDefaultConfig());
  },
  update(data) {
    return ApiService.patch('/user', data, this.getDefaultConfig());
  },
  delete() {
    return ApiService.delete('/user', this.getDefaultConfig());
  }
};
