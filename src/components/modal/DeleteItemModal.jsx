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

const DeleteItemModal = ({ open, close, loading, onDelete }) => {
  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card classes="absolute top-[25%] left-[40%] bg-white rounded w-[30%]">
        <div className=" flex justify-between">
          <h1 className="font-bold">Delete Item</h1>
          <CloseModalIcon onClick={close} />
        </div>

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Are you sure you want to delete this item?
        </Typography>
        <div>
          {/* <form onSubmit={formik.handleSubmit}> */}
          <button
            type="submit"
            className="button danger wide mt-10 disabled:opacity-70"
            // disabled={!isValid}
            onClick={onDelete}
          >
            {loading ? <Spinner /> : "Delete Item"}
          </button>

          <button
            type="submit"
            className="button primary wide mt-10 disabled:opacity-70"
            onClick={close}
          >
            Cancel
          </button>
          {/* </form> */}
        </div>
      </Card>
    </Modal>
  );
};

export default DeleteItemModal;
