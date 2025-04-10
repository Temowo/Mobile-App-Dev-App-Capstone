import React, { useState } from "react";
import { ProfileSubnav } from "../../components/subnavigation";
import Card from "../../components/ui/Card";
import Input from "../../components/Input";
import { useFormik } from "formik";
import { ChangePasswordSchema } from "../../schema/YupSchema";
import profile from "../../features/profile";
import { NotifyError, NotifySuccess } from "../../components/toast/toast";
import { EyeIcon, EyeSlashIcon } from "../../assets";
import Spinner from "../../components/ui/Spinner";

const ProfileSettings = () => {
  const [oldPassword, setOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (payload) => {
    setLoading(true);
    profile("changePassword", payload)()
      .then((res) => {
        if (res) {
          setLoading(false);
          NotifySuccess(res.data.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        NotifyError(error.response.data.message);
      });
  };
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    onSubmit(values) {
      handleSubmit({
        oldPassword: values.oldPassword,
        newPassword: values.confirmNewPassword,
      });
    },
    validationSchema: ChangePasswordSchema,
  });

  return (
    <div className="main-section profile-section">
      <div>
        <ProfileSubnav />
      </div>

      <div className="row-1">
        <Card>
          <h1 className=" text-xl">Change Password</h1>
          <div className="flex flex-col my-10">
            <form onSubmit={formik.handleSubmit}>
              <Input
                id="oldPassword"
                dimension="xl"
                variant="primary"
                {...formik.getFieldProps("oldPassword")}
                rightSlot={() => (
                  <span
                    onClick={() => setOldPassword(!oldPassword)}
                    className="absolute right-4 top-4 cursor-pointer"
                  >
                    {oldPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </span>
                )}
                type={oldPassword ? "text" : "password"}
                placeholder={"Current password"}
                error={
                  formik.touched.oldPassword
                    ? formik.errors.oldPassword
                    : undefined
                }
              />

              <Input
                id="newPassword"
                dimension="xl"
                variant="primary"
                {...formik.getFieldProps("newPassword")}
                rightSlot={() => (
                  <span
                    onClick={() => setNewPassword(!newPassword)}
                    className="absolute right-4 top-4 cursor-pointer"
                  >
                    {newPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </span>
                )}
                type={newPassword ? "text" : "password"}
                placeholder={"New password"}
                error={
                  formik.touched.newPassword
                    ? formik.errors.newPassword
                    : undefined
                }
              />

              <Input
                id="confirmNewPassword"
                dimension="xl"
                variant="primary"
                {...formik.getFieldProps("confirmNewPassword")}
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
                placeholder={"Confirm password"}
                error={
                  formik.touched.confirmNewPassword
                    ? formik.errors.confirmNewPassword
                    : undefined
                }
              />

              <button
                type="submit"
                className="button primary wide mt-10 disabled:opacity-70"
              >
                {loading ? <Spinner /> : "Update Address"}
              </button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSettings;
