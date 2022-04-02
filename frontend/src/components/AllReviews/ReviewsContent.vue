<template>
  <div>{{ content }}</div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true,
      validator: function(value) {
        return value != null;
      },
    },
  },
};
</script>
