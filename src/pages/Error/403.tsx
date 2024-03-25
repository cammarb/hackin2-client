import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Forbidden = () => {
  return (
    <>
      <div className="m-4 flex flex-col gap-10 justify-center items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-9xl">403</h1>
          <h4 className="text-3xl">
            Forbidden. You don't have permission to access to this resource.
          </h4>
        </div>
        <Button asChild>
          <Link to={'..'} relative="path">
            Go Back
          </Link>
        </Button>
      </div>
    </>
  );
};

export default Forbidden;
