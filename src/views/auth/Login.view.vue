<template>
  <v-card max-width="90%" width="400" class="mx-auto my-auto" elevation="5">
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col cols="12 mt-15">
            <h2 class="text-center">{{ $t("headings.systemName") }}</h2>
          </v-col>
          <v-col cols="12" class="d-flex">
            <v-icon size="100" class="mx-auto text-center primary--text">
              mdi-account-circle
            </v-icon>
          </v-col>
          <v-col cols="12">
            <p class="caption mb-0 primary--text font-weight-medium">
              {{ $t("inputs.email") }}
            </p>
            <v-text-field
              v-model="formData.email"
              :label="$t('inputs.email')"
              outlined
              dense
              hide-details="auto"
              single-line
              validate-on-blur
              :rules="[$validator.required]"
            />
          </v-col>
          <v-col cols="12">
            <p class="caption mb-0 primary--text font-weight-medium">
              {{ $t("inputs.password") }}
            </p>
            <v-text-field
              v-model="formData.password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              :label="$t('inputs.password')"
              @click:append="showPassword = !showPassword"
              outlined
              dense
              hide-details="auto"
              single-line
              validate-on-blur
              :rules="[$validator.required]"
            />
          </v-col>
          <v-col cols="12" align="center">
            <v-btn
              color="primary text-none"
              @click="handleLogin"
              class="ml-auto"
            >
              {{ $t("buttons.signIn") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import authService from "@/services/auth.service";
export default {
  name: "LoginView",
  data: () => ({
    formData: {
      email: "",
      password: "",
    },
    showPassword: false,
  }),
  methods: {
    handleLogin() {
      if (this.$refs.form.validate()) {
        authService.login(this.formData).then(() => {
          this.$router.push({ name: "home" });
        });
      }
    },
  },
};
</script>
