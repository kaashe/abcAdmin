import { useAddProductsMutation, useDeleteProductMutation, useGetProductsQuery, useGetSingleProductQuery, useUpdateProductMutation } from "../../../features/products/productsSlice";


export const useProduct = () => {
    const { refetch: refetchProducts } = useGetProductsQuery();
    const { refetch: refetchSingleProduct } = useGetSingleProductQuery();

    const [addProduct, { isLoading, isSuccess, isError, error }] =
        useAddProductsMutation();
    const [
        updateProduct,
        {
            isLoading: updateIsLoading,
            isSuccess: updateIsSuccess,
            isError: updateIsError,
            error: updateError,
        },
    ] = useUpdateProductMutation();
    const [
        deleteProduct,
        {
            isLoading: deleteProductIsLoading,
            isSuccess: deleteProductIsSuccess,
            isError: deleteProductIsError,
            error: deleteProductError,
        },
    ] = useDeleteProductMutation();

    const addProductHandler = async (data) => {
        try {
            const response = await addProduct(data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };
    const updateSingleProduct = async (id, data) => {
        try {
            const response = await updateProduct({ id, data });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const deleteSingleProduct = async (id) => {
        try {
            const response = await deleteProduct(id);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return {
        addProductHandler,
        isLoading,
        isSuccess,
        isError,
        error,
        refetchProducts,
        refetchSingleProduct,
        updateSingleProduct,
        updateIsLoading,
        updateIsSuccess,
        updateIsError,
        updateError,
        deleteSingleProduct,
        deleteProductIsLoading,
        deleteProductIsSuccess,
        deleteProductIsError,
        deleteProductError,
    };
};