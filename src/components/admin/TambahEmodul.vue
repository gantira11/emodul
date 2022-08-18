<template lang="">
  <v-card class="px-3 py-5">
    <v-row class="d-flex justify-space-between align-center">
      <v-col cols="9" sm="10" md="10" lg="10">
        <v-card-title> Tambah Emodul </v-card-title>
      </v-col>
      <v-col class="ml-9">
        <v-icon class="justify-end" size="25" @click="close">
          md mdi-close-circle-outline
        </v-icon>
      </v-col>
    </v-row>
    <v-container>
      <v-form ref="form" lazy-validation>
        <v-text-field
          class="text-body-2"
          dense
          v-model="title"
          :rules="rulesTitle"
          label="Title"
          color="grey darken-2"
          outlined
        ></v-text-field>
        <v-textarea
          class="text-body-2"
          v-model="deskripsi"
          :rules="rulesDeskripsi"
          label="Deskripsi"
          outlined
          color="grey darken-2"
          height="90px"
          dense
        ></v-textarea>
        <v-row class="mt-n5">
          <v-col>
            <v-text-field
              class="text-body-2"
              dense
              v-model="dosen"
              :rules="rulesDosen"
              label="Dosen"
              color="grey darken-2"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-n7">
          <v-col>
            <v-combobox
              outlined
              dense
              label="Program Studi"
              v-model="selectedProdi"
              :items="prodis"
              :rules="rulesProdi"
              item-value="id"
              item-text="prodi"
            ></v-combobox>
          </v-col>
          <v-col>
            <v-combobox
              outlined
              dense
              label="Matakuliah"
              v-if="selectedProdi != null"
              v-model="selectedMatakuliah"
              :items="matkulByProdi"
              :rules="rulesMatkul"
              item-value="id"
              item-text="matakuliah"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-file-input
          accept="/*"
          label="Select File"
          outlined
          dense
          multiple
          chips
          truncate-length="50"
          :rules="rulesFile"
          @click:clear="fieldClear"
          @change="fieldChange"
        ></v-file-input>
        <!-- <input type="file" multiple @change="fieldChange" /> -->
        <div class="d-flex justify-end">
          <v-btn
            class="justify-end text-body-2"
            color="black darken-1"
            outlined
            dark
            @click="submit"
            >Tambah</v-btn
          >
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "TambahEmodul",
  data() {
    return {
      title: "",
      deskripsi: "",
      dosen: "",
      selectedProdi: "",
      selectedMatakuliah: "",
      files: [],

      // Validation
      rulesTitle: [
        v => !!v || 'Title harus diisi'
      ],
      rulesDeskripsi: [
        v => !!v || 'Deskripsi harus diisi'
      ],
      rulesDosen: [
        v => !!v || 'Dosen harus diisi'
      ],
      rulesProdi: [
        v => !!v || 'Prodi harus diisi'
      ],
      rulesMatkul: [
        v => !!v || 'Matkul harus diisi'
      ],
      rulesFile: [
        v => !!v || 'File harus diisi'
      ],
    };
  },
  computed: {
    ...mapGetters({
      prodis: "prodi/prodi",
      matakuliahs: "prodi/matakuliah",
    }),
    matkulByProdi() {
      let prodi_id = this.selectedProdi.id;
      return this.matakuliahs.filter(function (matakuliah) {
        if (matakuliah.prodi_id == prodi_id) return matakuliah;
      });
    },
  },
  methods: {
    ...mapActions({
      setStatusDialog: "dialog/setStatus",
      setAlert: "alert/set",
      setProdi: "prodi/setProdi",
      setMatakuliah: "prodi/setMatakuliah",
    }),
    close() {
      this.setStatusDialog(false);
    },
    fieldChange(event) {
      let selectedFiles = event;
      // this.files = selectedFiles
      for (let i = 0; i < selectedFiles.length; i++) {
        this.files.push(selectedFiles[i]);
      }

    },
    fieldClear() {
      this.files = [];
    },
    submit() {
      if(this.$refs.form.validate()) {
        if (this.files) {
          let formData = new FormData();
          formData.append("title", this.title);
          formData.append("deskripsi", this.deskripsi);
          formData.append("dosen", this.dosen);
          formData.append("prodi_id", this.selectedProdi.id);
          formData.append("matakuliah_id", this.selectedMatakuliah.id);
          for (let i = 0; i < this.files.length; i++) {
            formData.append("module[]", this.files[i]);
          }

  
          this.axios
            .post("/emodul", formData)
            .then((res) => {
              let response = res.data;
              if(response) {
                this.setAlert({
                  status: true,
                  text: response.message,
                  type: 'success',
                })
            this.$router.go(0)

                // this.$root.$emit('emodul-view')
                // this.close()
              }
            })
            .catch((err) => {
              let error = err.response;
              console.log(error);
            });
        } else {
          console.log("file not found");
        }
      }
    },
  },
  created() {
    if (this.prodis && this.prodis == 0) {
      this.axios.get("/prodi").then((res) => {
        this.setProdi(res.data.data);
      });
      this.axios.get("/matakuliah").then((res) => {
        this.setMatakuliah(res.data.data);
      });
    }
  },
};
</script>
<style lang=""></style>
