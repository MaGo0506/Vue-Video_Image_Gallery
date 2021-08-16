<template>
  <div id="video-gallery">
    <nav>
      <router-link
        class="router-link"
        :to="`/`"
      >
        Home
      </router-link>
      <router-link
        class="router-link"
        :to="`/videos/upload`"
      >
        Upload Video
      </router-link>
    </nav>
    <h1 class="title">
      Video Gallery
    </h1>
    <div
      v-for="video in videos"
      :key="video.id"
      :class="`videoCard`"
    >
      <h3 class="cardTitle">
        {{ video.title }}
      </h3>
      <video
        width="320"
        height="240"
        controls
        class="videoPLayer"
        nodownload
        @mouseover="playVideo"
        @mouseout="pauseVideo"
      >
        <source
          :src="video.videoURL"
          type="video/mp4"
        >
        Your browser does not support the video tag.
      </video>
      <p class="cardText">
        {{ video.content }}
      </p>
      <div class="btnHolder">
        <button
          class="editBtn"
          @click.prevent="modal = !modal; showModal(video)"
        >
          Edit
        </button>
        <button
          class="deleteBtn"
          @click="deleteItem(video)"
        >
          Delete
        </button>
      </div>
      <div
        v-if="modal"
        :class="`modalWrapper ${active == video.index ? 'active' : ''}`"
      >
        <p
          class="closeBtn"
          @click.prevent="modal = !modal"
        >
          X
        </p>
        <h2>Edit Video</h2>
        <h4>Video Title</h4>
        <input
          v-model="video.title"
          type="text"
          placeholder="title.."
        >
        <h4>Video Content</h4>
        <textarea
          v-model="video.content"
          type="text"
          placeholder="description.."
        />
        <button
          class="saveBtn"
          @click="updateVideo"
        >
          Save
        </button>
      </div>
    </div>
    <div :class="`shadow ${modal}`" />
  </div>
</template>

<script>
import db from '../../fireBase';

export default {
	data() {
		return {
			active: 0,
			modal: false,
			activeItem: null,
			submitted: false,
			video: {
				title: '',
		    content: '',
			},
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
		deleteItem(doc) {
			if (confirm('Are you sure ? ')) {
				db.collection('videos').doc(doc.id).delete().then(() => {
					window.location.reload();
					console.log('Video succesfully deleted!');
				})
					.catch((error) => {
						console.error('Error removing document: ', error);
					});
			}
		},
		showModal(video) {
			this.active = video.index;
			this.activeItem = video.id;
			this.video = video;
		},
		updateVideo() {
			db.collection('videos').doc(this.activeItem).update({
				title: this.video.title,
				content: this.video.content,
			});
			this.modal = false;
			this.submitted = true;
		},
		playVideo(e) {
			e.target.play();
		},
		pauseVideo(e) {
			e.target.pause();
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../../scss/style.scss";

#video-gallery {
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

    .videoCard {
        position: relative;
        display: inline-flex;
        flex-direction: column;
        margin: 20px;
        padding: 15px;
        width: 350px;
        border: 1px solid snow;
        background: cornflowerblue;
        color: #fff;
        text-align: center;
        border-radius: 20px; transition: 0.3s;

    .editBtn {
      background: rgb(205, 226, 11);

      &:hover {
        background: rgb(238, 180, 20);
      }
    }

    .deleteBtn {
      background: rgb(224, 43, 37);

      &:hover {
        background: rgb(155, 12, 7);
      }
    }
	}
}

</style>
