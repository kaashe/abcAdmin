import React, { useEffect, useState } from "react";
import InputText from "../../../components/Input/InputText";
import InputNumber from "../../../components/Input/InputNumber";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useUsers } from "../../../app/custom-hooks/users/useUsers";
import { showNotification } from "../../common/headerSlice";
import { useGetSingleUserQuery } from "../usersSlice";
import FileInput from "../../../components/Input/FileInput";
import SelectBox from "../../../components/Input/SelectBox";

const AddUserModalBody = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { extraObject } = useSelector((state) => state.modal);
  const id = extraObject?.userId;

  const {
    createUser,
    signUpIsLoading,
    signUpIsSuccess,
    signUpError,
    refetchUsers,
    updateSingleUser,
    updateIsLoading,
    updateIsSuccess,
    updateIsError,
    updateError,
  } = useUsers();
  const { control, handleSubmit,errors, reset, getValues } = useForm();
  const {
    data,
    isLoading: isSingleUserLoading,
    isError: singleUserIsError,
    error: singleUserError,
    refetch: singleUserReftch,
  } = useGetSingleUserQuery(id, {
    skip: !id,
  });
  const [formData, setFormData] = useState();
  // console.log("selected image", formData);
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      photo: imageFile,
    }));
  };

  const onSubmit = async (formData) => {
    const data = new FormData();
    for (const key in formData) {
      if (key === "photo" && formData[key][0]) {
        data.append(key, formData[key][0]); // Append the file directly
      } else {
        data.append(key, formData[key]);
      }
    }

    if (id) {
      await updateSingleUser(id, formData);
      console.log(data, "updata");
    } else {
      await createUser(data);
    }
  };
  useEffect(() => {
    if (data) {
      reset(data?.data?.data);
    }
  }, [data, reset]);
  useEffect(() => {
    if (signUpIsSuccess) {
      dispatch(
        showNotification({
          message: "User Added!",
          status: 1,
        })
      );
      refetchUsers();
      closeModal();
    } else if (updateIsSuccess) {
      dispatch(
        showNotification({
          message: "User Updated!",
          status: 1,
        })
      );
      refetchUsers();
      closeModal();
    } else if (updateIsError) {
      console.log(updateError?.data?.message);
    }
  }, [
    signUpIsSuccess,
    refetchUsers,
    closeModal,
    updateIsSuccess,
    dispatch,
    updateIsError,
  ]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="overflow-y-scroll max-h-[65vh] px-1"
    >
      {isSingleUserLoading ? (
        <>
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        </>
      ) : (
        <>
          <InputText
            name="fullname"
            labelTitle="Full Name"
            containerStyle="mt-4"
            control={control}
            rules={{ required: "Full Name is required" }}
          />
          <InputText
            name="email"
            labelTitle="Email"
            containerStyle="mt-4"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            }}
          />
          {!id && (
            <>
              {" "}
              <InputText
                name="password"
                labelTitle="Password"
                type="password"
                containerStyle="mt-4"
                control={control}
                rules={{ required: "Password is required" }}
              />
              <InputText
                name="passwordConfirm"
                labelTitle="Confirm Password"
                type="password"
                containerStyle="mt-4"
                control={control}
                rules={{
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                }}
              />
            </>
          )}
          {!id && <FileInput
            labelTitle="Upload Photo"
            name="photo"
            onChange={handleImageChange}
            control={control}
            rules={{ required: "Photo is required" }}
            placeholder="Choose image..."
          />}
          {id && (
            <InputNumber
              name="balance"
              labelTitle="Balance"
              containerStyle="mt-4"
              control={control}
              rules={{ required: "Balance is required" }}
            />
          )}
          <InputNumber
            name="phone"
            labelTitle="Phone"
            containerStyle="mt-4"
            control={control}
            rules={{ required: "Phone number is required" }}
          />
          {!id && (
            <InputNumber
              name="cnic"
              labelTitle="CNIC"
              containerStyle="mt-4"
              control={control}
              rules={{ required: "CNIC is required" }}
            />
          )}
          <SelectBox
              name="action"
              labelTitle={"Select Gender"}
              containerStyle="w-full mt-4"
              placeholder={"Select Gender"}
              labelStyle="my-label-style"
              options={[{value:"male",label:"Male"},{value:"femmale",label:"female"},{value:"other",label:"Other"}]}
              control={control}
              rules={{ required: "Gender is required" }}
            />
          <InputText
            name="address"
            labelTitle="Address"
            containerStyle="mt-4"
            control={control}
            rules={{ required: "Address is required" }}
          />
          {!id && (
            <InputText
              name="education"
              labelTitle="Education"
              containerStyle="mt-4"
              control={control}
              rules={{ required: "Education is required" }}
            />
          )}
                    {!id && (
            <InputText
              name="stuckreviews"
              labelTitle="Stuckreviews"
              containerStyle="mt-4"
              control={control}
              // rules={{ required: "Education is required" }}
            />
          )}
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-sm btn-glass"
              onClick={() => closeModal()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-sm btn-primary px-6"
              disabled={signUpIsLoading || updateIsLoading}
            >
              {!id
                ? !signUpIsLoading
                  ? "Save"
                  : "Saving..."
                : !updateIsLoading
                ? "Update"
                : "Updating..."}
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default AddUserModalBody;
