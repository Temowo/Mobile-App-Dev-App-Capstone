import React, { useEffect, useState } from "react";

const OtpTimer = ({ handleClick = null }) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const [click, setClick] = useState(0);

  const handleResendOTP = () => {
    setMinutes(0);
    setSeconds(60);
    setClick((prevState) => prevState + 1);
    handleClick();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  return (
    <div className="flex justify-between w-full">
      <p>
        Timer: {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </p>

      <button
        disabled={seconds > 0 || minutes > 0 || click > 1}
        onClick={handleResendOTP}
        style={{
          padding: "0",
          background: "none",
          border: "none",
          outline: "none",
          color: seconds > 0 || minutes > 0 || click > 1 ? "gray" : "#0A7A89",
          cursor: "pointer",
        }}
        class="font-semibold"
      >
        Resend OTP
      </button>
    </div>
  );
};

OtpTimer.defaultProps = {
  handleClick: function () {
    return null;
  },
};

export default OtpTimer;
