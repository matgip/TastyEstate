const GET_PRICE = "GET_PRICE";
const UPDATE_PRICE = "UPDATE_PRICE";

const priceStore = {
  state: {
    price: "",
  },
  getters: {
    [GET_PRICE](state) {
      return state.price;
    },
  },
  mutations: {
    [UPDATE_PRICE](state, price) {
      state.price = price;
    },
  },
};

export default priceStore;
