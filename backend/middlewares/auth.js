import { TryCatch } from "./error.js";
import { ErrorHandler } from "../utils/utility.js";
import jwt from "jsonwebtoken";

const isAuthenticated = TryCatch(async (req, res, next) => {
  const token = req.cookies["token"];
  // console.log("cookies", req.cookies);

  if (!token) {
    return next(new ErrorHandler("please login to access this route ", 401));
  }

  try {
    // Verify the token and extract the user ID
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedData._id;
    // console.log("req.user",req.user);

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle token verification errors (e.g., token expired or invalid)
    return next(new ErrorHandler("Invalid or expired token, please log in again", 401));
  }
});

export { isAuthenticated };
