import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  user: string | null;
  token: string | null;
}

const initialState: AuthState = { user: null, token: null };

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    removeCredentials: (state) => {
      state.user = null;
      state.token = null;
    }
  }
});

export const { setCredentials, removeCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;
export const selectCurrentToken = (state: { auth: AuthState }) =>
  state.auth.token;
