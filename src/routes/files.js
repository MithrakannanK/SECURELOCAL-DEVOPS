const express = require("express");
const router = express.Router();

let files = [];
let nextId = 1;

// POST /api/files —  to  add file 
router.post("/", (req, res) => {
  const { fileName, fileType, size } = req.body;

  if (!fileName) {
    return res.status(400).json({ error: "fileName is required" });
  }

  const newFile = {
    id: nextId++,
    fileName,
    fileType: fileType || "unknown",
    size: size || 0,
    uploadedAt: new Date().toISOString(),
  };

  files.push(newFile);
  res.status(201).json(newFile);
});

// GET /api/files — list all files
router.get("/", (req, res) => {
  res.json({ count: files.length, files: files });
});

// DELETE /api/files/:id — delete a file by id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = files.findIndex((f) => f.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "File not found" });
  }

  const deleted = files.splice(index, 1);
  res.json({ message: "File deleted", deleted: deleted[0] });
});

module.exports = router;