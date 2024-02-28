import React from 'react';
import { NavLink } from 'react-router-dom';

const ProgramManagementNav = () => {
  return (
    <nav style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e1e4e8' }}>
      <ul style={{ display: 'flex', justifyContent: 'flex-end', listStyle: 'none', margin: 0, padding: '8px 16px' }}>
        <li style={{ margin: '0 8px' }}>
          <NavLink to="/company/program-management/submissions" style={{ color: '#586069', textDecoration: 'none', fontSize: '14px' }} activeClassName="font-bold">Submissions</NavLink>
        </li>
        <li style={{ margin: '0 8px' }}>
          <NavLink to="/company/program-management/details" style={{ color: '#586069', textDecoration: 'none', fontSize: '14px' }} activeClassName="font-bold">Details</NavLink>
        </li>
        <li style={{ margin: '0 8px' }}>
          <NavLink to="/company/program-management/userrolespermissions" style={{ color: '#586069', textDecoration: 'none', fontSize: '14px' }} activeClassName="font-bold">User Roles and Permissions</NavLink>
        </li>
        {/* Dropdown */}
        <li style={{ margin: '0 8px' }}>
          {/* Dropdown Trigger */}
          <button style={{ color: '#586069', textDecoration: 'none', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}>More ▼</button>
          {/* Dropdown Menu */}
          {/* <div style={{ display: 'none', position: 'absolute', right: 0, backgroundColor: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.15)' }}>
            <a href="#" style={{ display: 'block', padding: '8px 16px', color: '#586069', textDecoration: 'none', fontSize: '14px' }}>Option 1</a>
            <a href="#" style={{ display: 'block', padding: '8px 16px', color: '#586069', textDecoration: 'none', fontSize: '14px' }}>Option 2</a>
          </div> */}
        </li>
      </ul>
    </nav>
  );
};

export default ProgramManagementNav;
