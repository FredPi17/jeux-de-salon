import type { RouteRecordRaw } from "vue-router";
import HomeView from "@/modules/home/views/HomeView.vue";
import Stats from "@/modules/home/views/Stats.vue";
import Countdown from "@/modules/home/views/CountDown.vue";
import BiggerScore from "@/modules/home/views/BiggerScore.vue";

const homeRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home", 
    component: HomeView,
  },
  {
    path: "/bigger",
    name: "bigger score",
    component: BiggerScore,
  },
  {
    path: "/countDown/:countDown",
    name: "countdown",
    component: Countdown,
    props: true,
  },
  {
    path: '/stats',
    name: "Stats",
    component: Stats,
  }
];

export default homeRoutes;
