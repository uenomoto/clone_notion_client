import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: {} };

export const userSlice = createSlice({
  name: "user",
  initialState,
  // ユーザー保存するロジック↓
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});
// ビューはこっち↓
export const { setUser } = userSlice.actions;
// storeの書くのはこっち↓
export default userSlice.reducer;
