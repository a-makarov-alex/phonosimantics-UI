<template>
  <!--<div>
    <h2>Hello</h2>
  </div>-->
</template>

<script>
  import {store} from '../../../store/store'

  export default {
    name: "LanguageItem",
    computed: {
      language() {
        console.info(this.$store.state.language);
        return this.$store.state.language
      }
    },
    created() {
      this.$store.dispatch('loadLanguage', this.$router.currentRoute.params)
    }
  }
</script>

<style scoped>

</style>
