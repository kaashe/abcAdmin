import { useAddCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation } from "../../../features/products/product-category/productCategorySlice";


export const useProductCategory = () => {
  const { refetch: refetchCategories } = useGetCategoriesQuery();

  const [addCategory, { isLoading, isSuccess, isError, error }] =
    useAddCategoryMutation();
  const [
    updateCategory,
    {
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
      isError: updateIsError,
      error: updateError,
    },
  ] = useUpdateCategoryMutation();
  const [
    deleteCategory,
    {
      isLoading: deleteCategoryIsLoading,
      isSuccess: deleteCategoryIsSuccess,
      isError: deleteCategoryIsError,
      error: deleteCategoryError,
    },
  ] = useDeleteCategoryMutation();

  const category = async (data) => {
    try {
      const response = await addCategory(data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const updateSingleCategory = async (id, data) => {
    try {
      const response = await updateCategory({ id, data });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const deleteSingleCategory = async (id) => {
    try {
      const response = await deleteCategory(id);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
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
    deleteSingleCategory,
    deleteCategoryIsLoading,
    deleteCategoryIsSuccess,
    deleteCategoryIsError,
    deleteCategoryError,
  };
};
