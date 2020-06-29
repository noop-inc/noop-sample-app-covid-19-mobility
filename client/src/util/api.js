import Axios from "axios";

export const getData = (name, type) => Axios.get(`/api/${name}/${type}`);

export const getRandom = () => Axios.get("/api/random");
