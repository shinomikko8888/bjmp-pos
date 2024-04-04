import axios from "axios";
import { DOMAIN } from "../constants";

axios.defaults.baseURL = `${DOMAIN}api`;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export default axios;
