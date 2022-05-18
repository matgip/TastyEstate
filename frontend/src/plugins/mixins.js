import Vue from "vue";
import { $api } from "@/api/service";
import { $eventHandler } from "@/utils/EventHandler.js";

Vue.mixin({
  computed: {
    $api: () => $api,
    $eventHandler: () => $eventHandler,
  },
});
