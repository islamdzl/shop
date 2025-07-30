<template>
  <div>
    <div class="desktop">
      <div class="product">
        <div class="info">
          <div class="d-title">
            <h1>{{ 'Product name' }}</h1>
          </div>
          <div class="images-previw">
            <img src="../assets/images/arrow-a-4.png" a>
            <div class="img-viewr">
              <div class="animation-not-img"></div>
              <img src="../assets/logo-512x512.png" class="delay_0-5" key="image-O">
            </div>
            <div class="img-viewr" c>
              <div class="animation-not-img"></div>
              <img src="../assets/logo-512x512.png" class="delay_0-3" key="image-1" c>
            </div>
            <div class="img-viewr">
              <img src="../assets/logo-512x512.png" class="delay_0-5" key="image-2">
              <div class="animation-not-img"></div>
            </div>
            <img src="../assets/images/arrow-a-2.png" a>
          </div>
        </div>
        <div class="hv"></div>
        <div class="controles">
          <!-- <SelectSwitch :css="selectSwitch.style" :ref="0" :items="selectSwitch.items"/> -->
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
            <div class="baying-item-option">
              <span class="baying-key p10 delay_0-3">{{ product.name }}</span>

              <input type="number" class="baying-value p10 delay_0-3" v-model="product.items" @blur="changeBayingValue(' ')">

              <!-- <span class="baying-value p10 delay_0-3" :key="item.value + index">{{ item.value }}</span> -->

              <div class="baying-change-values">
                <img src="../assets/images/minus.png" @click="changeBayingValue('-')" class="image-icon">
                <img src="../assets/images/plus.png"  @click="changeBayingValue('+')" class="image-icon">
              </div>
            </div>
          </div>
          <div class="buttons">
            <button class="button" style="background-color: var(--color-1);" @click="goBack">Leave</button>
            <button class="button" style="background-color: var(--color-2);">Buying Now</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile">
      <div class="mobile-preview">
        <div class="mobile-preview-images">
          <div class="mobile-img-viewr">
            <div class="animation-not-img"></div>
            <img src="../assets/logo-512x512.png" class="delay_0-5" key="image-O">
          </div>
          <div class="mobile-img-viewr" c>
            <div class="animation-not-img"></div>
            <img src="../assets/logo-512x512.png" key="image-1" c>
          </div>
          <div class="mobile-img-viewr">
            <img src="../assets/logo-512x512.png" class="delay_0-5" key="image-2">
            <div class="animation-not-img"></div>
          </div>
        </div>
        <div class="mobile-preview-controles">
          <span></span>
          <img src="../assets/images/arrow-a-4.png" a>
          <span>{{ 20 }} / {{ 14 }}</span>
          <img src="../assets/images/arrow-a-2.png" a>
          <span></span>
        </div>
      </div>
      <div class="mobile-product-detils">
        <h2>{{ product.name }}</h2>
        <span>
          <span k>Price</span>
          <span v>{{ product.price }} DA</span>
          <span k>Total</span>
          <span v :key="product.items">{{ (product.price * product.items) + product.delivery.price }} DA</span>
        </span>
        <span>
          <span k>Content</span><span v :key="product.items">{{ product.items }}</span>
          <img src="../assets/images/plus.png" @click="changeBayingValue('+')">
          <img src="../assets/images/minus.png" @click="changeBayingValue('-')">
        </span>
        <span>
          <span k>Delivery</span>
          <img src="../assets/images/delivery.png" class="icon">
          <span v v-if="product.delivery.price == null">{{ 'Unavailable' }}</span> 
          <span v v-else-if="product.delivery.price === 0">{{ 'Free' }}</span> 
          <span v v-else>{{ product.delivery.price }} DA</span> 
        </span>
        <span><p>{{ product.discription.length < 150 ? product.discription : product.discription.slice(0, 150) + ' ...' }}</p></span>
        <span>
          <button v-if="isLogin" class="button" style="background-color: var(--color-2);">Add To Cart</button>
          <button v-else class="button" style="background-color: var(--color-2);">Bye Now</button>
          
          <button class="button" style="background-color: var(--color-1);">Go Back</button>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
