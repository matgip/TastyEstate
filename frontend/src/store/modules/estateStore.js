const GET_ESTATE = "GET_ESTATE";
const CLEAR_ESTATE = "CLEAR_ESTATE";
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
    [CLEAR_ESTATE](state) {
      state.estate = {};
    },
  },

  actions: {
    async updateEstate({ commit }, estate) {
      let resp = await this.$api.estates.get(estate.id);
      if (resp && resp.status === 204) {
        // no contents
        const post = {
          id: estate.id,
          coordinate: { y: estate.y, x: estate.x },
          phone: estate.phone,
          placeName: estate.place_name,
          addressName: estate.address_name,
        };
        await this.$api.estates.post(post);

        // estate getting from kakao api does not have likes count
        estate.likes = 0;
        commit(UPDATE_ESTATE, estate);
        return;
      }

      commit(UPDATE_ESTATE, resp.data);
    },
  },
};

export default estateStore;
