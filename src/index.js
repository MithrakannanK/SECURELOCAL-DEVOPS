const express = require("express");
const cors = require("cors");
require("dotenv").config();

const healthRoute = require("./routes/health");
const filesRoute = require("./routes/files");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/health", healthRoute);
app.use("/api/files", filesRoute);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to SecureLocal API" });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`SecureLocal server running on port ${PORT}`);
  });
}

module.exports = app;