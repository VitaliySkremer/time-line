<template>
  <label class="lable">
    <p v-if="$slots.label || type === 'color'" class="lable__content">
      <slot name="label"/>
      <span v-if="type === 'color'">
        {{ modelValue }}
      </span>
    </p>
    <input v-bind="$attrs" class="input" :type="type" v-model.trim="modelValue" :value="value ?? modelValue">
  </label>
</template>

<script setup lang="ts">

interface IInput {
  type?: string,
  value?: string
}

withDefaults(defineProps<IInput>(), {
  type: 'text'
})

const modelValue = defineModel<string>()

</script>

<style scoped lang="scss">

.lable {

  &__content {
    font-size: 14px;
    margin-bottom: 5px;
    color: $grey;
  }
}

.input {
  width: 100%;
  border-radius: 8px;
  padding: 10px;
  outline: none;
  border: none;
  font-size: 17px;
  background-color: $Tertiary-Active;
  border: 1px solid $Tertiary-Active;

  &[type="color"] {
    block-size: 54px;
  }
}

</style>