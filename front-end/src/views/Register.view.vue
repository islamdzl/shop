<template>
  <div>
    <div class="desktop">
      <div class="login">
        <div class="panel">
          <div class="flex">
            <h1>Register</h1>
          </div>
          <div class="inputs"> 
              <input class="input input-text" type="email" v-model="inputs.user.value" placeholder="Email">
            <div class="flex">
              <input class="input" :type="inputs.Password_1.type" v-model="inputs.Password_1.value" placeholder="Password">
              <span class="eye">
                <img :src="inputs.Password_1.img" class="delay_0-3" key="img-input-2" @click="changeEye(1)">
              </span>
            </div>
            <div class="flex">
              <input class="input" :type="inputs.Password_2.type" v-model="inputs.Password_2.value" placeholder="Confermi Password">
              <span class="eye">
                <img :src="inputs.Password_2.img" class="delay_0-3" key="img-input-2" @click="changeEye(2)">
              </span>
            </div>
            <div class="controles">
              <button w="90" class="button" style="background: var(--color-2);">
                <h4>{{ 'Register' }}</h4>
              </button>
              <button w="90" class="button" style="background: var(--color-1);" @click="goBack">
                <h4>{{ 'Leave' }}</h4>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile">
      <div class="login">
        <div class="panel">
          <div class="flex">
            <h1>Register</h1>
          </div>
          <div class="inputs"> 
              <input class="input input-text" type="email" v-model="inputs.user.value" placeholder="Email">
            <div class="flex">
              <input class="input" :type="inputs.Password_1.type" v-model="inputs.Password_1.value" placeholder="Password">
              <span  class="mobile-eye">
                <img :src="inputs.Password_1.img" class="delay_0-3" key="img-input-1" @click="changeEye(1)">
              </span>
            </div>
            <div class="flex">
              <input class="input" :type="inputs.Password_2.type" v-model="inputs.Password_2.value" placeholder="Confermi Password">
              <span class="mobile-eye">
                <img :src="inputs.Password_2.img" class="delay_0-3" key="img-input-2" @click="changeEye(2)">
              </span>
            </div>
            <div class="mobile-controles">
              <button w="90" class="button" style="background: var(--color-2);">
                <h4>{{ 'Register' }}</h4>
              </button>
              <button w="90" class="button" style="background: var(--color-1);" @click="goBack">
                <h4>{{ 'Leave' }}</h4>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Eye_0 from '../assets/images/eye-0.png'
  import Eye_1 from '../assets/images/eye-1.png'
  export default {
    name: 'LoginViow',
    data() {
      return {
        eyes: {Eye_1, Eye_0},
        inputs: {
          user: {value: ''},
          Password_1: {value: '', type: 'password', img: Eye_0},
          Password_2: {value: '', type: 'password', img: Eye_0},
        }
      }
    },
    methods: {
      changeEye(num) {
        if (num === 1) {
          const state = this.inputs.Password_1.img === Eye_0 ? true : false;
          this.inputs.Password_1.img  = state ? Eye_1  : Eye_0;
          this.inputs.Password_1.type = state ? 'text' : 'password'
        }
        if (num === 2) {
         const state = this.inputs.Password_2.img === Eye_0 ? true : false;
          this.inputs.Password_2.img  = state ? Eye_1  : Eye_0;
          this.inputs.Password_2.type = state ? 'text' : 'password'        
        }
      },
      goBack() {
        this.$router.back()
      }
    },
    created() {
      this.$store.commit('checkView', this.$route.path)
      this.$store.commit('sideBar/setHide', true)
    }
  }
</script>
<style scoped>
  .login {
    display: grid;
    justify-content: center;
  }
  .panel {
    width: 35vw;
    height: 60vh;
    margin: 13vh;
    background-color: var(--layer-1);
    border-radius: 20px;
    box-shadow: 0px 0px 10px var(--shadow);
  }
  .panel h1{
    margin: 3vh 4vw;
    font-size: 37px;
  }
  .inputs {
    margin: 0 20%;
    width: 60%;
  }
  .input {
    width: 80%;
    height: 6vh;
    border-radius: 16px;
    margin: 1.5vh 0;
    background-color: var(--layer-2);
    border: 1px rgba(240, 248, 255, 0) solid;
    font-size: 19px;
    text-align: center;
    box-shadow: 0px 0px 10px var(--shadow);
    transition: 300ms;
  }
  .input-text {
    width: 100%;
    margin: 1.5vh 0;
  }
  .input:hover{border: 1px rgba(240, 248, 255, 0.5) solid;}
  .eye {
      width: 5.5vh;
      height: 5.5vh;
      margin: auto;
      border-radius: 30%;
      cursor: pointer;
      transition: 300ms;
      border-radius: 50%;
      background-color: var(--background-icon);
    }
  .eye img {height: 4.5vh;width: 4.5vh;margin: 0.5vh;}
  .flex {display: flex;}
  .hr {
    height: 1px;
    width: 54%;
    background-color: rgba(240, 248, 255, 0.5);
    margin: 5% 23%;
  }
  .controles {
    width: 100%;
    height: 7vh;
    margin:3vh 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  @media screen and (max-width: 850px) {
    .login {
      display: grid;
      justify-content: center;
    }
    .panel {
      width: 80vw;
      height: 50vh;
      background-color: var(--layer-1);
      border-radius: 20px;
      max-width: 400px;
    }
    .panel h1{
      margin: 2vh 4vw;
      font-size: 1.5rem;
    }
    .inputs {
      position: relative;
      margin: 0 10%;
      width: 80%;
    }
    .input {
      width: 80%;
      height: 5vh;
      border-radius: 10px;
      margin: 2vh 0;
      background-color: var(--layer-2);
      border: 1px rgba(240, 248, 255, 0) solid;
      box-shadow: 0 0 5px var(--shadow);
      font-size: 1.2rem;
      text-align: center;
      transition: 300ms;
    }
    .input-text {
      width: 100%;
    }
    .input:hover{border: 1px rgba(240, 248, 255, 0.5) solid;}
    .mobile-eye {
      width: 4.5vh;
      height: 4.5vh;
      margin: auto;
      border-radius: 30%;
      cursor: pointer;
      transition: 300ms;
      border-radius: 50%;
      background-color: var(--background-icon);
    }
    .mobile-eye img {height: 3.5vh;width: 3.5vh;margin: 0.5vh;}
    .eye:hover {
      background-color: transparent;
    }
    .flex {display: flex;}
    .hr {
      height: 1px;
      width: 54%;
      background-color: var(--row);
      margin: 5% 23%;
    }
    .mobile-controles {
      width: 100%;
      height: 7vh;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>