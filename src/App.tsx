import { useState } from 'react'
import './App.css'
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  const [count, setCount] = useState(0)

  return (
        <>
          <div>
            <Login />
            <SignUp />
          </div>
        </>
      )
    }
export default App
