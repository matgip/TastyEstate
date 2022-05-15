const GET_REVIEW_VISIBLE_FLAG = "GET_REVIEW_VISIBLE_FLAG";
const UPDATE_REVIEW_VISIBLE_FLAG = "UPDATE_REVIEW_VISIBLE_FLAG";

const reviewVisibleFlagStore = {
  state: {
    visibleReviewCard: false,
  },

  getters: {
    [GET_REVIEW_VISIBLE_FLAG](state) {
      return state.visibleReviewCard;
    },
  },

  mutations: {
    [UPDATE_REVIEW_VISIBLE_FLAG](state, visibleReviewCard) {
      state.visibleReviewCard = visibleReviewCard;
    },
  },
};

export default reviewVisibleFlagStore;
