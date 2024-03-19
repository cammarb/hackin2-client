import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  return (
    <div>
      {/* TEST HEADER */}
      <header className="p-4 flex gap-8">
        <Link to={'company/programs'}>Programs</Link>
        <Link to={'login'}>Login</Link>
      </header>
      <h1>404: Page Not Found</h1>
    </div>
  );
};

export default ErrorPage;
