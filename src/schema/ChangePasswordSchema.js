import * as yup from "yup";

export const ChangePasswordSchema = yup.object({
  currentPassword: yup.string().required("Please enter your current password"),
  newPassword: yup.string().required("Please enter your new password"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  //   "Minimum of 8 characters, at least one upper & lower case and a number"
  // ),
  reEnterPassword: yup
    .string()
    .required("Please re-enter your password")
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    //   "Minimum of 8 characters, at least one upper & lower case and a number"
    // )
    .oneOf([yup.ref("newPassword"), null], "Passwords don't match!"),
});
