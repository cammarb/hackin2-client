<<<<<<< HEAD
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
=======
import '@/App.css';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
>>>>>>> dev_melvin

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
