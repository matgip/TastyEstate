<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>💵 중개 수수료는 어때요?</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item-group v-model="price" @change="emitPrice">
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
      { value: "veryExpensive", text: "10% 이상 비쌈" },
      { value: "expensive", text: "5~10% 더 비쌈" },
      { value: "avgPrice", text: "평균 가격" },
      { value: "cheap", text: "5~10% 더 쌈" },
      { value: "veryCheap", text: "10% 이상 쌈" },
    ],
    price: "",

    listItemProps: {
      class: "d-inline-flex",
    },

    checkboxProps: {
      color: "deep-orange",
    },
  }),
  methods: {
    emitPrice() {
      this.$emit("priceSelected", this.price);
    },
  },
};
</script>
