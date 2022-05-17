import { ModeAPI } from "../service";

class NestedAPI extends ModeAPI {
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
  }
}

export default new NestedAPI("estates")