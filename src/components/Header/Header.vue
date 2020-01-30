<template>
  <div class="header-line">
    <nav>
      <transition name="fade" mode="out-in">
        <i class="material-icons menu" v-if="!show" @click="show = !show" key="menu">menu</i>
        <i class="material-icons clear" v-else @click="show = !show" key="menu">clear</i>
      </transition>

      <transition name="fade">
        <ul v-if="show">
          <li v-for="item in items"><a :href="item.url">{{item.title}}</a></li>
        </ul>
      </transition>
    </nav>

    <h2>Phonosemantics-UI</h2>
  </div>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        show: false,
        items: [
          {title: 'Home', url: 'http://localhost:8080/#/wordlists/leaf'} ,
          {title: 'Meanings', url: 'http://localhost:8080/#/meanings'} ,
          {title: 'Normality', url: 'http://localhost:8080/#/normality'} ,
          {title: 'Phonemes', url: 'http://localhost:8080/#/phonemes'}
        ]
      }
    }
  }
</script>

<style scoped>
  @import url("https://fonts.googleapis.com/icon?family=Material+Icons");

  .header-line {
    width: 100%;
    height: 48px;
    background-color: cadetblue;
    display: flex;
    flex-direction: column;
  }

  nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background-color: cadetblue;
    position: relative;
    height: 48px;
  }

  ul {
    align-self: flex-start;
    background-color: #eee;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 48px;
  }

  li {
    align-items: flex-start;
    background: #eee;
    cursor: pointer;
    display: flex;
    font-size: 1.2em;
    height: 1em;
    justify-content: left;
    list-style-type: none;
    text-transform: uppercase;
    transition: all .3s ease;
    padding: 8px;
  }

  i:hover {
    color: burlywood;
  }

  li:hover {
    background-color: cadetblue;
    color: burlywood;
  }

  i {
    margin-left: 12px;
    cursor: pointer;
  }

  .header-line {
    width: 100%;
    height: 48px;
    background-color: cadetblue;
    display: flex;
    flex-direction: row;
  }

  h2 {
    margin-left: 5%;
    margin-bottom: auto;
    margin-top: auto;
  }
</style>
