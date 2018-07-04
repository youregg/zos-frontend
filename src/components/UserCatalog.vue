<template>
    <div class="container">
        <el-row style="margin-bottom: 0;width: 100%">
          <el-col :span="2">
            <div class="grid-content bg-white"></div>
          </el-col>
          <el-col :span="22" style="width: 100%" >
            <div class="grid-content bg-white" >
              <el-card class="box-card" style="width: 100%">
                <!--USERCATALOG表格-->
                <el-table id="table7" :data="tableData8" border stripe style="width: 100%">
                  <el-table-column align="center"  width="80" type="index" :index="indexMethod"></el-table-column>
                  <el-table-column align="center"  prop="Uname" label="USERCATALOG Name" width="250"></el-table-column>
                  <el-table-column align="center"  label="HOSTORY">
                    <el-table-column align="center"  prop="Urelease" label="RELEASE" width="98"></el-table-column>
                  </el-table-column>
                  <el-table-column align="center"  label="VOLUMES">
                    <el-table-column align="center"  prop="Uvolser"  label="VOLSER" width="100"></el-table-column>
                    <el-table-column align="center"  prop="Udev" label="DEVTYPE" width="120"></el-table-column>
                    <el-table-column align="center"  prop="Udvolflag" label="VOLFLAG" width="100"></el-table-column>
                  </el-table-column>
                  <el-table-column align="center"  prop="Uname" label="ASSOCIATIONS" width="290"></el-table-column>
                </el-table>
              </el-card>
            </div>
          </el-col>
          <el-col :span="0"><div class="grid-content bg-white"></div></el-col>
        </el-row>
    </div>
</template>

<script>
	export default{
		name:"UserCatalog",
        methods:{
          indexMethod(index) {
            return index +1;
          },

          showCatalog(){
              let _this = this
              _this.$http({
                  url:'http://127.0.0.1:3000/getUserCatalog',
                  method:'get'
              }).then(function (res) {
                  let jobId = res.data.jobid
                  let jobName = res.data.jobname
                  console.log(jobName)
                  _this.$http({
                      url:'http://127.0.0.1:3000/getJobById/'+jobName+"/"+jobId,
                      method:'get'
                  }).then(function(res){
                      console.log(res.data)
                  })
              }).catch(function(error){
                  console.log(error)
              })
          }
        },
		data(){
			return{

           tableData8:[]
			}
		}
	}

</script>

<style scoped>
  .container{
    flex-direction: row;
    font-size: 13px;
    width: 80%;
    height: auto;
    margin-top: 50px;
    left: 10%;
    display: flex;
    position: relative;
    margin-bottom: 50px;
  }
</style>
