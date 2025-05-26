<template>
  <v-container fluid>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="statReass"
      :loading="loading ? '#061a40' : null"
      item-key="name"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Listing des Réassurance</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>

          <!-- <v-switch
            v-model="showAllFil"
            label="Afficher toutes les données"
            color="#061a40"
            @change="showAllFillData"
            class="pt-5"
          ></v-switch>
          <v-switch
            v-model="showYearFil"
            label="afficher les données de l'année "
            color="#061a40"
            @change="showAllFillData"
            class="ml-10 pt-5"
          ></v-switch> -->
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container fluid>
          <v-expansion-panels flat style="border: 1px solid #061a40">
            <v-expansion-panel class="elevation-0">
              <v-expansion-panel-header>
                Tri / Recherche et importation vers excel ...
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      color="#061a40"
                      label="Nom / Raison Sociale ..."
                      class="pt-5 pa-2"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      dense
                      v-model="fileName"
                      outlined
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-select
                      :items="productNameList"
                      class="pt-5 pa-2"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      dense
                      outlined
                      v-model="product"
                      flat
                      background-color="grey lighten-4"
                      rounded
                      label="Produit"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-select
                      :items="companyNameList"
                      class="pt-5 pa-2"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      dense
                      outlined
                      v-model="company"
                      flat
                      background-color="grey lighten-4"
                      rounded
                      label="Compagnie"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      color="#061a40"
                      label="Date de début"
                      class="pt-5 pa-2"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      dense
                      type="date"
                      outlined
                      v-model="periodStartDate"
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      color="#061a40"
                      label="Date de fin"
                      class="pt-5 pa-2"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      dense
                      type="date"
                      outlined
                      v-model="periodEndDate"
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="#061a40"
                    outlined
                    pill
                    rounded
                    class="mr-2"
                    @click="onEnter"
                  >
                    <v-icon left>
                      mdi-magnify
                    </v-icon>
                    Appliquer la recherche
                  </v-btn>

                  <v-btn
                    color="#1D6F42"
                    rounded
                    class="white--text pa-5"
                    :href="statFileReass"
                    target="_blank"
                  >
                    <v-icon size="30" class="mr-8" color="#fff" left>
                      mdi-microsoft-excel
                    </v-icon>
                    Exporter vers un tableau EXCEL
                  </v-btn>
                </v-card-actions>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-container>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { defaultMethods, messages } from "@/utils/data";
import { importDataExcel } from "../../exportDoc/index.js";
export default {
  name: "chartCall",
  data() {
    return {
      singleSelect: false,
      selected: [],
      headers: [
        { text: "Nom / Raison sociale", width: "200px", value: "name" },
        { text: "compagnies", width: "200px", value: "company" },
        { text: "N° police ", width: "200px", value: "policeNumber" },
        { text: "Branche", width: "200px", value: "product" },
        { text: "Catégorie", width: "200px", value: "category" },
        { text: "Date Effet", width: "200px", value: "effectDateFr" },
        { text: "Date échéance", width: "200px", value: "dueDateFr" },
        {
          text: "Date Enregistrement",
          width: "200px",
          value: "recordingDateFr",
        },
        { text: "Prime Nette", width: "200px", value: "netPrime" },
        { text: "Commission", width: "200px", value: "commission" },
        { text: "Assureur", width: "200px", value: "insurer" },
        { text: "Prime conservée", width: "200px", value: "preservePrime" },
        { text: "Réassureur", width: "200px", value: "" },
        { text: "Prime cédée", width: "200px", value: "cedePrime" },
        { text: "Paiement", width: "200px", value: "isPayed" },
        { text: "Observations", width: "200px", value: "observation" },
      ],
      chartReassurance: [],
      workSheetColumnName: [
        "Nom / Raison sociale",
        "compagnies",
        "N° police",
        "Branche",
        "Catégorie",
        "Date Effet",
        "Date échéance",
        "Date Enregistrement",
        "Prime Nette",
        "Commission",
        "Assureur",
        "Prime conservée",
        "Réassureur",
        "Prime cédée",
        "Paiement",
        "Observations",
      ],
      workSheetName: "Statistique régularisation",
      nombre: "Reass",
      users: [],
      loading: false,
    };
  },
  mounted() {
    this.initStatReass();
  },
  computed: {
    ...mapGetters(["statReass", "Companies", "Products", "statFileReass"]),
  },
  watch: {
    statCall() {},
  },
  methods: {
    onEnter: function() {
      this.initStatReass();
    },
    showAllFillData() {
      this.initStatReass();
      //alert(this.showAllFil);
    },
    importData() {
      this.users = this.statReass;
      importDataExcel(
        this.workSheetColumnName,
        this.workSheetName,
        this.nombre,
        this.users
      );
    },
    ...mapActions(["getStateReass", "getCompanies", "getProducts"]),
    async initStatReass() {
      this.loading = true;
      try {
        await this.getStateReass({
          fileName: this.fileName,
          product: this.product,
          company: this.company,
          periodStartDate: this.periodStartDate,
          periodEndDate: this.periodEndDate,
          withoutPeriod: this.showAllFil,
          currentYear: this.showYearFil,
        });

        await this.getProducts({ name: this.searchData });
        await this.getCompanies();
        this.companyNameList = defaultMethods.getNameList(this.Companies.docs);
        this.productNameList = defaultMethods.getNameList(this.Products.docs);
      } catch (error) {
        defaultMethods.dispatchError(
          this.$store,
          messages.failedToLoad("les dossiers")
        );
      }
      this.loading = false;
    },
  },
};
</script>
