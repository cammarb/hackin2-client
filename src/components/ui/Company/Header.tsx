// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import logo from '@/assets/Hackin2_logo_white.svg'; 

// const Header = () => {
//   return (
//     <header className="bg-black-800 text-white p-4 flex justify-between items-center">
//       <div className="flex items-center flex-grow justify-start">
//         <img src={logo} alt="Hackin2" className="h-8 cursor-pointer" /> 
//         <nav className="flex-grow">
//           <ul className="flex justify-center space-x-12"> 
//             <li><NavLink to="/dashboard" className="hover:underline">Dashboard</NavLink></li>
//             <li><NavLink to="/user-management" className="hover:underline">User & Access Management</NavLink></li>
//             <li><NavLink to="/program-management" className="hover:underline">Program Management</NavLink></li>
//             <li><NavLink to="/settings" className="hover:underline">Settings</NavLink></li>
//           </ul>
//         </nav>
//       </div>
      
//       <div className="flex items-center flex-grow justify-end">
//         <div className="mx-4">
//           <svg className="w-6 h-6 cursor-pointer" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
//             <path d="M21 21l-4.35-4.35m2.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//         </div>
//         <img src={logo} alt="Hackin2" className="h-8 cursor-pointer" /> 
//       </div>
//     </header>
//   );
// };

// export default Header;


import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '@/assets/Hackin2_logo_white_pink.svg';

const Header = () => {
  return (
    <header style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e1e4e8', padding: '0.5rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="Hackin2" style={{ height: '32px', cursor: 'pointer', marginRight: '2rem' }} />
        <nav>
          <ul style={{ display: 'flex', justifyContent: 'center', listStyle: 'none', margin: 0, padding: 0 }}>
            <li style={{ margin: '0 1rem' }}>
              <NavLink to="/dashboard" style={{ color: '#586069', textDecoration: 'none', fontSize: '14px' }} activeClassName="font-bold">Dashboard</NavLink>
            </li>
            <li style={{ margin: '0 1rem' }}>
              <NavLink to="/user-management" style={{ color: '#586069', textDecoration: 'none', fontSize: '14px' }} activeClassName="font-bold">User & Access Management</NavLink>
            </li>
            <li style={{ margin: '0 1rem' }}>
              <NavLink to="/program-management" style={{ color: '#586069', textDecoration: 'none', fontSize: '14px' }} activeClassName="font-bold">Program Management</NavLink>
            </li>
            <li style={{ margin: '0 1rem' }}>
              <NavLink to="/settings" style={{ color: '#586069', textDecoration: 'none', fontSize: '14px' }} activeClassName="font-bold">Settings</NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* <div style={{ marginRight: '1rem' }}>
          <svg className="w-6 h-6 cursor-pointer" fill="#586069" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M21 21l-4.35-4.35m2.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div> */}
        <img src={logo} alt="User Avatar" style={{ height: '32px', cursor: 'pointer' }} />
      </div>
    </header>
  );
};

export default Header;
