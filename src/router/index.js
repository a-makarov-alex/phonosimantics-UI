import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import NormalityTable from '../components/NormalityTable/NormalityTable'
import Wordlists from '../components/Wordlists/Wordlists'
import MeaningsList from '../components/MeaningsList/MeaningsList'
import Wordlist from '../components/Wordlist/Wordlist'
import LanguagePage from '../components/Language/LanguagePage'
import Phonemes from '../components/Phonemes/Phonemes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/normality',
      name: 'Normality',
      component: NormalityTable
    },
    {
      path: '/wordlists',
      name: 'Wordlists',
      component: Wordlists
    },
    {
      path: '/meanings',
      name: 'Meanings',
      component: MeaningsList
    },
    {
      path: '/wordlists/:meaning',
      name: 'Wordlist',
      component: Wordlist
    },
    {
      path: '/languages/:language',
      name: 'Language',
      component: LanguagePage
    },
    {
      path: '/phonemes',
      name: 'Phonemes',
      component: Phonemes
    }
  ],
  watch: {
  }
})
