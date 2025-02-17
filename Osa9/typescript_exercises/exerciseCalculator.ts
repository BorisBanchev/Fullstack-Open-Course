interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateTrainingDays = (exerciseHours: number[]): number => {
  let trainingDays: number = 0;
  exerciseHours.forEach((element) => {
    if (element != 0) {
      trainingDays += 1;
    }
  });
  return trainingDays;
};

const calculateAverageTrainingTime = (exerciseHours: number[]): number => {
  let total: number = 0;
  exerciseHours.forEach((element) => {
    total += element;
  });
  return total / exerciseHours.length;
};

const calculateExercises = (
  exerciseHours: number[],
  target: number
): Result => {
  const periodLength: number = exerciseHours.length;
  const trainingDays: number = calculateTrainingDays(exerciseHours);
  const averageTrainingHours: number =
    calculateAverageTrainingTime(exerciseHours);
  const success: boolean = averageTrainingHours >= target ? true : false;
  let rating: number;
  let ratingDescription: string;
  if (averageTrainingHours < 0.5 * target) {
    rating = 1;
    ratingDescription = "You could've done better!";
  } else if (
    averageTrainingHours >= 0.75 * target &&
    averageTrainingHours < target
  ) {
    rating = 2;
    ratingDescription = "You almost crushed it!";
  } else {
    rating = 3;
    ratingDescription = "You did perfect!";
  }
  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: averageTrainingHours,
  };
};

try {
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
