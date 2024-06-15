import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl:  "https://commerce-api.codematesolution.com/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('access_token');
      
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  refetchOnFocus: false,
  refetchOnReconnect: true,
  tagTypes: ["Login", "products","categories","users"],
  endpoints: (builder) => ({
    // your endpoints here
  }),
});
