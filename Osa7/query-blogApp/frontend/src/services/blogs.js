import axios from "axios";
import storage from "./storage";

const baseUrl = "api/blogs";

const getConfit = () => ({
  headers: { Authorization: `Bearer ${storage.loadUser().token}` },
});

const getAll = async () => {
  const response = await axios.get(baseUrl).then((response) => response.data);
  return response;
};

const update = async (newObject) => {
  const response = await axios.put(
    `${baseUrl}/${newObject.id}`,
    newObject,
    getConfit()
  );
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfit());
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfit());
  return response.data;
};

export default { getAll, create, update, remove };
