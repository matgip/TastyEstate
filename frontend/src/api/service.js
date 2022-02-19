import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

api.users = {
  setUser: async function(user) {
    const resp = await axios.post("/api/users", {
      id: this.getID(user),
      email: this.getEmail(user),
      nickname: this.getNickname(user),
    });
    return resp;
  },
  getID: function(user) {
    return user.id;
  },
  getEmail: function(user) {
    return user.kakao_account.email;
  },
  getNickname: function(user) {
    return user.kakao_account.profile.nickname;
  },
};

api.estates = {
  getRealEstate: async function(re) {
    const resp = await axios.get(`/api/estates/${re.id}`);
    return resp;
  },
  setRealEstate: async function(re) {
    const resp = await axios.post(`/api/estates`, {
      id: this.getID(re),
      place_name: this.getPlace(re),
      phone_number: this.getPhone(re),
    });
    return resp;
  },
  getID: function(re) {
    return re.id;
  },
  getPlace: function(re) {
    return re.place_name;
  },
  getPhone: function(re) {
    return re.phone;
  },
};

api.likes = {
  getLikes: async function(re) {
    const resp = await axios.get(`/api/likes/${re.id}`);
    return resp;
  },
  setLikes: async function(re) {
    const resp = await axios.post(`/api/likes`, {
      id: this.getID(re),
    });
    return resp;
  },
  getID: function(re) {
    return re.id;
  },
};

export default api;
