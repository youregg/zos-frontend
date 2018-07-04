<template>
  <ve-ring :data="chartData" :settings="chartSettings"></ve-ring>
</template>

<script>

  export default {
        name: "roseType",
      data () {
        this.chartSettings = {
          dimension: 'type',
          metrics: '数量'
        }
        return {
          chartData: {
            columns: ['type', '数量'],
            rows: [
              { 'type': 'ALIAS', '数量': 118 },
              { 'type': 'PAGESPACE', '数量': 7 },
              { 'type': 'CLUSTER', '数量': 39 },
              { 'type': 'DATA', '数量': 46 },
              { 'type': 'INDEX', '数量': 19 },
              { 'type': 'NONVSAM', '数量': 622 },
              { 'type': 'USERCATALOG', '数量': 14 }
            ]
          }
        }
      }
    }
</script>

<style scoped>

</style>
