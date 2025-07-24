<template>
  <div>
    <div class="desktop">
        <div class="buying">
        <div class="list-product">
          <div class="title">
            <h1>Buying</h1>
          </div>
          <div class="list">

            <div v-for="(product, index) in products" :key="index" class="product-item" @click="selectProduct(index)" :sel="ifSelectedItem(index) ? '1' : '0'">
              <div class="item-product-detil">
                <img src="../assets/logo-512x512.png" class="product-img">
                <div class="item-ditels">
                  <div class="verify-state">
                    <p>before {{ '7D' }}</p>
                  </div>
                  <span class="product-name">{{ product.name }}</span>
                  <div class="key-val">
                    <span k>Price: </span>
                    <span v> {{ product.price }} DA</span>
                  </div>
                  <div class="key-val">
                    <span k>Items: </span>
                    <span v> {{ product.items }}</span>
                  </div>
                  <div class="product-controles">
                    <button class="button" style="background-color: var(--color-1);" w="76" v-if="product.state != 'Verifid'">Remove</button>
                    <button class="button" style="background-color: var(--color-2); font-size: 0.9rem;" w="90">Messaging Seller</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="hv-80"></div>
        <div class="product-detils">
          <StatuPath :state="state"/>
          <div class="controles">
            <div v-if="products[selectedItem].delevery.type == 'E'">
              <img src="../assets/images/warning-red.png" class="icon">
              <span style="color: var(--color-3);">Rejected Product</span>
            </div>
            <span>
              <h2>{{ products[selectedItem].name }}</h2>
              <p>{{ products[selectedItem].description }}</p>
            </span>
            <div>
              <button class="button" w="90">Viow Store</button>
              <button class="button" w="90">Viow Store</button>
            </div>
          </div>
          <div class="seller-info">
            <div class="seller-info-continer ">
              <div class="seller-row-info"><span>{{ 'Seller Name' }}</span></div>
              <div class="seller-row-info"><p>All Products: {{ 40 }}</p></div>
              <div class="seller-row-info"><p>{{ 'Exampleemail@gmail.com' }}</p></div>
            </div>
            <img src="../assets/logo-512x512.png" icon>
          </div>
        </div>
      </div>                                      
    </div>
    <div class="mobile">
      <div class="mobile-product-info">
        <h2 class="mobile-product-info-name delay_0-3" :key="products[selectedItem].name">{{ products[selectedItem].name }}</h2>
        <StatuPath class="StatuPath" :state="state"/>
        <div v-if="products[selectedItem].delevery.type == 'E'">
          <img src="../assets/images/warning-red.png" class="icon">
          <span style="color: var(--color-3);">Rejected Product</span>
          <button class="button" t  style="border: 1px var(--color-3) solid;">Delete</button>
        </div>
        <div v-else>
          <button class="button" w="90" style="background: var(--color-2);">Viow Seller</button>
          <button class="button" w="90" style="background: var(--color-2);">Viow Store</button>
          </div>
      </div>
      <div class="mobile-products-list">
        <div v-for="(product, index) in products" :key="`${product.name}-${index}`" class="mobile-product-item" @click="selectProduct(index)" :sel="ifSelectedItem(index) ? '1' : '0'">
          <img src="../assets/logo-512x512.png">
          <span name>{{ product.name }}</span>
          <span content>X{{ product.items }}</span>
          <button v-if="product.delevery.type != 'B' || (product.delevery.type === 'B' && product.delevery.state < 3)" class="button" t style="border: 1px red solid;">Remove</button>
          <span v-else class="fack-button">Buyied</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ICart from '../assets/images/shopping-cart.png';
  import Ipackage from '../assets/images/package.png';
  import IDelivery from '../assets/images/delivery.png';
  import ICorrect from '../assets/images/correct.png';
  import IRedo from '../assets/images/redo.png';
  import IBuying from '../assets/images/buying.png';
  import ISearch from '../assets/images/magnifying-glass.png';
  import StatuPath from '@/components/StatuPath.vue';
  import ITrue from '../assets/images/arrow-2.png'
  import UstatePath from '@/utils/statePath'
  export default {
    name: 'BuyingView',
    components: {
      StatuPath
    },
    data() {
      return {
        UstatePath,
        selectedItem: 0,
        state: {
          index: 0,
          data:  [],
        },
        products: [
          {name: 'Item 1', price: 150, id: 'Example-Id', delevery: {state: 1, type: 'A'}, items: 20, description: 'swdf mjsdfn klsdfj h sdkjfhef sdfkjqsdlkgql jlkqgsdjjfgqlj hgmq hlkr ghklqj hqlrjh gljkqhjg hlqkeh rklg elkj hglqkjges '},
          {name: 'Item 2', price: 150, id: 'Example-Id', delevery: {state: 1, type: 'B'}, items: 20, description: 'swdf mjsdfn klsdfj h sdkjfhef sdfkjqsdlkgql jlkqgsdjjfgqlj hgmq hlkr ghklqj hqlrjh gljkqhjg hlqkeh rklg elkj hglqkjges '},
          {name: 'Item 2', price: 150, id: 'Example-Id', delevery: {state: 2, type: 'B'}, items: 20, description: 'swdf mjsdfn klsdfj h sdkjfhef sdfkjqsdlkgql jlkqgsdjjfgqlj hgmq hlkr ghklqj hqlrjh gljkqhjg hlqkeh rklg elkj hglqkjges '},
          {name: 'Item 3', price: 150, id: 'Example-Id', delevery: {state: 3, type: 'B'}, items: 20, description: 'swdf mjsdfn klsdfj h sdkjfhef sdfkjqsdlkgql jlkqgsdjjfgqlj hgmq hlkr ghklqj hqlrjh gljkqhjg hlqkeh rklg elkj hglqkjges '},
          {name: 'Item 7', price: 150, id: 'Example-Id', delevery: {state: 2, type: 'B'}, items: 20, description: 'swdf mjsdfn klsdfj h sdkjfhef sdfkjqsdlkgql jlkqgsdjjfgqlj hgmq hlkr ghklqj hqlrjh gljkqhjg hlqkeh rklg elkj hglqkjges '},
          {name: 'Item 8', price: 150, id: 'Example-Id', delevery: {state: 6, type: 'E'}, items: 20, description: 'swdf mjsdfn klsdfj h sdkjfhef sdfkjqsdlkgql jlkqgsdjjfgqlj hgmq hlkr ghklqj hqlrjh gljkqhjg hlqkeh rklg elkj hglqkjges '},
          {name: 'Item 1', price: 150, id: 'Example-Id', delevery: {state: 5, path: [
            {type: 'path', name: 'Waiting'},
            {type: 'state', name: 'Acceptd', img: ITrue},
            {type: 'path', name: 'Delivery'},
            {type: 'state', name: 'Done', img: ICorrect}
          ]}, items: 20, description: 'swdf mjsdfn klsdfj h sdkjfhef sdfkjqsdlkgql jlkqgsdjjfgqlj hgmq hlkr ghklqj hqlrjh gljkqhjg hlqkeh rklg elkj hglqkjges '},
        ]
      }
    },
    methods: {
      ifSelectedItem(index) {
        return this.selectedItem === index;
      },
      selectProduct(index) {
        const product = this.products[index];
        this.selectedItem = index;
        this.state = UstatePath.parseData(product.delevery)
      },
      searchProduct(word) {
        console.log(word)
      }
    },
    created() {
      const schema = [
        {type: 'Lable', text: 'Products', size: 23},
        {type: 'Route', name: 'Cart', img: ICart, path: '/cart'},
        {type: 'Route', name: 'Buying', img: IBuying, path: '/buying'},
        {type: 'Lable', text: 'Sort', size: 23},
        {type: 'Button', name: 'ALL', img: IRedo},
        {type: 'Button', name: 'Package', img: Ipackage},
        {type: 'Button', name: 'Delivery', img: IDelivery},
        {type: 'Button', name: 'Done', img: ICorrect},
        {type: 'Lable', text: 'Search', size: 23},
        {type: 'Input', placeholder: 'Search by name', img: ISearch, keyUp: this.searchProduct},
      ];
      this.$store.commit('sideBar/create', schema);
      if (this.products.length > 0) this.selectProduct(0);
    }
  }
