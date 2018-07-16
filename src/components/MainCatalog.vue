<template>
    <div class="container">
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
    import chartMessage from '../store'
    export default{

  	    name:"MainCatalog",
        components:{
  	    	roseType, chartMessage
        },
        data(){
    		return{
    			cChart:'1',
                MasterMenu:'1',
                tableData1: [],
                mainChart:[],
                tableData2:[]
            }
        },
        methods:{

          indexMethod(index) {
            return index +1;
          },


          dealMainData(data){
          	let lines = data.split("\n")
            let temp = {
	            "Mname":'',
	            "Mtype":''
            }
            for(let i = 0; i < lines.length; i++){
          		if(lines[i].indexOf("0USERCATALOG")!=-1){
          			temp.Mname = lines[i].match(/0USERCATALOG --- (\S*)/)[1]
                    temp.Mtype = "USERCATALOG"
                    _this.mainChart.push(temp)
                }else if(lines[i].indexOf("0ALIAS")!=-1){
                    temp.Mname = lines[i].match(/0ALIAS --------- (\S*)/)[1]
                    temp.Mtype = "ALIAS"
                    _this.mainChart.push(temp)
                }else if(lines[i].indexOf("0NONVSAM")!=-1){
                    temp.Mname = lines[i].match(/0NONVSAM ------- (\S*)/)[1]
                    temp.Mtype = "NONVASM"
                    _this.mainChart.push(temp)
                }
            }

          },

          initMainCatalog(){
            let _this = this
            _this.$http({
              url: 'http://127.0.0.1:3000/getJobById/LSTMASTR/JOB05807',
              method: 'get'
            }).then(function (res) {
              _this.data = res.data

              var MasterArray = new Array();
              MasterArray = res.data.split("\n");
              for(let i=0;i<MasterArray.length;i++){
                var arr = new Array()
                arr=MasterArray[i].toString().substring(1).replace(/^\s+|\s+$/g,"").split(" ")

                if(arr.length === 3){
	                console.log(arr)
                  var temp ={
                    "Mname":'',
                    "Mtype":''
                  }
                  let regp=/^[0-9]*$/;
                  if(regp.test(arr[2])){
                      temp.Mname = '';
	                  temp.Mtype = arr[0];
                  }
                  else{
                      temp.Mname = arr[2];
                      temp.Mtype = arr[0];
                  }
                  _this.tableData1.push(temp)
                }
                if(arr.length === 2){
                  if(arr[0].toString()!== "LISTCAT" && arr[0].toString()!== "TOTAL" ){
                    var temp1={
                      "type":'',
                      "num":''
                    }
                    temp1.type=arr[0]
                    temp1.num = arr[1].substring(arr[1].lastIndexOf('-')+1,arr[1].length)
                    _this.mainChart.push(temp1)
                  }
                }
              }
              chartMessage.commit('chart_message',{chart:_this.mainChart,num:1});

            }).catch(function(error){
              console.log(error)
            })
          },

        },
      mounted(){
        this.tableData1=[];
    	  this.initMainCatalog();

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

    .table{
        display: flex;
        flex-direction: column;
        font-size: 13px;
        width:90%;
        margin-top: 50px;
    }


</style>
