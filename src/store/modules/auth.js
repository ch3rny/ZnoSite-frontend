import jwt_decode from "jwt-decode";
import { GOOGLE_AUTH_CLIENT_ID } from "@/constants/Const";
import api from "@/api";

export default {
  namespaced: true,
  state: {
    jwt: null,
    user: null,
    avatar: null,
  },
  mutations: {
    loginUser(state, profile) {
      state.user = profile;
    },
    setAvatar(state, avatar) {
      state.avatar = avatar;
    },
    logoutUser(state) {
      state.user = null;
      state.avatar = null;
      state.jwt = null;
    },
    updateJWT(state, newToken) {
      state.jwt = newToken;
    },
  },
  actions: {
    login({ commit }) {
      return new Promise((resolve, reject) => {
        window.gapi.load("auth2", () => {
          const auth2 = window.gapi.auth2.init({
            client_id: GOOGLE_AUTH_CLIENT_ID,
          });
          auth2
            .signIn()
            .then(resp => {
              const token = resp.Zi.access_token;
              const avatar = resp.w3.Paa;
              commit("setAvatar", avatar);
              api.auth
                .getToken(token)
                .then(resp => {
                  const user = resp.data.user;
                  const jwt_token = resp.data.token;
                  commit("loginUser", user);
                  commit("updateJWT", jwt_token);
                })
                .catch(err => {
                  // eslint-disable-next-line
                  console.log(err.response);
                });
              resolve();
            })
            .catch(err => {
              // eslint-disable-next-line
              console.log("OH NOES", err);
              reject(err);
            });
        });
      });
    },
    logout({ commit }) {
      // eslint-disable-next-line
      return new Promise((resolve, reject) => {
        if (
          window.gapi &&
          window.gapi.auth2 &&
          window.gapi.auth2.getAuthInstance()
        ) { // eslint-disable-next-line
          gapi.auth2
            .getAuthInstance()
            .signOut()
            .then(
              () => {
                commit("logoutUser");
                resolve();
              },
              () => {
                commit("logoutUser");
                resolve();
              }
            );
        } else {
          commit("logoutUser");
          resolve();
        }
      });
    },
    refreshToken() {
      const payload = {
        token: this.state.auth.jwt,
      };
      api.auth
        .refreshToken(payload)
        .then(response => {
          this.commit("auth/updateJWT", response.data.token);
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    inspectToken({ commit }) {
      const token = this.state.auth.jwt;
      const decoded = jwt_decode(token);
      if (token != null) {
        const JWT_REFRESH_EXPIRATION_DELTA = 604800; // 7*24*60*60 (14*24*3600)
        const JWT_EXPIRATION_DELTA = 300; // 5*60 (3600)
        if (Date.now() / 1000 > decoded.exp) {
          commit("logoutUser");
          this.dispatch("auth/login");
        } else if (
          Date.now() / 1000 > decoded.exp - JWT_EXPIRATION_DELTA &&
          Date.now() / 1000 < decoded.orig_iat + JWT_REFRESH_EXPIRATION_DELTA
        ) {
          // IF TOKEN EXPIRE IN LESS THAN 30MN BUT STILL IN REFRESH PERIOD THEN REFRESH
          this.dispatch("auth/refreshToken");
        }
      } else if (token != null) {
        // NO TOKEN THEN SEND TO LOGIN PAGE
        this.dispatch("auth/login");
      }
    },
  },
};
