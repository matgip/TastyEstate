<template>
  <div>
    <v-btn v-bind="btnProps" @click="addLikes">
      <v-icon v-bind="iconProps">
        {{ likesIcon }}
      </v-icon>
      좋아요({{ likes }})
    </v-btn>
  </div>
</template>

<script>
import api from "@/api/service.js";
import store from "@/store";

export default {
  data: () => ({
    btnProps: {
      class: "ma-2",
      color: "deep-orange",
      outlined: true,
      rounded: true,
      "x-small": true,
    },
    iconProps: {
      left: true,
      "x-small": true,
    },
    likesIcon: "fas fa-heart",
  }),
  props: {
    likes: {
      type: Number,
      required: true,
      validator: function(value) {
        return value >= 0;
      },
    },
  },
  methods: {
    addLikes() {
      const req = { realEstateID: store.getters.getSelectedEstate.id, userID: store.getters.getUser.id };
      api.likes
        .addLikes(req)
        .then((resp) => {
          if (resp.data.cmd_result === 0) {
            alert("이미 좋아요를 누르셨습니다.");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
