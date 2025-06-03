import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { ContentCreateScreen, HomeScreen, } from './screens';
import { AppLayout } from './components';
import { CommonProvider } from './contexts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});


const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: 'content/new', element: <ContentCreateScreen /> },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <CommonProvider>
          <RouterProvider router={router} />
        </CommonProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
