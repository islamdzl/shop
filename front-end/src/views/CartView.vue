<template>
  <div>
    <div class="desktop">
      <div class="cart">
        <div class="items">
          <div id="mobile-info">
            <div class="row-info">
              <span>Total Price</span>
              <span g class="value-animate" key="totalPrice">{{ totalPrice }},00 DA</span>
            </div>
            <div class="row-info">
              <button class="button" w="90" style="background-color: var(--color-2);">Buyng Now</button>
            </div>
          </div>
          <div class="title">
            <h1>Cart Items</h1>
          </div>
          <div class="items-list">
            <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
              <div class="item-img">
                <img src="../assets/logo-512x512.png" alt="Product Image" @click="goToProduct(item.id)"/>
              </div>
              <div class="item-info">
                <span style="font-weight: bold;">{{ item.name }}</span>
                <div>
                  <span>Price: </span>
                  <span v-if="true" g>{{ item.price }} DA</span>
                  <span v-else>
                    <span p>{{ '100' }} DA</span>
                    <span g>{{ '300' }} DA</span>
                  </span>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium sequi earum, quibusdam dolores itaque tempore, laboriosam totam velit delectus, quos 
                </p>
              </div>
              <div class="hv-60"></div>
              <div class="item-info">
                <span class="item-controles">
                  <span>Total</span>
                  <span g>{{ item.price * item.count}} DA</span>
                </span>
                <span class="item-controles">
                  <span>Count</span>
                  <span>{{ item.count }}</span>
                  <img src="../assets/images/plus.png" @click="pluseItem(index)">
                  <img src="../assets/images/minus.png" @click="minusItem(index)">
                </span>
                <span class="item-controles">
                  <button style="background-color: var(--color-2);">Pay</button>
                  <button style="background-color: var(--color-1);">Remove</button>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="hv-80"></div>
        <div class="cart-info">
          <div class="global-info">
            <div class="row-info">
              <span>Total Price</span>
              <span g class="value-animate" key="totalPrice">{{ totalPrice }},00 DA</span>
            </div>
            <div class="row-info">
              <span>Total Items</span>
              <span g>{{ cartItems.length }}</span>
            </div>
            <div class="hr-60"></div>
            <button class="button" w="76" style="background-color: var(--color-2);">Buyng</button>
            <button class="button" w="76" style="background-color: var(--color-1);">Clear cart</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile">
      <div class="mobile-info">
        <div class="mobile-info-items">
          <div class="mobile-info">
            <p k>Price</p><p v>{{ totalPrice }} DA</p>
          </div>
          <div class="mobile-info">
            <p k>Items</p><p v>{{ cartItems.length }}</p>
          </div>
        </div>
        <div class="mobile-info-items">
        <button class="button" w="90" t style="border: 1px var(--color-2) solid;">Bye All</button>
        </div>
      </div>
      <div class="mobile-items">

        <div v-for="(product, index) in cartItems" :key="`${product.id}-${index}`" class="mobile-product">
          <img src="../assets/logo-512x512.png" alt="">
          <h3>{{ product.name }}</h3>
          <h4>{{ product.count }}</h4>
          <div class="mobile-item-buttons">
            <button class="mobile-item-button" r>Remove</button>
            <button class="mobile-item-button" g>Pay Now</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import IBuying from '../assets/images/buying.png';
  import ICart from '../assets/images/shopping-cart.png';
  export default {
    name: 'CartView',
    data() {
      return {
        totalPrice: 0,
        cartItems: [
          {name: 'Item 1', count: 1, price: 150, id: 'Example-Id'},
          {name: 'Item 1', count: 1, price: 150, id: 'Example-Id'},
          {name: 'Item 1', count: 3, price: 150, id: 'Example-Id'},
          {name: 'Item 1', count: 1, price: 150, id: 'Example-Id'},
          {name: 'Item 1', count: 1, price: 150, id: 'Example-Id'},
          {name: 'Item 1', count: 1, price: 150, id: 'Example-Id'},
          {name: 'Item 1', count: 1, price: 150, id: 'Example-Id'},
          {name: 'Item 1', count: 1, price: 150, id: 'Example-Id'},
          {name: 'Item 1', count: 3, price: 150, id: 'Example-Id'},
          {name: 'Item 1', count: 1, price: 150, id: 'Example-Id'},
          {name: 'Item 1', count: 1, price: 150, id: 'Example-Id'},
          {name: 'Item 1', count: 1, price: 150, id: 'Example-Id'},
          {name: 'Item 1', count: 1, price: 150, id: 'Example-Id'},
          {name: 'Item 1', count: 1, price: 150, id: 'Example-Id'},
        ]
      }
    },
    methods: {
      pluseItem(index) {
        this.cartItems[index].count++;
        this.calcTotalPrice();
      },
      minusItem(index) {
        if (this.cartItems[index].count > 1) {
          this.cartItems[index].count--;
          this.calcTotalPrice();
        }
      },
      calcTotalPrice() {
        this.totalPrice = this.cartItems.reduce((total, item) => total + (item.price * item.count), 0);
      },
      goToProduct(productId) {
        this.$store.commit('product/setDefaultItem', productId);
        this.$router.push(`/product/${productId}`)
      },
    },
    created() {
      this.calcTotalPrice();
      const schema = [
        {type: 'Lable', text: 'Products', size: 23},
        {type: 'Route', name: 'Cart', img: ICart, path: '/cart'},
        {type: 'Route', name: 'Buying', img: IBuying, path: '/buying'},
      ];
      this.$store.commit('sideBar/create', schema);
    }
  }
