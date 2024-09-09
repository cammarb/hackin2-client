import { ProgramCardView } from '@/components/ProgramCardView';
import { useGetActiveProgramsQuery } from '@/features/program/programSlice';
import type { Program } from '@/utils/types';

const ProgramsList = () => {
  const {
    data: response,
    isLoading,
    isSuccess,
    isError
  } = useGetActiveProgramsQuery({})

  let content = <></>;

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (isError) {
    content = <p>Error</p>;
  }
  if (isSuccess) {
    const programs = response.programs;
    if (programs.length <= 0) content = <p>No programs yet</p>;
    else
      content = (
        <div className="grid gap-10">
          {programs.map((program: Program) => (
            <ProgramCardView key={program.id} program={program} />
          ))}
        </div>
      );
  }

  return (
    <>
      <main className="m-10 flex flex-col gap-10 mx-auto sm:w-[100%] md:w-[80%] lg:w-[60%]">
        <h1 className="text-2xl font-medium">Bounty Programs</h1>
        {content}
      </main>
    </>
  );
};

export default ProgramsList;
