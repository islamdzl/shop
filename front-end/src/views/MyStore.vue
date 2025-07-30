
<template>
  <div>
    <div class="desktop"></div>
    <div class="mobile">
      <div class="mobile-mystore-info">
        <div class="mobile-selle-logo">
          <img preview src="../assets/images/user.png"/>
          <img class="mobile-edite-icon" src="../assets/images/edite.png"/>
        </div>
        <div class="mobile-selle-detailes">
          <span>{{ 'IslamDzl' }}
            <img class="mobile-edite-icon" src="../assets/images/edite.png"/>
          </span>
          <p>legbedjislam@gmail.com</p>
        </div>
      </div>
      <div class="mobile-controlles">
        <button w="90" class="button" style="background-color: var(--color-2);">
          <h4>{{ 'Stauts' }}</h4>
          <img src="../assets/images/algeria-location.png" class="mobile-icon">
        </button>
        <button w="90" class="button" style="background-color: var(--color-2);">
          <h4>{{ 'Create New' }}</h4>
          <img src="../assets/images/package.png" class="mobile-icon">
        </button>
      </div>
      <div class="mobile-products-list">
        <div v-for="(product, index) in products" :key="`${product.name}-${index}`" class="mobile-product">
          <img preview src="../assets/images/user.png"/>
          <div class="mobile-product-detailes">
            <span>ITEM Product A</span>
            <div v-if="product.delivery !== null" class="mobile-product-delivery">
              <img src="../assets/images/delivery.png" class="mobile-icon"/>
              <span val v-if="product.delivery === 0">{{ 'Free' }}</span> 
              <span val v-else>{{ product.delivery }} DA</span> 
            </div>
            <div class="mobile-promo">
              <span v-if="product.promo" class="price" old>DA{{ product.promo }}</span>
              <span class="price" new>DA {{ product.price }}</span>
            </div>
            <button class="button mobile-product-button" style="background-color: var(--color-3);" w="90">
              <h4>Edite</h4>
              <img src="../assets/images/edite.png"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'MyStore',
    data() {
      return {
        products: [
          {name: 'islam', id: 'sdqd', price: 348734, delivery: 123, promo: 400},
          {name: 'islam', id: 'sdqd', price: 348734, delivery: 123, promo: 400},
          {name: 'islam', id: 'sdqd', price: 348734, delivery: 123, promo: 400},
          {name: 'islam', id: 'sdqd', price: 348734, delivery: 123, promo: 400},
          {name: 'islam', id: 'sdqd', price: 348734, delivery: 123, promo: 400},
          {name: 'islam', id: 'sdqd', price: 348734, delivery: 123, promo: 400},
          {name: 'islam', id: 'sdqd', price: 348734, delivery: 123, promo: null},
        ]
      }
    },
    mounted() {
    },
    methods: {
      ifCartHas() {
        return false
      },
    },
    created() {
      this.$store.commit('checkView', this.$route.path)

    }  
  }
</script>
<style scoped>
  @media screen and (max-width: 850px) {
    .mobile-mystore-info {
      position: relative;
      height: 18vh;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      background-color: var(--layer-1);
    }
    .mobile-selle-logo {
      position: relative;
    }
    .mobile-selle-logo img[preview] {
      height: 15vh;
      width: 15vh;
      border: 1px var(--color-3) solid;
      border-radius: 50%;
    }
    .mobile-selle-detailes {
      width: calc(85% - 17vh);
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-around;
    }
    .mobile-selle-detailes span {
      opacity: 0.9; 
      font-size: 1.05rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    .mobile-selle-detailes p    {
      opacity: 0.6;
      font-size: 0.85rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    .mobile-products-list {
      position: absolute;
      top: calc(24vh + 2px);
      bottom: 0;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      overflow-y: scroll;
      overflow-x: hidden;
    }
    .mobile-product {
      position: relative;
      justify-self: start;
      width: 4cm;
      height: 7.5cm;
      background-color: var(--layer-1);
      border-radius: 13px;
      margin: 1vh;
      box-shadow: 0px 0px 10px var(--shadow);
    }
    .mobile-product img[preview] {
      width: 3.5cm;
      height: 3.5cm;
      margin: 5px 0.25cm;
    }
    .mobile-product-detailes {
      width: 90%;
      position: absolute;
      top: 3.8cm;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: end;
      padding: 10px 5%;
      justify-content: space-around;
    }
    .mobile-product-detailes span {font-size:   1rem;}
    .mobile-product-detailes p    {font-size: 0.8rem;}
    .mobile-product-detailes div  {width: 100%;}
    .mobile-promo {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: right;
      align-items: center;
    }
    .mobile-promo span {margin: 0 5px 0 auto}
    .mobile-promo span[old] {color: var(--color-1);text-decoration: line-through; font-size: 0.85rem;}
    .mobile-promo span[new] {color: var(--color-2);}
    .mobile-icon {
      width: 3.7vh;
      height: 3.7vh;
    }
    .mobile-product-delivery {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }
    .mobile-product-delivery span[val] {color: var(--color-2);}
    .mobile-product-button {
      width: 90%;
      height: 3.5vh;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      border-radius: 10px;
      margin: 0 5%;
    }
    .mobile-product-button img {
      width: 2.5vh;
      height: 2.5vh;
    }
    .mobile-product-button h4 {font-size: 0.8rem; display: inline; margin: auto 0;color: aliceblue;}
    .mobile-controlles {
      width: 100%;
      height: 6vh;
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: var(--layer-1);
      justify-content: space-around;
      box-shadow: 0px 0px 10px var(--shadow);
    }
  }

</style>