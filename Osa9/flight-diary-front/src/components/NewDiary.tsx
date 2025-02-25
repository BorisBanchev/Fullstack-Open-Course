import { useState } from "react";
import axios from "axios";
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from "../types";
import { SyntheticEvent } from "react";
import diaryService from "../services/diaryService";

const NewDiary = ({
  diaries,
  setDiaries,
  setErrorMessage,
}: {
  diaries: DiaryEntry[];
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(
    "great" as Visibility
  );
  const [weather, setWeather] = useState<Weather>("sunny" as Weather);
  const [comment, setComment] = useState("");

  const handleCreation = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!visibility || !weather) {
      console.error("Visibility and weather must be defined");
      return;
    }
    const newDiary: NewDiaryEntry = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment,
    };
    try {
      const createdDiary = await diaryService.createDiary(newDiary);
      setDiaries(diaries.concat(createdDiary));
      setDate("");
      setVisibility("great" as Visibility);
      setWeather("sunny" as Weather);
      setComment("");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data);
        setTimeout(() => setErrorMessage(""), 5000);
      } else {
        setErrorMessage("An unexpected error occurred");
        setTimeout(() => setErrorMessage(""), 5000);
      }
    }
  };

  return (
    <div>
      <h3>Add new entry</h3>
      <div>
        <form action="submit" onSubmit={handleCreation}>
          <div>
            date
            <input
              type="date"
              name="date"
              min="1980-01-01"
              max="2025-02-28"
              required
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
          </div>
          <div>
            visibility
            <input
              type="radio"
              id="visibility1"
              name="visibility"
              value="great"
              onChange={({ target }) =>
                setVisibility(target.value as Visibility)
              }
            />
            <label htmlFor="visibility1">great</label>
            <input
              type="radio"
              id="visibility2"
              name="visibility"
              value="good"
              onChange={({ target }) =>
                setVisibility(target.value as Visibility)
              }
            />
            <label htmlFor="visibility2">good</label>
            <input
              type="radio"
              id="visibility3"
              name="visibility"
              value="ok"
              onChange={({ target }) =>
                setVisibility(target.value as Visibility)
              }
            />
            <label htmlFor="visibility3">ok</label>
            <input
              type="radio"
              id="visibility4"
              name="visibility"
              value="poor"
              onChange={({ target }) =>
                setVisibility(target.value as Visibility)
              }
            />
            <label htmlFor="visibility4">poor</label>
          </div>
          <div>
            weather
            <input
              type="radio"
              id="weather1"
              name="weather"
              value="sunny"
              onChange={({ target }) => setWeather(target.value as Weather)}
            />
            <label htmlFor="weather1">sunny</label>
            <input
              type="radio"
              id="weather2"
              name="weather"
              value="rainy"
              onChange={({ target }) => setWeather(target.value as Weather)}
            />
            <label htmlFor="weather2">rainy</label>
            <input
              type="radio"
              id="weather3"
              name="weather"
              value="cloudy"
              onChange={({ target }) => setWeather(target.value as Weather)}
            />
            <label htmlFor="weather3">cloudy</label>
            <input
              type="radio"
              id="weather4"
              name="weather"
              value="stormy"
              onChange={({ target }) => setWeather(target.value as Weather)}
            />
            <label htmlFor="weather4">stormy</label>
            <input
              type="radio"
              id="weather5"
              name="weather"
              value="windy"
              onChange={({ target }) => setWeather(target.value as Weather)}
            />
            <label htmlFor="weather5">windy</label>
          </div>
          <div>
            comment
            <input
              type="text"
              name="comment"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
          </div>
          <button type="submit">add</button>
        </form>
      </div>
    </div>
  );
};
export default NewDiary;
