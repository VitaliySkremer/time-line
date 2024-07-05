<template>
  <form @submit.prevent class="form">
    <UIInput placeholder="Название блока" v-model="model.name">
      <template #label> Название блока </template>
    </UIInput>

    <iframe
      v-if="isValidYoutube(model.url)"
      :src="model.url"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>

    <UIInput placeholder="Ссылка на медиа youtube" v-model="model.url">
      <template #label> Ссылка на медиа youtube</template>
    </UIInput>

    <VueDatePicker v-model="model.timeStart" locale="ru" auto-apply enable-seconds>
      <template #trigger>
        <UIInput placeholder="Время начала" v-model="timeStart" readonly>
          <template #label> Время начала </template>
        </UIInput>
      </template>
    </VueDatePicker>

    <VueDatePicker
      v-model="model.timeRange"
      time-picker
      enable-seconds
      :max-time="maxTime"
      :min-time="minTime"
      auto-apply
    >
      <template #trigger>
        <UIInput placeholder="Продолжительность" readonly v-model="formatTimerRange">
          <template #label> Продолжительность (максимум 2 часа) </template>
        </UIInput>
      </template>
    </VueDatePicker>

    <UIInput type="color" placeholder="Цвет блока" :value="model.color" v-model="model.color">
      <template #label> Цвет блока </template>
    </UIInput>

    <UIButton @click="addMediaModel">Создать медиаблок</UIButton>
  </form>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { mediaStore } from '@/stores/mediaStore/mediaStore'
import { alertsStore } from '@/stores/alertsStore/alertsStore'
import {
  setFormatTimerRange,
  formatDateNormal,
  isValidTimeRange,
  isValidYoutube
} from '@/helpers/helpers'
import UIInput from '@/components/UI/UIInput.vue'
import UIButton from '@/components/UI/UIButton.vue'
import VueDatePicker from '@vuepic/vue-datepicker'

const emit = defineEmits<{
  success: []
}>()

const { model, timeStart, formatTimerRange, addMediaModel, maxTime, minTime } = useCreateMediaForm()

function useCreateMediaForm() {
  const model = reactive({
    name: '',
    color: '#000000',
    url: '',
    timeStart: new Date(),
    timeRange: {
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  })

  const store = mediaStore()
  const alerts = alertsStore()

  const maxTime = {
    hours: 2,
    minutes: 0,
    seconds: 0
  }

  const minTime = {
    hours: 0,
    minutes: 0,
    seconds: 1
  }

  const timeStart = computed(() => formatDateNormal(model.timeStart))
  const formatTimerRange = computed(() => setFormatTimerRange(model.timeRange))

  const addMediaModel = () => {
    if (!model.color || !model.name || !model.url || !isValidTimeRange(model.timeRange)) {
      alerts.addAlert({
        title: 'Заполнены не все поля',
        status: 'error'
      })
      return
    }
    try {
      store.addMedia(model)
      emit('success')
      alerts.addAlert({
        title: 'Медиа блок успешно создан',
        status: 'success'
      })
    } catch (error: any) {
      alerts.addAlert({
        title: error.message,
        status: 'error'
      })
    }
  }
  return { model, timeStart, formatTimerRange, addMediaModel, maxTime, minTime }
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 550px;

  @media (max-width: 690px) {
    width: 100%;
  }
}
</style>
