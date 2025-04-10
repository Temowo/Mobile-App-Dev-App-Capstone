import React, { useState } from "react";
import Logo from "../../assets/images/logo.png";
import { ResetPasswordSchema } from "../../schema/YupSchema";
import Spinner from "../../components/ui/Spinner";
import authentication from "../../features/auth";
import { useFormik } from "formik";
import Input from "../../components/Input";
import { NotifyError, NotifySuccess } from "../../components/toast/toast";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "../../assets";

const ResetPassword = () => {
  const [token, setToken] = useState(false);
  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    setLoading(true);
    authentication("resetPassword", values)()
      .then((res) => {
        if (res) {
          setLoading(false);
          NotifySuccess(res.data.message);
          navigate("/");
        }
      })
      .catch((e) => {
        setLoading(false);
        NotifyError(e.response.data.message);
      });
  };

  const formik = useFormik({
    initialValues: { token: "", password: "", confirmPassword: "" },
    onSubmit(values) {
      handleSubmit({ token: values.token, password: values.confirmPassword });
    },
    validationSchema: ResetPasswordSchema,
  });

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div>
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            <img class="mx-auto h-8 w-auto my-3" src={Logo} alt="foodswipe" />
            Reset Password
          </h2>
          <p class="text-center">
            Enter your email to get a password reset link.
          </p>
        </div>

        <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={formik.handleSubmit} className="flex flex-col w-full">
            <Input
              id="token"
              dimension="xl"
              variant="primary"
              {...formik.getFieldProps("token")}
              rightSlot={() => (
                <span
                  onClick={() => setToken(!token)}
                  className="absolute right-4 top-4 cursor-pointer"
                >
                  {token ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </span>
              )}
              type={token ? "text" : "password"}
              placeholder={"Token"}
              error={formik.touched.token ? formik.errors.token : undefined}
            />

            <Input
              id="password"
              dimension="xl"
              variant="primary"
              {...formik.getFieldProps("password")}
              rightSlot={() => (
                <span
                  onClick={() => setPassword(!password)}
                  className="absolute right-4 top-4 cursor-pointer"
                >
                  {password ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </span>
              )}
              type={password ? "text" : "password"}
              placeholder={"Password"}
              error={
                formik.touched.password ? formik.errors.password : undefined
              }
            />
            <Input
              id="confirmPassword"
              dimension="xl"
              variant="primary"
              {...formik.getFieldProps("confirmPassword")}
              rightSlot={() => (
                <span
                  onClick={() => setConfirmPassword(!confirmPassword)}
                  className="absolute right-4 top-4 cursor-pointer"
                >
                  {confirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </span>
              )}
              type={confirmPassword ? "text" : "password"}
              placeholder={"Confirm Password"}
              error={
                formik.touched.confirmPassword
                  ? formik.errors.confirmPassword
                  : undefined
              }
            />

            <div class=" mt-2 text-sm">
              <Link
                to={"/"}
                class="font-semibold text-foodswipe-turquoise hover:text-blue-900"
              >
                Remember now?
              </Link>
            </div>

            <button
              type="submit"
              className="button primary wide mt-10 disabled:opacity-70"
            >
              {loading ? <Spinner /> : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
