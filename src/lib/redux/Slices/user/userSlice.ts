import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";



interface User {
  id: string;
  name: string;
  email: string;
  pic: string;
  token: string;
}

interface UserState {
  user: User | {};
}
let user = {};
// const userInfo = Cookies.get("userInfo");

// if (typeof userInfo === "string") {
//   user = JSON.parse(userInfo);
// } else {
//   user = {};
// }

const initialState = {

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.pic = action.payload.pic;
      state.token = action.payload.token;
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
