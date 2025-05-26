<template>
  <v-container fluid>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :loading="loading ? '#061a40' : null"
      :items="StatDeclarations"
      item-key="name"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Listing des déclarations sinistres</v-toolbar-title>
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
                      label="Numéro sinistre ASK..."
                      class="pt-5 pa-2"
                      filled
                      v-model="sinisterAskNumber"
                      prepend-inner-icon="mdi-magnify"
                      dense
                      outlined
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      color="#061a40"
                      label="Nom / Raison sociale"
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
                    <v-text-field
                      color="#061a40"
                      label="Date survenance debut ..."
                      class="pt-5 pa-2"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      dense
                      type="date"
                      v-model="startDate"
                      outlined
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      color="#061a40"
                      label="Date survenance fin..."
                      class="pt-5 pa-2"
                      filled
                      type="date"
                      prepend-inner-icon="mdi-magnify"
                      dense
                      outlined
                      v-model="endDate"
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      color="#061a40"
                      label="Date déclaration debut ..."
                      class="pt-5 pa-2"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      dense
                      type="date"
                      v-model="periodStartDate"
                      outlined
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      color="#061a40"
                      label="Date déclaration fin..."
                      class="pt-5 pa-2"
                      filled
                      type="date"
                      prepend-inner-icon="mdi-magnify"
                      dense
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
                    :href="statFileDeclaration"
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
        {
          text: "Compagnie",
          width: "200px",
          value: "company",
        },
        {
          text: "N° sinistre compagnie",
          width: "200px",
          value: "sinisterCompanyNumber",
        },
        { text: "Nom client", width: "200px", value: "name" },
        { text: "Produit", width: "200px", value: "product" },
        { text: "Date suvenance", width: "200px", value: "dateOfOccurrenceFr" },
        {
          text: "Date déclaration",
          width: "200px",
          value: "declarationDateFr",
        },
        {
          text: "Date envoi compagnie",
          width: "200px",
          value: "companyDispatchDateFr",
        },
        { text: "Compagnie", width: "200px", value: "driverName" },
        { text: "N° police", width: "200px", value: "policeNumber" },
        { text: "Circonstance", width: "200px", value: "circumstance" },
        // { text: "Statut", value: "protein" },
      ],
      workSheetColumnName: [
        "N° sinistre ASK",
        "N° sinistre compagnie",
        "Nom client",
        "Produit",
        "Date suvenance",
        "Date déclaration",
        "Date envoi compagnie",
        "Compagnie",
        "N° police",
        "Circonstance",
      ],
      workSheetName: "Rapport Statistique sinistres",
      nombre: "sinistres",
      users: [],
    };
  },
  mounted() {
    this.initialize();
  },
  computed: {
    ...mapGetters([
      "StatDeclarations",
      "Companies",
      "Products",
      "statFileDeclaration",
    ]),
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
      this.users = this.Declarations;

      importDataExcel(
        this.workSheetColumnName,
        this.workSheetName,
        this.nombre,
        this.users
      );
    },

    ...mapActions([
      "getStatDeclarations",
      "getDeclarationSearch",
      "getProducts",
      "getCompanies",
    ]),
    async makeSearchContract() {
      this.loading = true;
      //alert("ok");
      try {
        await this.getDeclarationSearch({
          fileName: this.fileName,
          product: this.product,
          sinisterAskNumber: this.sinisterAskNumber,
          startDate: this.startDate,
          endDate: this.endDate,
          company: this.company,
          withoutPeriod: this.showAllFil,
          currentYear: this.showYearFil,
        });
      } catch (error) {
        console.log(error);
        defaultMethods.dispatchError(
          this.$store,
          messages.failedToLoad("les sinistres")
        );
      }
      this.loading = false;
    },
    showAllFillData() {
      this.initialize();
      //alert(this.showAllFil);
    },
    onEnter: function() {
      this.initialize();
    },
    async initialize() {
      this.loading = true;
      try {
        await this.getStatDeclarations({
          fileName: this.fileName,
          product: this.product,
          sinisterAskNumber: this.sinisterAskNumber,
          startDate: this.startDate,
          endDate: this.endDate,
          periodStartDate: this.periodStartDate,
          periodEndDate: this.periodEndDate,
          company: this.company,
          withoutPeriod: this.showAllFil,
          currentYear: this.showYearFil,
        });
        await this.getCompanies();
        await this.getProducts({ name: this.searchData });
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
      this.loading = false;
    },
  },
};
</script>
