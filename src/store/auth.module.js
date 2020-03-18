import { AuthService } from '@/common/api.service';
import JwtService from '@/common/jwt.service';
import { ACCESS_TOKEN } from '@/common/jwt.service';
import {
  CHECK_AUTH,
  SIGNUP,
  SIGNIN,
  SIGNOUT,
  SIGNOUT_ALL,
  SEND_RESET_PASSWORD,
  RESET_PASSWORD,
  SEND_CONFIRM_EMAIL,
  CONFIRM_EMAIL,
  UPDATE_USER,
  DELETE_USER
} from '@/store/actions.type';
import {
  SET_ACCESS_TOKEN,
  SET_USER,
  SET_ERROR,
  PURGE_AUTH
} from '@/store/mutations.type';

const nullUser = {
  FirstName: null,
  LastName: null,
  Email: null,
  Username: null,
  IsConfirmedEmail: null
};

const state = {
  errors: null,
  user: nullUser,
  isAuthenticated: !!JwtService.getToken(ACCESS_TOKEN)
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

const actions = {
  [CHECK_AUTH](context) {
    if (JwtService.getToken(ACCESS_TOKEN)) {
      AuthService.userDetails()
        .then(response => {
          context.commit(SET_USER, response.data.details);
        })
        .catch(() => {
          context.commit(PURGE_AUTH);
        });
    } else {
      context.commit(PURGE_AUTH);
    }
  },
  [SIGNUP](context, payload) {
    return new Promise(resolve => {
      AuthService.signup(payload)
        .then(response => {
          context.commit(SET_ERROR, null);
          resolve(response);
        })
        .catch(error => {
          if (!error.response)
            context.commit(SET_ERROR, 'Signup currently unavailable.');
          else context.commit(SET_ERROR, error.response.data.error);
        });
    });
  },
  [SIGNIN](context, payload) {
    return new Promise(resolve => {
      AuthService.signin(payload)
        .then(response => {
          context.commit(SET_ERROR, null);
          context.commit(SET_ACCESS_TOKEN, response.data.access_token);
          resolve(response);
        })
        .catch(error => {
          if (!error.response)
            context.commit(SET_ERROR, 'Signin currently unavailable.');
          else context.commit(SET_ERROR, error.response.data.error);
        });
    });
  },
  [SIGNOUT](context) {
    return new Promise(resolve => {
      AuthService.signout()
        .then(response => {
          context.commit(PURGE_AUTH);
          resolve(response);
        })
        .catch(error => {
          context.commit(PURGE_AUTH);
          context.commit(SET_ERROR, error.response.data.error);
        });
    });
  },
  [SIGNOUT_ALL](context) {
    return new Promise(resolve => {
      AuthService.signoutAll()
        .then(response => {
          context.commit(PURGE_AUTH);
          resolve(response);
        })
        .catch(error => {
          context.commit(PURGE_AUTH);
          context.commit(SET_ERROR, error.response.data.error);
        });
    });
  },
  [SEND_RESET_PASSWORD](context, payload) {
    return new Promise(resolve => {
      AuthService.sendResetPassword(payload)
        .then(response => {
          context.commit(SET_ERROR, null);
          resolve(response);
        })
        .catch(error => {
          context.commit(SET_ERROR, error.response.data.error);
        });
    });
  },
  [RESET_PASSWORD](context, payload) {
    return new Promise(resolve => {
      AuthService.resetPassword(payload)
        .then(response => {
          context.commit(PURGE_AUTH);
          resolve(response);
        })
        .catch(error => {
          context.commit(SET_ERROR, error.response.data.error);
        });
    });
  },
  [SEND_CONFIRM_EMAIL](context, payload) {
    return new Promise(resolve => {
      AuthService.sendConfirmEmail(payload)
        .then(response => {
          context.commit(SET_ERROR, null);
          resolve(response);
        })
        .catch(error => {
          context.commit(SET_ERROR, error.response.data.error);
        });
    });
  },
  [CONFIRM_EMAIL](context, payload) {
    return new Promise(resolve => {
      AuthService.confirmEmail(payload)
        .then(response => {
          context.commit(SET_ERROR, null);
          resolve(response);
        })
        .catch(error => {
          context.commit(SET_ERROR, error.response.data.error);
        });
    });
  },
  [UPDATE_USER](context, payload) {
    return new Promise(resolve => {
      AuthService.update(payload)
        .then(response => {
          context.commit(SET_ERROR, null);
          resolve(response);
        })
        .catch(error => {
          context.commit(SET_ERROR, error.response.data.error);
        });
    });
  },
  [DELETE_USER](context) {
    return new Promise(resolve => {
      AuthService.delete()
        .then(response => {
          context.commit(SET_ERROR, null);
          resolve(response);
        })
        .catch(error => {
          context.commit(SET_ERROR, error.response.data.error);
        });
    });
  }
};

const mutations = {
  [SET_ERROR](state, error) {
    if (error === null) state.errors = null;
    else if (typeof error === 'string') state.errors = [error];
    else if (typeof error.Description === 'string')
      state.errors = [error.Description];
    else if (typeof error === 'object') state.errors = error;
    else state.errors = ['An error has occurred.'];
  },
  [SET_ACCESS_TOKEN](state, accessToken) {
    JwtService.saveToken(ACCESS_TOKEN, accessToken);
  },
  [SET_USER](state, user) {
    state.errors = null;
    state.user = user;
    state.isAuthenticated = true;
  },
  [PURGE_AUTH](state) {
    state.errors = null;
    state.user = nullUser;
    state.isAuthenticated = false;
    JwtService.destroyToken(ACCESS_TOKEN);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
