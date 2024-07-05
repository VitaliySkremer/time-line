<template>
  <div
    class="media__block"
    :style="{
      'background-color': media.color,
      transform: `translate(${size.left}px, -50%)`,
      width: `${size.width}px`
    }"
    ref="element"
    @click="select"
  >
    <span
      :style="{
        color: textColor
      }"
    >
      {{ media.name }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, inject } from 'vue'
import type { Ref } from 'vue'
import { getSecondsFromDate, addTimeRange } from '@/helpers/helpers'
import type { IMediaFull } from '@/stores/mediaStore/media.type'
import { isEquelDates } from '@/helpers/helpers'
import chroma from 'chroma-js'
import { mediaStore } from '@/stores/mediaStore/mediaStore'

const MAX_WIDTH_CONTAINER = 2400
const MAX_WIDTH_CONTAINER_1 = MAX_WIDTH_CONTAINER / 100
const SECONDS_IN_DAY = 86400
const SECONDS_IN_DAY_1 = SECONDS_IN_DAY / 100

interface IMediaBlock {
  media: IMediaFull
  nowDate: Date
}

const props = defineProps<IMediaBlock>()
const store = mediaStore()
const emit = defineEmits<{
  select: [media: IMediaFull]
}>()
const timeline = inject('timeline') as Ref<HTMLDivElement>
const element = ref<HTMLDivElement | null>(null)
const isMove = ref(false)
const errorDown = ref(false)
const newMoveDate = ref()
const textColor = computed(() => {
  return chroma(props.media.color).luminance() > 0.5 ? '#333' : '#fefefe'
})

const size = computed(() => {
  let getProcentStart = (getSecondsFromDate(props.media.timeStart) / SECONDS_IN_DAY) * 100
  let getProcentEnd = (getSecondsFromDate(props.media.timeEnd) / SECONDS_IN_DAY) * 100
  let left = 0

  if (!isEquelDates(props.media.timeStart, props.nowDate)) {
    getProcentStart = 100 - getProcentStart
    left = MAX_WIDTH_CONTAINER_1 * Number(getProcentStart) * -1
    const procentAll = Math.abs(getProcentEnd + getProcentStart)
    const width = MAX_WIDTH_CONTAINER_1 * procentAll
    return {
      left,
      width
    }
  }
  left = MAX_WIDTH_CONTAINER_1 * Number(getProcentStart)
  if (!isEquelDates(props.media.timeEnd, props.nowDate)) {
    const procentAll = 100 - getProcentStart + getProcentEnd
    let width = MAX_WIDTH_CONTAINER_1 * procentAll
    return {
      left,
      width
    }
  }

  const procentAll = Math.abs(getProcentEnd - getProcentStart)
  let width = MAX_WIDTH_CONTAINER_1 * procentAll
  return {
    left,
    width
  }
})

const select = () => {
  if (isMove.value) return
  emit('select', props.media)
}

onMounted(() => {
  if (!element.value) return

  element.value.onmousedown = function (event) {
    event.preventDefault()

    let shiftX = event.clientX - element.value!.getBoundingClientRect().left

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)

    const OFFSET_CONTAINER = 20

    function onMouseMove(event: MouseEvent) {
      isMove.value = true
      let newLeft = event.clientX - shiftX - OFFSET_CONTAINER + (timeline.value?.scrollLeft || 0)

      const proccentByPx = (newLeft / MAX_WIDTH_CONTAINER) * 100
      const newSecond = SECONDS_IN_DAY_1 * proccentByPx
      const { timeStart } = props.media
      newMoveDate.value = new Date(
        timeStart.getFullYear(),
        timeStart.getMonth(),
        isEquelDates(props.nowDate, timeStart) ? timeStart.getDate() : timeStart.getDate() + 1
      )

      newMoveDate.value.setSeconds(newSecond)
      const range = {
        timeStart: newMoveDate.value,
        timeEnd: addTimeRange(newMoveDate.value, props.media.timeRange),
        id: props.media.id
      }

      if (store.findeRestrictions(range)) {
        errorDown.value = true
        element.value!.classList.add('media__block-error')
      } else {
        errorDown.value = false
        element.value!.classList.remove('media__block-error')
      }

      element.value!.style.transform = `translate(${newLeft}px, -50%)`
    }

    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mousemove', onMouseMove)

      if (errorDown.value) {
        element.value!.style.transform = `translate(${size.value.left}px, -50%)`
        element.value!.classList.remove('media__block-error')
        errorDown.value = false
        return
      }
      if (!isMove.value) return
      store.setNewTimeStart(props.media.id, newMoveDate.value)

      setTimeout(() => (isMove.value = false))
    }
  }

  element.value.ondragstart = function () {
    return false
  }
})
</script>

<style scoped lang="scss">
.media {
  &__block {
    position: absolute;
    top: 50%;
    height: 50%;
    border-radius: 6px;
    width: 50px;
    background-color: red;
    transform: translateY(-50%);
    cursor: pointer;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    &-error {
      outline: 5px dashed $red;
      outline-offset: 3px;
    }
  }
}
</style>
