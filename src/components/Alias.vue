<template>
    <div class="container">
      <el-row style="margin-bottom: 0;width: 100%">
        <el-col :span="2">
          <div class="grid-content bg-white"></div>
        </el-col>
        <el-col :span="22" style="width: 100%" >
          <div class="grid-content bg-white" >
            <el-card class="box-card" style="width: 100%">
              <!--Alias表格-->
              <el-table id="table9" :data="tableData9" border stripe style="width: 100%">
                <el-table-column align="center"  width="80" type="index" :index="indexMethod"></el-table-column>
                <el-table-column align="center"  prop="Aname" label="AliasName" width="150"></el-table-column>
                <el-table-column align="center"  label="HOSTORY">
                  <el-table-column align="center"  prop="Urelease" label="RELEASE" width="98"></el-table-column>
                  <el-table-column align="center" prop="Acreation" label="CREATION" width="163"></el-table-column>
                </el-table-column>
                <el-table-column align="center" label="ASSOCIATIONS">
                  <el-table-column align="center" prop="AliasAssoType" label="Type" width="200"></el-table-column>
                  <el-table-column align="center" prop="AliasAssoName" label="ASSOCIATION NAME" width="348"></el-table-column>
                </el-table-column>
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
		name:"Alias",
    methods:{
      indexMethod(index) {
        return index +1;
      }
    },
		data(){
			return{
        tableData9:[]
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
