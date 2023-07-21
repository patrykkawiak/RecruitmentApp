import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import Home from './pages/Home';
import Admin from './pages/Admin';
import AdminLayout from './pages/AdminLayout';
import Applications from './pages/Applications';
import Brand from './pages/Brand';
import Theme from './pages/Theme';
import { Homeloader as homeLoader } from './pages/Home';
const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{ index: true, element: <Home />, loader: homeLoader },
			{
				path: 'admin',
				element: <AdminLayout />,
				children: [
					{ index: true, element: <Admin /> },
					{ path: 'applications', element: <Applications /> },
					{ path: 'brand', element: <Brand /> },
					{ path: 'theme', element: <Theme /> },
				],
			},
		],
	},
]);

function App() {

	return <RouterProvider router={router} />;
}

export default App;
