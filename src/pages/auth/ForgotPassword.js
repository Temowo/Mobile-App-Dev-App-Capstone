import React, { useState } from "react";
import Logo from "../../assets/images/logo.png";
import { ForgotPasswordSchema } from "../../schema/YupSchema";
import Spinner from "../../components/ui/Spinner";
import authentication from "../../features/auth";
import { useFormik } from "formik";
import Input from "../../components/Input";
import { NotifyError, NotifySuccess } from "../../components/toast/toast";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const handleSubmit = (values) => {
    authentication("forgetPassword", values)()
      .then((res) => {
        if (res) {
          setLoading(false);
          NotifySuccess(res.data.message);
          Navigate("/resend-otp", { state: values });
        }
      })
      .catch((e) => {
        setLoading(false);
        NotifyError(e.response.data.message);
      });
  };

  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit(values) {
      setLoading(true);
      handleSubmit(values);
    },
    validationSchema: ForgotPasswordSchema,
  });

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div>
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            <img class="mx-auto h-8 w-auto my-3" src={Logo} alt="foodswipe" />
            Forgot Password
          </h2>
          <p class="text-center">
            Enter your email to get a password reset link.
          </p>
        </div>

        <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={formik.handleSubmit} className="flex flex-col w-full">
            <Input
              id="email"
              dimension="xl"
              variant="primary"
              {...formik.getFieldProps("email")}
              // label="Username"
              type="text"
              placeholder={"Email"}
              // required
              error={formik.touched.email ? formik.errors.email : undefined}
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
              // disabled={!isValid}
              className="button primary wide mt-10 disabled:opacity-70"
            >
              {loading ? <Spinner /> : "Send Link"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
