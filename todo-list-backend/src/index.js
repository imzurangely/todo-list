import app from "./app.js";
import env from "./config/env.js";

app.listen(env.port, () => {
  console.log(`[server] API escuchando en http://localhost:${env.port}/api`);
});
