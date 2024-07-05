import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
import { ref } from 'vue'
import type { IAlert } from './alert.type'

export const alertsStore = defineStore('alerts', () => {
  const alerts = ref<(IAlert & { id: string })[]>([])

  const addAlert = (alert: IAlert, ms: number = 4_000) => {
    const id = nanoid()
    const addedAlert = { ...alert, id }

    alerts.value.push(addedAlert)
    setTimeout(() => {
      deleteAlert(id)
    }, ms)
  }

  const deleteAlert = (id: string) => {
    alerts.value = alerts.value.filter(el => el.id !== id)
  }

  return {
    alerts,
    addAlert
  }
})
