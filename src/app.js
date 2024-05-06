import express from "express";
import path from 'path';
import cookieParser from "cookie-parser";
import cors from 'cors';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

const app = express();

//Middle ware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload())

//import all routers
import authRouters from './routers/authRouter.js';
import folderRouters from './routers/folderRouter.js';
import shareRouters from './routers/shareRouter.js';


// use all routers
app.get("/", (req, res) => {
  res.send("application is healthy...!")
});

app.use("/auth", authRouters);
app.use("/folders", folderRouters);
app.use("/shares", shareRouters);


//Handling backend express error --> request
app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong...!";

  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});

export default app;