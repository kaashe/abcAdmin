import { apiSlice } from "../../app/apiSlice";

export const loginSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    authenticateUser: builder.mutation({
      query: (initialPost) => ({
        url: "users/login",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: ["Login"],
    }),
    signUpUser: builder.mutation({
      query: (initialPost) => ({
        url: "users/signup",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: ["users"],
    }),
    
    verifyUserbyOtp: builder.mutation({
      query: (initialPost) => ({
        url: "brand-admin-auth/verify",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: ["VerifyByOtp"],
    }),
  }),
});
export const {
  useAuthenticateUserMutation,
  useSignUpUserMutation,
  useVerifyUserbyOtpMutation,
} = loginSlice;
