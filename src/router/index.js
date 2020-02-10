import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Settings from "../views/Settings.vue";
import EachClass from "../views/EachClass.vue";
import MonthlyReport from "../views/MonthlyReport.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/new-class/:teacher",
    name: "home",
    component: Home
  },
  {
    path: "/",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings
  },
  {
    path: "/pastClass/:id",
    name: "eachClass",
    component: EachClass
  },
  {
    path: "/report",
    name: "MonthlyReport",
    component: MonthlyReport
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
