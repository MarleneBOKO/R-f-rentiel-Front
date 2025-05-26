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
      <v-row class="  ml-4 mb-4 mt-5" justify="start">
        <h4 class="text-h4 pageTitle ">
          Statistiques courriers
        </h4>
      </v-row>
      <v-row justify="center">
        <!-- <v-dialog v-model="addFile" max-width="1000px">
          <v-card style="border-left: 10px solid #3A1C71">
            <v-card-title>
              <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;"
                >Modification courrier</span
              >
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-select
                    label="Nom victim"
                    color="#3A1C71"
                    v-model="adnewObject.fullName"
                    filled
                    :items="enquetteurNameList"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Nom de l'Assuré"
                    v-model="adnewObject.name"
                    color="#3A1C71"
                    disabled
                    background-color="#4DD0E1"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Numéro courrier"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.mailNumber"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Date courrier"
                    v-model="adnewObject.mailDate"
                    color="#3A1C71"
                    filled
                    type="date"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                  <v-textarea
                    label="Observation"
                    color="#3A1C71"
                    filled
                    name="input-7-1"
                    rows="1"
                    v-model="adnewObject.observation"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="error darken-1"
                class="mr-5"
                @click="addFile = false"
                text
              >
                Fermer
              </v-btn>
              <v-btn color="success darken-1" @click="addPvFormModal()">
                Enregistrer le dossier
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
        <v-dialog v-model="addFileMail" max-width="1000px">
          <v-card style="border-left: 10px solid #3A1C71;">
            <!-- {{ victimModal.otherInfo.documentsProvides }} -->
            <v-card-title>
              <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Enregistrer un courrier</span>
            </v-card-title>

            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-select label="Nom victime" outlined color="#3A1C71" v-model="adnewObjectMail.fullName"
                    :items="enquetteurNameList"></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field outlined color="#3A1C71" v-model="adnewObjectMail.fileNumber"
                    label="Identification"></v-text-field>
                </v-col>
                <!-- <v-col cols="12" sm="6" md="4">
          <v-text-field
            label="Nom victim"
            color="#3A1C71"
            v-model="adnewObjectMail.fullName"
            filled
            disabled background-color="#4DD0E1"
          ></v-text-field>
        </v-col> -->
                <!-- <v-col cols="12" sm="6" md="4">
          <v-text-field
            outlined
            color="#3A1C71"
            v-model="adnewObjectMail.transmitter"
            label="Emetteur"
          ></v-text-field>
        </v-col> -->

                <v-col cols="12" sm="6" md="4">
                  <v-text-field outlined color="#3A1C71" v-model="adnewObjectMail.mailNumber"
                    label="Numéro courrier arrivée"></v-text-field>
                </v-col>
                <v-col cols="12" sm="8" md="4">
                  <v-combobox outlined v-model="adnewObjectMail.agent" :items="userNameList" label="Agent" counter
                    multiple show-size truncate-length="50">
                    <!-- <template v-slot:selection="data">
              <v-chip
                :key="JSON.stringify(data.item)"
                v-bind="data.attrs"
                :input-value="data.selected"
                :disabled ="data.disabled"
                @click:close="data.parent.selectItem(data.item)"
              >
                <v-avatar
                  class="accent white--text"
                  left
                  v-text="data.item.slice(0, 1).toUpperCase()"
                ></v-avatar>
                {{ data.item }}
              </v-chip>
            </template> -->
                  </v-combobox>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select outlined :items="['OUI', 'NON']" v-model="adnewObjectMail.sendEmail" color="#3A1C71"
                    label="Notifier Agents ( Mail )"></v-select>
                </v-col>

                <!-- <v-col cols="12" sm="6" md="4">
          <v-autocomplete
            :items="userFile"
            v-model="file"
            color="#3A1C71"
            clearable
            outlined
            deletable-chips
            @change="mailSend"
            label="Nom raison social"
          ></v-autocomplete>
        </v-col> -->
                <v-col cols="12" sm="6" md="4">
                  <v-text-field outlined color="#3A1C71" v-model="adnewObjectMail.receptionDate" label="Date arrivée"
                    type="date"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field outlined color="#3A1C71" v-model="adnewObjectMail.assignmentDate"
                    label="Date affectation" type="date"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field outlined color="#3A1C71" v-model="adnewObjectMail.treatmentDate" label="Date traitement"
                    type="date"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field outlined color="#3A1C71" v-model="adnewObjectMail.outgoingMailNumber"
                    label="Numéro courrier départ"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-select outlined v-model="adnewObjectMail.service" :items="items" label="Service"></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select outlined v-model="adnewObjectMail.nature" :items="natureMails"
                    label="Nature courrier"></v-select>
                </v-col>
                <v-col cols="6" md="6">
                  <v-file-input outlined v-model="adnewObjectMail.files" label="Ajouter les fichiers " counter multiple
                    show-size truncate-length="50"></v-file-input>
                </v-col>

                <v-col cols="6">
                  <v-textarea outlined v-model="adnewObjectMail.CEOInstruction" name="input-7-4" rows="3"
                    label="Instruction"></v-textarea>
                </v-col>
                <v-col cols="6">
                  <v-textarea outlined v-model="adnewObjectMail.observation" rows="3" name="input-7-4"
                    label="Tâches éffectuées"></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error darken-1" class="mr-5" @click="addFileMail = false" text>
                Fermer
              </v-btn>

              <v-btn color="success darken-1" @click="addMailFormModal()">
                Enregistrer le dossier
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="addFileMailGed" max-width="900px">
          <v-card style="border-left: 10px solid #3A1C71">
            <v-card-title>
              <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Gestionnaire de fichier</span>
            </v-card-title>
            <v-item-group multiple>
              <v-container>
                <!-- {{filesListe}} -->
                <v-row>
                  <v-col v-for="n in filesListe" :key="n" cols="12" md="4">
                    <v-item>
                      <v-card class="d-flex align-center" height="200">
                        <v-card-text style="height: 100px; position: relative">
                          <h4 style="text-align: center;">
                            {{ n.name }}
                          </h4>
                          <v-fab-transition>
                            <v-btn class="white--text ma-2" color="#3A1C71" :href="n.url" target="_blank" dark absolute
                              route bottom right fab>
                              <v-icon target="_blank" route :href="n.url">mdi-download</v-icon>
                            </v-btn>
                          </v-fab-transition>
                        </v-card-text>
                      </v-card>
                    </v-item>
                  </v-col>
                </v-row>
              </v-container>
            </v-item-group>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <template>
      <div>
        <v-data-table :headers="headers" :items="mailData" :items-per-page="10" class="elevation-0"
          background-color="red" color="#3A1C71"  local="fr">
          <template v-slot:item="{ item }">
            <tr class=" miniTableRow green-bg">
              <!-- <td>
                    <v-chip :color="getColor(item.status)" dark>
                      {{ item.status }}
                    </v-chip>
                  </td> -->
              <!-- <td>
                    {{
                      item.sinisterVictim ? item.sinisterVictim.fullName : ""
                    }}
                  </td> -->
    
              <td>{{ item.fileNumber }}</td>
              <td>
                {{ item.sinister ? item.sinister.name : "" }}
              </td>
              <!-- <td>{{ item.transmitter }}</td> -->
              <!-- <td>{{ JSON.stringify(item.agent) }}</td> -->
              <td>{{ item.mailNumber }}</td>
              <td>{{ item.receptionDateFr }}</td>
              <td>{{ item.createdAtFr }}</td>
              <td>{{ item.assignmentDateFr }}</td>
              <td>{{ item.treatmentDateFr }}</td>
              <td>{{ item.outgoingMailNumber }}</td>
              <td>{{ item.service }}</td>
              <td>{{ item.nature }}</td>
              <td>{{ item.CEOInstruction }}</td>
              <td>{{ item.observation }}</td>
            </tr>
          </template>
        
          <template v-slot:no-data>
            <h4 class="text-h4 mb-4">pas de données</h4>
          </template></v-data-table>
      </div>
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
    </template>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import { addFilendemnity } from "@/api/user";
