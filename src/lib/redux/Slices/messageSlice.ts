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
  },
});

export const { updateMessage } = messageSlice.actions;
export default messageSlice.reducer;
