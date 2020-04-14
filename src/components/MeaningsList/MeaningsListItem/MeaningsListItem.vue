<template>
  <div>
    <div class="parameter-group">
      <div class="parameter feature">
        <label for="featureParam">Select feature:</label>
        <select name="featureParam" id="featureParam" v-model="selectedFeature">
          <option disabled value="">Select feature</option>
          <option v-for="(feature, key) in features" :value="key">{{key}}</option>
        </select>
      </div>

      <div class="parameter statsParam">
        <label for="statsParam">Select stats param:</label>
        <select name="statsParam" id="statsParam" v-model="selectedStatsParam">
          <option disabled value="">Select stats param</option>
          <option v-for="value in statsOptions">{{value}}</option>
        </select>
      </div>
    </div>

    <div class="meanings-list">
      <ul class="meanings-list meanings">
        <li class="meanings-list meaning-item"
            v-for="(feature, key, index) in statsForAllWordlists"
        >
          <div class="long-block"
               v-if="index===0"
          >
            <div class="short-block meaning">
              <h3>Meaning</h3>
            </div>

            <div class="short-block words"
                 v-for="(inFeature, inKey) in feature"
            >
              <h3>{{inKey}}</h3>
            </div>
          </div>

          <div class="long-block"
               v-if="selectedStatsParam!==''"
          >
            <div class="short-block meaning">
              <h3>{{ key }}</h3>
            </div>

            <div class="short-block words"
                 v-for="(inFeature, inKey) in feature"
            >
              <h3>{{getCertainTypeOfStats(inFeature)}}</h3>
            </div>

          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import VueAxios from "vue-axios";
  import axios from "axios";
  import {API_URL} from "../../../../api/config";

  Vue.use(VueAxios, axios)
  Vue.axios.defaults.baseURL = API_URL
  Vue.axios.defaults.headers.get['Access-Control-Allow-Origin'] = 'http://localhost:8080';

  export default {
    name: "MeaningsListItem",
    data() {
      return {
        features: [],
        selectedFeature: '',
        selectedStatsParam: '',
        statsForAllWordlists: [],
        statsOptions: [
          "% of all phonemes",
          "% of words with feature",
          "average feature num per word"
        ]

      /*{
        meaning: {
          featureValue: {
              percentOfAllPhonemes: '',
              percentOfWordsWithFeature: '',
              averageFeatureInstancesPerWord: '',
              numPhWithFeature: '',
              numWordsWithFeature: '',
              numAllPhonemes: '',
              numAllWords: ''
          }
        }
      }*/

      }
    },
    computed: {
      meanings() {
        return this.$store.state.meanings
      }
    },
    created() {
      this.$store.dispatch('loadMeanings');
      Vue.axios.get('/features/all/structure').then(result => {
        this.features = result.data
      });
      /*if (this.selectedFeature != '') {
        console.info("selectedFeature: " + this.selectedFeature);
        Vue.axios.get('/wordlists/features/' + this.selectedFeature + '/stats').then(result => {
          this.statsForAllWordlists = result.data
        });
      }*/
    },
    watch: {
      selectedFeature: function () {
        Vue.axios.get('/wordlists/features/' + this.selectedFeature + '/stats').then(result => {
          this.statsForAllWordlists = result.data;
        });
      }
    },
    methods: {
      getCertainTypeOfStats(inFeature) {
        let result = '';
        switch (this.selectedStatsParam) {
          case this.statsOptions[0]: {
            result = (Number(inFeature.percentOfAllPhonemes) * 100).toFixed(1) + "%";
            break;
          }
          case this.statsOptions[1]: {
            result = (Number(inFeature.percentOfWordsWithFeature) * 100).toFixed(1) + "%";
            break;
          }
          case this.statsOptions[2]: {
            result = (Number(inFeature.averageFeatureInstancesPerWord)).toFixed(1);
            break;
          }
          default: {
            console.info("Stats type is invalid: " + this.selectedStatsParam)
          }
        }
        return result;
      }
    }
  }
</script>

<style scoped>
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

  .long-block {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: 1px solid cadetblue;
  }

  .short-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 2px 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
  }
</style>
