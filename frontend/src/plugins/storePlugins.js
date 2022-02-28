import { $api } from "@/api/service";

export default function(store) {
  try {
    store.$api = $api;
  } catch (e) {
    console.error(e);
  }
}
