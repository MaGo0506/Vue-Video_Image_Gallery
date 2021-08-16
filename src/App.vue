<template>
  <div id="app">
    <loader />
    <router-view />
  </div>
</template>

<script>
import loader from './components/loader.vue';

export default {
	name: 'App',
	components: {
		loader,
	},
	data() {
		return {

		};
	},
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  height: 100%;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  background: #8ed4fd;

}

</style>
