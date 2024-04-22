import axios from "axios";

const baseAxios = axios.create({
  baseURL: import.meta.env.VITE_BACK_HOST,
});

baseAxios.defaults.withCredentials = true;

export default baseAxios;
