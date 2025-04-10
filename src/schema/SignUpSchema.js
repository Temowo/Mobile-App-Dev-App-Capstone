import * as yup from "yup";

export const SignUpSchema = yup.object({
  email: yup
    .string()
    .required("Your email is required")
    .email("This is an invalid format")
    .trim()
    .lowercase(),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Minimum of 8 characters, at least one upper & lower case and a number"
    ),
});
