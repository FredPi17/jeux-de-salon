import { createRouter, createWebHistory } from "vue-router";

import errorPage from "@/views/errorPage.vue";

import { homeRoutes } from "@/modules/home";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/:pathMatch(.*)*", name: "not-found", component: errorPage }, 
    ...homeRoutes],
});

export default router;
