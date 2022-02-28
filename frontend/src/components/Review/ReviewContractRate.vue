<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>🤝 여기서 계약하셨나요?</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item-group v-model="isContracted" @change="emitContrated">
      <template v-for="(item, i) in items">
        <v-list-item v-bind="listItemProps" :key="`item-${i}`" :value="item.value">
          <template #default="{ active }">
            <v-list-item-action>
              <v-checkbox v-bind="checkboxProps" :input-value="active" :label="item.text" />
            </v-list-item-action>
          </template>
        </v-list-item>
      </template>
    </v-list-item-group>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { value: true, text: "네. 여기서 계약했어요" },
      { value: false, text: "아니요. 여기서 계약 안했어요" },
    ],
    isContracted: null,

    listItemProps: {
      class: "d-inline-flex",
    },

    checkboxProps: {
      color: "deep-orange",
    },
  }),
  methods: {
    emitContrated() {
      this.$emit("isContracted", this.isContracted);
    },
  },
};
</script>
