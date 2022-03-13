const GET_LIKES = "GET_LIKES";
const UPDATE_LIKES = "UPDATE_LIKES";

const likesStore = {
  state: {
    likes: 0,
  },
  getters: {
    [GET_LIKES](state) {
      return state.likes;
    },
  },
  mutations: {
    [UPDATE_LIKES](state, likes) {
      state.likes = likes;
    },
  },
  actions: {
    async getLikes({ commit }, id) {
      const resp = await this.$api.likes.get(id);
      console.log({ message: "Get likes" });
      commit(UPDATE_LIKES, resp.data.likes);
    },
    async updateLikes({ dispatch }, payLoad) {
      const resp = await this.$api.likes.put(payLoad.estateID, { user_id: payLoad.userID });
      if (resp.data.result === "already-added") {
        alert("이미 좋아요를 누르셨습니다.");
        return;
      }
      if (resp.data.result === "success") {
        alert("이 부동산을 좋아합니다.");
      }
      dispatch("getLikes", payLoad.estateID);
    },
  },
};

export default likesStore;
