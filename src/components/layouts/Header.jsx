import { useSelector } from 'react-redux';
const Header = () => {
	const name = useSelector((state) => state.brand.name);
	const img = useSelector((state) => state.brand.img);
	const imgURL = `url('${img}')`;
	return (
		<>
			<header
				className='w-full z-0 h-80 bg-no-repeat bg-cover bg-top rounded-b-[50px] overflow-hidden bg-fixed'
				style={{ backgroundImage: imgURL }}
			>
				<div className='h-full w-full z-10 bg-black/60 flex justify-center items-center text-white text-7xl tracking-wider'>
					<h1 className='z-20 text-center px-4'>{name}</h1>
				</div>
			</header>
		</>
	);
};

export default Header;
