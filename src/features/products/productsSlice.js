import { apiSlice } from "../../app/apiSlice";

export const productSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (initialPost) => ({
                url: `products`,
                method: "GET",
            }),
            providesTags: ["products"],
        }),
        addProducts: builder.mutation({
            query: (initialPost) => ({
                url: "products",
                method: 'POST',
                body: initialPost
            }),
            invalidatesTags: ['products'],
        }),
        getSingleProduct: builder.query({
            query: (id) => ({
                url: `products/${id}`,
                method: "GET",
            }),
            providesTags: ["products"],
        }),
        updateProduct: builder.mutation({
            query: ({ id, data }) => ({
                url: `products/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['products'],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["products"],
        }),
    }),

});
export const { useGetProductsQuery, useAddProductsMutation, useGetSingleProductQuery, useUpdateProductMutation, useDeleteProductMutation } = productSlice;