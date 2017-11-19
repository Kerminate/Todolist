<template lang="html">
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6, offset: 9}">
      <span class="title">
        欢迎登陆
      </span>
      <el-row>
        <el-input v-model="account" placehoder="账号" type="text"></el-input>
        <el-input v-model="password" placehoder="密码" type="password" @keyup.enter.native="loginTodo"></el-input>
        <el-button type="primary" @click="loginTodo">登陆</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    loginTodo () {
      let obj = {
        name: this.account,
        password: this.password
      }
      this.$http.post('/auth/user', obj).then((res) => { // axios返回的数据都在res.data里
        if (res.data.success) {
          window.sessionStorage.setItem('demo-token', res.data.token) // 用sessionStorage把token存下来
          this.$message({
            type: 'success',
            message: '登录成功'
          })
          this.$router.push('/todolist') // 进入todolist页面，登录成功
        } else {
          this.$message.error(res.data.info) // 登录失败，显示提示语
          window.sessionStorage.setItem('demo-token', null) // 将token清空
        }
      }, (err) => {
        console.log(err)
        this.$message.error('请求错误！')
        window.sessionStorage.setItem('demo-token', null) // 将token清空
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-row.content
    padding: 16px
    .title
      font-size: 28px
    .el-input
      margin: 12px 0
    .el-button
      width: 100%
      margin-top: 12px
</style>
