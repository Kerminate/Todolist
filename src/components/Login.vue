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
      this.$router.push('/todolist')
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
