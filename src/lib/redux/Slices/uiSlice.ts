import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  createChatModal: boolean;
  settingsModal: boolean;
} = {
  createChatModal: false,
  settingsModal: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openCreateChatModal: (state, action) => {
      state.createChatModal = action.payload;
    },
    openSettingsModal: (state, action) => {
      state.settingsModal = action.payload;
    },
  },
});

export const { openCreateChatModal, openSettingsModal } = uiSlice.actions;
export default uiSlice.reducer;
