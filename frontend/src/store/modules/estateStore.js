import { $api } from "@/api/service";

const GET_ESTATE = "GET_ESTATE";
const GET_ESTATES = "GET_ESTATES";
const CLEAR_ESTATE = "CLEAR_ESTATE";
const CLEAR_ESTATES = "CLEAR_ESTATES";
const UPDATE_ESTATE = "UPDATE_ESTATE";
const UPDATE_ESTATES = "UPDATE_ESTATES";

const IS_EMPTY_REPLY = (resp) => {
  return resp && resp.status === 204;
};

const GET_AGENCY = async (estateId) => {
  return await $api.estates.get(estateId);
};

const SAVE_AGENCY = async (estate) => {
  const post = {
    id: estate.id,
    coordinate: { y: estate.y, x: estate.x },
    phone: estate.phone,
    placeName: estate.place_name,
    addressName: estate.address_name,
  };
  await $api.estates.post(post);
};

const estateStore = {
  state: {
    estate: {},
    estates: [],
  },

  getters: {
    [GET_ESTATE](state) {
      return state.estate;
    },
    [GET_ESTATES](state) {
      return state.estates;
    },
  },

  mutations: {
    [UPDATE_ESTATE](state, estate) {
      state.estate = estate;
    },
    [UPDATE_ESTATES](state, estates) {
      // Do swallow copy cause we don't change estates
      state.estates = [...estates];
    },
    [CLEAR_ESTATE](state) {
      state.estate = {};
    },
    [CLEAR_ESTATES](state) {
      state.estates = [];
    },
  },

  actions: {
    async updateEstate({ commit }, estate) {
      const resp = await GET_AGENCY(estate.id);
      if (!IS_EMPTY_REPLY(resp)) {
        commit(UPDATE_ESTATE, resp.data);
        return;
      }
      // Not saved on database...
      await SAVE_AGENCY(estate);
      // Agency info got from Kakao API does not have like & stars
      estate.likes = 0;
      estate.stars = 0.0;
      commit(UPDATE_ESTATE, estate);
    },

    async updateEstates({ commit }, estates) {
      const result = [];
      for (let estate of estates) {
        const resp = await GET_AGENCY(estate.id);
        if (!IS_EMPTY_REPLY(resp)) {
          result.push(resp.data);
          continue;
        }

        // Not saved on database...
        await SAVE_AGENCY(estate);
        // Agency info got from Kakao API does not have like & stars
        estate.likes = 0;
        estate.stars = 0.0;
        result.push(estate);
      }
      commit(UPDATE_ESTATES, result);
    },
  },
};

export default estateStore;
