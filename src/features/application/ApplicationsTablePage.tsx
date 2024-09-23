import { useOutletContext } from 'react-router-dom'
import { ApplicationsTable } from './ApplicationsTable'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '@/features/auth/authSlice'

export type Application = {
  id: string
  userId: string
  bountyId: string
  status: string
  createdAt: string
  updatedAt: string
  User: {
    id: string
    username: string
  }
  Bounty: {
    title: string
    programId: string
  }
  BountyAssignment?: {
    id: string
  }
}

export const ApplicationsTablePage = () => {
  const user = useSelector(selectCurrentUser)
  const programId = useOutletContext() as string

  if (user?.role === 'ENTERPRISE')
    return (
      <>
        {programId && (
          <ApplicationsTable
            queryKey='program'
            value={programId}
            role={user.role}
          />
        )}
      </>
    )
  if (user?.role === 'PENTESTER')
    return (
      <>
        <ApplicationsTable queryKey='user' value={user.id} role={user.role} />
      </>
    )
}
