<template>
  <div v-if="isAlert">
    <div class="desktop"></div>
    <div class="mobile">
      <div class="mobile-alert">
        <h2 v-if="data.title" class="mobile-alert-title">{{ data.title }}</h2>
        <p class="mobile-alert-message">{{ message }}</p>
        <div class="mobile-inouts">
          <div v-for="(item, index) in data.list" :key="index" class="mobile-input">
            <div v-if="item.type === 'button'">
              <input :value="item.name" type="button" :style="{background: `var(--color-${item.color || 2})`}" w="90" class="button" @click="item.onClick ? item.onClick() : null">
              <img v-if="item.img" :src="item.img">
            </div>
            <div v-else>
              <input v-model="values[(item.ref || `${(item.type || 'text')}-${index}`)]" :type="item.type" :placeholder="item.placeholder">
              <img v-if="item.img" :src="item.img">
              <div v-else class="mobile-fack-input-img"></div>
            </div>
          </div>
        </div>
        <div class="mobile-controles">
          <button w="90" style="background-color: var(--color-1);" class="button mobile-button" @click="cancel()">
            {{ 'Cancel' }}
            <LoadingView :state="ButtonCanselVerifyState"/>
          </button>
          <button w="90" style="background-color: var(--color-2);" class="button mobile-button" @click="done()">
            {{ 'Done' }}
            <LoadingView :state="ButtonDoneVerifyState"/>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoadingView from './LoadingView.vue'

  export default {
    name: 'AlertView',
    components: {LoadingView},
    data() {
      return {
        ButtonDoneVerifyState: false,
        ButtonCanselVerifyState: false,
        values: {}
      }
    },
    computed: {
      isAlert() {
        return this.$store.getters['alert/isAlert']
      },
      message() {
        return this.$store.getters['alert/message']
      },
      onDone() {
        return this.$store.getters['alert/onDone']
      },
      onCancel() {
        return this.$store.getters['alert/onCancel']
      },
      data() {
        return this.$store.getters['alert/data']
      }
    },
    methods: {
      async cancel() {
        this.ButtonCanselVerifyState = true;
        const state = await this.$store.dispatch('alert/cancel', this.values)
        if (typeof state === 'string') {
          this.$store.commit('alert/setMessage', state);
        }
        this.ButtonCanselVerifyState = false;
      },
      async done() {
        this.ButtonDoneVerifyState = true;
        const state = await this.$store.dispatch('alert/done', this.values)
        console.log(state, 'STATE')
        if (typeof state === 'string') {
          this.$store.commit('alert/setMessage', state);
        }
        this.ButtonDoneVerifyState = false;
      }
    },
    created() {
      console.log(this.isAlert)
    }
  }
</script>
<style scoped>
  @media screen and (max-width: 850px) {
    .mobile-alert {
      position: absolute;
      width: 100%;
      height: 40vh;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(5px);
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      animation: btt 600ms;
    }
    .mobile-alert-title {
      width: 100%;
      height: 4vh;
      text-align: center;
      font-size: 1.7rem;
      margin: 2vh 0 0 0;
    }
    .mobile-alert-message {
      width: 90%;
      height: 2.5vh;
      text-align: right;
      font-size: 0.9rem;
      color: var(--color-1);
      margin: 0 auto;
    }
    .mobile-inouts {
      width: 100%;
      height: auto;
      max-height: 50vh
    }
    .mobile-controles {
      position: absolute;
      bottom: 0;
      width: 90%;
      height: 7vh;
      display: flex;
      padding: 0% 5%;
      justify-content: space-around;
      align-items: center;
    }
    .mobile-button {
      position: relative;
      overflow: hidden;
    }
    .mobile-input div {
      width: 90%;
      height: 4.5vh;
      margin: 16px auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .mobile-input div input {
      width: calc(90% - 3vh);
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
      border: 1px rgba(240, 248, 255, 0.5) solid;
      border-radius: 15px;
      text-align: center;
      font-size: 1.1rem;
      transition: 300ms;
    }
    .mobile-input input[type='button'] {border: none; margin: 0 auto;}
   .mobile-input img  , .mobile-fack-input-img {
    width: 4vh;
    height: 4vh;
   }
  }

  @keyframes btt {
    0% {
      height: 0vh;
      opacity: 0;
    }
    60% {
      height: 40vh;

    }
    100% {
      opacity: 1;
    }
  }
</style>