import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';

const items = [
  {
    title: 'Program A',
    href: 'programA',
    logo: 'logo'
  },
  {
    title: 'Program B',
    href: 'programB',
    logo: 'logo'
  }
];

function App() {
  return (
    <>
      <Sidebar items={items} />
      <Outlet />
    </>
  );
}

export default App;
