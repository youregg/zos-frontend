<template>
    <div class="container">
        <div id="input-container">
            <el-input v-model="input" placeholder="Please enter catalog"clearable>
                <el-select v-model="select" slot="prepend" placeholder="choose" @change="switchOption">
                    <el-option label="USERCATALOG" value="1"></el-option>
                    <el-option label="ALIAS" value="2"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
        </div>

        <div id="usercatalog-container">
            <div class="table">
                <el-collapse v-model="catalogMenu" style="width: 100%">
                    <el-collapse-item title="CATALOG" name="1">
                        <el-row style="margin-bottom: 0;width: 100%">
                            <el-col :span="2">
                                <div class="grid-content bg-white"></div>
                            </el-col>
                            <el-col :span="22" style="width: 100%" >
                                <div class="grid-content bg-white" >
                                    <el-card class="box-card" style="width: 100%">
                                        <el-table id="table10" :data="tableData10" border stripe style="width: 100%">
                                            <el-table-column align="center"  width="80" type="index" :index="indexMethod"></el-table-column>
                                            <el-table-column align="center" prop="Name" label="NAME"  width="180"></el-table-column>
                                            <el-table-column align="center"  prop="Incat" label="IN-CAT"></el-table-column>
                                            <el-table-column align="center"  prop="History" label="HISTORY">
                                                <el-table-column align="center"  prop="Release" label="RELEASE"></el-table-column>
                                            </el-table-column>
                                        </el-table>
                                    </el-card>
                                </div>
                            </el-col>
                            <el-col :span="0"><div class="grid-content bg-white"></div></el-col>
                        </el-row>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div class="table">
                <el-collapse v-model="volumesMenu" style="width: 100%">
                    <el-collapse-item title="VOLUMES" name="1">
                        <el-row style="margin-bottom: 0;width: 100%">
                            <el-col :span="2">
                                <div class="grid-content bg-white"></div>
                            </el-col>
                            <el-col :span="22" style="width: 100%" >
                                <div class="grid-content bg-white" >
                                    <el-card class="box-card" style="width: 100%">
                                        <el-table id="table11" :data="tableData11" border stripe style="width: 100%">
                                            <el-table-column align="center"  width="80" type="index" :index="indexMethod"></el-table-column>
                                            <el-table-column align="center" prop="VolumeType" label="TYPE"  width="180"></el-table-column>
                                            <el-table-column align="center"  prop="VolumeName" label="NAME"></el-table-column>

                                        </el-table>
                                    </el-card>
                                </div>
                            </el-col>
                            <el-col :span="0"><div class="grid-content bg-white"></div></el-col>
                        </el-row>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div class="table">
                <el-collapse v-model="associationMenu" style="width: 100%">
                    <el-collapse-item title="ASSOCIATION" name="1">
                        <el-row style="margin-bottom: 0;width: 100%">
                            <el-col :span="2">
                                <div class="grid-content bg-white"></div>
                            </el-col>
                            <el-col :span="22" style="width: 100%" >
                                <div class="grid-content bg-white" >
                                    <el-card class="box-card" style="width: 100%">
                                        <el-table id="table11" :data="tableData12" border stripe style="width: 100%">
                                            <el-table-column align="center"  width="80" type="index" :index="indexMethod"></el-table-column>
                                            <el-table-column align="center" prop="AssociationType" label="TYPE"  width="180"></el-table-column>
                                            <el-table-column align="center"  prop="AssociationName" label="NAME"></el-table-column>

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
        <div id="alias-container">
            <div class="table">
                <el-collapse v-model="aliasMenu" style="width: 100%">
                    <el-collapse-item title="ALIAS" name="1">
                        <el-row style="margin-bottom: 0;width: 100%">
                            <el-col :span="2">
                                <div class="grid-content bg-white"></div>
                            </el-col>
                            <el-col :span="22" style="width: 100%" >
                                <div class="grid-content bg-white" >
                                    <el-card class="box-card" style="width: 100%">
                                        <el-table id="table13" :data="tableData13" border stripe style="width: 100%">
                                            <el-table-column align="center"  width="80" type="index" :index="indexMethod"></el-table-column>
                                            <el-table-column align="center" prop="Name" label="NAME"  width="180"></el-table-column>
                                            <el-table-column align="center"  prop="Incat" label="IN-CAT"></el-table-column>
                                            <el-table-column align="center"  prop="History" label="HISTORY">
                                                <el-table-column align="center"  prop="Release" label="RELEASE"></el-table-column>
                                                <el-table-column align="center"  prop="Creation" label="CREATION"></el-table-column>
                                            </el-table-column>
                                        </el-table>
                                    </el-card>
                                </div>
                            </el-col>
                            <el-col :span="0"><div class="grid-content bg-white"></div></el-col>
                        </el-row>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div class="table">
                <el-collapse v-model="aliasAssociationMenu" style="width: 100%">
                    <el-collapse-item title="ASSOCIATION" name="1">
                        <el-row style="margin-bottom: 0;width: 100%">
                            <el-col :span="2">
                                <div class="grid-content bg-white"></div>
                            </el-col>
                            <el-col :span="22" style="width: 100%" >
                                <div class="grid-content bg-white" >
                                    <el-card class="box-card" style="width: 100%">
                                        <el-table id="table14" :data="tableData14" border stripe style="width: 100%">
                                            <el-table-column align="center"  width="80" type="index" :index="indexMethod"></el-table-column>
                                            <el-table-column align="center" prop="AssociationType" label="TYPE"  width="180"></el-table-column>
                                            <el-table-column align="center"  prop="AssociationName" label="NAME"></el-table-column>

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

    </div>
