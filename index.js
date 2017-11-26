const server = require("./server");

const dev = process.env.NODE_ENV !== "production";
const next = require("next");
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  server.get("*", (req, res) => {
    return handle(req, res);
  });
  /* eslint-disable no-console */
  server.listen(3000, err => {
    if (err) {
      throw err;
    }
    console.log("> Server ready on http://localhost:3000");
  });
});

module.exports = server;
