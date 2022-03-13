const GET_KINDNESS = "GET_KINDNESS";
const UPDATE_KINDNESS = "UPDATE_KINDNESS";

const kindnessStore = {
  state: {
    kindness: "",
  },
  getters: {
    [GET_KINDNESS](state) {
      return state.kindness;
    },
  },
  mutations: {
    [UPDATE_KINDNESS](state, kindness) {
      state.kindness = kindness;
    },
  },
};

export default kindnessStore;