// import SelectSwitch from '@/components/SelectSwitch.vue';

  export default {
    name: 'ProductView',
    computed: {
      isLogin() {
        return this.$store.getters['user/isLogin']
      }
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
        product: {
          id: 'df32e-e323e-3e345-jje7f',
          price: 160,
          items: 1,
          name: 'Batata', 
          delivery: {
            price: 10
          },
          discription: 'ljqlskj lkjsd kkjljsd lk j lghmq lljqlskj lkjsd kkjljsd lk j sdjlflfdk ldf ljqlskj lkjsd kkjljsd lk j sdjlflfdk ldf gmkjgkmkqg  zqklghmq lgmkjgkmkqg  zqklghmq l'
        }
      }
    },
    methods: {
      async dd() {
        await this.$store.dispatch('user/verifyBuyingDetiles')
        console.log('VERIFYD BUYING DETILES')
      },
      goBack() {
        this.$router.back()
      },
      changeBayingValue(operater) {
        let num = operater == '-' ? this.product.items -1 : (operater == '+' ? this.product.items +1 : this.product.items)
        if (num < 1)  num =  1;
        if (num > 70) num = 70;
        this.product.items = num;
      }
    },
    created() {
      this.$store.commit('checkView', this.$route.path)
      const productId = this.$route.params.productId;
      console.log(productId)

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
    height: 65vh;
    display: flex;
    justify-content: space-around;
  }
  .img-viewr {
    width: auto;
    height: 40%;
    margin: auto;
    border-radius: 2vw;
    background-color: var(--layer-1);
    display: flex;
    overflow: hidden;
  }
  .img-viewr[c] {
    width: 35%;
    height: 60%;
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
    background-color: var(--layer-2);
    opacity: 1;
  }
  .images-previw img[a]:active {
    background-color: rgb(112, 112, 112);
    opacity: 0.5;
  }
  .images-previw img {
    width: 100%;
    z-index: 1;
    margin: 0 auto;
  }
  .more-info {
    width: 80%;
    margin: 3vh 10%;
    padding: 2.5vh 0;
    border-radius: 22px;
    margin-top:  50%;
  }
  .key-value {
    font-size: 1.7vw;
  }
  .key-value div {
    justify-content: space-between;
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
    background-color: var(--layer-1);
    cursor: pointer;
    transition: 300ms;
  }
  .image-icon:hover {
    background-color: var(--layer-2);
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
    rotate: -45deg;
    width: 0px;
    height: 1000px;
    padding: 0;
    margin: 0;
    z-index: 0;
    background-color: aliceblue;
    box-shadow: 10px 10px 20px 7px aliceblue;
    animation: load-img 4s ease-in-out infinite 300ms;
  }
  @media screen and (max-width: 850px) {
    .mobile-preview {
      width: 100%;
      height: 42vh;
      border-bottom: 1px aliceblue solid;
    }
    .mobile-preview-images {
      height: 35vh;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 5px 0;
      justify-content: space-around;
    }
    .mobile-preview img[a] {
      width: 5vh;
      cursor: pointer;
    }
    .mobile-preview img[a]:active {
      animation: zoom-smoth 300ms;
    }
    .mobile-img-viewr {
      position: relative;
      overflow: hidden;
      width: 22vw;
      height: 22vw;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      background-color: var(--layer-1);
      margin: 8px;
    }
    .mobile-img-viewr img {
      width: 100%;
      max-height: 100%;
      z-index: 1;
    }
    .mobile-img-viewr[c] {
      width: 60%;
      max-width: 320px;
      min-width: 50%;
      height: 100%;
      animation: smoth-zoom 200ms;
      border-radius: 20px;
    }
    .mobile-preview-controles {
      width: 100%;
      height: 7vh;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .mobile-product-detils {
      position: absolute;
      width: 90%;
      top: 42vh;
      bottom: 0;
      display: flex;
      padding: 0 5%;
      flex-direction: column;
      justify-content: space-around;
    }
    .mobile-product-detils h2 {
      color: var(--color-2);
      height: 5vh;
      font-size: 1.5rem;
      margin: 0 ;
    }
    .mobile-product-detils span[k] {
      color: var(--color-2);
    }
    .mobile-product-detils span[v] {
      animation: zoom-smoth 300ms;
      width: 100%;
      color: var(--color-3);
    }
    .mobile-product-detils span {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      font-size: 1.3rem;
      align-items: center;
    }
    .mobile-product-detils span img {
      width: 4.5vh;
      height: 4.5vh;
      margin: 0 5%;
      cursor: pointer;
    }
    .mobile-product-detils span img:active {
      animation: smoth-zoom 300ms;
    }
    .mobile-product-detils span button {
      width: 30vw;
      height: 5vh;
    }
    .mobile-product-detils span p {
      font-size: 0.8rem;
      opacity: 0.6;
    }
  }
</style>