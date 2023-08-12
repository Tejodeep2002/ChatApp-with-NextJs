import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Slices/userSlice";
import chatReducer from "./Slices/chatSlice";

import { apiUserSlice } from "./api/apiUserSlice";
import { apiChatSlice } from "./api/apiChatSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chats: chatReducer,
    [apiUserSlice.reducerPath]: apiUserSlice.reducer,
    [apiChatSlice.reducerPath]: apiChatSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiUserSlice.middleware,
      apiChatSlice.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
