<template>
  <div class="bottom">
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
        <div class="result">Result count: {{ resultCount }}</div>
      </ul>
    </nav>
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
    increasePage() {
      ++this.page;
    },
    changePage(n) {
      this.page = n;
      this.$emit("changePage", n);
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
};
</script>

<style>
a {
  cursor: pointer;
}

.bottom {
  position: fixed;
  bottom: 0;
}

.result {
  margin: 7px 0 0 20px;
}
</style>
