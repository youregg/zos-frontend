<template>
  <ve-ring :data="chartData" :settings="chartSettings"></ve-ring>
</template>

<script>
  import userMessage from '../store';
    export default {
      name: "userChart",
      components:{
        userMessage
      },
      mounted(){
        this.chartData.rows =  userMessage.state.userChart;
        //console.log(userMessage.state.userChart)
      },
      data () {
        this.chartSettings = {
          radius: [30, 100],
          offsetY: 180
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
