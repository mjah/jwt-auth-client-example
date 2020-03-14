import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/registerServiceWorker';
import ApiService from '@/common/api.service';
import { CHECK_AUTH } from '@/store/actions.type';

if (process.env.NODE_ENV == 'production') {
  Vue.config.productionTip = false;
}

ApiService.init();

router.beforeEach((to, from, next) => {
  if (to.name === 'signout') next();
  else Promise.all([store.dispatch(CHECK_AUTH)]).then(next);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
