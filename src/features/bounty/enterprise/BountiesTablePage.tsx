import { useOutletContext } from 'react-router-dom'
import { BountiesTable } from './BountiesTable'

export const BountiesTablePage = () => {
  const programId = useOutletContext() as string

  return <>{programId && <BountiesTable programId={programId} />}</>
}
