<template>
  <v-container>
    <div
      class="d-sm-flex d-xs-block justify-space-between align-center text-center"
    >
      <h1 class="primary--text">{{ $t("headings.editTrip") }}</h1>
    </div>
    <TripForm :handleSubmit="handleSave" :initialData="initialData" />
  </v-container>
</template>

<script>
import TripForm from "@/components/forms/TripForm.component.vue";
import tripService from "@/services/trips.service";
import functionsUtilities from "@/utilities/functions.utility";
import { tripModel } from "@/utilities/models.utility";

export default {
  name: "EditTripView",
  components: { TripForm },
  data() {
    return {
      initialData: { ...tripModel },
    };
  },
  mounted() {
    this.getTrip();
  },
  methods: {
    getTrip() {
      tripService.getTrip(this.$route.params.id).then((response) => {
        this.initialData = functionsUtilities.copyValues(
          response.data,
          this.initialData
        );
        this.initialData.bus_id = response.data.bus.id;
        this.initialData.route_id = response.data.route.id;
      });
    },
    handleSave(payload) {
      tripService.updateTrip(this.$route.params.id, payload).then(() => {
        this.$router.push({ name: "trips" });
      });
    },
  },
};
</script>
