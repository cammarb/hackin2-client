import { LoaderFunction, json } from 'react-router-dom';

export interface Program {
  id: string;
  name: string;
  variant: 'default' | 'ghost';
}

export const programLoader: LoaderFunction = async () => {
  const programs: Program[] = [
    {
      name: 'Google',
      id: 'google',
      variant: 'default'
    },
    {
      name: 'Microsoft',
      id: 'microsoft',
      variant: 'ghost'
    }
  ];
  return json(programs);
};
