import Container from '../components/UI/Container';
import Content from '../components/UI/Content';
import Heading from '../components/UI/Heading';
import Header from '../components/layouts/Header';
import classes from '../style/inputs.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useLoaderData } from 'react-router-dom';
import { brandSliceActions } from '../store/brandSlice';
import { themeSliceActions } from '../store/themeSlice';
import { useEffect } from 'react';

const Home = () => {
	const { desc, img, name, heading, color } = useLoaderData();
	const dispatch = useDispatch();
	dispatch(brandSliceActions.changeDetails({ desc, img, name, heading }));
	dispatch(themeSliceActions.changeColor(color));

	return (
		<>
			<Header />
			<form className=' px-8 wrapper py-16'>
				<Container>
					<Heading>{heading}</Heading>
					<Content>{desc}</Content>
				</Container>
				<Container>
					<Heading>Contact details</Heading>
					<Content>Please add your contact details here.</Content>
				</Container>
				<div className={classes.ctn}>
					<input
						className={classes.input}
						type='text'
						name='name'
						id='name'
						placeholder='Name'
						style={{ borderColor: color }}
					/>
					<input
						className={classes.input}
						type='text'
						name='lastname'
						id='lastname'
						placeholder='Last Name'
						style={{ borderColor: color }}
					/>
					<input
						className={classes.input}
						type='email'
						name='email'
						id='email'
						placeholder='Email'
						style={{ borderColor: color }}
					/>
					<input
						className={classes.input}
						type='number'
						name='phone'
						id='phone'
						placeholder='Phone Number'
						style={{ borderColor: color }}
					/>
					<input
						className={classes.input}
						type='text'
						name='city'
						id='city'
						placeholder='City'
						style={{ borderColor: color }}
					/>
					<input
						className={classes.input}
						type='text'
						name='job'
						id='job'
						placeholder='Current job'
						style={{ borderColor: color }}
					/>
				</div>

				<div className='flex flex-col gap-y-16'>
					<div className=' flex flex-col gap-y-4'>
						<Heading>Vacancy</Heading>
						<Content>
							Please choose a position which you are applying for. If you want
							choose more than one.
						</Content>
						<select name='' id=''>
							<option value='Fornt End Developer'>Front End Developer</option>
							<option value='Back End Developer'>Back End Developer</option>
							<option value='Fullstack Developer'>Fullstack Developer</option>
						</select>
					</div>
					<div className='flex flex-col gap-y-4'>
						<Heading>Net Financial Requirements</Heading>
						<Content>Tel us about your salary requirements</Content>
						<input
							className={classes.input}
							type='number'
							name='city'
							id='city'
							placeholder='Net salary'
							style={{ borderColor: color }}
						/>
					</div>
					<div className='flex flex-col gap-y-4'>
						<Heading>CV/Resume</Heading>
						<Content>Attach file with your Resume/CV.</Content>
						<input
							className={classes.input}
							type='file'
							name='city'
							id='city'
							style={{ borderColor: color }}
						/>
					</div>
				</div>
			</form>
		</>
	);
};

export default Home;

export const Homeloader = async (dispatch) => {
	const docRef = doc(db, 'brand', 'brand_info');
	const docSnap = await getDoc(docRef);
	const docRef2 = doc(db, 'colors', 'mainColor');
	const docSnap2 = await getDoc(docRef2);
	const data = { ...docSnap.data(), ...docSnap2.data() };
	if (data) {
		return data;
	} else {
		console.log('No such document!');
	}
};
