<template>
    <div class = "container">
        <router-view/>
        <Header></Header>
    </div>
</template>

<script>
	import Header from '../components/Header'
    import MainCatalog from '../components/MainCatalog'

	export default {
		name: 'home',
		data () {
			return {

			}
		},
		components:{
			Header,
            MainCatalog
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .container{
        display: flex;
        flex-direction: row;
    }


</style>
