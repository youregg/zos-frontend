<template>
  <ve-ring :data="chartData" :settings="chartSettings"></ve-ring>
</template>

<script>
  import chartMessage from '../store';
  export default {
    components:{
      chartMessage
    },
    mounted: function () {
      this.chartData.rows =  chartMessage.state.chart;
      //console.log(this.chartData.rows)
      console.log(this.chartData.rows )
    },
      name: "roseType",
      data () {
        this.chartSettings = {
          dimension: 'type',
          metrics: 'num'
        }
        return {
          chartData: {
            columns: ['type', 'num'],
            rows: []
          }
        }
      }
    }
</script>

<style scoped>

</style>
