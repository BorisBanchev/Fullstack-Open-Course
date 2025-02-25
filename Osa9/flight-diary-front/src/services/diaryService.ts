import axios from "axios";
import { apiBaseUrl } from "../constants";
import { DiaryEntry, NewDiaryEntry } from "../types";

const getAllDiaries = () => {
  return axios
    .get<DiaryEntry[]>(`${apiBaseUrl}/diaries`)
    .then((response) => response.data);
};

const createDiary = (newDiary: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(`${apiBaseUrl}/diaries`, newDiary)
    .then((response) => response.data);
};

export default {
  getAllDiaries,
  createDiary,
};
