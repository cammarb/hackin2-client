import {
  Building2,
  ChevronDownIcon,
  CircleIcon,
  MapIcon,
  PlusIcon,
  StarIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';

import { Link } from 'react-router-dom';

export const ProgramCardView = ({ program }: { program: {} }) => {
  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>
            <Link
              to={`/bounty-programs/${program.id}`}
              className="hover:underline underline-offset-4"
            >
              {program.name}
            </Link>
          </CardTitle>
          <CardDescription>{program.description} </CardDescription>
        </div>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Apply
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Building2 className="mr-1 h-3 w-3 text-sky-400" />
            {program.Company.name}
          </div>
          <div className="flex items-center">
            <MapIcon className="mr-1 h-3 w-3" />
            {program.location}{' '}
          </div>
          <div>Updated April 2023</div>
        </div>
      </CardContent>
    </Card>
  );
};
