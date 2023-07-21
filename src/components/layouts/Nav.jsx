import { Link, NavLink } from 'react-router-dom';
import Icon from '../../assets/ico/icon.png';
import { useSelector } from 'react-redux';
const Nav = () => {
	const color = useSelector((state) => state.theme.color);
	return (
		<nav className='h-24 shadow-md'>
			<div className='wrapper'>
				<div className='flex justify-between items-center h-full px-4'>
					<Link
						to='/'
						className='flex items-center p-4 gap-x-3'
						style={{ color }}
					>
						<img src={Icon} alt='logo' className='h-10' />
						<div className={'text-4xl'}>BetterJob</div>
					</Link>
					<NavLink
						className='text-xl p-4 hover:scale-110 duration-300'
						to='/admin'
						style={{ color }}
					>
						Recruiter panel
					</NavLink>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
