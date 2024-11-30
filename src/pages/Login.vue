<template>
  <q-page padding class="q-pa-xl">

    <q-form class="bg-white rounded-borders" @submit="login">
      <div class="full-width text-center text-h5 text-bold bg-black-pv q-px-sm q-py-md text-white">
        <q-img
          src="../statics/app-logo-128x128.png"
          style="max-height: 118px; max-width: 118px"
        />
        <q-space />
        Diário de Hora Silenciosa
      </div>
      <div class="q-px-md">
        <q-input label="Nome" v-model="user" :rules="[ val => !!val ]" />
        <q-input label="Senha" type="password" v-model="pass" :rules="[ val => !!val ]" />
        <q-btn label="Entrar" color="primary" type="submit" class="full-width q-mb-md" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: '',
      pass: ''
    }
  },
  methods: {
    login () {
      // const urlBase = 'https://pvmzapp.tech/api/public'
      const urlBase = 'http://localhost:8081'
      this.$axios.post(urlBase + '/users-auth', { name: this.user, password: this.pass, missionary: false })
        .then(res => {
          if (res.data.apiKey !== undefined) {
            this.$q.localStorage.set('user', { id: res.data.user.id, name: res.data.user.name })
            this.$q.localStorage.set('apiKey', res.data.apiKey)
            this.$router.push({ name: 'guide' })
          } else {
            this.$q.notify({
              message: 'Usuário ou senha inválidos.',
              color: 'red',
              timeout: 1000
            })
          }
        })
        .catch(err => {
          this.$q.notify({
            message: 'Ocorreu um erro no processo de autenticação.',
            color: 'red',
            timeout: 1500
          })

          console.log(err)
        })
    }
  },
  beforeCreate () {
    if (this.$q.localStorage.getItem('apiKey') !== null) {
      this.$router.push({ name: 'guide' })
    }
  }
}
</script>
