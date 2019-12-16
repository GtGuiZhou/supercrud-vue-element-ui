<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'app',
  components: {}
}
</script>

<style>
/*#app {*/
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*}*/

  .all-center{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .between{
    display: flex;
    justify-content: space-between;
  }

  .vertical-center{
    display: flex;
    align-items: center;
  }

  .horizontal-center{
    display: flex;
    justify-content: center;
  }
</style>
