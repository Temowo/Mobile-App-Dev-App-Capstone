import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import useAuth from "../../hooks/useAuth";
import Spinner from "../ui/Spinner";
import profile from "../../features/profile";
import { NotifySuccess } from "../toast/toast";
import { store_user_details } from "../../slice/user";
import { useDispatch } from "react-redux";
import authentication from "../../features/auth";

const UploadPan = () => {
  const [userImage, setUserImage] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    image: "",
  });
  const [frontPreview, setFrontPreview] = useState(null);

  const {
    user: { user },
  } = useAuth();

  useEffect(() => {
    setUserImage(user?.user?.avatar);
  }, [user?.user?.avatar]);

  const handleUpload = () => {
    setLoading(true);
    profile("uploadProfileImage", formState)().then((res) => {
      if (res) {
        NotifySuccess(res.data.message, 3000);
        setLoading(false);
        return authentication("getProfile")()
          .then((res) => {
            dispatch(store_user_details(res.data.data));
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      }
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center">
        <div className="min-w-270 w-40 md:w-full mb-2">
          <Dropzone
            onDrop={(files) => {
              const reader = new FileReader();
              reader.readAsDataURL(files[0]);
              reader.onloadend = () => setFrontPreview(reader.result);
              setFormState(() => ({
                image: files[0],
              }));
            }}
            accept={{ "image/*": [] }}
            multiple={false}
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps({
                  className:
                    "border border-dashed border-gray-300 w-full h-200 flex flex-col items-center justify-center p-10 cursor-pointer",
                })}
              >
                <input {...getInputProps()} />
                {frontPreview ? (
                  <img
                    src={frontPreview}
                    alt=""
                    className="w-full h-44 object-contain"
                  />
                ) : (
                  <>
                    <img src={userImage} alt="" className=" w-40" />
                    {isDragActive ? (
                      <p>Drop the image here ...</p>
                    ) : (
                      <p className="">
                        Click and select an image or drag and drop file
                      </p>
                    )}
                  </>
                )}
              </div>
            )}
          </Dropzone>
        </div>
      </div>

      <div className="btn-wrapper">
        <button
          type="submit"
          className="button primary mid disabled:opacity-70"
          onClick={handleUpload}
        >
          {loading ? <Spinner /> : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default UploadPan;
