<template>
  <v-container class="my-4 d-flex justify-center flex-column">
    <v-card class="px-4 py-3 mb-5">
      <v-row class="d-flex align-baseline justify-space-between pa-3">
        <h1 class="text-h5 font-weight-regular mb-3">Profile</h1>
        <v-btn
          class="white--text"
          color="blue darken-4"
          icon
          @click="updateProfile()"
        >
          <v-icon>md mdi-pencil</v-icon>
        </v-btn>
      </v-row>
      <v-divider></v-divider> <br />
      <v-row class="px-2 py-2 d-flex align-center justify-center">
        <v-col cols="5" sm="2">Nomor induk</v-col>
        <v-col cols="1">:</v-col>
        <v-col cols="6" sm="9">{{ this.user.nomor_induk }}</v-col>
      </v-row>
      <v-divider />
      <v-row class="px-2 py-2 d-flex align-center justify-center">
        <v-col cols="5" sm="2">Nama Lengkap</v-col>
        <v-col cols="1">:</v-col>
        <v-col cols="6" sm="9">{{ this.user.nama_lengkap }}</v-col>
      </v-row>
      <v-divider />
      <v-row class="px-2 py-2 d-flex align-center justify-center">
        <v-col cols="5" sm="2">Prodi</v-col>
        <v-col cols="1">:</v-col>
        <v-col cols="6" sm="9">{{ this.prodi.prodi }}</v-col>
      </v-row>
      <v-divider />
      <v-row class="px-2 py-2 d-flex align-center justify-center">
        <v-col cols="5" sm="2">Userame</v-col>
        <v-col cols="1">:</v-col>
        <v-col cols="6" sm="9">{{ this.user.username }}</v-col>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-col class="d-flex justify-center" cols="12" sm="4">
          <v-btn
            class="white--text"
            color="blue darken-4"
            block
            @click="logout"
          >
            Logout
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ProfileView",
  data() {
    return {
      user: [],
      prodi: [],
    };
  },
  methods: {
    ...mapActions({
      setStatusDialog: "dialog/setStatus",
      setComponent: "dialog/setComponent",
      setId: "dialog/setId",
    }),
    updateProfile() {
      this.setStatusDialog(true),
        this.setComponent("UpdateProfile"),
        this.setId(this.user.id);
      this.$root.$emit("update-profile");
    },
    retrieveProfile() {
      let userData = JSON.parse(localStorage.getItem("dataUser"));
      this.axios
        .get("/users/" + userData.user.id)
        .then((res) => {
          this.user = res.data.data[0];
          this.prodi = res.data.data[0].prodi;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    logout() {
      let dataUser = JSON.parse(localStorage.getItem("dataUser"));
      let config = {
        headers: {
          Authorization: "Bearer " + dataUser.token,
        },
      };
      this.axios.post("/logout", {}, config).then((res) => {
        const response = res.data.message;
        console.log(response);
        if (response) {
          localStorage.removeItem("dataUser");
          this.$router.push({ name: "login" });
        }
      });
    },
  },
  mounted() {
    this.retrieveProfile()
  },
};
</script>

<style></style>
