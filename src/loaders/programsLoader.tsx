import { LoaderFunction, LoaderFunctionArgs, json } from 'react-router-dom';

export interface Program {
  title: string;
  href: string;
  logo: string;
}

export const programLoader: LoaderFunction = async ({
  params
}: LoaderFunctionArgs) => {
  const programs: Program[] = [
    {
      title: 'Google',
      href: 'google',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png'
    },
    {
      title: 'Microsoft',
      href: 'microsoft',
      logo: 'https://imgs.search.brave.com/lqxiOMP8BKykSProUaXhAzNJDPlmCcJcmVeKXTtgxjg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wbmdp/bWcuY29tL3VwbG9h/ZHMvbWljcm9zb2Z0/L21pY3Jvc29mdF9Q/TkcxMy5wbmc'
    }
  ];
  return json(programs);
};
