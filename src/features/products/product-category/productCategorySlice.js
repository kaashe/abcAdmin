import { apiSlice } from "../../../app/apiSlice";

export const categoriesSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: (initialPost) => ({
                url: "categories",
                method: "GET",
            }),
            providesTags: ["categories"],
        }),
        addCategories: builder.mutation({
            query: (initialPost) => ({
                url: "categories",
                method: 'POST',
                body: initialPost
            }),
            invalidatesTags: ['categories'],
        }),
        getSingleCategory: builder.query({
            query: (id) => ({
                url: `categories/${id}`,
                method: "GET",
            }),
            invalidatesTags: ["categories"],
        }),
        updateCategory: builder.mutation({
            query: ({ id, data }) => ({
                url: `categories/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['categories'],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `categories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["categories"],
        }),
    }),

});
export const { useGetCategoriesQuery,useGetSingleCategoryQuery,useDeleteCategoryMutation,useUpdateCategoryMutation, useAddCategoriesMutation, } = categoriesSlice;