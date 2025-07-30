<template>
  <div id="app" :class="colorTheme">
    <NavBar/>
    <div class="screen">
        <div class="content" :style="{width: screenContent.width + 'wh'}">
          <router-view/>
        </div>
        <SideBar/>
        <NavigationBar/>
      </div>
      <LoadingView :state="loadingState"/>
      <AlertView/>

    <!-- <router-view/> -->
  </div>
</template>
<script>
  import NavBar from './components/NaveBar.vue';
  import SideBar from './components/SideBar.vue';
  import sideBar from './store/modules/sideBar';
  import NavigationBar from './components/NavigationBar.vue';
  import LoadingView from './components/LoadingView.vue';
  import AlertView from './components/AlertView.vue';

  export default {
    components: {NavBar, SideBar, NavigationBar, LoadingView, AlertView},
    computed: {
      sideBarWidth() {
        return this.$store.getters['sideBar/width']
      },
      loadingState() {
        return this.$store.getters['loadingState']
      },
      colorTheme() {
        return this.$store.getters['colorTheme']
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
      this.$store.dispatch('init', this)
    }
  }
</script>
<style src="./assets/style/global.css"></style>
