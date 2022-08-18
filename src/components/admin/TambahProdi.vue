<template>
  <v-card class="px-3 py-5">
    <v-row class="d-flex justify-space-between align-center">
      <v-col cols="9" sm="10" md="10" lg="10">
        <v-card-title> Tambah Program Studi </v-card-title>
      </v-col>
      <v-col class="ml-9">
        <v-icon class="justify-end" size="25" @click="close">
          md mdi-close-circle-outline
        </v-icon>
      </v-col>
    </v-row>
    <v-container class="mt-4">
      <v-form lazy-validation ref="form">
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
import { mapActions } from "vuex";

export default {
  name: "TambahProdi",
  data() {
    return {
      jenjang: "",
      items: ["D3", "D4"],
      prodi: "",

      // validation
      rulesJenjang: [(v) => !!v || "Jenjang harus diisi"],
      rulesProdi: [(v) => !!v || "Prodi harus diisi"],
    };
  },
  methods: {
    ...mapActions({
      setStatusDialog: "dialog/setStatus",
      setAlert: "alert/set",
    }),
    close() {
      this.setStatusDialog(false);
    },
    submit() {
      if (this.$refs.form.validate()) {
        let formData = {
          jenjang: this.jenjang,
          prodi: this.prodi,
        };
        this.axios
          .post("/prodi", formData)
          .then((response) => {
            let response_data = response.data;
            console.log(response_data);
            if (response_data) {
              this.setAlert({
                status: true,
                text: response_data.message,
                type: "success",
              });
              this.$root.$emit('prodi-view')
              this.close()
              this.$router.go(0);

            }
          })
          .catch((error) => {
            let responses = error.response;
            console.log(responses.data);
          });
      }
    },
  },
};
</script>
<style lang=""></style>
