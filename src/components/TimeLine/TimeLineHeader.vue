<template>
  <div class="timeline__header">
    <div v-for="num in 24" :key="num" class="cell-w header__item">
      {{ num - 1 }}
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.timeline {

  &__header {
    display: flex;
    align-items: center;
    text-align: center;
    height: 50px;
  }
}

.header__item {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>