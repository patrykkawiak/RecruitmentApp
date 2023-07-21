import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDra1K47MrARBcpsGqRmX7cFpGolOt3AHo',
	authDomain: 'betterjob-78a15.firebaseapp.com',
	projectId: 'betterjob-78a15',
	storageBucket: 'betterjob-78a15.appspot.com',
	messagingSenderId: '67819880357',
	appId: '1:67819880357:web:d1a551bc703dcef6b5b24c',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
