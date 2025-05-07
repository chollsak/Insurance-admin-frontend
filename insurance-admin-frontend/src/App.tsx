import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; // Make sure you have this file
import News from './screens/Home';
import Create from './screens/Create';
// Import other screens/components as needed

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/Create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;