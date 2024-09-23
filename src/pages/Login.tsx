import { Button } from '@/components/ui/button'
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
import { Input } from '@/components/ui/input'
// import { toast } from '@/components/ui/use-toast'
import { useLoginMutation } from '@/features/auth/authApiSlice'
import { setCredentials } from '@/features/auth/authSlice'
import { setSession } from '@/features/auth/sessionApiSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { z, type ZodType } from 'zod'

interface LoginData {
  username: string
  password: string
}

export default function Login() {
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  const schema: ZodType<LoginData> = z.object({
    username: z.string().min(6),
    password: z.string().min(8).max(100)
  })

  const form = useForm<LoginData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const submitData = async (data: LoginData) => {
    try {
      const userData = await login({
        username: data.username,
        password: data.password
      }).unwrap()
      dispatch(setCredentials({ ...userData }))
      dispatch(setSession({ isLoggedIn: true }))
      form.reset({})
      navigate('/')
    } catch (error) {
      // if (error?.status === 401) {
      //   toast({
      //     title: 'Login failed',
      //     description: 'Username or password is incorrect'
      //   })
      // }
    }
  }

  const content = isLoading ? (
    <>
      <h1>Loading ...</h1>
    </>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitData)}>
        <Card className='max-w-xl mx-auto'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl'>Log In</CardTitle>
            <CardDescription>
              Enter your username below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <div className='grid gap-2'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input id='username' placeholder='SuperUser' {...field} />
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
                        id='password'
                        placeholder=''
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className='flex flex-col'>
            <Button className='w-full' type='submit'>
              Log In
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )

  return content
}
