import React, { useState } from "react";
import Logo from "../../assets/images/logo.png";
import Spinner from "../../components/ui/Spinner";
import authentication from "../../features/auth";
import { useFormik } from "formik";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { VerifyAccountSchema } from "../../schema/YupSchema";
import { NotifyError, NotifySuccess } from "../../components/toast/toast";

const VerifyAccount = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (payload) => {
    setLoading(true);
    authentication("verifyAccount", payload)()
      .then((res) => {
        if (res) {
          setLoading(false);
          NotifySuccess(res.data.message);
          navigate("/");
        }
      })
      .catch((error) => {
        setLoading(false);
        NotifyError(error.response.data.message);
      });
  };

  const formik = useFormik({
    initialValues: { email: "", token: "" },
    onSubmit(values) {
      handleSubmit(values);
    },
    validationSchema: VerifyAccountSchema,
  });
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div>
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            <img class="mx-auto h-8 w-auto my-3" src={Logo} alt="foodswipe" />
            Verify your account
          </h2>
        </div>

        <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
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
              id="token"
              dimension="xl"
              variant="primary"
              {...formik.getFieldProps("token")}
              type="text"
              placeholder={"Token"}
              error={formik.touched.token ? formik.errors.token : undefined}
            />

            {/* <div class=" mt-2 text-sm">
              <Link
                to={"/forgot-password"}
                class="font-semibold text-foodswipe-turquoise hover:text-blue-900"
              >
                Forgot password?
              </Link>
            </div> */}

            <button
              type="submit"
              // disabled={!isValid}
              className="button primary wide mt-10 disabled:opacity-70"
            >
              {loading ? <Spinner /> : "Verify Account"}
            </button>
            {/* <p className=" text-rose-700">{error ? error.message : ""}</p> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default VerifyAccount;
