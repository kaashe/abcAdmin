import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSetReviewMutation } from "../usersSlice";
import { useForm } from "react-hook-form";
import InputNumber from "../../../components/Input/InputNumber";
import { showNotification } from "../../common/headerSlice";

const SetReviewModal = ({closeModal}) => {
  const { extraObject } = useSelector((state) => state.modal);
  const id = extraObject?.id;
//   console.log(id);
  const { control, handleSubmit, errors, reset, getValues } = useForm();
  const [setReview, { isLoading, isSuccess }] = useSetReviewMutation();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    // console.log(id,'iddd')
    // console.log(data,'data')
    await setReview({id, data});
    closeModal();
  };
  useEffect(() => {
 if (isSuccess) {
      dispatch(
        showNotification({
          message: "User Updated!",
          status: 1,
        })
      );
    //   refetchUsers();
      closeModal();
    }
  });
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
