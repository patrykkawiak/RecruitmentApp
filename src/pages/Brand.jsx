import { useSelector, useDispatch } from 'react-redux';
import Heading from '../components/UI/Heading';
import InputCtn from '../components/UI/InputCtn';
import classes from '../style/inputs.module.scss';
import { brandSliceActions } from '../store/brandSlice';
import { useState } from 'react';
import { db } from '../firebase-config';
import { doc, setDoc } from 'firebase/firestore';

const Brand = () => {
	const dispatch = useDispatch();

	const name = useSelector((state) => state.brand.name);
	const img = useSelector((state) => state.brand.img);
	const heading = useSelector((state) => state.brand.heading);
	const desc = useSelector((state) => state.brand.desc);

	const [inputName, setInputName] = useState(name);
	const [inputImg, setInputImg] = useState(img);
	const [inputHeading, setInputHeading] = useState(heading);
	const [inputDesc, setInputDesc] = useState(desc);

	const handleBrandName = (e) => {
		setInputName(e.target.value);
	};
	const handleBrandImg = (e) => {
		setInputImg(e.target.value);
	};
	const handleBrandHeading = (e) => {
		setInputHeading(e.target.value);
	};
	const handleBrandDesc = (e) => {
		setInputDesc(e.target.value);
	};

	const mainObj = {
		name: inputName,
		img: inputImg,
		heading: inputHeading,
		desc: inputDesc,
	};

	const handleChangeDetails = () => {
		dispatch(brandSliceActions.changeDetails(mainObj));
		sendInfo(mainObj);
	};

	const sendInfo = async ({ name, img, heading, desc }) => {
		try {
			await setDoc(doc(db, 'brand', 'brand_info'), {
				desc,
				img,
				name,
				heading,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const color = useSelector((state) => state.theme.color);
	return (
		<section className='p-16'>
			<Heading>Brand Info</Heading>
			<div>
				<InputCtn>
					<label htmlFor='name'>Brand Name</label>
					<input
						className={classes.input}
						type='text'
						name='name'
						value={inputName}
						onChange={handleBrandName}
					/>
				</InputCtn>
				<InputCtn>
					<label htmlFor='name'>Brand Img</label>
					<input
						className={classes.input}
						type='text'
						name='name'
						value={inputImg}
						onChange={handleBrandImg}
					/>
				</InputCtn>
				<InputCtn>
					<label htmlFor='name'>Brand Heading</label>
					<input
						className={classes.input}
						type='text'
						name='name'
						value={inputHeading}
						onChange={handleBrandHeading}
					/>
				</InputCtn>
				<InputCtn>
					<label htmlFor='name'>Brand Description</label>
					<textarea
						className={classes.input}
						type='text'
						name='name'
						value={inputDesc}
						onChange={handleBrandDesc}
					></textarea>
				</InputCtn>
				<button
					className='mt-4 px-4 py-2 text-xl border-solid border-2'
					style={{ borderColor: color }}
					onClick={handleChangeDetails}
				>
					Change
				</button>
			</div>
		</section>
	);
};
export default Brand;
