<template>
  <div class="main">
    <AppHeader/>
    <TimeLine class="main__timeline"/>

    <UIAlerts />
  </div>
</template>

<script setup lang="ts">
import TimeLine from '@/components/TimeLine/TimeLine.vue'
import UIAlerts from '@/components/UI/Alerts/UIAlerts.vue'
import AppHeader from '@/components/Header/AppHeader.vue'

</script>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  gap: 60px;
}
</style>