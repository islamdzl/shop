<template>
  <div id="app">
      <NavBar/>
      <div class="screen">
        <div class="content" :style="{width: screenContent.width + 'wh'}">
          <router-view/>
        </div>
        <SideBar/>
      </div>
    <!-- <router-view/> -->
  </div>
</template>
<script>
  import NavBar from './components/NavBar.vue';
  import SideBar from './components/SideBar.vue';
  import sideBar from './store/modules/sideBar';

  export default {
    components: {NavBar, SideBar},
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
      console.log( this.sideBarWidth)
      this.screenContent.width = 100 - this.sideBarWidth
    }
  }
</script>
<style>
  * {
    color: aliceblue;
    margin: 0;
    padding: 0;
  }
  :root {
    --background: rgb(36, 36, 36);
    --green-1: rgb(85, 145, 51);
    
    --layer-0 : rgb(54, 54, 54);
    --layer-1 : rgba(61, 61, 61, 0.5);
    --layer-2 : rgb(61, 54, 54);
    --layer-3 : rgb(78, 69, 69);
    --layer-4 : rgba(50, 50, 63, 0.5);

    --color-1 : rgb(172, 81, 81);
    --color-2 : rgb(81, 172, 116);
  }
  body {
    background: rgb(50, 50, 50);
  }
  .screen {
    position: fixed;
    top: 10vh;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
  }
  .content {
    width: 100%;
    height: 100%;
    top: 10vh;
    background-color: var(--background);
  }

  .delay_1-0 {animation: delay 1000ms;}
  .delay_0-9 {animation: delay 900ms;}
  .delay_0-8 {animation: delay 800ms;}
  .delay_0-7 {animation: delay 700ms;}
  .delay_0-6 {animation: delay 600ms;}
  .delay_0-5 {animation: delay 500ms;}
  .delay_0-4 {animation: delay 400ms;}
  .delay_0-3 {animation: delay 300ms;}

  @keyframes delay {
    0%  {opacity: 0;}
    50% {opacity: 0;}
    100%{opacity: 1;}
  }

::-webkit-scrollbar {
  width: 12px; 
  height: 12px;
}
::-webkit-scrollbar-track {
  background: var(--background); 
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: var(--layer-1); 
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--layer-2);
}

</style>
