<template>
  <v-container>
    <div
      class="d-sm-flex d-xs-block justify-space-between align-center text-center"
    >
      <h1 class="primary--text">{{ $t("headings.createBus") }}</h1>
    </div>
    <BusForm :handleSubmit="handleSave" :initialData="initialData" />
  </v-container>
</template>

<script>
import BusForm from "@/components/forms/BusForm.component.vue";
import busesService from "@/services/buses.service";
import { busModel } from "@/utilities/models.utility";

export default {
  name: "CreateBusView",
  components: { BusForm },
  data() {
    return {
      initialData: { ...busModel },
    };
  },
  methods: {
    handleSave(payload) {
      busesService.createBus(payload).then(() => {
        this.$router.push({ name: "buses" });
      });
    },
  },
};
</script>
