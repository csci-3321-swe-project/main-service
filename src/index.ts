import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (_, res) => {
  res.send("Working.");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
