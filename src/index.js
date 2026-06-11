const express = require("express");
const cors = require("cors");
require("dotenv").config();

const healthRoute = require("./routes/health");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/health", healthRoute);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to SecureLocal API" });
});

app.listen(PORT, () => {
  console.log(`SecureLocal server running on port ${PORT}`);
});