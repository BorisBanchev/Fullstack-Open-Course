export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) {
    return "underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return "normal weight";
  } else if (bmi >= 25 && bmi <= 29.9) {
    return "overweight";
  }
  return "obese";
};

const parseArgumentsForBmi = (
  args: string[]
): { height: number; weight: number } => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");
  const height = Number(args[2]);
  const weight = Number(args[3]);
  if (isNaN(height)) {
    throw new Error("Provided height value was not a number!");
  }
  if (isNaN(weight)) {
    throw new Error("Provided weight value was not a number!");
  }
  return { height, weight };
};

if (require.main === module) {
  try {
    const { height, weight } = parseArgumentsForBmi(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}
