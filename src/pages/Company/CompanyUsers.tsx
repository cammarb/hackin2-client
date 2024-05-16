import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { useGetCompanyMembersQuery } from '@/features/company/companySlice';
import {
  MoreHorizontal,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Manage the company users and view their role.</CardDescription>
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
                      <TableCell>{member.User.firstName} {member.User.lastName} </TableCell>
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
