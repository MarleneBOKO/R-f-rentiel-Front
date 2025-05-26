<template>
  <v-app>
    <v-main class="">
      <router-view />
    </v-main>
    <v-snackbar :color="snackbar.bg" v-model="snackbar.status">
      {{ snackMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn
          :color="snackbar.color"
          text
          v-bind="attrs"
          @click="snackbar.status = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",

  computed: {
    ...mapGetters(["snackbar", "snackMessage"]),
  },
  methods: {},
  mounted() {},
  data: () => ({
    //
  }),
};
</script>
<style :src="../assets/css/main.css"></style>
