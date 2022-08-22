<template lang="">
  <v-dialog v-model="dialog" persistent width="300px">
    <v-card>
      <v-card-title class="text-h5"> Delete Data </v-card-title>
      <v-card-text> Anda yakin delete data ini? </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="submit"> Ya </v-btn>
        <v-btn color="green darken-1" text @click="close"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DeleteMatakuliah",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      dialog: "dialog/status",
      id: "dialog/id",
    }),
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
      this.axios
        .delete("/matakuliah/" + this.id)
        .then((response) => {
          let responses = response.data;
          if (responses) {
            this.setAlert({
              status: true,
              text: responses.message,
              type: "success",
            });
            this.$root.$emit("matakuliah-view");
            this.close();
          }
        })
    },
  },
};
</script>
<style lang=""></style>
