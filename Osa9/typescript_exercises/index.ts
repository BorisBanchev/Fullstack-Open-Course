import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
