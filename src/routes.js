import imageGallery from './components/gallery/imageGallery.vue';
import videoGallery from './components/gallery/videoGallery.vue';
import imageUpload from './components/upload/imageUpload.vue';
import videoUpload from './components/upload/videoUpload.vue';
import home from './components/home/home.vue';

export default [
	{ path: '/', component: home },
	{ path: '/images', component: imageGallery },
	{ path: '/images/upload', component: imageUpload },
	{ path: '/videos', component: videoGallery },
	{ path: '/videos/upload', component: videoUpload },
];
