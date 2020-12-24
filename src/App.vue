<template>
  <div id="app">
    <div id="nav">
      <i v-show="this.$route.path!='/'" 
        @click="goBack()"
        class="el-icon-back" 
        style="position:absolute; transform: translateX(-75px); font-size: 20px;"></i>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/map">Map</router-link>
      <router-link to="/order">
        <i 
        class="el-icon-goods"
        style="position:absolute; transform: translateX(40px); font-size: 20px;"></i>
      </router-link>
      <router-link to="/register">
        <i 
        class="el-icon-user"
        style="position:absolute; transform: translateX(80px); font-size: 20px;"></i>
      </router-link>
      
    </div>
    <router-view ref="getSon"/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<script>

export default {
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
</script>

