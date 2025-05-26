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
      <v-row class="ml-1 mb-4 mt-5" justify="start">
        <h4 class="text-h4 pageTitle">Statistique Recours</h4>
      </v-row>
      <v-row class="ml-0" flat>
        <v-btn
          class="mt-10 btnDesign"
          flat
          color="#3a1c71"
          text-color="white"
          pill
          @click="makePsapCapture()"
        >
          Actualisé SAP
          <v-icon size="30" class="ml-3 mr-3" color="#fff" left>
            mdi-microsoft-excel
          </v-icon>
        </v-btn>

        <v-autocomplete
          label="Statut"
          multiple
          filled
          dense
          outlined
          flat
          color="#3A1C71"
          :items="StatusIiems"
          class="mr-0 ml-5 mb-0 mt-10"
          v-model="printDoc"
        ></v-autocomplete>

        <v-autocomplete
          label="Exercice"
          filled
          dense
          outlined
          flat
          color="#3A1C71"
          :items="exerciceSelect"
          class="mr-0 ml-5 mb-0 mt-10"
          v-model="printDoc"
        ></v-autocomplete>

        <v-autocomplete
          label="Réouvert"
          filled
          dense
          outlined
          flat
          color="#3A1C71"
          :items="Decision"
          class="mr-0 ml-5 mb-5 mt-10"
          v-model="printDoc"
        ></v-autocomplete>

        <!-- <v-col cols="12" sm="6" md="3">
                <v-select label="Duplicata" color="#3A1C71" :items="['Oui', 'Non']" class="mr-5 ml-0 mb-0 mt-8 "
                  v-model="printDocState" @change="schowElement()"></v-select>
               </v-col> -->
        <v-spacer></v-spacer>
        <v-btn
          class="mr-5 mt-10 btnDesign"
          flat
          color="#1D6F42"
          text-color="white"
          pill
          @click="genereteDoc()"
        >
          Exporter vers un tableau EXCEL
          <v-icon size="30" class="ml-3 mr-3" color="#fff" left>
            mdi-microsoft-excel
          </v-icon>
        </v-btn>
      </v-row>

      <div id="miniTable">
        <table class="miniTableTable">
          <tr>
            <th class="miniTableHead">Statut</th>
            <th class="miniTableHead">Nbre. Sinistre</th>
            <th class="miniTableHead">Montant payé</th>
            <th class="miniTableHead">Montant à encaissé</th>
            <th class="miniTableHead">Montant encaissé</th>
          </tr>
          <tr
            class="miniTableRow"
            v-for="(row, index) in recoursRecapData"
            :key="index"
          >
            <td class="miniTableElement">{{ row.statuts }}</td>
            <td class="miniTableElement">{{ row.number }}</td>
            <td class="miniTableElement">
              {{ row.totalamountPayed }}
            </td>
            <td class="miniTableElement">{{ row.totalremainToCollect }}</td>
            <td class="miniTableElement">{{ row.totalamountCollected }}</td>
          </tr>
          <tr class="total-row">
            <td>Total</td>

            <td>{{ getTotal("number") }}</td>
            <td>{{ getTotal("totalamountPayed") }}</td>
            <td>{{ getTotal("totalremainToCollect") }}</td>
            <td>{{ getTotal("totalamountCollected") }}</td>
          </tr>
        </table>
      </div>
    </v-container>
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
    <template>
      <div>
        <v-data-table
          :headers="headers"
          :items="recours"
          :items-per-page="10"
          class="elevation-0"
          background-color="red"
          color="#3A1C71"
        >
          <template v-slot:item="{ item }">
            <tr @click="handleClick(item)" class="miniTableRow green-bg">
              <!-- <td>
                                                    <v-chip :color="getColor(item.status)" dark>
                                                      {{ item.status }}
                                                    </v-chip>
                                                  </td> -->

              <td>
                <v-chip :color="getColor(item.status)" dark>
                  {{ item.status == "" ? "En cours" : item.status }}
                </v-chip>
              </td>
              <td>{{ item.sinister ? item.sinister.sinisterNumber : "" }}</td>

              <td>{{ item.sinister ? item.sinister.name : "" }}</td>
              <td>
                {{ item.sinisterVictim ? item.sinisterVictim.fullName : "" }}
              </td>
              <td>
                {{ item.sinisterVictim ? item.sinisterVictim.phone : "" }}
              </td>
              <td>{{ item.agentName }}</td>
              <td>{{ item.studyOffer }}</td>
              <td>{{ item.amountToCollect }}</td>
              <td>{{ item.collectionDate }}</td>
              <td>{{ item.amountCollected }}</td>
              <td>{{ item.remainToCollect }}</td>
              <td>{{ item.returnType }}</td>
              <td>{{ item.responsibilityRate }}</td>
              <td>{{ item.beneficiaryName }}</td>
              <td>{{ item.amountRequestQuote }}</td>
              <td>{{ item.amountPayed }}</td>
              <td>{{ item.expertise }}</td>
              <td>{{ item.appealExerciseDate }}</td>
              <td>{{ item.collectionRate }}</td>
              <td>{{ item.firstReminderDate }}</td>
              <td>{{ item.secondReminderDate }}</td>
              <td>{{ item.thirdReminderDate }}</td>
              <td>{{ item.penaltyAmount }}</td>
              <td>{{ item.observation }}</td>
            </tr>
          </template>

          <template v-slot:no-data>
            <h4 class="text-h4 mb-4">pas de données</h4>
          </template></v-data-table
        >
      </div>
    </template>
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
  makeCapture,
  // addVictimeFileForm,
  // updateFileForm,
  updateBonForm,
} from "@/api/user.js";
export default {
  name: "bonComponent",

  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: false,
    addFileExcel: false,
    addFile: false,
    rows: [
      {
        data1: "Donnée 1",
        data2: "Donnée 2",
        data3: "Donnée 3",
        data4: "Donnée 4",
        data5: "Donnée 5",
      },
      {
        data1: "Donnée 1",
        data2: "Donnée 2",
        data3: "Donnée 3",
        data4: "Donnée 4",
        data5: "Donnée 5",
      },
      {
        data1: "Donnée 1",
        data2: "Donnée 2",
        data3: "Donnée 3",
        data4: "Donnée 4",
        data5: "Donnée 5",
      },
      {
        data1: "Donnée 1",
        data2: "Donnée 2",
        data3: "Donnée 3",
        data4: "Donnée 4",
        data5: "Donnée 5",
      },
    ],
    page: 1,
    StatusIiems: ["EN COURS", "Soldé", "Sans suite", "Prescrit", "Recours"],
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
    recoursRecapData: [],
    sinisterNumber: "",
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
    exerciceSelect: ["En cours", "Antérieur", "Touts ..."],
    headers: [
      {
        text: "Statut",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "status",
      },
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
        text: "Nom agent",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "agentName",
      },
      {
        text: "sinister etude offre ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "studyOffer",
      },
      {
        text: "Montant a encaisser ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "amountToCollect",
      },
      {
        text: "Date encaissement ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "collectionDate",
      },

      {
        text: "Montant encaisse ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "amountCollected",
      },
      {
        text: "Reste a encaisser ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "remainToCollect",
      },
      {
        text: "type de recours  ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "returnType",
      },
      {
        text: "Taux de responsabilité  ",
        width: "250px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "responsibilityRate",
      },
      {
        text: "Béneficiaire recours ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "benificiary",
      },
      {
        text: "Montant demande devis ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "amountRequestQuote",
      },
      {
        text: "Montant payer ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "amountPayed",
      },
      {
        text: "Expertise",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "expertise",
      },
      {
        text: "Date exercice recours ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "appealExerciseDate",
      },
      {
        text: "Taux d'encaissement ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "collectionRate",
      },
      {
        text: "Date premier relance ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "firstReminderDate",
      },
      {
        text: "Date deuxieme relance ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "secondReminderDate",
      },
      {
        text: "Date troisième relance ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "thirdReminderDate",
      },
      {
        text: "Montant pénalité ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "penaltyAmount",
      },
      {
        text: "Observation  ",
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
      "recours",
      "victimeDocumentListe",
      "victimeListe",
      "UserProfile",
      "productListe",
      "indemnityData",
      "inventoryListe",
      "Commissariat",
      "statPsapData",
      "statPsapFileLink",
      "statPsapFileRecapLink",
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
      "getRecour",
      "getStatPsap",
      "getVictimeListe",
      "getExpert",
    ]),
    getTotal(column) {
      if (this.recoursRecapData) {
        return this.recoursRecapData.reduce(
          (total, row) => total + parseFloat(row[column]),
          0
        );
      } else {
        return 0;
      }
    },
    async initFiles() {
      this.loading = true;
      try {
        await this.getRecour({
          appealExerciseDateStart: this.appealExerciseDateStart,
          appealExerciseDateEnd: this.appealExerciseDateEnd,
          periodStartDate: this.periodStartDate,
          periodEndDate: this.periodEndDate,
          fileName: this.fileName,
          withoutPeriod: this.showAllFil,
          sinisterNumber: this.sinisterNumber,
          status: this.status,
        })
          .then((res) => {
            const statusTypes = [
              "Recours à encaisser",
              "Réclamation de la période",
              "Prévision recours",
              "Recours encaissé",
              "Paiement de la période",
            ];

             this.recoursRecapData = [];

            statusTypes.forEach((status) => {
              this.recoursRecapData.push({
                statuts: status,
                number: 0,
                totalamountToCollect: 0,
                totalamountCollected: 0,
                totalremainToCollect: 0,
                totalamountRequestQuote: 0,
                totalamountPayed: 0,
              });
            });
            

            res.forEach((item) => {
          
              const {
                status,
                amountToCollect,
                amountCollected,
                remainToCollect,
                amountRequestQuote,
                amountPayed,
              } = item;

              const recoursData = this.recoursRecapData.find(
                (recap) => recap.statuts === status
              );
             
              if (recoursData) {
                recoursData.totalamountToCollect += amountToCollect;
                recoursData.number += 1;
                recoursData.totalamountCollected += amountCollected;
                recoursData.totalremainToCollect += remainToCollect;
                recoursData.totalamountRequestQuote += amountRequestQuote;
                recoursData.totalamountPayed += amountPayed;
              }
              
            });

            //alert(JSON.stringify(this.recoursRecapData))
          })
          .catch((error) => {
            console.log(error);
          });

        await this.getUserProfile();
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
    async makePsapCapture() {
      this.loading = true;
      await makeCapture()
        .then((res) => {
          console.log(res);
          this.initFiles();
        })
        .catch((error) => {
          console.log(error);
        });

      this.loading = false;
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
      if (item == "EN COURS") return "orange";
      else if (item == "Suspens") return "red";
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

.green-bg {
  /* Set the display to `table-row` because Vuetify makes `flex` */
  display: table-row;
}

td {
  font-size: 12px !important;
  border-bottom: 1px solid #f4f7fe !important;
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

.green-bg:hover {
  /* `!important` is necessary here because Vuetify overrides this */
  background: #3a1c71 !important;
  color: white;
  height: 60px;
  animation: -45deg;
  cursor: pointer;
  box-shadow: inset 0 0 1em #3a1c71, 0 0 2em #eeeeee;
}

.miniTableTable {
  border-collapse: collapse;
  width: 100%;
}

.miniTableHead,
.miniTableElement {
  border: 1px solid rgb(214, 214, 214);
  padding: 8px;
  text-align: left;
}

.miniTableHead {
  font-size: 15px !important;
  font-weight: 700;
  background: #3a1c71 !important;
  color: #fff !important;
}

.miniTableRow:nth-child(even) {
  background-color: #f2f2f2;
}

.miniTable {
  width: 500px !important;
}

.total-row td {
  border: 1px solid rgb(214, 214, 214);
  font-size: 15px !important;
  font-weight: 700;
  padding: 8px;
  text-align: left;
}

.total-row {
  background: #3a1c71 !important;
  color: #fff !important;
}
</style>
  