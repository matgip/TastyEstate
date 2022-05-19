import Vue from "vue";
import { $api } from "@/api/service";

Vue.mixin({
  computed: {
    $api: () => $api,
  },
});
