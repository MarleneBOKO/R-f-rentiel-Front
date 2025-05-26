<template>
  <v-container fluid>
    <v-data-table
      class="pt-3"
      flat
      :loading="loading ? '#061a40' : null"
      :headers="Avenantheaders"
      :items="statImpayer"
      :items-per-page="5"
      sort-by=""
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title
            >Liste des opérations en attente d'encaissement
          </v-toolbar-title>
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
                      label="Début date mise en place contrat"
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
                      label="Fin  date mise en place contrat"
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
                    :href="statFileImpaye"
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

    <!--  Pop up add file-->
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { defaultMethods, messages, rules } from "@/utils/data";
import { importDataExcel } from "../../exportDoc/index.js";
export default {
  name: "production",
  components: {},
  data: () => ({
    panel: [],
    switch1: true,
    tab: null,
    perssonel: [],
    garantietitre: [
      {
        tab: "RESPONSABILITE CIVILE CHEF D'ENTREPRISE",
        content: "Tab 1 Content",
      },
      { tab: "MULTIRISQUE PROFESSIONNELLE", content: "Tab 2 Content" },
      { tab: "GLOBAL DE BANQUE BOA", content: "Tab 3 Content" },
      { tab: "MULTIRISQUE HABITATION", content: "Tab 4 Content" },
      { tab: "TRC", content: "Tab 5 Content" },
      { tab: "IND", content: "Tab 6 Content" },
    ],
    items: ["NSIA", "SANLAM", "SAHAM", "ATLANTIQUE ASSURANCE"],
    natureprospect: ["Physics", "Entreprise"],
    focus: "",
    events: [],
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    colors: ["red"],
    names: ["Appel"],
    colorss: ["green"],
    namess: ["Rendez vous"],
    categories: ["John Smith"],
    addgarantie: false,
    dialog: false,
    fileDialog: false,
    categorie: [],
    contractDialog: false,
    appels: false,
    newappel: false,
    rdv: false,
    produit: false,
    cotation: false,
    garantie: false,
    contrat: false,
    notifications: false,
    sound: true,
    widgets: false,

    prospect: false,
    dialogDelete: false,
    categoriegarantie: [
      {
        titreCatégorie: "I- Responsabilité Civile Exploitation",
        value1: "",
        value2: "",
        Souscategoriegarantie: [
          {
            titreCatégorie: "domage",
            value1: "",
            value2: "",
          },
          {
            titreCatégorie: "domage",
            value1: "",
            value2: "",
          },
        ],
      },
      {
        titreCatégorie: "II- Responsabilité Civile Professionnelle",
        value1: "",
        value2: "",
        Souscategoriegarantie: [
          {
            titreCatégorie: "Domage1",
            value1: "",
            value2: "",
          },
        ],
      },
      {
        titreCatégorie: "III- Défense et Recours",
        value1: "10 000 000",
        value2: "Néant",
      },
    ],
    produitsugest: [
      {
        text: " Liste des produits",
        value: "name",
      },
    ],
    Avenantheaders: [
      {
        text: "Date Opération",
        width: "200px",
        align: "start",
        sortable: false,
        value: "createdAtFr",
      },
      { text: "Nom de l'agent", width: "200px", value: "agentName" },
      { text: "Nom / Raison sociale", width: "200px", value: "name" },
      { text: "Branche", width: "200px", value: "product" },
      { text: "Catégorie", width: "200px", value: "category" },
      { text: "Type avenant", width: "200px", value: "actionType" },
      { text: "Compagnie", width: "200px", value: "company" },
      { text: "Numéro Police", width: "200px", value: "policeNumber" },
      { text: "Numéro quittance", width: "200px", value: "receiptNumber" },
      { text: "Effet", width: "200px", value: "effectDate" },
      { text: "Echéance", width: "200px", value: "dueDate" },
      { text: "Prime nette", width: "200px", value: "netPrime" },
      { text: "Prime TTC", width: "200px", value: "totalPrime" },
      { text: "Coût de police 50%", width: "200px", value: "accessory50" },
      { text: "Coût de police 100%", width: "200px", value: "accessory100" },
      { text: "Prime CDEAO", width: "200px", value: "cdeaoPrime" },
    ],
    produittake: [
      {
        text: "Liste des produits Proposer",
        value: "nom",
      },
    ],
    headers: [
      {
        text: "Nom / Raison Sociale",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Nature", value: "nature" },
      // { text: "Description", value: "description" },
      { text: "Domaine d'activité", value: "activityField" },
      { text: "Mail", value: "email" },
      { text: "Téléphone", value: "phone" },
      { text: "Date d'aniversaire", value: "birthday" },
      { text: "Localité", value: "location" },
    ],
    listproduit: [
      {
        name: "Cart d'identité",
      },
      {
        name: "permis de conduit",
      },
      {
        name: "Atestation de residence",
      },
    ],
    prospectdata: [],
    productNameList: [],
    editedIndex: -1,
    contractModal: {
      name: "",
      nature: "",
      phone: "",
      activity: "",
      email: "",
      birthday: "",
      location: "",
      prospects: [],
    },
    defaultItem: {
      nom: "",
      Nature: "",
      Contact: "",
      Activité: "",
      Mail: "",
      Anniverssaire: "",
      Localisation: "",
    },
    email: "",
    name: "",
    contact: "",
    birthday: "",
    emailRules: [
      (v) => !!v || "E-mail is ",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    loader: false,
    loading: false,
    rules,
    avenantList: [
      "Affaire Nouvelle",
      "Renouvellement",
      "Incorporation",
      "Retrait",
      "Suspension",
      "Remise en vigeur",
      "Precision",
      "Modification",
      "Resiliation",
      "Régularisation",
      "Changement d'immatriculation",
    ],
    companyNameList: [],

    workSheetColumnName: [
      "Date Opération",
      "Nom de l'agent",
      "Nom / Raison sociale",
      "Branche",
      "Catégorie",
      "Type avenant",
      "Compagnie",
      "Numéro Police",
      "Numéro quittance",
      "Effet",
      "Echéance",
      "Prime nette",
      "Prime TTC",
      "Coût de police 50%",
      "Coût de police 100%",
      "Prime CDEAO",
    ],
    workSheetName: "Statistique des impayées",
    nombre: "impayer",
    users: [],
  }),

  mounted() {
    this.initContracts();
    // this.$refs.calendar.checkChange();
  },
  computed: {
    ...mapGetters(["statImpayer", "Companies", "Products", "statFileImpaye"]),
    formTitle() {
      return this.editedIndex === -1
        ? "Ajouter Dossier Production"
        : "Modifier Dossier Production ";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    Companies() {
      //alert('ok')
      this.companyNameList = defaultMethods.getNameList(this.Companies.docs);

      // this.seedCoinsuranceCompanyNameList();
    },

    Products() {
      this.productNameList = defaultMethods.getNameList(this.Products.docs);
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions([
      "getStateImpaye",
      "getCompanies",
      "postSearchContrat",
      "getProducts",
    ]),
    importData() {
      this.users = this.statImpayer;
      importDataExcel(
        this.workSheetColumnName,
        this.workSheetName,
        this.nombre,
        this.users
      );
    },
    initialize() {},
    closeForm() {
      this.contractModal = {
        birthday: "",
        prospects: [],
      };
      this.fileDialog = false;
      this.dialogDelete = false;

      this.editedIndex = -1;
    },
    async makeSearchContract() {
      this.loading = true;
      try {
        await this.postSearchContrat({
          fileName: this.fileName,
          product: this.product,
          policeNumber: this.policeNumber,
          plugged: this.plugged,
          company: this.company,
          notPayed: true,
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
    showAllFillData() {
      this.initContracts();
      //alert(this.showAllFil);
    },
    onEnter: function() {
      this.initContracts();
    },
    // Contracts
    async initContracts() {
      this.loading = true;
      try {
        await this.getStateImpaye({
          fileName: this.fileName,
          product: this.product,
          company: this.company,
          periodStartDate: this.periodStartDate,
          periodEndDate: this.periodEndDate,
          // withoutPeriod: this.showAllFil,
          // currentYear: this.showYearFil,
        });
        await this.getCompanies();
        await this.getProducts({ name: this.searchData });
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

<style scoped></style>
