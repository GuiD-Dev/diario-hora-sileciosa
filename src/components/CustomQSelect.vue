<template>
  <div class="q-pa-sm">
    <q-btn-dropdown color="secondary" :class="`dropdown-${position}`" :label="this.selectedItem | filNumber" dense>
      <q-list>
        <q-item v-for="value in options" :key="value | filNumber" clickable v-close-popup @click="set(value)">
          <q-item-section>
            <q-item-label>{{ value | filNumber }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
export default {
  name: 'CustomQSelect',
  props: [ 'position', 'options', 'selected', 'setValue' ],
  data () {
    return {
      selectedItem: this.selected
    }
  },
  methods: {
    set (value) {
      this.selectedItem = value
      this.setValue(value)
    }
  },
  filters: {
    filNumber: function (value) {
      return typeof value === 'object' ? value.number : value
    }
  }
}
</script>

<style lang="scss">
.dropdown-left {
  width: 80px;
}

.dropdown-right {
  width: 70px;
}
</style>
