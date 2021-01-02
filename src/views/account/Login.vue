<template>
  <div class="login">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.register .el-button {
  min-width: 300px;
}
</style>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账户名不能为空'));
      }
      setTimeout(() => {
        if (value.length > 20) {
          callback(new Error('必须少于20个字符'));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: '',
        pass: '',
      },
      rules: {
        name: [
          { validator: checkName, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 前端检查通过，向后端发送登录请求
          // alert('submit!');
          axios.post('/api/user/login',{
            user_name: this.ruleForm.name,
            user_password: this.ruleForm.pass
          }).then((response) => {
            // console.log(response.data);
            if (response.data.length == 1) {
              // 登陆成功！
              this.user = {
                userID: response.data[0].user_id,
                userType: response.data[0].admin_level,
                userHotelID: response.data[0].admin_hotel_id ? response.data[0].admin_hotel_id : null
              };
              // this.$router.go(-1);
            }
            else {
              // 密码错误、或不存在账号
              this.$message.error("密码错误 或 账户不存在");
            }
          });
        } 
        else {
          // 前端检查失败
          // console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    user: {
      get () {
        return {
          userID: this.$store.state.userID,
          userType: this.$store.state.userType,
          userHotelID: this.$store.state.userHotelID
        };
      },
      set (obj) {
        this.$store.commit('login', obj)
      }
    }
  }
}
</script>