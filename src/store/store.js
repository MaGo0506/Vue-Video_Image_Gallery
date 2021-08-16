/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import db from '../fireBase';

Vue.use(Vuex, axios);

export const store = new Vuex.Store({
	state: {
		photos: [],
		videos: [],
		id: null,
	},
	actions: {
		getPhotos({ commit }) {
			db.collection('photos').get().then((querySnapshot) => {
				const photos = [];
				querySnapshot.forEach((doc) => {
					photos.push(doc.data());
					db.collection('photos').doc(doc.id).update({
						id: doc.id,
					})
						.then(() => {
							console.log('Document successfully written!');
						})
						.catch((error) => {
							console.error('Error writing document: ', error);
						});
				});
				commit('SET_PHOTOS', photos);
			});
		},
		getVideos({ commit }) {
			db.collection('videos').get().then((querySnapshot) => {
				const videos = [];
				querySnapshot.forEach((doc) => {
					videos.push(doc.data());
					db.collection('videos').doc(doc.id).update({
						id: doc.id,
					})
						.then(() => {
							console.log('Document successfully written!');
						})
						.catch((error) => {
							console.error('Error writing document: ', error);
						});
				});
				commit('SET_VIDEOS', videos);
			});
		},
	},
	mutations: {
		SET_PHOTOS(state, photos) {
			state.photos = photos;
		},
		SET_VIDEOS(state, videos) {
			state.videos = videos;
			console.log(state.videos);
		},
	},
});
