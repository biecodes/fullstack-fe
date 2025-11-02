import { createSlice, PayloadAction } from "@reduxjs/toolkit";
let parsedAuthUser = null;

if (typeof window !== "undefined") {
  const authUser = localStorage.getItem("authUser");
  parsedAuthUser = authUser ? JSON.parse(authUser) : null;
}

const initialState = {
  authUser: parsedAuthUser,
};

const authSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<boolean>) => {
      state.authUser = action.payload;
      localStorage.setItem("authUser", JSON.stringify(action.payload));
    },
  },
});

export const { setAuthUser } = authSlice.actions;
export default authSlice.reducer;
