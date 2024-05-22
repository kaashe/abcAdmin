import { apiSlice } from "../../app/apiSlice";

export const loginSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        authenticateUser: builder.mutation({
            query: (initialPost) => ({
                url: "brand-admin-auth/login",    
                method:'POST',
                body:initialPost
            }),
            invalidatesTags: ['Login'],
        }),
        verifyUserbyOtp: builder.mutation({
            query: (initialPost) => ({
                url: "brand-admin-auth/verify",    
                method:'POST',
                body:initialPost
            }),
            invalidatesTags: ['VerifyByOtp'],
        }),
    }),
    
});
export const {useAuthenticateUserMutation,useVerifyUserbyOtpMutation} = loginSlice;