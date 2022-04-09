<template>
  <div>{{ title }}</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      validator: function(value) {
        return value != null;
      },
    },
  },
};
</script>
