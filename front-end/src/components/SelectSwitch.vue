<template>
  <div class="select-switch" :style="css">
    <div class="item">
      <div class="arrow">
        <img :src="arrows.Arrow_4" l @click="handleArrow(false)">
      </div>
      <div class="hv"></div>
      <div class="selection">
        <p class="delay_0-5" :key="`${renderItems[0]}-0`">{{ renderItems[0] }}</p>
        <p c class="delay_0-3" :key="`${renderItems[1]}-1`">{{ renderItems[1] }}</p>
        <p class="delay_0-5" :key="`${renderItems[2]}-2`">{{ renderItems[2] }}</p>
      </div>
      <div class="hv"></div>
      <div class="arrow">
        <img :src="arrows.Arrow_2" r @click="handleArrow(true)">
      </div>
    </div>
  </div>
</template>
<script>
  import Arrow_2 from '../assets/images/arrow-2.png'
  import Arrow_4 from '../assets/images/arrow-4.png'
  export default {
    name: 'SelectSwitch',
    props: {
      css: {type: Object, default: ()=> {}},
      items: {type: Array, default: ()=> []},
      onChange: {type: Function, default: ()=> ()=>{}},
      refrence: {type: Number, default: 0}
    }, 
    data() {
      return {
        arrows: {
          Arrow_2, Arrow_4
        },
        renderItems: ['', '', ''],
        ref: 0,
      }
    },
    methods: {
      handleArrow(boll) {
        boll ? this.ref++ : this.ref--;
        if (this.ref == this.items.length) this.ref = 0;
        if (this.ref < 0) this.ref = this.items.length - 1;
        this.render()
      },
      getItem(index) {
        const ref = index % this.items.length
        return this.items[ref] ? this.items[ref] : this.items[this.items.length  -1]
      },
      render() {
        this.renderItems = [this.getItem(this.ref - 1), this.getItem(this.ref), this.getItem(this.ref + 1)]
      },
    },
    created() {
      this.ref = this.refrence;
      this.render()
    }
  }
</script>
<style scoped>
  .select-switch {
    background-color: var(--layer-1);
    border-radius: 20px;
    width: 300px;
    height: 50px;
  }
  .item {
    height: 100%;
    display: flex;
    justify-content: space-around;
  }
  .arrow img {
    width: 1.8vw;
    margin: 45% auto;
    cursor: pointer;
    transition: 300ms;
  }
  /* .arrow img[r] {
    margin-right: 20%;
  }
  .arrow img[l] {
    margin-left: 20%;
  } */
  .arrow img:hover {
    opacity: 0.6;
  }
  .selection {
    display: flex;
    align-items: center;
    width: 65%;
  }
  .selection p {
    width: 30%;
    margin: 0 5px;
    font-size: 1vw;
    color: rgba(240, 248, 255, 0.5);
    text-align: center;
  }
  .selection p[c] {
    font-size: 1.5vw;
    width: 40%;
    color: rgb(179, 179, 179);
  }
  .hv {
    height: 50%;
    width: 1px;
    background-color: rgba(240, 248, 255, 0.5);
    margin: auto 0;
  }
</style>