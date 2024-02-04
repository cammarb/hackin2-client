import { useSelector } from 'react-redux'
import { selectCurrentUser } from '@/features/auth/authSlice'
import { useGetUserQuery } from '@/features/user/userSlice'
import { Container, Paper, Typography } from '@mui/material'

export default function Account() {
  const user = useSelector(selectCurrentUser)

  const {
    data: userResponse,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery(user)

  let content

  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    content = (
      <>
        <Container maxWidth="sm">
          <Paper style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h4">{userResponse.username}</Typography>
            <Typography variant="subtitle1">
              {userResponse.firstName} {userResponse.lastName}
            </Typography>
            <Typography variant="subtitle1">{userResponse.email}</Typography>
            <Typography variant="subtitle1">{userResponse.roleId}</Typography>
          </Paper>
        </Container>
      </>
    )
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>
  }

  return content
}
