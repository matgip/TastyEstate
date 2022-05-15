const GET_LOGIN_VISIBLE_FLAG = "GET_LOGIN_VISIBLE_FLAG";
const UPDATE_LOGIN_VISIBLE_FLAG = "UPDATE_LOGIN_VISIBLE_FLAG";

const loginVisibleFlagStore = {
  state: {
    visibleLoginCard: false,
  },

  getters: {
    [GET_LOGIN_VISIBLE_FLAG](state) {
      return state.visibleLoginCard;
    },
  },

  mutations: {
    [UPDATE_LOGIN_VISIBLE_FLAG](state, visibleLoginCard) {
      state.visibleLoginCard = visibleLoginCard;
    },
  },
};

export default loginVisibleFlagStore;
