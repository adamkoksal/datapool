<template>
  <div class="hello">
    <div class="row">
      <div class="col-2">
        <div class="card">
          <div v-for="(value, propertyName) in fields" :key="propertyName">
            {{ propertyName }}: {{ value }}
          </div>
        </div>
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
          <input v-model="page" type="number" class="form-control input" />
          <button type="button" class="btn btn-success" @click="addField">
            Add
          </button>
          <button type="button" class="btn btn-danger" @click="clearFields">
            Clear
          </button>
        </div>
        <ApolloQuery
          :query="require('../graphql/GetCount.gql')"
          :variables="{ fields, page }"
        >
          <template slot-scope="{ result: { data } }">
            <div v-if="data" class="result apollo">
              {{ data.count }} records found...
            </div>
          </template>
        </ApolloQuery>
        <br>
        <ApolloQuery
          :query="require('../graphql/Persons.gql')"
          :variables="{ fields, page }"
        >
          <template slot-scope="{ result: { loading, error, data } }">
            <div v-if="loading" class="loading apollo">Loading...</div>

            <div v-else-if="error" class="error apollo">An error occured</div>

            <div v-else-if="data" class="result apollo">
              <div v-for="(person, index) in data.persons" :key="person._id">
                {{ ++index }}. {{ person.FirstName + " " + person.LastName }}
              </div>
            </div>

            <div v-else class="no-result apollo">No result :(</div>
          </template>
        </ApolloQuery>
      </div>
      <div class="col-2">
        <div class="card"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
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
      this.fields = { ...this.tempField, ...this.fields };
      this.tempField = {};
      this.prop = "";
      this.value = "";
    },
    clearFields() {
      this.fields = {};
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
  margin-right: 10px;
  margin-left: 10px;
}
.input {
  margin-right: 37px;
  margin-left: 37px;
}
</style>
