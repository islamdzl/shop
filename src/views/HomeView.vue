<template>
  <div class="home">
    <span>
      <button @click="E">EEEEE</button>
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
      this.$store.commit('item/E')
    },
    enc() {
      this.$store.commit('ENC')
    },
    dec() {
      this.$store.commit('DEC')
    }
  },
  created() {
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
