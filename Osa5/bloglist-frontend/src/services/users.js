import axios from "axios";
const baseUrl = "/api/users";

const getUserById = async (id) => {
  const response = await axios.get(baseUrl);
  const user = response.data.find((user) => user.id === id);
  return user;
};
export default { getUserById };
