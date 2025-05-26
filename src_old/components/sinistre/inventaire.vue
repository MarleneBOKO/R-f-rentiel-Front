<template>
  <v-container fluid>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :loading="loading ? '#061a40' : null"
      :items="inventory"
      :items-per-page="5"
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
                  <v-text-field
                    color="#061a40"
                    label="Numéro sinistre ASK..."
                    class="pt-5 pa-2"
                    filled
                    v-model="sinisterAskNumber"
                    prepend-inner-icon="mdi-magnify"
                    dense
                    @change="onEnter"
                    outlined
                    flat
                    background-color="grey lighten-4"
                    rounded
                  ></v-text-field>
                  <v-text-field
                    color="#061a40"
                    label="Numéro sinistre compagnie..."
                    class="pt-5 pa-2"
                    filled
                    v-model="sinisterCompanyNumber"
                    prepend-inner-icon="mdi-magnify"
                    dense
                    @change="onEnter"
                    outlined
                    flat
                    background-color="grey lighten-4"
                    rounded
                  ></v-text-field>
                  <v-text-field
                    color="#061a40"
                    label="Nom / Raison sociale assurer"
                    class="pt-5 pa-2"
                    filled
                    prepend-inner-icon="mdi-magnify"
                    @change="onEnter"
                    dense
                    v-model="fileName"
                    outlined
                    flat
                    background-color="grey lighten-4"
                    rounded
                  ></v-text-field>
                  <v-text-field
                    color="#061a40"
                    label="Nom / Raison sociale victime"
                    class="pt-5 pa-2"
                    filled
                    prepend-inner-icon="mdi-magnify"
                    @change="onEnter"
                    dense
                    v-model="victimName"
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
                    @change="onEnter"
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
                  <v-select
                    :items="offreStatut"
                    class="pt-5 pa-2"
                    filled
                    prepend-inner-icon="mdi-magnify"
                    dense
                    outlined
                    v-model="status"
                    @change="onEnter"
                    flat
                    background-color="grey lighten-4"
                    rounded
                    label="Statut"
                  ></v-select>

                  <v-text-field
                    color="#061a40"
                    label="Date survenance debut ..."
                    class="pt-5 pa-2"
                    filled
                    prepend-inner-icon="mdi-magnify"
                    dense
                    type="date"
                    @change="onEnter"
                    v-model="occurrenceStartDate"
                    outlined
                    flat
                    background-color="grey lighten-4"
                    rounded
                  ></v-text-field>
                  <v-text-field
                    color="#061a40"
                    label="Date survenance fin..."
                    class="pt-5 pa-2"
                    filled
                    type="date"
                    prepend-inner-icon="mdi-magnify"
                    dense
                    outlined
                    @change="onEnter"
                    v-model="occurrenceEndDate"
                    flat
                    background-color="grey lighten-4"
                    rounded
                  ></v-text-field>

                  <v-text-field
                    color="#061a40"
                    label="Date déclaration debut ..."
                    class="pt-5 pa-2"
                    filled
                    prepend-inner-icon="mdi-magnify"
                    dense
                    type="date"
                    @change="onEnter"
                    v-model="declarationStartDate"
                    outlined
                    flat
                    background-color="grey lighten-4"
                    rounded
                  ></v-text-field>
                  <v-text-field
                    color="#061a40"
                    label="Date déclaration fin..."
                    class="pt-5 pa-2"
                    filled
                    type="date"
                    prepend-inner-icon="mdi-magnify"
                    dense
                    outlined
                    @change="onEnter"
                    v-model="declarationEndDate"
                    flat
                    background-color="grey lighten-4"
                    rounded
                  ></v-text-field>
                  <v-text-field
                    color="#061a40"
                    label="Date règlement debut ..."
                    class="pt-5 pa-2"
                    filled
                    prepend-inner-icon="mdi-magnify"
                    dense
                    type="date"
                    @change="onEnter"
                    v-model="offerSendStartDate"
                    outlined
                    flat
                    background-color="grey lighten-4"
                    rounded
                  ></v-text-field>
                  <v-text-field
                    color="#061a40"
                    label="Date règlement fin..."
                    class="pt-5 pa-2"
                    filled
                    type="date"
                    prepend-inner-icon="mdi-magnify"
                    dense
                    outlined
                    @change="onEnter"
                    v-model="offerSendEndDate"
                    flat
                    background-color="grey lighten-4"
                    rounded
                  ></v-text-field>
                  <v-text-field
                    color="#061a40"
                    label="Date réception chèque debut ..."
                    class="pt-5 pa-2"
                    filled
                    prepend-inner-icon="mdi-magnify"
                    dense
                    type="date"
                    @change="onEnter"
                    v-model="checkReceiptStartDate"
                    outlined
                    flat
                    background-color="grey lighten-4"
                    rounded
                  ></v-text-field>
                  <v-text-field
                    color="#061a40"
                    label="Date réception chèque fin..."
                    class="pt-5 pa-2"
                    filled
                    type="date"
                    prepend-inner-icon="mdi-magnify"
                    dense
                    outlined
                    @change="onEnter"
                    v-model="checkReceiptEndDate"
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
                    :href="statFileInventaire"
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
      companyNameList: "",
      productNameList: "",
      status: "*",
      loading: false,
      headers: [
        {
          text: "N° sinistre ASK",
          align: "start",
          sortable: false,
          width: "200px",
          value: "sinisterAskNumber",
        },
        {
          text: "N° sinistre compagnie",
          width: "200px",
          value: "sinisterCompanyNumber",
        },
        { text: "Nom client", width: "200px", value: "contractName" },
        { text: "N° police", width: "200px", value: "contractPoliceNumber" },
        { text: "Nom victime", width: "200px", value: "thirdName" },
        { text: "Produit", width: "200px", value: "contractProduct" },
        { text: "Date suvenance", width: "200px", value: "dateOfOccurrenceFr" },
        {
          text: "Date déclaration",
          width: "200px",
          value: "declarationDateFr",
        },
        { text: "Compagnie", width: "200px", value: "contractCompany" },
        { text: "Circonstance", width: "200px", value: "circumstance" },
        // { text: "Pièce à fournir", value: "stringDocumentsProvides" },
        // { text: "Pièce fournies", value: "stringDocumentProvides" },
        //  { text: "Pièce Restantes", value: "stringNotDocumentsProvides" },
        { text: "Date demande PV", width: "200px", value: "requestDatePvFr" },
        {
          text: "Date réception PV compagnie",
          width: "200px",
          value: "receptionDatePvFr",
        },
        { text: "Nom commissariat", width: "200px", value: "policeStation" },
        {
          text: "Date demande BON",
          width: "200px",
          value: "couponRequestDateFr",
        },
        {
          text: "Date réception Rapport",
          width: "200px",
          value: "expertiseReportReceptionDateFr",
        },
        { text: "Nom expert", width: "200px", value: "expertiseExpertName" },
        {
          text: "Dommages Matériels victime",
          value: "thirdPartyMaterialDamageFr",
          width: "200px",
        },
        {
          text: "Dommages Corporels victime",
          width: "200px",
          value: "thirdPartyBodilyInjuryFr",
        },
        { text: "PSAP", width: "200px", value: "PSAP" },
        { text: "Montant offre", width: "200px", value: "offerAmount" },
        {
          text: "Date envoi pièces",
          width: "200px",
          value: "offerDocumentSendDateFr",
        },
        {
          text: "Date réception offre",
          width: "200px",
          value: "offerReceptDateFr",
        },
        {
          text: "Date réception accord",
          width: "200px",
          value: "offerAggreementReceptDateFr",
        },
        {
          text: "Date envoi accord",
          width: "200px",
          value: "offerAgreementTransmissionDateFr",
        },
        { text: "Statut", width: "200px", value: "offerStatus" },
        { text: "Observation", width: "200px", value: "offerObservation" },
        // { text: "Statut", value: "protein" },
      ],
      offreStatut: [
        "*",
        "Suspens",
        "Soldé",
        "Sans suite",
        "Recours",
        "Prescrit",
      ],
      chartExpertise: [],
      workSheetColumnName: [
        "N° sinistre ASK",
        "N° sinistre compagnie",
        "Nom client",
        "N° police",
        "Nom victime",
        "Produit",
        "Date suvenance",
        "Date déclaration",
        "Compagnie",
        "Circonstance",
        "Pièce à fournir",
        "Pièce fournies",
        "Pièce Restantes",
        "Date demande PV",
        "Date réception PV compagnie",
        "Nom commissariat",
        "Date demande BON",
        "Date réception Rapport",
        "Nom expert",
        "Dommages Matériels victime",
        "Dommages Corporels victime",
        "PSAP",
        "Montant offre",
        "Date envoi pièces",
        "Date réception offre",
        "Date réception accord",
        "Date envoi accord",
        "Status",
        "Obsservations",
      ],
      workSheetName: "Statistique d'inventaire",
      nombre: "inventaire",
      users: [],
    };
  },
  mounted() {
    this.initStatEncaissement();
  },
  computed: {
    ...mapGetters(["inventory", "Companies", "Products", "statFileInventaire"]),
  },
  watch: {
    statCall() {},
    dialogDelete(val) {
      val || this.closeDelete();
    },
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
      importDataExcel(
        this.workSheetColumnName,
        this.workSheetName,
        this.nombre,
        this.users
      );
    },
    ...mapActions([
      "getInventory",
      "getInventorySearch",
      "getProducts",
      "getCompanies",
    ]),
    async initStatEncaissement() {
      this.loading = true;
      try {
        await this.getInventory({ withoutPeriod: true });
        await this.getCompanies();
        await this.getProducts({ name: this.searchData });
        this.users = this.inventory;
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
      this.loading = false;
    },
    async makeSearchContract() {
      this.loading = true;
      //alert("ok");
      try {
        await this.getInventorySearch({
          sinisterCompanyNumber: this.sinisterCompanyNumber,
          sinisterAskNumber: this.sinisterAskNumber,
          declarationStartDate: this.declarationStartDate,
          declarationEndDate: this.declarationEndDate,
          occurrenceStartDate: this.occurrenceStartDate,
          occurrenceEndDate: this.occurrenceEndDate,
          fileName: this.fileName,
          victimName: this.victimName,
          company: this.company,
          product: this.product,
          offerSendStartDate: this.offerSendStartDate,
          offerSendEndDate: this.offerSendEndDate,
          checkReceiptStartDate: this.checkReceiptStartDate,
          checkReceiptEndDate: this.checkReceiptEndDate,
          status: this.status,
          withoutPeriod: this.showAllFil,
          currentYear: this.showYearFil,
        });
        this.users = this.inventory;
      } catch (error) {
        console.log(error);
        defaultMethods.dispatchError(
          this.$store,
          messages.failedToLoad("les sinistres")
        );
      }
      this.loading = false;
    },
    onEnter: function() {
      this.makeSearchContract();
    },
    showAllFillData() {
      this.makeSearchContract();
      //alert(this.showAllFil);
    },
  },
};
</script>
