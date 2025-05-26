<template>
  <v-container fluid>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="statRDV"
      :loading="loading ? '#061a40' : null"
      item-key="name"
    >
      <template v-slot:item.rapport="{ item }">
        <v-btn
          @click="printDeclarationFunction(item)"
          small
          rounded
          color="#061a40"
          outlined
          pill
        >
          Imprimer rapport
        </v-btn>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Listing des rendez-vous éffectués</v-toolbar-title>
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
                  <v-col cols="12" md="4">
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
                  <!-- <v-col cols="12" md="4">
                    <v-text-field
                      color="#061a40"
                      label="Date de création début"
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
                  <v-col cols="12" md="4">
                    <v-text-field
                      color="#061a40"
                      label="Date de création fin"
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
                  </v-col> -->
                  <v-col cols="12" md="4">
                    <v-text-field
                      color="#061a40"
                      label="Date rendez-vous début"
                      class="pt-5 pa-2"
                      filled
                      v-model="startDate"
                      prepend-inner-icon="mdi-magnify"
                      dense
                      type="date"
                      outlined
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      color="#061a40"
                      label="Date rendez-vous fin"
                      class="pt-5 pa-2"
                      filled
                      v-model="endDate"
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
                    :href="statFileRdv"
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
    <!--impression document -->
    <template>
      <v-dialog v-model="printDeclaration" width="1000px">
        <v-card style="border-top: 10px solid #061a40">
          <section
            style="margin-right:50px;margin-left:50px; padding-bottom:50px;padding-top:50px;"
          >
            <v-row>
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                class="mt-5 ml-2 mr-2 white--text"
                :loading="loading ? '#061a40' : null"
                rounded
                outlined
                pill
                @click="generateReport()"
                >Imprimer sous format PDF</v-btn
              >
            </v-row>
            <div id="document" ref="document">
              <div>
                <img
                  src="../../assets/logo.jpg"
                  alt="Ask Gras Savoye"
                  width="150"
                  height="70"
                />
              </div>
              <br />
              <br />
              <br />
              <div
                style="
                  font-family: Arial, Helvetica, sans-serif;
                  text-align: center;
                  margin: auto auto;
                  font-size: 8px;
                  padding-top: 5px;
                  padding-bottom: 5px;
                  color: #061a40;
                  margin-top: 5px;
                "
              >
                <h1>
                  COMPTE RENDUE DE RENDEZ-VOUS
                </h1>
              </div>
              <br />
              <p style="text-align:justify;padding:5px;   ">
                <b>Prospect / Client : </b>{{ this.rapportData.name }}<br />
                <br />
                <b>Agent Assigné : </b>{{ this.agentAssigne }}<br />
                <br />
                <b>Participant (s): </b
                >{{
                  this.rapportData && this.rapportData.participants
                    ? this.rapportData.participants
                    : ""
                }}<br />
                <br />
                <b> Date du rendez-vous :</b>
                {{ this.rapportData.dateFr }} <br /><br />
                <b> Heure de début rendez-vous :</b>
                {{
                  this.rapportData && this.rapportData.period
                    ? this.rapportData.period.start
                    : ""
                }}
                <br /><br />
                <b> Heure de fin du rendez-vous :</b
                >{{
                  this.rapportData && this.rapportData.period
                    ? this.rapportData.period.end
                    : ""
                }}
                <br />
              </p>
              <br />
              <div
                style="
                  font-family: Arial, Helvetica, sans-serif;
                  background-color: #061a40;
                  color: white;
                                   padding:5px;

                "
              >
                <b>Motif rendez-vous :</b>
              </div>
              <p style=" padding:5px; text-align:justify;">
                <span v-html="this.rapportData.reason"></span>
              </p>
              <br />
              <p style="padding:5px;">
                <b>Rendez-vous effectué :</b>
                {{ this.effectuer }}
              </p>
              <br />
              <div
                style="
                  font-family: Arial, Helvetica, sans-serif;
                  background-color: #061a40;
                  color: white;
                  padding:5px;
                "
              >
                <b>Retour rendez-vous :</b>
              </div>
              <p style=" padding:5px; text-align:justify;">
                <span v-html="this.rapportData.returnObservation"></span>
              </p>
              <br />

              <br />
            </div>
          </section>
        </v-card>
      </v-dialog>
    </template>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { defaultMethods, messages } from "@/utils/data";
