<template>
  <v-snackbar
    v-model="alert" 
    :color="type"
    top
    elevation="3"
    width="500px"
    :multi-line="multiLine"
  >
    <v-row>
      <v-col class="d-flex align-center">
        {{ text }}
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn
          dark
          text
          small
          @click="close"
        >
          close
        </v-btn>
      </v-col>
    </v-row>
  </v-snackbar>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'c-alert',
  data() {
    return {
      multiLine: true
    }
  },
  computed: {
    ...mapGetters({
      status: 'alert/status',
      text: 'alert/text',
      type: 'alert/type'
    }),
    alert: {
      get() {
        return this.status
      },
      set(value) {
        this.setAlert({
          status: value,
          text: 'text',
          type: 'success'
        })
      }
    }
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set'
    }),
    close() {
      this.setAlert({
        status: false
      })
    }
  },
}
</script>
<style lang="">
  
</style>