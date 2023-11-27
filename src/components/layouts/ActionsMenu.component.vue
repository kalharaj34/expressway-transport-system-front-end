<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        color="darkGray"
        v-bind="attrs"
        v-on="on"
        exact
        v-permissions="permissions"
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list dense class="secondary-font list-compressed">
      <v-list-item
        :to="handleEdit"
        exact
        v-if="handleEdit"
        v-permissions="editPermission"
      >
        <v-list-item-content>
          <v-list-item-title>
            <v-icon small class="mr-1">mdi-pencil</v-icon>
            {{ $t("texts.edit") }}</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        @click.prevent="handleDelete(item)"
        v-if="handleDelete"
        v-permissions="deletePermission"
      >
        <v-list-item-title>
          <v-icon small class="mr-1">mdi-delete</v-icon>
          {{ $t("texts.delete") }}</v-list-item-title
        >
      </v-list-item>
      <slot name="custom"></slot>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "ActionsMenu",
  props: [
    "handleEdit",
    "handleDelete",
    "item",
    "deletePermission",
    "editPermission",
    "permissions",
  ],
};
</script>
