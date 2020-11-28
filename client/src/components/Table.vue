<template>
  <div v-if="data.length" class="table-container scroll">
    <table class="table table-borderless">
      <thead class="thead">
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
            <div class="line">
              <div class="container">
                <div class="dropzone" @dragover="dragover(field, 1, $event)" />
                <div @dragover="dragover(field, 1, $event)">
                  {{ field }}
                </div>
                <div class="dropzone" @dragover="dragover(field, 0, $event)" />
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="row.BusinessEntityID">
          <td scope="row">{{ ++index + (page - 1) * 10 }}</td>
          <td v-for="field in fieldsShown" :key="field">
            <div class="line">
              {{ row[`${field}`] }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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
      const rmItem = this.findIndex(field);
      this.fieldsShown.splice(rmItem, 1);
      this.$eventHub.$emit("removeShownField", field);
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
  padding-top: 0;
  padding-bottom: 0;
}

.dropzone {
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 60px;
}

.line {
  margin-right: 20px;
  width: 100%;
}

.scroll {
  overflow-x: auto;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
