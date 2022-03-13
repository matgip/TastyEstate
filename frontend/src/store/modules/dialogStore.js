const GET_DIALOG = "GET_DIALOG";
const UPDATE_DIALOG = "UPDATE_DIALOG";

const dialogStore = {
  state: {
    dialog: false,
  },
  getters: {
    [GET_DIALOG](state) {
      return state.dialog;
    },
  },
  mutations: {
    [UPDATE_DIALOG](state, dialog) {
      state.dialog = dialog;
    },
  },
};

export default dialogStore;
