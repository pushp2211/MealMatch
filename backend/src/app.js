import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import helmet from "helmet";
import routes from "./routes/index.js"

const app = express();

// Trust proxy (for secure cookies on Render)
app.set('trust proxy', 1);

// CORS Handling
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Helmet for securing HTTP headers
app.use(helmet());

// for parsing the JSON data 
app.use(express.json());

// For handling/accesing refreshToken from cookies.
app.use(cookieParser()); 

// for backend api calls
app.use("/api", routes);



export {app}