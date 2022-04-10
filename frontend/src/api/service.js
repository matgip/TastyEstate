// Reference: Smart api module for VueJS
// https://itnext.io/vue-tricks-smart-api-module-for-vuejs-b0cae563e67b
import axios from "axios";

class BaseAPI {
  baseURL = "";
  resource;
  api;

  constructor(resource) {
    if (!resource) throw new Error("Resource is not provided");
    this.resource = resource;
    this.api = axios.create({
      baseURL: this.baseURL,
    });
  }

  getURL(id = "") {
    return `${this.baseURL}/${this.resource}/${id}`;
  }

  handleError(err) {
    console.log({ message: "Errors is handled here", err });
  }
}

class ReadOnlyAPI extends BaseAPI {
  constructor(resource) {
    super(resource);
  }

  async fetch(config = {}) {
    try {
      const resp = await this.api.fetch(this.getURL(), config);
      return resp;
    } catch (err) {
      this.handleError(err);
    }
  }

  async get(id) {
    try {
      if (!id) throw Error("id is not provided");
      const resp = await this.api.get(this.getURL(id));
      return resp;
    } catch (err) {
      this.handleError(err);
    }
  }
}

class ModeAPI extends ReadOnlyAPI {
  constructor(resource) {
    super(resource);
  }

  async post(data = {}) {
    try {
      const resp = await this.api.post(this.getURL(), data);
      return resp;
    } catch (err) {
      this.handleError(err);
    }
  }

  async put(id, data = {}) {
    if (!id) throw Error("id is not provided");
    try {
      const resp = await this.api.put(this.getURL(id), data);
      return resp;
    } catch (err) {
      this.handleError(err);
    }
  }

  async delete(id) {
    if (!id) throw Error("id is not provided");
    try {
      await this.api.delete(this.getURL(id));
      return true;
    } catch (err) {
      this.handleError(err);
    }
  }
}

class NestedAPI extends ModeAPI {
  subResources;

  constructor(baseResource, subResources) {
    super(baseResource);
    if (!subResources) throw new Error("Sub resource is not provided");
    this.subResources = subResources;
  }

  getURL(baseId, subIds = [], range = "") {
    if (!baseId) throw Error("base id is not provided");
    let url = `${this.baseURL}/${this.resource}/${baseId}`;
    this.subResources.forEach((subResource, idx) => {
      url += `/${subResource}`;
      if (subIds[idx]) url += `/${subIds[idx]}`;
    });
    if (range.length > 0) {
      url += `?range=${range}`;
    }
    return url;
  }

  async get(getEntity) {
    try {
      const { baseId, subIds, range } = getEntity;
      if (!baseId) throw Error("id is not provided");
      const resp = await this.api.get(this.getURL(baseId, subIds, range));
      return resp;
    } catch (err) {
      this.handleError(err);
    }
  }

  async post(postEntity) {
    try {
      const { baseId, subIds, data } = postEntity;
      if (!baseId) throw Error("base id is not provided");
      const resp = await this.api.post(this.getURL(baseId, subIds), data);
      return resp;
    } catch (err) {
      this.handleError(err);
    }
  }

  async put(putEntity) {
    try {
      const { baseId, subIds, data } = putEntity;
      if (!baseId) throw Error("base id is not provided");
      const resp = await this.api.put(this.getURL(baseId, subIds), data);
      return resp;
    } catch (err) {
      this.handleError(err);
    }
  }
}

export const $api = {
  login: new ModeAPI("api/login"),
  users: new ModeAPI("api/users"),
  estates: new ModeAPI("api/estates"),
  likes: new ModeAPI("api/likes"),
  review: new NestedAPI("api/reviews", ["users"]),
  reviewCount: new NestedAPI("api/reviews", ["count"]),
  reviewRatings: new NestedAPI("api/reviews", ["ratings"]),
  reviewUserLikes: new NestedAPI("api/reviews", ["users", "likes"]),
  reviewLikesOrder: new NestedAPI("api/reviews", ["likes"]),
  reviewTimeOrder: new NestedAPI("api/reviews", ["time"]),
};
