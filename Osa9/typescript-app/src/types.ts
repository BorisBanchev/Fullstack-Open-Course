export interface Header {
  courseName: string;
}

export interface CoursePart {
  name: string;
  exerciseCount: number;
}

export interface Content {
  courseParts: CoursePart[];
}

export interface Total {
  totalExercises: number;
}
