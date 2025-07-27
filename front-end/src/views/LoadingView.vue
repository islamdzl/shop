<template>
  <div>
    <div v-if="loadingState">
      <div class="desktop"></div>
      <div class="mobile">
        <div class="mobile-loading">
          <img src="../assets/images/loading.png">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'LoadingView',
    data() {
      return {
      }
    },
    computed: {
      loadingState() {
        return this.$store.getters['loadingState']
      }
    },
    methods: {
    }
  }
</script>
<style scoped>
  @media screen and (max-width: 850px) {
    .mobile-loading {
      position: absolute;
      z-index: 10;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(4px);
      background-color: rgb(0, 0, 0, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .mobile-loading img {
      width: 10vw;
      animation: rotate 700ms linear infinite;
    }
  }
  @keyframes rotate {
    0%   {
      rotate: 0deg;
    }
    100% {
      rotate: 360deg;
    }
  }

</style>