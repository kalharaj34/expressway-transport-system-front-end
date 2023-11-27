<template>
  <v-card class="mx-auto rounded-lg mt-5" elevation="0" outlined>
    <v-card-text class="secondary-font pa-3">
      <v-form ref="RouteForm">
        <v-container class="mt-3">
          <v-row>
            <v-col cols="12" md="4">
              <p class="caption mb-0 primary--text font-weight-medium">
                {{ $t("inputs.name") }}
              </p>
              <v-text-field
                outlined
                dense
                validate-on-blur
                :rules="[$validator.required]"
                v-model="formData.name"
                hide-details="auto"
              />
            </v-col>

            <v-col cols="12" md="6">
              <p class="caption mb-0 primary--text font-weight-medium">
                {{ $t("inputs.description") }}
              </p>
              <v-text-field
                outlined
                dense
                validate-on-blur
                :rules="[$validator.required]"
                v-model="formData.description"
                hide-details="auto"
              />
            </v-col>

            <v-col cols="12" md="4">
              <p class="caption mb-0 primary--text font-weight-medium">
                {{ $t("inputs.start_location") }}
              </p>
              <v-select
                :items="routeLocations"
                item-text="name"
                item-value="id"
                outlined
                dense
                validate-on-blur
                :rules="[$validator.required]"
                v-model="formData.start_location_id"
                hide-details="auto"
              />
            </v-col>

            <v-col cols="12" md="4">
              <p class="caption mb-0 primary--text font-weight-medium">
                {{ $t("inputs.end_location") }}
              </p>
              <v-select
                :items="routeLocations"
                item-text="name"
                item-value="id"
                outlined
                dense
                validate-on-blur
                :rules="[$validator.required]"
                v-model="formData.end_location_id"
                hide-details="auto"
              />
            </v-col>

            <v-col cols="12" md="2">
              <p class="caption mb-0 primary--text font-weight-medium">
                {{ $t("inputs.distance") }}
              </p>
              <v-text-field
                outlined
                dense
                validate-on-blur
                :rules="[$validator.required]"
                v-model="formData.distance"
                hide-details="auto"
                type="number"
                min="0"
                max="1000"
              />
            </v-col>

            <v-col cols="12" class="d-flex justify-end">
              <v-btn
                class="text-capitalize mr-3"
                color="secondary"
                outlined
                :to="{ name: 'routes' }"
                exact
              >
                <v-icon small class="mr-1">mdi-cancel</v-icon>
                {{ $t("buttons.cancel") }}
              </v-btn>
              <v-btn
                class="text-capitalize"
                color="secondary"
                @click="handleSave"
              >
                <v-icon small class="mr-1">mdi-content-save</v-icon>
                {{ $t("buttons.save") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import generalService from "@/services/general.service";
import { Route } from "@/utilities/models.utility";
export default {
  name: "RouteForm",
  props: ["handleSubmit", "initialData"],
  data() {
    return {
      routeLocations: [],
      formData: { ...Route },
    };
  },
  mounted() {
    this.getRouteLocations();
  },
  watch: {
    initialData() {
      this.formData = this.initialData;
    },
  },
  methods: {
    getRouteLocations() {
      generalService.getAllRouteLocations().then((response) => {
        this.routeLocations = response.data;
      });
    },
    handleSave() {
      if (this.$refs.RouteForm.validate()) {
        this.handleSubmit(this.formData);
      }
    },
  },
};
</script>
