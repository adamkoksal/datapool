<template>
  <div id="app">
    <Main />
  </div>
</template>

<script>
import "../scss/custom.scss";
import "jquery/src/jquery.js";
import "bootstrap/dist/js/bootstrap.min.js";
import Main from "./components/Main";

export default {
  name: "App",
  components: {
    Main,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif, Lato;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100vh;
  overflow-x: hidden;
}
</style>
