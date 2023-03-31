import createServer from "./utilities/server";
import environment from "./utilities/environment";

const app = createServer()
const port = environment.PORT;

// Listening
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app