import { body, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const registerHandler = () => [
  // for user register name, username,passord, intresets
  body("name", "Please Enter  Name").notEmpty(),
  body("username", "please Enter Username").notEmpty(),
  body("password", "Password must be at least 8 characters").isLength({ min: 8 }),
  // here we dont have to check on the itreset
];

const loginHandler = () => [
  body("username", "Please Enter  Username").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];

const sendRequestValidators = () => [body("userId", "please Enter user id").notEmpty()];

const acceptRequestValidators = () => [
  body("requestId", "Please Enter request ID").notEmpty(),
  body("accept")
    .notEmpty()
    .withMessage("Please Add Accept")
    .isBoolean()
    .withMessage("Accept must be boolean"),
];
const mutualFriendHandler = [body("userId", "Please Enter UserId").notEmpty()];

const validateHandler = (req, res, next) => {
  // here jo chiz present nhi rhega usse array banna kr return kr denge
  const errors = validationResult(req);

  const errorMessage = errors
    .array()
    .map((error) => error.msg)
    .join(",");
  // here we got the array of the errorMessage
  if (errors.isEmpty()) next();
  else next(new ErrorHandler(errorMessage, 404));
};

export {
  registerHandler,
  validateHandler,
  loginHandler,
  sendRequestValidators,
  acceptRequestValidators,
  mutualFriendHandler,
};
