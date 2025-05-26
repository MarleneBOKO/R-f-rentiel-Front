<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :loading="loading ? '#061a40' : null"
      :items="statOffre"
      item-key="name"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Listing des règlements</v-toolbar-title>
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
                    @change="onEnter"
                    background-color="grey lighten-4"
                    rounded
                  ></v-text-field>
                  <v-select
                    :items="stateSheetItem"
                    class="pt-5 pa-2"
                    filled
                    prepend-inner-icon="mdi-magnify"
                    dense
                    outlined
                    @change="onEnter"
                    v-model="statSheet"
                    flat
                    background-color="grey lighten-4"
                    rounded
                    label="Etat actuelle du dossier"
                  ></v-select>
                  <v-select
                    :items="companyNameList"
                    class="pt-5 pa-2"
                    filled
                    prepend-inner-icon="mdi-magnify"
                    dense
                    outlined
                    @change="onEnter"
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
                    @change="onEnter"
                    flat
                    background-color="grey lighten-4"
                    rounded
                    label="Produit"
                  ></v-select>
                  <v-text-field
                    color="#061a40"
                    label="Date de enregistrement victime début ..."
                    class="pt-5 pa-2"
                    filled
                    v-model="periodStartDate"
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
                    label="Date de enregistrement victime fin ..."
                    class="pt-5 pa-2"
                    type="date"
                    filled
                    prepend-inner-icon="mdi-magnify"
                    dense
                    outlined
                    v-model="periodEndDate"
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
                    :href="statFileReglement"
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
          text: "Date de enregistrement victime",
          align: "start",
          sortable: false,
          width: "200px",
          value: "victimCreatedAtFr",
        },
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
        { text: "Branche", width: "200px", value: "product" },
        { text: "Catégorie", width: "200px", value: "category" },
        {
          text: "Date réceptions offre",
          width: "200px",
          value: "offerReceptDateFr",
        },
        { text: "Montant offre", width: "200px", value: "amount" },
        {
          text: "Date transmission accord client",
          width: "200px",
          value: "agreementTransmissionDateFr",
        },
        {
          text: "Date accord / d'ésaccord",
          width: "200px",
          value: "aggreementReceptDateFr",
        },
        {
          text: "Date réception chèque",
          width: "200px",
          value: "checkReceiptDateFr",
        },
        {
          text: "Date de transmission chèque",
          width: "200px",
          value: "checkTransmissionDateFr",
        },
        {
          text: "Date de retour quittance",
          width: "200px",
          value: "documentSendDateFr",
        },
        { text: "Observations", width: "200px", value: "observation" },
      ],
      stateSheetItem: [
        "Dossier en attente de pièces",
        "Dossier en attente d'offre",
        "Dossier en attente d'accord",
        "Dossier en attente de chèque",
        "Dossier en attente de quittance",
      ],

      workSheetColumnName: [
        "N° sinistre ASK",
        "N° Sinistre compagnie",
        "Nom / Raison sociale",
        "Nom compagnie",
        "Branche",
        "Catégorie",
        "Date réceptions offre",
        "Montant offre",
        "Date transmission accord client",
        "Date accord / d'ésaccord",
        "Date réception chèque",
        "Date de transmission chèque",
        "Date de retour quittance",
        "Observations",
      ],
      workSheetName: "Rapport Statistique Offre",
      nombre: "offre",
      users: [],
    };
  },
  mounted() {
    this.initstatOffre();
  },
  computed: {
    ...mapGetters(["statOffre", "Companies", "Products", "statFileReglement"]),
  },
  watch: {
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
      this.users = this.statOffre;

      importDataExcel(
        this.workSheetColumnName,
        this.workSheetName,
        this.nombre,
        this.users
      );
    },
    onEnter: function() {
      if (this.statSheet == "Dossier en attente de pièces") {
        this.emptyOfferSendDate = true;
        this.emptyOfferReceptDate = false;
        this.emptyAggreementReceptDate = false;
        this.emptyCheckReceiptDate = false;
        this.emptyReceptDateReturn = false;
        this.suspendOffrevalue = "Suspens";
      } else if (this.statSheet == "Dossier en attente d'offre") {
        this.emptyOfferReceptDate = true;
        this.emptyOfferSendDate = false;
        this.emptyAggreementReceptDate = false;
        this.emptyCheckReceiptDate = false;
        this.emptyReceptDateReturn = false;
        this.suspendOffrevalue = "Suspens";
      } else if (this.statSheet == "Dossier en attente d'accord") {
        this.emptyAggreementReceptDate = true;

        this.emptyOfferSendDate = false;
        this.emptyOfferReceptDate = false;
        this.emptyCheckReceiptDate = false;
        this.emptyReceptDateReturn = false;
        this.suspendOffrevalue = "Suspens";
      } else if (this.statSheet == "Dossier en attente de chèque") {
        this.emptyCheckReceiptDate = true;
        this.emptyOfferSendDate = false;
        this.emptyOfferReceptDate = false;
        this.emptyAggreementReceptDate = false;
        this.emptyReceptDateReturn = false;
        this.suspendOffrevalue = "Suspens";
      } else if (this.statSheet == "Dossier en attente de quittance") {
        this.suspendOffrevalue = "Suspens";
        this.emptyReceptDateReturn = true;
        this.emptyOfferSendDate = false;
        this.emptyOfferReceptDate = false;
        this.emptyAggreementReceptDate = false;
        this.emptyCheckReceiptDate = false;
      }
      this.initstatOffre();
    },
    showAllFillData() {
      this.initstatOffre();
      //alert(this.showAllFil);
    },
    ...mapActions(["getStateOffre", "getCompanies", "getProducts"]),
    async initstatOffre() {
      this.loading = true;
      try {
        // alert(this.emptyOfferSendDate);
        await this.getStateOffre({
          fileName: this.fileName,
          company: this.company,
          product: this.product,
          periodStartDate: this.periodStartDate,
          periodEndDate: this.periodEndDate,
          status: this.suspendOffrevalue,
          emptyOfferSendDate: this.emptyOfferSendDate,
          emptyOfferReceptDate: this.emptyOfferReceptDate,
          emptyAggreementReceptDate: this.emptyAggreementReceptDate,
          emptyCheckReceiptDate: this.emptyCheckReceiptDate,
          emptyReceptDateReturn: this.emptyReceptDateReturn,
          // withoutPeriod: this.showAllFil,
          // currentYear: this.showYearFil,
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
