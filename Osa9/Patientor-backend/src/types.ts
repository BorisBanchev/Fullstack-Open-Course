import { z } from "zod";
import { newPatientSchema } from "./utils";

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

// infer the type from schema
export type newPatientEntry = z.infer<typeof newPatientSchema>;

export type PatientPublicEntry = Omit<PatientEntry, "ssn" | "entries">;
