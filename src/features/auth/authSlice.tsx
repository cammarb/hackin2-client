import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  user: string | null;
  role: string | null;
}

const initialState: AuthState = { user: null, role: null };

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      const { user, role } = action.payload;
      state.user = user;
      state.role = role;
    },
    removeCredentials: (state) => {
      state.user = null;
      state.role = null;
    }
  }
});

export const { setCredentials, removeCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;
export const selectCurrentRole = (state: { auth: AuthState }) =>
  state.auth.role;
