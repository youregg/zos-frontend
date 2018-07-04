<template>
    <div class="container">
      <roseType></roseType>
    </div>

</template>

<script>
  import roseType from '../components/roseType'
	export default{
		name:"Chart",
    components:{
      roseType
    },
		data(){
			return{

			}
		}
	}

</script>

<style scoped>
    .container{
      flex-direction: column;
      font-size: 13px;
      width:80%;
      height: auto;
      margin-top: 50px;
      margin-left: 10%;
      display: flex;
      position:center;
      margin-bottom: 50px;
    }


</style>
