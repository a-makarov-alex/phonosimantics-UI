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
      /*{definition: 'def1'},
      {definition: 'def2'},
      {definition: 'def3'}*/
    ]
  },
  mutations: {
    SAVE_LANGUAGE (state, language) {
      state.language = language
    },
    SAVE_MEANINGS (state, meanings) {
      state.meanings = meanings
    }
  },
  actions: {
    loadLanguage({commit}) {
      Vue.axios.get('language').then(result => {
        commit('SAVE_LANGUAGE', result.data)
      }).catch(error => {
        throw new Error('API ${error}')
      })
    },
    loadMeanings({commit}) {
      Vue.axios.get('meanings').then(result => {
        commit('SAVE_MEANINGS', result.data)
      }). catch(error => {
        throw new Error('API ${error}')
      })
    }
  }
})
