import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Company/Header'; 

function App() {
  return (
    <>
      {/* TEST HEADER */}
      <header className="p-4 flex gap-8">
        <Link to={'company/programs'}>Programs</Link>
        <Link to={'login'}>Login</Link>
        <Link to={'register'}>Register</Link>
      </header>
      <Outlet />
    </>
  );
}

export default App;
