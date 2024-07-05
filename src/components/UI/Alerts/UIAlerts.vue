<template>
  <TransitionGroup tag="div" name="alerts" class="alerts alerts__top event-none">
    <UIAlert
        v-for="alert in store.alerts"
        :key="alert.id"
        :alert="alert"
    />
  </TransitionGroup>
</template>

<script setup lang="ts">
import { alertsStore } from "@/stores/alertsStore/alertsStore";
import UIAlert from '@/components/UI/Alerts/UIAlert.vue'

const store = alertsStore();
</script>


<style scoped lang="scss">

.alerts {
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1000;
  gap: 20px;
  width: 100%;
  align-items: center;
}

.alerts__top {
  top: 76px;
}

.event-none {
  pointer-events: none;
}

.alerts__action {
  bottom: 10vh;
}

.alerts-enter-active,
.alerts-leave-active {
  transition: all 0.5s ease;
}
.alerts-enter-from,
.alerts-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>