<template>
  <div>
    <!-- <div>
        <h2>{{getHorHeaders()}}</h2>
        <h2>{{getVertHeaders()}}</h2>
        <h2>{{getCellsForRow(2)}}</h2>
    </div>-->
    <div>
      <table>
        <thead>

        </thead>

        <tbody>
        <tr v-for="vertHeader in getVertHeaders()">
          <td
            v-for="ph in getCellsForRow(vertHeader.y)"
            :colspan="ph.width"
            @click="hideSideMenu"
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
    data() {
      return {
        sideMenuVisibility: false,
        listPh: [
          {x: 'A', y: '1', value: 'A1', width: '1'},
          {x: 'A', y: '2', value: 'A2', width: '1'},
          {x: 'B', y: '2', value: 'B2+C2', width: '2'},
          {x: 'B', y: '1', value: 'B1', width: '1'},
          {x: 'C', y: '3', value: 'C3', width: '1'},
          {x: 'B', y: '3', value: 'B3', width: '1'},
          {x: 'C', y: '1', value: 'C1', width: '1'},
          {x: 'A', y: '3', value: 'A3', width: '1'}
        ]
      }
    },
    methods: {
      getHorHeaders() {
        let arr = [];
        let set = new Set();

        for (let i = 0; i < this.listPh.length; i++) {
          let elem = this.listPh[i];
          if (!set.has(elem.x)) {
            set.add(elem.x);
            arr.push(elem);
          }
        }
        return arr;
      },
      getVertHeaders() {
        let arr = [];
        let set = new Set();

        for (let i = 0; i < this.listPh.length; i++) {
          let elem = this.listPh[i];
          if (!set.has(elem.y)) {
            set.add(elem.y);
            arr.push(elem);
          }
        }
        return arr;
      },
      getCellsForRow(y) {
        let arr = [];
        let horHeaders = this.getHorHeaders();

        for (let i = 0; i < horHeaders.length; i++) {
          let h = horHeaders[i];
          for (let j = 0; j < this.listPh.length; j++) {
            let ph = this.listPh[j];
            if (ph.y == y && ph.x == h.x) {
              arr.push(ph)
            }
          }
        }
        return arr;
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
    font-size: 1.5em;
    cursor: pointer;
  }

  td:hover {
    background-color: cadetblue;
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

</style>
