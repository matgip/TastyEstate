import { ModeAPI } from "../service";

class AgencyAPI extends ModeAPI {
  async searchByCenter(lng, lat) {
    try {
      const resp = await this.api.get(this.getUrl("search"), {
        params: {
          x: lng,
          y: lat,
        }
      });
      return resp.data;
    } catch (err) {
      this.handleError(err);
    }
  }async searchByRect(swLat, swLng, neLat, neLng) {
    try {
      const resp = await this.api.get(this.getUrl("search"), {
        params: {
          swLat: swLat,
          swLng: swLng,
          neLat: neLat,
          neLng: neLng,
        }
      });
      return resp.data;
    } catch (err) {
      this.handleError(err);
    }
  }
}

export default new AgencyAPI("agency")