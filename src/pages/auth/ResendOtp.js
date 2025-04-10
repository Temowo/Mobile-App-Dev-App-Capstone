import React, { useState } from "react";
import Logo from "../../assets/images/logo.png";
import Spinner from "../../components/ui/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import OtpTimer from "../../components/otp-timer/otp-timer";
import authentication from "../../features/auth";
import { NotifyError, NotifySuccess } from "../../components/toast/toast";

const ResendOtp = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const email = location.state.email;
  const navigate = useNavigate();

  const handleSubmit = () => {
    const reqPayload = { email: email };
    authentication("forgetPassword", reqPayload)()
      .then((res) => {
        if (res) {
          setLoading(false);
          NotifySuccess(res.data.message);
        }
      })
      .catch((e) => {
        setLoading(false);
        NotifyError(e.response.data.message);
      });
  };

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
            OTP Sent!
          </h2>
          <div className="my-5 flex flex-col items-center justify-center">
            <span>Your reset password OTP has been sent to</span>
            <span>{email}</span>
            <span>Didn't get an email?</span>
          </div>
        </div>
        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex justify-between mt-2 text-sm">
            <OtpTimer handleClick={handleSubmit} />
          </div>
          <button
            type="submit"
            className="button primary wide mt-10 disabled:opacity-70"
            onClick={() => navigate("/reset-password")}
          >
            {loading ? <Spinner /> : "Reset"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ResendOtp;
