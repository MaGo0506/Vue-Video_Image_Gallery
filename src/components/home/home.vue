<template>
  <div id="main-holder">
    <div class="img-holder">
      <img
        class="picture-img"
        :src="pictureImg"
      >
      <router-link
        :to="`/images`"
        exact
      >
        <button>Image Gallery</button>
      </router-link>
    </div>
    <div class="video-holder">
      <img
        class="video-img"
        :src="videoImg"
      >
      <router-link
        :to="`/videos`"
        exact
      >
        <button>Video Gallery</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import pictureImg from '../../assets/picture.png';
import videoImg from '../../assets/video.png';

export default {
	data() {
		return {
			pictureImg,
			videoImg,
		};
	},
};
</script>

<style lang='scss' scoped>

#main-holder {
	display: flex;
	text-align: center;
	justify-content: center;

	.img-holder {
		display: flex;
		flex-direction: column;
		margin: 40px;

		img {
			width: 350px;
			height: auto;
			margin-bottom: 30px;
		}

		button {
			padding: 10px;
			font-size: 24px;
			border-radius: 10px;
			cursor: pointer;
		}
	}

	.video-holder {
		display: flex;
		flex-direction: column;
		margin: 40px;

		img {
			width: 350px;
			height: auto;
			margin-bottom: 30px;
		}

		button {
			padding: 10px;
			font-size: 24px;
			border-radius: 10px;
			cursor: pointer;
		}
	}
}

</style>
