<template>
  <v-container>
    <div
      class="d-sm-flex d-xs-block justify-space-between align-center text-center"
    >
      <h1 class="primary--text">{{ $t("headings.createUser") }}</h1>
    </div>
    <UserForm
      :handleSubmit="handleSave"
      :initialData="initialData"
      :avatar="avatar"
    />
  </v-container>
</template>

<script>
import UserForm from "@/components/forms/UserForm.component.vue";
import usersService from "@/services/users.service";
import { userModel } from "@/utilities/models.utility";

export default {
  name: "CreateUserView",
  components: { UserForm },
  data() {
    return {
      initialData: { ...userModel },
      avatar: process.env.VUE_APP_API_URL.replace(
        "/api/",
        "/images/default_user.jpg"
      ),
    };
  },
  methods: {
    handleSave(payload) {
      usersService.createUser(payload).then(() => {
        this.$router.push({ name: "users" });
      });
    },
  },
};
</script>
