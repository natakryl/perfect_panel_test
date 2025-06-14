import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Suspense, lazy } from 'react';
import { store } from './store';
import type { RootState } from './store';
import { Navigation } from './components/Layout';
import { CircularProgress, Box } from '@mui/material';

// Ленивая загрузка страниц
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ConverterPage = lazy(() => import('./pages/ConverterPage'));

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

// Компонент загрузки
const LoadingFallback = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
    <CircularProgress />
  </Box>
);

const ProtectedContent = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Navigation />
          <Suspense fallback={<LoadingFallback />}>
          <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  <ProtectedContent>
                    <HomePage />
                  </ProtectedContent>
                }
              />
              <Route
                path="/converter"
                element={
                  <ProtectedContent>
                    <ConverterPage />
                  </ProtectedContent>
                }
              />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;