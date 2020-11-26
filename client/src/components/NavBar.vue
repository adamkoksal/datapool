<template>
  <nav class="navbar navbar-light table-container">
    <span class="navbar-brand">
      <img src="../assets/cover.png" height="80px"/>
    </span>
  </nav>
</template>

<script>
export default {
  name: "navbar",
};
</script>

<style>
.navbar {
  padding: 0px;
  border-bottom: 2px solid rgb(211, 208, 208);
  margin-bottom: 20px;
}
.navbar-brand {
  margin-left: 100px;
}
.navbar.table-container {
  border-radius: 0;
}
</style>
