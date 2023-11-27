<template>
  <v-container>
    <div
      class="d-sm-flex d-xs-block justify-space-between align-center text-center"
    >
      <h1 class="primary--text">{{ $t("headings.tripReport") }}</h1>
      <v-btn color="secondary" dark class="text-capitalize mt-2">
        <export-excel
          class="btn btn-default"
          :data="json_data"
          :fields="json_fields"
          worksheet="My Worksheet"
          name="Bus_schedule_report.xls"
          >Download Excel
        </export-excel>
      </v-btn>
    </div>

    <DataTable
      :headers="headers"
      :serviceFunction="tripsService.getTrips"
      ref="tripsTable"
      @updateArray="updateArray"
    >
      <template v-slot:bus="{ item }">
        {{ item.bus.name }} - {{ item.bus.reg_number }}
      </template>
      <template v-slot:route="{ item }">
        {{ item.route.name }}
      </template>
    </DataTable>
  </v-container>
</template>

<script>
import tripsService from "@/services/trips.service";
import DataTable from "@/components/layouts/DataTable.component.vue";
import functionsUtility from "@/utilities/functions.utility";

export default {
  components: { DataTable },
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
      json_fields: {
        [this.$t("inputs.name")]: "name",
        [this.$t("inputs.description")]: "description",
        [this.$t("inputs.start_time")]: "start_time",
        [this.$t("inputs.end_time")]: "end_time",
        [this.$t("inputs.bus")]: {
          field: "bus.name",
          callback: (value) => {
            return `Reg. number - ${value}`;
          },
        },
        [this.$t("inputs.route")]: {
          field: "route.name",
          callback: (value) => {
            return `${value}`;
          },
        },
      },
      json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
      tripsService,
      functionsUtility,
    };
  },
  methods: {
    updateArray(newArray) {
      this.json_data = newArray;
    },
  },
};
</script>
