import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useProductCategory } from "../../../../app/custom-hooks/products-category/useProductCategory";
import { useGetSingleCategoryQuery } from "../productCategorySlice";
import ToggleInput from "../../../../components/Input/ToogleInput";

import { showNotification } from "../../../common/headerSlice";
import InputText from "../../../../components/Input/InputText";

function AddProductCategoryModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const { extraObject } = useSelector((state) => state.modal);
  const {
    category,
    isLoading,
    isSuccess,
    isError,
    error,
    refetchCategories,
    updateSingleCategory,
    updateIsLoading,
    updateIsSuccess,
    updateIsError,
    updateError,
  } = useProductCategory();

  const id = extraObject?.categoryId;
  const {
    data,
    isLoading: isSingleCategoryLoading,
    isError: singleCategoryIsError,
    error: singleCategoryError,
    refetch: singleCategoryRefetch,
  } = useGetSingleCategoryQuery(id, { skip: !id });

  const { control, handleSubmit, reset, setValue } = useForm();

  const onSubmit = async (formData) => {
    if (id) {
      const payload = {
        name: formData?.name,
        isActive: formData?.isActive,
        nameAr: formData?.nameAr,
      };
      await updateSingleCategory(id, payload);
    } else {
      await category(formData);
    }
  };

  

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);




  useEffect(() => {
    if (isSuccess) {
      dispatch(showNotification({ message: "New Category Added!", status: 1 }));
      refetchCategories();
      closeModal();
    } else if (isError) {
      console.log(error?.data?.message);
    } else if (updateIsSuccess) {
      dispatch(showNotification({ message: "Category Updated!", status: 1 }));
      singleCategoryRefetch();
      refetchCategories();
      closeModal();
    } else if (updateIsError) {
      console.log(updateError?.data?.message);
    }
  }, [
    isSuccess,
    isError,
    error,
    updateIsSuccess,
    updateIsError,
    updateError,
    singleCategoryRefetch,
    refetchCategories,
    closeModal,
    dispatch,
  ]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isSingleCategoryLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <>
          
          <InputText
            name="name"
            labelTitle="Category Name"
            containerStyle="mt-4"
            control={control}
            rules={{ required: "Category name is required" }}
          />
          
          {id && (
            <ToggleInput
              name="isActive"
              control={control}
              labelTitle="Status"
            />
          )}
        </>
      )}
      {(isError || updateError || singleCategoryIsError) && (
        <div className="flex justify-center mt-4">
          <span className="label-text-alt text-center text-error">
            {error?.data?.message ||
              updateError?.data?.message ||
              singleCategoryError?.data?.message}
          </span>
        </div>
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
          disabled={isLoading || updateIsLoading}
          className="btn btn-sm btn-primary px-6"
        >
          {isLoading
            ? "Adding..."
            : updateIsLoading
              ? "Updating..."
              : extraObject?.categoryId
                ? "Update"
                : "Add"}
        </button>
      </div>
    </form>
  );
}

export default AddProductCategoryModalBody;
