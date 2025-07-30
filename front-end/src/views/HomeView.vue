<template>
  <div class="home">
    <span>
      <button @click="E">ro7 INha </button>
      <button @click="dec">DEC</button>
      <button @click="enc">ENC</button>
    </span>
  </div>
</template>

<script>
import sideBar from '@/store/modules/sideBar'


export default {
  name: 'HomeView',
  components: {
    
  },
  computed: {
    get() {
      return this.$store.state.counter
    },
    price() {
      return this.$store.getters['item/price']
    }
  },
  methods: {
    E() {
      this.$router.push({path: 'login'})
    },
    enc() {
      this.$router.push({path: '/create/product'})
    },
    dec() {
      this.$router.push({path: 'buying/detales'})
    }
  },
  created() {
    this.$store.commit('checkView', this.$route.path)
    const action = (bollean)=>{
      console.log(bollean)
      sideBar.state.isShow = bollean;
    }
    const schema = [
      {type: 'Button', name: 'Show', img: 'path OR utl', onClick: ()=>{action(true)}},
      {type: 'Button', name: 'Hide', img: 'path OR utl', onClick: ()=>{action(false)}},
    ]
    this.$store.commit('sideBar/create', schema)
  }
}
</script>
