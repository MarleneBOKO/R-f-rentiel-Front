<template>
  <v-container fluid>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="statPV"
      :loading="loading ? '#061a40' : null"
      item-key="name"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Listing des procès Verbaux</v-toolbar-title>
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
                  <v-text-field
                    color="#061a40"
                    label="Date de demande PV début ..."
                    class="pt-5 pa-2"
                    filled
                    v-model="startDate"
                    prepend-inner-icon="mdi-magnify"
                    dense
                    outlined
                    type="date"
                    flat
                    background-color="grey lighten-4"
                    rounded
                  ></v-text-field>
                  <v-text-field
                    color="#061a40"
                    label="Date de demande PV fin ..."
                    class="pt-5 pa-2"
                    type="date"
                    filled
                    prepend-inner-icon="mdi-magnify"
                    dense
                    outlined
                    v-model="endDate"
                    flat
                    background-color="grey lighten-4"
                    rounded
                  ></v-text-field>
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
                    :href="statFilePv"
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
      companyNameList: [],
      productNameList: [],
      headers: [
        {
          text: "N° sinistre ASK",
          align: "start",
          sortable: false,
          width: "200px",
          value: "sinisterAskNumber",
        },
        { text: "Nom / Raison sociale", width: "200px", value: "thirdName" },
        {
          text: "N° Sinistre compagnie",
          width: "200px",
          value: "sinisterCompanyNumber",
        },
        { text: "Nom compagnie", width: "200px", value: "company" },
        { text: "Date d'accident", width: "200px", value: "createdAtFr" },
        {
          text: "Date de demande PV",
          width: "200px",
          value: "requestDatePvFr",
        },
        { text: "Date réception", width: "200px", value: "receptionDatePvFr" },
        { text: "Commissariat", width: "200px", value: "policeStation" },
        { text: "Localité", width: "200px", value: "locality" },
        { text: "Observation", width: "200px", value: "observation" },
      ],
      workSheetColumnName: [
        "N° sinistre ASK",
        "Nom / Raison sociale",
        "N° Sinistre compagnie",
        "Nom compagnie",
        "Date d'accident",
        "Date de demande PV",
        "Date réception",
        "Commissariat",
        "Localité",
        "Observation",
      ],
      workSheetName: "Rapport Statistique de PV",
      nombre: "pv",
      users: [],
    };
  },
  mounted() {
    this.initStatPV();
  },
  computed: {
    ...mapGetters(["statPV", "Companies", "Products", "statFilePv"]),
  },
  watch: {
    statCall() {},
    Companies() {
      this.companyNameList = defaultMethods.getNameList(this.Companies.docs);
      // this.seedCoinsuranceCompanyNameList();
    },
    Products() {
      // alert('ok')
      this.productNameList = defaultMethods.getNameList(this.Products.docs);
    },
  },

  methods: {
    importData() {
      //console.log(this.statCall);
      this.users = this.statPV;

      importDataExcel(
        this.workSheetColumnName,
        this.workSheetName,
        this.nombre,
        this.users
      );
    },
    onEnter: function() {
      this.initStatPV();
    },
    showAllFillData() {
      this.initStatPV();
      //alert(this.showAllFil);
    },
    ...mapActions(["getStatePV", "getCompanies", "getProducts"]),
    async initStatPV() {
      this.loading = true;
      try {
        await this.getStatePV({
          fileName: this.fileName,
          company: this.company,
          product: this.product,
          startDate: this.startDate,
          endDate: this.endDate,
          withoutPeriod: this.showAllFil,
          currentYear: this.showYearFil,
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
