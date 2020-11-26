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
        <div class="row center" style="margin-bottom: 20px">
          <div class="input-group table-container" id="input">
            <select class="custom-select" v-model="prop">
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
          <button
            type="button"
            class="btn btn-info"
            id="filter-button"
            @click="addField"
            :disabled="!prop || !value"
          >
            Filter
          </button>
        </div>
        <Result :fields="fields" />
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
      prop: null,
      value: "",
      page: 1,
      fields: {},
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
      this.fields = { ...this.fields, ...{ [this.prop]: this.value } };
      this.prop = null;
      this.value = "";
      this.page = 1;
      this.$eventHub.$emit("changePage", 1);
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
input {
  width: 20vw;
  border: none;
  border-radius: 0.9vw;
}
.input-group {
  width: 20vw;
  border-radius: 0.9vw;
}

.custom-select {
  border: none;
}

.center {
  margin: 0 20px; 
  justify-content: space-between;
}

#filter-button {
  width: 150px;
  font-weight: bold;
  border-radius: 10px;
}
</style>
