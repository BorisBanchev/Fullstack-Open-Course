import { useState } from "react";
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from "../types";
import { SyntheticEvent } from "react";
import diaryService from "../services/diaryService";

const NewDiary = ({
  diaries,
  setDiaries,
}: {
  diaries: DiaryEntry[];
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
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
      console.error("Failed to create diary entry", error);
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
              type="text"
              name="date"
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
          </div>
          <div>
            visibility
            <input
              type="text"
              name="visibility"
              value={visibility}
              onChange={({ target }) =>
                setVisibility(target.value as Visibility)
              }
            />
          </div>
          <div>
            weather
            <input
              type="text"
              name="weather"
              value={weather}
              onChange={({ target }) => setWeather(target.value as Weather)}
            />
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
