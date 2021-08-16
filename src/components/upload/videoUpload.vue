<template>
  <div id="video-upload">
    <nav>
      <router-link
        class="router-link"
        :to="`/`"
      >
        Home
      </router-link>
      <router-link
        class="router-link"
        :to="`/videos`"
      >
        Video Gallery
      </router-link>
    </nav>
    <div class="uploadMain">
      <div>
        <h2>Add a video to Album</h2>
        <div class="titleHolder">
          <h4>Video title</h4>
          <input
            v-model="title"
            type="text"
            placeholder="video title"
          >
        </div>
        <div class="bodyHolder">
          <h4>Video Description</h4>
          <textarea
            v-model="content"
            type="text"
            placeholder="description.."
          />
        </div>
        <input
          class="choseFile"
          type="file"
          accept="video/*"
          @change="previewVideo"
        >
      </div>
      <div>
        <p>
          Progress: {{ uploadValue.toFixed()+"%" }}
          <progress
            id="progress"
            :value="uploadValue"
            max="100"
          />
        </p>
      </div>
      <div v-if="videoData!=null">
        <img
          class="preview"
          :src="video"
        >
        <br>
        <button
          class="upload"
          @click="onUpload"
        >
          Upload
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import db from '../../fireBase';

export default {
	name: 'Upload',
	data() {
		return {
			content: '',
			title: '',
			videoData: null,
			video: null,
			uploadValue: 0,
		};
	},
	computed: {
		videos() {
			return this.$store.state.videos;
		},
	},
	mounted() {
		this.$store.dispatch('getVideos');
	},
	methods: {
		previewVideo(event) {
			this.uploadValue = 0;
			this.video = null;
			this.videoData = event.target.files[0];
		},
		onUpload() {
			this.video = null;
			const storageRef = firebase.storage().ref(`${this.videoData.name}`).put(this.videoData);
			storageRef.on('state_changed', (snapshot) => {
				this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			}, (error) => { console.log(error.message); },
			() => {
				this.uploadValue = 100;
				storageRef.snapshot.ref.getDownloadURL().then((url) => {
					this.video = url;
					const video = {
						id: null,
						index: this.$store.state.videos.length + 1,
						title: this.title,
						content: this.content,
						videoURL: this.video,
					};
					db.collection('videos').add(video).then(() => {
						console.log('Added to Firestore');
						console.log(video.id);
					});
				});
			});
		},
	},
};

</script>

<style lang="scss" scoped>

#video-upload {
	text-align: center;

	h2 {
		margin-top: 50px;
	}

	nav {
		background: cornflowerblue;
		display: flex;
		justify-content: space-between;

		.router-link {
				margin-top: 5px;
				width: 100%;
				font-size: 26px;
				cursor: pointer;
				text-decoration: none;
				color: #fff;
		}
	}

	img.preview {
		width: 200px;
	}

.uploadMain {
    background: cornflowerblue;
    display: inline-block;
    margin-top: 20px;
    color: #fff;

    .titleHolder {
        text-align: left;
        margin: 15px 10px;

        input {
            width: 100%;
        }
    }

    .bodyHolder {
        text-align: left;
        margin: 15px 10px;

        textarea {
            width: 100%;
        }
    }

    .choseFile {
        margin-left: 10px;
    }

	.upload {
    width: 200px;
		margin: 20px;
		border: none;
		border-radius: 10px;
		padding: 10px 0;
	}
}
}

</style>
