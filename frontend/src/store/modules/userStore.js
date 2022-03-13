const GET_USER = "GET_USER";
const UPDATE_USER = "UPDATE_USER";

const userStore = {
  state: {
    user: {},
  },
  getters: {
    [GET_USER](state) {
      return state.user;
    },
  },
  mutations: {
    [UPDATE_USER](state, user) {
      state.user = user;
    },
  },
  actions: {
    async updateUser({ commit }, user) {
      let resp = await this.$api.users.get(user.id);
      if (resp && resp.status === 204) {
        // No contents
        const post = {
          id: user.id,
          email: user.kakao_account.email,
          nickname: user.kakao_account.profile.nickname,
        };
        await this.$api.users.post(post);
        console.log({ message: "Created user", post: { ...post } });
      }
      commit(UPDATE_USER, user);
    },
  },
};

export default userStore;
