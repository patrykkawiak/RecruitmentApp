import { Outlet } from 'react-router-dom';
import AdminNav from '../components/layouts/AdminNav';
const AdminLayout = () => {
	return (
		<div className='flex'>
			<AdminNav />
			<Outlet />
		</div>
	);
};

export default AdminLayout;
