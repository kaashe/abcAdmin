import { apiSlice } from "../../../app/apiSlice";

export const rolesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: (currentPage=1) => ({
        url: `brand-roles?page=${currentPage}`,
        method: "GET",
      }),
      providesTags: ["brand-roles"],
    }),

    addRole: builder.mutation({
      query: (initialPost) => ({
        url: "brand-roles",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: ["brand-roles"],
    }),
    getSingleRole: builder.query({
      query: (id) => ({
        url: `brand-roles/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["brand-roles"],
    }),
    updateRole: builder.mutation({
      query: ({ id, data }) => ({
        url: `brand-roles/update/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["brand-roles"],
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `brand-roles/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["brand-roles"],
    }),
  }),
});
export const {
  useGetRolesQuery,
  useAddRoleMutation,
  useGetSingleRoleQuery,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = rolesSlice;
