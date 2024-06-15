import { apiSlice } from "../../../app/apiSlice";

export const productCategorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (currentPage=1) => ({
        url: `categories`,
        method: "GET",
      }),
      providesTags: ["categories"],
    }),
   
    addCategory: builder.mutation({
      query: (initialPost) => ({
        url: "categories",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: ["categories"],
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
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["categories"],
    }),
  

  }),
});
export const {
    useGetCategoriesQuery,
    useAddCategoryMutation,
    useGetSingleCategoryQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = productCategorySlice;
