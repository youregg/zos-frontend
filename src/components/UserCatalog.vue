<template>
    <div class="container" @click="showCatalog">
        UserCatalog
    </div>
</template>

<script>

	export default{
		name:"UserCatalog",
		data(){
			return{

			}
		},
        methods:{
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
        }

	}

</script>

<style scoped>
    .container{
        display: flex;
        flex-direction: row;
    }
</style>