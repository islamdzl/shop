
<template>
  <div>
    <div class="desktop"></div>
    <div class="mobile">
      <div class="mobile-seller-info">
        <div class="mobile-selle-logo">
          <img src="../assets/images/user.png">
        </div>
        <div class="mobile-selle-detailes">
          <span>legbedjislam@gmail.com</span>
          <p>legbedjislam@gmail.com</p>
        </div>
      </div>
      <div class="mobile-products-list">
        <div v-for="(product, index) in products" :key="`${product.name}-${index}`" class="mobile-product">
          <img previw src="../assets/images/user.png">
          <div class="mobile-product-detailes">
            <span>ITEM Product A</span>
            <div v-if="product.delivery !== null" class="mobile-product-delivery">
              <img src="../assets/images/delivery.png" class="mobile-icon">
              <span v v-if="product.delivery === 0">{{ 'Free' }}</span> 
              <span v v-else>{{ product.delivery }} DA</span> 
            </div>
            <div class="mobile-promo">
              <span v-if="product.promo" class="price" old>DA{{ product.promo }}</span>
              <span class="price" new>DA {{ product.price }}</span>
            </div>
            <button v-if="! $store.getters['user/isLogin']" class="button mobile-product-button" style="background-color: var(--color-2);" w="90">
              <h4>Buyig Now</h4>
              <img src="../assets/images/buy.png">
            </button>
            <div v-else>
              <button v-if="ifCartHas(product.id)" class="button mobile-product-button" style="background-color: var(--color-3);" w="90">
                <h4>add To Cart</h4>
                <img src="../assets/images/shopping-cart.png">
              </button>
              <button v-else t                     class="button mobile-product-button" style="border: 1px var(--color-3) solid;" w="90">
                <h4>In Cart</h4>
                <img src="../assets/images/true-1.png">
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'SellerView',
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
    }
  }
</script>
<style scoped>
  @media screen and (max-width: 850px) {
    .mobile-seller-info {
      position: relative;
      height: 20vh;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      border-bottom: 1px var(--color-2) solid;
    }
    .mobile-selle-logo {
      position: relative;
    }
    .mobile-selle-logo img {height: 15vh; width: 15vh;}
    .mobile-selle-detailes {
      width: calc(85% - 17vh);
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-around;
    }
    .mobile-selle-detailes span {opacity: 0.9; font-size: 1.05rem;}
    .mobile-selle-detailes p    {opacity: 0.6; font-size: 0.85rem;}
    .mobile-products-list {
      position: absolute;
      top: calc(20vh + 1px);
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
      background-color: var(--layer-7);
      border-radius: 13px;
      margin: 1vh;
    }
    .mobile-product img[previw] {
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
    .mobile-product-delivery span[v] {color: var(--color-2);}
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
    .mobile-product-button h4 {font-size: 0.8rem; display: inline; margin: auto 0;}

  }

</style>