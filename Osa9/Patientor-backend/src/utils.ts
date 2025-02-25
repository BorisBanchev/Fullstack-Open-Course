import {
  newPatientEntry,
  Gender,
  Entry,
  HospitalEntry,
  OccupationalHealthCareEntry,
} from "./types";
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

export const isHospitalEntry = (entry: Entry): entry is HospitalEntry => {
  return entry.type === "HospitalEntry";
};

export const isOccupationalHealthCareEntry = (
  entry: Entry
): entry is OccupationalHealthCareEntry => {
  return entry.type === "OccupationalHealthCareEntry";
};

export default toNewPatientEntry;
