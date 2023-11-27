<template>
  <v-card class="mx-auto rounded-lg mt-5" elevation="0" outlined>
    <v-card-text class="secondary-font pa-3">
      <v-form ref="BusForm">
        <v-container class="mt-3">
          <v-row>
            <v-col cols="12" md="6">
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
                {{ $t("inputs.regNumber") }}
              </p>
              <v-text-field
                outlined
                dense
                validate-on-blur
                :rules="[$validator.required]"
                v-model="formData.reg_number"
                hide-details="auto"
              />
            </v-col>

            <v-col cols="12" md="6">
              <p class="caption mb-0 primary--text font-weight-medium">
                {{ $t("inputs.chassisNo") }}
              </p>
              <v-text-field
                outlined
                dense
                validate-on-blur
                :rules="[$validator.required]"
                v-model="formData.chassis_no"
                hide-details="auto"
              />
            </v-col>

            <v-col cols="12" md="6">
              <p class="caption mb-0 primary--text font-weight-medium">
                {{ $t("inputs.engineNo") }}
              </p>
              <v-text-field
                outlined
                dense
                validate-on-blur
                :rules="[$validator.required]"
                v-model="formData.engine_no"
                hide-details="auto"
              />
            </v-col>

            <v-col cols="12" md="6">
              <p class="caption mb-0 primary--text font-weight-medium">
                {{ $t("inputs.seatCount") }}
              </p>
              <v-text-field
                outlined
                dense
                validate-on-blur
                :rules="[$validator.required]"
                v-model="formData.seat_count"
                hide-details="auto"
                type="number"
                min="0"
                max="200"
              />
            </v-col>

            <v-col cols="12" md="6">
              <p class="caption mb-0 primary--text font-weight-medium">
                {{ $t("inputs.model") }}
              </p>
              <v-select
                :items="busModels"
                item-text="name"
                item-value="id"
                outlined
                dense
                validate-on-blur
                :rules="[$validator.required]"
                v-model="formData.bus_model_id"
                hide-details="auto"
              />
            </v-col>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn
                class="text-capitalize mr-3"
                color="secondary"
                outlined
                :to="{ name: 'buses' }"
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
import { BusModel } from "@/utilities/models.utility";
export default {
  name: "BusForm",
  props: ["handleSubmit", "initialData"],
  data() {
    return {
      busModels: [],
      formData: { ...BusModel },
    };
  },
  mounted() {
    this.getBusModels();
  },
  watch: {
    initialData() {
      this.formData = this.initialData;
    },
  },
  methods: {
    getBusModels() {
      generalService.getAllBusModels().then((response) => {
        this.busModels = response.data;
      });
    },
    handleSave() {
      if (this.$refs.BusForm.validate()) {
        this.handleSubmit(this.formData);
      }
    },
  },
};
</script>
