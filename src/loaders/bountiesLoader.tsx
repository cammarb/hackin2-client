import { LoaderFunction, json } from 'react-router-dom';

export interface Bounty {
  tier: number;
  low: number;
  medium: number;
  high: number;
  critical: number;
  exceptional: number;
}

export const bountyLoader: LoaderFunction = async () => {
  const bounties: Bounty[] = [
    {
      tier: 1,
      low: 100,
      medium: 200,
      high: 300,
      critical: 400,
      exceptional: 500
    },
    {
      tier: 2,
      low: 200,
      medium: 300,
      high: 400,
      critical: 500,
      exceptional: 600
    },
    {
      tier: 3,
      low: 300,
      medium: 400,
      high: 500,
      critical: 600,
      exceptional: 700
    }
  ];
  return json(bounties);
};
