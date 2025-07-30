<template>
  <div class="settings">
    <div class="controles">
      <h1>Settings</h1>
      <div style="position: absolute; right: 0; display: flex;width: 30%;">
        <button class="button" style="background-color: var(--color-1);" w="90">Go Back</button>
        <button class="button" style="background-color: var(--color-2);" w="90">Save</button>
      </div>
    </div>
    <div class="view">

      <div v-if="section === 'account'" class="account">
        <div style="width: 100%;">
          <button class="button" style="border: 1px var(--color-2) solid;" w="76" t>Share Account</button>
          <button class="button" style="border: 1px var(--color-1) solid;" w="76" t>Delete Account</button>
        </div>
        <div class="account-detils">
          <h2>{{ 'Islamdzl' }}</h2>
          <span>{{ 'legbedjislam@gmail.com' }}</span>
        </div>
        <img src="../assets/logo-512x512.png">
      </div>

      <div class="continer">
        <div>
          <div v-for="(item, index) in list_1" :key="index" class="key-val delay_0-4">
            <input class="key" type="text" :value="upperCase(item.key)" readonly>
            <span class="key">→</span>
            <input class="val" type="text" v-model="values[item.key]" :placeholder="item.placeholder">
          </div>
          <div v-for="(item, index) in list_2" :key="index" class="key-val delay_0-4">
            <input class="key" type="text" :value="upperCase(item.key)" readonly>
            <span class="key">→</span>
            <input class="checkbox" type="checkbox" v-model="values[item.key]">
          </div>
        </div>
        <div v-if="section !== 'account'">
          <img v-if="section === 'delivery'" class="img-preview" src="../assets/images/delivery.png">
        </div>
        <div v-else></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'SettingsView',
    data() {
      return {
        section: null,
        settings: {
          "account": {
            private_acount: false,
            name: 'gigi',
          },
          "delivery": {
            city: '',
            wlaia: '',
            phone1: '',
            phone2: '',
            to_house: false,
          },
        },
        values: {},
        list_1: [],
        list_2: [],
      }
    },
    methods: {
      upperCase(word) {
        return word.charAt(0).toUpperCase() + word.slice(1)
      },
      crateSchema(data) {
        this.values = {};
        this.list_1 = [];
        this.list_2 = [];
        for (const [key, val] of Object.entries(data)) {
          this.values[key] = val;
          if (typeof val == 'boolean') {
            this.list_2.push({key, val})
            continue;
          }
          this.list_1.push({key, val, placeholder: this.upperCase(key)})
        }
      },
      selectSetting(type) {
        this.section = type;
        this.crateSchema(this.settings[type] || {});
      },
    },
    created() {
      this.$store.commit('checkView', this.$route.path)
      const sideBar = [
        {type: 'Lable', text: 'Settings', size: 23},
        {type: 'Button', onClick: ()=> this.selectSetting('account'), name: 'Account',},
        {type: 'Button', onClick: ()=> this.selectSetting('delivery'), name: 'Delivery',},
      ];
      this.selectSetting(this.$route.query.section || 'account')
      this.$store.commit('sideBar/create', sideBar)
      this.$store.commit('sideBar/setState', true)
    }
  }
</script>
<style scoped>
  .settings {
    width: 100%;
    height: 100%;
  } 
  .controles {
    position: relative;
    width: 100%;
    height: 5vh;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 16px auto;
  }
  .controles h1{
    position: absolute;
    left: 5%;
  }
  .view {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 20px auto;
    height: calc(85% - 30px);
    border-radius: 20px;
    padding: 15px 0;
    overflow-y: scroll;
  }
  .account {
    height: 20vh;
    width: auto;
    display: flex;
    flex-direction: row;
    margin: 25px 0;
  }
  .account img {
    width: 18vh;
    height: 18vh;
    margin: 1vh;
    border-radius: 50%;
    border: 1px rgba(240, 248, 255, 0.5) solid;
  }
  .account-detils {
    width: 16vw;
    height: 18vh;
    margin: 1vh 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .account-detils span {
    opacity: 0.6;
  }
  .continer {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .key-val {
    width: 100%;
    height: 4.5vh;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 10px 0;
  }
  .val {
    outline: none;
    border: 1px rgba(240, 248, 255, 0.6) solid;
    border-radius: 10px;
    width: 48%;
    font-size: 1rem;
    text-align: center;
    background-color: transparent;
    transition: 300ms;
  }
  .val:focus {border: 1px var(--color-2) solid;}
  .val:hover {border: 1px var(--color-2) solid;}
  .key {
    outline: none;
    border: 1px rgba(240, 248, 255, 0) solid;
    border-radius: 10px;
    cursor: not-allowed;
    width: 24%;
    font-size: 1.2rem;
    text-align: center;
    background-color: transparent;
  }
  .checkbox {
    width: 48%;
  }
  .img-preview {
    width: 40%;
    margin: 5% 50%;
  }
</style>