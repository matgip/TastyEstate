const GET_STARS = "GET_STARS";
const UPDATE_STARS = "UPDATE_STARS";

const starsStore = {
  state: {
    stars: 0.0,
  },
  getters: {
    [GET_STARS](state) {
      return state.stars;
    },
  },
  mutations: {
    [UPDATE_STARS](state, stars) {
      state.stars = stars;
    },
  },
  actions: {
    async getStars({ commit }, id) {
      let stars = 0.0;
      const totRatings = await this.$api.reviewRatings.get(id);
      const totUserCnt = await this.$api.reviewCount.get(id);
      if (totUserCnt.data !== undefined && totRatings.data !== undefined && totUserCnt.data !== 0) {
        stars = totRatings.data / totUserCnt.data;
      }
      commit("UPDATE_STARS", stars);
    },
  },
};

export default starsStore;
