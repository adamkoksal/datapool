<template>
  <div class="hello">
    <div class="row">
      <div class="col-3" />
      <div class="col">
        <label>Prop</label>
        <input v-model="prop" />
        <p class="float-left">prop => {{ prop }}</p>
      </div>
      <div class="col">
        <label>Value</label>
        <input v-model="value" />
        <p class="float-left">value => {{ value }}</p>
      </div>
      <div class="col">
        <label>Page</label>
        <input v-model="Page" />
        <p class="float-left">page => {{ Page }}</p>
      </div>
      <div class="col-3" />
    </div>
    <ApolloQuery
      :query="require('../graphql/Persons.gql')"
      :variables="{ FirstName, Page }"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <div v-for="(person, index) in data.Persons" :key="person._id">
            {{ ++index }} {{ person.FirstName + " " + person.LastName }}
          </div>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
// import gql from "graphql-tag";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data: () => {
    return { FirstName: "", prop: "", value: "", Page: 2 };
  },
  watch: {
    value () {
      this.FirstName = this.value 
    },
    Page () {
      this.Page = +this.Page
    }
  },
  methods: {},
};
``;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
