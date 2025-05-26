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
                <v-text-field color="#3A1C71" label="Date enregistrement début" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="StartDate" type="date" filled dense outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date enregistrement fin" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="EndDate" type="date" filled dense outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date Réclamation début" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="claimDateStart" type="date" filled dense outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date Réclamation fin" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="claimDateEnd" type="date" filled dense outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date réception début" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="receivedDateStart" type="date" filled dense outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date réception fin" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="receivedDateEnd" type="date" filled dense outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date payement début" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="paymentDateStart" type="date" filled dense outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date payement fin" class="pt-5 pa-2" prepend-inner-icon="mdi-magnify"
                  v-model="paymentDateEnd" type="date" filled dense outlined flat background-color="grey lighten-4"
                  rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Nom assuré" class="pt-5 pa-2" filled prepend-inner-icon="mdi-magnify"
                  dense v-model="fileName" outlined flat background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-autocomplete label="Commissariat" color="#3A1C71" :items="commissariatNameList" class="pt-5 pa-2"
                  filled prepend-inner-icon="mdi-magnify" dense v-model="policeStation" outlined flat
                  background-color="grey lighten-4" rounded></v-autocomplete>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Numéro sinistre" class="pt-5 pa-2" filled
                  prepend-inner-icon="mdi-magnify" dense v-model="sinisterNumber" outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-select :items="StatusIiems" filled prepend-inner-icon="mdi-magnify" dense class="pt-5 pa-2" outlined
                  flat rounded label="Statut" color="#3A1C71" v-model="status"></v-select>
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
          Listing des procès-verbaux
        </h4>
      </v-row>
      <v-row justify="center">
        <v-dialog v-model="addFile" max-width="1000px">
          <v-card style="border-left: 10px solid #3A1C71">
            <v-card-title>
              <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Modification Procès-verbal</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Numéro sinistre" v-model="adnewObject.sinisterNumber" color="#3A1C71" filled
                    disabled background-color="#4DD0E1"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Nom de l'assuré" v-model="adnewObject.name" color="#3A1C71" filled disabled
                    background-color="#4DD0E1"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Immatriculation assuré" color="#3A1C71" v-model="adnewObject.vehicleRegistration"
                    filled disabled background-color="#4DD0E1"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <v-autocomplete label="Commissariat" color="#3A1C71" filled :items="commissariatNameList"
                    v-model="adnewObject.policeStation"></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Contact Commissariat" v-model="adnewObject.policePhone" color="#3A1C71" filled
                    disabled background-color="#4DD0E1"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-select label="Enquêteur" :items="enquetteurNameList" v-model="adnewObject.Investigator"
                    color="#3A1C71" filled></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Montant pv" color="#3A1C71" filled type="number"
                    v-model="adnewObject.investigatorAmount"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Date enregistrement" color="#3A1C71" type="date" v-model="adnewObject.registerDate"
                    filled></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Date réception pv" color="#3A1C71" filled type="date"
                    v-model="adnewObject.receivedDate"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-select label="Type bénéficiaire" :items="pvGetType" @change="valueChange()"
                    v-model="adnewObject.beneficiaryType" color="#3A1C71" filled></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Nom bénéficiaire" color="#3A1C71" filled v-if="showText"
                    v-model="adnewObject.beneficiaryName"></v-text-field>
                  <v-select v-if="showSelect" label="Nom bénéficiaire" :items="
                    this.isExpert ? enquetteurNameList : victimeNameList
                  " v-model="adnewObject.beneficiaryName" color="#3A1C71" filled></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Numéro pv" color="#3A1C71" filled v-model="adnewObject.pvNumber"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Date impression" color="#3A1C71" v-model="adnewObject.slipPvRequestIsPrintAt"
                    filled disabled background-color="#4DD0E1"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-select label="PV payé" color="#3A1C71" :items="Decision" filled disabled background-color="#4DD0E1"
                    v-model="adnewObject.isPaid"></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Date règlement pv" color="#3A1C71" filled type="date"
                    v-model="adnewObject.settlementDate"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="12">
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
        <v-data-table :headers="headers" :items="PVFiles" :items-per-page="10" class="elevation-0" background-color="red"
          color="#3A1C71" local="fr">
          <template v-slot:item="{ item }">
            <tr @click="handleClick(item)" class="miniTableRow green-bg">
              <td>
                <v-chip :color="getColor(item.status)" dark>
                  {{ item.status == "" ? "En cours" : item.status }}
                </v-chip>
              </td>
              <td>
                {{ item.sinister.sinisterNumber }}
              </td>
              <td>{{ item.sinister.name }}</td>
              <td>{{ item.sinister.sinisterDate }}</td>
              <td>{{ item.sinister.sinisterPlace }}</td>
              <td>{{ item.sinister.vehicleRegistration }}</td>
              <td>{{ item.policeStation ? item.policeStation.name : "" }}</td>
              <td>{{ item.policeStation ? item.policeStation.phone : "" }}</td>
              <td>{{ item.inverstigator ? item.inverstigator.name : "" }}</td>
              <td>{{ item.investigatorAmount }}</td>
              <td>{{ item.registerDate }}</td>
              <td>{{ item.agentName }}</td>
              <td>{{ item.receivedDate }}</td>
              <td>{{ item.pvNumber }}</td>
              <td>{{ item.slipPvRequestIsPrintAt }}</td>
              <td>{{ item.isPaid }}</td>
              <td>{{ item.settlementDate }}</td>
              <td>{{ item.observation }}</td>
            </tr>
          </template>
          <template v-slot:top>
            <v-toolbar class="ml-0 pl-0" flat>
              <v-col cols="12" sm="6" md="2">
                <v-autocomplete label="Commissariat" filled dense outlined flat color="#3A1C71"
                  :items="commissariatNameList" class="mr-0 ml-0 mb-0 mt-7 " v-model="printDoc"></v-autocomplete>
              </v-col>
              <!-- <v-col cols="12" sm="6" md="3">
                <v-select label="Duplicata" color="#3A1C71" :items="['Oui', 'Non']" class="mr-5 ml-0 mb-0 mt-8 "
                  v-model="printDocState" @change="schowElement()"></v-select>
              </v-col> -->
              <v-btn class="mr-2 btnDesign" flat color="#3A1C71" text-color="white" pill @click="genereteDoc('simple')">
                Générer le bordereau de réclamation
                <v-icon class="ml-2" left> mdi-plus-box-multiple </v-icon>
              </v-btn>
              <v-btn class="mr-2 btnDesign" flat color="#3A1C71" text-color="white" pill @click="duplicateFunction()">
                Imprimer duplicata
                <v-icon class="ml-2" left> mdi-plus-box-multiple </v-icon>
              </v-btn>


            </v-toolbar>
          </template>
          <template v-slot:no-data>
            <h4 class="text-h4 mb-4">pas de données</h4>
          </template></v-data-table>
      </div>
    </template>
    <v-dialog transition="dialog-bottom-transition" max-width="500" overlay v-model="signataireChoice">
      <v-card style="border-top:10px solid red">
        <v-card-title>Choisir le signataire du document</v-card-title>
        <v-card-text>
          <div class=" pt-6 ">

            <v-autocomplete outlined
              :items="['La Directrice des Sinistres et Prestations', 'Le Directeur Adjoint des Sinistres et Prestations']"
              color="#3A1C71" class="" prepend-inner-icon="mdi-nature-people" v-model="signataire" dense flat
              background-color="grey lighten-4" label="Signataire">
            </v-autocomplete>

          </div>
        </v-card-text>
        <v-card-actions class="justify-end pb-6">
          <!-- <v-btn text @click="(cancelDialog = false), (cancelModal = {})">Annuler</v-btn> -->
          <v-btn color="success" class="white--text" block @click="generetePdf()">Imprimer le document
          </v-btn>
          <!-- <v-spacer></v-spacer> -->
          <!-- <v-btn color="success" class="white--text" @click="printSimpleFacture('PROFORMA')">Imprimé Facture Proforma
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="duplicateFile" max-width="1000px">
      <v-card style="border-left: 10px solid #3A1C71;">
        <v-card-title>
          <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Duplicata de borderaux {{ printDoc }}</span>
        </v-card-title>
        <v-card-text>

          <v-expansion-panels class="mb-20" flat style="border: 1px solid #3A1C71;margin-bottom:10px">
            <v-expansion-panel class="elevation-0">
              <v-expansion-panel-header>
                Tri / Recherche ...
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field color="#3A1C71" label="Date enregistrement début" class="pt-5 pa-2"
                      prepend-inner-icon="mdi-magnify" v-model="dupplicataStartDate" type="date" filled dense outlined
                      flat background-color="grey lighten-4" rounded></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field color="#3A1C71" label="Date enregistrement fin" class="pt-5 pa-2"
                      prepend-inner-icon="mdi-magnify" v-model="dupplicataEndDate" type="date" filled dense outlined flat
                      background-color="grey lighten-4" rounded></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field color="#3A1C71" label="Numéro sinistre" class="pt-5 pa-2" filled
                      prepend-inner-icon="mdi-magnify" dense v-model="dupplicatasinisterNumber" outlined flat
                      background-color="grey lighten-4" rounded></v-text-field>
                  </v-col>

                </v-row>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#3A1C71" outlined pill rounded @click="duplicataSearch()">
                    <v-icon left>
                      mdi-magnify
                    </v-icon>
                    Appliquer la recherche
                  </v-btn>
                  <v-btn color="error" class="pr-5" outlined pill rounded @click="genereteDoc('duplicata')">
                    <v-icon size="20" class="ml-3 mr-3" color="error" left>
                      mdi-content-duplicate
                    </v-icon>
                    Imprimer duplicata bordereau
                  </v-btn>
                </v-card-actions>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-data-table show-select v-model="selected" :headers="headersDupplicata" item-key="_id"
            :items="PVFilesDuplicata" :items-per-page="10" class="elevation-0 pt-3" background-color="red" color="#3A1C71"
            :loading="loading ? '#3A1C71' : null" local="fr">
            <template v-slot:no-data>
              <h4 class="text-h4 mb-4">pas de données</h4>
            </template></v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
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
import { defaultMethods, messages } from "../utils/data";
import {
  addFileJson,
  // addOperationTypeForm,
  updatePVForm,
  updateVictimeFileForm,
  addVictimeFileForm,
  updateFileForm,
} from "@/api/user.js";
export default {
  name: "pvComponent",

  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: false,
    duplicateFile: false,
    addFileExcel: false,
    addFile: false,
    selected: {},
    sinsiterSelectId: "",
    excelFile: null,
    adnewObject: {},
    signataireChoice: false,
    signataire: "",
    itemSelect: "",
    StartDate: "",
    EndDate: "",
    claimDateStart: "",
    claimDateEnd: "",
    receivedDateStart: "",
    receivedDateEnd: "",
    paymentDateStart: "",
    paymentDateEnd: "",
    fileName: "",
    policeStation: "",
    sinisterNumber: "",
    status: "",
    victimeDialogModal: false,
    selectedDocumentsModal: [],
    commissariatNameList: [],
    enquetteurNameList: [],
    addVictime: false,
    victimesListeData: [],
    victimeFormData: {},
    addNewVictimeFile: false,
    pageCount: 0,
    pageCounts: 0,
    page: 1,
    pages: 1,
    itemsPerPage: 10,
    printDoc: "",
    unlockButton: true,
    civiliteIiems: ["Monsieur", "Madame"],
    Decision: ["Oui", "Non"],
    StatusIiems: ["Non-réclamé", "Réclamé", "Reçu", "Payé"],
    pvGetType: ["Victime", "Commissariat", "Assuré", "Conseil", "Autres ..."],
    showText: true,
    showSelect: false,

    headersDupplicata: [
      {
        text: "Statut",
        width: "100px",
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
        value: "sinisterSinisterNumber",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
      },

      {
        text: "Nom de l'Assuré",
        // divider: true,
        width: "200px",
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "sinisterName",
      },
      // {
      //   text: "Nom victime",
      //   // divider: true,
      //   width: "200px",
      //   // class: "deep-purple darken-4 white--text",
      //   align: "start",
      //   value: "name",
      // },
      {
        text: "Date survenance",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "sinisterSinisterDate",
      },
      {
        text: "Lieu sinistre",
        width: "200px",
        // divider: true,
        // class: "background white--text",
        align: "start",
        value: "sinisterSinisterPlace",
      },
      {
        text: "Immatriculation assuré",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "sinisterVehicleRegistration",
      },

      {
        text: "Commissariat",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "policeStationName",
      },
      {
        text: "Contact Commissariat",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "policeStationPhone",
      },
      {
        text: "Enquêteur",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "inverstigatorName",
      },
      {
        text: "Montant enquêteur",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "investigatorAmount",
      },
      {
        text: "Date enregistrement",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "registerDate",
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
        text: "Date réception pv",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "receivedDate",
      },
      {
        text: "Numéro pv",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "pvNumber",
      },
      {
        text: "Date d'impression",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "slipPvRequestIsPrintAt",
      },
      {
        text: "PV payé",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "isPaid",
      },
      {
        text: "Date règlement pv",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "settlementDate",
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
    headers: [
      {
        text: "Statut",
        width: "100px",
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
      // {
      //   text: "Nom victime",
      //   // divider: true,
      //   width: "200px",
      //   // class: "deep-purple darken-4 white--text",
      //   align: "start",
      //   value: "name",
      // },
      {
        text: "Date survenance",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "sinisterDate",
      },
      {
        text: "Lieu sinistre",
        width: "200px",
        // divider: true,
        // class: "background white--text",
        align: "start",
        value: "sinisterPlace",
      },
      {
        text: "Immatriculation assuré",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "vehicleRegistration",
      },

      {
        text: "Commissariat",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "policeStation",
      },
      {
        text: "Contact Commissariat",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "policePhone",
      },
      {
        text: "Enquêteur",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "Investigator",
      },
      {
        text: "Montant enquêteur",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "investigatorAmount",
      },
      {
        text: "Date enregistrement",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "registerDate",
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
        text: "Date réception pv",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "receivedDate",
      },
      {
        text: "Numéro pv",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "pvNumber",
      },
      {
        text: "Date d'impression",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "slipPvRequestIsPrintAt",
      },
      {
        text: "PV payé",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "isPaid",
      },
      {
        text: "Date règlement pv",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "settlementDate",
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
      "Enquetteur",
      "Commissariat",
      "statFile",
      "PVFilesDuplicata"
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
    Enquetteur() {
      this.enquetteurNameList = defaultMethods.getNameList(this.Enquetteur);
    },
    Commissariat() {
      this.commissariatNameList = defaultMethods.getNameList(this.Commissariat);
    },
    selected() {
      localStorage.setItem("pvSelectData", JSON.stringify(this.selected));
      // alert(JSON.stringify())
    }
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
      "getPvFilesDuplicata"
    ]),
    async duplicataSearch() {
      this.loading = true;
      try {
        await this.getPvFilesDuplicata({
          StartDate: this.dupplicataStartDate,
          EndDate: this.dupplicataEndDate,
          fileName: this.fileName,
          policeStation: defaultMethods.getItemId(
            this.Commissariat,
            this.printDoc
          ),
          sinisterNumber: this.dupplicatasinisterNumber,
        });
        // this.duplicateFile = true
      } catch (error) {
        defaultMethods.dispatchError(
          this.$store,
          messages.failedToLoad("les dossiers")
        );
      }
      this.loading = false;
    },
    async duplicateFunction() {
      // alert("ok")
      this.loading = true;
      try {
        await this.getPvFilesDuplicata({
          StartDate: this.dupplicataStartDate,
          EndDate: this.dupplicataEndDate,
          fileName: this.fileName,
          policeStation: defaultMethods.getItemId(
            this.Commissariat,
            this.printDoc
          ),
          sinisterNumber: this.dupplicatasinisterNumber,
        });
        this.selected = JSON.parse(localStorage.getItem("pvSelectData"))
        this.duplicateFile = true
      } catch (error) {
        defaultMethods.dispatchError(
          this.$store,
          messages.failedToLoad("les dossiers")
        );
      }
      this.loading = false;
    },
    async initFiles() {
      this.loading = true;
      try {
        await this.getPvFiles({
          StartDate: this.StartDate,
          EndDate: this.EndDate,
          claimDateStart: this.claimDateStart,
          claimDateEnd: this.claimDateEnd,
          receivedDateStart: this.receivedDateStart,
          receivedDateEnd: this.receivedDateEnd,
          paymentDateStart: this.paymentDateStart,
          paymentDateEnd: this.paymentDateEnd,
          fileName: this.fileName,
          policeStation: defaultMethods.getItemId(
            this.Commissariat,
            this.policeStation
          ),
          sinisterNumber: this.sinisterNumber,
          statusSearch: this.status,
        });
        await this.getUserProfile();
        await this.getProduct();
        await this.getEnquetteur();
        await this.getCommissariat();
        window.localStorage.removeItem('pvSelectData');
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
    // async genereteDocDuplicate() {
    //   this.loading = true;

    //   // await this.initFiles();
    //   this.loading = false;
    // },
    async generetePdf() {
      this.loading = true;
      if (this.itemSelect === "simple") {
        await this.getDoc({
          id: defaultMethods.getItemId(this.Commissariat, this.printDoc),
          duplicata: false,
          signataire: this.signataire == "La Directrice des Sinistres et Prestations" ? true : "",
        });
        await this.initFiles();
      } else {
        await this.getDoc({
          id: defaultMethods.getItemId(this.Commissariat, this.printDoc),
          duplicata: true,
          ids: defaultMethods.getDocItemsId(this.selected),
        });
        window.localStorage.removeItem('pvSelectData');
      }
      this.loading = false;
    },
    async genereteDoc(item) {
      this.signataireChoice = true
      this.signataire = ""
      this.itemSelect = item
    },
    handleClick(item) {
      // alert(JSON.stringify(item));  
      this.adnewObject.policeStation = item.policeStation
        ? item.policeStation.name
        : "";
      this.adnewObject.policePhone = item.policeStation
        ? item.policeStation.phone
        : "";
      this.adnewObject.Investigator = item.inverstigator
        ? item.inverstigator.name
        : "";
      this.adnewObject.investigatorAmount = item.investigatorAmount;
      this.adnewObject.registerDate = item.registerDate;
      this.adnewObject.receivedDate = item.receivedDate;
      this.adnewObject.isPaid = item.isPaid;
      this.adnewObject.settlementDate = item.settlementDate;
      this.adnewObject.observation = item.observation;
      this.adnewObject.vehicleRegistration = item.sinister.vehicleRegistration;
      this.adnewObject.pvNumber = item.pvNumber;
      this.adnewObject.slipPvRequestIsPrintAt = item.slipPvRequestIsPrintAt;
      this.adnewObject.sinisterNumber = item.sinister.sinisterNumber;
      this.adnewObject.name = item.sinister.name;
      // this.adnewObject.vehicleRegistrations =
      //   item.sinisterVictim.vehicleRegistration;
      this.adnewObject.sinisterID = item.sinister._id;
      // this.adnewObject.sinisterVictimeID = item.sinisterVictim._id;
      this.adnewObject.pvID = item._id;
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
      // alert(item);
      if (item == "Non-réclamé") return "#00b4d8";
      else if (item == "Réclamé") return "#A2C5AC";
      else if (item == "Reçu") return "#38a3a5";
      else if (item == "Payé") return "#29BF12";
      else if (item == "Duplicata") return "#E8985E";
      else return "gray";
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
    valueChange() {
      if (
        this.adnewObject.checkNumber != null &&
        this.adnewObject.Bank != null &&
        this.adnewObject.checkDate != null
      ) {
        // alert(this.adnewObject.checkNumber);
        this.sendToFinance = false;
      }
      if (this.adnewObject.beneficiaryType === "Autres ...") {
        this.showText = true;
        this.showSelect = false;
        // this.adnewObject.beneficiaryName = "";
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
    // async updateFileVictime() {
    //   this.loading = true;
    //   try {
    //     const schema = {
    //       vehicleRegistration: this.adnewObject.vehicleRegistrations,
    //     };
    //     await updateVictimeFileForm({
    //       schema,
    //       id: this.adnewObject.sinisterVictimeID,
    //     });
    //   } catch (error) {
    //     defaultMethods.dispatchError(this.$store);
    //   }
    //   this.loading = false;
    // },
    async addPvFormModal() {
      this.loading = true;
      try {
        const schema = {
          sinister: this.adnewObject.sinisterID,
          policeStation: defaultMethods.getItemId(
            this.Commissariat,
            this.adnewObject.policeStation
          ),
          // policePhone: this.adnewObject.policePhone,
          inverstigator: defaultMethods.getItemId(
            this.Enquetteur,
            this.adnewObject.Investigator
          ),
          pvNumber: this.adnewObject.pvNumber,
          investigatorAmount: this.adnewObject.investigatorAmount,
          registerDate: this.adnewObject.registerDate,
          receivedDate: this.adnewObject.receivedDate,
          isPaid: this.adnewObject.isPaid == "Oui" ? true : false,
          settlementDate: this.adnewObject.settlementDate,
          observation: this.adnewObject.observation,
        };

        if (this.adnewObject.pvID) {
          // update
          // await this.updateFile();
          // await this.updateFileVictime();
          await updatePVForm({
            schema,
            id: this.adnewObject.pvID,
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
