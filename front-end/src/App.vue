<template>
  <div id="app">
      <NavBar/>
      <div class="screen">
        <div class="content" :style="{width: screenContent.width + 'wh'}">
          <router-view/>
        </div>
        <SideBar/>
        <NavigationBar/>
      </div>
      <LoadingView/>

    <!-- <router-view/> -->
  </div>
</template>
<script>
  import NavBar from './components/NaveBar.vue';
  import SideBar from './components/SideBar.vue';
  import sideBar from './store/modules/sideBar';
  import NavigationBar from './components/NavigationBar.vue';
  import LoadingView from './views/LoadingView.vue';

  export default {
    components: {NavBar, SideBar, NavigationBar, LoadingView},
    computed: {
      sideBarWidth() {
        return this.$store.getters['sideBar/width']
      }
    },
    data() {
      return {
        sideBar,
        screenContent: {
          width: 100
        },
      }
    },
    created() {
      this.screenContent.width = 100 - this.sideBarWidth
      this.$store.dispatch('controlles/init', this)
    }
  }
</script>
<style src="./assets/style/global.css"></style>
