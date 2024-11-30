<template>
  <q-page padding>

    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-h5 text-uppercase text-bold">
            <q-btn icon="arrow_left" round color="grey" dense :to="{ name: 'guide' }"></q-btn>
            {{ dayName }}
          </div>
        </q-toolbar-title>
        <q-input class="q-ma-xm" dense mask="##/##/####" fill-mask borderless style="max-width:100px" v-model="done" />
      </q-toolbar>
    </q-header>

    <q-form @submit="save" class="bg-white q-pa-sm rounded-borders">
      <div class="text-h5">
        {{ this.$route.params.day.reference }}
      </div>
      <q-input label="O que o autor está a dizer?" type="textarea" v-model="quest1" outlined class="q-my-sm field" />
      <q-input label="Como posso praticar isso?" type="textarea" v-model="quest2" outlined class="q-my-sm" />
      <q-btn color="primary" label="Salvar" class="full-width" align="center" type="submit" />
    </q-form>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      days: [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado' ],
      id: 0,
      done: '',
      quest1: '',
      quest2: ''
    }
  },
  computed: {
    dayName: function () {
      return this.days[this.$route.params.day.day_index]
    }
  },
  methods: {
    save () {
      let done = this.done ?? ''
      let q1 = this.quest1 ?? ''
      let q2 = this.quest2 ?? ''

      this.$q.localStorage.set(`q${this.id}`, { done: done, q1: q1, q2: q2 })

      this.$q.notify({
        message: 'Salvo com sucesso.',
        color: 'green',
        position: 'top',
        timeout: 1000
      })
    }
  },
  beforeCreate () {
    if (this.$q.localStorage.getItem('apiKey') === null) {
      this.$router.push({ name: 'login' })
    }
  },
  created () {
    this.id = '' + this.$route.params.year + this.$route.params.day.weeks_id + this.$route.params.day.day_index + this.$route.params.idUser
    let row = this.$q.localStorage.getItem(`q${this.id}`)

    this.done = row?.done ?? ''
    this.quest1 = row?.q1 ?? ''
    this.quest2 = row?.q2 ?? ''
  }
}
</script>
