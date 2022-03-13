const GET_ESTATE = "GET_ESTATE";
const UPDATE_ESTATE = "UPDATE_ESTATE";

const estateStore = {
  state: {
    estate: {},
  },
  getters: {
    [GET_ESTATE](state) {
      return state.estate;
    },
  },
  mutations: {
    [UPDATE_ESTATE](state, estate) {
      state.estate = estate;
    },
  },
  actions: {
    async updateRealEstate({ commit }, estate) {
      let resp = await this.$api.estates.get(estate.id);
      if (resp && resp.status === 204) {
        // No contents
        const post = {
          id: estate.id,
          placeName: estate.place_name,
          phoneNumber: estate.phone,
        };
        await this.$api.estates.post(post);
        console.log({ message: "Created estate", post: { ...post } });
      }
      commit(UPDATE_ESTATE, estate);
    },
  },
};

export default estateStore;
