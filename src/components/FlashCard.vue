<template>
  <div class="full-width">
    <q-card class="bg-white q-pa-sm" v-if="clicked" @click="clicked=!clicked">
      <q-badge>Semana {{ week.number }}</q-badge>
      <q-space/>
      <span class="text-h6">{{ week.verse_reference }}</span>
    </q-card>

    <q-card class="bg-white q-pa-sm" v-else @click="clicked=!clicked">
      <span class="text-body1 text-center">
        {{ week.verse_text }}
      </span>
    </q-card>
  </div>
</template>

<script>
export default {
  props: [ 'week' ],
  data () {
    return {
      clicked: true
    }
  }
}
</script>
