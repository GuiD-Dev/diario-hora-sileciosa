<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    if (!window.matchMedia('(display-mode: standalone)').matches) {
      window.addEventListener('beforeinstallprompt', (event) => {
        // event.preventDefault()
        window.promptEvent = event
      })
    }
  }
}
</script>
