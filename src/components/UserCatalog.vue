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
                  <el-table-column align="center"  label="HISTORY">
                    <el-table-column align="center"  prop="Urelease" label="RELEASE" width="98"></el-table-column>
                  </el-table-column>
                  <el-table-column align="center"  label="VOLUMES">
                    <el-table-column align="center"  prop="Uvolser"  label="VOLSER" width="200"></el-table-column>
                    <el-table-column align="center"  prop="Udev" label="DEVTYPE" width="220"></el-table-column>
                    <el-table-column align="center"  prop="Udvolflag" label="VOLFLAG"></el-table-column>
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
  import userMessage from '../store'
	export default{
		name:"UserCatalog",
    components:{
      userMessage
    },
        methods:{
          indexMethod(index) {
            return index +1;
          },
          init(){
          	let _this = this
            _this.$http({
            	url:'http://127.0.0.1:3000/getJobById/LSTUSER/JOB04611',
	            method:'get'
            }).then(function(res){

	            _this.initUserChart(res.data)
            }).catch(function(error){
			    console.log(error)
		    })
          },

          checkTemp(temp){
            if(temp.Uname!=""&&temp.Urelease!=""&&temp.Uvolser!=""&&temp.Udev!=""&&temp.Udvolflag!="")
              return true
            else
              return false
          },

          clearTemp(temp){
            temp.Uname=""
            temp.Urelease=""
            temp.Uvolser=""
            temp.Udev=""
            temp.Udvolflag=""
          },

          initUserChart(data){
            let _this = this
            let lines = data.split("\n")
            let v1Count=0;
            let v2Count=0;
            let v3Count=0;
            let v4Count=0;
            let volserName = new Array
            let volserNum = new Array
            for(let i = 0; i<lines.length;i++){
              let temp = {
                "Uname":"",
                "Urelease":"",
                "Uvolser":"",
                "Udev":"",
                "Udvolflag":"",
              }
              if(lines[i].indexOf("0USERCATALOG")!= -1){
                temp.Uname = lines[i].split(" ")[2]
                temp.Urelease = lines[i+2].slice(31,32)
                var e = lines[i+4].toString()
                var volums = e.replace(/^\s+|\s+$/g,"").split("     ")
                temp.Uvolser = volums[0].substring(volums[0].lastIndexOf('-')+1,volums[0].length)
                let vol = volums[0].substring(volums[0].lastIndexOf('-')+1,volums[0].length).toString()
                console.log(vol)
                if(vol==="BYSA01"){
                  v1Count++;
                  volserName[0]="BYSA01"
                  volserNum[0]=v1Count
                }
                if(vol==="BYCT01"){
                  v2Count++;
                  volserName[1]="BYCT01"
                  volserNum[1]=v2Count
                }
                if(vol==="BIPL01"){
                  v3Count++;
                  volserName[2]="BIPL01"
                  volserNum[2]=v3Count
                }
                if(vol==="BYPM02"){
                  v4Count++;
                  volserName[3]="BYPM02"
                  volserNum[3]=v4Count
                }
                temp.Udev = volums[1].substring(volums[1].lastIndexOf('-')+1,volums[0].length)
                temp.Udvolflag = volums[2].substring(volums[2].lastIndexOf('-')+1,volums[0].length)
                //console.log(volums)
              }
              if(_this.checkTemp(temp)){
                _this.tableData8.push(temp)
                //console.log(temp)
              }
            }
            for (let i=0;i<volserNum.length;i++){
              let temp1={
                "type":'',
                "num":''
              }
              temp1.type=volserName[i]
              temp1.num=volserNum[i]
              _this.userChart.push(temp1)
            }
            console.log(_this.userChart)
            userMessage.commit('user_message',{userChart:_this.userChart,num:1});
          }
        },
    mounted(){
		  this.init()
    },
		data(){
			return{
				tableData8:[],
        userChart:[]
			}
		}
	}

</script>

<style scoped>
  .container{
      display: flex;
      flex-direction: row;
      font-size: 13px;
      margin-top: 120px;
    width:90%;
  }
</style>
