import { apiSlice } from "../../app/apiSlice";

export const withdrawSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWithdraws: builder.query({
      query: (currentPage = 1) => ({
        url: "withdrawals",
        method: "GET",
      }),
      providesTags: ["withdraws"],
    }),
    getSingleWihdraw: builder.query({
      query: (id) => ({
        url: `withdrawals/${id}`,
        method: "GET",
      }),
      providesTags: ["withdraws"],
    }),
    approveSingleWihdraw: builder.mutation({
      query: ({ id, data }) => ({
        url: `withdrawals/${id}/approve`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["withdraws"],
    }),
  }),
});
export const { useGetWithdrawsQuery,useGetSingleWihdrawQuery,useApproveSingleWihdrawMutation } = withdrawSlice;
