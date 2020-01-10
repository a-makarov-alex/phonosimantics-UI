import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import WordLists from '../components/MeaningsList/WordLists'
import NormalityTable from '../components/NormalityTable/NormalityTable'

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
    }
  ]
})
