<template>
  <div class="card" id="result-field-card">
    <div v-for="(value, field) in allFields" :key="field">
      <button
        type="button"
        class="btn btn-light btn-xs btn-block"
        data-toggle="tooltip"
        title="Add"
        @click="addField(field)"
      >
        {{ field }}
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
      allFields: {
        BusinessEntityID: "",
        MiddleName: "",
        Title: "",
        AddressLine1: "",
        AddressLine2: "",
        City: "",
        PostalCode: "",
        AddressType: "",
        StateProvinceCode: "",
        CountryRegionCode: "",
        StateName: "",
        PhoneNumber: "",
        PhoneType: "",
        EmailAddress: "",
      },
    };
  },
  methods: {
    resetFields() {
      this.$eventHub.$emit("resetShownField");
      Object.assign(this.$data, this.$options.data.call(this));
    },
    addField(field) {
      this.$eventHub.$emit("addShownField", field);
      this.$delete(this.allFields, field);
    },
  },
};
</script>

<style>
#result-field-card {
  padding: 20px;
  height: 75vh;
}

.btn-xs {
  padding: 0.25rem 0.4rem;
  font-size: 0.875rem;
  line-height: 1;
  border-radius: 0.2rem;
  margin-bottom: 7px;
}
</style>
