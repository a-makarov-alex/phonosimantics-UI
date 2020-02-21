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

      <!--<div class="parameters meanings pair">
        <div class="parameter meaning-1">
          <label for="select-meaning-1">Meaning 1 (Green)</label>
          <select name="" id="select-meaning-1" v-model="meaning1">
            <option v-for="meaning in allMeanings" :value="meaning" >{{meaning}}</option>
          </select>
          <h4>{{meaning1}}</h4>
        </div>

        <div class="parameter meaning-2">
          <label for="select-meaning-2">Meaning 2 (Red)</label>
          <select name="" id="select-meaning-2" v-model="meaning2">
            <option v-for="meaning in allMeanings" :value="meaning" >{{meaning}}</option>
          </select>
          <h4>{{meaning2}}</h4>
        </div>
      </div>-->
    </div>

    <!--<div class="list">
      <ul>
        <li v-for="ph in phList" v-if="(manner===ph.manner || manner==='') && (place===ph.place || place==='') && (voice===ph.voice || voice===null)">{{ph.value}}</li>
      </ul>
    </div> -->

    <label for="general-param">GENERAL</label>
    <div class="parameters general" id="general-param">
      <div :class="'parameter ' + key" v-for="(feature,key) in generalFeatures" :key="key">
        <label :for="feature">{{key}}</label>
        <select :name="key" :id="key" v-model="selectedFeaturesGen[key]" multiple>
          <option v-for="featureValue in feature" :key="featureValue">{{featureValue}}</option>
        </select>
      </div>
    </div>

    <label for="consonant-param">CONSONANT</label>
    <div class="parameters consonant" id="consonant-param">
      <div :class="'parameter ' + key" v-for="(feature,key) in consonantFeatures" :key="key">
        <label :for="feature">{{key}}</label>
        <select :name="key" :id="key" v-model="selectedFeaturesCons[key]" multiple>
          <option v-for="featureValue in feature" :key="featureValue">{{featureValue}}</option>
        </select>
      </div>
    </div>

    <div>
      <h2>{{consonantFeatures}}</h2>
      <h2>{{selectedFeaturesCons}}</h2>
    </div>

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
  import Vue from "vue";
  import VueAxios from "vue-axios";
  import axios from "axios";
  import {API_URL} from "../../../api/config";

  Vue.use(VueAxios, axios)
  Vue.axios.defaults.baseURL = API_URL
  Vue.axios.defaults.headers.get['Access-Control-Allow-Origin'] = 'http://localhost:8080';

  export default {
    name: "Phonemes",
    created() {
      this.$store.dispatch('loadAllPhonemes');
      this.$store.dispatch('loadPlaceHeaders');
      this.$store.dispatch('loadMannerHeaders');
      this.$store.dispatch('loadMeanings')
      Vue.axios.get('phonemes/parameters/general').then(result => {
          this.generalFeatures = result.data})
      Vue.axios.get('/phonemes/parameters/consonant').then(result => {
        this.consonantFeatures = result.data})
      this.$store.dispatch('loadGeneralDistinctiveFeatures')
      this.$store.dispatch('loadConsonantDistinctiveFeatures')
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
      allMeanings() {
        return this.$store.state.meanings;
      },
      gfeat() {
        return this.$store.state.generalFeatures;
      },
      cfeat() {
        return this.$store.state.consonantFeatures;
      }
    },
    watch: {
      gfeat: function (newFeatures) {
        this.selectedFeaturesGen = Object.assign(
          ...Object.keys(this.generalFeatures).map( key => ({
            [key]: this.generalFeatures[key]}))
        )
      },
      cfeat: function (newFeatures) {
        this.selectedFeaturesCons = Object.assign(
          ...Object.keys(this.consonantFeatures).map( key => ({
            [key]: this.consonantFeatures[key]}))
        )
      }
    },
    data() {
      return {
        generalFeatures: [],
        consonantFeatures: [],
        selectedFeaturesGen: [],
        selectedFeaturesCons: [],
        meaning1: '',
        meaning2: '',
        sideMenuVisibility: false
      }
    },
    methods: {
      shouldBeShown(phFeatures) {
        if (phFeatures === null) {
          return false;
        }
        /* ********************** GENERAL FEATURES *****************************/
        let sf = this.selectedFeaturesGen;

        for (let property in sf) {
          if (sf.hasOwnProperty(property)) {
            for (let phSection in phFeatures) {
              if (phFeatures[phSection].hasOwnProperty(property)) {
                let sectionValue = phFeatures[phSection];

                if (sf[property].indexOf(String(sectionValue[property])) != -1) {
                  /*console.info(sf[property]);
                  console.info(String(sectionValue[property]));
                  console.info("============")*/
                  break;
                } else {
                  return false;
                }
              }
            }
          }
        }

        /* ********************** CONSONANT FEATURES *****************************/
        sf = this.selectedFeaturesCons;

        for (let property in sf) {
          if (sf.hasOwnProperty(property)) {
            for (let phSection in phFeatures) {
              if (phFeatures[phSection].hasOwnProperty(property)) {
                let sectionValue = phFeatures[phSection];

                if (sf[property].indexOf(String(sectionValue[property])) != -1) {
                  /*console.info(sf[property]);
                  console.info(String(sectionValue[property]));
                  console.info("============")*/
                  break;
                } else {
                  return false;
                }
              }
            }
          }
        }


        return true
      },
      getHeadersRowsNum() {
        return this.placeHeaders[this.placeHeaders.length - 1].row + 1;
      },
      hideSideMenu() {
        this.sideMenuVisibility = !this.sideMenuVisibility;
      },
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
