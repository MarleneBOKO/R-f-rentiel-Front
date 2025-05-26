<template>
  <v-container fluid>
    <v-data-table
      v-model="selected"
      :loading="loading ? '#061a40' : null"
      :headers="Avenantheaders"
      :items="statEcheance"
      item-key="name"
      items-per-page="5"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Listing des avis échéance </v-toolbar-title>
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
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="deadLineNoticeStatus"
                      :items="natureprospect"
                      label="Statut"
                      color="#061a40"
                      class="pt-5 pa-2"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      dense
                      outlined
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-select>
                  </v-col>
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
                    :href="statFileEcheance"
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
      productNameList: [],
      companyNameList: [],
      loading: false,
      natureprospect: [
        "Renouvelé",
        "En cours",
        "Non renouvelé",
        "Perdu",
        "Non Renouvelable",
      ],
      Avenantheaders: [
        { text: "Statut", width: "200px", value: "status" },
        { text: "Agent", width: "200px", value: "agentName" },
        { text: "Numéro client", width: "200px", value: "customerNumber" },
        { text: "Nom / Raison Sociale", width: "200px", value: "name" },

        { text: "Contact", width: "200px", value: "phone" },
        { text: "Mail", width: "200px", value: "email" },
        { text: "Compagnie", width: "200px", value: "company" },
        { text: "Numéro police", width: "200px", value: "policeNumber" },
        { text: "Branche", width: "200px", value: "product" },
        { text: "Catégorie", width: "200px", value: "category" },
        { text: "Effet", width: "200px", value: "effectDate" },
        { text: "Echéance", width: "200px", value: "dueDate" },
        { text: "Date de payement", width: "200px", value: "collectionDate" },
        { text: "Type d'avenant", width: "200px", value: "actionType" },
        { text: "Prime Nette", width: "200px", value: "netPrime" },
        { text: "Prime TTC", width: "200px", value: "totalPrime" },
        { text: "Commission", width: "200px", value: "commission" },
        { text: "Date envoi avis", width: "200px", value: "sendAt" },
        {
          text: "Date demande projet ( compagnie )",
          width: "200px",
          value: "companyProjectRequestDate",
        },
        {
          text: "Date envoi projet (client)",
          width: "200px",
          value: "customerProjectSendDate",
        },
        {
          text: "Date demande contrat ( compagnie )",
          width: "250px",
          value: "companyContractRequestDate",
        },
        {
          text: "Date envoi contrat (client)",
          width: "250px",
          value: "customerContractSendDate",
        },

        {
          text: "Date de paiement",
          width: "250px",
          value: "paymentDate",
        },
        {
          text: "Contrat Payé",
          width: "250px",
          value: "isPayed",
        },
        {
          text: "Observation",
          width: "300px",
          value: "observation",
        },
      ],
      chartCoassurance: [],
      workSheetColumnName: [
        "Status",
        "Agent",
        "Numéro client",
        "Nom / Raison Sociale",
        "Contact",
        "Mail",
        "Compagnie",
        "Numéro police",
        "Branche",
        "Catégorie",
        "Effet",
        "Echéance",
        "Date de payement",
        "Date d'encaissement",
        "Type d'avenant",
        "Prime Nette",
        "Prime TTC",
        "Commission",
        "Date envoi avis",
        "Date envoi flotte (client)",
        "Date retour flotte (client)",
        "Date envoi flotte (Compagnie)",
        "Date retour flotte (Compagnie)",
        "Date envoi tableau garantie (client)",
        "Date retour tableau garantie (client)",
        "Date envoi tableau garantie (Compagnie)",
        "Date retour tableau garantie (Compagnie)",
        "Date demande projet (Compagnie)",
        "Date retour projet (Compagnie)",
        "Date demande mise à jour liste personnel",
        "Date retour mise à jour liste personnel",
        "Date de mise en place contrat",
        "Contrat payé",
        "Observation",
      ],
      workSheetName: "Statistique échéance",
      nombre: "échéance",
      users: [],
    };
  },
  mounted() {
    this.initStatCoass();
  },
  computed: {
    ...mapGetters([
      "statEcheance",
      "Companies",
      "Products",
      "statFileEcheance",
    ]),
  },
  watch: {
    statCall() {},
  },
  methods: {
    async makeSearchContract() {
      this.loading = true;
      try {
        await this.postSearchEcheance({
          fileName: this.fileName,
          product: this.product,
          policeNumber: this.policeNumber,
          actionType: this.actionType,
          company: this.company,
          withDeadlineNotice: true,
        });
      } catch (error) {
        console.log(error);
        defaultMethods.dispatchError(
          this.$store,
          messages.failedToLoad("les contrats")
        );
      }
      this.loading = false;
    },
    onEnter: function() {
      this.initStatCoass();
    },
    showAllFillData() {
      this.initStatCoass();
      //alert(this.showAllFil);
    },
    importData() {
      this.users = this.statEcheance;
      importDataExcel(
        this.workSheetColumnName,
        this.workSheetName,
        this.nombre,
        this.users
      );
    },
    ...mapActions([
      "getStateecheance",
      "getCompanies",
      "getProducts",
      "postSearchEcheance",
    ]),
    async initStatCoass() {
      this.loading = true;
      try {
        await this.getStateecheance({
          fileName: this.fileName,
          product: this.product,
          company: this.company,
          status: this.deadLineNoticeStatus,
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
