<template>
  <v-container fluid>
    <v-data-table
      v-model="selected"
      :loading="loading ? '#061a40' : null"
      :headers="headers"
      :items="statEncaissement"
      item-key="name"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Listing des encaissement</v-toolbar-title>
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
                      label="Date encaissement début"
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
                      label="Date encaissement fin"
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
                    :href="statFileEncaissement"
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
          text: "N° client",
          align: "start",
          sortable: false,
          width: "90px",
          value: "customerNumber",
        },
        { text: "Nom / Raison sociale", width: "200px", value: "name" },
        { text: "compagnies", width: "200px", value: "company" },
        { text: "N° police / Avenant", width: "200px", value: "policeNumber" },
        { text: "Type d'opération", width: "200px", value: "actionType" },
        { text: "Branche", width: "200px", value: "product" },
        { text: "Catégorie", width: "200px", value: "category" },
        { text: "Date Effet", width: "200px", value: "effectDate" },
        { text: "Date échéance", width: "200px", value: "dueDate" },
        { text: "Date Enregistrement", width: "200px", value: "recordingDate" },
        { text: "Prime nette", width: "200px", value: "netPrime" },
        { text: "Commission", width: "200px", value: "commission" },
        { text: "Prime totale", width: "200px", value: "totalPrime" },
        { text: "Coût de police 100%", width: "200px", value: "accessory100" },
        { text: "Coût de police 50%", width: "200px", value: "accessory50" },
        { text: "Nom du commerciale", width: "200px", value: "agentName" },
        {
          text: "Date de paiement prime",
          width: "200px",
          value: "paymentDate",
        },
        { text: "Observation", width: "200px", value: "observation" },
      ],
      workSheetColumnName: [
        "N° Client",
        "Nom / Raison sociale",
        "Compagnies",
        "N° police / Avenant",
        "Type d'opération",
        "Branche",
        "Catégorie",
        "Date effet",
        "Date échéance",
        "Date Enregistrement",
        "Prime nette",
        "Commission",
        "Prime totale",
        "Coût de police 100%",
        "Coût de police 50%",
        "Nom du commerciale",
        "Date de paiement prime",
        "Observation",
      ],
      workSheetName: "Statistique d'encaissement",
      nombre: "encaissement",
      users: [],
    };
  },
  mounted() {
    this.initStatEncaissement();
  },
  computed: {
    ...mapGetters([
      "statEncaissement",
      "Companies",
      "Products",
      "statFileEncaissement",
    ]),
  },
  watch: {
    statCall() {},
  },
  methods: {
    onEnter: function() {
      this.initStatEncaissement();
    },
    showAllFillData() {
      this.initStatEncaissement();
      //alert(this.showAllFil);
    },
    importData() {
      this.users = this.statEncaissement;
      importDataExcel(
        this.workSheetColumnName,
        this.workSheetName,
        this.nombre,
        this.users
      );
    },
    ...mapActions(["getStateEncaissement", "getCompanies", "getProducts"]),
    async initStatEncaissement() {
      this.loading = true;
      try {
        await this.getStateEncaissement({
          fileName: this.fileName,
          product: this.product,
          company: this.company,
          periodStartDate: this.periodStartDate,
          periodEndDate: this.periodEndDate,
          // withoutPeriod: this.showAllFil,
          // currentYear: this.showYearFil,
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
