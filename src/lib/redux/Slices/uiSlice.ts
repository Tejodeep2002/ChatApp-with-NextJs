import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  createChatModal: boolean;
  settingsModal: boolean;
  videoCallPanel: boolean;
} = {
  createChatModal: false,
  settingsModal: false,
  videoCallPanel: false,
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
    openVideoCallPanel: (state, action) => {
      state.videoCallPanel = action.payload;
    },
  },
});

export const { openCreateChatModal, openSettingsModal ,openVideoCallPanel} = uiSlice.actions;
export default uiSlice.reducer;
