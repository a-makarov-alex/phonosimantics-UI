<template>
  <div class="normality">
    <!--<table border="1" cellpadding="10" cellspacing="0">
      <tr>
        <th rowspan="3">Semantics</th>
        <th colspan="5">VOWELS</th>
      </tr>
      <tr>
        <th colspan="5">Height</th>
      </tr>
      <tr>
        <th>Open</th>
        <th>Op-Mid</th>
        <th>Mid</th>
        <th>Cl-Mid</th>
        <th>Close</th>
      </tr>
    </table>-->

    <table border="1" cellpadding="10" cellspacing="0">
      <thead id="tableHead">
        <!--<tr
          class="normality-row"
          v-for="header in headers"
          :key="header.row">
          <th
            :colspan="header.width">
            {{ header.height }}
          </th>
        </tr>-->
      </thead>
      <tbody></tbody>
    </table>
    <!--<ul
      v-for="header in headers"
      :key="header.text"
      class="headers header"
    >
      <li class="headers header-item">
        <h3>{{ header.text }}</h3>
      </li>
    </ul>-->
  </div>
</template>

<script>
  import {store} from '../../../store/store'

  export default {
    name: "NormalityTableItem",
    computed: {
      headers() {
        return this.$store.state.headers
      }
    },
    created() {
      this.$store.dispatch('loadHeaders')
    }
  }

  window.onload = () => {
    loadTableData(store.state.headers)
  };

  function loadTableData(headers) {
    const tableHead = document.getElementById('tableHead');
    let dataHtml = '';
    let currentRow = 99;
    dataHtml += `<tr>`;

    for (let header of headers) {
      if (`${header.row}` !== String(currentRow)) {
        dataHtml += `</tr><tr>`;
        currentRow = `${header.row}`;
      }
      dataHtml += `<td colspan="${header.width}" rowspan="${header.height}">${header.text}</td>`;
    }
    dataHtml += `</tr>`;
    tableHead.innerHTML = dataHtml;
  }




  /*var table = '';
  var headersVar = this.$store.state.headers;
  var currentRow = 999;

  for(var i in headersVar) {
    if (i.row != currentRow) {
      table += '<tr>';
    }
    table += '<th>' + "test" + '</th>';
    if (i.row != currentRow) {
      table += '</tr>';
      currentRow = i.row
    }
  }*/


</script>

<style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
</style>
