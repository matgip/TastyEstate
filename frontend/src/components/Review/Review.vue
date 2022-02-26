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
      <ReviewLayout>
        <ReviewREName slot="RealEstateName" :placeName="placeName" />
        <ReviewBtns slot="ReviewBtns" @closeBtnClicked="closeDiag" @saveBtnClicked="addReview" />
      </ReviewLayout>
    </v-dialog>
  </div>
</template>

<script>
import ReviewLayout from "./ReviewLayout.vue";
import ReviewREName from "./ReviewREName.vue";
import ReviewBtns from "./ReviewBtns.vue";

export default {
  data: () => ({
    dialog: false,

    dialogProps: {
      persistent: true,
      "max-width": "600px",
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
  props: {
    placeName: {
      type: String,
      required: true,
      validator: function(value) {
        return value != null;
      },
    },
  },
  components: {
    ReviewLayout,
    ReviewREName,
    ReviewBtns,
  },
  methods: {
    closeDiag() {
      this.dialog = false;
    },
    addReview() {
      this.dialog = false;
      console.log("Test");
    },
  },
};
</script>
