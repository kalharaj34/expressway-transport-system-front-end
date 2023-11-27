<template>
  <v-container>
    <div
      class="d-sm-flex d-xs-block justify-space-between align-center text-center"
    >
      <h1 class="primary--text">{{ $t("headings.editBus") }}</h1>
    </div>
    <BusForm :handleSubmit="handleSave" :initialData="initialData" />
  </v-container>
</template>

<script>
import BusForm from "@/components/forms/BusForm.component.vue";
import busesService from "@/services/buses.service";
import functionsUtilities from "@/utilities/functions.utility";
import { busModel } from "@/utilities/models.utility";

export default {
  name: "EditBusView",
  components: { BusForm },
  data() {
    return {
      initialData: { ...busModel },
    };
  },
  mounted() {
    this.getBus();
  },
  methods: {
    getBus() {
      busesService.getBus(this.$route.params.id).then((response) => {
        this.initialData = functionsUtilities.copyValues(
          response.data,
          this.initialData
        );
        this.initialData.bus_model_id = response.data.model.id;
      });
    },
    handleSave(payload) {
      busesService.updateBus(this.$route.params.id, payload).then(() => {
        this.$router.push({ name: "buses" });
      });
    },
  },
};
</script>
