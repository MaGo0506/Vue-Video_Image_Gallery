<template>
  <div id="image-gallery">
    <nav>
      <router-link
        class="router-link"
        :to="`/`"
      >
        Home
      </router-link>
      <router-link
        class="router-link"
        :to="`/images/upload`"
      >
        Upload Image
      </router-link>
    </nav>
    <h1 class="title">
      Photo Gallery
    </h1>
    <div
      v-for="photo in photos"
      :key="photo.id"
      :class="`photoCard`"
    >
      <h4 class="cardTitle">
        {{ photo.title }}
      </h4>
      <img
        class=" cardImage rounded"
        :src="photo.imageURL"
      >
      <p class="cardText">
        {{ photo.content }}
      </p>
      <div class="btnHolder">
        <button
          class="editBtn"
          @click.prevent="modal = !modal; showModal(photo)"
        >
          Edit
        </button>
        <button
          class="deleteBtn"
          @click="deleteItem(photo)"
        >
          Delete
        </button>
      </div>
      <div
        v-if="modal"
        :class="`modalWrapper ${active == photo.index ? 'active' : ''}`"
      >
        <p
          class="closeBtn"
          @click.prevent="modal = !modal"
        >
          X
        </p>
        <h2>Edit Photo</h2>
        <h4>Photo Title</h4>
        <input
          v-model="photo.title"
          type="text"
          placeholder="title.."
        >
        <h4>Photo Content</h4>
        <textarea
          v-model="photo.content"
          type="text"
          placeholder="description.."
        />
        <button
          class="saveBtn"
          @click="updatePhoto"
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
import 'firebase/firestore';

export default {
	data() {
		return {
			active: 0,
			modal: false,
			activeItem: null,
			submitted: false,
			photo: {
				title: '',
				content: '',
			},
		};
	},
	computed: {
		photos() {
			return this.$store.state.photos;
		},
	},
	mounted() {
		this.$store.dispatch('getPhotos');
	},
	methods: {
		deleteItem(doc) {
			if (confirm('Are you sure ? ')) {
				db.collection('photos').doc(doc.id).delete().then(() => {
					window.location.reload();
					console.log('Photo succesfully deleted!');
				})
					.catch((error) => {
						console.error('Error removing document: ', error);
					});
			}
		},
		showModal(photo) {
			this.active = photo.index;
			this.activeItem = photo.id;
			this.photo = photo;
		},
		updatePhoto() {
			db.collection('photos').doc(this.activeItem).update({
				title: this.photo.title,
				content: this.photo.content,
			});
			this.modal = false;
			this.submitted = true;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../../scss/style.scss";

#image-gallery {
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

  .photoCard {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    margin: 20px;
    padding: 10px;
    width: 15%;
    border: 1px solid snow;
    background: cornflowerblue;
        color: #fff;
    text-align: center;
    border-radius: 20px;

    .cardImage {
        width: 100%;
        cursor: pointer;
        margin-top: 10px;
    }

    .cardText {
        padding: 20px 5px;
        overflow: hidden;
    }
  }
}

</style>
