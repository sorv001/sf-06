const express = require("express");
import { Request, Response } from "express";
const app = express();

//Body Parser Middleware
app.use(express.json());
const PORT = 5000;

const data = require("../client/data.json");

// app.get("/", (req: Request, res: Response) => {
//   console.log("Welcome to the Homepage!");
//   res.send("Welcome to the Homepage!");
// });

app.use("/", require("./src/routes/routes"));

// app.all("*", (req: Request, res: Response) => {
//   res.status(404).send("<h1>Resource not found!</h1>");
// });

app.listen(PORT, () => {
  console.log(`server is running on : ${PORT}`);
});
