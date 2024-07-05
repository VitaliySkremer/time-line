import type {ITimeRange} from '@/stores/mediaStore/media.type'

export const addTimeRange = (date: Date, time: ITimeRange) => {
  const newDate = new Date(date)
  newDate.setHours(newDate.getHours() + time.hours)
  newDate.setMinutes(newDate.getMinutes() + time.minutes)
  newDate.setSeconds(newDate.getSeconds() + time.seconds)

  return newDate
}

export const setFormatTimerRange = (range: ITimeRange) => {
  const hours = `0${range.hours}`
  const minutes =
    range.minutes < 10 ? `0${range.minutes}` : range.minutes

  const seconds =
    range.seconds < 10 ? `0${range.seconds}` : range.seconds
  return `${hours}:${minutes}:${seconds}`
}

export const formatDateNormal = (date: Date) => {
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}

export const addDay = (date: Date, day: number) => {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + day);
  return newDate
}

export const getSecondsFromDate = (date: Date) => {
  const seconds = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
  return seconds
}

export const isEquelDates = (date1: Date, date2: Date) => {
  const day = date1.getDate() === date2.getDate()
  const month = date1.getMonth() === date2.getMonth();
  const year = date1.getFullYear() === date2.getFullYear()

  return day && month && year;
}

export const  isValidTimeRange = (timeRange: ITimeRange) => {
  return Object.values(timeRange).some((el) => el !== 0)
}


/**
 * проверяет на нужный формат ссылки из youtube
 *
 * @param {string} url
 * @returns {boolean}
 */
export const isValidYoutube = (url: string) => {
  return /(http(s?)):\/\//i.test(url) && url.includes(import.meta.env.VITE_YOUTUBE_KEY)
}