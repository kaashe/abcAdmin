import React from 'react'
import { useForm } from 'react-hook-form';
import InputText from '../../../components/Input/InputText';

const AddProductModalBody = ({closeModal}) => {
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
         <InputText
          name="name"
          labelTitle="Name"
          control={control}
          rules={{
            required: "name is required",
          }}
        />
          <InputText
          name="categoryId"
          labelTitle="Category"
          control={control}
          rules={{
            required: "Category is required",
          }}
        />
         <InputText
          name="price"
          labelTitle="Price"
          control={control}
          rules={{
            required: "Price is required",
          }}
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
        // disabled={isLoading || updateIsLoading}
        className="btn btn-sm btn-primary px-6"
      >
        Save
      </button>
    </div>
      </form>
  )
}

export default AddProductModalBody
