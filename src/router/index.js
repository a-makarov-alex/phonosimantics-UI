import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import WordLists from '../components/MeaningsList/MeaningsList'
import NormalityTable from '../components/NormalityTable/NormalityTable'
import Wordlists from '../components/Wordlists/Wordlists'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'Test',
      component: WordLists
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
    }
  ]
})
