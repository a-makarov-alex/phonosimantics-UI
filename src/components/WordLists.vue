<template>
  <div class="meanings_list">
    <h1>Meanings available</h1>
    <ul
      v-for="meaning in meanings"
      :key="meaning.title"
      class="meanings"
    >
      <li class="meaning-item">
        <h3>{{ meaning.definition }}</h3>
      </li>
    </ul>
    <div>
      <h1>{{ this.$store.state.language }}</h1>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    computed: {
      meanings() {
        return this.$store.state.meanings
      }
    },
    created() {
      this.$store.dispatch('loadLanguage')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
