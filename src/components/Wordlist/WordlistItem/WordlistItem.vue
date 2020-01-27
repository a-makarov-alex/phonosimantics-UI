<template>
  <div class="wordlist-item">
    <h4>test</h4>
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
        console.info(this.$store.state.wordlist);
        return this.$store.state.wordlist
      }
    },
    created() {
      this.$store.dispatch('loadWordlist', this.$router.currentRoute.params)
    }
  }

  window.onload = () => {
    loadTableData(store.state.wordlist)
  };

  function loadTableData(wordlist) {
    const tableBody = document.getElementById('tableBody');
    let dataHtml = '';
    let counter = 1;

    for (let word of wordlist.list) {
      dataHtml += `<tr>`;
      dataHtml += `<td>${counter}</td>`;
      dataHtml += `<td><a href="http://localhost:8080/#/languages/${word.language.title}">${word.language.title}</a></td>`;
      dataHtml += `<td>${word.graphicForm}</td>`;
      dataHtml += `<td>${word.transcription}</td>`;
      dataHtml += `</tr>`;
      counter++;
    }
    tableBody.innerHTML = dataHtml;
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
