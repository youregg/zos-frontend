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
      <div class = "treeChart">
        <el-collapse v-model="tChart" style="width: 100%">
          <el-collapse-item title="TREE CHART" name="1">
            <el-row style="margin-bottom: 0;width: 100%">
              <el-col :span="2">
                <div class="grid-content bg-white"></div>
              </el-col>
              <el-col :span="22" style="width: 100%" >
                <div class="grid-content bg-white" >
                  <el-card class="box-card" style="width: 100%">
                   <tree></tree>
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
import tree from '../components/tree'
import roseType from '../components/roseType'
import treeMessage from '../store'
	export default{
		name:"Chart",
    components:{
      roseType,tree,treeMessage
    },
    methods:{
		  initTree(){
        let _this = this
        _this.$http({
          url:'http://127.0.0.1:3000/getJobById/LSTMASTR/JOB04896',
          method:'get'
        }).then(function(res){
          let lines = res.data.split("\n")
          for(let i = 0; i<lines.length;i++){
            let temp = {
              "name":"",
              "value":"",
              "children":[]
            }
            if(lines[i].indexOf("0USERCATALOG")!= -1){
              temp.name="USERCATALOG"
              temp.value = lines[i].split(" ")[2]
              if(lines[i+5].indexOf("NULL")!= -1){
                temp.children = [];
              }
              else{
                let j=6
                _this.aliasChart=[]
                while(lines[i+j].indexOf("ALIAS----")!= -1){
                  let ass = lines[i+j].replace(/(^\s*)|(\s*$)/g,"").toString()
                  j++;
                  if(ass.indexOf("ALIAS----")== -1) {
                    break
                  }
                  let temp1 ={
                    "name":"",
                    "value":""
                  }
                  let aliasName = ass.substring(ass.lastIndexOf('-')+1,ass.length)
                  //console.log(aliasName)
                  temp1.name=ass.substring(0,5)
                  temp1.value=aliasName
                  _this.aliasChart.push(temp1)
                }
                //console.log(_this.aliasChart)
              }
              temp.children=_this.aliasChart
              _this.userChart.push(temp)
            }
          }

          let temp2={
            "name":"",
            "value":"",
            "children":[]
          }
          temp2.name='Master Catalog'
          temp2.value='CATALOG.MCAT.PLEXY1.PRI'
          temp2.children=_this.userChart
          _this.treeChart.push(temp2)
          console.log(_this.treeChart)
          treeMessage.commit('tree_message',{treeChart:_this.treeChart,num:1});
        }).catch(function(error){
          console.log(error)
        })
      }

    },
		data(){
			return{
        tChart:'1',
         cChart:'1',
         myChart:[],
         treeChart:[],
         aliasChart:[],
        userChart:[]
			}
		},
    mounted(){
		  this.initTree()
    }

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
