import "virtual:svg-icons-register";
import App from "./App.vue";
import router from "./router";
import { createApp } from "vue";
import { store } from "@/stores";
import { errorTracking, i18n } from "@/utilities/";
import { Env } from "@/config";
import "./assets/scss/main.scss";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(i18n);

errorTracking.init(app, router, Env);

app.mount("#app");
