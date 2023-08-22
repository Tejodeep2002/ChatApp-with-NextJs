import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addUser } from "../Slices/userSlice";
import { addNewChats, updateChats } from "../Slices/chatSlice";
import { useAppSelector } from "../hooks";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/chat`;

export const apiChatSlice = createApi({
  reducerPath: "apiChatSlice",
  tagTypes: ["Chat"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, getState) => {
      headers.set("Content-type", "application/json");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    accessChat: builder.mutation<Chat, { userId: string }>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body: body,
      }),
      async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
        const response: any = await cacheDataLoaded;

        dispatch(addNewChats(response.data));
      },
      invalidatesTags: ["Chat"],
    }),
    fetchChats: builder.query<Chat, undefined>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
        const response: any = await cacheDataLoaded;
        dispatch(updateChats(response.data));
      },
      providesTags: ["Chat"],
    }),
    createGroup: builder.mutation<Chat, CreateGroup>({
      query: (body) => ({
        url: "/group",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Chat"],
    }),
    updateGroup: builder.mutation<Chat, UpdateGroup>({
      query: (body) => ({
        url: "/groupUpdate",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Chat"],
    }),

    addUserGroup: builder.mutation<Chat, UpdateUser>({
      query: (body) => ({
        url: "/groupAddUser",
        method: "PUT",
        body: body,
      }),
      async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
        const response: any = await cacheDataLoaded;
        dispatch(addUser({ ...response.data, token: arg }));
      },
      invalidatesTags: ["Chat"],
    }),

    removeUserGroup: builder.mutation<Chat, UpdateUser>({
      query: (body) => ({
        url: "/groupRemoveUser",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAccessChatMutation,
  useFetchChatsQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useAddUserGroupMutation,
  useRemoveUserGroupMutation,
} = apiChatSlice;
