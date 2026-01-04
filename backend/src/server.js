// const express = require("express"); // commonjs
import express from "express"; // need to add type module in package.json
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use("/api/notes", notesRoutes);

connectDB();

app.listen(PORT, () => {
  console.log("Server started on PORT:", PORT);
});
