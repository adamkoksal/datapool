<template>
  <div class="card table-container" id="result-field-card">
    <div v-for="field in allFields" :key="field">
      <button
        id="result-field"
        type="button"
        class="btn btn-light btn-xs btn-block tiptool"
        @click="addField(field)"
      >
        {{ field }}
        <span class="tooltiptext">Add</span>
      </button>
    </div>
    <button
      type="button"
      id="clr-btn"
      class="btn btn-danger btn-sm"
      @click="resetFields"
    >
      Reset Fields
    </button>
  </div>
</template>

<script>
export default {
  name: "ResultField",
  data() {
    return {
      allFields: [
        "BusinessEntityID",
        "MiddleName",
        "Title",
        "AddressLine1",
        "AddressLine2",
        "City",
        "PostalCode",
        "AddressType",
        "StateProvinceCode",
        "CountryRegionCode",
        "StateName",
        "PhoneNumber",
        "PhoneType",
        "EmailAddress",
      ],
    };
  },
  methods: {
    resetFields() {
      this.$eventHub.$emit("resetShownField");
      Object.assign(this.$data, this.$options.data.call(this));
    },
    addField(field) {
      this.$eventHub.$emit("addShownField", field);
      let rmItem = this.findIndex(field);
      this.allFields.splice(rmItem, 1);
    },
    findIndex(field) {
      return this.allFields.findIndex((element) => element == field);
    },
  },
  created() {
    this.$eventHub.$on("removeShownField", (field) => {
      this.allFields.push(field);
    });
    this.$eventHub.$on("search", (field) => {
      if (this.allFields.includes(field)) this.addField(field);
    });
  },
};
</script>

<style>
#result-field-card {
  min-height: 500px;
  padding: 20px;
  height: 75vh;
  margin-right: 10px;
  margin-left: 10px;
}

.btn-xs {
  padding: 0.25rem 0.4rem;
  font-size: 0.875rem;
  line-height: 1;
  border-radius: 0.2rem;
  margin-bottom: 10px;
}

#result-field:hover {
  background-color: #e7e2fa;
}
</style>
