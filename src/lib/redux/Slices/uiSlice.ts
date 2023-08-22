import { createSlice } from "@reduxjs/toolkit";


const initialState:{
  createChatModal:boolean

} = {
  createChatModal: false,
};

const uiSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    openCreateChatModal: (state, action) => {
      state.createChatModal = action.payload;
    },
   
  },
});

export const { openCreateChatModal } = uiSlice.actions;
export default uiSlice.reducer;
