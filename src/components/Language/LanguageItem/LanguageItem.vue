<template>
  <div>
    <h2>{{language.title}} Language</h2>
  </div>
</template>

<script>
  import {store} from '../../../store/store'

  export default {
    name: "LanguageItem",
    computed: {
      language() {
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
