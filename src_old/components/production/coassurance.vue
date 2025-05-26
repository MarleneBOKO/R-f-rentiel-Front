<template>
  <v-container fluid>
    <v-data-table
      v-model="selected"
      :loading="loading ? '#061a40' : null"
      :headers="headers"
      :items="statCoass"
      item-key="name"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Listing des Coassurance</v-toolbar-title>
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
                    :href="statFileCoas"
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
      loading: false,
      productNameList: [],
      companyNameList: [],
      headers: [
        {
          text: "Nom / Raison sociale",
          align: "start",
          width: "200px",
          sortable: false,
          value: "name",
        },
        { text: "Compagnie", width: "200px", value: "company" },
        { text: "N° police / Avenant", width: "200px", value: "policeNumber" },
        { text: "Type d'opération", width: "200px", value: "actionType" },
        { text: "Branche", width: "200px", value: "product" },
        { text: "Catégorie", width: "200px", value: "category" },
        { text: "Date Effet", width: "200px", value: "effectDateFr" },
        { text: "Date échéance", width: "200px", value: "dueDateFr" },
        {
          text: "Date Enregistrement",
          width: "200px",
          value: "recordingDateFr",
        },
        { text: "Prime nette", width: "200px", value: "netPrime" },
        { text: "Commission", width: "200px", value: "commission" },
        { text: "Compagnie tiers", width: "200px", value: "thirdPartyCompany" },
        { text: "Taux de partage", width: "200px", value: "shareRate" },
        {
          text: "Prime nette coassurance",
          width: "200px",
          value: "coinsuranceNetPrime",
        },
        {
          text: "Commission Coassurance",
          width: "200px",
          value: "coinsuranceCommission",
        },
        { text: "Appériteur", width: "200px", value: "leading" },
        { text: "Paiement Coassurance", width: "200px", value: "isPayed" },
        { text: "Observation", width: "200px", value: "observation" },
      ],
      chartCoassurance: [],
      workSheetColumnName: [
        "Nom / Raison sociale",
        "Compagnie",
        "N° police / Avenant",
        "Type d'opération",
        "Branche",
        "Catégorie",
        "Date effet",
        "Date échéance",
        "Date Enregistrement",
        "Prime nette",
        "Commission",
        "Compagnie tiers",
        "Taux de partage",
        "Prime nette coassurance",
        "Commission Coassurance",
        "Appériteur",
        "Paiement Coassurance",
        "Observation",
      ],
      workSheetName: "Statistique coassurance",
      nombre: "coassurance",
      users: [],
    };
  },
  mounted() {
    this.initStatCoass();
  },
  computed: {
    ...mapGetters(["statCoass", "Companies", "Products", "statFileCoas"]),
  },
  watch: {
    statCall() {},
  },
  methods: {
    onEnter: function() {
      this.initStatCoass();
    },
    importData() {
      this.users = this.statCoass;
      importDataExcel(
        this.workSheetColumnName,
        this.workSheetName,
        this.nombre,
        this.users
      );
    },
    ...mapActions(["getStateCoass", "getCompanies", "getProducts"]),
    async initStatCoass() {
      this.loading = true;
      try {
        await this.getStateCoass({
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
