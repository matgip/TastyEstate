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

  getURL(baseId, subIds = []) {
    if (!baseId) throw Error("base id is not provided");
    let url = `${this.baseURL}/${this.resource}/${baseId}`;
    this.subResources.forEach((subResource, idx) => {
      url += `/${subResource}`;
      if (subIds[idx]) url += `/${subIds[idx]}`;
    });
    return url;
  }

  async get(baseId, subIds = []) {
    try {
      if (!baseId) throw Error("id is not provided");
      const resp = await this.api.get(this.getURL(baseId, subIds));
      return resp;
    } catch (err) {
      this.handleError(err);
    }
  }

  async post(baseId, data = {}) {
    try {
      if (!baseId) throw Error("base id is not provided");
      const resp = await this.api.post(this.getURL(baseId), data);
      return resp;
    } catch (err) {
      this.handleError(err);
    }
  }

  async put(baseId, subIds = [], data = {}) {
    if (!baseId) throw Error("base id is not provided");
    try {
      const resp = await this.api.put(this.getURL(baseId, subIds), data);
      return resp;
    } catch (err) {
      this.handleError(err);
    }
  }
}

class LoginAPI extends ModeAPI {
  constructor() {
    super("api/login");
  }
}

class UsersAPI extends ModeAPI {
  constructor() {
    super("api/users");
  }
}

class EstatesAPI extends ModeAPI {
  constructor() {
    super("api/estates");
  }
}

class LikesAPI extends ModeAPI {
  constructor() {
    super("api/likes");
  }
}

class ReviewAPI extends NestedAPI {
  constructor() {
    super("api/reviews", ["users"]);
  }
}

class ReviewCountAPI extends NestedAPI {
  constructor() {
    super("api/reviews", ["count"]);
  }
}

class ReviewRatingAPI extends NestedAPI {
  constructor() {
    super("api/reviews", ["ratings"]);
  }
}

class ReviewLikesOrderAPI extends NestedAPI {
  constructor() {
    super("api/reviews", ["likes"]);
  }

  getURL(baseId, range = "") {
    if (!baseId) throw Error("base id is not provided");
    return `${this.baseURL}/${this.resource}/${baseId}/${this.subResources[0]}?range=${range}`;
  }

  async get(baseId, range = "") {
    try {
      if (!baseId) throw Error("id is not provided");
      const resp = await this.api.get(this.getURL(baseId, range));
      return resp;
    } catch (err) {
      this.handleError(err);
    }
  }
}

class ReviewTimeOrderAPI extends NestedAPI {
  constructor() {
    super("api/reviews", ["time"]);
  }

  getURL(baseId, range = "") {
    if (!baseId) throw Error("base id is not provided");
    return `${this.baseURL}/${this.resource}/${baseId}/${this.subResources[0]}?range=${range}`;
  }

  async get(baseId, range = "") {
    try {
      if (!baseId) throw Error("id is not provided");
      const resp = await this.api.get(this.getURL(baseId, range));
      return resp;
    } catch (err) {
      this.handleError(err);
    }
  }
}

export const $api = {
  login: new LoginAPI(),
  users: new UsersAPI(),
  estates: new EstatesAPI(),
  likes: new LikesAPI(),
  review: new ReviewAPI(),
  reviewCount: new ReviewCountAPI(),
  reviewRatings: new ReviewRatingAPI(),
  reviewLikesOrder: new ReviewLikesOrderAPI(),
  reviewTimeOrder: new ReviewTimeOrderAPI(),
};
