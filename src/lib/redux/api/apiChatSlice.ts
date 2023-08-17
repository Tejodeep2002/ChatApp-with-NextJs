import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addUser } from "../Slices/userSlice";
import { updateChats } from "../Slices/chatSlice";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/chat`;

export const apiChatSlice = createApi({
  reducerPath: "apiChatSlice",
  tagTypes: ["Chat"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const state: any = getState();
      console.log(state);
      // headers.set("Authorization", `Bearer ${state.user.token}`);

      headers.set("Content-type", "application/json");

      return headers;
    },
  }),

  endpoints: (builder) => ({
    accessChat: builder.mutation<Chats, { userId: string }>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body: body,
      }),
      async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
        const response: any = await cacheDataLoaded;
        dispatch(updateChats(response.data));
      },
      invalidatesTags: ["Chat"],
    }),
    fetchChats: builder.query<Chats, undefined>({
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
    createGroup: builder.mutation<Chats, CreateGroup>({
      query: (body) => ({
        url: "/group",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Chat"],
    }),
    updateGroup: builder.mutation<Chats, UpdateGroup>({
      query: (body) => ({
        url: "/groupUpdate",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Chat"],
    }),

    addUserGroup: builder.mutation<Chats, UpdateUser>({
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

    removeUserGroup: builder.mutation<Chats, UpdateUser>({
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
