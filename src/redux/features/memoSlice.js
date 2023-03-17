import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const memoSlice = createSlice({
  name: "memo",
  initialState,
  // メモの情報をグローバルに保管
  reducers: {
    setMemo: (state, action) => {
      state.value = action.payload;
    },
  },
});
// ビューはこっち↓
export const { setMemo } = memoSlice.actions;
// storeの書くのはこっち↓
export default memoSlice.reducer;
