import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import register from "./routes/auth.route.js";

const app= express();

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,              
  }))

app.use(express.json());
app.use(cookieParser());

app.use('/',register);




export {app}