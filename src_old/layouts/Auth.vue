<template>
  <v-app>
    <v-main>

      <router-view />
    </v-main>

    <v-snackbar v-model="Snackbar.showing">
      {{ Snackbar.message }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="Snackbar.showing = false">
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
    ...mapGetters(["Snackbar"]),
  },
  methods: {},
  mounted() {},
  data: () => ({
    //
  }),
};
</script>
<style :src="../assets/css/main.css"></style>
