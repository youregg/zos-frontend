<template>
    <div class="container">
      <div class="cycleChart">
        <el-collapse v-model="cChart" style="width: 100%">
          <el-collapse-item title="MASTER CATALOG CYCLE CHART" name="1">
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
      <div class="table">
        <el-collapse v-model="MasterMenu" style="width: 100%">
        <el-collapse-item title="MASTER CATALOG" name="1">
          <el-row style="margin-bottom: 0;width: 100%">
            <el-col :span="2">
              <div class="grid-content bg-white"></div>
            </el-col>
            <el-col :span="22" style="width: 100%" >
              <div class="grid-content bg-white" >
                <el-card class="box-card" style="width: 100%">
                  <!--MASTER CATALOG表格-->
                  <el-table :data="tableData1"  border stripe style="width: 100%">
                    <el-table-column align="center"  width="80" type="index" :index="indexMethod"></el-table-column>
                    <el-table-column align="center" prop="Mtype" label="TYPE"  width="180"></el-table-column>
                    <el-table-column align="center"  prop="Mname" label="Name"></el-table-column>
                  </el-table>
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

  	    name:"MainCatalog",
        components:{
  	    	roseType
        },
        data(){
    		return{
    			cChart:'1',
                MasterMenu:'1',
                tableData1: []
            }
        },
        methods:{
          indexMethod(index) {
            return index +1;
          },
          initMainCatalog(){
            let _this = this
            _this.$http({
              url: 'http://127.0.0.1:3000/getMainCatalog',
              method: 'get'
            }).then(function (res) {
              let jobId = res.data.jobid
              let jobName = res.data.jobname
              _this.$http({
                url: 'http://127.0.0.1:3000/getJobById/' + jobName + "/" + jobId,
                method: 'get'
              }).then(function (res) {
                _this.data = res.data
                console.log( res.data)
                var MasterArray = new Array();
                MasterArray = res.data.split("\n")
                for(let i=0;i<MasterArray.length;i++){
                  var arr = new Array()
                  arr=MasterArray[i].toString().substring(1).split(" ")
                  if(arr.length ==3){
                    var temp ={
                      "Mname":'',
                      "Mtype":''
                    }
                    temp.Mname = arr[2];
                    temp.Mtype = arr[0];
                    _this.tableData1.push(temp)

                  }
                  if(arr.length ==2){
                    console.log(arr)
                  }
                }
              })
            }).catch(function (error) {
              console.log(error)
            })
          },

        },
      mounted(){
    	  this.initMainCatalog();
      }
    }

</script>

<style scoped>
    .container{
        flex-direction: column;
        font-size: 13px;
        margin-top: 50px;
        display: flex;
        align-items: center;
    }

    .cycleChart{
        display: flex;
        width: 90%;
        flex-direction: column;
        font-size: 13px;
        align-items: center;
    }

    .table{
        display: flex;
        flex-direction: column;
        font-size: 13px;
        width:90%;
        margin-top: 50px;
    }


</style>
