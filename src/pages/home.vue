<template>
    <div class = "home-container">
        <router-view/>
        <Header @getIndex="showIndex"></Header>
        <div class="content-container">
            <MainCatalog :is="currentComponent"></MainCatalog>

        </div>
    </div>
</template>

<script>
	import Header from '../components/Header'
    import MainCatalog from '../components/MainCatalog'
    import UserCatalog from '../components/UserCatalog'
    import Alias from '../components/Alias'
    import Chart from '../components/Chart'
    import Search from '../components/Search'

	export default {
		name: 'home',
		data () {
			return {
				index:0,
                arr:['MainCatalog','UserCatalog','Alias','Search','Chart'],
                currentTab:"MainCatalog"

			}
		},
		components:{
			Header,
            MainCatalog,
            UserCatalog,
            Alias,
            Chart,
            Search
		},
        methods:{
			showIndex:function(data){
                this.index = data
                this.currentTab = this.arr[data]
                //console.log(this.currentTab)
            }
        },
        computed:{
			currentComponent(){
                return this.currentTab
            }
        }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .home-container{
        display: flex;
        flex-direction: column;
    }
    .content-container{
        display: flex;
        flex-direction: column;
    }


</style>
