// src/router.jsx - UPDATED WITH VERIFICATION ROUTES
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Home from './pages/Home';
import Form1Page from './pages/Form1Page';
import CompleteReport from './pages/CompleteReport';
import DetailedReportsForm1 from './pages/DetailedReportsForm1';
import Form1Details from './pages/Form1Details';
import SearchPage from './pages/SearchPage';
import UpdateForm1Page from './pages/UpdateForm1Page';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/auth/ProtectedRoute';
import TestPage from './pages/TestPage';
import AuthTest from './pages/AuthTest';
import TestDataExtractor from './pages/TestDataExtractor';
import TestCertificatePage from './pages/TestCertificatePage';

// NEW: Verification Pages for QR Code Scanning
import VerifyForm1Page from './pages/VerifyForm1Page';
import VerifyCertificatePage from './pages/VerifyCertificatePage';

export const router = createBrowserRouter([
  // Public Routes
  {
    path: '/login',
    element: <Login />,
  },

  // QR Code Verification Routes (Public - No Authentication Required)
  {
    path: '/verify/form1/:certificateNo',
    element: <VerifyForm1Page />,
  },
  {
    path: '/verify/certificate/:certificateNo',
    element: <VerifyCertificatePage />,
  },

  // Protected Routes (Require Authentication)
  {
    path: '/',
    element: <ProtectedRoute><App /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'form1',
        element: <Form1Page />,
      },
      {
        path: 'complete-report',
        element: <CompleteReport />,
      },
      {
        path: 'detailed-reports-form1',
        element: <DetailedReportsForm1 />,
      },
      {
        path: 'form1-details',
        element: <Form1Details />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'update-form1/:id',
        element: <UpdateForm1Page />,
      },
      {
        path: 'test',
        element: <TestPage />,
      },
      {
        path: 'auth-test',
        element: <AuthTest />,
      },
      {
        path: 'test-data-extractor',
        element: <TestDataExtractor />,
      },
      {
        path: 'test-certificate',
        element: <TestCertificatePage />,
      },
    ],
  },

  // 404 Not Found
  {
    path: '*',
    element: <NotFound />,
  },
]);