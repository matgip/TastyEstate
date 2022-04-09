<template>
  <div>
    <v-dialog v-model="dialog" v-bind="dialogProps">
      <template #activator="{ on }">
        <v-btn v-bind="btnProps" v-on="on" @click="onClicked">
          <v-icon v-bind="iconProps">
            {{ icon }}
          </v-icon>
          리뷰 작성
        </v-btn>
      </template>

      <!-- Only can see if dialog is true -->
      <v-card>
        <v-card-title>
          <slot name="realestateName" />
        </v-card-title>

        <v-divider />

        <slot name="rating" />

        <v-divider />

        <slot name="kindness" />

        <v-divider />

        <slot name="price" />

        <v-divider />

        <slot name="contract" />

        <v-divider />

        <slot name="text" />

        <v-card-actions>
          <v-spacer />
          <slot name="buttons" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  mounted() {
    this.$store.subscribe((mutation) => {
      if (mutation.type == "UPDATE_DIALOG") {
        this.dialog = this.$store.getters.GET_DIALOG;
      }
    });
  },
  computed: {
    ...mapGetters({
      user: "GET_USER",
    }),
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
  methods: {
    onClicked() {
      if (this.isloggedIn() === false) {
        alert("로그인 후, 사용 가능합니다.");
        this.gotoLogin();
        return;
      }
    },
    gotoLogin() {
      this.$router.push({ path: "/login" });
    },
    isloggedIn() {
      return this.user.id != undefined;
    },
  },
};
</script>
