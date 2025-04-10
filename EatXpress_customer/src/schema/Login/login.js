import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Your email is required")
    .email("This is an invalid format")
    .trim()
    .lowercase(),
  // password: yup
  //   .string()
  //   .required("Please Enter your password")
  //   .matches(
  //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  //   ),
});
