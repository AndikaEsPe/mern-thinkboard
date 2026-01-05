// const express = require("express"); // commonjs
import express from "express"; // need to add type module in package.json
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middleware: function that runs between request and response
app.use(express.json()); // to parse JSON bodies: req.body; must be before routes
app.use(rateLimiter)
// example of simple custom middleware
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next(); //Use next() to pass control to the next middleware and continue executing the current function. Use return next() to ensure no further code in the current middleware function executes after passing control.
// });

app.use("/api/notes", notesRoutes);

// connectDB(); // better to guarantee connect db first before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
