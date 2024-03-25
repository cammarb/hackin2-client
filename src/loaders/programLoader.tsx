import { LoaderFunction, json } from 'react-router-dom';

export type Payment = {
  id: string;
  title: string;
  pentester: Array<string>;
  created_at: string;
  updated_at: string;
  activity: string;
  status: 'pending' | 'qa' | 'approved' | 'rejected';
  severity: 'low' | 'normal' | 'high' | 'exceptional';
};

export const programLoader: LoaderFunction = async () => {
  const payments: Payment[] = [
    {
      id: '1',
      title: 'Payment 1',
      pentester: ['pentester1', 'pentester2'],
      created_at: '2021-01-01',
      updated_at: '2021-01-01',
      activity: 'activity1',
      status: 'pending',
      severity: 'low'
    },
    {
      id: '2',
      title: 'Payment 2',
      pentester: ['pentester2', 'pentester3'],
      created_at: '2021-01-02',
      updated_at: '2021-01-02',
      activity: 'activity2',
      status: 'qa',
      severity: 'normal'
    },
    {
      id: '3',
      title: 'Payment 3',
      pentester: ['pentester3', 'pentester4'],
      created_at: '2021-01-03',
      updated_at: '2021-01-03',
      activity: 'activity3',
      status: 'approved',
      severity: 'high'
    }
  ];
  return json(payments);
};
