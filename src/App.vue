<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'app',
  components: {},
  data(){
    return {
      visualLoginConfirm: false,
    }
  },
  created() {
    // 重写401错误处理方法
    this.$http.err401 = () => {
      this.visualLoginConfirm = true
    }

    // 重写错误消息处理方法
    this.$http.errMsg = msg => {
      this.$notify.error(msg)
    }
  },
  methods: {
    jumpLogin(){
      this.visualLoginConfirm = false
      this.$router.push('/login')
    }
  }
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

  .sc-area {
    border: 1px solid #e6e6e6;
    /*border-radius: 5px;*/
    margin: 10px 10px 0 10px;
    padding: 10px;
  }
</style>
