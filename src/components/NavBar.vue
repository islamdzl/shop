<template>
  <div class="nave-bar">
    <div class="user-info">
      <img src="../assets/logo.png">
      <p>Example Email@gmail.com</p>
    </div>
    <div class="search">
      <input type="search" placeholder="Search">
      <img src="../assets/images/magnifying-glass.png">
    </div>
    <div class="routers">
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
  </div>
</template>
<script>
 // solt
  import navBar from '@/store/modules/navBar';
  export default {
      name: 'NavBar',
      computed: {
        routes() {
          return this.$store.getters['navBar/routes'];
        },
        routeSelected() {
          return this.$store.getters['navBar/routeSelected']
        },
      },
      methods: {
        goToPage(path, index) {
          if (this.$route.path === path) return;
          this.$router.push(path)
          navBar.state.routeSelected = index;
        },
      },
      created() {
        console.log(this.$store.getters['navBar/selected'])
      }
  }
</script>
<style scoped>
  .user-info p {
    margin: auto 0;
  }
  .user-info img {
    height: 100%;
    margin: 0 20px 0 0;
  }
  .user-info {
    display: flex;
    justify-self: left;
  }
  .nave-bar {
    position: fixed;
    width: 98vw;
    height: calc(8vh - 1px);
    background-color: var(--background);
    border-bottom: 1px rgba(240, 248, 255, 0.5) solid;
    display: flex;
    padding: 1vh 1vw;
  }
  .routers {
    display: flex;
    margin-left: auto;
  }
  .route {
    height: 6vh;
    margin: 1vh 2vh;
    padding: 0 10px;
    text-align: center;
    color: #42b983;
    cursor: pointer;
    border-radius: 10px;
    background-color: var(--layer-2);
    border: 1px solid var(--color-2);
    display: flex;
    transition: 300ms;
  }
  .route[select='1'] {
    border: 1px solid var(--color-1);
  }
  .route:hover {
    border: 1px solid rgba(240, 248, 255, 0.5);
  }
  .route p {
    font-size: 17px;
    align-self: center;
  }
  .route img {
    width: 1.6vw;
    height: 1.6w;
    margin: auto 0vw auto 0.7vw;
  }
  nav a.router-link-exact-active {
    color: #42b983;
  }
  .search {
    width: 30%;
    background-color: var(--layer-1);
    border-radius: 20px;
    margin: 0.3vh auto;
    display: flex;
  }
  .search input {
    background-color: transparent;
    border: none;
    outline: none;
    text-align: center;
    width: 100%;
    padding-left: 10%;
    font-size: 135%;
  }
  .search img {
    width: 2vw;
    height: 2vw;
    padding: 2%;
    margin: 0 2%;
  }
</style>