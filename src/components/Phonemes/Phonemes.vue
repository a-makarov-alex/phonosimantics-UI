<template>
  <div>
    <div>
      <!-- <h2>{{allPhonemes}}</h2>-->
    </div>
    <div>
      <table>
        <thead>

        </thead>

        <!--<tbody>
        <tr v-for="vertHeader in getVertHeaders()">
          <td
            v-for="ph in getCellsForRow(vertHeader.y)"
            :colspan="ph.width"
            @click="hideSideMenu"
          >
            {{ph.value}}
          </td>
        </tr>
        </tbody> -->

        <tbody>
        <tr v-for="index in getHeadersRowsNum()">
          <td></td>
          <td
            v-for="header in placeHeaders"
            v-if="header.row + 1 === index"
            :colspan="header.width"
          >
            {{header.text}}
          </td>
        </tr>
        <tr></tr>

        <tr v-for="header in mannerHeaders">
          <td>{{header.text}}</td>
          <td
            v-for="ph in allPhonemes"
            v-if="ph.row === header.row"
            @click="hideSideMenu"
            v-bind:class="{recognized : ph.recognized}"
          >
            {{ph.value}}
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="side-menu" v-if="sideMenuVisibility">
      <i class="material-icons clear" @click="sideMenuVisibility=!sideMenuVisibility">clear</i>
      <h2>side menu test</h2>

    </div>

  </div>
</template>

<script>
  export default {
    name: "Phonemes",
    created() {
      this.$store.dispatch('loadAllPhonemes');
      this.$store.dispatch('loadPlaceHeaders');
      this.$store.dispatch('loadMannerHeaders');
    },
    computed: {
      allPhonemes() {
        return this.$store.state.allPhonemes;
      },
      placeHeaders() {
        return this.$store.state.headers;
      },
      mannerHeaders() {
        return this.$store.state.bufHeaders;
      }
    },
    data() {
      return {
        sideMenuVisibility: false
      }
    },
    methods: {
      getHeadersRowsNum() {
        return this.placeHeaders[this.placeHeaders.length-1].row + 1;
      },
      hideSideMenu() {
        this.sideMenuVisibility = !this.sideMenuVisibility;
      }
    }
  }
</script>

<style scoped>
  @import url("https://fonts.googleapis.com/icon?family=Material+Icons");

  table, td {
    border: 1px solid cadetblue;
    border-collapse: collapse;
  }

  td {
    padding: 4px;
    font-size: 1.2em;
  }

  .side-menu {
    height: 100%;
    width: 160px;
    position: fixed;
    z-index: 1;
    top: 56px; /*48 header + 8 body*/
    right: 8px;
    background-color: #eee;
  }

  .clear {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .clear:hover {
    color: burlywood;
  }

  .recognized {
    background-color: #7CFF67;
    cursor: pointer;
  }

  .recognized:hover {
    background-color: cadetblue;
  }

</style>
