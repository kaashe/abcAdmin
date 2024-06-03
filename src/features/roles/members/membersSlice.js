import { apiSlice } from "../../../app/apiSlice";

export const membersSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMembers: builder.query({
            query: (currentPage) => ({
                url: `brand-admins?page=${currentPage}`,    
                method:'GET',
            }),
            providesTags: ['members'],
        }),
        addMember: builder.mutation({
            query: (initialPost) => ({
              url: "brand-admins",
              method: "POST",
              body: initialPost,
            }),
            invalidatesTags: ["members"],
          }),
    }),
    
});
export const {useGetMembersQuery,useAddMemberMutation} = membersSlice;