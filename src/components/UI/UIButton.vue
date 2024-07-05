<template>
  <button class="button btn-custom">
    <slot/>
  </button>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.button {
  font-size: 17px;
  color: #fff;
  border-radius: 8px;
  padding: 10px 25px;
  background: transparent;
  cursor: pointer;
  position: relative;
  display: inline-block;
  outline: none;
  border: none;
  background: linear-gradient(0deg, $blue-2 0%, $blue 100%);

  transition-duration: .2s;
  transition-timing-function: ease;
  transition-property: opacity, transform;

  @media (max-width: 690px) {
    font-size: 14px;
    padding: 8px 20px;
  }

  &:hover {
    transform: scale(1.03);
  }

  &:active {
    transform: scale(1.05);
    opacity: .8;
  }
}

</style>