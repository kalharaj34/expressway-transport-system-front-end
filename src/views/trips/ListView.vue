<template>
  <v-container>
    <div
      class="d-sm-flex d-xs-block justify-space-between align-center text-center"
    >
      <h1 class="primary--text">{{ $t("headings.manageTrips") }}</h1>
      <v-btn
        color="secondary"
        dark
        class="text-capitalize mt-2"
        elevation="0"
        :to="{ name: 'createTrip' }"
        v-permissions="'store_trip'"
      >
        <v-icon small class="mr-1">mdi-plus</v-icon>
        {{ $t("buttons.createNew") }}
      </v-btn>
    </div>
    <DataTable
      :headers="headers"
      :serviceFunction="tripsService.getTrips"
      ref="tripsTable"
    >
      <template v-slot:actions="{ item }">
        <ActionsMenu
          :item="item"
          :handleEdit="{ name: 'editTrip', params: { id: item.id } }"
          :handleDelete="handleDelete"
          editPermission="update_trip"
          deletePermission="destroy_trip"
          :permissions="['update_trip', 'destroy_trip']"
        />
      </template>
      <template v-slot:bus="{ item }">
        {{ item.bus.name }} - {{ item.bus.reg_number }}
      </template>
      <template v-slot:route="{ item }">
        {{ item.route.name }}
      </template>
    </DataTable>
    <ConfirmationAlert ref="deleteConfirmation" />
  </v-container>
</template>

<script>
import tripsService from "@/services/trips.service";
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
        { text: this.$t("inputs.start_time"), value: "start_time" },
        { text: this.$t("inputs.end_time"), value: "end_time" },

        { text: this.$t("inputs.bus"), value: "bus" },
        { text: this.$t("inputs.route"), value: "route" },

        { value: "actions" },
      ],
      tripsService,
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
            tripsService.deleteTrip(item.id).then(() => {
              this.$refs.tripsTable.getItems();
            });
          }
        });
    },
  },
};
</script>
