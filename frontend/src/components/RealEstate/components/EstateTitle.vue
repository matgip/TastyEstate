<template>
  <div>
    {{ placeName }}
  </div>
</template>

<script>
export default {
  props: {
    placeName: {
      type: String,
      validator: function(value) {
        return value != null;
      },
    },
  },
};
</script>
