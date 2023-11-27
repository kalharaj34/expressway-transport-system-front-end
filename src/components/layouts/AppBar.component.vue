<template>
  <v-app-bar app color="primary" clipped-left dense dark>
    <v-app-bar-nav-icon
      @click="handleDrawerOpen"
      v-if="$vuetify.breakpoint.mobile"
      id="#navigationToggler"
    >
    </v-app-bar-nav-icon>
    <v-toolbar-title class="h1">{{
      `${$t("headings.systemName")}`
    }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <span v-if="!$vuetify.breakpoint.mobile">
      {{ time }}
    </span>
    <v-btn icon v-if="!$route.meta.publicPage">
      <v-icon size="large">mdi-bell</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBarComponent",
  data() {
    return {
      interval: null,
      time: this.$moment().format("dddd, D MMMM YYYY h:mm:ss A"),
    };
  },
  methods: {
    handleDrawerOpen() {
      this.$store.commit("common/SET_DRAWER_OPEN", true);
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  created() {
    this.interval = setInterval(() => {
      this.time = this.$moment().format("dddd, D MMMM YYYY h:mm:ss A");
    }, 1000);
  },
};
</script>
