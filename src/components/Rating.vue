<template>
  <el-rate
    v-model="value5"
    disabled
    show-score
    text-color="#ff9900"
    score-template="{value}"
    style="line-height: normal;">
  </el-rate>  
</template>


<script>
  export default {
    name: 'Rating',
    props: ["value5"]
    // data() {
    //   return {
    //     value5: 3.7
    //   }
    // }
  }
</script>