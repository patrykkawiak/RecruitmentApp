import { Outlet } from 'react-router-dom';
import AdminNav from '../components/layouts/AdminNav';
const AdminLayout = () => {
	return (
		<div className='flex h-full w-full'>
			<AdminNav />
			<Outlet />
		</div>
	);
};

export default AdminLayout;
