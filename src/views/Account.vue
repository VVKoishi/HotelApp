<template>
  <div class="account">
    <div v-show="this.$store.state.userID==0"
      class="account_register_or_login_select_panel">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-row>
          <el-col :span="2"><div class="grid-content"></div></el-col>
          <el-col :span="9">
            <router-link to="/register">
              <el-menu-item index="1">注 册</el-menu-item>
            </router-link>
          </el-col>
          <el-col :span="2"><div class="grid-content"></div></el-col>
          <el-col :span="9">
            <router-link to="/login">
              <el-menu-item index="2">登 录</el-menu-item>
            </router-link>
          </el-col>
          <el-col :span="2"><div class="grid-content"></div></el-col>
        </el-row>
      </el-menu>
      <router-view class="account_register_or_login" ref="getSon_account"/>
    </div>
    <div v-show="this.$store.state.userID!=0"
      class="account_info">
      <AccountInfo/>
    </div>
  </div>
</template>

<style scoped>
.el-menu-item {
  font-size: 16px;
}
.account_register_or_login {
  margin-top: 30px;
  margin-right: 30px;
  margin-left: -30px;
}
.el-menu-item .is_active:focus, .el-menu-item .is_active:hover {
  color: #409EFF;
  background-color: #ecf5ff;
}
</style>

<script>
// @ is an alias to /src
import AccountInfo from '@/views/account/AccountInfo.vue';
import axios from 'axios';

export default {
  name: 'Account',
  data() {
    return {
      activeIndex: '2'
    };
  },
  computed: {
    userID: {
      get() {
        return this.$store.state.userID;
      }
    }
  },
  watch: {
    '$route' (to, from) {
      if(to.name === 'register'){
        this.activeIndex = '1';
      }
      else if(to.name === 'login'){
        this.activeIndex = '2';
      }
      else {
        this.activeIndex = '2';
      }
    }
  },
  // 在mounted时，checkID导致url改变，进而导致子router-view渲染
  // 进而导致updated状态发生
  mounted() {
    // 每次挂载时调用(从无到有)
    // console.log("mo");
    this.checkUserID();
  },
  // 子router-view挂载，父组件触发updated
  // 子router-view取消挂载，父组件也触发updated (此处代码产生作用的原因)
  updated() {
    // 每次更新时调用(从有到有)
    // console.log("up");
    this.checkUserID();
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
      this.activeIndex = key;
    },
    checkUserID() {
      if (this.userID == 0 && this.$route.name != 'login' && this.$route.name != 'register')
        this.$router.replace('/login');
    }
  },
  components: {
    AccountInfo
  }
}
</script>