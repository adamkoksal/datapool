<template>
  <div class="card table-container" id="field-card">
    <div
      v-for="(value, propertyName) in fields"
      :key="propertyName"
      @click="clearField(propertyName)"
    >
      <button
        type="button"
        class="btn btn-light btn-block tiptool"
        id="field-btn"
      >
        {{ propertyName }}: {{ value }}
        <span class="tooltiptext">Delete</span>
      </button>
    </div>
    <div v-if="Object.keys(fields).length == 0">No filters </div>
    <button
      type="button"
      id="clr-btn"
      class="btn btn-danger"
      @click="clearAllFields"
    >
      Clear Filters
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
#field-card {
  height: 75vh;
  padding: 20px;
  margin-left: 10px;
  margin-right: 10px;
}

#field-btn:hover {
  background-color: rgb(220, 53, 69);
  color: white;
}

#field-btn {
  margin-bottom: 10px;
}

#clr-btn {
  position: absolute;
  bottom: 15px;
  width: 80%;
}

</style>
