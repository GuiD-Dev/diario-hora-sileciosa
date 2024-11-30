<template>
  <q-layout view="hHh Lpr fFf">
    <q-page-container>
      <transition>
        <router-view />
      </transition>
    </q-page-container>

    <q-footer v-show="this.$route.name != 'login'">
      <q-tabs class="bg-black-pv fixed-bottom" v-model="tabVal">
        <!-- <q-route-tab icon="people" label="" to="/profile" /> -->
        <q-route-tab icon="layers" name="card" :to="{ name: 'flashcard' }" />
        <q-route-tab icon="menu_book" name="guide" :to="{ name: 'guide' }" />
        <!-- <q-route-tab label="Sair" to="/podcasts" /> -->
        <!-- <q-route-tab icon="list" label="" to="/prayerlist" /> -->
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      tabVal: 'guide'
    }
  }
}
</script>
