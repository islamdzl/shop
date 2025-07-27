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
            <div class="hr"></div>
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
              <button class="button" style="background: var(--color-2);">{{ 'LogIn' }}</button>
              <button class="button" style="background: var(--color-1);" @click="goToRegister">{{ 'Register' }}</button>
            </div>
            <div class="hr"></div>
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
    margin: 1vh 4vw;
    font-size: 40px;
  }
  .inputs {
    margin: 0 20%;
    width: 60%;
  }
  .input {
    width: 100%;
    display: block;
    height: 7vh;
    border-radius: 16px;
    margin: 3.5vh 0;
    background-color: var(--background);
    border: 1px rgba(240, 248, 255, 0) solid;
    font-size: 19px;
    text-align: center;

    transition: 300ms;
  }
  .input:hover{border: 1px rgba(240, 248, 255, 0.5) solid;}
  .button {
    width: 10vw;
    height: 6.5vh;
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
    width: 80%;
    height: 8vh;
    margin: 0 auto;
    background-color: var(--layer-3);
    border-radius: 20px;
    display: flex;
    cursor: pointer;
  }
  .c-coogle img {
    width: 2.5vw;
    height: 2.5vw;
    margin: auto;
  }
  .c-coogle p {
    margin: auto;
    font-size: 18px;
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
      margin: 0 10%;
      width: 80%;
    }
    .input {
      width: 100%;
      display: block;
      height: 5vh;
      border-radius: 10px;
      margin: 3.5vh 0;
      background-color: var(--background);
      border: 1px rgba(240, 248, 255, 0) solid;
      font-size: 1.2rem;
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
      font-size: 17px;
      cursor: pointer;
    }
    .controles {
      display: flex;
    }
    .hr {
      height: 1px;
      width: 64%;
      background-color: rgba(240, 248, 255, 0.5);
      margin: 5% 18%;
    }
    .c-coogle {
      width: 90%;
      height: 6vh;
      margin: 0 auto;
      background-color: var(--layer-3);
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