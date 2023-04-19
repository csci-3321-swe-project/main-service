import createServer from "./utilities/server";
import cors from "cors";
import express from "express";
import errorHandler from "./error-handlers/error-handler";
import account from "./routes/account";
import courses from "./routes/courses";
import options from "./routes/options";
import tokens from "./routes/tokens";
import users from "./routes/users";
import terms from "./routes/terms";
import environment from "./utilities/environment";

// Creating server
const app = createServer()
const port = environment.PORT;

// Listening
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app