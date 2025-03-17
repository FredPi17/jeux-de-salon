import App from "./App.vue";
import router from "./router";
import { createApp } from "vue";
import { store } from "@/stores";
import { i18n } from "@/utilities/";
import "./assets/scss/main.scss";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(i18n);

app.mount("#app");
