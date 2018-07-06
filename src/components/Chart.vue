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
        <div class="treeChart">
            <el-collapse v-model="tChart" style="width: 100%">
                <el-collapse-item title="TREE CHART" name="1">
                    <el-row style="margin-bottom: 0;width: 100%">
                        <el-col :span="2">
                            <div class="grid-content bg-white"></div>
                        </el-col>
                        <el-col :span="22" style="width: 100%" >
                            <div class="grid-content bg-white" >
                                <el-card class="box-card" style="width: 100%">
                                    <ve-tree :data="treeData" :tooltip-formatter="tooltipFormatter"></ve-tree>
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
                      <ve-ring :data="userData"></ve-ring>
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
    import echarts from 'echarts'

	export default{
			name: "Chart",
			components: {
				roseType
			},

			data(){
				return {
					tChart: '1',
					cChart: '1',
                    uChart: '1',
                    userChart:[],
					treeChart: {
						name: 'MAINCATALOG',
						value: 'CATALOG.MCAT.PLEXY1.PRI',
						link: '',
						children: []
					},
					treeData: {
						columns: ['name', 'value'],
						rows: [{
							name: 'tree',
							value: []
						}]
					},
                    userData: {
                        columns: ['type', 'num'],
                        rows: []
                    }
				}
			},


			methods: {
				tooltipFormatter (v) {
					return [
						`${v.seriesName}: ${v.data.value}`,
						`<a target="_blank" href="${v.data.link}">${v.data.link}</a>`
					].join('<br>')
				},

				dealTreeData(data){
					let _this = this
					let line = data.split('\n')
					for (let i = 0; i < line.length; i++) {
						if (line[i].indexOf("0USERCATALOG") != -1) {
							let userNode = {
								name: "",
								value: "",
								link: "",
								children: []
							}
							userNode.name = "USERCATALOG"
							userNode.value = line[i].match(/0USERCATALOG --- (\S*)/)[1]
							i += 5
							if (line[i].indexOf("NULL") != -1) {
								userNode.children = []
							} else {
								//取ALIAS
								i++
								while (line[i].indexOf("ALIAS----") != -1) {
									let aliasNode = {
										name: "ALIAS",
										value: "",
										link: "",
										children: []
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
						url: 'http://127.0.0.1:3000/getJobById/LSTMASTR/JOB05823',
						method: 'get'
					}).then(function (res) {
						_this.dealTreeData(res.data)
					}).catch(function (error) {
						console.log(error)
					})
				},

                dealUserChart(data){
					let _this = this
                    let lines = data.split("\n")
                    let v1Count=0
                    let v2Count=0
                    let v3Count=0
                    let v4Count=0
                    let volserName = new Array
                    let volserNum = new Array
                    for(let i = 0; i < lines.length;i++){
                        if(lines[i].indexOf("0USERCATALOG")!= -1){
                            let e = lines[i+4].toString()
                            let volums = e.replace(/^\s+|\s+$/g,"").split("     ")
                            let vol = volums[0].substring(volums[0].lastIndexOf('-')+1,volums[0].length).toString()
                            if(vol=="BYSA01"){
                                v1Count++;
                                volserName[0]="BYSA01"
                                volserNum[0]=v1Count
                            }
                            if(vol=="BYCT01"){
                                v2Count++;
                                volserName[1]="BYCT01"
                                volserNum[1]=v2Count
                            }
                            if(vol=="BIPL01"){
                                v3Count++;
                                volserName[2]="BIPL01"
                                volserNum[2]=v3Count
                            }
                            if(vol=="BYPM02"){
                                v4Count++;
                                volserName[3]="BYPM02"
                                volserNum[3]=v4Count
                            }
                        }
                    }

                    for (let i=0;i < volserNum.length;i++){
                        let temp1={
                        	"type":'',
                            "num":''
                        }
                        temp1.type=volserName[i]
                        temp1.num=volserNum[i]
                        _this.userChart.push(temp1)
                    }
                    console.log(_this.userChart)

                },

                initUserChart(){
	                let _this = this
	                _this.$http({
		                url:'http://127.0.0.1:3000/getJobById/LSTUSER/JOB05813',
		                method:'get'
	                }).then(function(res){
		                _this.dealUserChart(res.data)
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

            },

			mounted(){
				this.initTree()
                this.initUserChart()
				this.treeData.rows[0].value = [this.treeChart]
                this.userData.rows =  this.userChart
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


  .userChart{
    display: flex;
    width: 90%;
    flex-direction: column;
    font-size: 13px;
    align-items: center;
    margin-top:50px;
  }
  .treeChart{
      display: flex;
      width: 90%;
  }


</style>
