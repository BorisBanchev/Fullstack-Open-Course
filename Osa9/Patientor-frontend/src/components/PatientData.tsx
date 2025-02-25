import { useEffect, useState } from "react";
import patientService from "../services/patients";
import { Patient, Diagnosis } from "../types";
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

const EntryDetails = ({
  date,
  description,
  diagnoseCodes,
}: {
  date: string;
  description: string;
  diagnoseCodes: Array<Diagnosis["code"]>;
}) => {
  return (
    <div>
      <p>
        {date} {description}
      </p>
      {diagnoseCodes && diagnoseCodes.length > 0 && (
        <div>
          <ul>
            {diagnoseCodes.map((code) => (
              <li key={code}>{code}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
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
          <h3>entries</h3>
          {patientData.entries.map((entry) => (
            <EntryDetails
              key={entry.id}
              date={entry.date}
              description={entry.description}
              diagnoseCodes={entry.diagnosisCodes || []}
            />
          ))}
        </div>
      ) : (
        <p> Loading...</p>
      )}
    </div>
  );
};

export default PatientData;
