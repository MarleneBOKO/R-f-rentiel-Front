<template>
  <v-container>
    <!-- Filtres -->
    <v-expansion-panels flat style="border: 1px solid #3A1C71;margin-bottom:10px">
      <v-expansion-panel class="elevation-0">
        <v-expansion-panel-header>
          <v-icon class="ml-2" left>mdi-filter-variant</v-icon> Filtres Rapport
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                label="Date de réception (début)"
                v-model="filters.startReceivedDate"
                type="date"
                color="#3A1C71"
                filled dense outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                label="Date de réception (fin)"
                v-model="filters.endReceivedDate"
                type="date"
                color="#3A1C71"
                filled dense outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                label="Motif"
                v-model="filters.patterns"
                prepend-inner-icon="mdi-magnify"
                color="#3A1C71"
                filled dense outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#3A1C71" outlined pill @click="fetchRapports">
              <v-icon left>mdi-magnify</v-icon> Rechercher
            </v-btn>
          </v-card-actions>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- Tableau des rapports -->
    <v-data-table
      :headers="headers"
      :items="rapports"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:item.reportReceivedDate="{ item }">
        {{ formatDate(item.reportReceivedDate) }}
      </template>

      <template v-slot:item.reportProcessedDate="{ item }">
        {{ formatDate(item.reportProcessedDate) }}
      </template>

      <template v-slot:no-data>
        <v-alert type="warning" class="ma-5" border="left" colored-border>
          Aucun rapport trouvé.
        </v-alert>
      </template>
    </v-data-table>

    <!-- Chargement -->
    <v-dialog v-model="loading" persistent width="300">
      <v-card>
        <v-card-text>Chargement des rapports...</v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "RapportListing",
  data() {
    return {
      rapports: [],
      loading: false,
      filters: {
        startReceivedDate: '',
        endReceivedDate: '',
        patterns: '',
      },
      headers: [
        { text: "Pièces", value: "documents" },
        { text: "Nombre", value: "number" },
        { text: "Montant Demandé", value: "amountRequested" },
        { text: "Montant Réglé", value: "amountToBePaid" },
        { text: "Motif", value: "patterns" },
        { text: "Date Réception", value: "reportReceivedDate" },
        { text: "Date Traitement", value: "reportProcessedDate" },
          { text: "Type Rapport", value: "reportType" },
      ],
    };
  },
  methods: {
   async fetchRapports() {
  this.loading = true;
  try {
    const params = {};
    if (this.filters.startReceivedDate) {
      params.startReceivedDate = this.filters.startReceivedDate;
    }
    if (this.filters.endReceivedDate) {
      params.endReceivedDate = this.filters.endReceivedDate;
    }
    if (this.filters.patterns) {
      params.patterns = this.filters.patterns;
    }

    const res = await axios.get("/materialdamage/rapports", { params });

    if (res.data.success) {
      this.rapports = res.data.data;
    } else {
      this.rapports = [];
    }
  } catch (err) {
    console.error("Erreur lors de la récupération des rapports:", err);
    this.rapports = [];
  } finally {
    this.loading = false;
  }
},

    formatDate(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return date.toLocaleDateString("fr-FR");
    }
  },
  mounted() {
    this.fetchRapports();
  }
};
</script>
