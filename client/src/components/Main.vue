<template>
  <div>
    <NavBar />
    <div class="row">
      <div class="col-2">
        <SearchFields
          :fields="fields"
          @clear="fields = {}"
          @remove="$delete(fields, $event)"
        />
      </div>
      <div class="col-8">
        <div class="row center">
          <div class="input-group table-container">
            <select class="custom-select" v-model="prop">
              <option value="0" selected disabled>Fields</option>
              <option v-for="field in selectFields" :value="field" :key="field">
                {{ field }}
              </option>
            </select>
          </div>
          <input
            v-model="value"
            class="form-control table-container"
            id="input"
            @keyup.enter="addField"
          />
          <div class="row checkbox">
            <input
              type="checkbox"
              class="regex"
              v-model="exactMatch"
              id="box"
            />
            <label for="box"> Exact Match </label>
          </div>
          <button
            type="button"
            class="btn btn-info table-container"
            id="filter-button"
            @click="addField"
            :disabled="!prop || !value"
          >
            Filter
          </button>
        </div>
        <Result :fields="fields" />
        <div class="btn-group dropup float-right">
          <button
            type="button"
            class="btn btn-success dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Download
          </button>
          <ul class="dropdown-menu">
            <li><button class="dropdown-item">Download as PDF</button></li>
            <li>
              <button class="dropdown-item" @click="downloadCSV()">
                Download as CSV
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-2">
        <ResultFields />
      </div>
    </div>
  </div>
</template>

<script>
import Result from "./Result";
import SearchFields from "./SearchFields";
import ResultFields from "./ResultFields";
import NavBar from "./NavBar";

export default {
  name: "Main",
  components: {
    Result,
    SearchFields,
    ResultFields,
    NavBar,
  },
  data: () => {
    return {
      prop: 0,
      value: "",
      page: 1,
      fields: {},
      exactMatch: true,
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
  methods: {
    addField() {
      if (!this.prop || !this.value) return;
      if (!this.exactMatch) this.value = "/" + this.value;
      this.fields = { ...this.fields, ...{ [this.prop]: this.value } };
      this.$eventHub.$emit("search", this.prop);
      this.$eventHub.$emit("changePage", 1);
      this.prop = null;
      this.value = "";
      this.page = 1;
      this.exactMatch = true;
    },
    async downloadCSV() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: 1, data2: 0 }),
      };
      await fetch(
        "http://localhost:4000/download",
        requestOptions
      ).then(async (data) => console.log(await data.json()));
    },
  },
  created() {
    this.$eventHub.$on("changePage", (n) => {
      this.page = n;
    });
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
input {
  height: 40px;
  width: 20vw;
  border: none;
  border-radius: 0.9vw;
}
.input-group {
  height: 40px;
  width: 20vw;
  border-radius: 0.9vw;
}

select {
  cursor: pointer;
}

.custom-select {
  border: none;
}

.center {
  margin: 0 20px;
  justify-content: space-between;
  margin-bottom: 20px;
}

#filter-button {
  width: 150px;
  height: 40px;
  font-weight: bold;
  border-radius: 10px;
}

.regex {
  height: 20px;
  width: 40px;
}
</style>
