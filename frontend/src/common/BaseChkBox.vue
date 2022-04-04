<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>{{ title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item-group v-model="select">
      <template v-for="(item, i) in items">
        <v-list-item v-bind="listItemProps" :key="`item-${i}`" :value="item.value">
          <template #default="{ active }">
            <v-list-item-action>
              <v-checkbox v-bind="defaultBoxProps" :input-value="active" :label="item.text" />
            </v-list-item-action>
          </template>
        </v-list-item>
      </template>
    </v-list-item-group>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    propSelect: {
      required: true,
    },
    items: {
      type: Array,
      required: true,
      validator: function(items) {
        if (items.length === 0) return false;
        for (let item of items) {
          if (item.value === undefined) return false;
          if (item.text === undefined) return false;
        }
        return true;
      },
    },
    updateCmd: {
      type: String,
      required: true,
    },
  },
  computed: {
    select: {
      get() {
        return this.propSelect;
      },
      set(newSelect) {
        this.$store.commit(this.updateCmd, newSelect);
      },
    },
  },
  data: () => ({
    listItemProps: {
      class: "d-inline-flex",
    },
    defaultBoxProps: {
      color: "deep-orange",
    },
  }),
};
</script>
