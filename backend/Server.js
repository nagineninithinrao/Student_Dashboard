const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

// ---------- MIDDLEWARE ----------
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ---------- ROUTE ----------

// ---------- SERVER ----------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
