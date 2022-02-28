<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>😀 사장님이 친절하셨나요?</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item-group v-model="kindness">
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
      { value: "veryKind", text: "매우 친절" },
      { value: "kind", text: "친절" },
      { value: "soso", text: "보통" },
      { value: "unKind", text: "불친절" },
      { value: "veryUnkind", text: "매우 불친절" },
    ],

    listItemProps: {
      class: "d-inline-flex",
    },

    checkboxProps: {
      color: "deep-orange",
    },
  }),
  props: {
    propKindness: {
      type: String,
      required: true,
    },
  },
  computed: {
    kindness: {
      get() {
        return this.propKindness;
      },
      set(newKindness) {
        this.$emit("kindnessSelected", newKindness);
      },
    },
  },
};
</script>
