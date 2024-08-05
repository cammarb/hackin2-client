import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  user: string | null;
  role: string | null;
  token: string | null;
  company?: string | null;
}

const initialState: AuthState = { user: null, token: null, role: null, company: null };

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      const { user, token, role, company } = action.payload;
      state.user = user;
      state.role = role;
      state.token = token;
      state.company = company;
    },
    removeCredentials: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      state.company = null;
    }
  }
});

export const { setCredentials, removeCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;
export const selectCurrentToken = (state: { auth: AuthState }) =>
  state.auth.token;
export const selectCurrentRole = (state: { auth: AuthState }) =>
  state.auth.role;
export const selectCurrentCompany = (state: { auth: AuthState }) =>
  state.auth.company;
