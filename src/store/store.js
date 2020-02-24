import Vue from 'vue'
import Vuex from 'vuex'
import {API_URL} from '../../api/config'
import axios from 'axios'
import VueAxios from "vue-axios";

Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = API_URL
Vue.axios.defaults.headers.get['Access-Control-Allow-Origin'] = 'http://localhost:8080';

export const store = new Vuex.Store({
  state: {
    language: '',
    meanings: [
      /*{definition: 'def1'},*/
    ],
    wordlists: [
      {
        meaning: '',
        list: [],
        phTypeStatsMap: ''
      }
    ],
    headers: [
      {
        row: '',
        column: '',
        text: '',
        width: '',
        height: ''
      }
    ],
    bufHeaders: [
      {
        row: '',
        column: '',
        text: '',
        width: '',
        height: ''
      }
    ],
    wordlist: {},
    allPhonemes: [
      {
        value: '',
        row: '',
        column: '',
        recognized: false,
        distinctiveFeatures: {
          majorClass: {},
          manner: {},
          place: {},
          vowelSpace: {}
        }
      }
    ],
    generalFeatures: [],
    consonantFeatures: [],
    vowelFeatures: []
  },
  mutations: {
    SAVE_LANGUAGE(state, language) {
      state.language = language
    },
    SAVE_MEANINGS(state, meanings) {
      state.meanings = meanings
    },
    SAVE_HEADERS(state, headers) {
      state.headers = headers
    },
    SAVE_WORDLISTS(state, wordlists) {
      state.wordlists = wordlists
    },
    SAVE_WORDLIST(state, wordlist) {
      state.wordlist = wordlist
    },
    SAVE_ALL_PHONEMES(state, allPhonemes) {
      state.allPhonemes = allPhonemes
    },
    SAVE_BUF_HEADERS(state, bufHeaders) {
      state.bufHeaders = bufHeaders
    },
    SAVE_GENERAL_FEATURES(state, generalFeatures) {
      state.generalFeatures = generalFeatures
    },
    SAVE_CONSONANT_FEATURES(state, consonantFeatures) {
      state.consonantFeatures = consonantFeatures
    },
    SAVE_VOWEL_FEATURES(state, vowelFeatures) {
      state.vowelFeatures = vowelFeatures
    }
  },
  actions: {
    loadLanguage({commit}, params) {
      Vue.axios.get('languages/' + params.language).then(result => {
        commit('SAVE_LANGUAGE', result.data)
      }).catch(error => {
        throw new Error('API ${error}')
      })
    },
    loadMeanings({commit}) {
      Vue.axios.get('meanings').then(result => {
        commit('SAVE_MEANINGS', result.data)
      }).catch(error => {
        throw new Error('API ${error}')
      })
    },
    loadHeaders({commit}) {
      Vue.axios.get('headers').then(result => {
        commit('SAVE_HEADERS', result.data)
      }).catch(error => {
        throw new Error('API ${error}')
      })
    },
    loadWordlists({commit}) {
      Vue.axios.get('wordlists').then(result => {
        commit('SAVE_ALL_PHONEMES', result.data)
      }).catch(error => {
        throw new Error('API ${error}')
      })
    },
    loadWordlist({commit}, params) {
      Vue.axios.get('wordlist/reduced', {params: params}).then(result => {
        commit('SAVE_WORDLIST', result.data)
      }).catch(error => {
        throw new Error('API ${error}')
      })
    },
    loadAllPhonemes({commit}) {
      Vue.axios.get('phonemes/coverage').then(result => {
        commit('SAVE_ALL_PHONEMES', result.data);
      }).catch(error => {
        throw new Error('API ${error}')
      })
    },
    loadPlaceHeaders({commit}) {
      Vue.axios.get('phonemes/headers/place').then(result => {
        commit('SAVE_HEADERS', result.data)
      }).catch(error => {
        throw new Error('API ${error}')
      })
    },
    loadMannerHeaders({commit}) {
      Vue.axios.get('phonemes/headers/manner').then(result => {
        commit('SAVE_BUF_HEADERS', result.data)
      }).catch(error => {
        throw new Error('API ${error}')
      })
    },
    loadGeneralDistinctiveFeatures({commit}) {
      Vue.axios.get('phonemes/parameters/general').then(result => {
        commit('SAVE_GENERAL_FEATURES', result.data)
      }).catch(error => {
        throw new Error('API ${error}')
      })
    },
    loadConsonantDistinctiveFeatures({commit}) {
      Vue.axios.get('phonemes/parameters/consonant').then(result => {
        commit('SAVE_CONSONANT_FEATURES', result.data)
      }).catch(error => {
        throw new Error('API ${error}')
      })
    },
    loadVowelDistinctiveFeatures({commit}) {
      Vue.axios.get('phonemes/parameters/vowel').then(result => {
        commit('SAVE_VOWEL_FEATURES', result.data)
      }).catch(error => {
        throw new Error('API ${error}')
      })
    }
  },
  computed: {
    axiosParams() {
      const params = new URLSearchParams();
      params.append('meaning',);
      return params;
    }
  }
})
