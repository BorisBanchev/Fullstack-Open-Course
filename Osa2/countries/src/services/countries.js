import axios from "axios";
const apiUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAll = () => {
  const request = axios.get(apiUrl);
  return request.then((response) => response.data);
};

export default {
  getAll: getAll,
};
