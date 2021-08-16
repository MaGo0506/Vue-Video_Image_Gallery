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
import db from '../fireBase';
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

  .btnHolder {
    display: flex;
    justify-content: space-evenly;

    button {
      padding: 5px 20px;
      font-size: 16px;
      border: none;
      color: #fff;
      cursor: pointer;
      border-radius: 10px;
      transition: 0.3s;
    }

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

  .modalWrapper {
            position: fixed;
            display: none;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.9);
            max-width: 400px;
            width: 100%;
            height: auto;
            z-index: 100;
            background: cornflowerblue;
            text-align: left;
            padding: 30px;

            &.active {
                display: flex;
                flex-direction: column;
            }

            h2 {
              margin: 0 0 20px 0;
              text-align: center;
            }

            input {
              font-size: 18px;
              padding: 5px 10px;
              margin-bottom: 10px;
            }

            textarea {
              font-size: 18px;
              padding: 5px 10px;
            }

            .saveBtn {
              margin: 50px auto 10px auto;
              width: 150px;
              padding: 5px 15px;
              font-size: 20px;
              font-weight: bold;
              border: none;
              background: rgb(0, 255, 115);
              border-radius: 10px;
              transition: 0.3s;

              &:hover {
                background: rgb(10, 158, 76);
              }
            }

            .closeBtn {
                position: absolute;
                top: 20px;
                right: 10px;
                cursor: pointer;
                font-size: larger;
                color: firebrick;
                border: 1px solid firebrick;
                padding: 20px 25px;
                border-radius: 50%;
                transition: 0.3s;

                &:hover {
                background: firebrick;
                color: white;
              }
            }
        }
}

.shadow {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
    display: none;
    background: rgba(0,0,0,0.45);

    &.true {
        display: block;
    }
}
</style>
