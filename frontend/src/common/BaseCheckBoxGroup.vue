<template>
  <div>
    <!-- 체크 박스 title -->
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>{{ checkBoxObject.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <!-- 체크 박스 리스트 -->
    <v-list-item-group v-model="select">
      <template v-for="(item, i) in checkBoxObject.items">
        <v-list-item :key="`item-${i}`" :value="item.value">
          <template #default="{ active }">
            <!-- On selected action -->
            <v-list-item-action>
              <v-checkbox v-bind="vuetifyCheckBox" :input-value="active" :label="item.text" />
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
      vuetifyCheckBox: {
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

<style>
/* SASS */
.v-dialog > .v-card > .v-card__title {
  padding: 16px;
}
</style>
