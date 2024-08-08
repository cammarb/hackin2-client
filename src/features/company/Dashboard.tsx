import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { useGetCompanyQuery } from '@/features/company/companySlice';

export default function Dashboard() {
  const user = useSelector(selectCurrentUser);
  const {
    data: company,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetCompanyQuery(user);
  let content = <></>;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <>
        <h1>{company.message}</h1>
      </>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
}
