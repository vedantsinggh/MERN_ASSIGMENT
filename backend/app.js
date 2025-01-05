import express from "express";
import { connectDB } from "./utils/feature.js";
import dotenv from "dotenv";
import { errorMiddleWare } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.js";

dotenv.config({ path: "./.env" });

const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

connectDB(mongoURI);

const app = express();

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Allow multiple origins dynamically
const allowedOrigins = [
  'https://exquisite-babka-e697d0.netlify.app',
  'http://localhost:5173', // For development
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Handle preflight requests
app.options('*', cors());

// Routes
app.use("/api/v1/user", userRoute);

app.get("/", (req, res) => {
  res.send("hello");
});

// Error handling middleware
app.use(errorMiddleWare);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
i
