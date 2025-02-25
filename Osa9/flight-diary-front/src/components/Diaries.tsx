import { DiaryEntry } from "../types";

const Diary = ({ diary }: { diary: DiaryEntry }) => {
  return (
    <div>
      <p>
        <b>{diary.date}</b>
      </p>
      <p>visibility: {diary.visibility}</p>
      <p>weather: {diary.weather}</p>
      <p>comment: {diary.comment}</p>
      <br />
    </div>
  );
};

const Diaries = ({ diaries }: { diaries: DiaryEntry[] }) => {
  return (
    <div>
      <h3>Diary Entries</h3>
      {diaries.map((diary) => (
        <Diary key={diary.id} diary={diary} />
      ))}
    </div>
  );
};

export default Diaries;