</script>
<style scoped>
  #mobile-info {
    display: none;
  }
  .cart {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
  }
  .cart-info {
    width: 25vw;
    height: 100%;
  }
  .items {
    width: 100%;
    height: 100%;
  }
  .title {
    width: 90%;
    height: 7vh;
    display: flex;
    padding: 0 5%;
    justify-content: left;
    align-items: center;
  }
  .items-list {
    width: 88%;
    height: 83vh;
    padding: 0 6%;
    overflow-y: scroll;
  }
  .cart-item {
    position: relative;
    width: 100%;
    height: 30vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--layer-4);
    margin: 1vh 0;
    border-radius: 30px;
    border: 1px transparent solid;
    transition: 300ms;
  }
  .cart-item:hover {
    border: 1px rgba(240, 248, 255, 0.7) solid;
  }
  .cart-item:active {
    opacity: 0.6;
  }
  .item-img {
    position: relative;
    height: 100%;
    cursor: pointer;
  }
  .item-img img {
    height: 100%;
  }
  .item-info {
    width: 30%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: auto 0;
  }
  .item-info span {
    margin: 1vh 0;
    margin-right: 0.5vw;
    font-size: 1.4rem;
  }
  .item-info span[p] {
    text-decoration: line-through;
    opacity: 0.6;
    color: var(--color-1);
    font-size: 1.2rem;
  }
  .item-info span[g] {
    color: var(--color-2);
  }
  .item-controles {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .item-info p {
    text-align: center;
    font-size: 0.95rem;
    color: rgba(240, 248, 255, 0.8);
    max-height: 40%;
    overflow: hidden;
  }
  .item-controles button {
    width: 40%;
    height: 6vh;
    border-radius: 15px;
    background-color: var(--color-1);
    font-size: 1.1rem;
    cursor: pointer;
    border: none;
  }
  .item-controles button:active {
    animation: smoth-zoom 300ms;
  }
  .item-controles img {
    width: 2vw;
    height: 2vw;
    border-radius: 50%;
    cursor: pointer;
    padding: 0.5vw;
    background-color: var(--layer-2);
    transition: 100ms;
  }
  .item-controles img:active {
    background-color: var(--layer-3);
    animation: smoth-zoom 300ms;
  }

  .row-info {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    text-align: left;
  }
  .row-info span {
    font-size: 1.3rem;
    color: rgba(240, 248, 255,0.8);
    margin: 1vh 0;
  }
  .row-info span[g] {
    color: var(--color-2);
  }
  .global-info {
    margin-top: 10vh;
  }
  .hv-80 {
    width: 1px;
    height: 80%;
    margin: auto 0;
    background-color: rgba(240, 248, 255, 0.3);
  }
  .hv-60 {
    width: 1px;
    height: 60%;
    margin: auto 0;
    background-color: rgba(240, 248, 255, 0.3);
  }
  .hr-80 {
    width: 80%;
    height: 1px;
    margin: 1.5vh auto;
    background-color: rgba(240, 248, 255, 0.3);
  }
  .hr-60 {
    width: 60%;
    height: 1px;
    margin: 1.5vh auto;
    background-color: rgba(240, 248, 255, 0.3);
  }
  .value-animate {
    animation: smoth-zoom 300ms;
  }
  @media screen and (max-width: 850px) {

    .mobile-info {
      width: 100%;
      height: 8vh;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      background-color: var(--layer-6);
    }
    .mobile-info p {
      font-size: 1.3rem;
      width: 100%;
      margin: auto 0;
    }
    .mobile-info p[k] {color: var(--color-3);}
    .mobile-info p[v] {color: var(--color-2);}
    .mobile-info-items {
      display: flex;
      flex-direction: column;
      width: 60%;
    }
    .mobile-info-items:has(button) {
      width: 25%;
    }
    .mobile-info-items img {
      width: 7vh;
      margin: auto;
    }
    .mobile-items {
      position: absolute;
      top: 8vh;
      bottom: 0;
      display: flex;
      flex-wrap: wrap;
      width: calc(100% - 20px);
      overflow-y: scroll;
      padding: 0 10px;
      gap: 10px;
      row-gap: 10px;
      background-color: var(--layer-6);
    }
    .mobile-product {
      position: relative;
      height: 220px;
      width: 170px;
      border-radius: 13px;
      background-color: var(--layer-7);
      display: flex;
      flex-direction: column;
      align-items: top;
      margin-bottom: 5px;
      margin: 5px auto;
    }
    .mobile-product img {
      width: 17vh;
      height: 17vh;
      margin: 10px 10% 10px 10%;
    }
    .mobile-product h3 {
      color: var(--color-2);
      font-size: 1.1rem;
      padding: 0 10px;
    }
    .mobile-product h4 {
      position: absolute;
      top: 15vh;
      left: 1vh;
      padding: 2px 4px;
      font-size: 1.1rem;
      border-radius: 6px;
      background-color: rgba(0, 0, 0, 0.3);
    }
    .mobile-item-buttons {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      height: 50%;
      padding: 0;
    }
    .mobile-item-button {
      width: 42%;
      height: 70%;
      border-radius: 12px;
      background-color: var(--layer-6);
      cursor: pointer;
      font-size: 1rem;
      margin: 5px;
    }
    .mobile-item-button[r] {border: 1px var(--color-1) solid;}
    .mobile-item-button[g] {border: 1px var(--color-2) solid;}
    .mobile-item-button:active {animation: smoth-zoom 200ms;}
  }
</style>