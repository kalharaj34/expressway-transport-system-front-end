<template>
  <v-card class="mx-auto rounded-lg mt-5" elevation="0" outlined>
    <v-card-text class="secondary-font pa-3">
      <v-form ref="userForm">
        <v-container class="mt-3">
          <v-row>
            <v-col cols="12 d-flex">
              <v-avatar size="100" class="mx-auto">
                <img
                  :src="avatar"
                  :alt="`${formData.first_name} ${formData.last_name}`"
                />
              </v-avatar>
            </v-col>
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
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <p class="caption mb-0 primary--text font-weight-medium">
                {{ $t("inputs.username") }}
              </p>
              <v-text-field
                outlined
                dense
                validate-on-blur
                :rules="[$validator.required]"
                v-model="formData.username"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <p class="caption mb-0 primary--text font-weight-medium">
                {{ $t("inputs.email") }}
              </p>
              <v-text-field
                outlined
                dense
                validate-on-blur
                :rules="[$validator.required, $validator.email]"
                v-model="formData.email"
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <p class="caption mb-0 primary--text font-weight-medium">
                {{ $t("inputs.role") }}
              </p>
              <v-select
                :items="roles"
                item-text="name"
                item-value="id"
                outlined
                dense
                validate-on-blur
                :rules="[$validator.required]"
                v-model="formData.roles"
                hide-details="auto"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <p class="caption mb-0 primary--text font-weight-medium">
                {{ $t("inputs.image") }}
              </p>
              <v-file-input
                outlined
                dense
                validate-on-blur
                hide-details="auto"
                prepend-inner-icon="$file"
                prepend-icon=""
                show-size=""
                @change="handleFileChange"
              ></v-file-input>
            </v-col>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn
                class="text-capitalize mr-3"
                color="secondary"
                outlined
                :to="{ name: 'users' }"
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
import { userModel } from "@/utilities/models.utility";
export default {
  name: "UserForm",
  props: ["handleSubmit", "initialData", "avatar"],
  data() {
    return {
      roles: [],
      formData: { ...userModel },
    };
  },
  mounted() {
    this.getRoles();
  },
  watch: {
    initialData() {
      this.formData = this.initialData;
    },
  },
  methods: {
    getRoles() {
      generalService.getRoles().then((response) => {
        this.roles = response.data;
      });
    },
    handleSave() {
      if (this.$refs.userForm.validate()) {
        this.handleSubmit(this.formData);
      }
    },
    handleFileChange(file) {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          this.formData.image_file = reader.result;
        };
      } else {
        this.formData.image_file = null;
      }
    },
  },
};
</script>
