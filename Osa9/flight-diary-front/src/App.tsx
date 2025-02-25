import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import diaryService from "./services/diaryService";
import Diaries from "./components/Diaries";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  //const [newDiary, setNewDiary] = useState("");

  useEffect(() => {
    diaryService.getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);
  console.log(diaries);
  return (
    <div>
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;
