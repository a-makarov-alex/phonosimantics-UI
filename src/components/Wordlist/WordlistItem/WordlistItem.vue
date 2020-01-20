<template>
  <div class="wordlist-item">
    <h4>test</h4>
    <ul
      v-for="word in wordlist.list"
    >
      <li>
        <h4>{{word.language.title}} : {{word.graphicForm}}</h4>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "WordlistItem",
    computed: {
      wordlist() {
        console.info(this.$store.state.wordlist)
        return this.$store.state.wordlist
      }
    },
    created() {
      this.$store.dispatch('loadWordlist', this.$router.currentRoute.params)
    }
  }
</script>

<style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
  }
</style>
