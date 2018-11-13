import {
  getField,
  updateField
} from "vuex-map-fields";

export default {
  namespaced: true,
  state: {
    checkedYears: [],
    checkedThemes: [],
    checkedTypes: [],
    checkedZnoTypes: [],
  },
  getters: {
    getField,
  },
  mutations: {
    updateField,
    setYear(state, n) {
      state.checkedYears = n;
    },
    setType(state, n) {
      state.checkedTypes = n;
    },
    setZnoType(state, n) {
      state.checkedZnoTypes = n;
    },
    setThemes(state, n) {
      state.checkedThemes = n;
    },
  }
}