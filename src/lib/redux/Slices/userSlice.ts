import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// const user = JSON.parse(localStorage.getItem("userInfo")!);
const initialState: User = {
  id: "",
  name: "",
  email: "",
  password: "",
  image: "",
  accessToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userAfterLogin:(state: typeof initialState, action: PayloadAction<string>) =>{
      state.accessToken = action.payload;
    },
     userInfo: (state: typeof initialState, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.image = action.payload.image;
    },
  },
});

export const { userInfo,userAfterLogin } = userSlice.actions;
export default userSlice.reducer;
