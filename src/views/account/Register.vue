<template>
  <div class="register">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model.number="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="账户类型" prop="type" class="radio">
        <el-radio-group v-model="ruleForm.type">
          <el-radio-button label="用户"></el-radio-button>
          <el-radio-button label="商家"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="酒店名" prop="hotel_name" v-show="ruleForm.type === '商家'">
        <el-input v-model="ruleForm.hotel_name"></el-input>
      </el-form-item>
      <el-form-item label="酒店地址" prop="hotel_location_array" v-show="ruleForm.type === '商家'">
        <el-cascader
          v-model="ruleForm.hotel_location_array"
          :options="options"
          class="register_location"
          clearable>
        </el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="hotel_location_detail" v-show="ruleForm.type === '商家'">
        <el-input v-model="ruleForm.hotel_location_detail"></el-input>
      </el-form-item>
      <el-form-item class="register_button_group">
        <el-button type="primary" @click="submitForm('ruleForm')" class="register_button">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.radio {
  text-align: left;
}
.register_location {
  width: 100%;
}
.register_button_group {
  text-align: left;
}
.register_button {
  width: 200px;
}
</style>

<script>
import axios from 'axios';
import China from './locations'
import * as Song from './lyrics';

export default {
  name: 'Register',
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账户名不能为空'));
      } else if (value.length > 20) {
        callback(new Error('账户名必须少于20个字符'));
      } else if (value.length < 2) {
        callback(new Error('账户名必须多于2个字符'));
      } else {
        callback();
      }
    };
    // var checkAge = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('年龄不能为空'));
    //   }
    //   setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error('请输入数字值'));
    //     } else {
    //       if (value < 18) {
    //         callback(new Error('必须年满18岁'));
    //       } else {
    //         callback();
    //       }
    //     }
    //   }, 1000);
    // };
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号码不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (!(/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value))) {
            callback(new Error('手机号码有误，请重填'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var checkType = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('需选择账户类型'));
      } else {
        return callback();
      }
    };
    var checkHotelName = (rule, value, callback) => {
      if (this.ruleForm.type === '用户') {
        return callback();
      } else if (this.ruleForm.type === '商家') {
        if (!value)
          return callback(new Error('酒店名不能为空'));
        else if (value.length > 10)
          return callback(new Error('酒店名必须少于10个字符'));
        else if (value.length < 3)
          return callback(new Error('酒店名必须多于3个字符'));
        else return callback();
      }
    };
    var checkHotelLocationArray = (rule, value, callback) => {
      if (this.ruleForm.type === '用户') {
        return callback();
      } else if (this.ruleForm.type === '商家') {
        if (!value) {
          return callback(new Error('需选择酒店地址'));
        } else {
          return callback();
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.pass.length < 6) {
          callback(new Error('请至少输入6个字符'));
        } else if (this.ruleForm.pass.length > 20) {
          callback(new Error('最多输入20个字符'));
        } else {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: '',
        pass: '',
        checkPass: '',
        // age: '',
        phone: '',
        type: '',
        hotel_name: '',
        hotel_location_array: '',
        hotel_location_detail: ''
      },
      rules: {
        name: [
          { validator: checkName, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        // age: [
        //   { validator: checkAge, trigger: 'blur' }
        // ]
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        type: [
          { validator: checkType, trigger: 'blur' }
        ],
        hotel_name: [
          { validator: checkHotelName, trigger: 'blur' }
        ],
        hotel_location_array: [
          { validator: checkHotelLocationArray, trigger: 'blur' }
        ]
      },
      options: China.area
    };
  },
  computed: {
    user_type: function () {
      return this.ruleForm.type === '用户' ? 0 : 1;
    },
    hotel_location: function () {
      var location_string = '';
      if (this.ruleForm.hotel_location_array.length === 0) return '';
      this.ruleForm.hotel_location_array.forEach(value => {
        location_string += value;
      });
      return location_string;
    },
    user: {
      get () {
        return {
          userID: this.$store.state.userID,
          userType: this.$store.state.userType
        };
      },
      set (obj) {
        this.$store.commit('login', obj)
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.user_type === 0) { // 用户
            // 添加
            axios.post('/api/user/addUser',{
              user_name: this.ruleForm.name,
              user_password: this.ruleForm.pass,
              user_phone: this.ruleForm.phone,
              user_description: Song.random(),
              admin_level: this.user_type,
              admin_hotel_id: null
            }).then((response) => {
              // console.log(response.data);
              // console.log(Song.random());
              // 登录
              axios.post('/api/user/login',{
                user_name: this.ruleForm.name,
                user_password: this.ruleForm.pass
              }).then((response) => {
                // console.log(response.data);
                if (response.data.length == 1) {
                  // 登陆成功！
                  this.user = {
                    userID: response.data[0].user_id,
                    userType: response.data[0].admin_level
                  };
                  // this.$router.go(-1);
                }
                else {
                  // 密码错误、或不存在账号
                  this.$message.error("密码错误 或 账户不存在");
                }
              });
            });
          } 
          else {  // 商家
            // 添加酒店
            // 添加商家user
          }         

          this.$message({
            showClose: true,
            message: '注册成功',
            type: 'success',
            center: true
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>