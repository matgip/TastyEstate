
const axios = require("axios");

const { StatusCodes } = require("http-status-codes");

const { generateAccessToken } = require("../../utils/jwt");

const UserRepository = require("../../infrastructure/repositories/users");


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
  let socialUserInfo;

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
      socialUserInfo = parseKakaoAccount(response.data);
    } else {
      res.sendStatus(StatusCodes.BAD_REQUEST);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }

  try { // always update user info
    await UserRepository.persist(socialUserInfo);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }


  console.log("response UserInfo", socialUserInfo);
  res
    .cookie("AccessToken", generateAccessToken({ token: req.body.token }), {
      httpOnly: true,
      expires: 0,
    })
    .json(socialUserInfo);
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


module.exports = {
  socialLogin, logout
};
