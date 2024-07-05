<template>
  <div class="logo">
    <span class="logo__time">Time</span>
    <span class="logo__line">Line</span>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.logo {

  font-size: 28px;
  font-weight: bold;

  &__time {
    color: $red;
  }

  &__line {
    color: $blue;
  }

}
</style>
