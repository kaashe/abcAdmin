import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetSingleUserQuery, useSetReviewMutation } from "../usersSlice";
import { useForm } from "react-hook-form";
import InputNumber from "../../../components/Input/InputNumber";
import { showNotification } from "../../common/headerSlice";

const SetReviewModal = ({closeModal}) => {
  const { extraObject } = useSelector((state) => state.modal);
  const id = extraObject?.id;
  console.log(id);
  const { control, handleSubmit, errors, reset, getValues } = useForm();
  const [setReview, { isLoading, isSuccess }] = useSetReviewMutation();
  const dispatch = useDispatch();
  const {
    data,
    isLoading: isSingleUserLoading,
    isError: singleUserIsError,
    error: singleUserError,
    refetch,
  } = useGetSingleUserQuery(id, {
    skip: !id,
  });
  console.log("first", data)
  const previousfielddata = data?.data?.data
  console.log("previousfielddata", previousfielddata)
  useEffect(() => {
    if (data) {
      // Reset the form with fetched data
      reset({
        reviewsAllowed: data?.data?.data?.reviewsAllowed || '',
        stuckreviews: data?.data?.data?.stuckreviews || '',
        stuckcommission: data?.data?.data?.stuckcommission || '',
        requiredDeposite: data?.data?.data?.requiredDeposite || '',
      });
    } 
  }, [data, reset]);

  const onSubmit = async (data) => {
    // console.log(id,'iddd')
    data.Stuck_Review=Number(data.Stuck_Review)
    // console.log(data,'data')
    await setReview({id, data});
    closeModal();
  };
  useEffect(() => {
 if (isSuccess) {
  refetch();
      dispatch(
        showNotification({
          message: "User Updated!",
          status: 1,
        })
      );
    //   refetchUsers();
      closeModal();
    } 
  }, [isSuccess, dispatch, closeModal, refetch]);
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="overflow-y-scroll max-h-[65vh] px-1"
      >
        <InputNumber
          name="reviewsAllowed"
          labelTitle="Reviews Allowed"
          containerStyle="mt-4"
          control={control}
          rules={{ required: "Reviews Allowed is required" }}
        />
         <InputNumber
          name="stuckreviews"
          labelTitle="Stuck Review"
          containerStyle="mt-4"
          control={control}
          // rules={{ required: "Stuck Allowed is required" }}
        />
        <InputNumber
          name="stuckcommission"
          labelTitle="Commision"
          containerStyle="mt-4"
          control={control}
          // rules={{ required: "Commision is required" }}
        />
        <InputNumber
          name="requiredDeposite"
          labelTitle="Required Deposite"
          containerStyle="mt-4"
          control={control}
          // rules={{ required: "Commision is required" }}
        />
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
            disabled={isLoading }
          >
            Set Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetReviewModal;
