import React, { useState } from "react";
import Logo from "../../assets/images/logo.png";
import { LoginSchema } from "../../schema/YupSchema";
import Spinner from "../../components/ui/Spinner";
import authentication from "../../features/auth";
import { useFormik } from "formik";
import Input from "../../components/Input";
import { EyeIcon, EyeSlashIcon } from "../../assets";
import { NotifySuccess } from "../../components/toast/toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../slice/user";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (values) => {
    authentication("login", values)().then((res) => {
      if (res) {
        setLoading(false);
        NotifySuccess("Login Successful");
        dispatch(login(res.data));
       navigate("/home", { replace: true });
      console.log(res.data);
      } else {
        setLoading(false);
      }
    });
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit(values) {
      setLoading(true);
      handleSubmit(values);
    },
    validationSchema: LoginSchema,
  });

  const [error, setError] = useState("");

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            <img
              className="mx-auto h-8 w-auto my-3"
              src={Logo}
              alt="foodswipe"
            />
            Sign in to your account
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={formik.handleSubmit} className="flex flex-col w-full">
            <Input
              id="email"
              dimension="xl"
              variant="primary"
              {...formik.getFieldProps("email")}
              type="text"
              placeholder={"Email"}
              error={formik.touched.email ? formik.errors.email : undefined}
            />

            <Input
              id="password"
              dimension="xl"
              variant="primary"
              {...formik.getFieldProps("password")}
              rightSlot={() => (
                <span
                  onClick={() => togglePasswordVisibility()}
                  className="absolute right-4 top-4 cursor-pointer"
                >
                  {passwordVisible ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </span>
              )}
              type={passwordVisible ? "text" : "password"}
              placeholder={"Password"}
              error={
                formik.touched.password ? formik.errors.password : undefined
              }
            />

            <div className=" mt-2 text-sm">
              <Link
                to={"/forgot-password"}
                className="font-semibold text-foodswipe-turquoise hover:text-blue-900"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              // disabled={!isValid}
              className="button primary wide mt-10 disabled:opacity-70"
            >
              {loading ? <Spinner /> : "Login"}
            </button>
            <p className=" text-rose-700">{error ? error.message : ""}</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
