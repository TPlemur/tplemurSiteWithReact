// Lays out header and footer, and defines the routes for the pages in the app.

import './App.css'
import Header from './modules/Header.tsx'
import Footer from './modules/Footer.tsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.tsx'
import CueUtil from './pages/cueUtil.tsx'

import Chocolate from './pages/Chocolate/Chocolate.tsx'


import Portfolio from './pages/Portfolio/portfolio.tsx'
import Vines from './pages/Portfolio/vines.tsx'

import Engineer from './pages/Engineer/Engineer.tsx'

import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: {
    nativeColor: true,
  },
  palette: {
    primary: {
      main: 'var(--text)',
    },
    text: {
      primary: 'var(--text)',
      secondary: 'var(--text-h)'
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Chocolate" element={<Chocolate />} />
          <Route path="/Portfolio" element={<Portfolio />} />
          <Route path="/Engineer" element={<Engineer />} />
          <Route path="/Portfolio/Vines" element={<Vines/>}/>
          <Route path="/cueUtil" element={<CueUtil/>}/>
        </Routes>

        <Footer />

      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
