import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Spinner from "../../components/ui/Spinner";
import Input from "../../components/Input";
import { useFormik } from "formik";
import { AddressSchema } from "../../schema/YupSchema";
import profile from "../../features/profile";
import { NotifySuccess } from "../../components/toast/toast";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import authentication from "../../features/auth";
import { store_user_details } from "../../slice/user";
import { ProfileSubnav } from "../../components/subnavigation";
import UploadPan from "../../components/upload/UploadPan";

const Profile = () => {
  const dispatch = useDispatch();
  const {
    user: { user },
  } = useAuth();

  const address = user.address[user.address.length - 1];

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    authentication("getProfile");
  });

  const handleSubmit = (values) => {
    setLoading(true);
    profile("updateAddress", values)()
      .then((res) => {
        if (res) {
          NotifySuccess(res.data.message);
          return authentication("getProfile")()
            .then((res) => {
              setLoading(false);
              dispatch(store_user_details(res.data.data));
            })
            .catch(() => {
              setLoading(false);
            });
        }
      })
      .catch(() => setLoading(false));
  };

  // useEffect(() => {
  //   // Check if the browser supports geolocation
  //   if (navigator.geolocation) {
  //     // Request the user's location
  //     navigator.geolocation.getCurrentPosition(function (position) {
  //       // Retrieve the latitude from the position object
  //       const latitude = position.coords.latitude;
  //       const longitude = position.coords.longitude;
  //       setLatitude(latitude);
  //       setLongitude(longitude);

  //       // Do something with the latitude value
  //       console.log("Latitude: " + latitude);
  //     });
  //   } else {
  //     // Geolocation is not supported by the browser
  //     console.log("Geolocation is not supported");
  //   }
  // }, []);

  const formik = useFormik({
    initialValues: {
      street: address?.street,
      city: address?.city,
      state: address?.state,
      lat: address?.lat,
      lng: address?.lng,
    },
    onSubmit(values) {
      setLoading(true);
      const formattedValues = {
        street: values.street,
        city: values.city,
        state: values.state,
        lat: Number(values.lat),
        lng: Number(values.lng),
      };
      handleSubmit(formattedValues);
    },
    validationSchema: AddressSchema,
  });

  // const onSubmit = (data) => {
  //   updatePassword(data.newPassword);
  // };

  return (
    <div className="main-section profile-section">
      <div className="">
        <ProfileSubnav />
      </div>

      <div className="row-1">
        <Card>
          <h1 className="text-xl">Restaurant Information</h1>
          <div className="flex flex-col my-10">
            <label>Display Image</label>
            <UploadPan />
          </div>

          <div className="flex flex-col my-10">
            <label>Restaurant Name</label>
            <p>{user.user.name}</p>
            <div className="flex flex-col my-10">
              <label>Email</label>
              <p>{user.user.email}</p>
            </div>

            <div className="flex flex-col w-1/2 mr-2">
              <label>Mobile</label>
              <p>{user.user.phone}</p>
            </div>
          </div>
        </Card>
        <Card>
          <h1 className=" text-xl">Address</h1>
          <p className="mt-2">
            Please enable location on your browser. We will need this to get the
            accurate latitude & longitude of your restaurant.
          </p>
          <div className="flex flex-col my-2">
            <form onSubmit={formik.handleSubmit}>
              <Input
                id="street"
                dimension="xl"
                variant="primary"
                {...formik.getFieldProps("street")}
                type="text"
                placeholder={"Street"}
                error={formik.touched.street ? formik.errors.street : undefined}
              />

              <Input
                id="city"
                dimension="xl"
                variant="primary"
                {...formik.getFieldProps("city")}
                type="text"
                placeholder={"City"}
                error={formik.touched.city ? formik.errors.city : undefined}
              />

              <Input
                id="state"
                dimension="xl"
                variant="primary"
                {...formik.getFieldProps("state")}
                type="text"
                placeholder={"State"}
                error={formik.touched.state ? formik.errors.state : undefined}
              />

              <Input
                id="lat"
                dimension="xl"
                variant="primary"
                {...formik.getFieldProps("lat")}
                // value={latitude}
                type="text"
                placeholder={"lat"}
                // readOnly={true}
                error={formik.touched.lat ? formik.errors.lat : undefined}
              />
              <Input
                id="lng"
                dimension="xl"
                variant="primary"
                {...formik.getFieldProps("lng")}
                // value={longitude}
                type="text"
                placeholder={"lng"}
                // readOnly={true}
                error={formik.touched.lng ? formik.errors.lng : undefined}
              />

              <button
                type="submit"
                className="button primary wide mt-10 disabled:opacity-70"
                // disabled={!isValid}
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

export default Profile;
