import express from "express";
import { connectDB } from "./utils/feature.js";
import dotenv from "dotenv";
import { errorMiddleWare } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import cors from "cors";

import userRoute from "./routes/user.js";

dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;

const PORT = process.env.PORT || 3000;

connectDB(mongoURI);
// createUser(10);

const app = express();
const server = createServer(app);

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    // here we can pass the origin of all things means kon kon se url allow krna hai
    // in origin we can pass the array of url
    origin: ["http://localhost:5173", "http://localhost:4173", process.env.CLIENT_URL],
    credentials: true,
  })
);

app.use("/api/v1/user", userRoute);

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(errorMiddleWare);
// here insted of app we use the server
server.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
