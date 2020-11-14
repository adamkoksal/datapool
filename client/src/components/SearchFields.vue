<template>
  <div class="card">
    <div
      v-for="(value, propertyName) in fields"
      :key="propertyName"
      class="field"
      @click="clearField(propertyName)"
    >
      <p class="font-weight-bold">{{ propertyName }}: {{ value }}</p>
    </div>
    <button
      type="button"
      id="clr-btn"
      class="btn btn-danger"
      @click="clearAllFields"
    >
      Clear
    </button>
  </div>
</template>

<script>
export default {
  name: "SearchFields",
  props: {
    fields: Object,
  },
  methods: {
    clearAllFields() {
      this.$emit("clear", {});
    },
    clearField(key) {
      this.$emit("remove", key);
    },
  },
};
</script>

<style>
.card {
  height: 500px;
  padding: 20px;
}

.field:hover {
  color: red;
  cursor: pointer;
}

#clr-btn {
  position: absolute;
  bottom: 15px;
  width: 80%;
}
</style>
