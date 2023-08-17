import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Slices/userSlice";
import chatReducer from "./Slices/chatSlice";
import messageReducer from "./Slices/messageSlice";

import { apiUserSlice } from "./api/apiUserSlice";
import { apiChatSlice } from "./api/apiChatSlice";
import { apiMessageSlice } from "./api/apiMessage";


export const store = configureStore({
  reducer: {
    user: userReducer,
    chats: chatReducer,
    message:messageReducer,
    [apiUserSlice.reducerPath]: apiUserSlice.reducer,
    [apiChatSlice.reducerPath]: apiChatSlice.reducer,
    [apiMessageSlice.reducerPath]: apiMessageSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiUserSlice.middleware,
      apiChatSlice.middleware,
      apiMessageSlice.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
