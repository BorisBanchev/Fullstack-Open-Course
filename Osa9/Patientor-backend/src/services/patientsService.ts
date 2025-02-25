import patients from "../data/patients";
import { PatientPublicEntry, newPatientEntry, PatientEntry } from "../types";
import { v1 as uuid } from "uuid";

const getEntries = (): PatientPublicEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: newPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
    entries: [],
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getPatientEntry = (id: string): PatientEntry | undefined => {
  const patientEntry = patients.find((p) => p.id === id);
  return patientEntry;
};

export default {
  getEntries,
  addPatient,
  getPatientEntry,
};
