import { Program as ProgramType } from '@/interface/Program';
import { useOutletContext } from 'react-router-dom';
import { ProgramCard } from '@/components/ProgramCard';
import { RewardsTable } from '@/components/RewardsTable';
import { BountiesTable } from '@/components/BountiesTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type ProgramData = {
  id: string
  name: string;
  description: string;
  location: string;
  programStatus: string;
};

export default function Program() {
  const program = useOutletContext() as ProgramType;

  return (
    <div className="m-10" key={program.id}>
      <header className="py-10 flex flex-row items-center justify-between">
        <h1 className="text-4xl font-medium">{program.name}</h1>
      </header>
      <Tabs defaultValue="details">
        <TabsList className="">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="user-management">User Management</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="my-10">
          <div className="my-5 grid grid-cols-3 gap-5">
            <ProgramCard program={program} />
            <RewardsTable programId={program.id} />
            <BountiesTable programId={program.id} />
          </div>
        </TabsContent>
        <TabsContent value="submissions" className="my-10">
          Submissions
        </TabsContent>
        <TabsContent value="user-management" className="my-10">
          User Management
        </TabsContent>
      </Tabs>
    </div >
  );
}
