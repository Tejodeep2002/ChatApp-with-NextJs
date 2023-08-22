import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  message: Message[];
} = {
  message: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    updateMessage: (state, action) => {
      state.message = action.payload;
    },
    addNewMessage:( state,action)=>{
      state.message = [action.payload,...state.message]
    }
  },
});

export const { updateMessage,addNewMessage } = messageSlice.actions;
export default messageSlice.reducer;
