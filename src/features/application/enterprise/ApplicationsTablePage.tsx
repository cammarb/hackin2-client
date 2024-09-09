import { useOutletContext } from 'react-router-dom'
import { ApplicationsTable } from './ApplicationsTable'

export const ApplicationsTablePage = () => {
  const programId = useOutletContext() as string

  return <>{programId && <ApplicationsTable programId={programId} />}</>
}
