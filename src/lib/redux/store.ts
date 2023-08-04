import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Slices/user/userSlice";
import chatReducer from "./Slices/chat/chatSlice";

import { apiUserSlice } from "./api/apiUserSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chats: chatReducer,

    [apiUserSlice.reducerPath]: apiUserSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiUserSlice.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
