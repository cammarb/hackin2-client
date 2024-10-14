import { vi, expect, test, describe } from 'vitest'
import createFetchMock from 'vitest-fetch-mock'
import { setupStore } from '@/app/store'
import { authApiSlice } from '@/features/auth/authApiSlice'
import { setCredentials } from '@/features/auth/authSlice'

const fetchMocker = createFetchMock(vi)
fetchMocker.enableMocks()

describe('test login mutation', async () => {
  test('save the response data in the store after successfull login', async () => {
    const store = setupStore()

    fetchMocker.mockResponse(
      JSON.stringify({
        user: {
          id: 'testId',
          username: 'testUsername',
          role: 'ENTERPRISE',
          token: 'testToken',
          company: {
            id: 'testCompanyId',
            role: 'OWNER'
          }
        }
      })
    )

    await store.dispatch(
      authApiSlice.endpoints.login.initiate({
        username: 'testUsername',
        password: 'testPassword'
      })
    )

    const state = store.getState()

    expect(state.session.isLoggedIn).toBe(true)
    expect(state.auth.user?.id).toBe('testId')
  })

  test('empty store after failed login', async () => {
    const store = setupStore()

    fetchMocker.mockReject()

    await store.dispatch(
      authApiSlice.endpoints.login.initiate({
        username: 'invalidUsername',
        password: 'invalidPassword'
      })
    )

    const state = store.getState()

    expect(state.auth.user).toBe(null)
    expect(state.session.isLoggedIn).toBe(false)
  })
})

describe('test logout mutation', async () => {
  test('something', async () => {
    const store = setupStore()

    store.dispatch(
      setCredentials({
        user: {
          id: 'testId',
          username: 'testUsername',
          role: 'ENTERPRISE',
          token: 'testToken',
          company: {
            id: 'testCompanyId',
            role: 'OWNER'
          }
        }
      })
    )

    fetchMocker.mockResponse(
      JSON.stringify({
        message: 'success!'
      })
    )

    await store.dispatch(authApiSlice.endpoints.logout.initiate({}))
    const userState = store.getState().auth.user
    const sessionState = store.getState().session.isLoggedIn
    expect(userState).toBe(null)
    expect(sessionState).toBe(false)
  })
})
