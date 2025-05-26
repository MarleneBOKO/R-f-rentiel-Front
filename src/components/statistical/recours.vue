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
              <v-col cols="12" md="6">
                <v-select :items="statusListe" filled prepend-inner-icon="mdi-magnify" dense class="pt-5 pa-2" outlined
                  flat rounded color="#3A1C71" label="Statut"  v-model="status"></v-select>
              </v-col>
              <v-col cols="12" md="3">

                <v-select label="Type de recours" flat rounded color="#3A1C71" filled prepend-inner-icon="mdi-magnify" dense class="pt-5 pa-2" outlined :items="StatusIiems"
                   v-model="returnType"></v-select>
              </v-col>
  
               <v-col cols="12" md="3">
                <v-select label="Compagnie"  flat rounded color="#3A1C71" filled prepend-inner-icon="mdi-magnify" dense class="pt-5 pa-2" outlined :items="agencyrNameList"
                   v-model="thirdPartyCompanies"></v-select>
              </v-col>       
           <!--   <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date derniere opération début" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="periodStartDate" type="date" filled dense outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col> 
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date derniere opération fin" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="periodEndDate" type="date" filled dense outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>  -->
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date exercice recours début" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="appealExerciseDateStart" type="date" filled dense outlined
                  flat background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date exercice recours fin" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="appealExerciseDateEnd" type="date" filled dense outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date encaiss. / paiem. début" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="collectionDateStart " type="date" filled dense outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date encaiss. / paiem. fin" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="collectionDateEnd" type="date" filled dense outlined flat
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
        <h4 class="text-h4 mt-3 pageTitle ">
          Statistiques Recours
        </h4>
        <!-- <v-divider class="mx-4" inset vertical></v-divider>
        <v-switch v-model="showAllFil" label="Afficher toutes les données" color="#3A1C71"
          @change="showAllFillData"></v-switch> -->
        <v-spacer></v-spacer>
      </v-row>
      <v-row justify="center">
        <v-dialog v-model="addFile" max-width="1000px">
          <v-card style="border-left: 10px solid #3A1C71">
            <v-card-title>
              <span class="text-h5 mb-5 mt-10" style="color:#3A1C71;">Information Assuré</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Numéro sinistre" disabled background-color="#4DD0E1" color="#3A1C71"
                    v-model="adnewObject.sinisterNumber" filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Nom de l'Assuré" disabled background-color="#4DD0E1" v-model="adnewObject.name"
                    color="#3A1C71" filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Conducteur " background-color="#4DD0E1" color="#3A1C71" filled
                    v-model="adnewObject.conductorName"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="N° Police" disabled background-color="#4DD0E1" v-model="adnewObject.policeNumber"
                    color="#3A1C71" filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Marque du véhicule" background-color="#4DD0E1" color="#3A1C71"
                    v-model="adnewObject.vehicleBrand" filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Immatriculation" disabled background-color="#4DD0E1" color="#3A1C71"
                    v-model="adnewObject.registration" filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field label="Taux de responsabilité" color="#3A1C71" filled type="number"
                    v-model="adnewObject.responsibilityRate"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field label="Motif de responsabilité" color="#3A1C71" filled
                    v-model="adnewObject.motifResponsabilteAssure"></v-text-field>
                </v-col>
              </v-row>
              <span class="text-h5 mb-10 mt-5" style="color:#3A1C71;">Information victime</span>
              <v-row class="mt-5">
                <!-- <v-col cols="12" sm="6" md="4">
                                          <v-text-field label="Numéro sinistre" color="#3A1C71" v-model="adnewObject.victimeSinisterNumber"
                                            filled></v-text-field>
                </v-col> -->
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="Nom victime" disabled background-color="#4DD0E1"
                    v-model="adnewObject.victimeFullName" color="#3A1C71" filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field label="Compagnie" color="#3A1C71" filled disabled background-color="#4DD0E1"
                    v-model="adnewObject.victimeAgency"></v-text-field>
                </v-col>
                <!-- <v-col cols="12" sm="6" md="3">
                                          <v-text-field label="Conducteur " color="#3A1C71" filled
                                            v-model="adnewObject.victimeConductorName"></v-text-field>
                                        </v-col> -->
                <!-- <v-col cols="12" sm="6" md="3">
                                          <v-text-field label="N° Police " v-model="adnewObject.victimPoliceNumber" color="#3A1C71"
                                            filled></v-text-field>
                                        </v-col> -->
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Marque du véhicule " disabled background-color="#4DD0E1" color="#3A1C71"
                    v-model="adnewObject.victimeVehicleBrand" filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Immatriculation " disabled background-color="#4DD0E1" color="#3A1C71"
                    v-model="adnewObject.victimeRegistration" filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-text-field label="Taux de responsabilité " disabled background-color="#4DD0E1" color="#3A1C71" filled
                    type="number" v-model="adnewObject.victimeResponsibilityRate"></v-text-field>
                </v-col>

                <!-- <v-col cols="12" sm="12" md="12">
                                          <v-text-field label="Motif de responsabilité" color="#3A1C71" filled
                                            v-model="adnewObject.motifResponsabilteTier"></v-text-field>
                                        </v-col> -->
              </v-row>
              <span class="text-h5 mb-10 mt-5" style="color:#3A1C71;">Information Tiers</span>
              <v-row class="mt-5">
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Numéro sinistre" color="#3A1C71" v-model="adnewObject.victimSinisterNumber"
                    filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Nom victime" v-model="adnewObject.victimFullName" color="#3A1C71"
                    filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Conducteur " color="#3A1C71" filled
                    v-model="adnewObject.victimConductorName"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="N° Police " v-model="adnewObject.victimPoliceNumber" color="#3A1C71"
                    filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Marque du véhicule " color="#3A1C71" v-model="adnewObject.victimVehicleBrand"
                    filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Immatriculation " color="#3A1C71" v-model="adnewObject.victimRegistration"
                    filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="3">
                  <v-text-field label="Taux de responsabilité " color="#3A1C71" filled type="number"
                    v-model="adnewObject.victimResponsibilityRate"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="3">
                  <v-select :items="agencyrNameList" filled label="Compagnie" color="#3A1C71"
                    v-model="adnewObject.thirdPartyCompany"></v-select>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field label="Motif de responsabilité" color="#3A1C71" filled
                    v-model="adnewObject.motifResponsabilteTier"></v-text-field>
                </v-col>
              </v-row>
              <span class="text-h5 mb-10 mt-5" style="color:#3A1C71;">Modification Recours</span>
              <v-row class="mt-5">
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Montant demandé (devis)" color="#3A1C71" filled type="number"
                    v-model="adnewObject.amountRequestQuote"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Montant payé" color="#3A1C71" filled
                    v-model="adnewObject.amountPayed"></v-text-field>
                </v-col>
                <!-- <v-col cols="12" sm="6" md="4">
                                          <v-text-field label="Date payement" color="#3A1C71" filled type="date"
                                            v-model="adnewObject.payedDate"></v-text-field>
                                        </v-col> -->
                <v-col cols="12" sm="6" md="4">
                  <v-select label="Expertise" color="#3A1C71" filled v-model="adnewObject.expertise"
                    :items="Decision"></v-select>
                </v-col>
                <!-- etude offre est devenue date règlement -->
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Date règlement" color="#3A1C71" filled type="date"
                    v-model="adnewObject.studyOffer"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Montant à encaisser" color="#3A1C71" filled @change="valueChange()" type="number"
                    v-model="adnewObject.amountToCollect"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Date exercice recours / réception" color="#3A1C71" filled @change="valueChange()"
                    type="date" v-model="adnewObject.appealExerciseDate"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Date encaissement / paiement" color="#3A1C71" filled @change="valueChange()"
                    type="date" v-model="adnewObject.collectionDate"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Montant encaissé" color="#3A1C71" filled @change="valueChange()" type="number"
                    v-model="adnewObject.amountCollected"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Reste à encaisser" color="#3A1C71" filled disabled background-color="#4DD0E1"
                    type="number" v-model="adnewObject.remainToCollect"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-select label="type de recours " color="#3A1C71" filled :items="StatusIiems"
                    v-model="adnewObject.returnType"></v-select>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <v-select label="Type bénéficiaire" :items="StatusIiemsBeneficiaire" @change="valueChange()"
                    v-model="adnewObject.beneficiaryType" color="#3A1C71" filled></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Béneficiaire recours" color="#3A1C71" filled @change="valueChange()"
                    v-if="showText" v-model="adnewObject.beneficiaryName"></v-text-field>
                  <v-select v-if="showSelect" @change="valueChange()" label="Béneficiaire recours" :items="
                    this.isExpert == 'Expert'
                      ? enquetteurNameList
                      : this.isExpert == 'Victime'
                        ? victimeNameList
                        : this.isExpert == 'Compagnie'
                          ? agencyrNameList
                          : null
                  " v-model="adnewObject.beneficiaryName" color="#3A1C71" filled></v-select>
                </v-col>
                <!-- <v-col cols="12" sm="6" md="3">
                                          <v-select
                                            label="Béneficiaire recours"
                                            color="#3A1C71"
                                            filled
                                            v-model="adnewObject.benificiary"
                                            :items="agencyrNameList"
                                          ></v-select>
                                        </v-col> -->
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Taux d'encaissement" color="#3A1C71" filled disabled background-color="#4DD0E1"
                    type="number" v-model="adnewObject.collectionRate"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Date premier relance" color="#3A1C71" filled @change="valueChange()" type="date"
                    disabled background-color="#4DD0E1" v-model="adnewObject.firstReminderDate"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Date deuxieme relance" color="#3A1C71" filled @change="valueChange()" type="date"
                    disabled background-color="#4DD0E1" v-model="adnewObject.secondReminderDate"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Date troisième relance" color="#3A1C71" filled disabled background-color="#4DD0E1"
                    @change="valueChange()" type="date" v-model="adnewObject.thirdReminderDate"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Montant pénalité" color="#3A1C71" filled type="number"
                    v-model="adnewObject.penaltyAmount"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="12">
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
        <v-data-table :headers="headers" :items="recours" :items-per-page="10" class="elevation-0" background-color="red"
          color="#3A1C71" local="fr">
          <template v-slot:item="{ item }">
            <tr  class="miniTableRow green-bg">
              <!-- <td>
                                                    <v-chip :color="getColor(item.status)" dark>
                                                      {{ item.status }}
                                                    </v-chip>
                                                  </td> -->
              <!-- <td>
                {{ item.actions }}
                <v-menu elevation="0" right offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" class="mr-10">
                      <v-icon color="success" size="30">mdi-forwardburger</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-tooltip bottom color="#a30b37">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="ml-3" icon>
                          <v-icon size="20" @click="handleClick(item)" v-bind="attrs" v-on="on"
                            color="#a30b37">mdi-file-edit-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>Modification recours</span>
                    </v-tooltip>
                    <v-tooltip bottom color="#218380">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="ml-3" icon>
                          <v-icon size="20" @click="genereteDoc(item)" v-bind="attrs" v-on="on"
                            color="#218380">mdi-hospital-box-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>Avis de sinistre</span>
                    </v-tooltip>
                  </v-list>
                </v-menu>
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
          <!-- <template v-slot:top>
            <v-toolbar class="ml-0 pl-0" flat>
              <v-col cols="12" sm="6" md="2">

              <v-btn class="mr-2 btnDesign" :disabled="unlockButton" color="#3A1C71" text-color="white" pill
                @click="genereteDocSecond()">
                Générer le bordereau de réclamation
                <v-icon class="ml-2" left> mdi-plus-box-multiple </v-icon>
              </v-btn>


            </v-toolbar>
          </template> -->
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
          <v-btn color="success" class="white--text" block @click="printDocNow('simple')">Imprimer le document
          </v-btn>
          <!-- <v-spacer></v-spacer> -->
          <!-- <v-btn color="success" class="white--text" @click="printSimpleFacture('PROFORMA')">Imprimé Facture Proforma
          </v-btn> -->
        </v-card-actions>
      </v-card>
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
  updateRecours,
  updateFileForm,
} from "@/api/user.js";
export default {
  name: "recoursComponent",

  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: false,
    addFileExcel: false,
    signataireChoice: false,
    addFile: false,
    agencyrNameList: [],
    itemSelect: {},
    sinsiterSelectId: "",
    excelFile: null,
    adnewObject: {},
    returnType: "",
    showText: true,
    showSelect: false,
    // signataireChoice: false,
    // signataire: "",
    victimeDialogModal: false,
    showAllFil: false,
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
    appealExerciseDateStart: "",
    appealExerciseDateEnd: "",
    periodStartDate: "",
    periodEndDate: "",
    fileName: "",
    sinisterNumber: "",
    status: "",
    victimeNameList: [],
    pages: 1,
    itemsPerPage: 10,
    printDoc: "",
    signataire: "",
    unlockButton: true,
    civiliteIiems: ["Monsieur", "Madame"],
    Decision: ["Oui", "Non"],
    StatusIiemsBeneficiaire: ["Compagnie", "Expert", "Victime", "Autres ..."],
    StatusIiems: ["CIR", "Hors CIR", "Compte Client", "Risque Divers"],
    statusListe: [
      "Toute la base",
      "Recours à encaisser",
      "Réclamations de la période",
      "Prévisions recours",
      "Recours encaissés",
      "Paiements de la période"
    ],
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
      "recours",
      "victimeDocumentListe",
      "victimeListe",
      "UserProfile",
      "productListe",
      "indemnityData",
      "Enquetteur",
      "Commissariat",
      "agency",
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
    Enquetteur() {
      this.enquetteurNameList = defaultMethods.getNameList(this.Enquetteur);
    },
    agency() {
      this.agencyrNameList = defaultMethods.getNameList(this.agency);
    },
    Commissariat() {
      this.commissariatNameList = defaultMethods.getNameList(this.Commissariat);
    },
    victimeListe() {
      this.victimeNameList = defaultMethods.getNameList(this.victimeListe);
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
      "getStatRecour",
      "getVictimesDoc",
      "getUserProfile",
      "getProduct",
      "getVictimes",
      "getEnquetteur",
      "getCommissariat",
      "getDoc",
      "getAgency",
      "getDocAvis",
      "getDocAppeal",
    ]),
    showAllFillData() {
      this.initFiles();
      //alert(this.showAllFil);
    },
    async initFiles() {
      this.loading = true;
      // alert(this.status)
      try {
        await this.getStatRecour({
          status: this.status,
          returnType: this.returnType,
          thirdPartyCompanies:  defaultMethods.getItemId(this.agency, this.thirdPartyCompanies),
          appealExerciseDateStart: this.appealExerciseDateStart,
          appealExerciseDateEnd: this.appealExerciseDateEnd,
          collectionDateStart: this.collectionDateStart,
          collectionDateEnd: this.collectionDateEnd,
          periodStartDate: this.periodStartDate,
          periodEndDate: this.periodEndDate,
        });
        await this.getUserProfile();
        // await this.getProduct();
        // // await this.getVictimes({});
        // await this.getEnquetteur();
        // await this.getCommissariat();
        await this.getAgency();
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

    async genereteDoc(item) {
      this.signataireChoice = true
      this.signataire = ""
      this.itemSelect = item
      // alert(JSON.stringify(item))
    },
    async printDocNow() {
      this.loading = true;

      await this.getDocAvis({
        id: this.itemSelect._id,
        signataire: this.signataire == "La Directrice des Sinistres et Prestations" ? true : "",
      });
      this.loading = false;
    },
    async genereteDocSecond() {
      this.loading = true;
      // alert(JSON.stringify(this.agencyrNameList));
      await this.getDocAppeal({
        id: defaultMethods.getItemId(this.agency, this.printDoc),
        returnType: this.returnType,
      });
      this.loading = false;
    },
    valueChange() {
      // alert(this.adnewObject.firstReminderDate);
      this.adnewObject.collectionRate = Math.round(
        (this.adnewObject.amountCollected / this.adnewObject.amountToCollect) *
        100
      );
      if (this.adnewObject.appealExerciseDate != null) {
        // alert(this.adnewObject.appealExerciseDate);
        var d = new Date(this.adnewObject.appealExerciseDate); // date du jour
        var m = d.getMonth() + 2;
        d.setMonth(m);
        // alert(d.toLocaleDateString("fr"))
        //on vérifie sachant qu'on part de la date actuelle
        // alert(d.toLocaleDateString("en"));
        if (this.adnewObject.firstReminderDate === '') {
          this.adnewObject.firstReminderDate = d
            .toLocaleDateString("fr")
            .split("/")
            .reverse()
            .join("-");
          // alert(this.adnewObject.firstReminderDate);
          m = d.getMonth() + 1;
          d.setMonth(m);
          // alert(d);
        } else {
          console.log("Le champ secondReminderDate n'est pas vide");
        }

        if (this.adnewObject.secondReminderDate === '') {
          this.adnewObject.secondReminderDate = d
            .toLocaleDateString("fr")
            .split("/")
            .reverse()
            .join("-");
          m = d.getMonth() + 1;
          d.setMonth(m);
          // alert(d);

        } else {
          console.log("Le champ secondReminderDate n'est pas vide");
        }

        if (this.adnewObject.thirdReminderDate === '') {
          this.adnewObject.thirdReminderDate = d
            .toLocaleDateString("fr")
            .split("/")
            .reverse()
            .join("-");
        } else {
          console.log("Le champ secondReminderDate n'est pas vide");
        }


      }
      this.adnewObject.remainToCollect =
        this.adnewObject.amountToCollect - this.adnewObject.amountCollected;
      // alert(this.adnewObject.collectionRate);
      if (this.adnewObject.beneficiaryType === "Autres ...") {
        this.showText = true;
        this.showSelect = false;
        // alert(this.showText);
        // this.adnewObject.beneficiaryName = "";
      } else {
        if (this.adnewObject.beneficiaryType == "Expert") {
          // alert(this.adnewObject.beneficiaryType);
          this.isExpert = "Expert";
          this.showText = false;
          this.showSelect = true;
        } else if (this.adnewObject.beneficiaryType == "Victime") {
          // alert(this.adnewObject.beneficiaryType);

          this.isExpert = "Victime";
          this.showText = false;
          this.showSelect = true;
        } else if (this.adnewObject.beneficiaryType == "Compagnie") {
          // alert(this.adnewObject.beneficiaryType);

          this.isExpert = "Compagnie";
          this.showText = false;
          this.showSelect = true;
        }
      }
    },
    handleClick(item) {
      // alert(JSON.stringify(item));
      this.adnewObject.sinisterNumber = item.sinisterVictim.sinister.sinisterNumber;
      this.adnewObject.name = item.sinisterVictim.sinister.name;
      this.adnewObject.conductorName = item.sinisterVictim.sinister.conductorName;
      this.adnewObject.policeNumber = item.sinisterVictim.sinister.policeNumber;
      this.adnewObject.vehicleBrand = item.sinisterVictim.sinister.vehicleBrand;
      this.adnewObject.registration = item.sinisterVictim.sinister.vehicleRegistration;
      this.adnewObject.responsibilityRate = item.responsibilityRate;
      this.adnewObject.victimeFullName = item.sinisterVictim.fullName;
      this.adnewObject.victimeAgency = item.sinisterVictim && item.sinisterVictim.thirdPartyCompany ? item.sinisterVictim.thirdPartyCompany.name : "";
      this.adnewObject.victimePhone = item.sinisterVictim.phone;
      this.adnewObject.victimeVehicleBrand = item.sinisterVictim.vehicleBrand;
      this.adnewObject.victimeRegistration = item.sinisterVictim.vehicleRegistration;
      this.adnewObject.victimeResponsibilityRate = item.sinisterVictim.responsibilityRate;
      // this.adnewObject.victimeSinisterNumber = item.sinisterVictim.sinisterNumber;

      // alert(JSON.stringify(item.sinisterVictim.thirdPartyCompany.name))

      // name: appeal.sinisterVictim.fullName,
      //               conductorName: appeal.victimConductorName,
      //               sinisterNumber: appeal.victimSinisterNumber,
      //               policeNumber: appeal.victimPoliceNumber,
      //               vehicleBrand: appeal.victimVehicleBrand,
      //               registration: appeal.victimRegistration,
      //               responsibilityRate: appeal.victimResponsibilityRate,
      //               motif: appeal.motifResponsabilteTier,  victimFullName



      this.adnewObject.motifResponsabilteTier = item.motifResponsabilteTier;
      this.adnewObject.victimResponsibilityRate = item.victimResponsibilityRate;
      this.adnewObject.victimRegistration = item.victimRegistration;
      this.adnewObject.victimVehicleBrand = item.victimVehicleBrand;
      this.adnewObject.victimPoliceNumber = item.victimPoliceNumber;
      this.adnewObject.victimSinisterNumber = item.victimSinisterNumber;
      this.adnewObject.victimConductorName = item.victimConductorName;
      this.adnewObject.victimFullName = item.victimFullName;
      this.adnewObject.thirdPartyCompany = item.thirdPartyCompany ? item.thirdPartyCompany.name : "";
      this.adnewObject.agentName = item.agentName;
      this.adnewObject.motifResponsabilteAssure = item.motifResponsabilteAssure;
      this.adnewObject.motifResponsabilteTier = item.motifResponsabilteTier;
      this.adnewObject.amountRequestQuote = item.amountRequestQuote;
      this.adnewObject.amountPayed = item.amountPayed;
      this.adnewObject.expertise = item.expertise;
      this.adnewObject.studyOffer = item.studyOffer;
      this.adnewObject.amountToCollect = item.amountToCollect;
      this.adnewObject.appealExerciseDate = item.appealExerciseDate;
      this.adnewObject.collectionDate = item.collectionDate;
      this.adnewObject.amountCollected = item.amountCollected;
      this.adnewObject.remainToCollect = item.remainToCollect;
      this.adnewObject.returnType = item.returnType;
      this.adnewObject.responsibilityRate = item.responsibilityRate;
      this.adnewObject.beneficiaryType = item.beneficiaryType;
      this.adnewObject.beneficiaryName = item.beneficiaryName;
      // this.adnewObject.benificiaryId = item.benificiaryId;
      this.adnewObject.collectionRate = item.collectionRate;
      this.adnewObject.firstReminderDate = item.firstReminderDate;
      this.adnewObject.secondReminderDate = item.secondReminderDate;
      this.adnewObject.thirdReminderDate = item.thirdReminderDate;
      this.adnewObject.penaltyAmount = item.penaltyAmount;
      this.adnewObject.observation = item.observation;
      // this.adnewObject.studyOffer = ;
      this.adnewObject.sinsterVictimeID = item.sinisterVictim._id;
      this.adnewObject.recoureId = item._id;
      this.adnewObject.sinisterID = item.sinister._id;
      this.valueChange();
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

    async updateFileVictime() {
      this.loading = true;
      try {
        const schema = {
          sinisterNumber: this.adnewObject.sinisterNumber,
          name: this.adnewObject.name,
          conductorName: this.adnewObject.conductorName,
          policeNumber: this.adnewObject.policeNumber,
          vehicleBrand: this.adnewObject.vehicleBrand,
          registration: this.adnewObject.registration,
          // fullName: this.adnewObject.fullName,
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
    async addPvFormModal() {
      this.loading = true;
      // alert(JSON.stringify(this.adnewObject.beneficiaryName));
      try {
        const schema = {
          // policeStation: defaultMethods.getItemId(
          //   this.Commissariat,
          //   this.adnewObject.policeStation
          // ),
          sinisterVictim: this.adnewObject.sinsterVictimeID,
          // studyOffer: this.adnewObject.studyOffer,
          amountRequestQuote: this.adnewObject.amountRequestQuote,

          victimSinisterNumber: this.adnewObject.victimSinisterNumber,
          victimFullName: this.adnewObject.victimFullName,
          victimConductorName: this.adnewObject.victimConductorName,
          victimPoliceNumber: this.adnewObject.victimPoliceNumber,
          victimVehicleBrand: this.adnewObject.victimVehicleBrand,
          victimRegistration: this.adnewObject.victimRegistration,
          motifResponsabilteAssure: this.adnewObject.motifResponsabilteAssure,
          motifResponsabilteTier: this.adnewObject.motifResponsabilteTier,
          victimResponsibilityRate: this.adnewObject.victimResponsibilityRate,
          thirdPartyCompany: defaultMethods.getItemId(
            this.agency,
            this.adnewObject.thirdPartyCompany
          ),


          amountPayed: this.adnewObject.amountPayed,
          expertise: this.adnewObject.expertise,
          studyOffer: this.adnewObject.studyOffer,
          amountToCollect: Number(this.adnewObject.amountToCollect),
          appealExerciseDate: this.adnewObject.appealExerciseDate,
          collectionDate: this.adnewObject.collectionDate,
          amountCollected: Number(this.adnewObject.amountCollected),
          remainToCollect: Number(this.adnewObject.remainToCollect),
          // expertise: this.adnewObject.expertise =="Oui" ? true : false,
          returnType: this.adnewObject.returnType,
          responsibilityRate: this.adnewObject.responsibilityRate,
          beneficiaryType: this.adnewObject.beneficiaryType,

          beneficiaryName: this.adnewObject.beneficiaryName,
          // benificiaryId: this.adnewObject.benificiaryId,
          collectionRate: this.adnewObject.collectionRate
            ? this.adnewObject.collectionRate
            : 0,
          firstReminderDate: this.adnewObject.firstReminderDate,
          secondReminderDate: this.adnewObject.secondReminderDate,
          thirdReminderDate: this.adnewObject.thirdReminderDate,
          penaltyAmount: this.adnewObject.penaltyAmount,
          observation: this.adnewObject.observation,
        };

        if (this.adnewObject.recoureId) {
          await updateRecours({
            schema,
            id: this.adnewObject.recoureId,
          });
          this.updateFileVictime();
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
