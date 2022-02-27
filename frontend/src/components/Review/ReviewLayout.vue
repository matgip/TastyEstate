<template>
  <div>
    <v-dialog v-model="dialog" v-bind="dialogProps">
      <template #activator="{ on }">
        <v-btn v-bind="btnProps" v-on="on">
          <v-icon v-bind="iconProps">
            {{ icon }}
          </v-icon>
          평가하기
        </v-btn>
      </template>

      <!-- Only can see if dialog is true -->
      <v-card>
        <v-card-title>
          <slot name="RealEstateName" />
        </v-card-title>

        <v-divider></v-divider>

        <slot name="Rating" />

        <slot name="Kindness" />

        <v-card-actions>
          <v-spacer />
          <slot name="DiagBtns" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import store from "@/store";

export default {
  mounted() {
    store.subscribe((mutation) => {
      if (mutation.type == "updateDialogFlag") {
        this.dialog = store.getters.getDialogFlag;
      }
    });
  },
  data: () => ({
    dialog: false,
    dialogProps: {
      persistent: true,
      "max-width": "700px",
    },

    btnProps: {
      class: "ma-2",
      color: "deep-orange",
      outlined: true,
      rounded: true,
      "x-small": true,
    },

    icon: "fas fa-edit",
    iconProps: {
      left: true,
      "x-small": true,
    },
  }),
};
</script>
