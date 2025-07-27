<template>
  <div class="navigation-bar">
      <span 
      v-for="(route, index) in routes" 
      class="route" 
      :key="route.name" 
      :select="routeSelected === index ? '1' : '0'"
      @click="goToPage(route.path, index)">
        <p>{{ route.name }}</p>
        <img v-if="route.img" :src="route.img">
      </span>
  </div>
</template>
<script>
  import naveBar from '@/store/modules/naveBar';

  export default {
    name: 'NavigationBar',
    computed: {
      routes() {
        return this.$store.getters['naveBar/routes'];
      },
      routeSelected() {
        return this.$store.getters['naveBar/routeSelected']
      },
    },
    methods: {
      goToPage(path, index) {
        if (this.$route.path === path) return;
        this.$router.push(path)
        naveBar.state.routeSelected = index;
      },
    }
  }
</script>
<style scoped>
  .navigation-bar {display: none;}
  @media screen and (max-width: 850px) {
    .navigation-bar {
      position: fixed;
      display: block;
      bottom: 0;
      right: 0;
      left: 0;
      height: 7vh;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      background-color: var(--layer-6);
      border-top: 1px rgba(240, 248, 255, 0.5) solid;
      border-bottom: 1px rgba(240, 248, 255, 0.5) solid;
    }
    .route {
      width: 23%;
      height: 3vh;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin: 1vh  5px;
      padding: 7px 6px;
      text-align: center;
      border-radius: 20px;
      background-color: var(--layer-7);
      border: 1px solid transparent;
      display: flex;
      transition: 300ms;
    }
    .route[select='1'] {
      border: 1px solid var(--color-2);
    }
    .route:hover {
      border: 1px solid var(--color-3);
    }
    .route p {
      font-size: 0.9rem;
      align-self: center;
    }
    .route img {
      width: 3vh;
      height: 3vh;
      margin: auto 1vw auto 1.7vw;
    }
  }
</style>