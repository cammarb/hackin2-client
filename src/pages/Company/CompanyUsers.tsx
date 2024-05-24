import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { useAddCompanyMembersMutation, useGetCompanyMembersQuery } from '@/features/company/companySlice';
import { MoreHorizontal } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { DialogClose } from '@radix-ui/react-dialog';

type MemberData = {
  name: string
  email: string,
}

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

  const [addCompanyMember] = useAddCompanyMembersMutation();

  const schema: ZodType<MemberData> = z.object({
    name: z.string().min(2).max(100),
    email: z.string().min(2).max(50),
  });

  const form = useForm<MemberData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: ''
    }
  });

  const submitData = async (data: MemberData) => {
    try {
      const addedProgram = await addCompanyMember({
        name: data.name,
        email: data.email
      }).unwrap();
      form.reset({})
      console.log('Program added:', addedProgram);
    } catch (error) {
      console.error('Error adding program:', error);
    }
  };



  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const members = response.members;
    content = (
      <>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader className="flex flex-row justify-between">
              <div>
                <CardTitle>Users</CardTitle>
                <CardDescription>
                  Manage the company users and view their role.
                </CardDescription>
              </div>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Invite User</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(submitData)} className="space-y-8">

                        <DialogHeader>
                          <DialogTitle>Invite User</DialogTitle>
                          <DialogDescription>
                            Invite members, to join your space in Hackin2. <br /> Simply
                            enter their name and email address below.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 ">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="john.doe@hackin2.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="submit">Send Invite</Button>
                          </DialogClose>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>{' '}
              </div>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>

                    <TableHead>Role</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member, index) => (
                    <TableRow key={member.userId}>
                      <TableCell>
                        {member.User.firstName} {member.User.lastName}{' '}
                      </TableCell>
                      <TableCell className="font-medium">
                        {member.User.email}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{member.companyRole}</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main >
      </>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
}
