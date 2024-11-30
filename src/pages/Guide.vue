<template>
  <q-pull-to-refresh @refresh="refreshData">
    <q-page padding>
      <q-header elevated>
        <q-toolbar>
          <q-btn color="grey" dense class="q-px-sm" @click="quit">Sair</q-btn>
          <div class="row fixed-top-right">
            <CustomQSelect position="left" :options="lists.years" :selected="week.year" :setValue="setYear" />
            <CustomQSelect position="right" :options="lists.weeks" :selected="week.number" :setValue="setWeek" :key="reloads" />
          </div>
        </q-toolbar>
      </q-header>

      <q-banner :class="`${banConf.color} text-white text-center q-py-xl`" v-if="banConf.visible">
        {{ banConf.msg }}
      </q-banner>

      <div class="q-mt-sm q-mx-md q-mb-xl" v-else>
        <div class="row bg-lightBlue-pv q-pa-xs">
          <div class="text-h5 text-bold text-center full-width">
            Semana {{ week.number }}
          </div>
          <div class="text-h6 text-center full-width">
            {{ week.title }}
          </div>
        </div>

        <q-list>
          <q-item
            v-for="(day,index) in days" :key="index"
            class="bg-white"
            v-ripple
            clickable
            :to="{
                  name: 'devotional',
                  params: {
                      year: week.year,
                      day: week.verses.find(v => v.day_index === index.toString()),
                      idUser: idUser
                  }
                }"
          >
            <div class="text-h6 full-width">
              {{ day }}
            </div>
          </q-item>
        </q-list>
      </div>

    </q-page>
  </q-pull-to-refresh>
</template>

<script>
import CustomQSelect from 'src/components/CustomQSelect.vue'

export default {
  name: 'Guide',
  components: { CustomQSelect },
  data () {
    return {
      lists: {
        years: [],
        weeks: []
      },
      selectedWeek: null,
      idUser: 0,
      days: [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado' ],
      banConf: {},
      reloads: 0
    }
  },
  computed: {
    week () {
      let week = this.selectedWeek

      if (week !== null) {
        week = this.lists.weeks.find(w => w.number === this.selectedWeek.number)
      } else if (week === null && this.lists.weeks.length > 0) {
        week = this.lists.weeks[0]
      } else {
        week = {
          year: new Date().getFullYear(),
          number: 0,
          title: '',
          verses: []
        }
      }

      return week
    }
  },
  methods: {
    refreshData (done) {
      if (!window.matchMedia('(display-mode: standalone)').matches && window.promptEvent !== undefined) {
        window.promptEvent.prompt()

        window.promptEvent.userChoice.then((choice) => {
          if (choice.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt')
          } else {
            console.log('User dismissed the A2HS prompt')
          }

          window.promptEvent = null
        })
      }

      // const urlBase = 'https://pvmzapp.tech/api/public'
      const urlBase = 'http://localhost:8081'
      this.$axios.get(urlBase + '/weeks')
        .then(res => {
          console.log(res.data)
          this.setContents(res.data)
          this.setBanConf()
        })
        .catch(err => {
          console.log(err)

          this.$q.notify({
            message: 'Falha ao carregar dados.',
            color: 'red',
            timeout: 1000
          })
        })
        .then(() => {
          done()
        })
    },
    setContents (data) {
      let years = []
      let weeks = []

      data.forEach(w => {
        if (years.find(y => y === w.year) === undefined) {
          years.push(w.year)
        }
        weeks.push(w)
      })

      weeks.reverse()

      this.$q.localStorage.set('years', years)
      this.lists.years = years
      this.$q.localStorage.set('weeks', weeks)
      this.lists.weeks = weeks

      if (this.$q.localStorage.getItem('selectedWeek') === null && weeks.length > 0) {
        this.$q.localStorage.set('selectedWeek', weeks[0])
        this.selectedWeek = weeks[0]
      } else if (weeks.length === 0) {
        this.$q.localStorage.remove('selectedWeek')
        this.selectedWeek = null
      }

      this.reloads += 1
    },
    setBanConf () {
      if (this.banConf === null) {
        this.$q.localStorage.set('banConf', {
          msg: 'Deslize o dedo para baixo para atualizar o devocional.',
          color: 'bg-lightBlue-pv',
          visible: true
        })
      } else {
        this.$q.localStorage.set('banConf', {
          msg: 'Devocionais ainda não cadastrados.',
          color: 'bg-black-pv',
          visible: this.selectedWeek === null
        })
      }

      this.banConf = this.$q.localStorage.getItem('banConf')
    },
    setYear (value) {
      let tmp = this.$q.localStorage.getItem('weeks')
      this.lists.weeks = tmp.filter(w => w.year === value)
    },
    setWeek (value) {
      this.selectedWeek = this.$q.localStorage.set('selectedWeek', value)
      this.selectedWeek = value
    },
    quit () {
      this.$q.localStorage.remove('user')
      this.$q.localStorage.remove('apiKey')
      this.$q.localStorage.remove('selectedWeek')
      this.$router.push({ name: 'login' })
    }
  },
  beforeCreate () {
    if (this.$q.localStorage.getItem('apiKey') === null) {
      this.$router.push({ name: 'login' })
    }
  },
  created () {
    this.lists.years = this.$q.localStorage.getItem('years')
    this.lists.weeks = this.$q.localStorage.getItem('weeks')
    this.selectedWeek = this.$q.localStorage.getItem('selectedWeek')
    this.banConf = this.$q.localStorage.getItem('banConf')
    this.idUser = this.$q.localStorage.getItem('user').id

    if (this.selectedWeek === null) {
      // const urlBase = 'https://pvmzapp.tech/api/public'
      const urlBase = 'http://localhost:8081'
      this.$axios.get(urlBase + '/weeks')
        .then(res => {
          this.setContents(res.data)
          this.setBanConf()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
