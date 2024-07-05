import { describe, it, expect } from 'vitest'
import { addTimeRange, isValidYoutube, getSecondsFromDate, addDay } from '../helpers'

describe('Тестировани helpers.ts', () => {
  it('Корректные значения значения для addTimeRange', () => {
    const date = new Date(2024, 1, 12)

    for (let i = 1; i < 10; i++) {
      const range = {
        hours: i * 2,
        minutes: i * 10,
        seconds: 12
      }

      expect(addTimeRange(date, range)).toEqual(
        new Date(2024, 1, 12, range.hours, range.minutes, range.seconds)
      )
    }
  })

  it('Корректные значения значения для addDay', () => {
    const date = new Date(2024, 1, 12)
    for (let i = 1; i < 10; i++) {
      expect(addDay(date, i)).toEqual(new Date(2024, 1, 12 + i))
    }
  })

  it('Корректные значения значения для getSecondsFromDate', () => {
    const dates = [
      {
        date: new Date(2024, 1, 12, 0, 0, 0),
        seconds: 0
      },
      {
        date: new Date(2024, 1, 12, 0, 0, 1),
        seconds: 1
      },
      {
        date: new Date(2024, 1, 12, 0, 0, 30),
        seconds: 30
      },
      {
        date: new Date(2024, 1, 12, 2, 1, 0),
        seconds: 7260
      }
    ]

    dates.forEach(({ date, seconds }) => {
      expect(getSecondsFromDate(date)).toEqual(seconds)
    })
  })

  it('Корректные значения значения для isValidYoutube', () => {
    const youtube = [
      { value: 'https://www.youtube.com/watch?v=9bZkp7q19f0', isValid: false },
      { value: 'https://youtu.be/9bZkp7q19f0', isValid: false },
      { value: 'https://youtube.com/watch?v=9bZkp7q19f0', isValid: false },
      { value: 'https://youtube.com/embed/9bZkp7q19f0', isValid: true },
      { value: 'https://youtube.com/v/9bZkp7q19f0', isValid: false },
      { value: 'https://youtube.com/e/9bZkp7q19f0', isValid: false }
    ]

    youtube.forEach(({ value, isValid }) => {
      expect(isValidYoutube(value)).toBe(isValid)
    })
  })
})