import { defaultMethods, messages } from "../../utils/data";
import {
  addFileJson,
  addMailForm,
  // addOperationTypeForm,
  updateVictimeFileForm,
  addVictimeFileForm,
  updateFileForm,
  updateMailForm,
  // addMailForm,
} from "@/api/user.js";
export default {
  name: "mailComponent",

  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: false,
    addFileExcel: false,
    addFile: false,
    page: 1,
    pages: 1,
    e1: 1,
    sinsiterSelectId: "",
    excelFile: null,
    adnewObjectMail: {},
    victimeDialogModal: false,
    selectedDocumentsModal: [],
    commissariatNameList: [],
    enquetteurNameList: [],
    addVictime: false,
    victimesListeData: [],
    victimeFormData: {},
    addNewVictimeFile: false,
    userNameList: [],
    pageCount: 0,
    pageCounts: 0,
    itemsPerPage: 10,
    addFileMail: false,
    addFileMailGed: false,
    printDoc: "",
    sinisterVictimName: "",
    receptionDateStart: "",
    receptionDateEnd: "",
    treatmentDateStart: "",
    treatmentDateEnd: "",
    mailNumber: "",
    unlockButton: true,
    natureMails: [
      "Accord",
      "Actualisation",
      "Attestation",
      "Autre ...",
      "Avenant",
      "Avenant Incorporation",
      "Avenant Retrait",
      "Avis",
      "BIA",
      "Bon de Prise En Charge",
      "Bordereau",
      "Certificat",
      "Changement",
      "Chèque",
      "Chèque",
      "Communication",
      "Compte-rendu",
      "Contrat",
      "Contrat",
      "Convention",
      "Convocation",
      "Courrier",
      "Demande",
      "Demande d'incorporation",
      "Demande d'incorporation + retraits",
      "Demande d'émission de carte",
      "Demande de correction carte",
      "Demande de cotation",
      "Demande de duplicata",
      "Demande de retrait",
      "Devis",
      "Déclaration",
      "Déclaration",
      "Délégation",
      "Explication",
      "Facture",
      "Lettre",
      "Mandat",
      "Modification",
      "Offre",
      "Ordre",
      "Pièce d'étude",
      "Pièces",
      "Procès verbal",
      "Projet",
      "Projet de contrat",
      "Quittance",
      "Quittance",
      "Rachat",
      "Rapport",
      "Retour",
      "Retour contrat signé",
      "Réclamation",
      "Résiliation",
      "Sinistre",
      "Suspension",
      "Transmission",
      "Validation",
    ],
    items: [
      "Administration",
      "Commercial",
      "Finance",
      "Production ADP",
      "Production IARD",
      "Sinistre ADP",
      "Sinistre IARD",
      "Service Informatique",
      "Médecins Conseils",
      "Communication",
      "Directon Générale",
    ],
    civiliteIiems: ["Monsieur", "Madame"],
    Decision: ["Oui", "Non"],
    StatusIiems: [
      "Courrier reçu",
      "Courrier appelé",
      "Courrier retiré",
      "Courrier déchargé",
    ],

    headers: [

      {
        text: "N° Dossier",
        align: "start",
        width: "200px",
        sortable: false,
        value: "fileNumber",
      },
      {
        text: "Nom victime",
        align: "start",
        width: "200px",
        sortable: false,
        value: "sinisterNumber",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
      },
      // { text: "Emetteur", width: "200px", value: "transmitter" },
      // { text: "Agent", width: "200px", value: "agent" },
      { text: "N° courrier arrivée", width: "200px", value: "mailNumber" },
      {
        text: "Date courrier arrivée",
        width: "200px",
        value: "receptionDateFr",
      },
      {
        text: "Date et heure enregistrement courrier",
        width: "300px",
        value: "createdAt",
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
      "mailData",
      "victimeDocumentListe",
      "victimeListe",
      "UserProfile",
      "productListe",
      "indemnityData",
      "victimeList",
      "Commissariat",
      "statFile",
      "userListe",
    ]),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    userListe() {
      this.userNameList = defaultMethods.getNameList(this.userListe);
    },
    victimeList() {
      this.enquetteurNameList = defaultMethods.getNameList(this.victimeList);
      // alert(JSON.stringify(this.enquetteurNameList));
    },
    Commissariat() {
      this.commissariatNameList = defaultMethods.getNameList(this.Commissariat);
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
      "getStatMail",
      "getVictimesDoc",
      "getUserProfile",
      "getProduct",
      "getVictimes",
      "getVictimeListe",
      "getCommissariat",
      "getDoc",
      "getUsers",
    ]),
    async initFiles() {
      this.loading = true;
      try {
        await this.getStatMail({
          statisticalFilter: this.statisticalFilter,
          startDate: this.startDate,
          endDate: this.endDate,
        });
        await this.getUserProfile();
        // await this.getProduct();
        // await this.getUsers();
        // await this.getVictimeListe({});
        // await this.getCommissariat();
      } catch (error) {
        alert(JSON.stringify(error))
        defaultMethods.dispatchError(
          this.$store,
          messages.failedToLoad("les dossiers")
        );
      }
      this.loading = false;
    },
    handleClickMailGed(item) {
      // alert(JSON.stringify(item));

      this.filesListe = item.files;
      // this.adnewObjectMail.mailID = item._id;
      // this.editedIndex = this.adnewObject.indexOf(item);
      // this.adnewObject = Object.assign({}, item);
      this.addFileMailGed = true;
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
    handleClick(item) {
      // alert(JSON.stringify(item));
      this.adnewObjectMail.fileNumber = item.fileNumber;
      this.adnewObjectMail.fullName = item.sinisterVictim.fullName;
      this.adnewObjectMail.mailNumber = item.mailNumber;
      this.adnewObjectMail.agent = item.agent;
      this.adnewObjectMail.sendEmail = item.sendEmail;
      this.adnewObjectMail.receptionDate = item.receptionDate;
      this.adnewObjectMail.assignmentDate = item.assignmentDate;
      this.adnewObjectMail.treatmentDate = item.treatmentDate;
      this.adnewObjectMail.outgoingMailNumber = item.outgoingMailNumber;
      this.adnewObjectMail.service = item.service;
      this.adnewObjectMail.nature = item.nature;
      // this.adnewObjectMail.files = item.files;
      this.adnewObjectMail.CEOInstruction = item.CEOInstruction;
      this.adnewObjectMail.observation = item.observation;
      this.filesListe = item.files;
      this.adnewObjectMail.mailID = item._id;
      // this.editedIndex = this.adnewObject.indexOf(item);
      // this.adnewObject = Object.assign({}, item);
      this.addFileMail = true;
    },
    async docShow(item) {
      await this.getVictimesDoc({ id: item._id });
      // this.editedIndex = this.adnewObject.indexOf(item);
      // this.adnewObject = Object.assign({}, item);
      this.victimeDialogModal = true;
    },
    addNewVictime() {
      this.adnewObjectMail = {};
      this.filesListe = [];
      this.addFileMail = true;
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
    async addVictimesFileFormModal() {
      this.loading = true;
      try {
        const schema = {
          sinister: this.sinsiterSelectId,
          fullName: this.victimeFormData.fullName,
          phone: this.victimeFormData.phone,

          operationType: this.victimeFormData.operationType,
          socioProfessionalSituation: this.victimeFormData
            .socioProfessionalSituation,
          civility: this.victimeFormData.civility,
          age: this.victimeFormData.age,
          settlementAmount: this.victimeFormData.settlementAmount,
          observation: this.victimeFormData.observation,
        };
        // if (this.victimeFormData.operationType == "PV") {
        //   await addOperationTypeForm({ schema });
        // }

        if (this.victimeFormData._id) {
          // update
          await updateVictimeFileForm({
            schema,
            id: this.victimeFormData._id,
          });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.updatedSuccessfully("Dossier")
          );
        } else {
          // add
          await addVictimeFileForm({ schema });
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
      this.loading = false;
      this.addFile = false;
      this.addFileExcel = false;
      this.dialog = false;
      this.dialogDelete = false;
      this.initFiles();
    },
    async updateFile() {
      this.loading = true;
      try {
        const schema = {
          name: this.adnewObject.name,
        };
        await updateFileForm({
          schema,
          id: this.adnewObject.sinisterID,
        });
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
      this.loading = false;
    },
    async updateFileVictime() {
      this.loading = true;
      try {
        const schema = {
          fullName: this.adnewObject.fullName,
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
    async addMailFormModal() {
      this.loading = true;
      // alert(JSON.stringify(this.enquetteurNameList));
      try {
        const formData = new FormData();
        if (this.adnewObjectMail.fileNumber) {
          formData.append("fileNumber", this.adnewObjectMail.fileNumber);
        }
        if (this.adnewObjectMail.mailNumber) {
          formData.append("mailNumber", this.adnewObjectMail.mailNumber);
        }
        if (this.adnewObjectMail.fullName) {
          formData.append(
            "sinisterVictim",
            defaultMethods.getItemId(
              this.victimeList,
              this.adnewObjectMail.fullName
            )
          );
        }
        if (this.adnewObjectMail.agent) {
          formData.append("agent", JSON.stringify(this.adnewObjectMail.agent));
        }

        // if (this.adnewObjectMail.agent) {
        //   for (let i = 0; i < this.adnewObjectMail.agent.length; i++) {
        //     formData.append("agent", this.adnewObjectMail.agent[i]);
        //   }
        // }
        if (this.adnewObjectMail.sendEmail) {
          formData.append(
            "sendEmail",
            this.adnewObjectMail.sendEmail == "OUI" ? true : false
          );
        }
        if (this.adnewObjectMail.receptionDate) {
          formData.append("receptionDate", this.adnewObjectMail.receptionDate);
        }
        if (this.adnewObjectMail.assignmentDate) {
          formData.append(
            "assignmentDate",
            this.adnewObjectMail.assignmentDate
          );
        }
        if (this.adnewObjectMail.treatmentDate) {
          formData.append("treatmentDate", this.adnewObjectMail.treatmentDate);
        }
        if (this.adnewObjectMail.outgoingMailNumber) {
          formData.append(
            "outgoingMailNumber",
            this.adnewObjectMail.outgoingMailNumber
          );
        }
        if (this.adnewObjectMail.service) {
          formData.append("service", this.adnewObjectMail.service);
        }
        if (this.adnewObjectMail.nature) {
          formData.append("nature", this.adnewObjectMail.nature);
        }
        if (this.adnewObjectMail.CEOInstruction) {
          formData.append(
            "CEOInstruction",
            this.adnewObjectMail.CEOInstruction
          );
        }
        if (this.adnewObjectMail.observation) {
          formData.append("observation", this.adnewObjectMail.observation);
        }
        if (this.victimeId) {
          formData.append("sinisterVictim", this.victimeId);
        }
        if (this.adnewObjectMail.mailDate) {
          formData.append("mailDate", this.adnewObjectMail.mailDate);
        }
        if (this.adnewObjectMail.agent) {
          formData.append(
            "emails",
            JSON.stringify(
              defaultMethods.getItemsEmail(
                this.userListe,
                this.adnewObjectMail.agent
              )
            )
          );
        }
        if (this.adnewObjectMail.files) {
          for (let i = 0; i < this.adnewObjectMail.files.length; i++) {
            formData.append("files", this.adnewObjectMail.files[i]);
          }
        }
        // const schema = {
        //   fileNumber: this.adnewObjectMail.fileNumber,
        //   mailNumber: this.adnewObjectMail.mailNumber,
        //   agent: this.adnewObjectMail.agent,
        //   sendEmail: this.adnewObjectMail.sendEmail == "OUI" ? true : false,
        //   receptionDate: this.adnewObjectMail.receptionDate,
        //   assignmentDate: this.adnewObjectMail.assignmentDate,
        //   treatmentDate: this.adnewObjectMail.treatmentDate,
        //   outgoingMailNumber: this.adnewObjectMail.outgoingMailNumber,
        //   service: this.adnewObjectMail.service,
        //   nature: this.adnewObjectMail.nature,
        //   CEOInstruction: this.adnewObjectMail.CEOInstruction,
        //   observation: this.adnewObjectMail.observation,
        //   sinisterVictim: this.victimeId,
        //   mailDate: this.adnewObjectMail.mailDate,

        //   transmitter: this.adnewObjectMail.transmitter,

        //   file: defaultMethods.getItemId(this.Files.docs, this.file),
        //   emails: defaultMethods.getItemsEmail(
        //     this.userListe,
        //     this.adnewObjectMail.agent
        //   ),
        // };
        // alert(this.adnewObjectMail.mailID);
        if (this.adnewObjectMail.mailID) {
          // update

          await updateMailForm({
            schema: formData,
            id: this.adnewObjectMail.mailID,
          });

          defaultMethods.dispatchSuccess(
            this.$store,
            messages.updatedSuccessfully("Dossier")
          );
        } else {
          // add
          await addMailForm({ schema: formData });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.createdSuccessfully("Dossier")
          );
        }

        // this.closeMail();
        this.initFiles();
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
      this.loading = false;
      this.addFile = false;
      this.addFileMail = false;
      this.dialog = false;
      this.dialogDelete = false;
      this.initFiles();
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

.green-bg {
  /* Set the display to `table-row` because Vuetify makes `flex` */
  display: table-row;
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


.miniTableRow:nth-child(even) {
  background-color: #f2f2f2;
}
.green-bg {
  /* Set the display to `table-row` because Vuetify makes `flex` */
  display: table-row;
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
</style>
