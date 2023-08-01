import { useSelector } from 'react-redux';

const Heading = ({ children }) => {
	const color = useSelector((state) => state.theme.color);

	return (
		<h2 className='text-4xl font-bold text-center' style={{ color: color }}>
			{children}
		</h2>
	);
};

export default Heading;
