import { Request, Response } from "express";
import express from "express";
import patientsService from "../services/patientsService";
import { newPatientParser } from "../middlewares/newPatientParser";
import { newPatientEntry, PatientEntry } from "../types";
import { errorMiddleware } from "../middlewares/errorHandler";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getEntries());
});

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, newPatientEntry>,
    res: Response<PatientEntry>
  ) => {
    const addedEntry = patientsService.addPatient(req.body);
    res.json(addedEntry);
  }
);
router.use(errorMiddleware);

export default router;
