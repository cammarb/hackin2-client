import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface SessionState {
  isLoggedIn: boolean
}

const sessionSlice = createSlice({
  name: 'session',
  initialState: { isLoggedIn: false },
  reducers: {
    setSession: (state, action: PayloadAction<SessionState>) => {
      const { isLoggedIn } = action.payload
      state.isLoggedIn = isLoggedIn
    },
    removeSession: (state) => {
      state.isLoggedIn = false
    }
  }
})

export const { setSession, removeSession } = sessionSlice.actions
export default sessionSlice.reducer
export const selectCurrentSession = (state: {
  session: SessionState
}) => state.session.isLoggedIn
