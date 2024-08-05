import { apiConnection } from '@/app/api/apiConnection';

export const programSlice = apiConnection.injectEndpoints({
	endpoints: (builder) => ({
		getActivePrograms: builder.query({
			query: () => ({
				url: `/programs?status=active`,
				method: 'GET',
				refetchOnMountOrArgChange: 30
			})
		}),
		getCompanyPrograms: builder.query({
			query: (id) => ({
				url: `/programs?company=${id}`,
				method: 'GET',
				refetchOnMountOrArgChange: 30
			}),
			providesTags: ['Programs']
		}),
		getProgramById: builder.query({
			query: (id) => ({
				url: `/programs/${id}`,
				method: 'GET',
				refetchOnMountOrArgChange: 30
			}),
			providesTags: ['Programs']
		}),
		addProgram: builder.mutation({
			query: ({ id, body }) => ({
				url: `/programs/new?company=${id}`,
				method: 'POST',
				body
			}),
			invalidatesTags: ['Programs']
		}),
		updateProgram: builder.mutation({
			query: ({ id, program }) => ({
				url: `/programs/${id}/edit`,
				method: 'PUT',
				body: program
			}),
			invalidatesTags: ['Programs']
		}),
		getProgramBounties: builder.query({
			query: (id) => ({
				url: `/bounties?program=${id}`,
				method: 'GET',
				refetchOnMountOrArgChange: 30
			})
		}),
	}),
});

export const { useGetActiveProgramsQuery, useGetCompanyProgramsQuery, useGetProgramByIdQuery, useUpdateProgramMutation, useGetProgramBountiesQuery, useAddProgramMutation } = programSlice
