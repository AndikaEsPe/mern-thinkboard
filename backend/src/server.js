// const express = require("express"); // commonjs
import express from "express"; // need to add type module in package.json
import dotenv from "dotenv";
import cors from "cors";
import path from "path"; // for deployment

import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve(); // for deployment

// middleware: function that runs between request and response
app.use(express.json()); // to parse JSON bodies: req.body; must be before routes

// app.use(cors()); // allow every requests from every single url
// this should be before ratelimiter
if (process.env.NODE_ENV !== "production") {
  app.use(cors({
    origin: "http://localhost:5173"
  })); // originally this is not allowed e.g. we are coming from frontend localhost:3000 then send a request to API backend at http://api.example.com
}
  

app.use(rateLimiter);


// example of simple custom middleware
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next(); //Use next() to pass control to the next middleware and continue executing the current function. Use return next() to ensure no further code in the current middleware function executes after passing control.
// });

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/../frontend/dist"))); // for deployment
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/../frontend", "dist", "index.html"));
  })
}


// connectDB(); // better to guarantee connect db first before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
