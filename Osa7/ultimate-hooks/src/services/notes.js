import axios from "axios";

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = (baseUrl) => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject, baseUrl) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

export default { getAll, create, setToken };
