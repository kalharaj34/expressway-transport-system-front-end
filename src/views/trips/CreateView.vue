<template>
  <v-container>
    <div
      class="d-sm-flex d-xs-block justify-space-between align-center text-center"
    >
      <h1 class="primary--text">{{ $t("headings.createTrip") }}</h1>
    </div>
    <TripForm :handleSubmit="handleSave" :initialData="initialData" />
  </v-container>
</template>

<script>
import TripForm from "@/components/forms/TripForm.component.vue";
import tripService from "@/services/trips.service";
import { tripModel } from "@/utilities/models.utility";

export default {
  name: "CreateTripView",
  components: { TripForm },
  data() {
    return {
      initialData: { ...tripModel },
    };
  },
  methods: {
    handleSave(payload) {
      tripService.createTrip(payload).then(() => {
        this.$router.push({ name: "trips" });
      });
    },
  },
};
</script>
