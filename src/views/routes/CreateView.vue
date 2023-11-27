<template>
  <v-container>
    <div
      class="d-sm-flex d-xs-block justify-space-between align-center text-center"
    >
      <h1 class="primary--text">{{ $t("headings.createRoute") }}</h1>
    </div>
    <RouteForm :handleSubmit="handleSave" :initialData="initialData" />
  </v-container>
</template>

<script>
import RouteForm from "@/components/forms/RouteForm.component.vue";
import routesService from "@/services/routes.service";
import { routeModel } from "@/utilities/models.utility";

export default {
  name: "CreateRouteView",
  components: { RouteForm },
  data() {
    return {
      initialData: { ...routeModel },
    };
  },
  methods: {
    handleSave(payload) {
      routesService.createRoute(payload).then(() => {
        this.$router.push({ name: "routes" });
      });
    },
  },
};
</script>
