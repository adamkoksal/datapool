<template>
  <div class="hello">
    {{ fields }}
    <div class="row">
      <div class="col-2">
        <SearchFields
          :fields="fields"
          v-on:clear="fields = {}"
          v-on:remove="$delete(fields, $event)"
        />
      </div>
      <div class="col-8">
        <div class="row">
          <div class="input-group mb-3 input">
            <select class="custom-select" v-model="prop">
              <option v-for="x in selectFields" :value="x" :key="x">{{
                x
              }}</option>
            </select>
          </div>
          <input v-model="value" class="form-control input" />
          <input
            v-model="page"
            type="number"
            class="form-control input"
            min="1"
          />
          <button type="button" class="btn btn-success" @click="addField">
            Add
          </button>
        </div>
        <Result :fields="fields" :page="page" />
      </div>
      <div class="col-2">
        <div class="card"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Result from "./Result";
import SearchFields from "./SearchFields";

export default {
  name: "Main",
  components: {
    Result,
    SearchFields,
  },
  data: () => {
    return {
      prop: null,
      value: "",
      page: "1",
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
    },
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
.card {
  height: 500px;
}
input {
  width: 200px;
}
.mb-3 {
  width: 200px;
}
button {
  width: 75px;
}
.input {
  margin-right: 37px;
  margin-left: 37px;
}
</style>
