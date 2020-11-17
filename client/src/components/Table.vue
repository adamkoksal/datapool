<template>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th scope="col" style="width: 6.7%">#</th>
        <th scope="col" v-for="field in fieldsShown" :key="field">
          {{ field }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in data" :key="row.BusinessEntityID">
        <th scope="row">{{ ++index + (page - 1) * 10 }}</th>
        <td v-for="field in fieldsShown" :key="field">
          {{ row[`${field}`] }}
        </td>
      </tr>
    </tbody>
    <input v-model="from" />
    <input v-model="to" />
    <button @click="some">click</button>
  </table>
</template>

<script>
export default {
  name: "Table",
  props: {
    data: Array,
  },
  data() {
    return {
      fieldsShown: ["FirstName", "LastName"],
      page: 1,
      from: "", to: ""
    };
  },
  methods: {
    move() {
      this.fieldsShown.splice(this.to, 0, this.fieldsShown.splice(this.from, 1)[0]);
    },
  },
  created() {
    this.$eventHub.$on("addShownField", (field) => {
      this.fieldsShown.push(field);
    });

    this.$eventHub.$on("resetShownField", () => {
      Object.assign(this.$data, this.$options.data.call(this));
    });

    this.$eventHub.$on("changePage", (n) => {
      this.page = n;
    });
  },
};
</script>

<style></style>
