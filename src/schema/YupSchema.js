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

export const RegisterVendorSchema = Yup.object({
  name: Yup.string().required("Your name is required"),
  email: Yup.string()
    .required("Your email is required")
    .email("This is an invalid format")
    .trim()
    .lowercase(),
  phone: Yup.string()
    .required("Your phone number is required")
    .matches(/^(\+?234|0)[789]\d{9}$/, "Phone number is not valid"),
  orderFeePercentage: Yup.number().required("Order fee percentage required"),
});

export const ForgotPasswordSchema = Yup.object({
  email: Yup.string()
    .required("Your email is required")
    .email("This is an invalid format")
    .trim()
    .lowercase(),
});

export const VerifyAccountSchema = Yup.object({
  email: Yup.string()
    .required("Your email is required")
    .email("This is an invalid format")
    .trim()
    .lowercase(),
  token: Yup.string().required("Your token is required"),
});

export const AddressSchema = Yup.object({
  street: Yup.string().required("Your street is required"),
  city: Yup.string().required("Your city is required"),
  state: Yup.string().required("Your state is required"),
  lat: Yup.number().typeError("you must specify a number"),
  // .required("Your restaurant latitude is required"),
  lng: Yup.number().typeError("you must specify a number"),
  // .required("Your restaurant longitude is required"),
});

export const ChangePasswordSchema = Yup.object({
  oldPassword: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "min: 8, (number, no-space, uppercase, lowercase, and special character)"
    ),
  newPassword: Yup.string()
    .required("Please Enter your new password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "min: 8, (number, no-space, uppercase, lowercase, and special character)"
    ),
  confirmNewPassword: Yup.string()
    .required("Please re-enter your new password")
    .oneOf([Yup.ref("newPassword"), null], "Passwords don't match!"),
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

export const MenuSchema = Yup.object({
  name: Yup.string().required("Please enter the name of the item "),
  price: Yup.number()
    .required("Please enter price")
    .typeError("you must specify a number")
    .min(1, "Min value 1")
    .max(50000, "Max value 50,000"),
  description: Yup.string().required("Please enter a description"),
  mealType: Yup.string().required("Please select a meal type"),
  category: Yup.string().required("Please select a category"),
  file: Yup.mixed().required("Please upload an image"),
});

export const EditMenuSchema = Yup.object({
  // name: Yup.string(),
  price: Yup.number()
    .required("Please enter price")
    .typeError("you must specify a number")
    .min(1, "Min value 1")
    .max(50000, "Max value 50,000"),
  // description: Yup.string(),
  // mealType: Yup.string(),
  // category: Yup.string(),
  // file: Yup.mixed(),
});
