import createServer from "./utilities/server";
import environment from "./utilities/environment";
import swaggerDocs from "./utilities/swagger";

// Creating server
const app = createServer()
const port = environment.PORT;

// Listening
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);

  swaggerDocs(app, parseInt(port))
});


export default app