import { LoaderFunction, json } from 'react-router-dom';

export interface Program {
  title: string;
  href: string;
  variant: 'default' | 'ghost';
}

export const programLoader: LoaderFunction = async () => {
  const programs: Program[] = [
    {
      title: 'Google',
      href: 'google',
      variant: 'default'
    },
    {
      title: 'Microsoft',
      href: 'microsoft',
      variant: 'ghost'
    }
  ];
  return json(programs);
};
