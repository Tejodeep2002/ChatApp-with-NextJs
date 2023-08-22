import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addUser } from "../Slices/userSlice";
import { getSession, useSession } from "next-auth/react";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/user`;

export interface Login {
  email: String;
  password: String;
}

export interface Register extends Login {
  name: string;
  pic: string | unknown;
}

export interface SearchUser {
  id: string;
  name: string;
  email: string;
  pic: string;
}

export const apiUserSlice = createApi({
  reducerPath: "apiUserSlice",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-type", "application/json");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    userRegister: builder.mutation<string, Register>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),
    userLogin: builder.mutation<string, Login>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["User"],
      async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
        const response: any = await cacheDataLoaded;
        dispatch(addUser(response.data));
      },
    }),
    forgetPassword: builder.mutation<string, { email: string }>({
      query: (body) => ({
        url: "/forgetPassword",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),
    resetPassword: builder.mutation<
      string,
      { userId: string; password: string }
    >({
      query: (body) => ({
        url: "/resetLink",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),

    userInfo: builder.query({
      query: ({ token }) => ({
        url: "/userInfo",
        headers: {
          authorization: token,
          "Access-Control-Allow-Credentials": "true",
        },
        method: "GET",
      }),
      providesTags: ["User"],
      async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
        const response: any = await cacheDataLoaded;
        dispatch(addUser({ ...response.data }));
      },
    }),

    searchUser: builder.mutation<SearchUser[], { user: string }>({
      query: ({ user }) => ({
        url: `?search=${user}`,
        method: "GET",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useLazyUserInfoQuery,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useSearchUserMutation,
} = apiUserSlice;