</script>
<style scoped>
  .buying {
    display: flex;
    flex-direction: row;
  }
  .list-product {
    width: 100%;
    height: 90vh;
  }
  .title {
    width: 80%;
    height: 7vh;
    padding: 0 10%;
    display: flex;
    justify-content: left;
  }
  .product-detils {
    position: relative;
    width: 45vw;
    height: 85vh;
    padding-top: 5vh;
  }
  .hv-80 {
    width: 1px;
    height: 70vh;
    background-color: rgba(240, 248, 255, 0.5);
    margin: auto 4px;
  }
  .product-item {
    position: relative;
    width: 78%;
    height: 25vh;
    border-radius: 2vw;
    margin: 1.5vh auto;
    background-color: var(--layer-4);
    border: 1px transparent solid;
    transition: 300ms;
  }
  .product-item[sel='1'] {
    border: 1px var(--color-3) solid;
  }
  .product-item[sel='1']:hover {
    border: 1px var(--color-3) solid;
  }
  .product-item:hover {
    border: 1px rgba(240, 248, 255, 0.7) solid;
  }
  .product-item:active {
    opacity: 0.3;
  }
  .list {
    width: 100%;
    height: 83vh;
    overflow-y: scroll;
  }
  .product-img {
    height: 21vh;
    margin: 2vh;
  }
  .item-product-detil {
    width: 94%;
    height: 25vh;
    display: flex;
    flex-direction: row;
    padding: 0 3%;
  }
  .item-ditels {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .verify-state {
    height: 20%;
    width: 100%;
    padding: 1%;
    display: flex;
    flex-direction: row;
    justify-content: right;
  }
  .verify-state img {
    height: 100%;
  }
  .verify-state p {
    height: 100%;
    font-size: 1.2rem;
    margin: 1% 3%;
    opacity: 0.5;
  }
  .product-name {
    position: absolute;
    font-size: 1.4rem;
    padding: 2vh;
  }
  .key-val {
    display: flex;
    flex-direction: row;
    span {
      font-size: 1.4rem;
      padding: 0 1%;
    }
    span[k] {
      color: rgba(240, 248, 255, 0.6);
    }
    span[v] {
      color: var(--color-2);
    }
  }
  .product-controles {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .seller-info {
    position: absolute;
    width: 88%;
    height: 18vh;
    margin: 3vh auto;
    display: flex;
    flex-direction: row;
    margin: 0 6%;
    bottom: 5vh;
  }
  .seller-info img[icon] {
    width: 16vh;
    height: 16vh;
    margin: 1vh;
    border-radius: 50%;
    border: 1px rgba(240, 248, 255, 0.4) solid;
  }
  .seller-info-continer {
    width: 100%;
    height: calc(100% - 4vh);
    padding: 2vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .seller-row-info p {
    display: flex;
    width: 100%;
    color: rgba(240, 248, 255, 0.5);
    justify-self: right;
    align-self: flex-end;
    font-size: 0.9rem;
  }
  .seller-row-info span {
    display: flex;
    width: 100%;
    color: rgba(240, 248, 255, 0.8);
    justify-self: right;
    align-self: flex-end;
    font-size: 1rem;
  }
  .controles {
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    justify-content: start;
    top: 16vh;
    bottom: 23vh;
    border: 18vh;
  }
  .controles div {
    margin: auto 10%;
    width: 80%;
    display: flex;
  }
  .controles span {
    margin: auto 10%;
    width: 80%;
    display: flex;
    flex-direction: column;
  }
  .controles div button {
    background-color: var(--color-2);
  }
  .controles span h2 {
    color: var(--color-2);
  }
  .controles span p {
    color: rgba(240, 248, 255, 0.5);
  }
  .icon {
    width: 4.5vh;
    height: 4.5vh;
    margin: 0 13px;
  }
  @media screen and (max-width: 850px) {
    .StatuPath {
      margin: 1vh 0;
    }
    .mobile-product-info {
      position: relative;
      width: 100%;
      height: 24vh;
      background-color: var(--layer-6);
    }
    .mobile-product-info div {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
    .mobile-product-info div button{
      margin: 0 5%;
    }
    .mobile-product-info-name {
      height: 5vh;
      margin: 0 5%;
      transform: translateY(1.7vh);
    }
    .mobile-products-list {
      position: absolute;
      width: 100%;
      top: 24vh;
      bottom: 0;
      background-color: var(--layer-6);
      overflow-y: scroll;
    }
    .mobile-product-item {
      width: 95%;
      height: 12vh;
      margin: 1vh auto;
      background-color: var(--layer-7);
      border-radius: 2vw;
      display: flex;
      flex-direction: row;
      align-items: center;
      border: 1px transparent solid;
      justify-content: space-around;
      transition: 300ms;
    }
    .mobile-product-item[sel='1'] {
      border: 1px var(--color-3) solid;
    }
    .mobile-product-item img {
      width: 10vh;
      height: 10vh;
      margin: 1vh;
    }
    .mobile-product-item button {
      margin: 0 4%;
      width: 20vw;
    }
    .mobile-product-item span[name] {
      text-align: left;
      width: 27vw;
      font-size: 1.2rem;
      color: var(--color-2);
    }
    .mobile-product-item span[content] {
      text-align: left;
      color: var(--color-3);
      width: 7vw;
    }
    .fack-button {
      width: 20%;
      height: 5vh;
      margin: 0 4.5%;
      border-radius: 13px;
      border: 1px var(--color-2) solid;
      align-items: center;
      justify-content: center;
      display: flex;
      flex-direction: row;
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
</style>