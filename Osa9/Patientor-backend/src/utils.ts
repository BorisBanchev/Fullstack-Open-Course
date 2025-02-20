import { newPatientEntry, Gender } from "./types";
import { z } from "zod";

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

const toNewPatientEntry = (object: unknown): newPatientEntry => {
  return newPatientSchema.parse(object);
};

export default toNewPatientEntry;
