import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './components/App/App';
import ErrorPage from './components/ErrorPage/ErrorPage';

const Router = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <App />,
			errorElement: <ErrorPage />,
		},
		{
			path: '/:name',
			element: <App />,
		},
	]);

	return <RouterProvider router={router} />;
};

export default Router;
