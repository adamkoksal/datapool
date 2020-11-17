<template>
  <div class="hello">
    <div class="row">
      <div class="col-2">
        <SearchFields
          :fields="fields"
          v-on:clear="fields = {}"
          v-on:remove="$delete(fields, $event)"
        />
      </div>
      <div class="col-8">
        <div class="row" style="margin-bottom: 20px">
          <div class="input-group" id="input">
            <select class="custom-select" v-model="prop">
              <option v-for="x in selectFields" :value="x" :key="x">
                {{ x }}
              </option>
            </select>
          </div>
          <input v-model="value" class="form-control" id="input" />
          <button
            type="button"
            class="btn btn-success btn-sm"
            @click="addField"
          >
            Add
          </button>
        </div>
        <Result :fields="fields" />
      </div>
      <div class="col-2">
        <ResultFields />
      </div>
    </div>
  </div>
</template>

<script>
import Result from "./Result";
import SearchFields from "./SearchFields";
import ResultFields from "./ResultFields";

export default {
  name: "Main",
  components: {
    Result,
    SearchFields,
    ResultFields,
  },
  data: () => {
    return {
      prop: null,
      value: "",
      page: 1,
      fields: {},
      tempField: {},
      selectFields: [
        "BusinessEntityID",
        "FirstName",
        "MiddleName",
        "LastName",
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
  watch: {
    prop() {
      this.tempField = {};
      this.tempField[`${this.prop}`] = this.value;
    },
    value() {
      this.tempField[`${this.prop}`] = this.value;
    },
  },
  methods: {
    addField() {
      this.fields = { ...this.fields, ...this.tempField };
      this.tempField = {};
      this.prop = "";
      this.value = "";
      this.page = 1;
      this.$eventHub.$emit("changePage", 1);
    },
  },
  created() {
    this.$eventHub.$on("changePage", (n) => {
      this.page = n;
    });
  },
};
</script>

<style scoped>
p {
  padding-left: 15px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input {
  width: 200px;
}
.input-group {
  width: 200px;
}

#input {
  margin-right: 37px;
  margin-left: 37px;
}
</style>
