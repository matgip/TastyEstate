<template>
  <div>
    <v-dialog v-model="dialog">
      <template #activator="{ on }">
        <v-btn v-bind="btnProps" v-on="on">
          <v-icon v-bind="iconProps">
            {{ icon }}
          </v-icon>
          평가하기
        </v-btn>
      </template>

      <v-card>
        <v-card-title>{{ placeName }}</v-card-title>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">닫기</v-btn>
          <v-btn text @click="dialog = false">리뷰 등록하기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,

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
  methods: {},
};
</script>
