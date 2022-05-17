const { StatusCodes } = require("http-status-codes");
const axios = require("axios");

const EstateRepository = require("../../infrastructure/repositories/estates");

const SCANNED = 1;

const get = async (req, res) => {
  try {
    const estate = await EstateRepository.get(req.params.id);
    if (EstateRepository.isEmpty(estate) === true) {
      res.sendStatus(StatusCodes.NO_CONTENT);
      return;
    }
    res.json(estate);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const add = async (req, res) => {
  try {
    await EstateRepository.persist(req.body);
    res.sendStatus(StatusCodes.OK);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const KAKAO_REST_KEY = "b912a737eb064082f1aff5d3600bc2be"

const kakaoSearch = async (x, y, radius, page = 1) => {
  const response = await axios({
    method: "GET",
    url: `https://dapi.kakao.com/v2/local/search/category.json?category\_group\_code=AG2&x=${x}&y=${y}&radius=${radius}&page=${page}`,
    headers: {
      Authorization: `KakaoAK ${KAKAO_REST_KEY}`,
    },
  });
  return response.data;
}


function _isScanned(lat, lng) {
  if (this.cachedLatLng === undefined) return false;
  if (this.cachedLatLng[lat] === undefined) return false;
  return this.cachedLatLng[lat][lng] === SCANNED;
}
function _cacheLatLng(lat, lng) {
  this.cachedLatLng ??= new Array();
  this.cachedLatLng[lat] ??= new Array();
  this.cachedLatLng[lat][lng] = SCANNED;
}

const search = async (req, res) => {
  const y = req.query.y;
  const x = req.query.x;
  const radius = 710;
  if (!_isScanned(y, x)) {
    _cacheLatLng(y, x);
    try {
      let nextPage = 1;
      while (true) {
        const data = await kakaoSearch(x, y, radius, nextPage++);

        for (let i = 0; i < data.documents.length; i++) {
          try {
            await EstateRepository.persist(data.documents[i]);
          } catch (err) {
            console.error(err);
            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
            return;
          }
        }

        if (data.meta.is_end) break;
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
  try {
    const estates = await EstateRepository.searchByRadius(y, x, radius);
    res.json(estates);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
}

module.exports = {
  get,
  add,
  search,
};
