import express from "express";
import errorHandler from "./error-handlers/error-handler";
import verifyToken from "./middleware/verify-token";
import courses from "./routes/courses";
import tokens from "./routes/tokens";
import users from "./routes/users";
import environment from "./utilities/environment";

const app = express();
const port = environment.PORT;

// Middleware
app.use(express.json());

// Routes
app.use("/courses", verifyToken, courses);
app.use("/users", verifyToken, users);
app.use("/tokens", tokens);

// Error Handlers
app.use(errorHandler);

// Listening
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
