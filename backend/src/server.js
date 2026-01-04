// const express = require("express"); // commonjs
import express from "express"; // need to add type module in package.json
import notesRoutes from "./routes/notesRoutes.js";

const app = express();

app.use("/api/notes", notesRoutes);
// app.get("/api/notes", (req, res) => {
//     res.status(200).send("you got 10 notes");
// });
// app.post("api/notes", (req, res) => {
//     res.status(201).json({message: "Note created successfully!"});
// });
// app.put("api/notes/:id", (req, res) => {
//     res.status(200).json({message: "Note updated successfully!"});
// });
// app.delete("api/notes/:id", (req, res) => {
//     res.status(200).json({message: "Note deleted successfully!"});
// });

app.listen(5001, () => {
  console.log("Server started on PORT: 5001");
});
