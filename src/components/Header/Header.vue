<template>
  <div class="header-line">
    <h2>Phonosemantics-UI</h2>
  </div>
</template>

<script>
  export default {
    name: "Header",
    computed: {
      meanings() {
        return this.$store.state.meanings
      }
    },
    created() {
      this.$store.dispatch('loadMeanings')
    }
  }
</script>

<style scoped>
  .header-line {
    width: 100%;
    height: 48px;
    background-color: cadetblue;
    display: flex;
  }

  h2 {
    margin-left: 5%;
    margin-bottom: auto;
    margin-top: auto;
  }
</style>
