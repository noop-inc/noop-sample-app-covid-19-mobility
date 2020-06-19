import Axios from "axios";

export const getData = (name, type) => Axios.get(`/api/${name}/${type}`);
