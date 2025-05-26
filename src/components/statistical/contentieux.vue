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
              <v-col cols="12" md="3">
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
                <v-select
                  :items="enquetteurNameList"
                  filled
                  prepend-inner-icon="mdi-magnify"
                  dense
                  class="pt-5 pa-2"
                  outlined
                  @change="updateVModel(statisticalFilter)"
                  flat
                  rounded
                  label="Avocat"
                  color="#3A1C71"
                  v-model="lawyer"
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
            Statistiques contentieux
          </h4>
        </v-row>
        <v-row justify="center">
          <v-dialog v-model="addFile" max-width="1000px">
            <v-card style="border-left: 10px solid #3A1C71">
              <v-card-title>
                <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Modification Contentieux</span>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Numéro sinistre" color="#3A1C71" disabled background-color="#4DD0E1"
                      v-model="adnewObject.sinisterNumber" filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Nom de l'Assuré" v-model="adnewObject.name" color="#3A1C71" filled disabled
                      background-color="#4DD0E1"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Nom de la victime" color="#3A1C71" filled disabled background-color="#4DD0E1"
                      v-model="adnewObject.fullName"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Contact victime" v-model="adnewObject.phone" color="#3A1C71" disabled
                      background-color="#4DD0E1" filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Nom de l'agent" v-model="adnewObject.agentName" color="#3A1C71" disabled
                      background-color="#4DD0E1" filled></v-text-field>
                  </v-col>
  
                  <v-col cols="12" sm="6" md="6">
                    <v-select label="Avocat" color="#3A1C71" :items="enquetteurNameList" v-model="adnewObject.lawyer"
                      filled></v-select>
                  </v-col>
  
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Date mission" color="#3A1C71" type="date" filled @change="valueChange()"
                      v-model="adnewObject.requestDate"></v-text-field>
                  </v-col>
  
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Date compte rendu" color="#3A1C71" type="date" filled @change="valueChange()"
                      v-model="adnewObject.reportArrivalDate"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Nombre de jour" color="#3A1C71" type="number" filled disabled
                      @change="valueChange()" background-color="#4DD0E1" v-model="adnewObject.numberOfDay"></v-text-field>
                  </v-col>
  
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Date prochaine audience" color="#3A1C71" filled type="date"
                      v-model="adnewObject.nextHearingDate"></v-text-field>
                  </v-col>
  
                  <v-col cols="12" sm="6" md="6">
                    <v-textarea label="Compte rendu (Conseil)" color="#3A1C71" filled name="input-7-1" rows="1"
                      v-model="adnewObject.expertObservation"></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-textarea label="Observation" color="#3A1C71" filled name="input-7-1" rows="1"
                      v-model="adnewObject.observation"></v-textarea>
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
          <v-data-table :headers="headers" :items="litigation" :items-per-page="10" class="elevation-0"
            background-color="red" color="#3A1C71" :loading="loading ? '#3A1C71' : null" local="fr">
            <template v-slot:item="{ item }">
              <tr @click="handleClick(item)" class="miniTableRow green-bg">
                <!-- <td>
                          <v-chip :color="getColor(item.status)" dark>
                            {{ item.status }}
                          </v-chip>
                        </td> -->
  
                <!-- <td>{{ item.status }}</td> -->
                <td>
                  {{
                    item.sinisterVictim.sinister
                      ? item.sinisterVictim.sinister.sinisterNumber
                      : ""
                  }}
                </td>
                <td>
                  {{
                    item.sinisterVictim.sinister
                      ? item.sinisterVictim.sinister.name
                      : ""
                  }}
                </td>
                <td>
                  {{ item.sinisterVictim ? item.sinisterVictim.fullName : "" }}
                </td>
                <td>
                  {{ item.sinisterVictim ? item.sinisterVictim.phone : "" }}
                </td>
                <td>{{ item.agentName }}</td>
                <td>{{ item.lawyer ? item.lawyer.name : "" }}</td>
                <td>{{ item.requestDate }}</td>
                <td>{{ item.reportArrivalDate }}</td>
                <td>{{ item.numberOfDay }}</td>
                <td>{{ item.nextHearingDate }}</td>
                <td>{{ item.expertObservation }}</td>
                <td style="white-space: nowrap;word-wrap: break-word;width:200px">{{ item.observation }}</td>
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
  import { defaultMethods, messages } from "../../utils/data";
  import {
    addFileJson,
    // addOperationTypeForm,
    updateLitigation,
    updateVictimeFileForm,
    addVictimeFileForm,
    updateFileForm,
  } from "@/api/user.js";
  export default {
    name:'litigationComponent',
  
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
      BankNameListe: [],
      enquetteurNameList: [],
      addVictime: false,
      victimesListeData: [],
      victimeFormData: {},
      addNewVictimeFile: false,
      pageCount: 0,
      pageCounts: 0,
      itemsPerPage: 10,
      requestDateStart: "",
      requestDateEnd: "",
      reportArrivalDateStart: "",
      reportArrivalDateEnd: "",
      nextHearingDateStart: "",
      nextHearingDateEnd: "",
      sinisterNumber: "",
      sinisterVictimName: "",
      lawyer: "",
      printDoc: "",
      unlockButton: true,
      civiliteIiems: ["Monsieur", "Madame"],
      Decision: ["Oui", "Non"],
      StatusIiems: [
        "En cours",
        "Terminé",
      ],
  
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
          text: "Avocat",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "lawyer",
        },
        {
          text: "Date mission",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "requestDate",
        },
  
        {
          text: "Date compte rendu",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "reportArrivalDate",
        },
        {
          text: "Nombre de jour",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "numberOfDay",
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
        {
          text: "Date prochaine audience",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "nextHearingDate",
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
        "Enquetteur",
        "Commissariat",
        "litigation",
        "expertListe",
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
      // Enquetteur() {
      //   this.enquetteurNameList = defaultMethods.getNameList(this.Enquetteur);
      // },
      expertListe() {
        this.enquetteurNameList = defaultMethods.getNameList(this.expertListe);
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
        "getPvFiles",
        "getVictimesDoc",
        "getUserProfile",
        "getProduct",
        "getVictimes",
        "getEnquetteur",
        "getCommissariat",
        "getDoc",
        "getLitigation",
        "getExpert",
        "getLawyer"
      ]),
      async initFiles() {
        this.loading = true;
        try {
          await this.getLitigation({
            status: this.statisticalFilter,
          startDate: this.startDate,
          endDate: this.endDate,
          lawyer: defaultMethods.getItemId(
              this.expertListe,
              this.lawyer
            ),
          });
          await this.getUserProfile();
          await this.getLawyer();
          //await this.getExpert();
          //await this.getCommissariat();
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
        this.adnewObject.sinisterNumber = item.sinisterVictim.sinister
          ? item.sinisterVictim.sinister.sinisterNumber
          : "";
        this.adnewObject.name = item.sinisterVictim.sinister
          ? item.sinisterVictim.sinister.name
          : "";
        this.adnewObject.fullName = item.sinisterVictim
          ? item.sinisterVictim.fullName
          : "";
        this.adnewObject.phone = item.sinisterVictim
          ? item.sinisterVictim.phone
          : "";
        this.adnewObject.agentName = item.agentName;
        this.adnewObject.lawyer = defaultMethods.getItemName(
          this.enquetteurNameList,
          item.lawyer
        );
        this.adnewObject.requestDate = item.requestDate;
        this.adnewObject.reportArrivalDate = item.reportArrivalDate;
  
        this.adnewObject.numberOfDay = item.numberOfDay;
        this.adnewObject.nextHearingDate = item.nextHearingDate;
        this.adnewObject.expertObservation = item.expertObservation;
        this.adnewObject.observation = item.observation;
        this.elitigationID = item._id;
        this.sinsiterSelectId = item.sinisterVictim._id;
        this.valueChange();
        //   this.editedIndex = this.adnewObject.indexOf(item);
        // this.adnewObject = Object.assign({}, item);
        this.addFile = true;
      },
      async docShow(item) {
        await this.getVictimesDoc({ id: item._id });
        // this.editedIndex = this.adnewObject.indexOf(item);
        // this.adnewObject = Object.assign({}, item);
        this.victimeDialogModal = true;
      },
      valueChange() {
        let date1 = new Date(this.adnewObject.requestDate);
        let date2 = new Date(this.adnewObject.reportArrivalDate); // To calculate the time difference of two dates
        let Difference_In_Time = date2.getTime() - date1.getTime(); // To calculate the no. of days between two dates
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        this.adnewObject.numberOfDay = Difference_In_Days;
        // alert(Difference_In_Days);
        this.adnewObject.expertContact = defaultMethods.getItemsContact(
          this.expertListe,
          this.adnewObject.expertName
        );
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
            vehicleRegistration: this.adnewObject.vehicleRegistration,
            pvNumber: this.adnewObject.pvNumber,
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
      async addPvFormModal() {
        this.loading = true;
  
        try {
          const schema = {
            sinisterVictim: this.sinsiterSelectId,
            lawyer: defaultMethods.getItemId(
              this.enquetteurNameList,
              this.adnewObject.lawyer
            ),
            requestDate: this.adnewObject.requestDate,
            reportArrivalDate: this.adnewObject.reportArrivalDate,
            // numberOfDay: this.adnewObject.numberOfDay,
            nextHearingDate: this.adnewObject.nextHearingDate,
            expertObservation: this.adnewObject.expertObservation,
            observation: this.adnewObject.observation,
          };
  
          if (this.elitigationID) {
            // update
            await updateLitigation({
              schema,
              id: this.elitigationID,
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
  
  
  .miniTableRow:nth-child(even) {
    background-color: #f2f2f2;
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
  