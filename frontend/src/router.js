import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/components/Map/Map.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/components/Login/Login.vue"),
    },
    {
      path: "/reviews",
      name: "reviews",
      component: () => import("@/components/AllReviews/AllReviews.vue"),
    },
  ],
});

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => {
    if (err.name !== "NavigationDuplicated") throw err;
  });
};

export default router;
