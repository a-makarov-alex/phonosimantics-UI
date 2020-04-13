<template>
  <div class="meanings_list">
    <h1>Meanings available</h1>
    <div class="meanings">
      <MeaningsListItem></MeaningsListItem>
    </div>
    <!-- <div>
      <h1>{{ this.$store.state.language }}</h1>
    </div> -->
  </div>
</template>

<script>
  import axios from 'axios'
  import MeaningsListItem from './MeaningsListItem/MeaningsListItem'

  export default {
    components: {
      MeaningsListItem
    },
    created() {
      //this.$store.dispatch('loadLanguage')
      this.$store.dispatch('loadMeanings')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .meanings {
    border-radius: 4px;
    border: 1px solid #2c3e50;
  }

  h1, h2 {
    font-weight: normal;
  }

  a {
    color: #42b983;
  }
</style>
