<template>
    <div class="container" @click="showCatalog">
        MainCatalog
    </div>
</template>

<script>
    export default{
    	name:"MainCatalog",
        data(){
    		return{

            }
        },
        methods:{
            showCatalog(){
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