import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/user`;

export interface Login {
  email: string;
  password: string;
}

export const apiUserSlice = createApi({
  reducerPath: "apiUserSlice",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      // if (typeof state === "string") {
      //   headers.set(" Authorization", `Bearer ${state.user.token}`);

      // }
      console.log(state);
      headers.set("Content-type", "application/json");

      return headers;
    },
  }),

  endpoints: (builder) => ({
    userRegister: builder.mutation({
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

    userInfo: builder.query<string, void>({
      query: (token) => ({
        url: "/userInfo",
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
  useUserInfoQuery,
} = apiUserSlice;
