<template>
  <v-card class="mx-auto rounded-lg mt-5" elevation="0" outlined>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        :label="$t('inputs.search')"
        hide-details
        outlined
        dense
        clearable
        class="col-sm-6 col-12"
      ></v-text-field>
    </v-card-title>
    <v-card-text class="secondary-font pa-3">
      <v-data-table
        :headers="
          headers.map((header) => ({
            ...header,
            class: 'primary--text',
          }))
        "
        :items="items"
        :page="pagination.page"
        :server-items-length="pagination.itemsLength"
        :items-per-page="pagination.itemsPerPage"
        :footer-props="{
          itemsPerPageOptions: [10, 25, 50, 100],
        }"
        :disable-sort="true"
        @pagination="handlePagination"
      >
        <template
          v-for="header in headers"
          v-slot:[getFieldName(header.value)]="{ item }"
        >
          <slot :name="header.value" v-bind:item="item">{{
            item[header.value]
          }}</slot>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DataTable",
  props: ["headers", "serviceFunction"],
  data() {
    return {
      items: [],
      search: null,
      pagination: {
        itemsLength: 0,
        itemsPerPage: 10,
        page: 1,
        pageCount: 0,
        pageStart: 0,
        pageStop: 0,
      },
    };
  },
  watch: {
    search() {
      this.pagination.page = 1;
      this.getItems();
    },
  },
  mounted() {
    this.getItems();
  },
  methods: {
    getItems() {
      this.serviceFunction({
        pagination: this.pagination,
        filter: this.search,
      }).then((response) => {
        this.items = response.data;
        this.pagination = response.meta;
        this.$emit("updateArray", this.items);
      });
    },
    handlePagination(newPagination) {
      const { page, itemsPerPage } = this.pagination;
      this.pagination = newPagination;
      if (
        newPagination.page !== page ||
        newPagination.itemsPerPage !== itemsPerPage
      ) {
        this.getItems();
      }
    },
    getFieldName: (field) => `item.${field}`,
  },
};
</script>
