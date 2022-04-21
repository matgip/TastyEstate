<template>
  <div>
    <!-- check box title -->
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>{{ title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <!-- check box list -->
    <v-list-item-group v-model="select">
      <template v-for="(item, i) in items">
        <v-list-item v-bind="listItemProps" :key="`item-${i}`" :value="item.value">
          <template #default="{ active }">
            <v-list-item-action>
              <v-checkbox v-bind="checkBoxProps" :input-value="active" :label="item.text" />
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
    index: {
      type: Number,
    },
    title: {
      type: String,
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
    onChange: {
      type: Function,
      required: true,
      validator: function(func) {
        return func !== null;
      },
    },
  },

  data() {
    return {
      select: "",
      // Vuetfiy
      listItemProps: {
        class: "d-inline-flex",
      },
      checkBoxProps: {
        color: "deep-orange",
      },
    };
  },

  watch: {
    select(value) {
      if (value === undefined) return;
      this.onChange(this.index, value);
    },
  },
};
</script>
