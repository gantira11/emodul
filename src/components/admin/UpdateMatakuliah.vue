<template lang="">
  <v-card class="px-3 py-5">
      <v-row class="d-flex justify-space-between align-center">
        <v-col  cols="9" sm="10" md="10" lg="10" >
          <v-card-title>
            Update Matakuliah
          </v-card-title>
        </v-col>
        <v-col class="ml-9">
          <v-icon class="justify-end"
            size="25"
            @click="close"
          >
            md mdi-close-circle-outline
          </v-icon>
        </v-col>
      </v-row>
      <v-container class="mt-4">
        <v-form ref="form" lazy-validation>
          <v-text-field
            class="text-body-2"
            dense
            v-model="kode"
            label="Kode Matakuliah"
            color="grey darken-2"
            outlined
          ></v-text-field>
          <v-text-field
            class="text-body-2"
            dense
            v-model="matakuliah"
            label="Matakuliah"
            color="grey darken-2"
            outlined
          ></v-text-field>
          <v-combobox
            v-model="selectProdi"
            label="Program Studi"
            dense
            outlined
            :items="prodiData"
            :rules="prodiRules"
            item-value="id"
            item-text="prodi" 
          >
          </v-combobox>
          <div class="d-flex justify-end">
            <v-btn
              class="justify-end text-body-2"
              color="black darken-1"
              outlined
              dark
              @click="submit"
            >Update</v-btn>
          </div>
        </v-form>
      </v-container>
    </v-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UpdateMatakuliah',
  data () {
    return {
      kode: '',
      matakuliah: '',
      selectProdi: '',
      prodiData: [],

      prodiRules: [
        v => !!v || 'Prodi harus diisi'
      ]
    }
  },
  computed: {
    ...mapGetters({
      id: 'dialog/id'
    })
  },
  methods: {
    ...mapActions({
      setStatusDialog: 'dialog/setStatus',
      setAlert: 'alert/set'
    }),
    close() {
      this.setStatusDialog(false)
    },
    submit() {
      if(this.$refs.form.validate()) {
        let formData = {
          'kode': this.kode,
          'matakuliah': this.matakuliah,
          'prodi_id': this.selectProdi.id
        }
        this.axios.put('/matakuliah/' + this.id, formData)
        .then((response) => {
          let responses = response.data
          if(responses) {
            this.setAlert({
              status: true,
              text: responses.message,
              type: 'success'
            })
            this.$root.$emit('matakuliah-view')
            this.close()
            // this.$router.go(0)
          }
        })
        .catch((err) => {
          let error = err.response
          console.log(error)
        })
      }
    },
    async retrieveData() {
      this.kode = '',
      this.matakuliah = '',
      await this.axios.get('/matakuliah/detail/' + this.id) 
      .then((res) => {
        const response = res.data.matkul
        console.log(response)
        this.kode = response[0].kode
        this.matakuliah = response[0].matakuliah
        
      })
      .catch((err) => {
        console.error(err)
      })
    },
  },
  mounted() {
    this.retrieveData()
    this.$root.$on('update-matkul', () => {
      this.retrieveData()
    })
  },
  created() {
    this.axios.get('/prodi')
    .then((res) => {
      this.prodiData = res.data.data
    })
    .catch((err) => {
      console.error(err)
    })
  }
}
</script>
<style lang="">
  
</style>