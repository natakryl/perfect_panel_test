import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Suspense, lazy } from 'react';
import { store } from './store';
import type { RootState } from './store';
import { Navigation } from './components/Layout';
import { CircularProgress, Box } from '@mui/material';


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

const LoadingFallback = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
    <CircularProgress />
  </Box>
);

const AppRoutes = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Suspense fallback={<LoadingFallback />}>
              <HomePage />
            </Suspense>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/converter"
        element={
          isAuthenticated ? (
            <Suspense fallback={<LoadingFallback />}>
              <ConverterPage />
            </Suspense>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Navigation />
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;