<template>
  <v-container fluid>
    <v-data-table
      class="pt-3"
      flat
      :headers="Avenantheaders"
      :items="statPaiement"
      :loading="loading ? '#061a40' : null"
      :items-per-page="5"
      sort-by=""
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Liste des paiements </v-toolbar-title>
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
                    <v-text-field
                      color="#061a40"
                      label="Numéro Police ..."
                      class="pt-5 pa-2"
                      filled
                      v-model="policeNumber"
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
                      label="Numéro Avenant ..."
                      class="pt-5 pa-2"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      dense
                      outlined
                      v-model="plugged"
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
                    <v-text-field
                      color="#061a40"
                      label="Montant prime nette..."
                      class="pt-5 pa-2"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      dense
                      type="number"
                      outlined
                      v-model="netPrime"
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      color="#061a40"
                      label="Date paiement début ..."
                      class="pt-5 pa-2"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      dense
                      type="date"
                      outlined
                      v-model="collectionStartDate"
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      color="#061a40"
                      label="Date paiement fin ..."
                      class="pt-5 pa-2"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      dense
                      type="date"
                      outlined
                      v-model="collectionEndDate"
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      color="#061a40"
                      label="Date encaissement début ..."
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
                      label="Date encaissement fin ..."
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
                    :href="statFilePaiement"
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
      Avenantheaders: [
        { text: "Nom / Raison sociale", width: "200px", value: "name" },
        { text: "Compagnie", width: "200px", value: "company" },
        { text: "N° Police", width: "200px", value: "policeNumber" },
        { text: "N° quitances", width: "200px", value: "receiptNumber" },
        { text: "N° Avenant", width: "200px", value: "plugged" },
        { text: "Branches", width: "200px", value: "product" },
        { text: "Catégorie", width: "200px", value: "category" },
        { text: "Date effet", width: "200px", value: "effectDate" },
        { text: "Date échéance", width: "200px", value: "dueDate" },
        { text: "Date encaissement", width: "200px", value: "paymentDate" },
        { text: "Prime nette ASK", width: "200px", value: "netPrime" },
        { text: "Commission ASK", width: "200px", value: "commission" },
        { text: "Taux de commision", width: "200px", value: "commissionRate" },
        { text: "Mode de paiement", width: "200px", value: "paymentMethod" },
        { text: "Prime TTC", width: "200px", value: "totalPrime" },
        { text: "Accessoire", width: "200px", value: "cdeaoPrime" },
        { text: "Date paiement", width: "200px", value: "collectionDate" },
        {
          text: "Prime nette compagnie",
          width: "200px",
          value: "companyNetPrime",
        },
        {
          text: "Commission compagnie",
          width: "200px",
          value: "companyCommission",
        },
        {
          text: "Variation prime nette",
          width: "200px",
          value: "variationNetPrime",
        },
        {
          text: "Variation commission",
          width: "200px",
          value: "variationCommission",
        },
        {
          text: "Observation prime nette",
          width: "200px",
          value: "netPrimeObservation",
        },
        {
          text: "Observation commission",
          width: "200px",
          value: "commissionObservation",
        },
        {
          text: "Observation reversement",
          width: "200px",
          value: "transferObservation",
        },
        {
          text: "Observation paiement",
          width: "200px",
          value: "paymentObservation",
        },
      ],
      workSheetColumnName: [
        "Nom / Raison sociale",
        "Compagnie",
        "N° Police",
        "N° quitances",
        "N° Avenant",
        "Branche",
        "Catégorie",
        "Date effet",
        "Date échéance",
        "Date encaissement",
        "Prime nette ASK",
        "Commission ASK",
        "Prime TTC",
        "Accessoire",
        "Date paiement",
        "Prime nette compagnie",
        "Commission compagnie",
        "Variation prime nette",
        "Variation commission",
        "Observation prime nette",
        "Observation commission",
        "Observation reversement",
        "Observation paiement",
      ],
      workSheetName: "Statistique paiement",
      nombre: "paiement",
      users: [],
    };
  },
  mounted() {
    this.initContracts();
  },
  computed: {
    ...mapGetters([
      "statPaiement",
      "Companies",
      "Products",
      "statFilePaiement",
    ]),
  },
  watch: {
    statCall() {},
    Companies() {
      this.companyNameList = defaultMethods.getNameList(this.Companies.docs);
      // this.seedCoinsuranceCompanyNameList();
    },
    Products() {
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
      "getStatePaiement",
      "getCompanies",
      "postSearchContrat",
      "getProducts",
    ]),
    async makeSearchContract() {
      this.loading = true;
      try {
        await this.postSearchContrat({
          fileName: this.fileName,
          product: this.product,
          policeNumber: this.policeNumber,
          plugged: this.plugged,
          company: this.company,
          paymenStartDate: this.startDate,
          paymentEndDate: this.endDate,
          notPayed: false,
          payed: true,
          netPrime: this.netPrimeSearch,
        });
        this.users = this.statPaiement;
      } catch (error) {
        console.log(error);
        defaultMethods.dispatchError(
          this.$store,
          messages.failedToLoad("les contrats")
        );
      }
      this.loading = false;
    },
    showAllFillData() {
      this.initContracts();
      //alert(this.showAllFil);
    },
    onEnter: function() {
      this.initContracts();
    },
    async initContracts() {
      this.loading = true;
      try {
        await this.getStatePaiement({
          fileName: this.fileName,
          collectionStartDate: this.collectionStartDate,
          collectionEndDate: this.collectionEndDate,
          periodStartDate: this.periodStartDate,
          periodEndDate: this.periodEndDate,
          netPrime: this.netPrime,
          company: this.company,
          product: this.product,
          withoutPeriod: this.showAllFil,
          currentYear: this.showYearFil,
        });
        await this.getCompanies();
        await this.getProducts({});
        this.users = this.statPaiement;
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
