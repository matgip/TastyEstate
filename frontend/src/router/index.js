// Reference: Smart router for VueJS
// https://itnext.io/vue-tricks-smart-router-for-vuejs-93c287f46b50
import Vue from "vue";
import VueRouter from "vue-router";
import Router from "vue-router";
import routes from "./routes";

Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => {
    if (err.name !== "NavigationDuplicated") throw err;
  });
};

export default Promise.all(routes).then((routes) => {
  return new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
  });
});
