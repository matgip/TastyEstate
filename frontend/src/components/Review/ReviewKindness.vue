<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>😀 사장님이 친절하셨나요?</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item-group v-model="kindness">
      <template v-for="(item, i) in items">
        <v-list-item v-bind="listItemProps" :key="`item-${i}`" :value="item">
          <template #default="{ active }">
            <v-list-item-action>
              <v-checkbox v-bind="checkboxProps" :input-value="active" :label="item" />
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
    items: ["매우 친절", "친절", "보통", "불친절", "매우 불친절"],
    kindness: [""],

    listItemProps: {
      class: "d-inline-flex",
    },

    checkboxProps: {
      color: "deep-orange",
    },
  }),
  methods: {},
};
</script>
