import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
  id: "",
  name: "",
  email: "",
  pic: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state: typeof initialState, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.pic = action.payload.pic;
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
