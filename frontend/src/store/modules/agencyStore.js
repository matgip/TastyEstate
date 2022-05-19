import agencyApi from "@/api/agency";

const GET_AGENCY = "GET_AGENCY";
const CLEAR_ESTATE = "CLEAR_ESTATE";
const UPDATE_ESTATE = "UPDATE_ESTATE";

const IS_EMPTY_REPLY = (resp) => {
  return resp && resp.status === 204;
};

const FETCH = async (estateId) => {
  return await agencyApi.get(estateId);
};

const agencyStore = {
  state: {
    estate: {},
    estates: [],
  },

  getters: {
    [GET_AGENCY](state) {
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
    async agencySelected({ commit }, agency) {
      const resp = await FETCH(agency.id);
      if (IS_EMPTY_REPLY(resp)) {
        console.log("empty response...");
        return;
      }
      commit(UPDATE_ESTATE, resp.data);
    },
  },
};

export default agencyStore;
