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
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addPatient,
};
