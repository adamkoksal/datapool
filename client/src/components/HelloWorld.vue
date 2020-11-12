<template>
  <div class="hello">
    <div>{{ fields }}</div>
    <div class="row">
      <div class="col-3" />
      <div class="col">
        <label>Prop</label>
        <input v-model="prop" class="form-control" />
        <p class="float-left">prop => {{ prop }}</p>
      </div>
      <div class="col">
        <label>Value</label>
        <input v-model="value" class="form-control" />
        <p class="float-left">value => {{ value }}</p>
      </div>
      <div class="col">
        <label>Page</label>
        <input v-model="Page" type="number" class="form-control" />
        <p class="float-left">page => {{ page }}</p>
      </div>
      <div class="col">
        <button type="button" class="btn btn-success" @click="addField">
          Add
        </button>
        <button type="button" class="btn btn-danger" @click="clearFields">
          Clear
        </button>
      </div>
      <div class="col-2" />
    </div>
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
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data: () => {
    return { prop: "", value: "", page: "1", fields: {}, tempField: {} };
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
button {
  margin-top: 30px;
}
</style>
