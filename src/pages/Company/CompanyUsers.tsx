import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { useGetCompanyMembersQuery } from '@/features/company/companySlice';

export default function CompanyUsers() {
  const user = useSelector(selectCurrentUser);
  const {
    data: response,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetCompanyMembersQuery(user);
  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const members = response.members;
    console.log(response.members);
    content = (
      <>
        <h1>Users</h1>
        {members.map((member, index) => (
          <div key={index}>
            <h1>{member.userId}</h1>
            <h1>{member.companyRole}</h1>
          </div>
        ))}
      </>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
}
