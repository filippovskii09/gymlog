import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  email: string | null;
}

const initialState: UserState = {
  email: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUserEmail = (state: UserState) => state.email;

const userReducer = userSlice.reducer;
export default userReducer;
