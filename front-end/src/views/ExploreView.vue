<template>
  <div>
    <div>
        <div class="explore">
        <div>
          <div v-for="(modle, modleIndex) in shema" :key="modle.name" class="items">
            <div v-if="modleIndex !== 0 || modleIndex == shema.length" class="hr-90"></div>
            
            <div v-if="modle.type === 'section'" class="section">
              <h2>{{ modle.name }}</h2>
              <div v-for="(row, rowIndex) in modle.products" :key="rowIndex" class="section-items">
                  <div v-for="(product, index) in row" class="section-item" :key="index">
                    <img previow src="../assets/logo-512x512.png" alt="Product Image">
                    <div class="selection-item-detils">
                      <h3>{{ product.name }}</h3>
                      <div v-if="product.delivery !== null" class="product-delivery">
                        <img src="../assets/images/delivery.png" class="icon">
                        <span v v-if="product.delivery === 0">{{ 'Free' }}</span> 
                        <span v v-else>{{ product.delivery }} DA</span> 
                      </div>
                      <div class="promo">
                        <span v-if="product.promo" class="price" old>{{ product.promo }}</span>
                        <span class="price" new>DA {{ product.price }}</span>
                      </div>
                      <button v-if="! $store.getters['user/isLogin']" class="button" style="background-color: var(--color-2);" w="90">
                        <h4>Buyig Now</h4>
                        <img src="../assets/images/buy.png">
                      </button>
                      <div v-else>
                        <button v-if="ifCartHas(product.id)" class="button" style="background-color: var(--color-3);" w="90">
                          <h4>add To Cart</h4>
                          <img src="../assets/images/shopping-cart.png" alt="">
                        </button>
                        <button v-else t class="button" style="border: 1px var(--color-3) solid;" w="90">
                          <h4>add To Cart</h4>
                          <img src="../assets/images/true-1.png" alt="">
                        </button>
                      </div>
                    </div>
                  </div>
              </div>
            </div>

            <div v-if="modle.type === 'accounts'" class="section">
              <h2>{{ modle.name }}</h2>
              <div class="accounts-items">
                <div v-for="(account, index) in modle.accounts" :key="`${account.id}-${index}`" class="accounts-item">
                  <img src="../assets/logo-512x512.png" alt="">
                  <div class="accounts-item-detilse">
                    <h3>{{ account.name }}</h3>
                    <div>
                      <span>{{ '50' }}</span>
                      <span>Product</span>
                    </div>
                    <p>{{ account.email }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="show-more">
            <button class="button" style="background-color: var(--color-2);" w="76" t>{{ 'Show More' }}</button>
          </div>
        </div>
      </div>
    </div>
    <div>

    </div>
  </div>
</template>
<script>
  class Section {
    constructor(name, type) {
      this.name = name;
      this.type = type;
    }
  }
  export default {
    name: 'ExploreView',
    watch: {
      '$route.query.search': {
        immediate: true,
        handler(newVal) {
          this.searchWord = (newVal || null);
          this.loadProducts()
        }
      }
    },
    data() {
      return {
        class: {Section},
        searchWord: null,
        ifMoreResult: true,
        shema: [
          {
            type: 'accounts',
            name: 'Users',
            accounts: [
              {id: '1', name: 'Islamdzl', email: 'legbedjislam@gmail.com', description: 'New Order', promo: '560'},
              {id: '2', name: 'Islamdzl', email: 'legbedjislam@gmail.com', description: 'New Order', promo: '560'},
              {id: '3', name: 'Islamdzl', email: 'legbedjislam@gmail.com', description: 'New Order', promo: '560'},
              {id: '4', name: 'Islamdzl', email: 'legbedjislam@gmail.com', description: 'New Order', promo: '560'},
            ]
          },
          {
            type: 'section',
            name: 'GIGI',
            products: [
              [
                {delivery: null, name: 'Islam', price: '400', description: 'New Order', promo: '560', id: 'lkqnds-kjqnsd-slkd-'},
                {delivery: 0,name: 'Islam', price: '400', description: 'New Order', promo: '560', id: 'lkqnds-kjqnsd-slkd-'},
                {delivery: 200,name: 'Islam', price: '400', description: 'New Order', promo: '560', id: 'lkqnds-kjqnsd-slkd-'},
                {name: 'Islam', price: '400', description: 'New Order', promo: '560', id: 'lkqnds-kjqnsd-sDFlkd-'},
                {name: 'Islam', price: '400', description: 'New Order', promo: '560', id: 'lkqnds-kjqnsd-sSQlkd-'},
                {name: 'Islam', price: '400', description: 'New Order', id: 'lkqnds-kjqnsd-Sslkd-'},
                {name: 'Islam', price: '400', description: 'New Order', promo: '560', id: 'lkqnds-kjqnsd-slkWd-'},
                {name: 'Islam', price: '400', description: 'New Order', promo: '560', id: 'lkqnds-kjqnsd-slkDd-'},
                {name: 'Islam', price: '400', description: 'New Order', promo: '560'},
              ],
              [
                {name: 'Islam', price: '400', description: 'New Order', promo: '560'},
                {name: 'Islam', price: '400', description: 'New Order', promo: '560'},
                {name: 'Islam', price: '400', description: 'New Order', promo: '560'},
                {name: 'Islam', price: '400', description: 'New Order', promo: '560'},
                {name: 'Islam', price: '400', description: 'New Order', promo: '560'},
                {name: 'Islam', price: '400', description: 'New Order', promo: '560'},
                {name: 'Islam', price: '400', description: 'New Order', promo: '560'},
                {name: 'Islam', price: '400', description: 'New Order', promo: '560'},
                {name: 'Islam', price: '400', description: 'New Order', promo: '560'},
              ]
            ],
          },
          {
            type: 'accounts',
            name: 'Other Users',
            accounts: [
              {id: '5', name: 'Islamdzl', email: 'legbedjislam@gmail.com', description: 'New Order', promo: '560'},
              {id: '6', name: 'Islamdzl', email: 'legbedjislam@gmail.com', description: 'New Order', promo: '560'},
              {id: '7', name: 'Islamdzl', email: 'legbedjislam@gmail.com', description: 'New Order', promo: '560'},
              {id: '8', name: 'Islamdzl', email: 'legbedjislam@gmail.com', description: 'New Order', promo: '560'},
            ]
          },
          {
            type: 'section',
            name: 'Others',
            products: [
              [
                {name: 'Islam', price: '400', description: 'New Order', promo: '560'},
                {name: 'Islam', price: '400', description: 'New Order', promo: '560', id: 'lkqnds-kjqnsd-slkd-'},
                {name: 'Islam', price: '400', description: 'New Order', promo: '560'},
                {name: 'Islam', price: '400', description: 'New Order', promo: '560', id: 'lkqnds-kjqnsd-slkd-'},
                {name: 'Islam', price: '400', description: 'New Order', promo: '560'},
                {name: 'Islam', price: '400', description: 'New Order', promo: '560', id: 'lkqnds-kjqnsd-slkd-'},
                {name: 'Islam', price: '400', description: 'New Order', promo: '560'},
                {name: 'Islam', price: '400', description: 'New Order', promo: '560'},
                {name: 'Islam', price: '400', description: 'New Order', promo: '560', id: 'lkqnds-kjqnsd-slkd-'},
                {name: 'Islam', price: '400', description: 'New Order', promo: '560'},
                {name: 'Islam', price: '400', description: 'New Order', promo: '560', id: 'lkqnds-kjqnsd-slkd-'},
              ]
            ],
          }
        ]
      }
    },
    methods: {
      ifCartHas(productId) {
        return ! productId
      },
      async loadProducts() {
        this.ss = this.searchWord;
        const result = await this.$store.dispatch('explore/search');
        console.log(result)
      }
    },
    created() {
      this.$store.commit('checkView', this.$route.path)
      this.$store.commit('sideBar/setHide', true);
    }
  }
</script>
<style scoped>
  .explore {
    position: absolute;
    top: 0;
    bottom: 0;
    overflow-y: scroll;
  }
  .section {
    position: relative;
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
  }
  .section h2 {
    margin: 0 3%;
    margin-top: 10px;
    font-weight: bold;
    margin-bottom: 0;
  }
  .section-items {
    width: 98%;
    display: flex;
    flex-direction: row;
    padding: 10px 1%;
    overflow-x: scroll;
  }
  .section-item {
    position: relative;
    width: 27vh;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-self: right;
    padding: 0 10px;
    margin: 5px 10px;
    border: 1px transparent solid;
    background-color: var(--layer-1);
    transition: 300ms;
    box-shadow: 0px 0px 10px var(--shadow);
  }
  .section-item:hover {
    border: 1px var(--color-2) solid;
  }
  .section-item img[previow] {
    cursor: pointer;
    width: 27vh;
  }
  .selection-item-detils {
    width: 95%;
    height: 95%;
    padding-bottom: 5%;
    padding-right: 5%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items:  end;
  }
  .selection-item-detils h3 {
    font-size: 1.2rem;
  }
  .selection-item-detils p  {
    font-size: 1rem;
  }
  .selection-item-detils span  {
    font-size: 1.1rem;
  }
  .promo span[old] {
    padding: 0 10px;
    color: var(--color-3);
    text-decoration-line: line-through;
  }
  .promo span[new] {
    color: var(--color-2);
  }
  .hr-90 {
    width: 90%;
    margin: 5px 5%;
    height: 1px;
    background-color: rgba(240, 248, 255, 0.5);
  }
  button {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  button img {
    height: 80%;
    padding: 10% 0%;
    display: inline;
  }
  .accounts {
    position: relative;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .accounts h2 {
    margin: 0 3%;
    margin-top: 1%;
    font-weight: bold;
  }
  .accounts-items {
    width: 98%;
    display: flex;
    padding: 10px 1%;
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .accounts-item {
    position: relative;
    width: 30vw;
    height: calc(100% - 10px);
    background-color: var(--layer-1);
    display: flex;
    flex-direction: row;
    padding: 5px 0;
    border-radius: 20px;
    margin: 0 7px;
    border: 1px transparent solid;
    transition: 300ms;
    box-shadow: 0px 0px 10px var(--shadow);
  }
  .accounts-item:hover {
    border: 1px var(--color-2) solid;
  }
  .accounts-item img {
    width: 15vh;
    height: 15vh;
    border-radius: 50%;
    margin: auto 5px;
    border: 1px rgba(240, 248, 255, 0.5) solid;
    cursor: pointer;
  }
  .accounts-item-detilse {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: end;
    width: calc(100% - 20px);
    margin: 0 10px;
  }
  .accounts-item-detilse p, .accounts-item-detilse span {
    opacity: 0.6;
  }
  .product-delivery {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .product-delivery {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 4vh;
  }
  .product-delivery span {
    font-size: 1.2rem;
  }
  .product-delivery img {
    height: 4.5vh;
  }
  .product-delivery span[v] {
    color: var(--color-2);
  }
  @media screen and (max-width: 850px) {
    .explore {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      overflow-y: scroll;
    }
    .section {
      position: relative;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
    .section h2 {
      margin: 0 5%;
      margin-top: 0px;
      font-weight: bold;
      margin-bottom: 0;
    }
    .section-items {
      width: 98%;
      display: flex;
      flex-direction: row;
      padding: 4px 1%;
      overflow-x: scroll;
    }
    .section-item {
      position: relative;
      border-radius: 15px;
      height: 250px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      justify-self: right;
      padding: 0 10px;
      margin: 5px 10px;
      border: 1px transparent solid;
      background-color: var(--layer-1);
      box-shadow: 0px 0px 10px var(--shadow);
      transition: 300ms;
    }
    .section-item:hover {
      border: 1px var(--color-2) solid;
    }
    .section-item img[previow] {
      cursor: pointer;
      width: 17vh;
    }
    .selection-item-detils {
      width: 95%;
      padding-bottom: 5%;
      padding-right: 5%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items:  end;
    }
    .selection-item-detils h3 {
      font-size: 0.9rem;
      margin: auto 0;
    }
    .promo span {
      font-size: 0.88rem;
    }
    .promo span[old] {
      padding: 0 10px;
      color: var(--color-3);
      text-decoration-line: line-through;
    }
    .promo span[new] {
      color: var(--color-2);
    }
    .hr-90 {
      width: 90%;
      margin: 5px 5%;
      height: 1px;
      background-color: rgba(240, 248, 255, 0.5);
    }
    button {
      height: 30px;
      border-radius: 12px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      padding: 0 2%;
      width: 95%;
      font-size: 0.85rem;
    }
    button img {
      height: 60%;
      padding: 10% 2%;
      display: inline;
    }
    .accounts {
      position: relative;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
    .accounts h2 {
      margin: 0 5%;
      margin-top: 1%;
      font-weight: bold;
    }
    .accounts-items {
      width: 98%;
      display: flex;
      padding: 10px 1%;
      overflow-x: scroll;
      overflow-y: hidden;
    }
    .accounts-item {
      position: relative;
      width: auto;
      height: calc(100% - 10px);
      display: flex;
      flex-direction: row;
      padding: 5px 0;
      border-radius: 20px;
      margin: 0 7px;
      border: 1px transparent solid;
      background-color: var(--layer-1);
      box-shadow: 0px 0px 10px var(--shadow);
      transition: 300ms;
    }
    .accounts-item:hover {
      border: 1px var(--color-2) solid;
    }
    .accounts-item img {
      width: 10vh;
      height: 10vh;
      border-radius: 50%;
      margin: auto 5px;
      border: 1px rgba(240, 248, 255, 0.5) solid;
      cursor: pointer;
    }
    .accounts-item-detilse {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: end;
      width: calc(100% - 20px);
      margin: 0 10px;
    }
    .accounts-item-detilse p, .accounts-item-detilse span {
      opacity: 0.6;
      font-size: 0.8rem;
    }
    .accounts-item-detilse div span {
      font-size: O.7rem;
    }
    .accounts-item-detilse p {
      font-size: O.5rem;
    }
    .product-delivery {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      height: 2vh;
    }
    .product-delivery span {
      font-size: 0.8rem;
    }
    .product-delivery img {
      height: 3vh;
    }
    .product-delivery span[v] {
      color: var(--color-2);
    }
  }
</style>