<template>
  <div>
    <div class="parameters">
      <div class="parameter voicing">

      </div>

      <!--<div class="parameter-container continuant" v-for="(feature, key) in generalFeatures">
        <label :for="key">{{key}}</label>
        <select :name="key" :id="key" v-model="" multiple>
          <option v-for="featureValue in feature" :value="featureValue">{{featureValue}}</option>
        </select>
      </div>-->

      <div class="box general">
        <label for="parameter-group general">GENERAL</label>
        <div class="parameter-group general" id="parameter-group general">
          <div class="parameter container continuant">
            <label for="p-continuant">Continuant</label>
            <select name="p-continuant" id="p-continuant" v-model="gf.Continuant" multiple>
              <option v-for="featureValue in generalFeatures.Continuant" :value="featureValue">{{featureValue}}</option>
            </select>
          </div>

          <div class="parameter container nasal">
            <label for="p-nasal">Nasal</label>
            <select name="p-nasal" id="p-nasal" v-model="gf.Nasal" multiple>
              <option v-for="featureValue in generalFeatures.Nasal" :value="featureValue">{{featureValue}}</option>
            </select>
          </div>

          <div class="parameter container approximate">
            <label for="p-approximate">Approximate</label>
            <select name="p-approximate" id="p-approximate" v-model="gf.Approximate" multiple>
              <option v-for="featureValue in generalFeatures.Approximate" :value="featureValue">{{featureValue}}
              </option>
            </select>
          </div>

          <div class="parameter container sonorant">
            <label for="p-sonorant">Sonorant</label>
            <select name="p-sonorant" id="p-sonorant" v-model="gf.Sonorant" multiple>
              <option v-for="featureValue in generalFeatures.Sonorant" :value="featureValue">{{featureValue}}</option>
            </select>
          </div>

          <div class="parameter container stricture">
            <label for="p-stricture">Stricture</label>
            <select name="p-stricture" id="p-stricture" v-model="gf.Stricture" multiple>
              <option v-for="featureValue in generalFeatures.Stricture" :value="featureValue">{{featureValue}}</option>
            </select>
          </div>

          <div class="parameter container vocoid">
            <label for="p-vocoid">Vocoid</label>
            <select name="p-vocoid" id="p-vocoid" v-model="gf.Vocoid" multiple>
              <option v-for="featureValue in generalFeatures.Vocoid" :value="featureValue">{{featureValue}}</option>
            </select>
          </div>

          <div class="parameter container manner">
            <label for="p-manner">Manner</label>
            <select name="p-manner" id="p-manner" v-model="gf.Manner" multiple>
              <option v-for="featureValue in generalFeatures.Manner" :value="featureValue">{{featureValue}}</option>
            </select>
          </div>
        </div>
      </div>


      <!--<div>
        <article :id="id" class="article">
          <div class="parameter container" v-for="(feature, key) in generalFeatures" :key="feature">
            <label :for="feature">{{key}}</label>
            <select name="key" id="key" v-model="selectedFeatures[key]" multiple>
              <option v-for="featureValue in feature" :key="featureValue">{{featureValue}}</option>
            </select>
          </div>
        </article>
      </div>-->


      <div class="parameter place">

      </div>
    </div>

    <!--<div class="list">
      <ul>
        <li v-for="ph in phList" v-if="(manner===ph.manner || manner==='') && (place===ph.place || place==='') && (voice===ph.voice || voice===null)">{{ph.value}}</li>
      </ul>
    </div>-->

    <div>
      <table>
        <thead></thead>

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
            :id="assignId(ph)"
          >
            <span v-if="shouldBeShown(ph.distinctiveFeatures)">{{ph.value}}</span>
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
      this.$store.dispatch('loadGeneralDistinctiveFeatures')
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
      },
      generalFeatures() {
        return this.$store.state.generalFeatures;
      }
    },
    watch: {
      generalFeatures: function (newFeatures) {
        this.gf.Manner = this.$store.state.generalFeatures.Manner;
        this.gf.Vocoid = this.$store.state.generalFeatures.Vocoid;
        this.gf.Stricture = this.$store.state.generalFeatures.Stricture;
        this.gf.Continuant = this.$store.state.generalFeatures.Continuant;
        this.gf.Approximate = this.$store.state.generalFeatures.Approximate;
      }
    },
    data() {
      return {
        fuckingHack: true,
        sideMenuVisibility: false,
        gf: {
          Continuant: [],
          Nasal: [],
          Approximate: [],
          Sonorant: [],
          Stricture: [],
          Vocoid: [],
          Manner: []
        },
        phList: [
          {value: "b", manner: "stop", place: "bilabial", voice: true},
          {value: "t", manner: "stop", place: "alveolar", voice: false},
          {value: "g", manner: "stop", place: "glottal", voice: true},
          {value: "s", manner: "sibilant", place: "alveolar", voice: false}
        ]
      }
    },
    methods: {
      shouldBeShown(phFeatures) {
        if (phFeatures === null) {
          return false;
        }
        /*for (let man=0; man<this.gf.Manner.length; man++) {
          for (let voc = 0; voc < this.gf.Vocoid.length; voc++) {
            if (phFeatures.manner.mannerPrecise === this.gf.Manner[man] && phFeatures.majorClass.vocoid === this.gf.Vocoid[voc]) {
              return true;
            }
          }
        }*/
        for (let man = 0; man < this.gf.Manner.length; man++) {
          let manPr = phFeatures.manner.mannerPrecise;

          for (let voc = 0; voc < this.gf.Vocoid.length; voc++) {
            let vocoid = phFeatures.majorClass.vocoid;

            for (let app = 0; app < this.gf.Approximate.length; app++) {
              let approx = phFeatures.majorClass.approximant;

            for (let str = 0; str < this.gf.Stricture.length; str++) {
              let strict = phFeatures.manner.stricture;

              for (let cont = 0; cont < this.gf.Continuant.length; cont++) {
                let contin = phFeatures.manner.continuant;

                if (manPr === this.gf.Manner[man] || manPr === null) {
                  if (String(vocoid) === String(this.gf.Vocoid[voc])) {
                    if (String(approx) === String(this.gf.Approximate[app])) {
                      if (strict === this.gf.Stricture[str] || strict === null) {
                        if (String(contin) === String(this.gf.Continuant[cont]) || contin === null) {
                          return true;
                        }
                      }
                    }
                  }
                }
              }
              }
            }
          }
        }
        return false;
      }
      ,
      getHeadersRowsNum() {
        return this.placeHeaders[this.placeHeaders.length - 1].row + 1;
      }
      ,
      hideSideMenu() {
        this.sideMenuVisibility = !this.sideMenuVisibility;
      }
      ,
      assignId(phoneme) {
        return "id" + phoneme.row + "x" + phoneme.column;
      }
    }
  }
</script>

<style scoped>
  @import url("https://fonts.googleapis.com/icon?family=Material+Icons");

  .parameters {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .parameter-group {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: 1px solid cadetblue;
  }

  .parameter {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 2px 10px;
  }

  .voicing {
    align-items: flex-start;
    margin-top: 10px;
  }

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

  #id5x10 { /*пример рабочего id*/
    color: red;
  }

</style>
