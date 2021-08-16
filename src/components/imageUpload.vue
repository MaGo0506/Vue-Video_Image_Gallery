<template>
  <div id="image-upload">
    <nav>
      <router-link
        class="router-link"
        :to="`/`"
      >
        Home
      </router-link>
      <router-link
        class="router-link"
        :to="`/images`"
      >
        Image Gallery
      </router-link>
    </nav>
    <div class="uploadMain">
      <div>
        <h2>Add image to Album</h2>
        <div class="titleHolder">
          <h5>Image title</h5>
          <input
            v-model="title"
            type="text"
            placeholder="image title"
          >
        </div>
        <div class="bodyHolder">
          <h5>Image Description</h5>
          <textarea
            v-model="content"
            type="text"
            placeholder="description.."
          />
        </div>
        <input
          class="choseFile"
          type="file"
          accept="image/*"
          @change="previewImage"
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
      <div v-if="imageData!=null">
        <img
          class="preview"
          :src="picture"
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
import db from '../fireBase';

export default {
	name: 'Upload',
	data() {
		return {
			content: '',
			title: '',
			imageData: null,
			picture: null,
			uploadValue: 0,
		};
	},
	computed: {
		photos() {
			return this.$store.state.photos;
		},
	},
	methods: {
		previewImage(event) {
			this.uploadValue = 0;
			this.picture = null;
			this.imageData = event.target.files[0];
		},
		onUpload() {
			this.picture = null;
			const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
			storageRef.on('state_changed', (snapshot) => {
				this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			}, (error) => { console.log(error.message); },
			() => {
				this.uploadValue = 100;
				storageRef.snapshot.ref.getDownloadURL().then((url) => {
					this.picture = url;
					const photo = {
            id: null,
						index: this.$store.state.photos.length + 1,
						title: this.title,
						content: this.content,
						imageURL: this.picture,
					};
					db.collection('photos').add(photo).then(() => {
						console.log('Added to Firestore');
						this.photos.push(photo);
						console.log(photo.id);
					});
				});
			});
		},
	},
};
</script>

<style lang="scss" scoped>
#image-upload {
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
