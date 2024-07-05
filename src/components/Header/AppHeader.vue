<template>
  <header class="header">
    <div class="header__content container">
      <AppLogo />
      <UIButton @click="setIsCreateMedia(true)"> Создать медиаблок </UIButton>
      <UIModal v-model="isCreateMedia" title="Форма создания медиа блока">
        <CreateMediaForm @success="setIsCreateMedia(false)"/>
      </UIModal>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CreateMediaForm from '@/components/CreateMediaForm/CreateMediaForm.vue'
import AppLogo from '@/components/AppLogo.vue'
import UIButton from '@/components/UI/UIButton.vue'
import UIModal from '@/components/UI/UIModal.vue'

const isCreateMedia = ref(false);

const setIsCreateMedia = (flag: boolean) => {
  isCreateMedia.value = flag
}
</script>

<style scoped lang="scss">
.header {
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.08);

  &__content {
    display: flex;
    align-items: center;
    padding: 20px;
    justify-content: space-between;
  }
}
</style>
