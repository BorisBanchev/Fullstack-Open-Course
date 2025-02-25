import axios from "axios";
import { apiBaseUrl } from "../constants";
import { DiaryEntry } from "../types";

export const getAllDiaries = () => {
  return axios
    .get<DiaryEntry[]>(`${apiBaseUrl}/diaries`)
    .then((response) => response.data);
};

export default {
  getAllDiaries,
};
