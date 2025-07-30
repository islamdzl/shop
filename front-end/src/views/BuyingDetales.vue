<template>
  <div>
    <div class="desktop">
      GG
    </div>
    <div class="mobile">
      <div class="mobile-detailes-title">
        <h1>Buying Detailes</h1>
      </div>
      <div class="mobile-detailes">
        <div class="mobile-detailes-list">
          <div v-for="(input, index) in inputs" :key="`${index}-${input.placeholder}`" class="mobile-input-item">
            
            <select v-if="input.list" class="mobile-select" v-model="values[input.reference]">
              <option disabled :selected="!values[input.reference]" :value="null">{{ input.placeholder || '-- No Select --' }}</option>
              <option v-for="(item, index) in input.list" :key="`${item}-${index}`" :value="index">{{ `${index} ${item}` }}</option>
            </select>
            <input 
            v-else
            class="mobile-input"
            :placeholder="input.placeholder"
            :type="input.type"
            v-model="values[input.reference]"
            >
            <div class="mobile-input-image">
              <img v-if="input.img" :src="input.img">
            </div>
          </div>
        </div>
        <h3>{{ 'التوصيل' }}</h3>
        <div class="mobile-delivery-type">
          <span @click="setDelivery('home')">
            <input type="radio" name="delivery-type" :checked="values.deliveryType == 'home'  ">
            <p>الى المنزل</p>
          </span>
          <span @click="setDelivery('office')">
            <input type="radio" name="delivery-type" :checked="values.deliveryType == 'office'">
            <p>الى المكتب</p>
          </span>
        </div>
        <h3>{{ 'تعليق' }}</h3>
        <textarea class="mobile-comment" v-model="values.comment" placeholder="تعليق"></textarea>
        <div class="mobile-controles">
          <button class="button" w="90" style="background-color: var(--color-2);">{{ 'Done' }}</button>
          <button class="button" w="90" style="background-color: var(--color-1);">{{ 'Go Back' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import IMail from '@/assets/images/mail.png';
  import IPhone from '@/assets/images/telephone.png';
  import ILocation from '@/assets/images/location.png';
  import IALocation from '@/assets/images/algeria-location.png';
  const wilayat = ['algeria', 'oran', 'setife', 'Bjaya']
  export default {
    name: 'BuyingDetails',
    data() {
      return {
        values: {
          'comment': '',
          'deliveryType': 'office',
          'wilaya': null,
          'city': null,
        },
        inputs: [
          {
            type: 'text',
            list: wilayat,
            reference: 'city',
            placeholder: 'Wilaya',
            img: IALocation
          },
          {
            type: 'text',
            list: wilayat,
            reference: 'wilaya',
            placeholder: 'City',
            img: ILocation
          },
          {
            type: 'number',
            reference: 'phone_1',
            placeholder: 'phone 1',
            img: IPhone
          },
          {
            type: 'number',
            reference: 'phone_2',
            placeholder: 'phone 2',
            img: IPhone
          },
          {
            type: 'email',
            reference: 'email',
            placeholder: 'Email',
            img: IMail
          },
        ]
      };
    },
    methods: {
      setDelivery(type) {
        this.values.deliveryType = type
      },
    },
    created() {
      setTimeout(()=>{
        this.$store.commit('checkView', this.$route.path)
        this.$store.commit('user/resolveBuyingDetiles', {name:'islam'})
      }, 1000);
    }
  }
</script>
<style scoped>
  @media screen and (max-width: 850px) {
    :deep(.mobile-delivery-type) {
      width: 90%;
      height: 45px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      margin: 10px auto;
    }
    .mobile-detailes-title {
      width: 90%;
      height: 5vh;
      font-size: 0.8rem;
      padding: 0.5vh 5%;
    }
    .mobile-detailes {
      position: absolute;
      width: 100%;
      bottom: 0;
      top: 6vh;
      overflow-y: auto;
      padding-top: 10px;
      padding-bottom: 100px;
    }
    .mobile-detailes-list {
      display: flex;
      flex-wrap: wrap;
      width: calc(100% - 46px);
      justify-content: space-between;
      gap: 13px;
      padding: 10px 23px;
      overflow-y: auto;
    }
    .mobile-input-item {
      flex: 1 1 calc(45% - 20px); /* عنصرين في السطر تقريباً */
      min-width: 270px;
      max-width: 400px;
      margin: 10px;
      height: 5vh;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      margin: 0 auto;
    }
    .mobile-input, .mobile-select {
      width: 100%;
      height: 99%;
      border-radius: 12px;
      text-align: center;
      font-size: 1.2rem;
      border: 1px transparent solid;
      background-color: var(--layer-1);
      box-shadow: 0px 0px 10px var(--shadow);
      transition: 300ms;
    }
    .mobile-input-image {
      position: relative;
      width: 5vh;
      height: 4.3vh;
      margin: 0 3%;
      background-color: var(--background-icon);
      border-radius: 50%;
    }
    .mobile-input-image img {margin: 15%;height: 70%; width: 70%;};
    .mobile-delivery-type {
      width: 90%;
      height: 45px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      margin: 10px auto;
    }
    .mobile-delivery-type span {
      height: 100%;
      width: 100px;
      border: 1px transparent solid;
      margin: 0 auto;
      background-color: var(--layer-1);
      max-width: 170px;
      padding: 0 4%;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      border-radius: 13px;
      justify-content: space-between;
      box-shadow: 0px 0px 10px var(--shadow);
      transition: 300ms;
    }
    .mobile-delivery-type span:active {
      border: 1px var(--color-2) solid;
    }
    .mobile-delivery-type span input {
      height: 20px;
      width: 20px;
      background: transparent;
      margin: auto;
    }
    .mobile-delivery-type span p {
      text-align: center;
    }
    .mobile-comment {
      min-width: calc(90% - 24px);
      max-width: calc(90% - 24px);
      min-height:10vh;
      max-height: 600px;
      margin: 17px 5%;
      font-size: 1.2rem;
      padding: 12px;
      border: none;
      border-radius: 23px;
      transition: 200ms;
      text-align: right;      
      background-color: var(--layer-1);
      box-shadow: 0px 0px 10px var(--shadow);
    }
    .mobile-controles {
      position: relative;
      width: 90%;
      height: 5vh;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 5%;
    }
  }
</style>