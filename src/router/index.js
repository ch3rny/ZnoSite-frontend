import Vue from "vue";
import Router from "vue-router";
import Sampling from "../views/Sampling.vue";
import TestSolving from "../views/TestSolving.vue";
import ZnoSolving from "../views/ZnoSolving.vue";
import Empty from "../views/Empty.vue";
import Zno from "../views/Zno.vue";
import Home from "../views/Home.vue";
import InDev from "../views/InDev.vue";
import Bundle from "../views/Bundle.vue";
import BundleEdit from "../views/BundleEdit.vue";
import Handbook from "../views/Handbook.vue";
import UserStat from "../views/UserStat.vue"

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [{
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/sampling",
      name: "Sampling",
      component: Sampling
    },
    {
      path: "/test/",
      name: "TestSolving",
      component: TestSolving,
    },
    {
      path: "/zno/:year-:znotype/",
      name: "ZnoSolving",
      component: ZnoSolving
    },
    {
      path: "/empty",
      name: "Empty",
      component: Empty
    },
    {
      path: "/zno",
      name: "Zno",
      component: Zno
    },
    {
      path: "/books",
      name: "Books",
      component: Handbook
    },
    {
      path: "/info",
      name: "Info",
      component: InDev
    },
    {
      path: "/bundle",
      name: "Bundle",
      component: Bundle
    },
    {
      path: "/bundle/:id/edit",
      name: "BundleEdit",
      component: BundleEdit,
    },
    {
      path: "/bundle/:id/",
      name: "BundleSolving",
      component: TestSolving,
    },
    {
      path: "/stat/",
      name: "Stat",
      component: UserStat
    }
  ]
});