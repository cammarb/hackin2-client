import { useNewUserMutation } from '@/features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { z, type ZodType } from 'zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/components/ui/use-toast'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

enum Role {
  PENTESTER = 'PENTESTER',
  ENTERPRISE = 'ENTERPRISE'
}

interface SignUpData {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  role: Role
  company?: {
    name: string
    website: string
    email: string
  }
}

const CompanyForm = ({
  form
}: {
  form: UseFormReturn<SignUpData>
}) => {
  return (
    <div className='grid gap-2 mt-5'>
      <p className='font-medium text-xl'>Create new Company</p>
      <FormField
        control={form.control}
        name='company.name'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name</FormLabel>
            <FormControl>
              <Input placeholder='Hackin2' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='company.website'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Website</FormLabel>
            <FormControl>
              <Input placeholder='https://hackin2.com' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='company.email'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Email</FormLabel>
            <FormControl>
              <Input placeholder='company@hackin2.com' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default function SignUp() {
  const [newUser, { isLoading }] = useNewUserMutation()
  const navigate = useNavigate()

  const schema: ZodType<SignUpData> = z
    .object({
      firstName: z.string().min(2).max(100),
      lastName: z.string().min(2).max(100),
      username: z.string().min(6).max(100),
      email: z.string().min(2).max(100),
      password: z.string().min(8).max(100),
      role: z.nativeEnum(Role),
      company: z
        .object({
          name: z.string().min(2).max(100),
          website: z.string().url(),
          email: z.string().email()
        })
        .optional()
    })
    .refine(
      (data) => {
        if (data.role === Role.ENTERPRISE) {
          return !!data.company
        }
        return true
      },
      {
        message: 'Company details are required for enterprise role',
        path: ['company']
      }
    )

  const form = useForm<SignUpData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      role: Role.PENTESTER,
      company: {
        name: '',
        website: '',
        email: ''
      }
    }
  })

  const watchedRole = form.watch('role')

  const submitData = async (data: SignUpData) => {
    try {
      if (data.role === Role.PENTESTER) {
        await newUser({
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          email: data.email,
          password: data.password,
          role: data.role
        }).unwrap()
      }
      await newUser({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
        company: {
          name: data.company?.name,
          website: data.company?.website,
          email: data.company?.email
        }
      }).unwrap()
      console.log(data)
      toast({
        variant: 'default',
        title: 'Account created!',
        description: 'Registration request successful.'
      })
      form.reset({})
      navigate('/login')
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error creating account.',
        description:
          'There was a problem with your request, please try again later.'
      })
    }
  }

  const content = isLoading ? (
    <>
      <h1>Loading ...</h1>
    </>
  ) : (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitData)}>
          <Card className='max-w-xl mx-auto'>
            <CardHeader className='space-y-1'>
              <CardTitle className='text-2xl'>Register</CardTitle>
              <CardDescription>
                Enter your details below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent className='grid gap-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <FormField
                    control={form.control}
                    name='firstName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder='John' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid gap-2'>
                  <FormField
                    control={form.control}
                    name='lastName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Doe' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className='grid gap-2'>
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder='SuperUser' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid gap-2'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type='email'
                          placeholder='user@hackin2.com'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid gap-2'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='superpassword#1234'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name='role'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor='role'>Role</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id='role' aria-label='Select role'>
                            <SelectValue
                              placeholder={'Select a role'}
                              {...field}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={Role.PENTESTER}>
                              Pentester
                            </SelectItem>
                            <SelectItem value={Role.ENTERPRISE}>
                              Enterprise
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {watchedRole === Role.ENTERPRISE ? (
                <CompanyForm form={form} />
              ) : (
                <></>
              )}
            </CardContent>
            <CardFooter className='flex flex-col'>
              <Button className='w-full' type='submit'>
                Register
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  )

  return content
}
