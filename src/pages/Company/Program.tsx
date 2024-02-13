import { Program as ProgramType } from '@/loaders/programsLoader';
import { useOutletContext } from 'react-router-dom';

export default function Program() {
  const program = useOutletContext() as ProgramType;

  return (
    <>
      <div className="pt-8 ml-56">
        <h1>{program.title}</h1>
      </div>
    </>
  );
}
