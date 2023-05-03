import cors from "cors";
import express from "express";
import errorHandler from "../error-handlers/error-handler";
import account from "../routes/account";
import courses from "../routes/courses";
import options from "../routes/options";
import tokens from "../routes/tokens";
import users from "../routes/users";
import terms from "../routes/terms";

// Creates a server instance
function createServer(){
    const app = express();

    // Middleware
    app.use(express.json());
    app.use(cors());

    // Routes
    app.use("/courses", courses);
    app.use("/account", account);
    app.use("/users", users);
    app.use("/tokens", tokens);
    app.use("/options", options);
    app.use("/terms", terms);

    // Error Handlers
    app.use(errorHandler);

    return app
}

export default createServer
