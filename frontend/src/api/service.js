import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

api.users = {
  setUser: async function(user) {
    const resp = await axios.post("/api/users", {
      id: user.id,
      email: user.kakao_account.email,
      nickname: user.kakao_account.profile.nickname,
    });
    return resp;
  },
};

api.estates = {
  getRealEstate: async function(realEstate) {
    const resp = await axios.get(`/api/estates/${realEstate.id}`);
    return resp;
  },
  setRealEstate: async function(realEstate) {
    const resp = await axios.post(`/api/estates`, {
      id: realEstate.id,
      place_name: realEstate.place_name,
      phone_number: realEstate.phone,
    });
    return resp;
  },
};

api.likes = {
  getLikes: async function(realEstate) {
    const resp = await axios.get(`/api/likes/${realEstate.id}`);
    return resp;
  },
  addLikes: async function(req) {
    const resp = await axios.put(`/api/likes/${req.realEstateID}`, {
      user_id: req.userID,
    });
    return resp;
  },
};

export default api;
