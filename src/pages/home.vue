<template>
    <div class = "home-container">
        <router-view/>
        <Header @getIndex="showIndex"></Header>
        <div class="content-container">
            <MainCatalog :is="currentComponent" v-bind:response="responseString"></MainCatalog>
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
                currentTab:"MainCatalog",
                responseString:""
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
            },
        },
        computed:{
			currentComponent(){
                return this.currentTab
            }
        }
	}
</script>

<style scoped>
    .home-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .content-container{
        display: flex;
        flex-direction: column;
        margin-top: 120px;
        align-items: center;
        justify-content: center;
        width: 90%;
    }
</style>
