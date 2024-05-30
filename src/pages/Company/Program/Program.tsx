import {
  useGetProgramQuery,
} from '@/features/company/companySlice';
import { Program as ProgramType } from '@/interface/Program';
import { useOutletContext } from 'react-router-dom';
import { ProgramForm } from '@/components/ProgramForm';

export type ProgramData = {
  id: string
  name: string;
  description: string;
  location: string;
  programStatus: string;
};

export default function Program() {
  const outletProgram = useOutletContext() as ProgramType;
  const {
    data: response,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetProgramQuery(outletProgram.id);
  let content;

  if (isLoading) {
    content = <>Loading...</>;
  } else if (isSuccess) {
    let program: ProgramData = response.program;
    content = <ProgramForm program={program} />
  }
  else if (isError) {
    content = <>There was an error fetching your request. Try again later.</>
  }
  else {
    content = <>No content yet.</>
  }

  return content;
}
