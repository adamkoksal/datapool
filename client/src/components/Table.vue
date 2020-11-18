<template>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th scope="col" style="width: 6.7%">#</th>
        <th
          scope="col"
          @dragstart="dragField = field"
          @dragend="move"
          @dblclick="removeField(field)"
          id="move"
          v-for="field in fieldsShown"
          :key="field"
          draggable
        >
          <div class="container">
            <div class="dropzone" @dragover="dragover(field, 1, $event)" />
            <div class="col-name" @dragover="dragover(field, 1, $event)">
              {{ field }}
            </div>
            <div class="dropzone" @dragover="dragover(field, 0, $event)" />
          </div>
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
      dragField: null,
      dragPosition: null,
      dragTo: null,
    };
  },
  methods: {
    move() {
      const from = this.findIndex(this.dragField);
      let to = this.findIndex(this.dragTo);
      if (!this.dragPosition) ++to;
      this.fieldsShown.splice(to, 0, this.fieldsShown.splice(from, 1)[0]);
    },
    removeField(field) {
      const noDelete = ["FirstName", "LastName"];
      if (!noDelete.includes(field)) {
        const rmItem = this.findIndex(field);
        this.fieldsShown.splice(rmItem, 1);
      }
    },
    dragover(field, position, $event) {
      $event.preventDefault();
      this.dragPosition = position;
      this.dragTo = field;
    },
    findIndex(field) {
      return this.fieldsShown.findIndex((element) => element == field);
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

<style>
#move {
  cursor: move;
  padding: 0;
}

.dropzone {
  margin: 0px;
  padding: 0px;
  width: 130px;
  height: 20px;
}

.container {
  margin: 0px;
  display: table;
  height: 50px;
}

.dropzone {
  display: table-cell;
}

.col-name {
  padding-top: 12px;
}
</style>
