import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline, createTheme } from '@mui/material'

const defaultTheme = createTheme()

function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Header />
        <Outlet />
      </ThemeProvider>
    </>
  )
}

export default App
