<template>
  <v-container>
    <div
      class="d-sm-flex d-xs-block justify-space-between align-center text-center"
    >
      <h1 class="primary--text">{{ $t("headings.manageUsers") }}</h1>
      <v-btn
        color="secondary"
        dark
        class="text-capitalize mt-2"
        elevation="0"
        :to="{ name: 'createUser' }"
        v-permissions="'store_user'"
      >
        <v-icon small class="mr-1">mdi-plus</v-icon>
        {{ $t("buttons.createNew") }}
      </v-btn>
    </div>
    <DataTable
      :headers="headers"
      :serviceFunction="usersService.getUsers"
      ref="usersTable"
    >
      <template v-slot:actions="{ item }">
        <ActionsMenu
          :item="item"
          :handleEdit="{ name: 'editUser', params: { id: item.id } }"
          :handleDelete="handleDelete"
          editPermission="update_user"
          deletePermission="destroy_user"
          :permissions="['update_user', 'destroy_user']"
        />
      </template>
      <template v-slot:role="{ item }">
        {{ item.roles.map((role) => role.name).join(", ") }}
      </template>
      <template v-slot:avatar="{ item }">
        <v-avatar size="30">
          <img :src="item.image" :alt="item.name" />
        </v-avatar>
      </template>
    </DataTable>
    <ConfirmationAlert ref="deleteConfirmation" />
  </v-container>
</template>

<script>
import usersService from "@/services/users.service";
import DataTable from "@/components/layouts/DataTable.component.vue";
import ConfirmationAlert from "@/components/layouts/ConfirmationAlert.component.vue";
import ActionsMenu from "@/components/layouts/ActionsMenu.component.vue";

export default {
  components: { DataTable, ConfirmationAlert, ActionsMenu },
  data() {
    return {
      headers: [
        { value: "avatar" },
        { text: this.$t("inputs.name"), value: "name" },
        { text: this.$t("inputs.username"), value: "username" },
        { text: this.$t("inputs.email"), value: "email" },
        { text: this.$t("inputs.role"), value: "role" },
        { value: "actions" },
      ],
      usersService,
    };
  },
  methods: {
    handleDelete(item) {
      this.$refs.deleteConfirmation
        .open(
          this.$t("headings.areYouSure"),
          this.$t("texts.doYouWantToDeleteItem", { item: item.name }),
          {
            color: "error",
          }
        )
        .then((confirm) => {
          if (confirm) {
            usersService.deleteUser(item.id).then(() => {
              this.$refs.usersTable.getItems();
            });
          }
        });
    },
  },
};
</script>
