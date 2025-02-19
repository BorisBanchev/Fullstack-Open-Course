import patients from "../data/patients";
import { PatientPublicEntry } from "../types";

const getEntries = (): PatientPublicEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getEntries,
};
