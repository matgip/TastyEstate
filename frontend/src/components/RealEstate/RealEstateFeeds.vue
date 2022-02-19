<template>
  <div>
    <v-btn v-bind="btnProps">
      <v-icon v-bind="iconProps">
        {{ icon }}
      </v-icon>
      평가하기
    </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
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
  methods: {},
};
</script>
