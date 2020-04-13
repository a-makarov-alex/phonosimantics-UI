<template>
  <div>
    <div class="parameter-group">
      <div class="parameter feature">
        <label for="featureParam">Select feature:</label>
        <select name="featureParam" id="featureParam" v-model="selectedFeature">
          <option disabled value="">Select feature</option>
          <option v-for="(feature, key) in features" :value="feature">{{key}}</option>
        </select>
      </div>

      <div class="parameter statsParam">
        <label for="statsParam">Select stats param:</label>
        <select name="statsParam" id="statsParam" v-model="selectedStatsParam">
          <option disabled value="">Select stats param</option>
          <option>% of all phonemes</option>
          <option>% of words with feature</option>
          <option>average feature num per word</option>
        </select>
      </div>
    </div>

    <h4>{{statsForAllWordlists.meaning}}</h4>

    <div class="meanings-list">
      <ul class="meanings-list meanings">
        <li class="meanings-list meaning-item"
            v-for="meaning in meanings"
            :key="meaning.title"
        >
          <div class="long_block">
            <div class="short_block meaning">
              <h3>{{ meaning }}</h3>
            </div>

            <div class="short_block words">

            </div>

            <div class="short_block stats"
            v-for="">

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
        selectedFeature: 'vocoid',
        selectedStatsParam: '',
        statsForAllWordlists: {
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
        }
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
      if (this.selectedFeature != '') {
        console.info("selectedFeature: " + this.selectedFeature);
        Vue.axios.get('/wordlists/features/' + this.selectedFeature + '/stats').then(result => {
          this.statsForAllWordlists = result.data
        });
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

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
  }
</style>
