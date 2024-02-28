import React from 'react';
 import { NavLink } from 'react-router-dom';

 const Header = () => {
  // const logo = process.env.PUBLIC_URL + '/Hackin2_logo_white_pink.svg';
   return (
     <header className="bg-black-800 text-white p-4 flex justify-between items-center">
       <div className="flex items-center flex-grow justify-start">
         {/* <img src={logo} alt="Hackin2" className="h-8 cursor-pointer" />  */}
         <nav className="flex-grow">
           <ul className="flex justify-center space-x-12"> 
             <li><NavLink to="dashboard" className="hover:underline">Dashboard</NavLink></li>
             <li><NavLink to="user-management" className="hover:underline">User and Access Management</NavLink></li>
             <li><NavLink to="company/program-management" className="hover:underline">Program Management</NavLink></li>
             <li><NavLink to="settings" className="hover:underline">Settings</NavLink></li>
           </ul>
         </nav>
       </div>

       <div className="flex items-center flex-grow justify-end">
         <div className="mx-4">
           <svg className="w-6 h-6 cursor-pointer" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
             <path d="M21 21l-4.35-4.35m2.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
           </svg>
         </div>
         {/* <img src={logo} alt="Hackin2" className="h-8 cursor-pointer" />  */}
       </div>
     </header>
   );
 };

 export default Header;