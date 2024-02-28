import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Company/Header'; 

function App() {
  return (
    <>
      <Header /> 
      <main>
        <Outlet /> 
      </main>
    </>
  );
}

export default App;
