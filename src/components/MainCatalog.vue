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
                  <el-table id="table1" :data="tableData1" border stripe style="width: 100%">
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
            tableData1:[]

         }
        },
        methods:{
          indexMethod(index) {
            return index +1;
          },
            loginZos(){
            	this.$http({
            		url:'api/zosmf/',
                    method:'get',
                    auth: {
                        username:"ST028",
                        password: "111111"
                    },
                }).then(function (res) {
                	console.log(res)
		            })
            },
          showMastercatlog(){

            this.$http({
              url:'api/zosmf/restjobs/jobs',
              method:'put',
              auth: {
                username:"ST014",
                password: "2768"
              },
              headers: {
                         'Authorization':'Basic U1QwMTQ6Mjc2OA==',
                         'Content-Type':'application/json'
              },
              data:{
                "file":"//'ST028.CATALOG(LSTMASTR)'"
              }
            }).then(function (res) {
              console.log(res)
            })
          }
        },
      mounted(){
    	  this.loginZos();
      }
    }

</script>

<style scoped>
    .container{
      flex-direction: column;
      font-size: 13px;
      width: 100%;
      height: auto;
      margin-top: 50px;
      left: 10%;
      display: flex;
      position: relative;
      margin-bottom: 50px;
    }
  .table{
    flex-direction: column;
    font-size: 13px;
    width:80%;
    height: auto;
    margin-top: 0px;
    display: flex;
    position:relative;
    margin-bottom: 50px;
  }

  .cycleChart{
    flex-direction: column;
    font-size: 13px;
    width:80%;
    height: auto;
    margin-top: 0px;
    display: flex;
    position:center;
    margin-bottom: 50px;
  }

</style>
