import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from '@/store/index.js';
import vuetify from './plugins/vuetify';
import './assets/scss/app.scss';
import Vuex from 'vuex';
// import * as admin from 'firebase-admin';

const fb = require('./configFirebase.js');
Vue.use(vuetify);
Vue.use(Vuex);
Vue.config.productionTip = false;

// handle page reloads
let app;
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      Vuex,
      render: h => h(App)
    }).$mount('#app');
  }
});
