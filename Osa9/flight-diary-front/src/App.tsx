import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import diaryService from "./services/diaryService";
import Diaries from "./components/Diaries";
import NewDiary from "./components/NewDiary";
import ErrorNotification from "./components/ErrorNotification";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    diaryService.getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);
  return (
    <div>
      <ErrorNotification errorMessage={errorMessage} />
      <NewDiary
        diaries={diaries}
        setDiaries={setDiaries}
        setErrorMessage={setErrorMessage}
      />
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;
