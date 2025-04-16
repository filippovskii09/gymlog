import { User } from '@/types/interface.interface';
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  user: Partial<User> | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: UserState) => state.user;

const userReducer = userSlice.reducer;
export default userReducer;
