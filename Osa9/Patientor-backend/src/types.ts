import { z } from "zod";
import { newPatientSchema } from "./utils";

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

// infer the type from schema
export type newPatientEntry = z.infer<typeof newPatientSchema>;

export type PatientPublicEntry = Omit<PatientEntry, "ssn">;
