<template>
    <div class="container">
        {{input}}
    </div>
</template>

<script>
	export default {
        name:"Search",
        methods: {},
        data() {
    	    return {}
        },
        props:["input"]

  }

</script>

<style scoped>
  .container{
      display: flex;
      flex-direction: column;
      font-size: 13px;
      width: 90%;
      margin-top: 100px;
      align-items: center;
      justify-content: center;
  }
</style>
