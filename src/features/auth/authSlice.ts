import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface AuthState {
  user: {
    id: string
    username: string
    role: string
    token: string
    company: {
      id: string
      role: string
    } | null
  } | null
}

const initialState: AuthState = {
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      const { user } = action.payload
      state.user = user
    },
    removeCredentials: (state) => {
      state.user = null
    }
  }
})

export const { setCredentials, removeCredentials } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user
