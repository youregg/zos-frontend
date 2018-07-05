<template>
  <ve-tree :data="chartData" :settings="chartSettings"></ve-tree>
</template>

<script>
  import treeMessage from '../store'

  export default {
    //var treeData =
    mounted: function () {
      this.chartData.rows.value =  treeMessage.state.treeChart[0];
      console.log(this.chartData.rows.value)
    },
    name:"tree",
    components:{
      treeMessage
    },
    data () {
      this.chartSettings = {
        seriesMap: {
          tree1: {
            orient: 'vertical'
          }
        }
      }
      return {
        chartData: {
          columns: ['name', 'value'],
          rows:
            {
              name: 'tree1',
              value:[]
            }
        }
      }
    }
  }
</script>
