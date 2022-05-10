const GET_MAP = "GET_MAP";
const UPDATE_MAP = "UPDATE_MAP";

const mapStore = {
  state: {
    map: null,
  },

  getters: {
    [GET_MAP](state) {
      return state.map;
    },
  },

  mutations: {
    [UPDATE_MAP](state, map) {
      state.map = map;
    },
  },
};

export default mapStore;
