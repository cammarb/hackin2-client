import { useGetSubmissionsByProgramQuery } from '@/features/submission/submissionSlice'

const Submissions = ({ program }: { program: string }) => {
  const {
    data: response,
    isLoading,
    isError,
    isSuccess
  } = useGetSubmissionsByProgramQuery(program)

  return (
    <div>
      <h1>Submission List</h1>
      {isSuccess ? (
        response.submissions.map((submission) => {
          ;<p>{submission.id}</p>
        })
      ) : isLoading ? (
        <>Loading...</>
      ) : isError ? (
        <>Error</>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Submissions
