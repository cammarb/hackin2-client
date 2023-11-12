import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/auth/authSlice'
import { useGetUserQuery } from '../../features/user/userSlice'

export default function Account() {
  const username = useSelector(selectCurrentUser)
  const {
    data: userResponse,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery(username)

  const welcome = userResponse ? `Welcome ${username}!` : 'Welcome!'
  console.log(username)

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isSuccess ? (
        <>
          <h1>{welcome}</h1>
          <p>
            Name: {userResponse['firstName']} {userResponse['lastName']}
          </p>
          <p>E-Mail: {userResponse['email']}</p>
          <p>Role: {userResponse['roleId']}</p>
        </>
      ) : isError ? (
        <div>{error.toString()}</div>
      ) : (
        <></>
      )}
    </>
  )
}
