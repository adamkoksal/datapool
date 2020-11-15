<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col" v-for="(value, field) in fieldsShown" :key="field">
          {{ field }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in data" :key="row.BusinessEntityID">
        <th scope="row">{{ ++index + (page - 1) * 10 }}</th>
        <td>{{ row.FirstName }}</td>
        <td>{{ row.LastName }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Table",
  props: {
    data: Array,
    page: String,
  },
  data() {
    return {
      fieldsShown: { FirstName: "", LastName: "" },
    };
  },
  created() {
    this.$eventHub.$on("addShownField", (field) => {
      this.$set(this.fieldsShown, field, "");
    });

    this.$eventHub.$on("resetShownField", () => {
      Object.assign(this.$data, this.$options.data.call(this));
    });
  },
};
</script>

<style></style>
