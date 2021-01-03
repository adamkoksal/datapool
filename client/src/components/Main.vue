<template>
  <div>
    <NavBar />
    <div id="row">
      <div class="col2">
        <SearchFields
          :fields="fields"
          @clear="fields = {}"
          @remove="$delete(fields, $event)"
        />
      </div>
      <div class="col8">
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
      </div>
      <div class="col2">
        <ResultFields />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar";
import Result from "./Result";
import ResultFields from "./ResultFields";
import SearchFields from "./SearchFields";
import pdfFonts from "pdfmake/build/vfs_fonts";
import pdfMake from "pdfmake/build/pdfmake";

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
    requestFieldsShown(type) {
      this.$eventHub.$emit("requestFieldsShown", type);
    },
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
    async downloadCSV(fieldsShown) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields: this.fields, fieldsShown }),
      };
      await fetch(`${this.$url}/download/csv`, requestOptions).then(
        async (data) => {
          const csvData = (await data.json()).data;
          const blob = new Blob([csvData], { type: "text/csv" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.setAttribute("hidden", "");
          a.setAttribute("href", url);
          a.setAttribute("download", "download.csv");
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      );
    },
    async downloadPDF(fieldsShown) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields: this.fields, fieldsShown }),
      };
      await fetch(`${this.$url}/download/pdf`, requestOptions).then(
        async (data) => {
          const body = (await data.json()).data;
          pdfMake.vfs = pdfFonts.pdfMake.vfs;
          let docDefinition = {
            pageSize: { width: 1800, height: 900 },
            pageOrientation: "landscape",
            content: [{ table: { body } }],
          };
          if (body[0].length < 6) docDefinition.pageSize = "A4";
          pdfMake.createPdf(docDefinition).download("download");
        }
      );
    },
  },
  created() {
    this.$eventHub.$on("changePage", (n) => {
      this.page = n;
    });
    this.$eventHub.$on("getFieldsShown", (fieldsShown, type) => {
      if (type === "csv") this.downloadCSV(fieldsShown);
      else this.downloadPDF(fieldsShown);
    });
    this.$eventHub.$on("download", (details) => {
      if (details === "pdf") this.downloadPDF();
      if (details === "csv") this.downloadCSV();
      if (details === "req-pdf") this.requestFieldsShown('pdf');
      if (details === "req-csv") this.requestFieldsShown('csv');
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
  margin: 0 10px;
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

#row {
  display: flex;
  flex-wrap: wrap;
}

.col2 {
  flex: 10%;
  max-width: 240px;
}

.col8 {
  flex: 60%;
  margin: 0 20px;
}

@media (max-width: 1300px) {
  #row {
    flex-direction: column;
  }
  .col8 {
    order: 1;
  }
  .col2 {
    order: 2;
    margin-bottom: 20px;
  }
}
</style>
