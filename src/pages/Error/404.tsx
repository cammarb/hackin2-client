import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="m-4 flex flex-col gap-10 justify-center items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-9xl">404</h1>
          <h4 className="text-3xl">Page Not Found</h4>
        </div>
        <Button asChild>
          <Link to={'/'}>Go to Home</Link>
        </Button>
      </div>
    </>
  );
};

export default NotFound;
