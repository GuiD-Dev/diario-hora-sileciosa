import { LocalStorage as storage } from 'quasar'

export function actInitState (context, axios) {
  let definedDate = storage.getItem('selectedDate')

  if (definedDate == null) {
    let date = new Date()
    definedDate = { year: date.getFullYear(), week: getWeek(date), dayWeek: 0 }
    storage.set('selectedDate', definedDate)
  }

  context.commit('setSelectedYear', definedDate.year)
  context.commit('setSelectedWeek', definedDate.week)
  context.commit('setSelectedDayWeek', definedDate.dayWeek)

  defineWeekDevocional(context, { year: definedDate.year, week: definedDate.week })

  axios.get('http://localhost:8081/weeks')
    .then(res => {
      let years = []
      let weeks = []
      res.data.forEach(w => {
        if (years.find(y => y === w.year) === undefined) {
          years.push(w.year)
        }
        weeks.push(w)
      })

      storage.set('years', years)
      storage.set('weeks', weeks)
      context.commit('setStoredYears', { years: years, weeks: weeks })
    })
    .catch(err => {
      console.log(err)
    })
}

export function defineWeekDevocional (context, payload) {
  let id = 'w' + payload.year + payload.week

  let week = {
    order: payload.week,
    title: 'A história de Israel pelas lentes do profeta.',
    verse: 'Marcos 16.15',
    text: 'Vão e façam discípulos em todas as nações',
    verses: [ 'Zacarias 1.1-6', 'Zacarias 3.1-10', 'Zacarias 9.9-17', 'Zacarias 11.4-17', 'Zacarias 12.10-14', 'Zacarias 13.7-9', 'Zacarias 14.16-21' ]
  }

  storage.set(id, week)
  context.commit('setWeekDevocional', week)
}

export function defineSelectedDate (context, payload) {
  console.log(payload)
  storage.set('selectedDate', payload)

  context.commit('setSelectedYear', payload.year)
  context.commit('setSelectedWeek', payload.week)
  context.commit('setSelectedDayWeek', payload.dayWeek)
}

function getWeek (date) {
  var nDay = (date.getDay() + 6) % 7
  date.setDate(date.getDate() - nDay + 3)
  var n1stThursday = date.valueOf()
  date.setMonth(0, 1)
  if (date.getDay() !== 4) {
    date.setMonth(0, 1 + ((4 - date.getDay()) + 7) % 7)
  }
  return 1 + Math.ceil((n1stThursday - date) / 604800000)
}
