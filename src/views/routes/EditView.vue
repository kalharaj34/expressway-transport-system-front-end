<template>
  <v-container>
    <div
      class="d-sm-flex d-xs-block justify-space-between align-center text-center"
    >
      <h1 class="primary--text">{{ $t("headings.editRoute") }}</h1>
    </div>
    <RouteForm :handleSubmit="handleSave" :initialData="initialData" />
  </v-container>
</template>

<script>
import RouteForm from "@/components/forms/RouteForm.component.vue";
import routeService from "@/services/routes.service";
import functionsUtilities from "@/utilities/functions.utility";
import { routeModel } from "@/utilities/models.utility";

export default {
  name: "EditRouteView",
  components: { RouteForm },
  data() {
    return {
      initialData: { ...routeModel },
    };
  },
  mounted() {
    this.getRoute();
  },
  methods: {
    getRoute() {
      routeService.getRoute(this.$route.params.id).then((response) => {
        this.initialData = functionsUtilities.copyValues(
          response.data,
          this.initialData
        );
        this.initialData.start_location_id = response.data.start_location.id;
        this.initialData.end_location_id = response.data.end_location.id;
      });
    },
    handleSave(payload) {
      routeService.updateRoute(this.$route.params.id, payload).then(() => {
        this.$router.push({ name: "routes" });
      });
    },
  },
};
</script>
