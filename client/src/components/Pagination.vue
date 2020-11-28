<template>
  <div class="container" v-if="pageList.length">
    <div class="bottom left">
      <div id="result-count">{{ resultCount.toLocaleString() }} records found.</div>
    </div>
    <div class="bottom" >
      <div class="table-container">
        <nav>
          <ul class="pagination">
            <li class="page-item" @click="changePage(1)">
              <a class="page-link">
                <span>&laquo;</span>
              </a>
            </li>
            <li
              class="page-item"
              v-bind:class="{ active: n == page }"
              v-for="n in pageList"
              :key="n"
              @click="changePage(n)"
            >
              <a class="page-link">{{ n }}</a>
            </li>
            <li class="page-item" @click="changePage(pages)">
              <a class="page-link">
                <span>&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    resultCount: Number,
  },
  data() {
    return {
      page: 1,
    };
  },
  methods: {
    changePage(n) {
      this.page = n;
      this.$eventHub.$emit("changePage", n);
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.resultCount / 10);
    },
    pageList() {
      let list = [];
      let leftN = this.page - 2;
      let rightN = this.page + 2;

      if (leftN < 1) {
        leftN = 1;
        rightN = 5;
      }
      if (rightN > this.pages) {
        leftN = this.pages - 4;
        if (leftN < 1) leftN = 1;
        rightN = this.pages;
      }
      while (leftN <= rightN) {
        list.push(leftN++);
      }
      return list;
    },
  },
  created() {
    this.$eventHub.$on("changePage", (n) => {
      this.page = n;
    });
  },
};
</script>

<style>
a {
  cursor: pointer;
}

.bottom {
  position: fixed;
  bottom: 0;
  justify-content: center;
}

.left {
  left: 18vw;
}

#result-count {
  margin-bottom: 10px;
  font-weight: bold;
}

ul {
  margin-bottom: 0;
}

.page-link {
  color: #6c7ae0;
  border: none;
}

.page-item.active .page-link {
  background-color: #5e6cd4 !important;
  border-color: #4d5ab8;
}
</style>
