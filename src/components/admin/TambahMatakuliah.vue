<template lang="">
	<v-card class="px-3 py-5">
      <v-row class="d-flex justify-space-between align-center">
        <v-col  cols="9" sm="10" md="10" lg="10" >
          <v-card-title>
            Tambah Matakuliah
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
            :rules="rulesKode"
            label="Kode Matakuliah"
            color="grey darken-2"
            outlined
          ></v-text-field>
          <v-text-field
            class="text-body-2"
            dense
            v-model="matakuliah"
            :rules="rulesMatkul"
            label="Matakuliah"
            color="grey darken-2"
            outlined
          ></v-text-field>
          <v-combobox
            v-model="selectProdi"
            label="Program Studi"
            dense
            outlined
            :items="prodis"
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
            >Tambah</v-btn>
          </div>
        </v-form>
      </v-container>
    </v-card>
</template>
<script>
import { mapActions } from 'vuex'

export default {
	name: 'TambahMatakuliah',
	data() {
		return {
			kode: '',
			matakuliah: '',
      prodis: [],
      selectProdi: '',

      // Validation
      rulesKode: [
        v => !!v || 'Kode harus diisi'
      ],
      rulesMatkul: [
        v => !!v || 'Matakuliah harus diisi'
      ],
      prodiRules: [
        v => !!v || 'Prodi harus diisi'
      ]
		}
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
      console.log(this.selectProdi.id)
      if(this.$refs.form.validate()) {
        let formData = {
          'kode': this.kode,
          'matakuliah': this.matakuliah,
          'prodi_id': this.selectProdi.id
        };
        this.axios.post('/matakuliah', formData)
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
	},
  created() {
    this.axios.get('/prodi')
    .then((res) => {
      this.prodis = res.data.data
    })
    .catch((err) => {
      console.error(err)
    })
  }
}
</script>
<style lang="">
	
</style>