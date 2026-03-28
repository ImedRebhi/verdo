import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import i18n from "./i18n";
import ThemeService from "./services/ThemeService";

// Set up axios interceptor for authentication
axios.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const app = createApp(App);

ThemeService.initTheme();

app.use(router);
app.use(store);
app.use(i18n);

app.mount("#app");
