import {
  body,
} from "express-validator";


// REGISTER VALIDATION
export const registerValidation = [

  body("name")
    .notEmpty()
    .withMessage(
      "Name is required"
    ),

  body("email")
    .isEmail()
    .withMessage(
      "Valid email required"
    ),

  body("password")
    .isLength({ min: 6 })
    .withMessage(
      "Password must be at least 6 characters"
    ),

  body("role")
    .isIn([
      "doctor",
      "patient",
    ])
    .withMessage(
      "Invalid role"
    ),
];


// LOGIN VALIDATION
export const loginValidation = [

  body("email")
    .isEmail()
    .withMessage(
      "Valid email required"
    ),

  body("password")
    .notEmpty()
    .withMessage(
      "Password required"
    ),
];