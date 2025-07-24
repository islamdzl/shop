<template>
  <div class="statu-path delay_0-4">
    <div class="path">

      <span class="index" :style="{'--width': `${state.index}%`}"></span>

      <span v-for="(item, index) in state.data"  :key="index" class="parent">

        <div v-if="item.type == 'path'" class="hr" hr><p>{{ item.name }}</p></div>

        <div v-if="item.type == 'state'" class="circle"><p>{{ item.name }}</p>
          <img src="../assets/images/half-circle-1.png" class="circle-img l">
          <img :src="item.img" class="icon">
          <img src="../assets/images/half-circle-3.png" class="circle-img r">
        </div>

      </span>
      <!-- <div class="hr"><p>islam</p></div>
      <div class="circle">
        <img src="../assets/images/half-circle-1.png" class="circle-img l">
        <img src="../assets/images/package.png" class="icon">
        <img src="../assets/images/half-circle-3.png" class="circle-img r">
      </div>
      <div class="hr"><p>islam</p></div>
      <div class="circle">
        <img src="../assets/images/half-circle-1.png" class="circle-img l">
        <img src="../assets/images/delivery.png" class="icon">
        <img src="../assets/images/half-circle-3.png" class="circle-img r">
      </div>
      <div class="hr"></div>
      <div class="circle">
        <img src="../assets/images/half-circle-3.png" class="circle-img r">
        <img src="../assets/images/correct.png" class="icon">
        <img src="../assets/images/half-circle-1.png" class="circle-img l">
      </div> -->
    </div>
  </div>
</template>
<script>
  export default {
    name: 'StatuPath',
    props: {
      state: {type:Object, required: true}
    }
  }
</script>
<style scoped>
  .statu-path {
    height: 10vh;
    width: 100%;
  }
  .path {
    position: relative;
    width: calc(100% - 1cm);
    height: 7vh;
    display: flex;
    padding: 3vh 0.5cm 0 0.5cm;
    justify-content: center;
    align-items: center;
  }
  .circle {
    position: relative;
    width: 1.1cm;
    height: 1cm;
    border-radius: 50%;
    display: flex;
    align-items: center;
    background-color: var(--layer-5);
    transition: 300ms;
  }
  .circle:active {
    width: 1.3cm;
    height: 1.2cm;
    img {
      width: 0.9cm;
      height: 0.85cm;
    }
  }
  .circle p {
    position: absolute;
    width: 100%;
    text-align: center;
    transform: translate(0, -4.5vh);
    color: rgba(240, 248, 255, 0.65);
    font-size: 0.9rem;
  }
  .hr {
    position: relative;
    height: 2px;
    width: 100%;
    background-color: #f1f1f1ab;
  }
  .hr p {
    width: 100%;
    text-align: center;
    transform: translate(0, -3.5vh);
    color: rgba(240, 248, 255, 0.65);
    font-size: 0.9rem;
  }
  .circle-img {
    position: absolute;
    width: 1cm;
    height: 1cm;
    margin: 0;
    padding: 0;
  }
  .icon {
    width: 0.7cm;
    height: 0.7cm;
    margin: 0.15cm 0.2cm;
    border-radius: 50%;
    transition: 400ms;

  }
  .l {left: 0px;}
  .r {right: 0px;}
  .index {
    --width: 50%;
    position: absolute;
    width: calc(var(--width) - 0.5cm);
    height: 4px;
    background-color: aliceblue;
    border-radius: 2px;
    left: 0;
    margin: auto 0.5cm;
    transition: 300ms;
  }
  .parent:has(.hr) {
    position: relative;
    width: 100%;
  }
</style>