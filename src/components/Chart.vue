<template>
    <div class="container" >
      <div class="cycleChart">
        <el-collapse v-model="cChart" style="width: 100%">
          <el-collapse-item title="CYCLE CHART" name="1">
            <el-row style="margin-bottom: 0;width: 100%">
              <el-col :span="2">
                <div class="grid-content bg-white"></div>
              </el-col>
              <el-col :span="22" style="width: 100%" >
                <div class="grid-content bg-white" >
                  <el-card class="box-card" style="width: 100%">
                    <roseType></roseType>
                  </el-card>
                </div>
              </el-col>
              <el-col :span="0"><div class="grid-content bg-white"></div></el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>

</template>

<script>

import roseType from '../components/roseType'
	export default{
		name:"Chart",
    components:{
      roseType
    },

		data(){
			return{
         cChart:'1',
         myChart:[],
			}
		},

	}

</script>

<style scoped>
  .container{
    display: flex;
    flex-direction: column;
    font-size: 13px;
    margin-top: 50px;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .cycleChart{
    display: flex;
    width: 90%;
    flex-direction: column;
    font-size: 13px;
    align-items: center;
    margin-top:50px;
  }


</style>
