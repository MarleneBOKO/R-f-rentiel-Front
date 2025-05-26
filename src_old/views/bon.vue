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
      <v-expansion-panels flat style="border: 1px solid #3A1C71;margin-bottom:10px">
        <v-expansion-panel class="elevation-0">
          <v-expansion-panel-header>
            Tri / Recherche ...
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date demande bon début" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="requestDateStart" type="date" filled dense outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date demande bon fin" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="requestDateEnd" type="date" filled dense outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date emission bon début" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="voucherIssueDateStart" type="date" filled dense outlined
                  flat background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date emission bon fin" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="voucherIssueDateEnd" type="date" filled dense outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date récèption facture début" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="invoiceReceiptDateStart" type="date" filled dense outlined
                  flat background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date récèption facture fin" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="invoiceReceiptDateEnd" type="date" filled dense outlined
                  flat background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date payement début" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="paymentDateStart" type="date" filled dense outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date payement fin" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="paymentDateEnd" type="date" filled dense outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Demandeur" class="pt-5 pa-2" filled
                  prepend-inner-icon="mdi-magnify" dense v-model="applicant" outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Numéro sinistre" class="pt-5 pa-2" filled
                  prepend-inner-icon="mdi-magnify" dense v-model="sinisterNumber" outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#3A1C71" outlined pill rounded class="mr-2" @click="initFiles()">
                <v-icon left>
                  mdi-magnify
                </v-icon>
                Appliquer la recherche
              </v-btn>
              <v-btn color="#1D6F42" outlined pill rounded :href="statFile" target="_blank">
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
          Listing des bons de prise en charge
        </h4>
      </v-row>
      <v-row justify="center">
        <v-dialog v-model="addFile" max-width="1000px">
          <v-card style="border-left: 10px solid #3A1C71">
            <v-card-title>
              <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Suivi des bons</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Numéro sinistre" color="#3A1C71" disabled background-color="#4DD0E1"
                    v-model="adnewObject.sinisterNumber" filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Nom de l'Assuré" v-model="adnewObject.name" color="#3A1C71" filled disabled
                    background-color="#4DD0E1"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Nom de la victime" color="#3A1C71" filled disabled background-color="#4DD0E1"
                    v-model="adnewObject.fullName"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Contact victime" v-model="adnewObject.phone" color="#3A1C71" disabled
                    background-color="#4DD0E1" filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Date demande" v-model="adnewObject.requestDate" color="#3A1C71" type="date"
                    filled></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Demandeur" color="#3A1C71" filled v-model="adnewObject.Applicant"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-select label="Expertise" :items="['Oui', 'Non']" v-model="adnewObject.expertiseType"
                    color="#3A1C71" filled></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Montant" color="#3A1C71" v-model="adnewObject.amount" filled
                    type="number"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Date emission de bon" color="#3A1C71" v-model="adnewObject.voucherIssueDate"
                    filled type="date"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Date réception facture" color="#3A1C71" filled type="date"
                    v-model="adnewObject.invoiceReceiptDate"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Date payement" color="#3A1C71" filled type="date"
                    v-model="adnewObject.paymentDate"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="Observation de l'expert" color="#3A1C71" filled
                    v-model="adnewObject.expertObservation"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="Observation" color="#3A1C71" filled
                    v-model="adnewObject.observation"></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error darken-1" class="mr-5" @click="addFile = false" text>
                Fermer
              </v-btn>
              <v-btn color="success darken-1" @click="addPvFormModal()">
                Enregistrer le dossier
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <template>
      <div>
        <v-data-table :headers="headers" :items="bon" :items-per-page="10" class="elevation-0" background-color="red"
          color="#3A1C71" :loading="loading ? '#3A1C71' : null">
          <template v-slot:item="{ item }">
            <tr @click="handleClick(item)" class="miniTableRow green-bg">
              <!-- <td>
                          <v-chip :color="getColor(item.status)" dark>
                            {{ item.status }}
                          </v-chip>
                        </td> -->

              <!-- <td>{{ item.status }}</td> -->
              <td>{{ item.sinister ? item.sinister.sinisterNumber : "" }}</td>

              <td>{{ item.sinister ? item.sinister.name : "" }}</td>
              <td>
                {{ item.sinisterVictim ? item.sinisterVictim.fullName : "" }}
              </td>
              <td>
                {{ item.sinisterVictim ? item.sinisterVictim.phone : "" }}
              </td>
              <td>{{ item.agentName }}</td>
              <td>{{ item.requestDate }}</td>
              <td>{{ item.applicant }}</td>
              <td>{{ item.voucherIssueDate }}</td>
              <td>{{ item.invoiceReceiptDate }}</td>
              <td>{{ item.paymentDate }}</td>
              <td>{{ item.expertObservation }}</td>
              <td>{{ item.observation }}</td>
            </tr>
          </template>
          <template v-slot:top>
            <v-toolbar flat>

            </v-toolbar>
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
import { defaultMethods, messages } from "../utils/data";
import {
  addFileJson,
  // addOperationTypeForm,
  updateVictimeFileForm,
  // addVictimeFileForm,
  // updateFileForm,
  updateBonForm,
} from "@/api/user.js";
export default {
  name:'bonComponent',

  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: false,
    addFileExcel: false,
    addFile: false,
    page: 1,
    pages: 1,
    sinsiterSelectId: "",
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
    sinisterNumber:"",
    isExpert: true,
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
    itemsPerPage: 10,
    printDoc: "",
    unlockButton: true,
    civiliteIiems: ["Monsieur", "Madame"],
    Decision: ["Oui", "Non"],
    StatusIiems: ["Expert", "Victime", "Autres ..."],

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
        text: "Date demande",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "requestDate",
      },
      {
        text: "Demandeur",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "Applicant",
      },
      {
        text: "Date emmission de bon ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "voucherIssueDate",
      },

      {
        text: "Date réception facture",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "invoiceReceiptDate",
      },
      {
        text: "Date payement ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "paymentDate",
      },
      {
        text: "Observation de l'expert",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "expertObservation",
      },

      {
        text: "Observation",
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
      "bon",
      "victimeList",
      "statFile",
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
      "getBon",
      "getVictimeListe",
      "getExpert",
    ]),
    async initFiles() {
      this.loading = true;
      try {
        await this.getBon({
          requestDateStart: this.requestDateStart,
          requestDateEnd: this.requestDateEnd,
          voucherIssueDateStart: this.voucherIssueDateStart,
          voucherIssueDateEnd: this.voucherIssueDateEnd,
          invoiceReceiptDateStart: this.invoiceReceiptDateStart,
          invoiceReceiptDateEnd: this.invoiceReceiptDateEnd,
          paymentDateStart: this.paymentDateStart,
          paymentDateEnd: this.paymentDateEnd,
          applicant: this.applicant,
          sinisterNumber: this.sinisterNumber,
        });
        // await this.getUserProfile();
        // await this.getProduct();
        // await this.getEnquetteur();
        // await this.getCommissariat();
        // await this.getVictimeListe();
        // await this.getExpert();
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
    handleClick(item) {
      // alert(JSON.stringify(item));
      this.adnewObject.sinisterNumber = item.sinister.sinisterNumber;
      this.adnewObject.name = item.sinister.name;
      this.adnewObject.amount = item.amount;
      this.adnewObject.expertiseType = item.expertiseType;
      this.adnewObject.fullName = item.sinisterVictim.fullName;
      this.adnewObject.phone = item.sinisterVictim.phone;
      this.adnewObject.requestDate = item.requestDate;
      this.adnewObject.Applicant = item.applicant;
      this.adnewObject.voucherIssueDate = item.voucherIssueDate;
      this.adnewObject.invoiceReceiptDate = item.invoiceReceiptDate;
      this.adnewObject.paymentDate = item.paymentDate;
      this.adnewObject.expertObservation = item.expertObservation;
      this.adnewObject.observation = item.observation;

      this.adnewObject.bonID = item._id;
      this.adnewObject.sinsterVictimeID = item.sinisterVictim._id;
      // this.editedIndex = this.adnewObject.indexOf(item);
      // this.adnewObject = Object.assign({}, item);
      this.addFile = true;
    },
    async docShow(item) {
      await this.getVictimesDoc({ id: item._id });
      // this.editedIndex = this.adnewObject.indexOf(item);
      // this.adnewObject = Object.assign({}, item);
      this.victimeDialogModal = true;
    },
    addNewVictime() {
      this.adnewObject = {};
      this.addFile = true;
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
    async addPvFormModal() {
      this.loading = true;
      try {
        const schema = {
          // policeStation: defaultMethods.getItemId(
          //   this.Commissariat,
          //   this.adnewObject.policeStation
          // ),
          sinisterVictim: this.adnewObject.sinsterVictimeID,
          expertiseType: this.adnewObject.expertiseType,
          amount: this.adnewObject.amount,

          requestDate: this.adnewObject.requestDate,
          applicant: this.adnewObject.Applicant,
          voucherIssueDate: this.adnewObject.voucherIssueDate,
          invoiceReceiptDate: this.adnewObject.invoiceReceiptDate,
          paymentDate: this.adnewObject.paymentDate,
          expertObservation: this.adnewObject.expertObservation,
          observation: this.adnewObject.observation,
        };

        if (this.adnewObject.bonID) {
          await updateBonForm({
            schema,
            id: this.adnewObject.bonID,
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
      this.loading = false;
      this.addFile = false;
      this.addFileExcel = false;
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
