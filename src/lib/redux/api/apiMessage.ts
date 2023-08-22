import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addNewMessage, updateMessage } from "../Slices/messageSlice";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/message`;

export const apiMessageSlice = createApi({
  reducerPath: "apiMessageSlice",
  tagTypes: ["Message"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-type", "application/json");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    fetchAllMessages: builder.query<Message, { chatId: string }>({
      query: ({ chatId }) => ({
        url: `?chatId=${chatId}`,
        method: "GET",
      }),
      providesTags: ["Message"],
      async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
        const response: any = await cacheDataLoaded;
        dispatch(updateMessage([...response.data]));
      },
    }),
    sendingNewMessage: builder.mutation<
      Message,
      { content: string; chatId: string }
    >({
      query: (body) => ({
        url: "/",
        method: "POST",
        body: body,
      }),
      async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
        const response: any = await cacheDataLoaded;

        dispatch(addNewMessage( response.data ));
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLazyFetchAllMessagesQuery, useSendingNewMessageMutation } =
  apiMessageSlice;
