<template>
  <v-navigation-drawer
    app
    clipped
    :permanent="!$vuetify.breakpoint.mobile"
    :expand-on-hover="!$vuetify.breakpoint.mobile"
    :mini-variant="!$vuetify.breakpoint.mobile"
    :value="drawerOpen"
    ref="sideMenu"
    @transitionend="handleDrawerResize"
    @input="handleDrawerToggle"
    color="blue-grey darken-4"
  >
    <v-list class="my-10">
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-avatar size="44">
            <v-img alt="Profile Picture" contain :src="image" width="150" />
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-h6 grey--text text--lighten-5">
            {{ name }}
          </v-list-item-title>
          <v-list-item-subtitle class="grey--text text--lighten-5">{{
            email
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="grey lighten-1" />
    <v-list nav dense rounded>
      <v-list-item-group color="primary">
        <template v-for="menu in menus">
          <v-list-item
            link
            class="router-link grey--text text--lighten-5"
            :to="{ name: menu.to }"
            v-bind:key="menu.key"
          >
            <v-list-item-icon>
              <v-icon medium class="mx-auto grey--text text--lighten-5">{{
                menu.icon
              }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="grey--text text--lighten-5">{{
              $t(`menus.${menu.key}`)
            }}</v-list-item-title></v-list-item
          >
        </template>
        <v-divider class="grey lighten-1 mt-3" />
        <v-list-item
          class="router-link grey--text text--lighten-5"
          @click="handleLogout"
        >
          <v-list-item-icon>
            <v-icon medium class="mx-auto grey--text text--lighten-5"
              >mdi-power</v-icon
            >
          </v-list-item-icon>
          <v-list-item-title>{{
            $t("buttons.logout")
          }}</v-list-item-title></v-list-item
        >
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import menus from "../../utilities/menus.utility";
export default {
  name: "SideMenu",
  methods: {
    handleDrawerToggle(drawerOpen) {
      this.$store.commit("common/SET_DRAWER_OPEN", drawerOpen);
    },
    handleDrawerResize(event) {
      this.displaySubHeadings =
        event.target.clientWidth !== this.$refs.sideMenu.miniVariantWidth &&
        this.drawerOpen;
    },
    handleLogout() {
      this.$store.dispatch("auth/logout");
    },
  },
  computed: {
    name() {
      return this.$store.state.auth.user?.name;
    },
    email() {
      return this.$store.state.auth.user?.email;
    },
    image() {
      return this.$store.state.auth.user?.image;
    },
    drawerOpen() {
      return this.$store.state.common.drawerOpen;
    },
  },
  data() {
    return {
      menus,
      displaySubHeadings: false,
    };
  },
};
</script>
