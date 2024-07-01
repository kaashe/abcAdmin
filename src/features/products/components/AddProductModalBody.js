import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputText from '../../../components/Input/InputText';
import { useDispatch, useSelector } from 'react-redux';
import { useGetSingleProductQuery } from '../productsSlice';
import { useProduct } from '../../../app/custom-hooks/products/useproducts';
import SelectBox from '../../../components/Input/SelectBox';
import TextAreaInput from '../../../components/Input/TextAreaInput';
import ToggleInput from '../../../components/Input/ToogleInput';
import FileInput from '../../../components/Input/FileInput';
import { useGetCategoriesQuery } from '../product-category/productCategorySlice';
import { showNotification } from '../../common/headerSlice';

const AddProductModalBody = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { control, handleSubmit, reset } = useForm();
  const { data: categories } = useGetCategoriesQuery();
  const allCategory = categories?.data?.categories;
  const categoryOptions = allCategory
    ? allCategory.map((cat) => ({
        name: cat.categoryName,
        value: cat._id,
      }))
    : [];

  const {
    addProductHandler,
    refetchProducts,
    isLoading,isSuccess,
    updateSingleProduct,
    updateIsLoading,
  } = useProduct();

  const { extraObject } = useSelector((state) => state.modal);
  const id = extraObject?.productid;

  const { data, isLoading: isSingleProductLoading } = useGetSingleProductQuery(id, {
    skip: !id,
  });

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (formData) => {
    let photoFileName = '';
    if (formData.photo && formData.photo.length > 0) {
      photoFileName = formData.photo[0].name;
    }

    const payload = {
      productName: formData?.productName,
      category: formData?.category,
      productType: formData?.productType,
      price: formData?.price,
      description: formData?.description,
      productModel: formData?.productModel,
      status: formData?.status ? 'active' : 'inactive', // Ensure this matches your backend enum values
      photo: photoFileName,
    };
    if (id) {
      await updateSingleProduct(id, payload);
    } else {
      await addProductHandler(payload);
    }

    refetchProducts();
    closeModal();
  };

  useEffect(() => {
    if (data) {
      reset({
        ...data?.data?.product,
        category: data?.data?.product?.category?._id,
        status:data?.data?.product?.status==="inactive"?false:true,
      });
    }
  }, [data, reset]);
  useEffect(() => {
    if (isSuccess) {
      dispatch(showNotification({ message: "Product Created!", status: 1 }));
    }
  }, [isSuccess,dispatch]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-scroll max-h-[65vh] px-1">
      {isSingleProductLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <>
          <InputText
            name="productName"
            labelTitle="Name"
            control={control}
            rules={{ required: "Name is required" }}
          />
          <SelectBox
            name="category"
            labelTitle="Select Category"
            containerStyle="w-full mt-4"
            placeholder="Select a Category"
            labelStyle="my-label-style"
            options={categoryOptions}
            control={control}
            rules={{ required: "Category is required" }}
          />
          <InputText
            name="productType"
            labelTitle="Category Type"
            control={control}
            rules={{ required: "Category Type is required" }}
          />
          <InputText
            name="price"
            labelTitle="Price"
            control={control}
            rules={{ required: "Price is required" }}
          />
          <TextAreaInput
            name="description"
            labelTitle="Description"
            control={control}
            rules={{ required: "Description is required" }}
          />
          <InputText
            name="productModel"
            labelTitle="Product Model"
            control={control}
            rules={{ required: "Product Model is required" }}
          />
          <FileInput
            labelTitle="Upload Photo"
            name="photo"
            control={control}
            rules={{ required: "Photo is required" }}
            placeholder="Choose image..."
          />
          <ToggleInput
            name="status"
            control={control}
            className="toggle-sm"
            labelTitle="Status"
          />
        </>
      )}
      <div className="modal-action">
        <button
          type="button"
          className="btn btn-sm btn-glass"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || updateIsLoading}
          className="btn btn-sm btn-primary px-6"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddProductModalBody;
