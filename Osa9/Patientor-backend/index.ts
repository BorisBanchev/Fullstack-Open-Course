import express from "express";
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