import html2pdf from "html2pdf.js";
import { importDataExcel } from "../../exportDoc/index.js";
export default {
  name: "chartRDV",
  data() {
    return {
      singleSelect: false,
      loading: false,

      printDeclaration: false,
      effectuer: "",
      agentAssigne: "",
      rapportData: [],
      headers: [
        { text: "Rapport", width: "200px", value: "rapport" },
        { text: "Nom de l'agent", width: "200px", value: "agentName" },
        { text: "Agent (s) assigné (s) ", width: "200px", value: "assignTo" },
        {
          text: "Nom / Raison sociale",
          align: "start",
          sortable: false,
          width: "200px",
          value: "name",
        },
        { text: "Nature du prospect", width: "200px", value: "nature" },
        { text: "Contacts", width: "200px", value: "phone" },
        //{ text: "Date d'anniversaire", width: "200px", value: "birthdayFr" },
        { text: "Activité", width: "200px", value: "activityField" },
        //{ text: "Situation géographique", width: "200px", value: "location" },
        { text: "Date rendez-vous", width: "200px", value: "dateFr" },
        {
          text: "Heure rendez-vous début",
          width: "200px",
          value: "period.start",
        },
        { text: "Heure rendez-vous fin", width: "200px", value: "period.end" },
        // { text: "Observation", width: "200px", value: "reason" },
        { text: "Statut", width: "200px", value: "done" },
        // { text: "Retour appel", width: "200px", value: "returnObservation" },
      ],

      workSheetColumnName: [
        "Nom de l'agent",
        "Agent (s) assigné (es)",
        "Nom / Raison sociale",
        "Nature du prospect",
        "Contacts",
        "Date d'anniversaire",
        "Activité",
        "Situation géographique",
        "Date rendez-vous",
        "Heure rendez-vous début",
        "Heure rendez-vous fin",
        "Observation",
        "Status",
        "Retour appel",
      ],
      workSheetName: "Rapport Statistique rendez-vous",
      nombre: "rdv",
      users: [],
    };
  },
  mounted() {
    this.initStatRDV();
  },
  computed: {
    ...mapGetters(["statRDV", "statFileRdv"]),
  },
  watch: {
    statRDV() {
      this.companyNameList = defaultMethods.getNameList(this.Companies.docs);
      this.seedCoinsuranceCompanyNameList();
    },
  },
  methods: {
    importData() {
      this.users = this.statRDV;
      importDataExcel(
        this.workSheetColumnName,
        this.workSheetName,
        this.nombre,
        this.users
      );
    },
    printDeclarationFunction(item) {
      this.rapportData = [];
      this.agentAssigne = "";
      this.rapportData = item;
      if (this.rapportData.done == true) {
        this.effectuer = "OUI";
      } else {
        this.effectuer = "NON";
      }
      for (let a = 0; a < this.rapportData.assignTo.length; a++) {
        this.agentAssigne += this.rapportData.assignTo[a] + " ; ";
      }
      this.printDeclaration = true;
    },

    generateReport() {
      html2pdf(this.$refs.document, {
        margin: 0.3,
        filename: "document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          dpi: 192,
          letterRendering: true,
          scrollX: 0,
          scrollY: 0,
        },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      });
    },
    onEnter: function() {
      this.initStatRDV();
    },
    showAllFillData() {
      this.initStatRDV();
      //alert(this.showAllFil);
    },
    ...mapActions(["getStateRDV"]),
    async initStatRDV() {
      this.loading = true;
      try {
        await this.getStateRDV({
          fileName: this.fileName,
          startDate: this.startDate,
          endDate: this.endDate,
          periodStartDate: this.periodStartDate,
          periodEndDate: this.periodEndDate,
        });
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
