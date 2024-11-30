<template>
  <q-page padding>

    <q-list class="q-mx-sm q-mt-sm q-mb-xl">
      <q-item v-for="(week,index) in weeks" :key="index">
        <FlashCard :week="week" />
      </q-item>
    </q-list>

  </q-page>
</template>

<script>
import FlashCard from 'src/components/FlashCard.vue'

export default {
  name: 'VerseList',
  components: { FlashCard },
  data () {
    return {
      weeks: []
    }
  },
  beforeCreate () {
    if (this.$q.localStorage.getItem('apiKey') === null) {
      this.$router.push({ name: 'login' })
    }
  },
  created () {
    let week = this.$q.localStorage.getItem('selectedWeek')

    if (week !== null) {
      this.weeks = this.$q.localStorage.getItem('weeks').filter(w => w.year === week.year)
    }
  }
}
</script>
