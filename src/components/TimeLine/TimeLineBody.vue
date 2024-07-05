<template>
  <div class="timeline__body">
    <div v-for="num in 24" :key="num" class="cell-w body__item" />
    <MediaBlock :nowDate="nowDate" @select="select" v-for="media in filterDate" :key="media.id" :media="media" />
    <UIModal v-model="selectMediaEdit.isModal"> 
      <EditMediaForm @success="success" :media="selectMediaEdit.selectMedia!"/>  
    </UIModal>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import EditMediaForm from '@/components/EditMediaForm/EditMediaForm.vue'
import UIModal from '@/components/UI/UIModal.vue'
import MediaBlock from '@/components/TimeLine/MediaBlock.vue'
import { mediaStore } from '@/stores/mediaStore/mediaStore'
import type { IMediaFull } from '@/stores/mediaStore/media.type'
import { isEquelDates } from '@/helpers/helpers'

const props = defineProps<{nowDate: Date}>()

const store = mediaStore()

const filterDate = computed(()=> {
  return store.medias.filter(media => {
    return isEquelDates(props.nowDate, media.timeStart) || isEquelDates(props.nowDate, media.timeEnd)
  })
})


const selectMediaEdit = reactive<{
  isModal: boolean,
  selectMedia: IMediaFull | null
}>({
  isModal: false,
  selectMedia: null
})

const select = (media: IMediaFull) => {
  selectMediaEdit.isModal = true;
  selectMediaEdit.selectMedia = media;
}

const success = () => {
  selectMediaEdit.isModal = false;
  selectMediaEdit.selectMedia = null;
}
</script>

<style scoped lang="scss">
.timeline {
  &__body {
    display: flex;
    align-items: center;
    height: 200px;
    width: fit-content;
    overflow: hidden;
    position: relative;
  }
}

.body__item {
  height: 100%;
}
</style>
