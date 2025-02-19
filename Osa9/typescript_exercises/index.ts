import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, Result } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) || !height || !weight) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const bmi = calculateBmi(height, weight);
  res.json({ height, weight, bmi });
});

app.post("/exercises", (req, res) => {
  //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing!" });
    return;
  }
  if (isNaN(Number(target))) {
    res.status(400).json({ error: "malformatted parameters!" });
    return;
  }
  if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((ex) => !isNaN(Number(ex)))
  ) {
    res.status(400).json({ error: "malformatted parameters!" });
    return;
  }

  const dailyExercises: number[] = daily_exercises.map((ex) => Number(ex));

  const result: Result = calculateExercises(dailyExercises, Number(target));
  res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
