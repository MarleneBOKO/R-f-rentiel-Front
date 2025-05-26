<template>
    <!-- <v-card color="white" class="rounded-xl " flat>
                    <v-row>
                      <v-col cols="12" sm="12">
                        <v-img
                          src="../assets/fontHome.jpeg"
                          style="height: 300px;"
                          class="mt-1"
                        ></v-img>
                      </v-col>
                    </v-row>
  </v-card> -->
    <v-container fluid>
      <v-container fluid>
      <v-expansion-panels
        flat
        style="
          border: 1px solid #3a1c71;
          margin-bottom: 10px;
          margin-top: 30px !important;
        "
      >
        <v-expansion-panel class="elevation-0">
          <v-expansion-panel-header>
            Tri / Recherche ...
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  :items="StatusIiems"
                  filled
                  prepend-inner-icon="mdi-magnify"
                  dense
                  class="pt-5 pa-2"
                  outlined
                  @change="updateVModel(statisticalFilter)"
                  flat
                  rounded
                  label="Statut"
                  color="#3A1C71"
                  v-model="statisticalFilter"
                ></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  color="#3A1C71"
                  label="Date de début"
                  class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify"
                  v-model="startDate"
                  type="date"
                  filled
                  dense
                  outlined
                  flat
                  background-color="grey lighten-4"
                  rounded
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  color="#3A1C71"
                  label="Date de fin"
                  class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify"
                  v-model="endDate"
                  type="date"
                  filled
                  dense
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
                color="#3A1C71"
                outlined
                pill
                rounded
                class="mr-2"
                @click="initFiles()"
              >
                <v-icon left> mdi-magnify </v-icon>
                Appliquer la recherche
              </v-btn>
              <v-btn
                color="#1D6F42"
                outlined
                pill
                rounded
                :href="statFile"
                target="_blank"
              >
                <v-icon size="30" class="ml-3 mr-3" color="#1D6F42" left>
                  mdi-microsoft-excel
                </v-icon>
                Exporter vers un tableau EXCEL
              </v-btn>
            </v-card-actions>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
      <template>
        <v-row class="ml-4 mb-4 mt-5" justify="start">
          <h4 class="text-h4 pageTitle">Statistiques Ecoute client</h4>
        </v-row>
        <v-row justify="center">
          <v-dialog v-model="addFile" max-width="1300px">
            <v-card style="border-left: 10px solid #3a1c71">
              <v-card-title>
                <span class="text-h5 mb-5 mt-5" style="color: #3a1c71"
                  >Suivi des Demandes</span
                >
                <v-spacer></v-spacer>
                <v-btn
                  color="success white--text"
                  class=""
                  @click="addNewVictime()"
                >
                  Ajouter une demande
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="8">
                    <v-row>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                          label="Numéro sinistre"
                          disabled
                          background-color="#4DD0E1"
                          color="#3A1C71"
                          v-model="adnewObject.sinisterNumber"
                          filled
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                          label="Nom de l'assuré"
                          disabled
                          background-color="#4DD0E1"
                          v-model="adnewObject.name"
                          color="#3A1C71"
                          filled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                          label="Nom victime"
                          disabled
                          background-color="#4DD0E1"
                          color="#3A1C71"
                          v-model="adnewObject.fullName"
                          filled
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                          label="Téléphone"
                          disabled
                          background-color="#4DD0E1"
                          v-model="adnewObject.phone"
                          color="#3A1C71"
                          filled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-select
                          :items="civiliteVictimes"
                          disabled
                          background-color="#4DD0E1"
                          label="Civilité"
                          v-model="adnewObject.civility"
                          color="#3A1C71"
                          filled
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                          label="Age"
                          disabled
                          background-color="#4DD0E1"
                          color="#3A1C71"
                          filled
                          type="number"
                          v-model="adnewObject.age"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-select
                          :items="agencyrNameList"
                          disabled
                          background-color="#4DD0E1"
                          label="Compagnie tiers"
                          v-model="adnewObject.thirdPartyCompany"
                          color="#3A1C71"
                          filled
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                          label="Situation socioprofessionnelle"
                          disabled
                          background-color="#4DD0E1"
                          v-model="adnewObject.socioProfessionalSituation"
                          color="#3A1C71"
                          filled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                          label="Immatriculation (place assise)"
                          disabled
                          background-color="#4DD0E1"
                          v-model="adnewObject.vehicleRegistration"
                          color="#3A1C71"
                          filled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                          label="Marque véhicule"
                          disabled
                          background-color="#4DD0E1"
                          v-model="adnewObject.vehicleBrand"
                          color="#3A1C71"
                          filled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                          label="Taux de responsabilité"
                          v-model="adnewObject.responsibilityRate"
                          disabled
                          background-color="#4DD0E1"
                          color="#3A1C71"
                          filled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-select
                          :items="operationTypesSelect"
                          disabled
                          background-color="#4DD0E1"
                          label="Type d'opération"
                          v-model="adnewObject.operationType"
                          color="#3A1C71"
                          filled
                        ></v-select>
                      </v-col>
  
                      <!-- <v-col cols="12" sm="6" md="4">
                                                                                                <v-text-field
                                                                                                  label="Montant règlement"
                                                                                                  color="#3A1C71"
                                                                                                  v-model="adnewObject.settlementAmount"
                                                                                                  filled
                                                                                                ></v-text-field>
                                                                                              </v-col> -->
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="offreStatut"
                          disabled
                          background-color="#4DD0E1"
                          label="Statut règlement"
                          v-model="adnewObject.status"
                          color="#3A1C71"
                          filled
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="suiviData"
                          disabled
                          background-color="#4DD0E1"
                          label="Suivi"
                          v-model="adnewObject.followed"
                          color="#3A1C71"
                          filled
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Date suivi"
                          disabled
                          background-color="#4DD0E1"
                          color="#3A1C71"
                          filled
                          type="date"
                          v-model="adnewObject.followedDate"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="12">
                        <v-textarea
                          name="input-4-1"
                          rows="2"
                          filled
                          label="Observation"
                          color="#3A1C71"
                          v-model="adnewObject.observation"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="4">
                    <div class="reclamationTitre">
                      <h3 class="textReclamation">Demande client</h3>
                    </div>
                    <v-list
                      v-if="todos.length != 0"
                      subheader
                      two-line
                      flat
                      class="overflow-y-auto"
                      max-height="463"
                    >
                      <v-list-item-group>
                        <v-list-item
                          v-for="todo in todos"
                          v-bind:data="todo"
                          v-bind:key="todo._id"
                        >
                          <div v-if="todo.isConfirmed">
                            <v-btn
                              small
                              outlined
                              fab
                              color="red"
                              class="mr-5"
                              v-if="!todo.isCompleted"
                              @click="confirmed(todo)"
                            >
                            </v-btn>
                            <v-btn small fab color="success" class="mr-5" v-else>
                              <v-icon class="white--text">mdi-check-all</v-icon>
                            </v-btn>
                          </div>
                          <div v-else>
                            <v-btn small fab color="warning" class="mr-5">
                              <v-icon class="white--text"
                                >mdi-send-circle-outline</v-icon
                              >
                            </v-btn>
                          </div>
                          <v-list-item-content
                            @click="updateNewVictime(todo)"
                            style="border-bottom: 1px solid #aaacb1"
                          >
                            <v-list-item-title class="text-wrap mb-3">{{
                              todo.complaint
                            }}</v-list-item-title>
                            <v-list-item-subtitle
                              >Demander le: {{ todo.createdAt }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle
                              >Demander par: {{ todo.name }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle
                              >Contact: {{ todo.phone }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                    <v-list
                      v-else
                      class="pl-0 pt-20"
                      style="overflow: hidden !important"
                      shaped
                    >
                      <v-img
                        src="../../assets/noPiority.png"
                        width="100%"
                        alt="logo"
                      ></v-img>
                    </v-list>
                  </v-col>
                </v-row>
              </v-card-text>
              <!-- <v-card-actions>
                                                                                                          <v-spacer></v-spacer>
                                                                                                          <v-btn color="error darken-1" class="mr-5" @click="addFile = false" text>
                                                                                                              Fermer
                                                                                                          </v-btn>
                                                                                                          <v-btn color="success darken-1" @click="addPvFormModal()">
                                  Enregistrer le dossier
                              </v-btn>
                                                                                                      </v-card-actions> -->
            </v-card>
          </v-dialog>
          <v-dialog v-model="askForm" max-width="500px">
            <v-card style="border-left: 10px solid #3a1c71">
              <v-card-title>
                <span class="text-h5 mb-5 mt-5" style="color: #3a1c71"
                  >Demande</span
                >
                <!-- <v-spacer></v-spacer>
                                                                                                          <v-btn color="success white--text" class="" @click="removeTodo(i)"> Ajouter une demande
                                                                                                          </v-btn> -->
              </v-card-title>
              <v-card-text>
                <v-row>
                  <!-- {{ askObject }} -->
  
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Nom demandeur"
                      color="#3A1C71"
                      v-model="askObject.name"
                      filled
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Contact demandeur"
                      v-model="askObject.phone"
                      color="#3A1C71"
                      filled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-textarea
                      name="input-4-1"
                      rows="2"
                      filled
                      label="Plainte"
                      color="#3A1C71"
                      v-model="askObject.complaint"
                    ></v-textarea>
                  </v-col>
                  <v-col
                    v-if="askObject.isConfirmed === true"
                    cols="12"
                    sm="6"
                    md="12"
                  >
                    <v-text-field
                      label="Date retour client"
                      type="date"
                      v-model="askObject.customerReturnDate"
                      color="#3A1C71"
                      filled
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="error darken-1"
                  class="mr-5"
                  @click="askForm = false"
                  text
                >
                  Fermer
                </v-btn>
                <v-btn color="success darken-1" @click="addPvFormModal()">
                  Enregistrer la demande
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
      <template>
        <div>
          <v-data-table
            :headers="headers"
            :items="victimeList"
            :items-per-page="10"
            class="elevation-0"
            background-color="red"
            color="#3A1C71"
          >
            <template v-slot:item="{ item }">
              <tr class="miniTableRow green-bg" @click="handleClick(item)">
                <!-- <td>
                                                                                                        <v-chip :color="getColor(item.status)" dark>
                                                                                                          {{ item.status }}
                                                                                                        </v-chip>
                                                                                                      </td> -->
  
                <!-- <td>{{ item.status }}</td> -->
                <td>{{ item.sinister ? item.sinister.sinisterNumber : "" }}</td>
                <td>{{ item.sinister ? item.sinister.policeNumber : "" }}</td>
  
                <td>{{ item.sinister ? item.sinister.name : "" }}</td>
                <td>
                  {{ item.fullName }}
                </td>
                <td>
                  {{ item.phone }}
                </td>
                <td>{{ item.agentName }}</td>
                <td>{{ item.sinister ? item.sinister.sinisterDate : "" }}</td>
                <td>{{ item.sinister ? item.sinister.declarationDate : "" }}</td>
                <td>{{ item.sinister ? item.sinister.effectDate : "" }}</td>
                <td>{{ item.sinister ? item.sinister.dueDate : "" }}</td>
                <td>{{ item.sinister ? item.sinister.inventoryStatus : "" }}</td>
                <td>{{ item.observation }}</td>
              </tr>
            </template>
            <template v-slot:top>
              <v-toolbar flat> </v-toolbar>
            </template>
            <template v-slot:no-data>
              <h4 class="text-h4 mb-4">pas de données</h4>
            </template></v-data-table
          >
        </div>
      </template>
      <v-dialog v-model="loading" persistent width="500">
        <div class="wrapper">
          <div class="box-wrap">
            <div class="box one"></div>
            <div class="box two"></div>
            <div class="box three"></div>
            <div class="box four"></div>
            <div class="box five"></div>
            <div class="box six"></div>
          </div>
        </div>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  import { mapActions, mapGetters } from "vuex";
  // import { addFilendemnity } from "@/api/user";
  import { defaultMethods, messages } from "../../utils/data";
  import {
    addFileJson,
    // addOperationTypeForm,
    updateVictimeFileForm,
    // addVictimeFileForm,
    // updateFileForm,
    addPlaintForm,
    updatePlaintForm,
  } from "@/api/user.js";
  export default {
    name: "callCenterComponent",
  
    data: () => ({
      dialog: false,
      dialogDelete: false,
      loading: false,
      addFileExcel: false,
      addFile: false,
      page: 1,
      pages: 1,
      sinsiterSelectId: "",
      offreStatut: ["EN COURS",
      "Soldé",
      "Sans suite",
      "Prescrit",
      "Recours"],
      suiviData: ["Suivi FGA", "Pool 2 Roues", "Pool TPM / TPV"],
      civiliteVictimes: [
        "Monsieur",
        "Madame",
        "Monsieur le Directeur Général",
        "Madame la Directrice Générale",
        "Monsieur le Représentant",
        "Madame la Représentante",
        "Monsieur le Maire",
        "Madame le Maire",
        "Monsieur le commissaire",
        "Madame la commissaire",
        "Monsieur le Procureur",
        "Madame le Procureur",
        "Chère Maitre",
        "Chere Maitre",
        "Monsieur le Président",
        "ONG",
      ],
      operationTypesSelect: [
        "Bon de prise en charge",
        "Calcul FMP",
        "Contentieux",
        // "Demande d'expertise amiable",
        "Demande d'expertise Matérielle",
        "Demande d'expertise décès",
        "Demande d'expertise Corporelle",
        "Demande d'expertise financiere",
        "Etude / Offre",
        "Recours",
        "Suivi de reparation",
      ],
       StatusIiems: [
          "Plainte en attente du service sinistre",
          "Plainte créer",
          "Plainte actualiser",
          "Réponse plainte faite au client",
      ],
      excelFile: null,
      adnewObject: {},
      victimeDialogModal: false,
      selectedDocumentsModal: [],
      commissariatNameList: [],
      enquetteurNameList: [],
      victimeNameList: [],
      addVictime: false,
      victimesListeData: [],
      victimeFormData: {},
      sinisterNumber: "",
      agencyrNameList: {},
      isExpert: true,
      name: "",
      policeNumber: "",
      fullName: "",
      todos: [],
      showText: true,
      showSelect: false,
      addNewVictimeFile: false,
      pageCount: 0,
      pageCounts: 0,
      requestDateStart: "",
      requestDateEnd: "",
      voucherIssueDateStart: "",
      voucherIssueDateEnd: "",
      invoiceReceiptDateStart: "",
      invoiceReceiptDateEnd: "",
      paymentDateStart: "",
      paymentDateEnd: "",
      applicant: "",
      askObject: {},
      itemsPerPage: 10,
      askForm: false,
      printDoc: "",
      unlockButton: true,
      civiliteIiems: ["Monsieur", "Madame"],
      Decision: ["Oui", "Non"],
  
      headers: [
        // {
        //   text: "Statut",
        //   width: "100px",
        //   // divider: true,
        //   // class: "deep-purple darken-4 white--text",
        //   align: "start",
        //   value: "status",
        // },
        {
          text: "Numéro sinistre",
          align: "start",
          width: "200px",
          sortable: false,
          value: "sinisterNumber",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
        },
        {
          text: "Numéro police",
          align: "start",
          width: "200px",
          sortable: false,
          value: "policeNumber",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
        },
  
        {
          text: "Nom de l'Assuré",
          // divider: true,
          width: "200px",
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "name",
        },
  
        {
          text: "Nom de la victime",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "fullName",
        },
        {
          text: "Contact victime",
          width: "200px",
          // divider: true,
          // class: "background white--text",
          align: "start",
          value: "phone",
        },
        {
          text: "Nom de l'agent",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "agentName",
        },
        {
          text: "Date sinistre",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "sinisterDate",
        },
        {
          text: "Date déclaration",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "declarationDate",
        },
        {
          text: "Date effet",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "effectDate",
        },
  
        {
          text: "Date echéance",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "dueDate",
        },
        {
          text: "Statut inventaire",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "inventoryStatus",
        },
        {
          text: "Observation ",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "observation",
        },
      ],
  
      desserts: [],
      editedIndex: -1,
      editedItem: {
        sinisterNumbe: "",
        customerName: "",
        victimName: "",
        reference: "",
        sinisterDate: null,
      },
      editedFileItem: {
        sinisterNumbe: "",
        customerName: "",
        victimName: "",
        reference: "",
        sinisterDate: null,
      },
      defaultItem: {
        sinisterNumbe: "",
        customerName: "",
        victimName: "",
        reference: "",
        sinisterDate: null,
      },
    }),
    components: {},
  
    computed: {
      ...mapGetters([
        "PVFiles",
        "victimeDocumentListe",
        "victimeListe",
        "UserProfile",
        "productListe",
        "indemnityData",
        "inventoryListe",
        "Commissariat",
        "plaint",
        "victimeList",
        "statFile",
        "agency",
      ]),
      formTitle() {
        return this.editedIndex === -1 ? "New Item" : "Edit Item";
      },
    },
  
    watch: {
      dialog(val) {
        val || this.close();
      },
      agency() {
        this.agencyrNameList = defaultMethods.getNameList(this.agency);
      },
      dialogDelete(val) {
        val || this.closeDelete();
      },
      inventoryListe() {
        this.enquetteurNameList = defaultMethods.getNameList(this.inventoryListe);
      },
      Commissariat() {
        this.commissariatNameList = defaultMethods.getNameList(this.Commissariat);
      },
      victimeList() {
        this.victimeNameList = defaultMethods.getNameList(this.victimeList);
      },
    },
  
    // created() {
    //   this.initialize();
    // },
    mounted() {
      this.initFiles();
    },
    methods: {
      ...mapActions([
        "getPvFiles",
        "getVictimesDoc",
        "getUserProfile",
        "getProduct",
        "getVictimes",
        "getEnquetteur",
        "getCommissariat",
        "getDoc",
        "getStatVictimeListe",
        "getExpert",
        "getAgency",
        "getPlaint",
      ]),
      async initFiles() {
        this.loading = true;
        try {
          await this.getStatVictimeListe({
            statisticalFilter: this.statisticalFilter,
          startDate: this.startDate,
          endDate: this.endDate,
          });
          await this.getUserProfile();
          //await this.getProduct();
          //await this.getAgency();
        } catch (error) {
          defaultMethods.dispatchError(
            this.$store,
            messages.failedToLoad("les dossiers")
          );
        }
        this.loading = false;
      },
      async FileSelecterTrue() {
        if (!this.excelFile) {
          alert("S'il vous plaît sélectionner un fichier excel");
          return;
        }
        this.loading = true;
        try {
          const formData = new FormData();
          if (this.excelFile) {
            // alert("JESUC")
            formData.append("file", this.excelFile);
          }
  
          await this.addFilendemnity(formData);
  
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.updatedSuccessfully("L'utilisateur")
          );
          // this.logoutMethods();
          this.loading = false;
        } catch (error) {
          console.log(error);
        }
        this.loading = false;
  
        this.excelFile = null;
      },
      async victimeManage(item) {
        this.sinsiterSelectId = item._id;
        await this.getVictimes({ sinister: item._id });
        //  alert(JSON.stringify(this.victimeListe))
        this.victimesListeData = this.victimeListe;
        // this.adnewObject = Object.assign({}, item);
        // this.addFile = true;
        this.addVictime = true;
      },
      schowElement() {
        if (this.printDoc != "") {
          this.unlockButton = false;
        }
      },
      async genereteDoc() {
        await this.getDoc({
          id: defaultMethods.getItemId(this.Commissariat, this.printDoc),
        });
      },
      async getPlaintListe() {
        await this.getPlaint({
          id: this.adnewObject.sinsterVictimeID,
        });
        this.todos = this.plaint;
      },
      async handleClick(item) {
        // alert(JSON.stringify(item));
        this.adnewObject.sinisterNumber = item.sinister.sinisterNumber;
        this.adnewObject.name = item.sinister.name;
        this.adnewObject.fullName = item.fullName;
        this.adnewObject.phone = item.phone;
        this.adnewObject.civility = item.civility;
        this.adnewObject.age = item.age;
        this.adnewObject.thirdPartyCompany = item.thirdPartyCompany
          ? item.thirdPartyCompany.name
          : "";
        this.adnewObject.socioProfessionalSituation =
          item.socioProfessionalSituation;
        this.adnewObject.vehicleRegistration = item.vehicleRegistration;
        this.adnewObject.vehicleRegistration = item.vehicleRegistration;
        this.adnewObject.vehicleBrand = item.vehicleBrand;
        this.adnewObject.responsibilityRate = item.responsibilityRate;
        this.adnewObject.operationType = item.operationType;
        this.adnewObject.status = item.status;
        this.adnewObject.followed = item.followed;
        this.adnewObject.followedDate = item.followedDate;
        this.adnewObject.observation = item.observation;
  
        // this.adnewObject.plaintID = item._id;
        this.adnewObject.sinsterVictimeID = item._id;
        // this.editedIndex = this.adnewObject.indexOf(item);
        // this.adnewObject = Object.assign({}, item);
        await this.getPlaintListe();
        this.addFile = true;
      },
      async docShow(item) {
        await this.getVictimesDoc({ id: item._id });
        // this.editedIndex = this.adnewObject.indexOf(item);
        // this.adnewObject = Object.assign({}, item);
        this.victimeDialogModal = true;
      },
      updateNewVictime(todo) {
        this.askObject = todo;
        this.askForm = true;
      },
      addNewVictime() {
        this.askObject = {};
        this.askForm = true;
      },
      addNewSinisterVictime() {
        this.victimeFormData = {};
        this.addNewVictimeFile = true;
      },
      upDateNewSinisterVictime(item) {
        this.victimeFormData = Object.assign({}, item);
        this.addNewVictimeFile = true;
      },
      deleteItem(item) {
        this.editedIndex = this.indemnityData.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
      },
  
      deleteItemConfirm() {
        this.indemnityData.splice(this.editedIndex, 1);
        this.closeDelete();
      },
      closeDelete() {
        this.dialogDelete = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },
      editItem(item) {
        this.editedIndex = this.indemnityData.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },
      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.indemnityData[this.editedIndex], this.editedItem);
        } else {
          this.indemnityData.push(this.editedItem);
        }
        this.close();
      },
      close() {
        this.dialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },
      async addFileToJson() {
        // alert(this.indemnityData);
        this.loading = true;
        await addFileJson(this.indemnityData);
        defaultMethods.dispatchSuccess(
          this.$store,
          messages.createdSuccessfully("data")
        );
        this.loading = false;
        this.addFileExcel = false;
        this.initFiles();
      },
      async manageDocRecap(item) {
        this.loading = true;
  
        const idSelect = item._id;
        await this.getDownloadManageRecap({ id: idSelect });
        defaultMethods.dispatchSuccess(
          this.$store,
          messages.createdSuccessfully("data")
        );
        this.loading = false;
        this.initFiles();
      },
      async medicalReport(item) {
        this.loading = true;
  
        const idSelect = item._id;
        await this.getDownloadMedicalExpertiseReport({ id: idSelect });
        defaultMethods.dispatchSuccess(
          this.$store,
          messages.createdSuccessfully("data")
        );
        this.loading = false;
        this.initFiles();
      },
      async medicalRequest(item) {
        this.loading = true;
  
        const idSelect = item._id;
        await this.getDownloadMedicalExpertiseRequest({ id: idSelect });
        defaultMethods.dispatchSuccess(
          this.$store,
          messages.createdSuccessfully("data")
        );
        this.loading = false;
        this.initFiles();
      },
      getColor(item) {
        if (item == "En cours") return "orange";
        else if (item == "Consultation") return "red";
        else return "green";
      },
      // async addVictimesFileFormModal() {
      //   this.loading = true;
      //   try {
      //     const schema = {
      //       sinister: this.sinsiterSelectId,
      //       fullName: this.victimeFormData.fullName,
      //       phone: this.victimeFormData.phone,
  
      //       operationType: this.victimeFormData.operationType,
      //       socioProfessionalSituation: this.victimeFormData
      //         .socioProfessionalSituation,
      //       civility: this.victimeFormData.civility,
      //       age: this.victimeFormData.age,
      //       settlementAmount: this.victimeFormData.settlementAmount,
      //       observation: this.victimeFormData.observation,
      //     };
      //     if (offrerID) {
      //       // update
      //       await updateVictimeFileForm({
      //         schema,
      //         id: this.victimeFormData._id,
      //       });
      //       defaultMethods.dispatchSuccess(
      //         this.$store,
      //         messages.updatedSuccessfully("Dossier")
      //       );
      //     } else {
      //       // add
      //       await addVictimeFileForm({ schema });
      //       defaultMethods.dispatchSuccess(
      //         this.$store,
      //         messages.createdSuccessfully("Dossier")
      //       );
      //     }
      //     // this.closeMail();
      //     // this.initialize();
      //   } catch (error) {
      //     defaultMethods.dispatchError(this.$store);
      //   }
      //   this.loading = false;
      //   this.addFile = false;
      //   this.addFileExcel = false;
      //   this.dialog = false;
      //   this.dialogDelete = false;
      //   this.initFiles();
      // },
      // async updateFile() {
      //   this.loading = true;
      //   try {
      //     const schema = {
      //       vehicleRegistration: this.adnewObject.vehicleRegistration,
      //       pvNumber: this.adnewObject.pvNumber,
      //     };
      //     await updateFileForm({
      //       schema,
      //       id: this.adnewObject.sinisterID,
      //     });
      //   } catch (error) {
      //     defaultMethods.dispatchError(this.$store);
      //   }
      //   this.loading = false;
      // },
      async updateFileVictime() {
        this.loading = true;
        try {
          const schema = {
            vehicleRegistration: this.adnewObject.vehicleRegistrations,
          };
          await updateVictimeFileForm({
            schema,
            id: this.adnewObject.sinisterVictimeID,
          });
        } catch (error) {
          defaultMethods.dispatchError(this.$store);
        }
        this.loading = false;
      },
      valueChange() {
        if (this.adnewObject.beneficiaryType === "Autres ...") {
          this.showText = true;
          this.showSelect = false;
          this.adnewObject.beneficiaryName = "";
        } else {
          if (this.adnewObject.beneficiaryType == "Expert") {
            this.isExpert = true;
          } else if (this.adnewObject.beneficiaryType == "Victime") {
            this.isExpert = false;
          }
          this.showText = false;
          this.showSelect = true;
        }
      },
      async confirmed(i) {
        // alert(JSON.stringify(i))
        this.loading = true;
        try {
          const schema = {
            // policeStation: defaultMethods.getItemId(
            //   this.Commissariat,
            //   this.adnewObject.policeStation
            // ),
            sinisterVictim: i.sinisterVictim._id,
            isCompleted: true,
          };
  
          if (i._id) {
            await updatePlaintForm({
              schema,
              id: i._id,
            });
  
            defaultMethods.dispatchSuccess(
              this.$store,
              messages.updatedSuccessfully("Dossier")
            );
          }
          // this.closeMail();
          // this.initialize();
        } catch (error) {
          defaultMethods.dispatchError(this.$store);
        }
        await this.getPlaintListe();
        this.loading = false;
      },
      async addPvFormModal() {
        this.loading = true;
        try {
          const schema = {
            // policeStation: defaultMethods.getItemId(
            //   this.Commissariat,
            //   this.adnewObject.policeStation
            // ),
            sinisterVictim: this.adnewObject.sinsterVictimeID,
            phone: this.askObject.phone,
            complaint: this.askObject.complaint,
            customerReturnDate: this.askObject.customerReturnDate,
            name: this.askObject.name,
          };
  
          if (this.askObject._id) {
            await updatePlaintForm({
              schema,
              id: this.askObject._id,
            });
  
            defaultMethods.dispatchSuccess(
              this.$store,
              messages.updatedSuccessfully("Dossier")
            );
          } else {
            await addPlaintForm({
              schema,
            });
  
            defaultMethods.dispatchSuccess(
              this.$store,
              messages.createdSuccessfully("Dossier")
            );
          }
          // this.closeMail();
          // this.initialize();
        } catch (error) {
          defaultMethods.dispatchError(this.$store);
        }
        await this.getPlaintListe();
        this.loading = false;
        // this.addFile = false;
        // this.addFileExcel = false;
        this.askForm = false;
        // this.dialogDelete = false;
        // this.initFiles();
      },
    },
  };
  </script>
  
  <style scoped>
  .btnDesign {
    color: #fff;
  }
  
  .space {
    margin-left: -100px;
    margin-right: -100px;
  }
  
  .pageTitle {
    font-size: 10px;
    font-weight: bold;
    color: #3a1c71;
  }
  
  .reclamationTitre {
    background: #3a1c71;
    background: -webkit-linear-gradient(to right, #4dd0e1, #3a1c71);
    background: linear-gradient(to right, #4dd0e1, #3a1c71);
    justify-content: "center";
    align-content: "center";
    align-items: center;
    height: 60px !important;
    margin-bottom: 20px !important;
    display: flex;
  }
  .miniTableRow:nth-child(even) {
    background-color: #f2f2f2;
  }
  .textReclamation {
    color: #fff !important;
    font-size: 20px !important;
    font-weight: "bold" !important;
    justify-content: "center";
    align-content: "center";
    align-items: center;
    margin-left: 10px;
  }
  
  .green-bg {
    /* Set the display to `table-row` because Vuetify makes `flex` */
    display: table-row;
  }
  
  
  /*data loading*/
  
  .wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -100px;
    width: 200px;
    height: 200px;
    background-color: transparent;
    border: none;
  }
  .wrapper .box-wrap {
    width: 70%;
    height: 70%;
    margin: calc((100% - 70%) / 2) calc((100% - 70%) / 2);
    position: relative;
    transform: rotate(-45deg);
  }
  .wrapper .box-wrap .box {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(135, 0, 0, 0.6);
    background: linear-gradient(
      to right,
      #141562,
      #486fbc,
      #eab5a1,
      #8dd6ff,
      #4973c9,
      #d07ca7,
      #f4915e,
      #f5919e,
      #b46f89,
      #141562,
      #486fbc
    );
    background-position: 0% 50%;
    background-size: 1000% 1000%;
    visibility: hidden;
  }
  .wrapper .box-wrap .box.one {
    animation: moveGradient 15s infinite, oneMove 3.5s infinite;
  }
  .wrapper .box-wrap .box.two {
    animation: moveGradient 15s infinite, twoMove 3.5s 0.15s infinite;
  }
  .wrapper .box-wrap .box.three {
    animation: moveGradient 15s infinite, threeMove 3.5s 0.3s infinite;
  }
  .wrapper .box-wrap .box.four {
    animation: moveGradient 15s infinite, fourMove 3.5s 0.575s infinite;
  }
  .wrapper .box-wrap .box.five {
    animation: moveGradient 15s infinite, fiveMove 3.5s 0.725s infinite;
  }
  .wrapper .box-wrap .box.six {
    animation: moveGradient 15s infinite, sixMove 3.5s 0.875s infinite;
  }
  
  @keyframes moveGradient {
    to {
      background-position: 100% 50%;
    }
  }
  
  @keyframes oneMove {
    0% {
      visibility: visible;
      clip-path: inset(0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    14.2857% {
      clip-path: inset(0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    28.5714% {
      clip-path: inset(35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    42.8571% {
      clip-path: inset(35% 70% 35% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    57.1428% {
      clip-path: inset(35% 70% 35% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    71.4285% {
      clip-path: inset(0% 70% 70% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    85.7142% {
      clip-path: inset(0% 70% 70% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    100% {
      clip-path: inset(0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
  }
  
  @keyframes twoMove {
    0% {
      visibility: visible;
      clip-path: inset(0% 70% 70% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    14.2857% {
      clip-path: inset(0% 70% 70% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    28.5714% {
      clip-path: inset(0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    42.8571% {
      clip-path: inset(0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    57.1428% {
      clip-path: inset(35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    71.4285% {
      clip-path: inset(35% 70% 35% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    85.7142% {
      clip-path: inset(35% 70% 35% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    100% {
      clip-path: inset(0% 70% 70% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
  }
  
  @keyframes threeMove {
    0% {
      visibility: visible;
      clip-path: inset(35% 70% 35% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    14.2857% {
      clip-path: inset(35% 70% 35% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    28.5714% {
      clip-path: inset(0% 70% 70% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    42.8571% {
      clip-path: inset(0% 70% 70% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    57.1428% {
      clip-path: inset(0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    71.4285% {
      clip-path: inset(0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    85.7142% {
      clip-path: inset(35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    100% {
      clip-path: inset(35% 70% 35% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
  }
  
  @keyframes fourMove {
    0% {
      visibility: visible;
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    14.2857% {
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    28.5714% {
      clip-path: inset(35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    42.8571% {
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    57.1428% {
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    71.4285% {
      clip-path: inset(70% 0 0 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    85.7142% {
      clip-path: inset(70% 0 0 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    100% {
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
  }
  
  @keyframes fiveMove {
    0% {
      visibility: visible;
      clip-path: inset(70% 0 0 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    14.2857% {
      clip-path: inset(70% 0 0 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    28.5714% {
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    42.8571% {
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    57.1428% {
      clip-path: inset(35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    71.4285% {
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    85.7142% {
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    100% {
      clip-path: inset(70% 0 0 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
  }
  
  @keyframes sixMove {
    0% {
      visibility: visible;
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    14.2857% {
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    28.5714% {
      clip-path: inset(70% 0 0 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    42.8571% {
      clip-path: inset(70% 0 0 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    57.1428% {
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    71.4285% {
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    85.7142% {
      clip-path: inset(35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    100% {
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
  }
  
  td {
    font-size: 12px !important;
    border-bottom: 1px solid #f4f7fe !important;
  }
  
  .green-bg:hover {
    /* `!important` is necessary here because Vuetify overrides this */
    background: #3a1c71 !important;
    color: white;
    height: 60px;
    animation: -45deg;
    cursor: pointer;
    box-shadow: inset 0 0 1em #3a1c71, 0 0 2em #eeeeee;
  }
  
  /*data loading*/
  
  .wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -100px;
    width: 200px;
    height: 200px;
    background-color: transparent;
    border: none;
  }
  .wrapper .box-wrap {
    width: 70%;
    height: 70%;
    margin: calc((100% - 70%) / 2) calc((100% - 70%) / 2);
    position: relative;
    transform: rotate(-45deg);
  }
  .wrapper .box-wrap .box {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(135, 0, 0, 0.6);
    background: linear-gradient(
      to right,
      #141562,
      #486fbc,
      #eab5a1,
      #8dd6ff,
      #4973c9,
      #d07ca7,
      #f4915e,
      #f5919e,
      #b46f89,
      #141562,
      #486fbc
    );
    background-position: 0% 50%;
    background-size: 1000% 1000%;
    visibility: hidden;
  }
  .wrapper .box-wrap .box.one {
    animation: moveGradient 15s infinite, oneMove 3.5s infinite;
  }
  .wrapper .box-wrap .box.two {
    animation: moveGradient 15s infinite, twoMove 3.5s 0.15s infinite;
  }
  .wrapper .box-wrap .box.three {
    animation: moveGradient 15s infinite, threeMove 3.5s 0.3s infinite;
  }
  .wrapper .box-wrap .box.four {
    animation: moveGradient 15s infinite, fourMove 3.5s 0.575s infinite;
  }
  .wrapper .box-wrap .box.five {
    animation: moveGradient 15s infinite, fiveMove 3.5s 0.725s infinite;
  }
  .wrapper .box-wrap .box.six {
    animation: moveGradient 15s infinite, sixMove 3.5s 0.875s infinite;
  }
  
  @keyframes moveGradient {
    to {
      background-position: 100% 50%;
    }
  }
  
  @keyframes oneMove {
    0% {
      visibility: visible;
      clip-path: inset(0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    14.2857% {
      clip-path: inset(0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    28.5714% {
      clip-path: inset(35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    42.8571% {
      clip-path: inset(35% 70% 35% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    57.1428% {
      clip-path: inset(35% 70% 35% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    71.4285% {
      clip-path: inset(0% 70% 70% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    85.7142% {
      clip-path: inset(0% 70% 70% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    100% {
      clip-path: inset(0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
  }
  
  @keyframes twoMove {
    0% {
      visibility: visible;
      clip-path: inset(0% 70% 70% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    14.2857% {
      clip-path: inset(0% 70% 70% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    28.5714% {
      clip-path: inset(0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    42.8571% {
      clip-path: inset(0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    57.1428% {
      clip-path: inset(35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    71.4285% {
      clip-path: inset(35% 70% 35% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    85.7142% {
      clip-path: inset(35% 70% 35% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    100% {
      clip-path: inset(0% 70% 70% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
  }
  
  @keyframes threeMove {
    0% {
      visibility: visible;
      clip-path: inset(35% 70% 35% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    14.2857% {
      clip-path: inset(35% 70% 35% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    28.5714% {
      clip-path: inset(0% 70% 70% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    42.8571% {
      clip-path: inset(0% 70% 70% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    57.1428% {
      clip-path: inset(0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    71.4285% {
      clip-path: inset(0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    85.7142% {
      clip-path: inset(35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    100% {
      clip-path: inset(35% 70% 35% 0 round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
  }
  
  @keyframes fourMove {
    0% {
      visibility: visible;
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    14.2857% {
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    28.5714% {
      clip-path: inset(35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    42.8571% {
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    57.1428% {
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    71.4285% {
      clip-path: inset(70% 0 0 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    85.7142% {
      clip-path: inset(70% 0 0 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    100% {
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
  }
  
  @keyframes fiveMove {
    0% {
      visibility: visible;
      clip-path: inset(70% 0 0 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    14.2857% {
      clip-path: inset(70% 0 0 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    28.5714% {
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    42.8571% {
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    57.1428% {
      clip-path: inset(35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    71.4285% {
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    85.7142% {
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    100% {
      clip-path: inset(70% 0 0 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
  }
  
  @keyframes sixMove {
    0% {
      visibility: visible;
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    14.2857% {
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    28.5714% {
      clip-path: inset(70% 0 0 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    42.8571% {
      clip-path: inset(70% 0 0 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    57.1428% {
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    71.4285% {
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    85.7142% {
      clip-path: inset(35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    100% {
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
  }
  </style>
  