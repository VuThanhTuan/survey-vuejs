<template>
  <div id="app">
    <Servey/>
  </div>
</template>

<script>
import Servey from './components/survey/Survey'

export default {
  name: 'App',
  components: {
    Servey
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 80%;
  margin: 60px auto;
}
</style>
