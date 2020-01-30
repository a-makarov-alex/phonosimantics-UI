<template>
  <div class="wordlist-item">
    <div class="wordlist-meaning">
      <h4>Wordlist for "{{wordlist.meaning}}"</h4>

      <div class="select-block">
        <h4>Select meaning: </h4>
        <select name="meaning" id="">
          <option disabled value="">Select meaning</option>
          <option v-for="meaning in meanings">{{meaning}}</option>
        </select>
      </div>
      <!--<button v-on:click="loadTableData(wordlist)">test</button>-->
    </div>
    <!-- it works as list!
    <ul
      v-for="word in wordlist.list"
    >
      <li>
        <h4>{{word.language.title}} : {{word.graphicForm}} : {{word.transcription}}</h4>
      </li>
    </ul>-->

    <table border="1" cellpadding="10" cellspacing="0">
      <thead id="tableHead">
      <tr>
        <th>№</th>
        <th>Language</th>
        <th>GraphicForm</th>
        <th>Transcription</th>
      </tr>
      </thead>

      <tbody id="tableBody">
      <tr v-for="(word, index) in wordlist.list">
        <td>{{index+1}}</td>
        <td><a :href="getUrl(word.language.title)">{{word.language.title}}</a></td>
        <td>{{word.graphicForm}}</td>
        <td>{{word.transcription}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import {store} from '../../../store/store'

  export default {
    name: "WordlistItem",
    computed: {
      wordlist() {
        return this.$store.state.wordlist
      },
      meanings() {
        return this.$store.state.meanings
      }
    },
    created() {
      this.$store.dispatch('loadWordlist', this.$router.currentRoute.params);
      this.$store.dispatch('loadMeanings')
    },
    methods: {
      getUrl(meaning) {
        return "http://localhost:8080/#/languages/" + meaning;
      }
    }
  }

</script>

<style scoped>
  ul li {
    list-style-type: none;
    padding: 0;
  }

  select {
    margin-left: auto;
    margin-right: 10%;
    margin-bottom: auto;
    margin-top: auto;
  }

  .wordlist-meaning {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .select-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

</style>
