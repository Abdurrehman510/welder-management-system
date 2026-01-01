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

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
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
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);