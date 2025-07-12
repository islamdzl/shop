<template>
  <div class="about">
    <h1>About Page</h1>
  </div>
</template>
<script>
  export default {
    name: 'AboutPage',
    compute: {},
    methodsd: {

    },
    created() {
      const schema = [
        {type: 'Lable', text: 'islam', size: 23},
        {type: 'Button', name: 'ISLAM', img: 'path OR utl'},
        {type: 'Button', name: 'ISLAM 2', onClick: ()=>{console.log('ISLAM')}},
        {type: 'Hr'},
        {type: 'Route', name: 'ISLAM', path: '/home', img: '../'},
        {type: 'Input', placeholder: 'Input 2', onClick: ()=>{console.log('ISLAM')}, img: 'path OR utl'},
        {type: 'Lable', text: 'gggg', size: 23},
        {type: 'Input', placeholder: 'Input 2', onClick: ()=>{console.log('ISLAM')}},
      ]
      this.$store.commit('sideBar/create', schema)
    }
  }
</script>
<style scoped>

</style>