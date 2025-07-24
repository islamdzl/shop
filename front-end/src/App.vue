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
    <!-- <router-view/> -->
  </div>
</template>
<script>
  import NavBar from './components/NavBar.vue';
  import SideBar from './components/SideBar.vue';
  import sideBar from './store/modules/sideBar';
  import NavigationBar from './components/NavigationBar.vue';

  export default {
    components: {NavBar, SideBar, NavigationBar},
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
    }
  }
</script>
<style src="./assets/style/global.css"></style>
