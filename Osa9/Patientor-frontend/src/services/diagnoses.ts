import { apiBaseUrl } from "../constants";
import axios from "axios";
import { Diagnosis } from "../types";

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return data;
};

export default {
  getAll,
};
