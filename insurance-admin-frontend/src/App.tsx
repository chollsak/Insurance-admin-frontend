import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; // Make sure you have this file
import News from './screens/Home';
import Create from './screens/CreateBanner';
import CreatePromotion from './screens/CreatePromotion';
// Import other screens/components as needed

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/Create/Banner" element={<Create />} />
          <Route path="/Create/Promotion" element={<CreatePromotion />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;