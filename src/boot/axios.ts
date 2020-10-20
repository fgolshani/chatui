import { boot } from "@/boot/boot";
import Axios, { AxiosInstance } from "axios";

Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `jwt ${token}`;
  return config;
});

declare module "vue/types/vue" {
  interface Vue {
    $axios: AxiosInstance;
  }
}

export default boot(({ Vue }) => {
  Vue.prototype.$axios = Axios
});

