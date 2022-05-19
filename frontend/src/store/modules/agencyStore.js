import agencyApi from "@/api/agency";

const GET_ESTATE = "GET_ESTATE";
const CLEAR_ESTATE = "CLEAR_ESTATE";
const UPDATE_ESTATE = "UPDATE_ESTATE";

const IS_EMPTY_REPLY = (resp) => {
  return resp && resp.status === 204;
};

const GET_AGENCY = async (estateId) => {
  return await agencyApi.get(estateId);
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
    async updateAgency({ commit }, agency) {
      const resp = await GET_AGENCY(agency.id);
      if (!IS_EMPTY_REPLY(resp)) {
        commit(UPDATE_ESTATE, resp.data);
        return;
      }
      // Agency info got from Kakao API does not have like & stars
      agency.likes = 0;
      agency.stars = 0.0;
      commit(UPDATE_ESTATE, agency);
    },
  },
};

export default agencyStore;
