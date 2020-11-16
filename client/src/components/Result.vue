<template>
  <div>
    <ApolloQuery
      :query="require('../graphql/Persons.gql')"
      :variables="{ fields, page }"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">Loading...</div>

        <div v-else-if="error" class="error apollo">An error occurred</div>

        <div v-else-if="data" class="result apollo">
          <div v-if="data.persons.length == 0">No records found</div>
          <Table :data="data.persons" />
        </div>

        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
    <br />
    <ApolloQuery
      :query="require('../graphql/GetCount.gql')"
      :variables="{ fields, page }"
    >
      <template slot-scope="{ result: { data } }">
        <div v-if="data" class="result apollo">
          <Pagination :resultCount="data.count" v-on="$listeners" />
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import Pagination from "./Pagination";
import Table from "./Table";
export default {
  name: "Result",
  props: {
    fields: Object,
  },
  components: {
    Pagination,
    Table,
  },
  data() {
    return {
      page: 1,
    };
  },
  created() {
    this.$eventHub.$on("changePage", (n) => {
      this.page = n;
    });
  },
};
</script>

<style></style>
