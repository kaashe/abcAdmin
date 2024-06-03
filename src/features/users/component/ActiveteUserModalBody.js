import React from 'react'
import InputText from '../../../components/Input/InputText'
import { useForm } from 'react-hook-form';
import InputNumber from '../../../components/Input/InputNumber';

const AddSizeModalBody = ({ closeModal }) => {
  const {
    control,
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit =()=>{
    console.log();
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    {/* {isSingleDeliveryPriceLoading ? (
      <>
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </>
    ) : ( */}
      <>
        <InputText
          name="username"
          labelTitle="Username"
          containerStyle="mt-4"
          control={control}
          rules={{
            required: "Username is required",
          }}
        />
      </>
    {/* )} */}
    {/* api errors */}
    {/* {(isError || updateError || singleDeliveryPriceIsError) && (
      <div className="flex justify-center mt-4">
        <span className="label-text-alt text-center text-error">
          {error?.data?.message ||
            updateError?.data?.message ||
            singleDeliveryPriceError?.data?.message}
        </span>
      </div>
    )} */}

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
        // disabled={isLoading || updateIsLoading}
        className="btn btn-sm btn-primary px-6"
      >
        Active
      </button>
    </div>
  </form>
  )
}

export default AddSizeModalBody
