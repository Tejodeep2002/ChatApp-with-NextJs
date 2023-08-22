import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  chats: Chat[];
  selectedChat: Chat | undefined;
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
    addNewChats: (state, action) => {
      if (!state.chats.find((c) => c.id === action.payload.id)) {
        state.chats = [action.payload, ...state.chats];
      }
    },
    updateSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    updateNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});

export const {
  updateChats,
  updateSelectedChat,
  updateNotification,
  addNewChats,
} = chatSlice.actions;
export default chatSlice.reducer;