</template>

<script>
	export default {
        name:"Search",
        methods: {
	        indexMethod(index) {
		        return index + 1
	        },
            switchOption(e){
	        	if(e==1){
                    $("#alias-container").css('display','none')
                    $("#usercatalog-container").show()
                }
                else if(e==2){
                    $("#usercatalog-container").css('display','none')
                    $("#alias-container").show()
                }

            },
	        search(){
            	if(this.select==1){
            		//user catalog
                    let _this = this
                    _this.tableData10 = []
                    _this.tableData11 = []
                    _this.tableData12 = []
                    _this.$http({
                        url:'http://127.0.0.1:3000/catalog/'+ this.input,
                        method:'get'
                    }).then(function (res) {
                        let jobId = res.data.jobid
                        let jobName = res.data.jobname
                        _this.$http({
                            url:'http://127.0.0.1:3000/getJobById/'+jobName+"/"+jobId,
                            method:'get'
                        }).then(function(res){
                            _this.dealCatalog(res.data)
                            _this.dealVolumes(res.data)
                            _this.dealAssociation(res.data)

                        })
                    }).catch(function(error){
                        console.log(error)
                    })
                }else if(this.select==2){
            		//ALIAS
                    let _this = this
                    _this.tableData13 = []
                    _this.tableData14 = []
                    _this.$http({
                        url:'http://127.0.0.1:3000/alias/'+ this.input,
                        method:'get'
                    }).then(function (res) {
                        let jobId = res.data.jobid
                        let jobName = res.data.jobname
                        _this.$http({
                            url:'http://127.0.0.1:3000/getJobById/'+jobName+"/"+jobId,
                            method:'get'
                        }).then(function(res){
                            _this.dealAlias(res.data)
                            _this.dealAliasAssociation(res.data)
                        })
                    }).catch(function(error){
                        console.log(error)
                    })

                }

	        },

	        dealCatalog(res){
                let _this = this
                let lines = res.split('\n')
                let temp = {
				        "Name":_this.input,
				        "Incat":"",
				        "Release":"",
                }
                for(let i = 0; i<lines.length;i++){
                    if(lines[i].indexOf("IN-CAT")!= -1){
                        temp.Incat = lines[i].match(/IN-CAT --- (\S*)/)[1]
                    }
                    if(lines[i].indexOf("RELEASE")!=-1){
                    	temp.Release = lines[i].match(/RELEASE----------------(\S*)/)[1]
                    }
                }
                _this.tableData10.push(temp)
                temp={
	                "Name":"",
	                "Incat":"",
	                "Release":"",
                }
            },

            dealVolumes(res){
	        	let _this = this
	            let lines = res.split('\n')

                for(let i = 0;i<lines.length;i++){
	        		if(lines[i].indexOf("VOLUMES")!=-1){
	        			let tempLine = lines[i+1].replace(/(^\s*)|(\s*$)/g,"")//去首尾空格
                        let arr = tempLine.split("     ")
                        for(let j = 0 ;j < arr.length;j++){
	                        let temp={
		                        "VolumeType":"",
		                        "VolumeName":""
	                        }
	                        temp.VolumeType = arr[j].substring(0,arr[j].indexOf('-'))
                            temp.VolumeName = arr[j].substring(arr[j].lastIndexOf('-')+1,arr[j].length)
                            _this.tableData11.push(temp)
                            temp={
	                            "VolumeType":"",
	                            "VolumeName":""
                            }
                        }

                    }
                }
            },

	        dealAssociation(res){
		        let _this = this
                let lines = res.split('\n')

                for(let i = 0;i < lines.length;i++){
                    if(lines[i].indexOf("ALIAS----")!=-1){
                        let tempLine = lines[i].replace(/(^\s*)|(\s*$)/g,"")//去首尾空格
	                    let temp={
		                    "AssociationType":"",
		                    "AssociationName":""
	                    }
	                    temp.AssociationType = tempLine.substring(0,tempLine.indexOf('-'))
                        temp.AssociationName = tempLine.substring(tempLine.lastIndexOf('-')+1,tempLine.length)
                        _this.tableData12.push(temp)
                        temp={
	                        "AssociationType":"",
	                        "AssociationName":""
                        }
                    }
                }
	        },

	        dealAlias(res){
                let _this = this
                let lines = res.split('\n')
                let temp = {
                    "Name":_this.input,
                    "Incat":"",
                    "Release":"",
                    "Creation":""
                }
                for(let i = 0; i < lines.length;i++){
                    if(lines[i].indexOf("IN-CAT")!= -1){
                        temp.Incat = lines[i].match(/IN-CAT --- (\S*)/)[1]
                    }
                    if(lines[i].indexOf("RELEASE")!=-1){
                        temp.Release = lines[i].match(/RELEASE----------------(\S*)/)[1]
                    }
                    if(lines[i].indexOf("CREATION")!=-1){
                    	temp.Creation = lines[i].match(/CREATION--------(\S*)/)[1]
                    }
                }
                _this.tableData13.push(temp)
            },

	        dealAliasAssociation(res){
		        let _this = this
		        let lines = res.split('\n')
		        let temp = {
			        "AssociationType":"",
                    "AssociationName":"",
		        }
		        for(let i = 0; i < lines.length;i++){
			        if(lines[i].indexOf("ASSOCIATIONS")!= -1){
			        	let tempLine = lines[i+1].replace(/(^\s*)|(\s*$)/g,"")
                        temp.AssociationType = tempLine.substring(0,tempLine.indexOf('-'))
                        temp.AssociationName = tempLine.substring(tempLine.lastIndexOf('-')+1,tempLine.length)
			        }
		        }
		        _this.tableData14.push(temp)
	        }
        },

        data() {
    	    return {
              tableData10:[],
              tableData11:[],
              tableData12:[],
              tableData13:[],
              tableData14:[],
              catalogMenu:'1',
              volumesMenu:'1',
              associationMenu:'1',
              aliasAssociationMenu:'1',
              aliasMenu:'1',
              input:"",
              select:"",
              option:0
            }
        }

    }


</script>

<style scoped>
  .container{
      display: flex;
      flex-direction: column;
      font-size: 13px;
      width: 90%;
      margin-top: 100px;
      align-items: center;
      justify-content: center;
  }

  .table{
      display: flex;
      flex-direction: column;
      font-size: 13px;
      width:90%;
      margin-top: 50px;
  }

  .el-input{
      width: 600px;
  }
  .el-select{
      width: 180px;
  }

  #input-container{
      display: flex;
      margin-top:20px;
      font-family: "Century Gothic";
      flex-direction: column;
      align-items: center;
      justify-content: center;
  }

  #usercatalog-container{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
  }

  #alias-container{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;


  }

</style>
