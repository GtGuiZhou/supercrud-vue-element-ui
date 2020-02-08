<template>
  <div id="app">
    <router-view></router-view>
    <el-dialog title="登录提醒" :visible.sync="visualLoginConfirm" >
      <div style="text-align: center">
        <i class="iconfont icon-baoqian" style="color: #409EFF;font-size: 64px"></i>
        <h2>当前位置需要登录，请先登录</h2>
        <el-button type="primary" @click="jumpLogin">跳转登录</el-button>
      </div>
    </el-dialog>
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
