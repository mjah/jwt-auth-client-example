import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import { API_URL } from '@/common/config';

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;

    Vue.axios.interceptors.request.use(request => {
      console.log('Request: ', request);
      return request;
    });

    Vue.axios.interceptors.response.use(
      response => {
        console.log('Response: ', response);
        return response;
      },
      error => {
        console.log('Error: ', error.response);
        return Promise.reject(error);
      }
    );
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
      withCredentials: true
    };
  },
  signup(data) {
    return ApiService.post('/v1/auth/signup', data, this.getDefaultConfig());
  },
  signin(data) {
    return ApiService.post('/v1/auth/signin', data, this.getDefaultConfig());
  },
  confirmEmail(data) {
    return ApiService.post(
      '/v1/auth/confirm_email',
      data,
      this.getDefaultConfig()
    );
  },
  resetPassword(data) {
    return ApiService.post(
      '/v1/auth/reset_password',
      data,
      this.getDefaultConfig()
    );
  },
  sendConfirmEmail(data) {
    return ApiService.post(
      '/v1/auth/send_confirm_email',
      data,
      this.getDefaultConfig()
    );
  },
  sendResetPassword(data) {
    return ApiService.post(
      '/v1/auth/send_reset_password',
      data,
      this.getDefaultConfig()
    );
  },
  userDetails() {
    return ApiService.get('/v1/auth/user_details', this.getDefaultConfig());
  },
  signout() {
    return ApiService.get('/v1/auth/signout', this.getDefaultConfig());
  },
  signoutAll() {
    return ApiService.get('/v1/auth/signout_all', this.getDefaultConfig());
  },
  refreshToken() {
    return ApiService.get('/v1/auth/refresh_token', this.getDefaultConfig());
  },
  update(data) {
    return ApiService.patch('/v1/auth/update', data, this.getDefaultConfig());
  },
  delete() {
    return ApiService.delete('/v1/auth/delete', this.getDefaultConfig());
  }
};
