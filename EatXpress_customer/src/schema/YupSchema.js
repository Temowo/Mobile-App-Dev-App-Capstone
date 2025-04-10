import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string()
    .required("Your email is required")
    .email("This is an invalid format")
    .trim()
    .lowercase(),
  password: Yup.string().required("Please enter your password"),
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //   "Minimum of 8 characters, at least one upper & lower case and a number"
  // ),
});

export const ForgotPasswordSchema = Yup.object({
  email: Yup.string()
    .required("Your email is required")
    .email("This is an invalid format")
    .trim()
    .lowercase(),
});

export const ResetPasswordSchema = Yup.object({
  token: Yup.string().required("Please Enter your token"),
  password: Yup.string()
    .required("Please Enter your new password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "min: 8, (number, no-space, uppercase, lowercase, and special character)"
    ),
  confirmPassword: Yup.string()
    .required("Please confirm your new password")
    .oneOf([Yup.ref("password"), null], "Passwords don't match!"),
});

export const VerifyAccountSchema = Yup.object({
  // email: Yup.string()
  //   .required("Your email is required")
  //   .email("This is an invalid format")
  //   .trim()
  //   .lowercase(),
  token: Yup.string().required("Your token is required"),
});

export const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  phone: Yup.string()
    .required("Your phone number is required")
    .matches(/^(\+?234|0)[789]\d{9}$/, "Phone number is not valid"),
});
