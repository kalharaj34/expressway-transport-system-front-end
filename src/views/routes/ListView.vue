<template>
  <v-container>
    <div
      class="d-sm-flex d-xs-block justify-space-between align-center text-center"
    >
      <h1 class="primary--text">{{ $t("headings.manageRoutes") }}</h1>
      <v-btn
        color="secondary"
        dark
        class="text-capitalize mt-2"
        elevation="0"
        :to="{ name: 'createRoute' }"
        v-permissions="'store_route'"
      >
        <v-icon small class="mr-1">mdi-plus</v-icon>
        {{ $t("buttons.createNew") }}
      </v-btn>
    </div>
    <DataTable
      :headers="headers"
      :serviceFunction="routesService.getRoutes"
      ref="routesTable"
    >
      <template v-slot:actions="{ item }">
        <ActionsMenu
          :item="item"
          :handleEdit="{ name: 'editRoute', params: { id: item.id } }"
          :handleDelete="handleDelete"
          editPermission="update_route"
          deletePermission="destroy_route"
          :permissions="['update_route', 'destroy_route']"
        />
      </template>
      <template v-slot:start_location="{ item }">
        {{ item.start_location.name }}
      </template>
      <template v-slot:end_location="{ item }">
        {{ item.end_location.name }}
      </template>
    </DataTable>
    <ConfirmationAlert ref="deleteConfirmation" />
  </v-container>
</template>

<script>
import routesService from "@/services/routes.service";
import DataTable from "@/components/layouts/DataTable.component.vue";
import ConfirmationAlert from "@/components/layouts/ConfirmationAlert.component.vue";
import ActionsMenu from "@/components/layouts/ActionsMenu.component.vue";
import functionsUtility from "@/utilities/functions.utility";

export default {
  components: { DataTable, ConfirmationAlert, ActionsMenu },
  data() {
    return {
      headers: [
        { text: this.$t("inputs.name"), value: "name" },
        { text: this.$t("inputs.description"), value: "description" },
        {
          text: this.$t("inputs.start_location"),
          value: "start_location",
        },
        { text: this.$t("inputs.end_location"), value: "end_location" },
        { text: this.$t("inputs.distance"), value: "distance" },

        { value: "actions" },
      ],
      routesService,
      functionsUtility,
    };
  },
  methods: {
    handleDelete(item) {
      this.$refs.deleteConfirmation
        .open(
          this.$t("headings.areYouSure"),
          this.$t("texts.doYouWantToDeleteItem", { item: item.name }),
          {
            color: "error",
          }
        )
        .then((confirm) => {
          if (confirm) {
            routesService.deleteRoute(item.id).then(() => {
              this.$refs.routesTable.getItems();
            });
          }
        });
    },
  },
};
</script>
