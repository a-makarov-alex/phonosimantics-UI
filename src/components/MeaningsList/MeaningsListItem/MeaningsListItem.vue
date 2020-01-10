<template>
  <div class="meanings-list">
    <ul
      v-for="meaning in meanings"
      :key="meaning.title"
      class="meanings-list meanings"
    >
      <li class="meanings-list meaning-item">
        <h3>{{ meaning }}</h3>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "MeaningsListItem",
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
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
  }
</style>
