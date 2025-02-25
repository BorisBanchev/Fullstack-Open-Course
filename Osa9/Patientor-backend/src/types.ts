import { z } from "zod";
import { newPatientSchema } from "./utils";

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type

interface Discharge {
  date: string;
  criteria: string;
}
interface SickLeave {
  startDate: string;
  endDate: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnosisEntry["code"]>;
}

export interface HospitalEntry extends BaseEntry {
  discharge: Discharge;
  type: "HospitalEntry";
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  employerName: string;
  sickLeave: SickLeave;
  type: "OccupationalHealthCareEntry";
}

export type Entry = HospitalEntry | OccupationalHealthCareEntry;

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
