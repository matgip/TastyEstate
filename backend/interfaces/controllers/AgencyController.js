const { StatusCodes } = require("http-status-codes");
const axios = require("axios");

const AgencyRepository = require("../../infrastructure/repositories/agency");

const SCANNED = 1;

const get = async (req, res) => {
  try {
    const agency = await AgencyRepository.get(req.params.id);
    if (AgencyRepository.isEmpty(agency) === true) {
      res.sendStatus(StatusCodes.NO_CONTENT);
      return;
    }
    res.json(agency);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const add = async (req, res) => {
  try {
    await AgencyRepository.persist(req.body);
    res.sendStatus(StatusCodes.OK);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const KAKAO_REST_KEY = "b912a737eb064082f1aff5d3600bc2be";

const getUrl = (keyword, x, y, radius, page) => {
  let url = "";
  if (keyword.length !== 0) {
    url += `https://dapi.kakao.com/v2/local/search/keyword.json?category\_group\_code=AG2&query=${keyword}&radius=${radius}&page=${page}`;
  } else {
    url += `https://dapi.kakao.com/v2/local/search/category.json?category\_group\_code=AG2&x=${x}&y=${y}&radius=${radius}&page=${page}`;
  }
  return encodeURI(url);
};

const kakaoSearch = async (keyword, x, y, radius, page = 1) => {
  const response = await axios({
    method: "GET",
    url: getUrl(keyword, x, y, radius, page),
    headers: {
      Authorization: `KakaoAK ${KAKAO_REST_KEY}`,
    },
  });
  return response.data;
};

// TODO : 영구적으로 저장하는 방식으로 고쳐야 됨.
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
  // const y = req.query.y;
  // const x = req.query.x;
  const y = typeof req.query.y === "undefined" ? -1 : req.query.y;
  const x = typeof req.query.x === "undefined" ? -1 : req.query.x;
  const keyword = typeof req.query.keyword === "undefined" ? "" : req.query.keyword;

  const radius = 710;

  if (y > 0 && x > 0 && !_isScanned(y, x)) _cacheLatLng(y, x);

  try {
    let nextPage = 1;
    while (true) {
      const data = await kakaoSearch(keyword, x, y, radius, nextPage++);

      for (let i = 0; i < data.documents.length; i++) {
        try {
          if (keyword.length !== 0) {
            await AgencyRepository.persistAgencyByKeyword(keyword, data.documents[i].id);
          }
          await AgencyRepository.persist(data.documents[i]);
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
  try {
    let agencies;
    if (keyword.length !== 0) {
      agencies = await AgencyRepository.searchByKeyword(keyword);
    } else {
      agencies = await AgencyRepository.searchByRadius(y, x, radius);
    }
    // const agencies = await AgencyRepository.searchByRadius(y, x, radius);
    res.json(agencies);
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
};

module.exports = {
  get,
  add,
  search,
};
