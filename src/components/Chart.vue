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

      <div class="userChart">
        <el-collapse v-model="uChart" style="width: 100%">
          <el-collapse-item title="USERCATALOG DISTRUBITION CHART" name="1">
            <el-row style="margin-bottom: 0;width: 100%">
              <el-col :span="2">
                <div class="grid-content bg-white"></div>
              </el-col>
              <el-col :span="22" style="width: 100%" >
                <div class="grid-content bg-white" >
                  <el-card class="box-card" style="width: 100%">
<<<<<<< HEAD
                      <ve-tree :data="chartData" :settings="chartSettings" :tooltip-formatter="tooltipFormatter"></ve-tree>
=======
                    <userChart></userChart>
>>>>>>> 3b0c6e16c12aa0478937a2fb609075d424f15c74
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
<<<<<<< HEAD
    import roseType from '../components/roseType'
    import echarts from 'echarts'

	export default{
		name:"Chart",
        components:{
          roseType,
        },


        data(){
            return{
            	chartSettings:{
                },
                tChart:'1',
                cChart:'1',
                treeChart:{
                	name:'MAINCATALOG',
	                value:'CATALOG.MCAT.PLEXY1.PRI',
                    link:'',
                    children:[]
                },
	            chartData: {
		            columns: ['name', 'value'],
		            rows:[{
			            name: 'tree',
			            value: []
		            }]
	            }
=======
import tree from '../components/tree'
import roseType from '../components/roseType'
import treeMessage from '../store'
import userChart from '../components/userChart'
	export default{
		name:"Chart",
    components:{
      roseType,tree,treeMessage,userChart
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
>>>>>>> 3b0c6e16c12aa0478937a2fb609075d424f15c74
            }
        },

        methods:{
	        tooltipFormatter (v) {
		        return [
			        `${v.seriesName}: ${v.data.value}`,
			        `<a target="_blank" href="${v.data.link}">${v.data.link}</a>`
		        ].join('<br>')
	        },

        	dealTreeData(data){
        		let _this = this
                let line = data.split('\n')
                for(let i = 0; i < line.length; i++){
        			if(line[i].indexOf("0USERCATALOG")!=-1){
                        let userNode = {
                            name:"",
                            value:"",
	                        link:"",
                            children:[]
                        }
                        userNode.name = "USERCATALOG"
                        userNode.value = line[i].match(/0USERCATALOG --- (\S*)/)[1]
                        i += 5
                        if(line[i].indexOf("NULL")!=-1){
                        	userNode.children = []
                        }else{
                        	//取ALIAS
                            i++
                        	while(line[i].indexOf("ALIAS----")!=-1){
                                let aliasNode = {
	                                name:"ALIAS",
	                                value:"",
                                    link:"",
	                                children:[]
                                }
                                aliasNode.value = line[i].match(/ALIAS----(\S*)/)[1]
                                userNode.children.push(aliasNode)
                                i++
                            }
                            _this.treeChart.children.push(userNode)

                        }
                    }
                }
            },

            initTree(){
                let _this = this
                _this.$http({
                    url:'http://127.0.0.1:3000/getJobById/LSTMASTR/JOB04896',
                    method:'get'
                }).then(function(res){
                    _this.dealTreeData(res.data)
                }).catch(function(error){
                    console.log(error)
                })
            }
<<<<<<< HEAD

        },

        mounted(){
            this.initTree()
            this.chartData.rows[0].value = [this.treeChart]

        }

=======
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
          //console.log(_this.treeChart)
          treeMessage.commit('tree_message',{treeChart:_this.treeChart,num:1});
        }).catch(function(error){
          console.log(error)
        })
      }

    },
		data(){
			return{
			   uChart:'1',
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
>>>>>>> 3b0c6e16c12aa0478937a2fb609075d424f15c74

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

<<<<<<< HEAD
  .treeChart{
      display: flex;
      width: 90%;
      flex-direction: column;
      font-size: 13px;
      align-items: center;
      margin-top:50px;
=======
  .userChart{
    display: flex;
    width: 90%;
    flex-direction: column;
    font-size: 13px;
    align-items: center;
    margin-top:50px;
>>>>>>> 3b0c6e16c12aa0478937a2fb609075d424f15c74
  }


</style>
