<template>
  <v-container>
    <div
      class="d-sm-flex d-xs-block justify-space-between align-center text-center"
    >
      <h1 class="primary--text">{{ $t("headings.manageBuses") }}</h1>
      <v-btn
        color="secondary"
        dark
        class="text-capitalize mt-2"
        elevation="0"
        :to="{ name: 'createBus' }"
        v-permissions="'store_bus'"
      >
        <v-icon small class="mr-1">mdi-plus</v-icon>
        {{ $t("buttons.createNew") }}
      </v-btn>
    </div>
    <DataTable
      :headers="headers"
      :serviceFunction="busesService.getBuses"
      ref="busesTable"
    >
      <template v-slot:actions="{ item }">
        <ActionsMenu
          :item="item"
          :handleEdit="{ name: 'editBus', params: { id: item.id } }"
          :handleDelete="handleDelete"
          editPermission="update_bus"
          deletePermission="destroy_bus"
          :permissions="['update_bus', 'destroy_bus']"
        />
      </template>
      <template v-slot:model="{ item }">
        {{ item.name }}
      </template>
    </DataTable>
    <ConfirmationAlert ref="deleteConfirmation" />
  </v-container>
</template>

<script>
import busesService from "@/services/buses.service";
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
        { text: this.$t("inputs.regNumber"), value: "reg_number" },
        { text: this.$t("inputs.chassisNo"), value: "chassis_no" },
        { text: this.$t("inputs.engineNo"), value: "engine_no" },
        { text: this.$t("inputs.seatCount"), value: "seat_count" },
        { text: this.$t("inputs.model"), value: "model" }, // need to fix

        { value: "actions" },
      ],
      busesService,
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
            busesService.deleteBus(item.id).then(() => {
              this.$refs.busesTable.getItems();
            });
          }
        });
    },
  },
};
</script>
