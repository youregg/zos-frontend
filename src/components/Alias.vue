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
              <el-table-column align="center"  label="HISTORY">
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
		data(){
			return{
				tableData9:[],
			}
		},
		methods:{
			indexMethod(index) {
				return index +1;
			},

			initAlias(){
				let _this = this
        /*_this.$http({
         url:'http://127.0.0.1:3000/getAlias',
         method:'get'
         }).then(function (res) {
         let jobId = res.data.jobid
         let jobName = res.data.jobname
         _this.$http({
         url:'http://127.0.0.1:3000/getJobById/'+jobName+"/"+jobId,
         method:'get'
         }).then(function(res){
         _this.initChart(res.data)
         })
         }).catch(function(error){
         console.log(error)
         })*/

				_this.$http({
					url:'http://127.0.0.1:3000/getJobById/LSTALIAS/JOB02946',
					method:'get'
				}).then(function (res) {
					_this.initChart(res.data)
				}).catch(function(error){
					console.log(error)
				})
			},

			checkTemp(temp){
				if(temp.Aname!=""&&temp.Urelease!=""&&temp.Acreation!=""&&temp.AliasAssoType!=""&&temp.AliasAssoName!="")
					return true
				else
					return false
			},

			clearTemp(temp){
				temp.Aname=""
				temp.Urelease=""
				temp.Acreation=""
				temp.AliasAssoType=""
				temp.AliasAssoName=""
			},

			initChart(data){
				let _this = this
				let lines = data.split("\n")
				for(let i = 0; i<lines.length;i++){
					let temp = {
						"Aname":"",
						"Urelease":"",
						"Acreation":"",
						"AliasAssoType":"",
						"AliasAssoName":""
					}

					if(lines[i].indexOf("0ALIAS")!= -1){
						temp.Aname = lines[i].slice(17,lines[i].length)
						temp.Urelease = lines[i+2].slice(31,32)
						temp.Acreation = lines[i+2].match(/CREATION--------(\S*)/)[1]
						temp.AliasAssoType = lines[i+4].match(/(\S*)--/)[1]
						temp.AliasAssoName = lines[i+4].match(/--(\S*)/)[1]
					}
					if(_this.checkTemp(temp)){
						_this.tableData9.push(temp)
					}

				}


			}
		},

		mounted(){
			this.initAlias()
		}
	}

</script>

<style scoped>
  .container{
    display: flex;
    flex-direction: column;
    font-size: 13px;
    margin-top: 120px;
    align-items: center;
    justify-content: center;
  }
</style>
