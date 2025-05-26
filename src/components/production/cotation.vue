<template>
  <v-container fluid>
    <v-data-table
      v-model="selected"
      :loading="loading ? '#061a40' : null"
      :headers="headers"
      :items="statQuoting"
      item-key="name"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Listing des cotations</v-toolbar-title>
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
                      label="Compagnie ..."
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      color="#061a40"
                      label="Date exécution demande début"
                      class="pt-5 pa-2"
                      filled
                      v-model="returnStartDate"
                      prepend-inner-icon="mdi-magnify"
                      dense
                      type="date"
                      outlined
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      color="#061a40"
                      label="Date exécution demande fin"
                      class="pt-5 pa-2"
                      filled
                      v-model="returnEndDate"
                      prepend-inner-icon="mdi-magnify"
                      dense
                      type="date"
                      outlined
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      color="#061a40"
                      label="Date création début"
                      class="pt-5 pa-2"
                      filled
                      v-model="periodStartDate"
                      prepend-inner-icon="mdi-magnify"
                      dense
                      type="date"
                      outlined
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      color="#061a40"
                      label="Date création fin"
                      class="pt-5 pa-2"
                      filled
                      v-model="periodEndDate"
                      prepend-inner-icon="mdi-magnify"
                      dense
                      type="date"
                      outlined
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
                    :href="statFileCotation"
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
      loading: false,
      selected: [],
      companyNameList: [],
      productNameList: [],
      headers: [
        {
          text: "Nom / Raison sociale",
          align: "start",
          width: "200px",
          sortable: false,
          value: "name",
        },
        { text: "Produit", width: "200px", value: "product" },

        { text: "Compagnies", width: "200px", value: "company" },
        {
          text: "Date réception demande",
          width: "200px",
          value: "createdAtFr",
        },
        {
          text: "Date exécution demande",
          width: "200px",
          value: "returnDateFr",
        },
        { text: "Prime Nette", width: "200px", value: "netPrime" },
        { text: "Accessoire", width: "200px", value: "accessory" },
        { text: "Taxe", width: "200px", value: "tax" },
        { text: "Prime TTC", width: "200px", value: "TTCPrime" },
        {
          text: "Date retour compagnie",
          width: "200px",
          value: "companyReturn.createdAtFr",
        },
        {
          text: "Date retour client",
          width: "200px",
          value: "customerReturn.createdAtFr",
        },
        { text: "Nom Agent", width: "200px", value: "agentName" },
        { text: "Statut", width: "200px", value: "status" },
      ],
      workSheetColumnName: [
        "Nom / Raison sociale",
        "Produit",
        "Compagnies",
        "Date réception demande",
        "Date exécution demande",
        "Prime Nette",
        "Accessoire",
        "Taxe",
        "Prime TTC",
        "Date retour compagnie",
        "Date retour client",
        "Nom de l'agent",
        "Statut",
      ],
      workSheetName: "Rapport Statistique cotations",
      nombre: "cotation",
      users: [],
    };
  },
  mounted() {
    this.initStatQuoting();
  },
  computed: {
    ...mapGetters(["statQuoting", "Companies", "Products", "statFileCotation"]),
  },
  watch: {
    statQuoting() {
      this.companyNameList = defaultMethods.getNameList(this.Companies.docs);
      this.productNameList = defaultMethods.getNameList(this.Products.docs);
      this.seedCoinsuranceCompanyNameList();
    },
  },
  methods: {
    importData() {
      //console.log(this.statCall);
      this.users = this.statQuoting;

      importDataExcel(
        this.workSheetColumnName,
        this.workSheetName,
        this.nombre,
        this.users
      );
    },
    onEnter: function() {
      this.initStatQuoting();
    },
    ...mapActions(["getStateQuoting", "getCompanies", "getProducts"]),
    showAllFillData() {
      this.initStatQuoting();
      //alert(this.showAllFil);
    },

    async initStatQuoting() {
      this.loading = true;
      try {
        await this.getStateQuoting({
          fileName: this.fileName,
          periodStartDate: this.periodStartDate,
          periodEndDate: this.periodEndDate,
          currentYear: this.showYearFil,
          withoutPeriod: this.showAllFil,
          product: this.product,
          company: this.company,
          returnStartDate: this.returnStartDate,
          returnEndDate: this.returnEndDate,
        });
        await this.getProducts({ name: this.searchData });
        await this.getCompanies();
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
