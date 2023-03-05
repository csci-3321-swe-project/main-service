import dotenv from "dotenv";
import express from "express";
import courses from "./routes/courses";
import users from "./routes/users";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use("/courses", courses);
app.use("/users", users);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
