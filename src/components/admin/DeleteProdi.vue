<template lang="">
  <v-dialog
    v-model="dialog"
    persistent
    width="300px"
  >
    <v-card>
      <v-card-title class="text-h5">
        Delete Data
      </v-card-title>
      <v-card-text>
        Anda yakin delete data ini?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          text
          @click="submit"
        >
          Ya
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="close"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DeleteProdi',
  data() {
    return {
      // dialog: true
    }
  },
  computed: {
    ...mapGetters({
      dialog: 'dialog/status',
      id: 'dialog/id'
    })
  },
  methods: {
    ...mapActions({
      setStatusDialog: 'dialog/setStatus',
      setAlert: 'alert/set',
    }),
    submit() {
      this.axios.delete('/prodi/' + this.id)
      .then((response) => {
        let responses = response.data
        console.log(responses)
        if(responses) {
          this.setAlert({
            status: true,
            text: response.data.message,
            type: 'success'
          })
          this.$root.$emit('prodi-view')
          this.close()
          // this.$router.go(0)


        }
      })
    },
    close() {
      this.setStatusDialog(false)
    },
  },
}
</script>
<style lang="">
  
</style>