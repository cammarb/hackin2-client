import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { CssBaseline } from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'

function App() {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <Header />
        <Outlet />
      </StyledEngineProvider>
    </>
  )
}

export default App
