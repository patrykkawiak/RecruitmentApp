import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
const AdminNav = () => {
	const color = useSelector((state) => state.theme.color);
	return (
		<aside className='h-screen w-80 bg-gray-100 text-center p-8 flex flex-col gap-y-4 shadow-lg '>
			<NavLink
				className='font-medium text-2xl'
				to='applications'
				style={{ color: color }}
			>
				Applications
			</NavLink>
			<NavLink
				className='font-medium text-2xl'
				to='brand'
				style={{ color: color }}
			>
				Brand Info
			</NavLink>
			<NavLink
				className='font-medium text-2xl'
				to='theme'
				style={{ color: color }}
			>
				Theme Color
			</NavLink>
		</aside>
	);
};

export default AdminNav;
