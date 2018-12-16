<template>
  <div class="block">
    <p class="demonstration">入住日期</p>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="入住日期">
    </el-date-picker>
    <p class="demonstration">离店日期</p>
    <el-date-picker
      v-model="value2"
      type="date"
      placeholder="离店日期">
    </el-date-picker>
  </div>
</template>

<style>
.demonstration {
  margin: 0;
}
</style>


<script>
  export default {
    data() {
      return {
        value1: '',
        value2: ''
      };
    }
  };
</script>