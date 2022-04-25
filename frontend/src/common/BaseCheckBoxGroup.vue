<template>
  <div>
    <!-- check box title -->
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>{{ checkBoxObject.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <!-- check box list -->
    <v-list-item-group v-model="select">
      <template v-for="(item, i) in checkBoxObject.items">
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
    checkBoxObject: {
      type: Object,
      required: true,
      validator: function(obj) {
        if (!obj.title || !obj.items || !obj.name) return false;
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
    select(selected) {
      if (selected === undefined) return;
      this.onChange(this.checkBoxObject.name, selected);
    },
  },
};
</script>
