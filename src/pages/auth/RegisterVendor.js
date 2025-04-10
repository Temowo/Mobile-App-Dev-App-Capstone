import React, { useState } from "react";
import Card from "../../components/ui/Card";
import Input from "../../components/Input";
import { useFormik } from "formik";
import Spinner from "../../components/ui/Spinner";
import { RegisterVendorSchema } from "../../schema/YupSchema";
import authentication from "../../features/auth";
import { NotifyError, NotifySuccess } from "../../components/toast/toast";

const RegisterVendor = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (payload) => {
    setLoading(true);
    authentication("registerVendor", payload)()
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

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      orderFeePercentage: "",
    },
    onSubmit(values) {
      handleSubmit(values);
    },
    validationSchema: RegisterVendorSchema,
  });
  return (
    <div className="main-section profile-section">
      <div className="row-1">
        <Card>
          <h1 className=" text-xl">Register a Vendor</h1>
          <div className="flex flex-col my-10">
            <form onSubmit={formik.handleSubmit}>
              <Input
                id="name"
                dimension="xl"
                variant="primary"
                {...formik.getFieldProps("name")}
                type={"text"}
                placeholder={"Restaurant Name"}
                error={formik.touched.name ? formik.errors.name : undefined}
              />
              <Input
                id="email"
                dimension="xl"
                variant="primary"
                {...formik.getFieldProps("email")}
                type={"text"}
                placeholder={"Restaurant Email"}
                error={formik.touched.email ? formik.errors.email : undefined}
              />
              <Input
                id="phone"
                dimension="xl"
                variant="primary"
                {...formik.getFieldProps("phone")}
                type={"text"}
                placeholder={"Phone Number"}
                error={formik.touched.phone ? formik.errors.phone : undefined}
              />
              <Input
                id="orderFeePercentage"
                dimension="xl"
                variant="primary"
                {...formik.getFieldProps("orderFeePercentage")}
                type={"text"}
                placeholder={"Order Fee Percentage"}
                error={
                  formik.touched.orderFeePercentage
                    ? formik.errors.orderFeePercentage
                    : undefined
                }
              />
              <button
                type="submit"
                className="button primary wide mt-10 disabled:opacity-70"
              >
                {loading ? <Spinner /> : "Register Vendor"}
              </button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterVendor;
