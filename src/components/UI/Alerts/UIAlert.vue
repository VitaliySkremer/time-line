<template>
  <div class="alert" :class="classes">
    <p class="alert__title">
      {{alert.title}}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { IAlert } from "@/stores/alertsStore/alert.type";

const props = defineProps<{alert: IAlert}>()

const classes = computed(()=> {
  return {
    'error': props.alert.status === "error",
    'success': props.alert.status === 'success',
  }
})

</script>


<style scoped lang="scss">

.alert {
  padding: 8px 12px 8px 40px;
  border-radius: 12px;
  width: fit-content;
  color: white;

  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;

  display: flex;
  align-items: center;
  gap: 15px;
  background-color: $black;
  font-family: 'MTS Compact', sans-serif;
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 24px 24px;
}

.success {
  background-image: url("/public/icons/success.svg");
}

.error {
  background-image: url("/public/icons/error.svg");
}
</style>