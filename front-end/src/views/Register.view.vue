<template>
  <div>
    <div class="desktop">
      <div class="login">
        <div class="panel">
          <div class="flex">
            <h1>Register</h1>
            <div class="go-back">
              <img src="../assets/images/back.png" @click="goBack">
            </div>
          </div>
          <div class="inputs"> 
              <input class="input input-text" type="email" v-model="inputs.user.value" placeholder="Email">
            <div class="flex">
              <input class="input" :type="inputs.Password_1.type" v-model="inputs.Password_1.value" placeholder="Password">
              <img :src="inputs.Password_1.img" class="eye delay_0-3" @click="changeEye(1)">
            </div>
            <div class="flex">
              <input class="input" :type="inputs.Password_2.type" v-model="inputs.Password_2.value" placeholder="Confermi Password">
              <img :src="inputs.Password_2.img" class="eye delay_0-3" @click="changeEye(2)">
            </div>
            <button class="button" style="background: var(--color-2);">{{ 'Register' }}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile">
      <div class="login">
        <div class="panel">
          <div class="flex">
            <h1>Register</h1>
            <div class="go-back">
              <img src="../assets/images/back.png" @click="goBack">
            </div>
          </div>
          <div class="inputs"> 
              <input class="input input-text" type="email" v-model="inputs.user.value" placeholder="Email">
            <div class="flex">
              <input class="input" :type="inputs.Password_1.type" v-model="inputs.Password_1.value" placeholder="Password">
              <img :src="inputs.Password_1.img" class="eye delay_0-3" @click="changeEye(1)">
            </div>
            <div class="flex">
              <input class="input" :type="inputs.Password_2.type" v-model="inputs.Password_2.value" placeholder="Confermi Password">
              <img :src="inputs.Password_2.img" class="eye delay_0-3" @click="changeEye(2)">
            </div>
            <button class="button" style="background: var(--color-2);">{{ 'Register' }}</button>
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
    width: 40vw;
    height: 80vh;
    margin: 5vh;
    background-color: var(--layer-1);
    border-radius: 20px;
  }
  .panel h1{
    margin: 5vh 4vw;
    font-size: 40px;
  }
  .inputs {
    margin: 0 20%;
    width: 60%;
  }
  .input {
    width: 80%;
    height: 7vh;
    border-radius: 16px;
    margin: 3.5vh 0;
    background-color: var(--background);
    border: 1px rgba(240, 248, 255, 0) solid;
    font-size: 19px;
    text-align: center;
    transition: 300ms;
  }
  .input-text {
    width: 100%;
  }
  .input:hover{border: 1px rgba(240, 248, 255, 0.5) solid;}
  .button {
    width: 60%;
    height: 6.5vh;
    border-radius: 14px;
    margin: 0.5vh 20%;
    border: none;
    font-size: 17px;
    cursor: pointer;
  }
  .eye {
    width: 2vw;
    height: 2vw;
    margin: 4vh auto;
    border-radius: 30%;
    cursor: pointer;
    transition: 300ms;
  }
  .eye:hover {
    background-color: var(--layer-3);
  }
  .flex {display: flex;}
  .hr {
    height: 1px;
    width: 54%;
    background-color: rgba(240, 248, 255, 0.5);
    margin: 5% 23%;
  }
  .go-back {
    width: 100%;
  }
  .go-back img {
    width: 3vw;
    margin: 2vh 2vw 0 80%;
    cursor: pointer;
  }

  @media screen and (max-width: 850px) {
    .login {
      display: grid;
      justify-content: center;
      background-color: var(--layer-6);
    }
    .panel {
      width: 80vw;
      height: 50vh;
      background-color: var(--layer-7);
      border-radius: 20px;
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
      margin: 2.4vh 0;
      background-color: var(--background);
      border: 1px rgba(240, 248, 255, 0) solid;
      font-size: 1.2rem;
      text-align: center;
      transition: 300ms;
    }
    .input-text {
      width: 100%;
    }
    .input:hover{border: 1px rgba(240, 248, 255, 0.5) solid;}
    .button {
      width: 50%;
      height: 5vh;
      border-radius: 11px;
      margin: 0.5vh 20%;
      border: none;
      font-size: 17px;
      cursor: pointer;
    }
    .eye {
      width: 4vh;
      height: 4vh;
      margin: auto;
      border-radius: 30%;
      cursor: pointer;
      transition: 300ms;
    }
    .eye:hover {
      background-color: transparent;
    }
    .flex {display: flex;}
    .hr {
      height: 1px;
      width: 54%;
      background-color: rgba(240, 248, 255, 0.5);
      margin: 5% 23%;
    }
    .go-back {
      width: 100%;
    }
    .go-back img {
      width: 4vh;
      margin: 2vh 2vw 0 70%;
      cursor: pointer;
    }
  }
</style>