<template>
  <v-container>
  <v-container fluid>
      <v-expansion-panels flat style="border: 1px solid #3A1C71;margin-bottom:10px">
        <v-expansion-panel class="elevation-0">
          <v-expansion-panel-header>
            <span>
              <v-icon class="ml-2" left> mdi-filter-variant </v-icon> Tri /
              Recherche ...
            </span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date demande début" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="StartDate" type="date" filled dense outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date demande fin" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="EndDate" type="date" filled dense outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Nom Bénéficiaire" class="pt-5 pa-2" filled
                  prepend-inner-icon="mdi-magnify" dense v-model="victimNameSearch" outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Numéro sinistre" class="pt-5 pa-2" filled
                  prepend-inner-icon="mdi-magnify" dense v-model="sinisterNumberSearch" outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#3A1C71" outlined pill rounded class="mr-2" @click="fetchDemandes">
                <v-icon left>
                  mdi-magnify
                </v-icon>
                Appliquer la recherche
              </v-btn>
              
            </v-card-actions>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>

    <!-- Tableau des résultats -->
    <v-data-table
      :headers="headers"
      :items="demandes"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.Numero_Demande">
            <td>{{ item.Numero_Demande }}</td>
            <td>{{ item.Poste_Client }}</td>
            <td>{{ item.Numero_Sinistre }}</td>
            <td>{{ item.Montant }}</td>
            <td>{{ formatDate(item.Date_Demande) }}</td>
            <td>{{ item.Nom_Assure }}</td>
            <td>{{ item.Objet }}</td>
            <td>{{ item.Beneficiaire }}</td>
            <td>{{ item.Numero_Client }}</td>
            <td>{{ item.Recours_Encaisse }}</td>
            <td>{{ item.Numero_Police }}</td>
          </tr>
        </tbody>
      </template>

      <template v-slot:no-data>
        <v-alert type="warning" class="ma-5" border="left" colored-border>
          Aucune demande trouvée.
        </v-alert>
      </template>
    </v-data-table>

    <!-- Chargement -->
    <v-dialog v-model="loading" persistent width="300">
      <v-card>
        <v-card-text>Chargement en cours...</v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "DemandeCheque",

  data() {
    return {
      demandes: [],
      StartDate: '',
    EndDate: '',
    victimNameSearch: '',
    sinisterNumberSearch: '',
      loading: false,
      headers: [
        { text: "Numéro de Demande", value: "Numero_Demande" },
        { text: "Poste Client", value: "Poste_Client" },
        { text: "Numéro Sinistre", value: "Numero_Sinistre" },
        { text: "Montant", value: "Montant" },
        { text: "Date Demande", value: "Date_Demande" },
        { text: "Nom Assuré", value: "Nom_Assure" },
        { text: "Objet", value: "Objet" },
        { text: "Bénéficiaire", value: "Beneficiaire" },
        { text: "Numéro Client", value: "Numero_Client" },
        { text: "Recours Encaissé", value: "Recours_Encaisse" },
        { text: "Numéro Police", value: "Numero_Police" },
      ],
    };
  },

  methods: {
   async fetchDemandes() {
  this.loading = true;

  try {
    const res = await axios.get("/demandecheque", {
      params: {
        startDate: this.StartDate,
        endDate: this.EndDate,
        beneficiary: this.victimNameSearch,
        sinisterNumber: this.sinisterNumberSearch,
        page: 1,
        limit: 10,
      },
    });

    if (res.data.success) {
      this.demandes = res.data.data;
    } else {
      this.demandes = [];
    }
  } catch (err) {
    console.error("Erreur de chargement des demandes :", err);
    this.demandes = [];
  } finally {
    this.loading = false;
  }
},


    formatDate(dateStr) {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      return date.toLocaleDateString("fr-FR");
    },
  },

  mounted() {
    this.fetchDemandes();
  },
};
</script>

<style scoped>
</style>
 