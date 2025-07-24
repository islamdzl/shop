<template>
  <div class="nave-bar">

    <div class="desktop-logo">
      <img src="../assets/logo-1536x512.png">
    </div>
      <div class="mobile-logo">
      <img src="../assets/logo-1024x512.png">
    </div>

    <div class="user-info">
      <img src="../assets/images/user.png">
      <p>Example Email@gmail.com</p>
    </div>
    <div class="search">
      <input type="search" placeholder="Search" v-model="searchWord" @keydown.enter="search(searchWord)">
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

    <div v-if="! $store.getters['sideBar/hide']" class="flex">
      <div class="hv"></div>
      <img :src="ISideBar" class="side-bar" @click="$store.commit('sideBar/setState', !sidebarState)">
    </div>
    <div v-else class="flex" style="width: 10vw;"></div>

  </div>
</template>
<script>
 // solt
  import navBar from '@/store/modules/navBar';
  import ISideBar from '../assets/images/side-bar.png'
  export default {
      name: 'NavBar',
      computed: {
        routes() {
          return this.$store.getters['navBar/routes'];
        },
        routeSelected() {
          return this.$store.getters['navBar/routeSelected']
        },
        sidebarState() {
          return this.$store.getters['sideBar/state']
        },
        sideBarHide() {
          return this.$store.getters['sideBar/hide']
        }
      },
      data() {
        return {
          searchWord: '',
          ISideBar,
        }
      }, 
      methods: {
        goToPage(path, index) {
          if (this.$route.path === path) return;
          this.$router.push(path)
          navBar.state.routeSelected = index;
        },
        search(word) {
          if (!word) return;
          if (word.includes('=')) return this.searchWord = '';
          if (word.includes('.')) return this.searchWord = '';
          if (word.includes('?')) return this.searchWord = '';
          if (this.$route.query.search !== word && word.trim()) {
            this.$router.push(`/explore?search=${word.trim()}`)
          }
        }
      },
      
  }
</script>
<style scoped>
  .desktop-logo ,.mobile-logo {
    display: flex;
    justify-self: left;
    margin: 0 1%;
    height: 100%;
    max-width: 350px;
  }
  .desktop-logo img, .mobile-logo img {
    padding: 0;
    margin: 0;
    height: 100%;
  }
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
  .hv {
    display: none;
  }
  .side-bar {
    display: none;
  }
  .flex {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .mobile-logo {display: none;}
  @media only screen and (max-width: 850px) {
    .desktop-logo {display: none;}
    .mobile-logo {display: inline;}
    .user-info p {
      margin: auto 5px auto 0;
      font-size: 0.7rem;
      display: none;
    }
    .user-info img {
      margin: 0 5px;
      height: 100%;
    }
    .nave-bar {
      position: fixed;
      width: 98vw;
      height: calc(6vh - 1px);
      background-color: var(--background);
      border-bottom: 1px rgba(240, 248, 255, 0.5) solid;
      display: flex;
      flex-direction: row;
      padding: 1vh 1vw;
    }
    .user-info {
      display: flex;
      justify-self: left;
    }
    .routers {
      display: flex;
      margin-left: auto;
    }
    .route {
      height: 3vh;
      margin: 1vh  5px;
      padding: 4px 3px;
      text-align: center;
      color: #42b983;
      cursor: pointer;
      border-radius: 5px;
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
      font-size: 0.8rem;
      align-self: center;
    }
    .route img {
      width: 3vh;
      height: 3vh;
      margin: auto 0vw auto 0.7vw;
    }
    nav a.router-link-exact-active {
      color: #42b983;
    }
    .search {
      width: auto;
      height: 80%;
      border-radius: 10px;
      display: flex;
      flex-direction: row;
      margin: auto;
    }
    .search input {
      font-size: 1rem;
      width: 25vw;
      margin: 0 auto;
    }
    .search input:focus {
      width: 35vw;
    }
    .search img {
      width: 3vh;
      height: 3vh;
      padding: 2% 0;
      margin: auto 7px;
    }
    .hv {
      display: block;
      height: 100%;
      width: 1px;
      background-color: rgba(240, 248, 255, 0.5);
      margin: 0 10px;
    }
    .side-bar {
      display: block;
      width: 4vh;
      height: 4vh;
      margin: 0.5vh 0;
      margin-right: 5px;
    }
    .routers {
      display: none;
    }
  }
</style>