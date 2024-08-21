import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <Header />
      <main className='w-dvw h-dvh pt-[7rem]'>
        <div className='max-w-md mx-auto flex flex-col gap-8 items-center'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-9xl'>404</h1>
            <h4 className='text-3xl'>Page Not Found</h4>
          </div>
          <Button asChild className='w-fit'>
            <Link to={'/'}>Go to Home</Link>
          </Button>
        </div>
      </main>
    </>
  )
}

export default NotFound
