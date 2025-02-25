import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import diaryService from "./services/diaryService";
import Diaries from "./components/Diaries";
import NewDiary from "./components/NewDiary";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);
  return (
    <div>
      <NewDiary diaries={diaries} setDiaries={setDiaries} />
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;
