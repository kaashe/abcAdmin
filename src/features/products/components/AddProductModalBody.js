import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import InputText from '../../../components/Input/InputText';
import { useSelector } from 'react-redux';
import { useGetSingleProductQuery } from '../productsSlice';
import { useProduct } from '../../../app/custom-hooks/products/useproducts';
import { useGetCategoriesQuery } from '../../categories/categoriesSlice';
import SelectBox from '../../../components/Input/SelectBox';

const AddProductModalBody = ({ closeModal }) => {
  const {
    control,
    handleSubmit,
    reset,
  } = useForm();
  const { data:categories } = useGetCategoriesQuery();
  const allCategory = categories?.data?.categories;
    const caetogyOptions = allCategory
  ? allCategory.map((cat) => ({
    name: cat.categoryName,
    value: cat._id,
  }))
  : [];
  const {
    addProductHandler,
    refetchProducts,
    isLoading,
    isSuccess,
    isError,
    error,
    updateSingleProduct,
    updateIsLoading,
    updateIsSuccess,
    updateIsError,
    updateError,
  } = useProduct();
  const { extraObject } = useSelector(
    (state) => state.modal
  );
  const id = extraObject?.productid;
  const {
    data,
    isLoading: isSingleProductLoading,
    isError: singleProductIsError,
    error: singleProductError,
    refetch: singleRoleReftch,
  } = useGetSingleProductQuery(id, {
    skip: !id,
  });
  const onSubmit = async (formData) => {
    if (id) {
      const payload = { name: formData?.productName, categoryName: formData?.categoryName };
      console.log(payload, "payload updata");
      await updateSingleProduct(id, payload);
    } else {
      await addProductHandler(formData);
    }
  };
  useEffect(() => {
    if (data) {
      reset({
        ...data?.data?.product,
        category: data?.data?.product?.category?._id
      });
    }
  }, [data, reset]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isSingleProductLoading ? (
        <>
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        </>
      ) : (
        <>
          <InputText
            name="productName"
            labelTitle="Name"
            control={control}
            rules={{
              required: "name is required",
            }}
          />
          <SelectBox
            name="category"
            labelTitle="Select Category"
            containerStyle="w-full mt-4"
            placeholder="Select a Category"
            labelStyle="my-label-style"
            options={caetogyOptions} // Ensure this is in the correct format
            control={control}
            rules={{ required: "Category is required" }}
          />
        </>
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
