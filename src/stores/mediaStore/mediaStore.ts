import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IMedia, IMediaFull } from './media.type'
import { nanoid } from 'nanoid'
import { addTimeRange, formatDateNormal } from '@/helpers/helpers'

export const mediaStore = defineStore('media', () => {
  const medias = ref<IMediaFull[]>([])

  const addMedia = (media: IMedia) => {
    const id = nanoid()
    const timeEnd = addTimeRange(media.timeStart, media.timeRange)

    const range = {
      timeStart: media.timeStart,
      timeEnd,
      id
    }

    const mediFindeRestrictions = findeRestrictions(range)
    if (mediFindeRestrictions) {
      generateErrorRestrictions(mediFindeRestrictions)
    }

    medias.value.push({
      ...media,
      id,
      timeEnd
    })
  }

  const deleteMedia = (mediaDeleted: IMediaFull) => {
    medias.value = medias.value.filter(media => media.id !== mediaDeleted.id)
  }

  const editMedia = (media: IMediaFull) => {

    const timeEnd = addTimeRange(media.timeStart, media.timeRange)

    const range = {
      timeStart: media.timeStart,
      timeEnd,
      id: media.id
    }

    const mediFindeRestrictions = findeRestrictions(range)
    if (mediFindeRestrictions) {
      generateErrorRestrictions(mediFindeRestrictions)
    }

    medias.value = medias.value.map(mediaEl => {
      if(mediaEl.id === media.id) {

        return {
          ...media,
          timeEnd
        }
      }
      return mediaEl
    })
  }

  const findeRestrictions = (range: { timeStart: Date; timeEnd: Date, id: string }) => {
    return medias.value.find(
      (interval) => {
        if(interval.id === range.id) return false
        return range.timeStart < interval.timeEnd && range.timeEnd > interval.timeStart
      }
    )
  }

  const setNewTimeStart = (id: string, newTime: Date) => {
    medias.value = medias.value.map(mediaEl => {
      if(mediaEl.id === id) {
        return {
          ...mediaEl,
          timeStart: newTime,
          timeEnd: addTimeRange(newTime, mediaEl.timeRange)
        }
      }
      return mediaEl
    })
  }

  const generateErrorRestrictions = (media:IMediaFull) => {
    throw new Error(
      `медиа блок пересекается с ${media.name}. Время с ${formatDateNormal(media.timeStart)} занято до ${formatDateNormal(media.timeEnd)}`
    )
  }

  return {
    medias,
    addMedia,
    editMedia,
    findeRestrictions,
    setNewTimeStart,
    deleteMedia
  }
})
