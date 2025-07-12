<template>
  <div class="product">
    <div class="info">
      <div class="d-title">
        <h1>{{ 'Product name' }}</h1>
      </div>
      <div class="images-previw">
        <img src="../assets/images/arrow-a-4.png" a>
        <div>
          <img src="" class="delay_0-5" key="image-O">
        </div>
        <div c>
          <img src="" class="delay_0-3" key="image-1" c>
        </div>
        <div>
          <img src="" class="delay_0-5" key="image-2">
        </div>
        <img src="../assets/images/arrow-a-2.png" a>
      </div>
    </div>
    <div class="hv"></div>
    <div class="controles">
      <SelectSwitch :css="selectSwitch.style" :ref="0" :items="selectSwitch.items"/>
      <div class="more-info">
        <div class="key-value">
          <div>
            <span class="key">{{ 'Content' }}  : </span><span class="value">40</span>
          </div>
          <div>
            <span class="key">{{ 'Price' }}  : </span><span class="value">500</span>
          </div>
          <div>
            <span class="key">{{ 'Price' }}  : </span><span class="value">500</span>
          </div>
        </div>
      </div>
      <div class="baying">
        <div v-for="(item, index) in baying" :key="`${item.name}-${index}`" class="baying-item-option">
          <span class="baying-key p10 delay_0-3"   :key="item.name + index">{{ item.name }}</span>

          <input type="number" class="baying-value p10 delay_0-3" v-model="baying[index].value" @blur="changeBayingValue(index, ' ')">

          <!-- <span class="baying-value p10 delay_0-3" :key="item.value + index">{{ item.value }}</span> -->

          <div v-if="item.type == 'number'" class="baying-change-values">
            <img src="../assets/images/minus.png" @click="changeBayingValue(index, '-')" class="image-icon">
            <img src="../assets/images/plus.png"  @click="changeBayingValue(index, '+')" class="image-icon">
          </div>
        </div>
      </div>
      <div class="buttons">
        <button class="button" style="background-color: var(--color-1);" @click="goBack">Leave</button>
        <button class="button" style="background-color: var(--color-2);">Buying Now</button>
      </div>
    </div>
  </div>
</template>
<script>
import SelectSwitch from '@/components/SelectSwitch.vue';

  export default {
    name: 'ProductView',
    components: {
      SelectSwitch
    },
    data() {
      return {
        selectSwitch: {
          style: {
            width: '90%',
            height: '3.5vw',
            margin: '3vh auto',
          },
          items: ['red', 'blue', 'green', 'yellow', 'pink']
        },
        baying: [
          {name: 'Count', value: 1, type: 'number'}
        ]
      }
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      changeBayingValue(index, operater) {
        let num = operater == '-' ? this.baying[index].value -1 : (operater == '+' ? this.baying[index].value +1 : this.baying[index].value)
        if (num < 1)  num =  1;
        if (num > 70) num = 70;
        this.baying[index].value = num;
      }
    },
    created() {
      const schema = [
        {type: 'Button', name: 'Islam'}
      ]
      this.$store.commit('sideBar/create', schema)
    }
  }
</script>
<style scoped>
  .product {
    height: 100%;
    width: 100%;
    display: flex;
  }
  .info {
    width: 100%;
    height: 100%;
  }
  .controles {
    width: 32vw;
    height: 100%;
  }
  .hv {
    width: 1px;
    height: 80%;
    margin: auto 0;
    background-color: rgba(240, 248, 255, 0.3);
  }
  .d-title {
    height: 10%;
    margin: 0 3vw;
  }
  .d-title h1 {
    margin: 2% 0;
  }
  .images-previw {
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: space-around;
  }
  .images-previw div {
    width: 15%;
    height: 40%;
    margin: auto 0;
    border-radius: 2vw;
    background-color: var(--layer-1);
    display: flex;
  }
  .images-previw div[c] {
    width: 40%;
    height: 100%;
  }
  .images-previw img[a] {
    width: 3.2vw;
    height: 3.2vw;
    padding: 0.5vw;
    border-radius: 50%;
    opacity: 0.7;
    background-color: var(--layer-1);
    cursor: pointer;
    margin: auto 0;
    transition: 300ms;
  }
  .images-previw img[a]:hover {
    background-color: var(--layer-3);
    opacity: 1;
  }
  .images-previw img[a]:active {
    background-color: rgb(112, 112, 112);
    opacity: 0.5;
  }
  .images-previw img {
    height: 100%;
    margin: 0 auto;
  }
  .more-info {
    width: 80%;
    margin: 3vh 10%;
    padding: 2.5vh 0;
    background-color: var(--layer-4);
    border-radius: 22px;
  }
  .key-value {
    font-size: 1.7vw;
  }
  .key-value div {
    justify-content: space-around;
    display: flex;
    width: 100%;
    margin: 3% 0;
  }
  .key {
    color: var(--color-2);
  }
  .value {
    color: var(--color-1);
  }
  .buttons {
    display: flex;
  }
  .button {
    width: 10vw;
    height: 6.5vh;
    border-radius: 14px;
    margin: 0.5vh 7%;
    border: 1px rgba(240, 248, 255, 0) solid;
    font-size: 17px;
    cursor: pointer;
  }
  .baying {
    width: 100%;
    height: 30%;
    margin-bottom: 2vh;
  }
  .baying-item-option {
    display: flex;
    width: 80%;
    height: 50px;
    margin: 1vh 2%;
    justify-content: space-around;
  }
  .baying-change-values {
    display: flex;
    justify-content: space-between;
  }
  .baying-change-values img {
    margin: 0 0.3vw;
  }
  .p10 {
    padding: 10px;
  }
  .image-icon {
    width: 1.6vw;
    height: 1.6vw;
    border-radius: 50%;
    padding: 10px;
    margin: 0.2vw 0;
    background-color: var(--layer-4);
    cursor: pointer;
    transition: 300ms;
  }
  .image-icon:hover {
    background-color: var(--layer-2);
  }
  .image-icon:active {
    background-color: rgb(112, 112, 112);
    opacity: 0.5;
  }
  .baying-key {
    width: auto;
    font-size: 1.5vw;
    color: rgba(240, 248, 255, 0.8);
    align-items: center;
    justify-content: center;
    padding-left: 15%;
  }
  .baying-value {
    width: 4.5vw;
    height: 2vw;
    color: var(--color-2);
    font-size: 1.5vw;
    text-align: center;
    background-color: transparent;
    border: none;
    outline: none;
  }

  .animation-not-img {
    
  }
</style>