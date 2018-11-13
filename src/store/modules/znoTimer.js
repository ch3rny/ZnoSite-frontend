  export default {
    namespaced: true,
    state: {
      endTime: null,
      timeLeft: 180,
    },
    mutations: {
      setEndTime(state) {
        state.endTime = new Date().getTime() + 180 * 60 * 1000;
      },
      resetEndTime(state) {
        state.endTime = null;
      },
      changeTimeLeft(state, time) {
        state.timeLeft = time;
      },
    }
  }