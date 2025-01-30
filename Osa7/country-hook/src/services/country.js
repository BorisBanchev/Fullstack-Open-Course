import axios from "axios";

export const getCountryData = async (name) => {
  const baseUrl = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`;
  const response = await axios.get(baseUrl);
  return response.data;
};
