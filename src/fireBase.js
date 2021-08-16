import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDsOegEqL-DJqISZgX9MoLTJonZCmlXiTw',
	authDomain: 'vue-image-gallery.firebaseapp.com',
	projectId: 'vue-image-gallery',
	storageBucket: 'vue-image-gallery.appspot.com',
	messagingSenderId: '205173477162',
	appId: '1:205173477162:web:b6d0c2bd8fe2f4c8c39853',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;
