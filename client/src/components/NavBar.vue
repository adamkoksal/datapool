<template>
  <nav class="navbar navbar-light table-container">
    <span class="navbar-brand">
      <img src="../assets/logo.png" height="80px" />
      <div class="name">DATAPOOL</div>
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
  margin-left: 18vw;
  display: flex;
  align-items: center;
}
.name {
  margin: 0 0 0 15px;
  font-family: "Lato";
  font-size: 40px;
  font-weight: 300;
}
.navbar.table-container {
  border-radius: 0;
}
</style>
