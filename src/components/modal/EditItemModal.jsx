import React from "react";
import Modal from "@mui/material/Modal";
import { CloseModalIcon } from "../../assets";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { Select } from "../Select";
import Card from "../ui/Card";
import Input from "../Input";
import Spinner from "../ui/Spinner";
import { EditMenuSchema } from "../../schema/YupSchema";

const EditItemModal = ({ open, close, loading, onEdit }) => {
  const formik = useFormik({
    initialValues: {
      price: "",
    },
    onSubmit(values, { resetForm }) {
      onEdit(values);
      resetForm();

      // Clear the form after successful submission
      // resetForm();
    },
    validationSchema: EditMenuSchema,
  });

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card classes="absolute top-[25%] left-[40%] bg-white rounded w-[30%]">
        <div className=" flex justify-between">
          <h1 className="font-bold">Edit Item</h1>
          <CloseModalIcon onClick={close} />
        </div>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Enter new item price.
        </Typography>
        <div>
          <form onSubmit={formik.handleSubmit}>
            {/* <Input
              id="name"
              dimension="xs"
              variant="primary"
              {...formik.getFieldProps("name")}
              type="text"
              placeholder={"Name"}
              error={formik.touched.name ? formik.errors.name : undefined}
              disabled
            /> */}

            <Input
              id="price"
              dimension="xs"
              variant="primary"
              {...formik.getFieldProps("price")}
              type="text"
              placeholder={"Price"}
              error={formik.touched.price ? formik.errors.price : undefined}
            />

            {/* <Input
              id="description"
              dimension="xs"
              variant="primary"
              {...formik.getFieldProps("description")}
              type="text"
              placeholder={"Description"}
              error={
                formik.touched.description
                  ? formik.errors.description
                  : undefined
              }
              disabled
            /> */}

            {/* <Select
              id="mealType"
              dimension="xl"
              variant="primary"
              {...formik.getFieldProps("mealType")}
              error={
                formik.touched.mealType ? formik.errors.mealType : undefined
              }
              disabled
            >
              <option value="">Select a meal type</option>
              <option value="All Day">All Day</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </Select> */}

            {/* <Select
              id="category"
              dimension="xl"
              variant="primary"
              {...formik.getFieldProps("category")}
              error={
                formik.touched.category ? formik.errors.category : undefined
              }
              disabled
            >
              <option value="">Select a category</option>
              <option value="Main Course">Main Course</option>
              <option value="Appetizers">Appetizers</option>
              <option value="Sandwiches & Wraps">Sandwiches & Wraps</option>
              <option value="Soups">Soups</option>
              <option value="Desserts">Desserts</option>
              <option value="Snacks">Snacks</option>
              <option value="Drinks">Drinks</option>
            </Select> */}

            {/* <input
              className="mt-10"
              type="file"
              id="file"
              onChange={(event) => {
                formik.setFieldValue("file", event.currentTarget.files[0]);
              }}
            />
            {formik.touched.file && formik.errors.file ? (
              <div className="mt-2 text-xs text-red-500">
                {formik.errors.file}
              </div>
            ) : null} */}

            <button
              type="submit"
              className="button primary wide mt-10 disabled:opacity-70"
              // disabled={!isValid}
            >
              {loading ? <Spinner /> : "Edit Item"}
            </button>
          </form>
        </div>
      </Card>
    </Modal>
  );
};

export default EditItemModal;
