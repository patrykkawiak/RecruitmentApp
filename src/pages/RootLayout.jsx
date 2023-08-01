import { Outlet, useLoaderData } from 'react-router-dom';
import Nav from '../components/layouts/Nav';
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { useDispatch } from 'react-redux';
import { brandSliceActions } from '../store/brandSlice';
import { themeSliceActions } from '../store/themeSlice';
import { applicationsAction } from '../store/applicationsSlice';

const RootLayout = () => {
	// const { desc, img, name, heading, color, appsArr } = useLoaderData();
	// const dispatch = useDispatch();
	// dispatch(brandSliceActions.changeDetails({ desc, img, name, heading }));
	// dispatch(themeSliceActions.changeColor(color));
	// dispatch(applicationsAction.updateApplications(appsArr));


	return (
		<>
			<Nav />
			<main className='h-full'>
				<Outlet />
			</main>
		</>
	);
};

export default RootLayout;


export const rootloader = async () => {
	const docRef = doc(db, "brand", "brand_info");
	const docSnap = await getDoc(docRef);
	const docRef2 = doc(db, "colors", "mainColor");
	const docSnap2 = await getDoc(docRef2);
	const querySnapshot = await getDocs(collection(db, "applications"));
	const appsArr = [];
	querySnapshot.forEach((doc) => appsArr.push(doc.data()));
	const data = { ...docSnap.data(), ...docSnap2.data(), appsArr };
  
	if (data) {
	  return data;
	} else {
	  console.log("No such document!");
	}
  };