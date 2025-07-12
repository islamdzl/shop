<template>
  <div>
    <div v-if="! hide" class="side-bar" :style="{width: width + 'vw'}">
      <div v-if="state" class="scrool">
        <div>
          <img class="arrow delay_0-4" src="../assets/images/arrow-2.png" @click="setState(false)">
        </div>

        <div v-for="(item, index) in items" :key="index" class="delay_0-7">
          <div v-if="item.type == 'Hr'" class="flex">
            <div class="hr" :style="{width: `${item.width}%`}"></div>
          </div>

          <div v-if="item.type == 'Route'" class="flex">
            <div class="route">
              <p>{{ item.name }}</p>
              <img src="../assets/images/arrow-2.png">
            </div>

            <img src="../assets/logo.png"
            v-if="item.img">

            <div v-else class="fack-img"></div>
          </div>

          <div v-if="item.type == 'Lable'" class="flex">
            <p 
            class="lable"
            :style="{fontSize: item.size + 'px'}">{{ item.text }}</p>
            <img src="../assets/logo.png"
            v-if="item.img">
          </div>

          <div v-if="item.type == 'Button'" class="flex">
            <button 
            class="button"
            @click="item.onClick"
            @change="item.onChange">{{ item.name }}</button>
            <img src="../assets/logo.png"
            v-if="item.img">
            <div v-else class="fack-img"></div>
          </div>

          <div v-if="item.type == 'Input'" class="flex">
            <input
            class="input"
            :type="item.typeT"
            @click="item.onClick"
            @change="item.onChange"
            :placeholder="item.placeholder"
            v-model="sideBar.state.values[item.ref]">
            <img src="../assets/logo.png"
            v-if="item.img">
            <div v-else class="fack-img"></div>
          </div>
        </div>
      </div>
      <div v-else>
        <img class="arrow delay_0-4" src="../assets/images/arrow-4.png" @click="setState(true)">
        <div v-for="(item, index) in items" :key="index">
          <img v-if="item.img" class="arrow delay_0-7" @click="item.onClick" src="../assets/logo.png">
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
  import sideBar from '@/store/modules/sideBar';
  export default {
    name: 'SideBar',
    data() {
      return{sideBar}
    },
    computed: {
      hide() {
        return this.$store.getters['sideBar/hide'];
      },
      state() {
        return this.$store.getters['sideBar/state'];
      },
      items() {
        return this.$store.getters['sideBar/items'];
      },
      width() {
        return this.$store.getters['sideBar/width'];
      },
    },
    methods: {
        getRefValue(key) {
          return this.$store.commit('sideBar/getRefValue', key)
        },
        setState(state) {
          this.$store.commit('sideBar/setState', state)
        },
      },
  }
</script>
<style scoped>
  .side-bar {
    background-color: var(--background);
    top: 10vh;
    height: 100%;
    border-left: 1px rgba(240, 248, 255, 0.5) solid;
    transition: 300ms;
    z-index: 1;
  }
  .flex {
    height: 4.5vh;
    margin:  2% 2%;
    border-radius: 10px;
    padding: 1.5%;
    display: flex;
    img {
      width: 4.5vh;
      height: 4.5vh;
      margin: 0 2% 0 0;
    }
  }
  .fack-img {
    width: 4.5vh;
    height: 4.5vh;
    margin: 0 2% 0 0;
  }
  .hr {
    height: 1px;
    margin: 7% auto;
    background-color: rgba(240, 248, 255, 0.5);
  }
  .route {
    width: 84%;
    margin: 0% 5%;
    cursor: pointer;
    padding: 1% 0;
    transition: 300ms;
    display: flex;
    img {
      display: inline;
      height: 3vh;
      width: 3vh;
      margin: 1% 0;
      right: 10px;
    }
    p {
      text-align: center;
      margin-top: 1%;
      width: 80%;
    }
  }

  .lable {
    width: 100%;
    text-align: center;
    margin: 0 5%;
    color: rgb(204, 204, 204);
  }

  .button {
    width: 84%;
    height: 4.5vh;
    margin: 0 5%;
    letter-spacing: 1px;
    background-color: transparent;
    cursor: pointer;
    transition: 300ms;
  }
  .input {
    width: 84%;
    height: 3.7vh;
    margin: 0 5%;
    letter-spacing: 1px;
    text-align: center;
    transition: 300ms;
  }
  .input:hover, .button:hover, .route:hover {
    border: 0.3mm rgba(240, 248, 255, 0.521) solid;
  }
  .input, .button, .route {
    border-radius: 10px;
    border: 1px rgba(240, 248, 255, 0.0) solid;
    background-color: var(--layer-0);

  }
  .arrow {
    width: 2.4vw;
    height: 2.4vw;
    padding: 0.3vw;
    cursor: pointer;
  }
  .scrool {
    overflow-y: scroll;
    height: 100%;
  }
</style>