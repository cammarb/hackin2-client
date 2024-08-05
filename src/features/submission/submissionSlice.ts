import { apiConnection } from "@/app/api/apiConnection";

export const submissionSlice = apiConnection.injectEndpoints({
    endpoints: (builder) => ({
        getSubmissionsByProgram: builder.query({
            query: ({ program }) => ({
                url: `/submissions?program=${program}`,
                method: 'GET',
                refetchOnMountOrArgChange: 30
            })
        }),
        getSubmissionsByUser: builder.query({
            query: ({ user }) => ({
                url: `/submissions?user=${user}`,
                method: 'GET',
                refetchOnMountOrArgChange: 30
            })
        }),
        getSubmissionsById: builder.query({
            query: ({ id }) => ({
                url: `/submissions/${id}`,
                method: 'GET',
                refetchOnMountOrArgChange: 30
            })
        }),
    })
})

export const { useGetSubmissionsByProgramQuery, useGetSubmissionsByUserQuery, useGetSubmissionsByIdQuery } = submissionSlice