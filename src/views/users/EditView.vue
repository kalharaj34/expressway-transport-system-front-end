<template>
  <v-container>
    <div
      class="d-sm-flex d-xs-block justify-space-between align-center text-center"
    >
      <h1 class="primary--text">{{ $t("headings.editUser") }}</h1>
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
import functionsUtilities from "@/utilities/functions.utility";
import { userModel } from "@/utilities/models.utility";

export default {
  name: "EditUserView",
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
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      usersService.getUser(this.$route.params.id).then((response) => {
        this.initialData = functionsUtilities.copyValues(
          response.data,
          this.initialData
        );
        this.initialData.roles = response.data.roles[0].id;
        this.avatar = response.data.image;
      });
    },
    handleSave(payload) {
      usersService.updateUser(this.$route.params.id, payload).then(() => {
        this.$router.push({ name: "users" });
      });
    },
  },
};
</script>
