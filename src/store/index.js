import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth'
import znoTimer from './modules/znoTimer'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    znoTimer
  },
  plugins: [createPersistedState()]
});