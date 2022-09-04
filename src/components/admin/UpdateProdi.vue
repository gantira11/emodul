<template>

  <v-card class="px-3 py-5">
    <v-row class="d-flex justify-space-between align-center">
      <v-col cols="9" sm="10" md="10" lg="10" >
        <v-card-title>
          Update Program Studi
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
        <v-combobox
          dense
          class="text-body-2"
          outlined
          label="Jenjang"
          color="grey darken-2"
          v-model="jenjang"
          :rules="rulesJenjang"
          :items="items"
        ></v-combobox>
        <v-text-field
          class="text-body-2"
          dense
          v-model="prodi"
          :rules="rulesProdi"
          label="Program Studi"
          color="grey darken-2"
          outlined
        ></v-text-field>
        <v-file-input
          label='Banner Prodi'
          accept="image/png, image/jpeg, image/bmp"
          small-chips
          outlined
          dense
          @change="fieldChange"
        ></v-file-input>
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
import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'UpdateProdi',
  data() {
    return {
      jenjang: '',
      items: [
        'D3',
        'D4'
      ],
      prodi: '',
      currentImage: '',
      image: null,

      // va lidation
      rulesJenjang: [
        v => !!v || 'Jenjang harus diisi'
      ],
      rulesProdi: [
        v => !!v || 'Prodi harus diisi'
      ],
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
    fieldChange(event) {
      let files = event
      this.image = files
      console.log(this.image); 
    },
    submit() {
      if(this.$refs.form.validate()) {
        // let formData = {
        //   'jenjang': this.jenjang,
        //   'prodi': this.prodi
        // }
        let formData = new FormData();
        formData.append('jenjang', this.jenjang);
        formData.append('prodi', this.prodi);
        formData.append('image', this.image == null ? this.currentImage : this.image)
        this.axios.post('/prodi/' + this.id, formData)
        .then((response) => {
          let response_data = response.data
          console.log(response_data)
          if(response_data){
            this.setAlert({
              status: true,
              text: response_data.message,
              type: 'success'
            })
            this.$root.$emit('prodi-view')
            this.close()
          }
        })
        .catch((error) => {
          let responses = error.response
          console.log(responses.data)
        })
      }
    },
    async retrieveData() {
      await this.axios.get('/prodi/detail/' + this.id)
      .then((res) => {
        this.jenjang = res.data.data.jenjang,
        this.prodi = res.data.data.prodi
        this.currentImage = res.data.data.image
        console.log(this.currentImage)
      })
      .catch((err) => {
        console.error(err)
      })
    },
  },
  mounted() {
    this.retrieveData()
    this.$root.$on('update-prodi', () => {
      this.retrieveData()
    })
  },
}
</script>
<style lang="">
  
</style>