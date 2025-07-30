<template>
  <div>
    <div class="desktop">
      <div class="login">
        <div class="panel">
          <h1>Login</h1>
          <div class="inputs"> 
            <input class="input" type="text" placeholder="Email or Username">
            <input class="input" type="text" placeholder="Password">
            <div class="controles">
              <button class="button" style="background: var(--color-2);">{{ 'LogIn' }}</button>
              <button class="button" style="background: var(--color-1);" @click="goToRegister">{{ 'Register' }}</button>
            </div>
            <div class="hr" style="background-color: var(--row);"></div>
            <div class="c-coogle">
              <img src="../assets/images/google.png">
              <p>Continue With Google</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile">
      <div class="login">
        <div class="panel">
          <h1>Login</h1>
          <div class="inputs"> 
            <input class="input" type="text" placeholder="Email or Username">
            <input class="input" type="text" placeholder="Password">
            <div class="controles">
              <button class="button" style="background: var(--color-2);">
                <h4>{{ 'LogIn' }}</h4>
              </button>
              <button class="button" style="background: var(--color-1);" @click="goToRegister">
                <h4>{{ 'Register' }}</h4>
              </button>
            </div>
            <div class="hr" style="background-color: var(--row);"></div>
            <div class="c-coogle">
              <img src="../assets/images/google.png">
              <p>Continue With Google</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'LoginView',
    data() {
      return {

      }
    },
    methods: {
      goToRegister() {
        this.$router.push('/register')
      },
    },
    created() {
      this.$store.commit('checkView', this.$route.path)

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
    width: 100%;
    display: block;
    height: 6vh;
    border-radius: 16px;
    margin: 3.5vh 0;
    background-color: var(--layer-2);
    border: 1px rgba(240, 248, 255, 0) solid;
    font-size: 19px;
    text-align: center;
    box-shadow: 0px 0px 10px var(--shadow);
    transition: 300ms;
  }
  .input:hover{border: 1px rgba(240, 248, 255, 0.5) solid;}
  .button {
    width: 10vw;
    height: 5.5vh;
    border-radius: 14px;
    margin: 0.5vh 7%;
    border: 1px rgba(240, 248, 255, 0) solid;
    font-size: 17px;
    cursor: pointer;
  }
  .controles {
    display: flex;
  }
  .hr {
    height: 1px;
    width: 54%;
    background-color: rgba(240, 248, 255, 0.5);
    margin: 5% 23%;
  }
  .c-coogle {
    width: 100%;
    height: 6vh;
    margin: 0 auto;
    background-color: var(--layer-1);
    border-radius: 12px;
    display: flex;
    cursor: pointer;
    box-shadow: 0px 0px 10px var(--shadow);
  }
  .c-coogle img {
    width: 2.5vw;
    height: 2.5vw;
    margin: auto;
  }
  .c-coogle p {
    margin: auto;
    font-size: 15px;
  }


  @media screen and (max-width: 850px) {
    .login {
      display: grid;
      justify-content: center;
    }
    .panel {
      width: 80vw;
      max-width: 400px;
      height: 50vh;
      background-color: var(--layer-1);
      box-shadow: 0px 0px 10px var(--shadow);
      border-radius: 20px;
    }
    .panel h1{
      margin: 2vh 4vw;
      font-size: 1.5rem;
    }
    .inputs {
      margin: 0 10%;
      width: 80%;
    }
    .input {
      width: 100%;
      display: block;
      height: 5vh;
      border-radius: 10px;
      margin: 3.5vh 0;
      background-color: var(--layer-2);
      border: 1px rgba(240, 248, 255, 0) solid;
      font-size: 1.2rem;
      box-shadow: 0 0 5px var(--shadow);
      text-align: center;

      transition: 300ms;
    }
    .input:hover{border: 1px rgba(240, 248, 255, 0.5) solid;}
    .button {
      width: 100%;
      height: 5vh;
      border-radius: 11px;
      margin: 0.5vh 7%;
      border: 1px rgba(240, 248, 255, 0) solid;
      cursor: pointer;
    }
    .controles {
      display: flex;
    }
    .hr {
      height: 1px;
      width: 64%;
      background-color: var(--row);
      margin: 5% 18%;
    }
    .c-coogle {
      width: 90%;
      height: 6vh;
      margin: 0 auto;
      background-color: var(--layer-0);
      border-radius: 20px;
      display: flex;
      cursor: pointer;
    }
    .c-coogle img {
      width: 4vh;
      height: 4vh;
      margin: auto;
    }
    .c-coogle p {
      margin: auto;
      font-size: 0.8rem;
    }
  }
</style>