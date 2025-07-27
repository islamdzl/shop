<template>
  <div>
    <div class="desktop"></div>
    <div class="mobile">
      <div class="mobile-prodect-detales">
      <h3>انشاء منتج جديد</h3>
        <div class="mobile-inputs">
          <div>
            <input class="mobile-input" type="text" placeholder="Product name">
            <img src="../assets/images/name-tag.png">
          </div>
          <div>
            <input class="mobile-input" type="number" placeholder="Price DA">
            <img src="../assets/images/dollar.png">
          </div>
          <div>
            <textarea class="mobile-textarwa" placeholder="Small Description"></textarea>
          </div>
          <div>
            <textarea class="mobile-textarwa" placeholder="Big Description" style="max-height: 25vh;"></textarea>
          </div>
        </div>
        <div class="mobile-add-image">
          <span>
            <h4>{{ 'اضافة صورة' }}</h4>
            <img src="../assets/images/add-photo.png" @click="addImage()">
          </span>
          <span class="mobile-delivery-product">
            <h4>{{ 'التوصيل' }}</h4>
            <div @click="changeDelivery(null)">
              <input type="radio" name="delivery" :checked="product.delivery === null">
              <P>None</P>
            </div>
            <div @click="changeDelivery(0)">
              <input type="radio" name="delivery" :checked="product.delivery !== null">
              <div>
                <P>Price DA</P>
                <input type="number" v-model="product.delivery" id="">
              </div>
            </div>
          </span>
        </div>
        <div class="mobile-images-previow">
          <div v-for="(image, index) in productImages" :key="`image-${index}`" class="mobile-previow-img">
            <span>
              <img src="../assets/images/trash.png" @click="removeImage(index)">
            </span>
            <img :src="image" style="height: 100%;">
          </div>
        </div>
        <div class="mobile-controles">
          <button class="button" w="90" t style="background-color: var(--color-2);">Create</button>
          <button class="button" w="90" t style="background-color: var(--color-1);">Go Back</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'CreateProduct',
    data() {
      return {
        productImages: [],
        product: {
          delivery: null,
        }
      };
    },
    methods: {
      changeDelivery(val) {
        this.product.delivery = val;
      },
      addImage() {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.click()
        input.addEventListener('change', (event)=>{
        const file = event.target.files[0];
          if (file) {
            this.productImages.unshift(URL.createObjectURL(file))
          }
        })
      },
      removeImage(index) {
        this.productImages = this.productImages.filter((item, Index)=> index !== Index)
      }
    },
    created() {
      this.$store.commit('controlles/checkView', this.$route.path)
    },
  };
</script>
<style scoped>
  @media screen and  (max-width: 850px) {
    .mobile-prodect-detales {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow-y: scroll;
    }
    .mobile-inputs  {
      display: flex;
      flex-wrap: wrap;
      width: calc(100% - 46px);
      justify-content: space-between;
      gap: 13px;
      padding: 10px 23px;
    }
    .mobile-inputs div {
      flex: 1 1 calc(45% - 20px); /* عنصرين في السطر تقريباً */
      min-width: 270px;
      max-width: 380px;
      margin: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      margin: 0 auto;
    }
    .mobile-inputs div img {
      height: 3.9vh;
      margin: auto 0;
    }
    .mobile-input {
      height: 100%;
      width: 75%;
      height: 5vh;
      border: none;
      outline: none;
      border-radius: 17px;
      text-align: center;
      font-size: 1.2rem;
      background-color: var(--layer-7);
    }
    .mobile-textarwa {
      max-width: 76%;
      min-width: 75%;
      height: 4vh;
      font-size: 1.2em;
      padding: 10px;
      word-wrap: break-word;
      border-radius: 17px;
      border: none;
      transition: 300ms;
      background-color: var(--layer-7);
    }
    .mobile-textarwa:focus {
      height: 13vh;
    }
    .mobile-add-image span img {
      height: 50%;
      margin: 3.7vh 0;
    }
    .mobile-add-image span {
      height: 25vh;
      transition: 300ms;
    }
    .mobile-add-image span h4 {
      width: 100%;
      text-align: right;
    }
    .mobile-add-image span p {
      width: 100%;
      text-align: center;
      padding: 5px 0;
      color: var(--color-2);
    }
    .mobile-add-image {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
    .mobile-images-previow {
      height: 0vh;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      overflow-x: scroll;
      overflow-y: hidden;
      transition: 300ms;
    }
    .mobile-images-previow:has(div) {
      height: 30vh;
    }
    .mobile-delivery-product {
      width: 50%;
      height: 27vh;
    }
    .mobile-delivery-product div {
      width: calc(100% - 20px);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      padding: 0 5px 0 10px;
      border-radius: 11px;
      background-color: var(--layer-7);
      border: 1px transparent solid;
      margin: 10px 0;
      transition: 300ms;
    }
    .mobile-delivery-product div div {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .mobile-delivery-product div div input {
      width: 90%;
      height: 3vh;
      border-radius: 8px;
      border: none;
      text-align: center;
      font-size: 1.2rem;
      color: var(--color-3);
      background-color: var(--layer-6);
    }
    .mobile-previow-img {
      position: relative;
      height: 30vh;
      margin: 0 10px;
      transition: 300ms;
    }
    .mobile-previow-img span {
      position: absolute;
      height: 4vh;
      width: 4vh;
      top: 5px;
      right: 5px;
      border-radius: 3px;
      background-color: rgba(0,0,0,0.3);
    }
    .mobile-previow-img span img {
      height: 80%;
      margin: 5% 10%;
    }
    .mobile-controles {
      width: 100%;
      height: 7vh;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }
  }
</style>
