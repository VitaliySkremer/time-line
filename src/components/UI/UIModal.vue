<template>
  <teleport to="body">
    <Transition>
      <div
          v-if="modelValue"
          class="app__modal"
          :class="classModal"
      >
        <div @click.stop="closeModal" class="app__modal-background"/>
        <div
            class="app__modal-wrapper"
        >
          <div v-if="title" class="app__modal-wrapper-header">
            <h3 class="modal__title" v-if="title">
              {{title}}
            </h3>
          </div>
          <div class="app__modal-wrapper-body">
            <slot/>
          </div>
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<script setup lang="ts">
import { defineModel, watch } from "vue";

const emit = defineEmits(['update:modelValue', 'close']);

interface IModal {
  title?: string,
  classModal?: string,
}

withDefaults(defineProps<IModal>(), {
  title: '',
  classModal: ''
});

const modelValue = defineModel<boolean>()

const closeModal = () => {
  emit('close');
  emit('update:modelValue', false);
};

const closeModalEsq = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    modelValue.value = false;
  }
}

watch(modelValue, (value) => {
  if (!value) {
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', closeModalEsq);
  } else {
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeModalEsq);
  }
});


</script>

<style lang="scss" scoped>

.app__modal {
  position: fixed;
  z-index: 2;
  inset: 0 0 0 0;
  background: rgba(29, 32, 35, .4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 690px) {
    justify-content: flex-end;
  }
}

.app__modal-wrapper {
  background-color: white;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  position: relative;
  margin: 20px 0;
  display: flex;
  flex-direction: column;

  @media (max-width: 690px) {
    width: 100%;
    margin: 20px 0 0 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  &-header {
    display: flex;
    gap: 30px;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 0 20px;
  }

  &-body {
    padding: 20px;
  }
}

.app__modal-background {
  position: fixed;
  inset: 0 0 0 0;
  background: rgba(29, 32, 35, .4);
}

.modal__title {
  font-size: 20px;
  font-weight: bold;
}
</style>
