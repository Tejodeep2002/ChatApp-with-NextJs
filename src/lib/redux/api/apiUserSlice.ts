import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userInfo } from "../Slices/userSlice";
import Cookies from "js-cookie";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/user`;

export interface Login {
  email: String;
  password: String;
}

export interface Register extends Login {
  name: string;
  image: string | unknown;
}

export interface SearchUser {
  id: string;
  name: string;
  email: string;
  image: string;
}

export const apiUserSlice = createApi({
  reducerPath: "apiUserSlice",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state: any = getState();
      headers.set("Content-type", "application/json");
      headers.set("Authorization", `Bearer ${Cookies.get("token")}`);
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
    }),
    userLogout: builder.mutation<string, undefined>({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
      invalidatesTags: ["User"],
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
      query: () => ({
        url: "/userInfo",
        method: "GET",
      }),
      providesTags: ["User"],
      async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
        const response: any = await cacheDataLoaded;
        dispatch(userInfo({ ...response.data }));
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
  useUserLogoutMutation,
  useUserInfoQuery,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useSearchUserMutation,
} = apiUserSlice;
