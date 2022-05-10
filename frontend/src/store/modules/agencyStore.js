import { $api } from "@/api/service";
import mergesort from "mergesort";

const GET_ESTATE = "GET_ESTATE";
const GET_ESTATES = "GET_ESTATES";
const CLEAR_ESTATE = "CLEAR_ESTATE";
const CLEAR_ESTATES = "CLEAR_ESTATES";
const UPDATE_ESTATE = "UPDATE_ESTATE";
const UPDATE_ESTATES = "UPDATE_ESTATES";

const IS_EMPTY_REPLY = (resp) => {
  return resp && resp.status === 204;
};

const IS_DUPLICATED = (agencyToAddId, selectedId) => {
  return agencyToAddId === selectedId;
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

const agencyStore = {
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
    async updateAgency({ commit }, agency) {
      const resp = await GET_AGENCY(agency.id);
      if (!IS_EMPTY_REPLY(resp)) {
        commit(UPDATE_ESTATE, resp.data);
        return;
      }
      // Not saved on database...
      await SAVE_AGENCY(agency);
      // Agency info got from Kakao API does not have like & stars
      agency.likes = 0;
      agency.stars = 0.0;
      commit(UPDATE_ESTATE, agency);
    },

    async updateAgencies({ commit, state }, payload) {
      const { agencies, compareFn } = payload;
      let result = [];
      for (let agency of agencies) {
        const resp = await GET_AGENCY(agency.id);

        if (IS_DUPLICATED(agency.id, state.estate.id)) continue;

        if (!IS_EMPTY_REPLY(resp)) {
          result.push(resp.data);
          continue;
        }

        // Not saved on database...
        await SAVE_AGENCY(agency);
        // Agency info got from Kakao API does not have like & stars
        agency.likes = 0;
        agency.stars = 0.0;
        result.push(agency);
      }
      if (compareFn !== undefined) result = mergesort(compareFn, result);
      commit(UPDATE_ESTATES, result);
    },
  },
};

export default agencyStore;
