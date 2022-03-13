const GET_CONTRACT = "GET_CONTRACT";
const UPDATE_CONTRACT = "UPDATE_CONTRACT";

const contractStore = {
  state: {
    contract: null,
  },
  getters: {
    [GET_CONTRACT](state) {
      return state.contract;
    },
  },
  mutations: {
    [UPDATE_CONTRACT](state, contract) {
      state.contract = contract;
    },
  },
};

export default contractStore;
