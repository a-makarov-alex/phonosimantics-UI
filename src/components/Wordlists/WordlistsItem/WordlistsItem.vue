<template>
  <div class="wordlists-list">
    <ul
      v-for="wordlist in wordlists"
    ><!--:key="wordlist.meaning"-->
      <li class="wordlists-list wordlist-item">
        <h3>{{ wordlist.meaning }}</h3>
        <ul
        v-for="list in wordlist.list"
        >
          <li>
            <h4>{{list.word}}</h4>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "WordlistsItem",
    computed: {
      wordlists() {
        return this.$store.state.wordlists
      }
    },
    created() {
      this.$store.dispatch('loadWordlists')
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
