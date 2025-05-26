<template>
  <v-container fluid>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :loading="loading ? '#061a40' : null"
      :items="statCourrier"
      item-key="name"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Listing des courriers</v-toolbar-title>
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
                      label="N° courrier arrivée"
                      class="pt-5 pa-2 mx-2"
                      filled
                      v-model="mailNumber"
                      prepend-inner-icon="mdi-magnify"
                      dense
                      outlined
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      color="#061a40"
                      label="Debut date arrivée courrier début..."
                      class="pt-5 pa-2 mx-2"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      dense
                      type="date"
                      v-model="receptionStartDate"
                      outlined
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      color="#061a40"
                      label="Debut date arrivée courrier fin..."
                      class="pt-5 pa-2 mx-2"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      dense
                      type="date"
                      v-model="receptionEndDate"
                      outlined
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      color="#061a40"
                      label="Emetteur ..."
                      class="pt-5 pa-2 mx-2"
                      v-model="transmitter"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      dense
                      outlined
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      color="#061a40"
                      label="Debut traitement début..."
                      class="pt-5 pa-2 mx-2"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      dense
                      type="date"
                      v-model="periodStartDate"
                      outlined
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      color="#061a40"
                      label="Debut traitement fin..."
                      class="pt-5 pa-2 mx-2"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      dense
                      type="date"
                      v-model="periodEndDate"
                      outlined
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-text-field
                  ></v-col>
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
                    :href="statFileCourrier"
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
import { importDataExcel } from "../../exportDoc/index.js";
import { defaultMethods, messages } from "@/utils/data";
export default {
  name: "chartCall",
  data() {
    return {
      singleSelect: false,
      loading: false,
      selected: [],
      sercheModel: {
        fileNumber: "",
        mailNumber: "",
        transmitter: "",
        agent: "",
        receptionStartDate: "",
        receptionEndDate: "",
        treatmentDate: "",
        assignmentDate: "",
        service: "",
      },
      natureMails: [
        "Actualisation",
        "Attestation",
        "Avenant",
        "Avis",
        "Bon de Prise En Charge",
        "Bordereau",
        "Certificat",
        "Changement",
        "Chèque",
        "Communication",
        "Compte-rendu",
        "Contrat",
        "Convention",
        "Convocation",
        "Courrier",
        "Déclaration",
        "Délégation",
        "Demande",
        "Devis",
        "Explication",
        "Facture",
        "Lettre",
        "Mandat",
        "Modification",
        "Ordre",
        "Pièces",
        "Procès verbal",
        "Projet",
        "Quittance",
        "Rachat",
        "Rapport",
        "Réclamation",
        "Résiliation",
        "Retour",
        "Sinistre",
        "Suspension",
        "Transmission",
        "Validation",
        "Projet de contrat",
        "Contrat",
        "Retour contrat signé",
        "Avenant Retrait",
        "Avenant Incoporation",
        "Déclaration",
        "Offre",
        "Pièce d'étude",
        "Accord",
        "Chèque",
        "Quittance",
        "Autre ...",
      ],
      items: [
        "Administration",
        "Commercial",
        "Finance",
        "Production ADP",
        "Production IARD",
        "Sinistre ADP",
        "Sinistre IARD",
        "Sinistre Informatique",
        "Médecins Conseils",
        "Communication",
        "Directon Générale",
      ],
      headers: [
        {
          text: "N° Dossier",
          align: "start",
          width: "200px",
          sortable: false,
          value: "fileNumber",
        },
        { text: "Emetteur", width: "200px", value: "transmitter" },
        { text: "Agent", width: "200px", value: "agent" },
        { text: "N° courrier arrivée", width: "200px", value: "mailNumber" },
        {
          text: "Date courrier arrivée",
          width: "200px",
          value: "receptionDateFr",
        },
        { text: "Date affectation", width: "200px", value: "assignmentDateFr" },
        { text: "Date traitemnt", width: "200px", value: "treatmentDateFr" },
        {
          text: "Numéro courrier départ",
          width: "200px",
          value: "outgoingMailNumber",
        },
        { text: "Services", width: "200px", value: "service" },
        { text: "Nature courrier", width: "200px", value: "nature" },
        { text: "Instruction", width: "200px", value: "CEOInstruction" },
        { text: "Observations", width: "200px", value: "observation" },
      ],
      chartCourrier: [],
      workSheetColumnName: [
        "N° Dossier",
        "Emetteur",
        "Agent",
        "N° courrier arrivée",
        "Date courrier arrivée",
        "Date affectation",
        "Date traitemnt",
        "Numéro courrier départ",
        "Services",
        "Nature courrier",
        "Instruction DG",
        "Observations",
      ],
      workSheetName: "Statistique courrier",
      nombre: "courrier",
      users: [],
    };
  },
  mounted() {
    this.initStatCourrier();
  },
  computed: {
    ...mapGetters(["statCourrier", "statFileCourrier"]),
  },
  watch: {
    statCourrier() {
      this.companyNameList = defaultMethods.getNameList(this.Companies.docs);
      this.seedCoinsuranceCompanyNameList();
    },
  },
  methods: {
    ...mapActions(["getStateCourrier"]),
    async initStatCourrier() {
      this.loading = true;
      try {
        await this.getStateCourrier({
          mailNumber: this.mailNumber,
          receptionStartDate: this.receptionStartDate,
          receptionEndDate: this.receptionEndDate,
          transmitter: this.transmitter,
          periodStartDate: this.periodStartDate,
          periodEndDate: this.periodEndDate,
          withoutPeriod: this.showAllFil,
          currentYear: this.showYearFil,
        });
      } catch (error) {
        defaultMethods.dispatchError(
          this.$store,
          messages.failedToLoad("les dossiers")
        );
      }
      this.loading = false;
    },
    showAllFillData() {
      this.initStatCourrier();
      //alert(this.showAllFil);
    },
    onEnter: function() {
      this.initStatCourrier();
    },
    importData() {
      importDataExcel(
        this.workSheetColumnName,
        this.workSheetName,
        this.nombre,
        this.users
      );
    },
  },
};
</script>
