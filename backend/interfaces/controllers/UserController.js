const { StatusCodes } = require("http-status-codes");
const axios = require("axios");

const UserRepository = require("../../infrastructure/repositories/users");

const { sign, verify } = require("../../utils/jwt");

const parseKakaoAccount = (data) => {
  return {
    id: data.id,
    nickname: data.properties.nickname,
    avatar: data.properties.profile_image,
    email: data.kakao_account.email,
  }
};

const socialLogin = async (req, res) => {
  console.log("login requested", req.body);
  let userInfo;

  try { // fetch social user info
    if (req.body.social === "kakao") {
      const response = await axios({
        method: 'get',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
          "Authorization": `Bearer ${req.body.accessToken}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      })
      userInfo = parseKakaoAccount(response.data);
    } else {
      res.sendStatus(StatusCodes.BAD_REQUEST);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }

  try { // always update user info
    await UserRepository.persist(userInfo);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }

  const token = sign(userInfo);
  // TODO : save token to redis

  res.cookie("JWT", token, { httpOnly: true, expires: 0 }).json(userInfo);
};

const logout = async (req, res) => {
  try {
    if (req.body.social === "kakao") {
      const response = await axios({
        method: 'POST',
        url: 'https://kapi.kakao.com/v1/user/logout',
        headers: {
          "Authorization": `Bearer ${req.body.accessToken}`,
          "Content-type": "application/x-www-form-urlencoded"
        }
      })
      res.json(response.data);
    } else {
      res.sendStatus(StatusCodes.BAD_REQUEST);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

const get = async (req, res) => {
  try {
    const token = req.cookies["JWT"];
    if (!token) return res.sendStatus(StatusCodes.FORBIDDEN);
    const decoded = verify(token);
    if (!decoded) return res.sendStatus(StatusCodes.FORBIDDEN);

    const user = await UserRepository.get(decoded.id);
    console.log("user", user)
    if (UserRepository.isEmpty(user) === true) {
      res.sendStatus(StatusCodes.NO_CONTENT);
      return;
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  socialLogin,
  logout,
  get,
};
