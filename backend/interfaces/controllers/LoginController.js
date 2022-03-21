const { StatusCodes } = require("http-status-codes");

const { generateAccessToken } = require("../../utils/jwt");

const add = async (req, res) => {
  try {
    // TODO: Need to validate kakao access token
    res
      .cookie("AccessToken", generateAccessToken({ token: req.body.token }), {
        httpOnly: true,
        expires: 0,
      })
      .json(StatusCodes.OK);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = {
  add,
};
