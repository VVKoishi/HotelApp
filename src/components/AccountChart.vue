<template>
  <div class="account_chart">
    <!-- <p>{{ sum_payment }}</p> -->
    <div class="chart" id="mychart">
      <!-- 图表 -->
    </div>
  </div>
</template>

<style scoped>
.chart {
  margin-top: 20px;
  width: 100%;
  height: 350px;
}
</style>

<script>
import * as echarts from 'echarts';

export default {
  name: 'AccountChart',
  props: ['orders'],
  data() {
    return {
      sum_payment: 0
    };
  },
  computed: {
    userType: {
      get() {
        return this.$store.state.userType;
      }
    }
  },
  // updated () {
  //   this.drawChart()
  //   console.log("up")
  // },
  watch: {
    // 如果props.orders有变化，会再次执行该方法
    'orders': 'drawChart'
  },
  methods: {
    drawChart () {
      // 处理数据
      var xAxisData_date = [];
      var yAxisData_payment = [];
      var yAxisData_amount = [];
      this.sum_payment = 0;
      
      var pre_order_date = '';
      for (let index = this.orders.length-1; index >= 0; index--) {
        const order = this.orders[index];
        if (pre_order_date != order.create_date) {
          xAxisData_date.push(order.create_date);
          yAxisData_payment.push(order.payment);
          yAxisData_amount.push(order.amount);
          pre_order_date = order.create_date;
        }
        else {
          // xAxisData_date.push(order.create_date);
          yAxisData_payment.push(order.payment + yAxisData_payment.pop());
          yAxisData_amount.push(order.amount + yAxisData_amount.pop());
        }
        this.sum_payment += order.payment;
      }

      var PAY_OR_GAIN = (this.userType == 0 ? '支出' : '收入');
      var HOTEL_NAME = (this.userType == 1 && this.orders[0] ? this.orders[0].hotel_name : '');
      
      // 绘制图表
      var dom = document.getElementById('mychart');
      var existInstance = echarts.getInstanceByDom(dom);
      if (!existInstance) existInstance = echarts.init(dom);
      existInstance.setOption({
          title: {
            text: '账单数据 ' + HOTEL_NAME,
            subtext: '总' + PAY_OR_GAIN + ' ' + this.sum_payment + ' ¥'
          },
          tooltip: {},
          grid: {
            left: '15%',
            right: '15%',
            top: '25%'
          },
          toolbox: {
              feature: {
                  // dataView: {},
                  saveAsImage: {
                      pixelRatio: 2
                  }
              }
          },
          xAxis: {
              type: 'category',
              data: xAxisData_date
          },
          yAxis: [
            {
              type: 'value',
              name: PAY_OR_GAIN,
              min: 0,
              // max: 250,
              position: 'left',
              axisLine: {
                lineStyle: {
                  color: '#5793f3'
                }
              },
              axisLabel: {
                formatter: '{value} ¥'
              }
            },
            {
              type: 'value',
              name: '成交量',
              min: 0,
              // max: 250,
              position: 'right',
              axisLine: {
                lineStyle: {
                  color: '#d14a61'
                }
              },
              axisLabel: {
                formatter: '{value} 间'
              }
            }
          ],
          series: [
            {
              name: PAY_OR_GAIN,
              type: 'bar',
              data: yAxisData_payment,
              itemStyle: {
                color: '#5793f3'
              }
            },
            {
              name: '成交量',
              type: 'line',
              yAxisIndex: 1,
              data: yAxisData_amount,
              itemStyle: {
                color: '#d14a61'
              }
            },
          ]
      });
    }
  }
}
</script>