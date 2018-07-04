<template>
    <div class = "header">
        <div class="header-title">
            zOS frontend
        </div>
        <div id="input-container">
            <el-input v-model="input" placeholder="Please enter catalog" prefix-icon="el-icon-search" clearable @change="getInput"></el-input>
        </div>
        <div class="nav-container">
            <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" background-color="#D2E0E9">
                <el-menu-item index="0">Main catalog</el-menu-item>
                <el-menu-item index="1">User catalog</el-menu-item>
                <el-menu-item index="2">Alias</el-menu-item>
                <el-menu-item index="3">Search</el-menu-item>
                <el-menu-item index="4">Chart</el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
	import Vue from 'vue'
	import ElementUI from 'element-ui'
  import Search from '../components/Search'
    export default {
        name: 'Header',
        components:{
            Search
        },
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                input:'',
                activeIndex: '0',
                HaliasVisible: false
            }
        },
	    methods: {
		    handleSelect(key, keyPath) {
                this.$emit("getIndex",key)
		    },
            getInput(e){
                this.$emit("getInput",e)

            }
        }

	}
</script>

<style scoped>
    .header{
        width: 100%;
        height: 13rem;
        left: 0;
        top:0;
        position: fixed;
        background-color: rgb(210,224,233);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: "Century Gothic";
        z-index: 100;
    }
    .header-title{
        font-size: 2em;
        font-family: "Century Gothic";
    }
    #input-container{
        margin-top:20px;
        width: 300px;
        font-family: "Century Gothic";
    }

    .nav-container{
        font-family: "Century Gothic";
        margin-top:20px;

    }

</style>
