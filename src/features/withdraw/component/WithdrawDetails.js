import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetSingleWihdrawQuery } from "../withDrawSlice";
import { useForm } from "react-hook-form";

const WithdrawDetails = () => {
  const { extraObject } = useSelector((state) => state.modal);
  const id = extraObject?.withdrawid;
  const {
    data,
    isLoading: isSingleUserLoading,
    isError: singleUserIsError,
    error: singleUserError,
    refetch: singleUserReftch,
  } = useGetSingleWihdrawQuery(id, {
    skip: !id,
  });
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      amount: "",
      payment: "",
      walletAddress: "",
      email: "",
      status: "",
    },
  });
  
  console.log(data);
  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);
  const onSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input {...register("name")} />
        </div>
        <div>
          <label>Amount:</label>
          <input type="number" {...register("amount")} />
        </div>
        <div>
          <label>Payment Method:</label>
          <input {...register("payment")} />
        </div>
        <div>
          <label>Wallet Address:</label>
          <input {...register("walletAddress")} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" {...register("email")} />
        </div>
        <div>
          <label>Status:</label>
          <input {...register("status")} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WithdrawDetails;
