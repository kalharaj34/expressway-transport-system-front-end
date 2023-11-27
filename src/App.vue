<template>
  <v-app>
    <SideMenuComponent v-if="!$route.meta.publicPage" />
    <AppBarComponent />
    <v-main class="app-body">
      <v-container fluid :fill-height="$route.meta.publicPage">
        <router-view />
        <v-overlay :value="overlay" z-index="500">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <v-snackbar
          v-if="message"
          :value="message"
          right
          :color="message ? message.type : ''"
          multi-line
          @input="handleSnackbarClose"
        >
          <v-icon>{{
            message && message.type == "success"
              ? "mdi-check-circle"
              : "mdi-close-circle"
          }}</v-icon>
          {{ message ? message.message : "" }}

          <template v-slot:action="{ attrs }">
            <v-icon @click="closeMessage" v-bind="attrs">mdi-close</v-icon>
          </template>
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBarComponent from "./components/layouts/AppBar.component.vue";
import SideMenuComponent from "./components/layouts/SideMenu.component.vue";
import authService from "@/services/auth.service";
export default {
  components: { AppBarComponent, SideMenuComponent },
  name: "App",
  computed: {
    overlay() {
      return this.$store.state.common.pendingRequestsCount > 0;
    },
    message() {
      return this.$store.state.common.notification;
    },
  },
  methods: {
    closeMessage() {
      this.$store.commit("common/REMOVE_NOTIFICATION");
    },
    handleSnackbarClose(input) {
      if (!input) {
        this.$store.commit("common/REMOVE_NOTIFICATION");
      }
    },
  },
  mounted() {
    authService
      .getUser()
      .then(() => {
        if (
          this.$store.getters["auth/isLoggedIn"] &&
          this.$route.meta.publicPage
        ) {
          this.$router.push({ name: "home" });
        }
      })
      .catch(() => {});
  },
};
</script>
