import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl).then((res) => res.data);
  return response;
};

export const createAnecdote = async (newAnecdote) => {
  const response = await axios
    .post(baseUrl, newAnecdote)
    .then((res) => res.data);
  return response;
};

export const updateAnecdote = async (updatedAnecdote) => {
  const response = await axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then((res) => res.data);
  return response;
};
