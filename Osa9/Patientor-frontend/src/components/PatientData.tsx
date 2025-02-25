import { useEffect, useState } from "react";
import patientService from "../services/patients";
import { Patient } from "../types";
import { useParams } from "react-router-dom";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

const renderGenderIcon = (gender: string) => {
  switch (gender) {
    case "male":
      return <MaleIcon />;
    case "female":
      return <FemaleIcon />;
    case "other":
      return <TransgenderIcon />;
    default:
      return null;
  }
};

const PatientData = () => {
  const [patientData, setPatientData] = useState<Patient>();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (id) {
      patientService.getPatient(id).then((data) => setPatientData(data));
    }
  }, [id]);

  return (
    <div>
      {patientData ? (
        <div>
          <h1>
            {patientData.name} {renderGenderIcon(patientData.gender)}
          </h1>
          <p>ssn: {patientData.ssn}</p>
          <p>occupation: {patientData.occupation}</p>
        </div>
      ) : (
        <p> Loading...</p>
      )}
    </div>
  );
};

export default PatientData;
