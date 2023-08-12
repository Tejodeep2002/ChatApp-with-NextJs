import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  chats: Chats[];
  selectedChat: Chats | undefined;
  notification: any[];
} = {
  chats: [],
  selectedChat: undefined,
  notification: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateChats: (state, action) => {
      state.chats = action.payload;
    },
    updateSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    updateNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});

export const { updateChats, updateSelectedChat, updateNotification } =
  chatSlice.actions;
export default chatSlice.reducer;
