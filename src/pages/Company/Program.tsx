import { MenubarShortcut } from '@/components/ui/menubar';
import { Program as ProgramType } from '@/loaders/programsLoader';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from '@radix-ui/react-menubar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { useOutletContext } from 'react-router-dom';

export default function Program() {
  const program = useOutletContext() as ProgramType;

  return (
    <>
      <div className="m-10">
        <header className="py-10">
          <h1 className="text-4xl font-medium">{program.name}</h1>
        </header>
        <Tabs defaultValue="submissions">
          <TabsList className="w-[500px] grid grid-flow-col gap-3 px-4 py-2 rounded bg-neutral-800">
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="user-management">User Management</TabsTrigger>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>More</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>New Window</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Share</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Print</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </TabsList>

          <TabsContent value="submissions" className="my-10">
            Submissions
          </TabsContent>
          <TabsContent value="details" className="my-10">
            <div>Status: {program.programStatus}</div>
            <div>Location: {program.location}</div>
          </TabsContent>
          <TabsContent value="user-management" className="my-10">
            User Management
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
