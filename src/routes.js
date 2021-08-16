import imageGallery from './components/imageGallery.vue';
import videoGallery from './components/videoGallery.vue';
import imageUpload from './components/imageUpload.vue';
import videoUpload from './components/videoUpload.vue';
import home from './components/image-video.vue';

export default [
	{ path: '/', component: home },
	{ path: '/images', component: imageGallery },
	{ path: '/images/upload', component: imageUpload },
	{ path: '/videos', component: videoGallery },
	{ path: '/videos/upload', component: videoUpload },
];
