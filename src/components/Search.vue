<template>
    <div class="container">

    </div>
</template>

<script>
	export default {

    methods: {
      indexMethod(index) {
        return index + 1;
      }
    },
    data() {
      return {}
    }
  }

</script>

<style scoped>
  .container{
    flex-direction: row;
    font-size: 13px;
    width: 80%;
    height: auto;
    margin-top: 50px;
    left: 10%;
    display: flex;
    position: relative;
    margin-bottom: 50px;
  }
</style>
