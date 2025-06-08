import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ErrorBoundary } from 'react-error-boundary';
import theme from "./theme";
import { CommonProvider } from "./contexts";
import { router } from "./router";
import { ErrorDisplay } from "./components";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorDisplay error={error} resetErrorBoundary={resetErrorBoundary} />
      )}>
        <QueryClientProvider client={queryClient}>
          <CommonProvider>
            <RouterProvider router={router} />
          </CommonProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
