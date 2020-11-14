<template>
  <div>
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
    <br />
    <ApolloQuery
      :query="require('../graphql/Persons.gql')"
      :variables="{ fields, page }"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">Loading...</div>

        <div v-else-if="error" class="error apollo">An error occured</div>

        <div v-else-if="data" class="result apollo">
          <div v-for="(person, index) in data.persons" :key="person._id">
            {{ ++index + ((page-1)*10) }}. {{ person.FirstName + " " + person.LastName }}
          </div>
        </div>

        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
export default {
  name: "Result",
  props: {
    fields: Object,
    page: String,
  },
};
</script>

<style></style>
