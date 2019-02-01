<template>
  <nav class="pagination is-rounded" role="navigation" aria-label="pagination">
    <!-- <a class="pagination-previous">Previous</a>
    <a class="pagination-next">Next page</a> -->
    <nuxt-link
    class="pagination-previous"
    :to="{ query: { page : meta.current_page - 1 } }"
    :disabled="meta.current_page == 1"
    >
    Previous
    </nuxt-link>
    <nuxt-link
    class="pagination-next"
    :to="{ query: { page : meta.current_page + 1 } }"
    :disabled="meta.current_page == meta.last_page"
    >
    Next
    </nuxt-link>
    <ul class="pagination-list">
      <!-- <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
      <li><span class="pagination-ellipsis">&hellip;</span></li>
      <li><a class="pagination-link" aria-label="Goto page 45">45</a></li>
      <li><a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
      <li><a class="pagination-link" aria-label="Goto page 47">47</a></li>
      <li><span class="pagination-ellipsis">&hellip;</span></li>
      <li><a class="pagination-link" aria-label="Goto page 86">86</a></li> -->
      <template v-if="section > 1">
        <li>
          <nuxt-link
          class="pagination-link"
          :to="{ query: Object.assign({}, queries, { page :1 }) }"
          >
          1
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
          class="pagination-ellipsis"
          :to="{ query: Object.assign({}, queries, { page : this.goBackASection() }) }"
          >
          &hellip;
        </nuxt-link>
        </li>
      </template>


      <li v-for="page in pages" :key="page">
        <nuxt-link
        class="pagination-link"
        :class="{ 'is-current' : meta.current_page === page }"
        :to="{ query: Object.assign({}, queries,{ page :page }) }"
        >
        {{page}}
        </nuxt-link>
      </li>

      <template v-if="section < sections">

        <li>
          <nuxt-link
          class="pagination-ellipsis"
          :to="{ query: Object.assign({}, queries, { page : this.goForwardASection() }) }"
          >
          &hellip;
        </nuxt-link>
        </li>
        <li>
          <nuxt-link
          class="pagination-link"
          :to="{ query: Object.assign({}, queries, { page : meta.last_page }) }"
          >
          {{ meta.last_page }}
        </nuxt-link>
        </li>

      </template>

    </ul>
  </nav>
</template>

<script>
import _ from 'lodash'
import qs from 'qs'
export default {
  props: ['meta'],
  data() {
    return {
      sectionPerPage: 4,
      queries: {}
    }
  },
  computed: {
    section () {
      return Math.ceil(this.meta.current_page / this.sectionPerPage)
    },
    sections() {
      return Math.ceil(this.meta.last_page / this.sectionPerPage)
    },
    lastPage() {
      let lastPage = ((this.section -1 ) * this.sectionPerPage) + this.sectionPerPage

      if (this.section === this.sections) {
          lastPage = this.meta.last_page
      }

      return lastPage
    },
    pages () {
      return _.range((this.section - 1) * this.sectionPerPage + 1, this.lastPage + 1)
    }
  },
  methods: {
      goBackASection() {
        return this.firstPageOfSection(this.section - 1)
      },
      goForwardASection(){
        return this.firstPageOfSection(this.section + 1)
      },
      firstPageOfSection(section){
        return (section - 1) * this.sectionPerPage + 1
      }
  }
}
</script>

<style lang="css" scoped>
.pagination-ellipsis {
  color: $pagination-ellipsis-color;
  pointer-events:visible;
}
</style>
