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
                <v-text-field color="#3A1C71" label="Date derniere opération début" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="periodStartDate" type="date" filled dense outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date derniere opération fin" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="periodEndDate" type="date" filled dense outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
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
                <v-text-field color="#3A1C71" label="Nom assuré" class="pt-5 pa-2" filled prepend-inner-icon="mdi-magnify"
                  dense v-model="fileName" outlined flat background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Numéro sinistre" class="pt-5 pa-2" filled
                  prepend-inner-icon="mdi-magnify" dense v-model="sinisterNumber" outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-select :items="statusListe" filled prepend-inner-icon="mdi-magnify" dense class="pt-5 pa-2" outlined
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
        <h4 class="text-h4 mt-3 pageTitle ">
          Listing des Recours
        </h4>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-switch v-model="showAllFil" label="Afficher toutes les données" color="#3A1C71"
          @change="showAllFillData"></v-switch>
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
                  <v-select :items="agencyrNameList" filled label="Compagnie Tier" color="#3A1C71"
                    v-model="adnewObject.thirdPartyCompany" @change="valueChange()"></v-select>



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
                  <v-text-field label="Date règlement" color="#3A1C71" filled type="date"  @change="valueChange()"
                    v-model="adnewObject.studyOffer"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Montant à encaisser" color="#3A1C71" filled @change="valueChange()" type="number"
                    v-model="adnewObject.amountToCollect"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Date exercice recours / réception" color="#3A1C71" filled  @change="onExerciseDateChange()"
                    type="date" v-model="adnewObject.appealExerciseDate"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Date encaissement / payement" color="#3A1C71" filled 
                    type="date" v-model="adnewObject.collectionDate"   :value="adnewObject.collectionDate|| 'Aucun paiement'"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Montant encaissé" color="#3A1C71" filled  type="number"
                    v-model="adnewObject.amountCollected"></v-text-field>
                </v-col>
               
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Reste à encaisser" color="#3A1C71" @change="valueChange()" filled disabled background-color="#4DD0E1"
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
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Taux d'encaissement" color="#3A1C71" filled disabled background-color="#4DD0E1"
                    type="number" v-model="adnewObject.collectionRate"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Date premier relance" color="#3A1C71" filled @change="valueChange()" type="date"
                    disabled background-color="#4DD0E1" v-model="adnewObject.firstReminderDate"></v-text-field>
                </v-col>
                 <template v-slot:append>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" color="info">mdi-information</v-icon>
          </template>
          <span>Calculée automatiquement : +2 mois après date exercice</span>
        </v-tooltip>
      </template>
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
              <v-expansion-panels v-if="$store.state.debug" class="mt-5">
  <v-expansion-panel>
    <v-expansion-panel-header>Debug - Dates et Notifications</v-expansion-panel-header>
    
  </v-expansion-panel>
</v-expansion-panels>
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
            <tr @click="handleClick(item)" class="miniTableRow green-bg">
              <!-- <td>
                                                    <v-chip :color="getColor(item.status)" dark>
                                                      {{ item.status }}
                                                    </v-chip>
                                                  </td> -->
              <td>
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
              </td>
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
          <template v-slot:top>
            <v-toolbar class="ml-0 pl-0" flat>
              <v-col cols="12" sm="6" md="2">
                <v-autocomplete label="Compagnie" color="#3A1C71" filled dense outlined flat :items="agencyrNameList"
                  class="mr-5 ml-0 mb-0 mt-8 " v-model="printDoc"></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-autocomplete label="Type de recours" filled dense outlined flat color="#3A1C71" :items="StatusIiems"
                  class="mr-5 ml-0 mb-0 mt-8 " v-model="returnType" @change="schowElement()"></v-autocomplete>
              </v-col>
              <v-btn class="mr-2 btnDesign" :disabled="unlockButton" color="#3A1C71" text-color="white" pill
                @click="genereteDocSecond()">
                Générer le bordereau de réclamation
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
import { defaultMethods, messages } from "../utils/data";
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
    adnewObject: {
        payments: [], // Initialiser payments en tant que tableau vide
      amountCollected: 0, // Initialiser les autres propriétés si nécessaire
      amountPayed: 0,
      amountRequestQuote: 0,
      amountToCollect: 0,
      appealExerciseDate: null,
      beneficiaryName: "",
      beneficiaryType: "",
      collectionDate: null,
      collectionRate: "0.00",
      expertise: "",
      firstReminderDate: null,
      motifResponsabilteAssure: "",
      motifResponsabilteTier: "",
      observation: "",
      penaltyAmount: 0,
      remainToCollect: 0,
      responsibilityRate: 0,
      returnType: "",
      secondReminderDate: null,
      sinisterVictim: null,
      studyOffer: null,
      thirdPartyCompany: null,
      thirdReminderDate: null,
      victimConductorName: "",
      victimFullName: "",
      victimPoliceNumber: null,
      victimRegistration: "",
      victimResponsibilityRate: 0,
      victimSinisterNumber: "",
      victimVehicleBrand: "",
    },
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
      "Recours à encaisser",
      "Réclamation de la période",
      "Prévision recours",
      "Recours encaissé",
      "Paiement de la période",
       "Paiement partiel",
    ],
    headers: [
      {
        text: "Actions",
        align: "left",
        value: "actions",
        sortable: false,
        width: "100px",
      },
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

 /*remainingToCollect() {
      if (!this.adnewObject || !this.adnewObject.remainToCollect) {
        return 0; // Ou une autre valeur par défaut
      }

      const amountToCollect = this.adnewObject.remainToCollect;

      if (!this.adnewObject.payments || this.adnewObject.payments.length === 0) {
        return amountToCollect; // Aucun paiement pour l'instant, donc le montant restant est le montant total
      }

      const totalPayments = this.adnewObject.payments.reduce((sum, payment) => {
        let paymentAmountValue = 0; // Initialiser avec une valeur par défaut
        if (payment && payment.paymentAmount !== null && payment.paymentAmount !== undefined) {
          paymentAmountValue = payment.paymentAmount;
        }
        return sum + paymentAmountValue;
      }, 0);
      return amountToCollect - totalPayments;
    },*/


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
      "getRecour",  
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
      "getParametreRecoursFromBackend",
    ]),
    showAllFillData() {
      this.initFiles();
      //alert(this.showAllFil);
    },



    
        async initFiles() {
          this.loading = true;
          // alert(this.status)
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
            });
            await this.getUserProfile();
            await this.getProduct();
            // await this.getVictimes({});
            await this.getEnquetteur();
            await this.getCommissariat();
            await this.getAgency();
          } catch (error) {
            defaultMethods.dispatchError(
              this.$store,
              messages.failedToLoad("les dossiers")
            );
          }
          this.loading = false;
        },
   
   
   
        async getParametreRecoursFromBackend() {
          try {
            const response = await this.$store.dispatch("getParametreRecours");
            return response || { joursEntreRelances: 30, nombreRelanceAvantPenalite: 3, tauxPenalite: 3 };
          } catch (err) {
            console.error("Erreur chargement paramètres recours:", err);
            return { joursEntreRelances: 30, nombreRelanceAvantPenalite: 3, tauxPenalite: 3 };
          }
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
    handleCompanyChange(value) {
    // Si value est un objet, extraire l'ID
    if (value && typeof value === 'object' && value._id) {
      this.adnewObject.thirdPartyCompany = value._id;
    }
    console.log("Compagnie sélectionnée:", this.adnewObject.thirdPartyCompany);
  },
  
  // Assurez-vous que cette méthode est appelée lorsque vous chargez les données
  normalizeData() {
    // Assurez-vous que thirdPartyCompany est au bon format
    if (this.adnewObject && this.adnewObject.thirdPartyCompany) {
      // Si c'est un objet, extrayez l'ID
      if (typeof this.adnewObject.thirdPartyCompany === 'object' && this.adnewObject.thirdPartyCompany._id) {
        this.adnewObject.thirdPartyCompany = this.adnewObject.thirdPartyCompany._id;
      }
    }
  },
    /*valueChange() {
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


      const amountToCollect = Number(this.adnewObject.amountToCollect) || 0;
  const amountCollected = Number(this.adnewObject.amountCollected) || 0;
  this.adnewObject.remainToCollect = amountToCollect - amountCollected;
  
  // Calculer le taux d'encaissement
  if (amountToCollect > 0) {
    this.adnewObject.collectionRate = ((amountCollected / amountToCollect) * 100).toFixed(2);
  } else {
    this.adnewObject.collectionRate = 0;
  }
  
  // Si la date de règlement est renseignée, supprimer les notifications pour ce dossier
 if (this.adnewObject.studyOffer) {
    this.removeNotificationsForDossier(this.adnewObject.recoureId);
  }
    }*/

// Méthode valueChange() - SEULEMENT pour les calculs, PAS pour ajouter des paiements
valueChange() {
  // Gestion des dates de rappel
  if (this.adnewObject.appealExerciseDate != null) {
    var d = new Date(this.adnewObject.appealExerciseDate);
    var m = d.getMonth() + 2;
    d.setMonth(m);

    if (this.adnewObject.firstReminderDate === '') {
      this.adnewObject.firstReminderDate = d
        .toLocaleDateString("fr")
        .split("/")
        .reverse()
        .join("-");
      m = d.getMonth() + 1;
      d.setMonth(m);
    }

    if (this.adnewObject.secondReminderDate === '') {
      this.adnewObject.secondReminderDate = d
        .toLocaleDateString("fr")
        .split("/")
        .reverse()
        .join("-");
      m = d.getMonth() + 1;
      d.setMonth(m);
    }

    if (this.adnewObject.thirdReminderDate === '') {
      this.adnewObject.thirdReminderDate = d
        .toLocaleDateString("fr")
        .split("/")
        .reverse()
        .join("-");
    }
  }

  // SEULEMENT calculer le reste à encaisser basé sur les paiements existants
  this.calculateTotals();

  // Gestion de l'affichage selon le type de bénéficiaire
  this.handleBeneficiaryTypeChange();
  
  // S'assurer que la compagnie reste affichée
  this.ensureCompanyDisplay();
},

// Méthode pour calculer les totaux
calculateTotals() {
  const amountToCollect = Number(this.adnewObject.amountToCollect) || 0;
  
  // Initialiser le tableau des paiements s'il n'existe pas
  if (!this.adnewObject.payments) {
    this.adnewObject.payments = [];
  }
  
  // Calculer le total des paiements existants
  const totalPayments = this.adnewObject.payments.reduce((sum, payment) => {
    return sum + (Number(payment.paymentAmount) || 0);
  }, 0);

  // Calculer le reste à encaisser
  this.adnewObject.remainToCollect = amountToCollect - totalPayments;

  // Calculer le taux de recouvrement
  this.adnewObject.collectionRate =  Math.round((totalPayments / amountToCollect) * 100)


},

// Nouvelle méthode pour gérer les changements de type de bénéficiaire
handleBeneficiaryTypeChange() {
  if (this.adnewObject.beneficiaryType === "Autres ...") {
    this.showText = true;
    this.showSelect = false;
  } else {
    this.showText = false;
    this.showSelect = true;
    
    // Définir le type d'expert selon la sélection
    switch(this.adnewObject.beneficiaryType) {
      case "Expert":
        this.isExpert = "Expert";
        break;
      case "Victime":
        this.isExpert = "Victime";
        break;
      case "Compagnie":
        this.isExpert = "Compagnie";
        break;
      default:
        this.isExpert = null;
    }
  }
},

// Nouvelle méthode pour s'assurer que la compagnie s'affiche correctement
ensureCompanyDisplay() {
  // Vérifier si thirdPartyCompany existe et l'afficher
  if (this.adnewObject.thirdPartyCompany) {
    console.log('Compagnie détectée:', this.adnewObject.thirdPartyCompany);
    
    // S'assurer que la compagnie est dans le bon format pour l'affichage
    if (typeof this.adnewObject.thirdPartyCompany === 'object' && this.adnewObject.thirdPartyCompany._id) {
      // Si c'est un objet, s'assurer qu'il a les propriétés nécessaires pour l'affichage
      console.log('Compagnie (objet):', {
        id: this.adnewObject.thirdPartyCompany._id,
        name: this.adnewObject.thirdPartyCompany.name || this.adnewObject.thirdPartyCompany.companyName,
      });
    } else if (typeof this.adnewObject.thirdPartyCompany === 'string') {
      console.log('Compagnie (ID):', this.adnewObject.thirdPartyCompany);
   
    }
  } else {
    console.log('Aucune compagnie sélectionnée');
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
    // Nettoyage doublons paiements
this.adnewObject.payments = (item.payments || []).filter(
  (payment, index, self) =>
    index === self.findIndex(p =>
      p.paymentAmount === payment.paymentAmount &&
      p.paymentDate === payment.paymentDate
    )
);





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
      //this.adnewObject.thirdPartyCompany = item.thirdPartyCompany ? item.thirdPartyCompany.name : "";
 this.adnewObject.thirdPartyCompany = item.thirdPartyCompany || null;


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
      this.calculateTotals();

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
  // 1. Méthode améliorée pour gérer les objets Vue réactifs
validateAndGetCompanyId() {
  console.log('=== VALIDATION COMPANY ID ===');
  
  // Vérifier si on a une valeur
  if (!this.adnewObject.thirdPartyCompany) {
    console.log('Aucune compagnie sélectionnée');
    return null;
  }
  
  // Vérifier si la liste des agences est chargée
  if (!this.agency || !Array.isArray(this.agency) || this.agency.length === 0) {
    console.error('Liste des agences non chargée ou vide');
    return this.adnewObject.thirdPartyCompany;
  }
  
  // Si c'est déjà un ID (string), vérifier s'il existe dans la liste
  if (typeof this.adnewObject.thirdPartyCompany === 'string') {
    const foundItem = this.agency.find(item => item._id === this.adnewObject.thirdPartyCompany);
    if (foundItem) {
      console.log('ID trouvé dans la liste. Nom:', foundItem.name);
      console.log('ID retourné:', this.adnewObject.thirdPartyCompany);
      
      // Retourner directement l'ID string, pas l'objet
      return this.adnewObject.thirdPartyCompany;
    } else {
      console.warn('ID non trouvé dans la liste locale:', this.adnewObject.thirdPartyCompany);
      return this.adnewObject.thirdPartyCompany;
    }
  }
  
  // Si c'est un objet, extraire l'ID
  if (typeof this.adnewObject.thirdPartyCompany === 'object') {
    console.log('Objet détecté, extraction de l\'ID');
    return this.adnewObject.thirdPartyCompany._id;
  }
  
  // Fallback
  return this.adnewObject.thirdPartyCompany;
},

// 2. Fonction utilitaire pour éviter les objets Vue réactifs
getPlainObject(obj) {
  if (!obj) return null;
  
  // Si c'est déjà une string (ID), la retourner
  if (typeof obj === 'string') return obj;
  
  // Si c'est un objet, créer une copie plain
  if (typeof obj === 'object') {
    return JSON.parse(JSON.stringify(obj));
  }
  
  return obj;
},

async addPvFormModal() {
  this.loading = true;

  try {
    // Obtenir l'ID de la compagnie
    let companyId = null;
    if (this.adnewObject.thirdPartyCompany) {
      if (typeof this.adnewObject.thirdPartyCompany === 'string') {
        companyId = this.adnewObject.thirdPartyCompany;
      } else if (typeof this.adnewObject.thirdPartyCompany === 'object') {
        companyId = this.adnewObject.thirdPartyCompany._id;
      }
    }

    // Initialiser le tableau des paiements s'il n'existe pas
    if (!this.adnewObject.payments) {
      this.adnewObject.payments = [];
    }

    const remainToCollect = Number(this.adnewObject.remainToCollect || 0);

    const currentPaymentAmount = Number(this.adnewObject.amountCollected) || 0;
    const currentPaymentDate = this.adnewObject.collectionDate;

    // ✅ Si reste à collecter > 0, on ajoute le paiement
    if (remainToCollect > 0 && currentPaymentAmount > 0 && currentPaymentDate) {
      const isAlreadyInList = this.adnewObject.payments.some(p =>
        Number(p.paymentAmount) === currentPaymentAmount &&
        p.paymentDate === currentPaymentDate
      );

      if (!isAlreadyInList) {
        this.adnewObject.payments.push({
          paymentAmount: currentPaymentAmount,
          paymentDate: currentPaymentDate,
          createdBy: this.currentUserId
        });

        console.log('Nouveau paiement ajouté:', {
          paymentAmount: currentPaymentAmount,
          paymentDate: currentPaymentDate
        });
      } else {
        console.log('Paiement déjà existant, pas d\'ajout');
      }

      // ✅ Recalculer les totaux seulement si paiement ajouté
      this.calculateTotals();
    } else if (remainToCollect <= 0) {
      console.log("Tout a été payé, pas d'ajout de paiement ni de recalcul.");
    }

 
    // ⚙️ Gestion relance pour NSIA
    if (
      this.adnewObject.appealExerciseDate &&
      !this.adnewObject.collectionDate &&
      this.adnewObject.beneficiaryName?.toUpperCase().includes("NSIA")
    ) {
      const param = await this.getParametreRecoursFromBackend();
      const exerciseDate = new Date(this.adnewObject.appealExerciseDate);
      const today = new Date();
      const diffDays = Math.floor((today - exerciseDate) / (1000 * 60 * 60 * 24));

      if (diffDays > (param.nombreRelanceAvantPenalite * param.joursEntreRelances)) {
        const penalty = (param.tauxPenalite / 100) * Number(this.adnewObject.amountToCollect || 0);
        this.adnewObject.penaltyAmount = penalty.toFixed(2);
      } else {
        this.adnewObject.penaltyAmount = 0;
      }

      const interval = param.joursEntreRelances || 30;
      const baseDate = new Date(this.adnewObject.appealExerciseDate);
      this.adnewObject.firstReminderDate = this.addDays(baseDate, interval * 2);
      this.adnewObject.secondReminderDate = this.addDays(baseDate, interval * 3);
      this.adnewObject.thirdReminderDate = this.addDays(baseDate, interval * 4);
    } else {
      this.adnewObject.firstReminderDate = null;
      this.adnewObject.secondReminderDate = null;
      this.adnewObject.thirdReminderDate = null;
      this.adnewObject.penaltyAmount = 0;
    }

    // Nettoyer les _id des paiements avant envoi
    const cleanedPayments = this.adnewObject.payments.map(p => {
      const copy = { ...p };
      delete copy._id;
      copy.createdBy = this.currentUserId;
      return copy;
    });

    // Préparation du schéma
    const schema = {
      sinisterVictim: this.adnewObject.sinsterVictimeID,
        amountRequestQuote: this.adnewObject.amountRequestQuote ? Number(this.adnewObject.amountRequestQuote) : null,
      victimSinisterNumber: this.adnewObject.victimSinisterNumber,
      victimFullName: this.adnewObject.victimFullName,
      victimConductorName: this.adnewObject.victimConductorName,
      victimPoliceNumber: this.adnewObject.victimPoliceNumber,
      victimVehicleBrand: this.adnewObject.victimVehicleBrand,
      victimRegistration: this.adnewObject.victimRegistration,
      motifResponsabilteAssure: this.adnewObject.motifResponsabilteAssure,
      motifResponsabilteTier: this.adnewObject.motifResponsabilteTier,
      victimResponsibilityRate: this.adnewObject.victimResponsibilityRate,
      thirdPartyCompany: companyId,
      amountPayed: this.adnewObject.amountPayed,
      expertise: this.adnewObject.expertise,
      studyOffer: this.adnewObject.studyOffer,
      amountToCollect: Number(this.adnewObject.amountToCollect),
      appealExerciseDate: this.adnewObject.appealExerciseDate,
      collectionDate: this.adnewObject.collectionDate,
      amountCollected: Number(this.adnewObject.amountCollected),
      payments: cleanedPayments,
      remainToCollect: Number(this.adnewObject.remainToCollect),
      returnType: this.adnewObject.returnType,
      responsibilityRate: this.adnewObject.responsibilityRate,
      beneficiaryType: this.adnewObject.beneficiaryType,
      beneficiaryName: this.adnewObject.beneficiaryName,
      collectionRate: this.adnewObject.collectionRate ? this.adnewObject.collectionRate : 0,
      firstReminderDate: this.adnewObject.firstReminderDate,
      secondReminderDate: this.adnewObject.secondReminderDate,
      thirdReminderDate: this.adnewObject.thirdReminderDate,
      penaltyAmount: this.adnewObject.penaltyAmount,
      observation: this.adnewObject.observation,
    };

    if (this.adnewObject.recoureId) {
      await updateRecours({ schema, id: this.adnewObject.recoureId });
      console.log('Recours mis à jour avec succès.');
    } else {
      console.log('Création d\'un nouveau recours');
    }

    this.dialog = false;
    this.initFiles();

  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du recours:', error);
    const errorMessage = error?.response?.data?.error || error?.message || "Erreur inconnue.";
    this.$toast.error(errorMessage);
  } finally {
    this.loading = false;
  }
},





// 4. Méthode pour initialiser correctement les données
initializeAdnewObject(data = {}) {
  this.adnewObject = {
    sinsterVictimeID: data.sinsterVictimeID || null,
    amountRequestQuote: data.amountRequestQuote || 0,
    victimSinisterNumber: data.victimSinisterNumber || '',
    victimFullName: data.victimFullName || '',
    victimConductorName: data.victimConductorName || '',
    victimPoliceNumber: data.victimPoliceNumber || '',
    victimVehicleBrand: data.victimVehicleBrand || '',
    victimRegistration: data.victimRegistration || '',
    motifResponsabilteAssure: data.motifResponsabilteAssure || '',
    motifResponsabilteTier: data.motifResponsabilteTier || '',
    victimResponsibilityRate: data.victimResponsibilityRate || 0,
    

    
    // S'assurer que thirdPartyCompany est bien un ID
    thirdPartyCompany: this.extractId(data.thirdPartyCompany),
    
    amountPayed: data.amountPayed || 0,
    expertise: data.expertise || null,
    studyOffer: data.studyOffer || null,
    amountToCollect: data.amountToCollect || 0,
    appealExerciseDate: data.appealExerciseDate || null,
    collectionDate: data.collectionDate || null,
    amountCollected: data.amountCollected || 0,
    remainToCollect: data.remainToCollect || 0,
    returnType: data.returnType || '',
    responsibilityRate: data.responsibilityRate || 0,
    beneficiaryType: data.beneficiaryType || '',
    beneficiaryName: data.beneficiaryName || '',
    collectionRate: data.collectionRate || 0,
    firstReminderDate: data.firstReminderDate || null,
    secondReminderDate: data.secondReminderDate || null,
    thirdReminderDate: data.thirdReminderDate || null,
    penaltyAmount: data.penaltyAmount || 0,
    observation: data.observation || '',
    recoureId: data.recoureId || null,
  };
},

// 5. Fonction utilitaire pour extraire l'ID
extractId(value) {
  if (!value) return null;
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value._id) return value._id;
  return null;
},

// 6. Computed property pour le v-select
computed: {
  selectedThirdPartyCompany: {
    get() {
      return this.extractId(this.adnewObject?.thirdPartyCompany);
    },
    
    set(value) {
      if (!this.adnewObject) {
        this.adnewObject = {};
      }
      this.$set(this.adnewObject, 'thirdPartyCompany', value);
      console.log('Nouvelle compagnie sélectionnée:', value);
    }
  }
},

// 7. Pour déboguer davantage
debugCompanySelection() {
  console.log('=== DEBUG DÉTAILLÉ ===');
  console.log('1. adnewObject.thirdPartyCompany:', this.adnewObject.thirdPartyCompany);
  console.log('2. Type:', typeof this.adnewObject.thirdPartyCompany);
  
  if (this.agency && this.adnewObject.thirdPartyCompany) {
    const searchId = this.extractId(this.adnewObject.thirdPartyCompany);
    console.log('3. ID à rechercher:', searchId);
    
    const foundItem = this.agency.find(item => item._id === searchId);
    console.log('4. Item trouvé (objet complet):', foundItem);
    
    if (foundItem) {
      console.log('5. Nom de la compagnie:', foundItem.name);
      console.log('6. ID de la compagnie:', foundItem._id);
    }
  }
},



calculateReminderDates(exerciseDate) {
  if (!exerciseDate) {
    return {
      firstReminderDate: null,
      secondReminderDate: null,
      thirdReminderDate: null
    };
  }

  const baseDate = new Date(exerciseDate);
  
  // Premier relance : +2 mois
  const firstReminder = new Date(baseDate);
  firstReminder.setMonth(firstReminder.getMonth() + 2);
  
  // Deuxième relance : +3 mois
  const secondReminder = new Date(baseDate);
  secondReminder.setMonth(secondReminder.getMonth() + 3);
  
  // Troisième relance : +4 mois
  const thirdReminder = new Date(baseDate);
  thirdReminder.setMonth(thirdReminder.getMonth() + 4);
  
  return {
    firstReminderDate: firstReminder.toISOString().split('T')[0],
    secondReminderDate: secondReminder.toISOString().split('T')[0],
    thirdReminderDate: thirdReminder.toISOString().split('T')[0]
  };
},


// 2. Méthode déclenchée quand la date d'exercice change
/*onExerciseDateChange() {
  console.log('Date exercice changée:', this.adnewObject.appealExerciseDate);
  
  if (this.adnewObject.appealExerciseDate) {
    const reminderDates = this.calculateReminderDates(this.adnewObject.appealExerciseDate);
    
    // Mettre à jour les dates de relance automatiquement
    this.adnewObject.firstReminderDate = reminderDates.firstReminderDate;
    this.adnewObject.secondReminderDate = reminderDates.secondReminderDate;
    this.adnewObject.thirdReminderDate = reminderDates.thirdReminderDate;
    console.log('Dates de relance calculées:', reminderDates);
  } else {
    // Si pas de date d'exercice, vider les dates de relance
    this.adnewObject.firstReminderDate = null;
    this.adnewObject.secondReminderDate = null;
    this.adnewObject.thirdReminderDate = null;
  }
  
  // Recalculer les autres valeurs si nécessaire
  this.valueChange();
},*/

addDays(date, days) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate.toISOString().split("T")[0];
},


async onExerciseDateChange() {
  const beneficiary = this.adnewObject.beneficiaryName;

  if (beneficiary && beneficiary.toUpperCase().includes("NSIA Assurances")) {
    const param = await this.getParametreRecoursFromBackend();

    const baseDate = new Date(this.adnewObject.appealExerciseDate);
    const interval = param.joursEntreRelances || 30;

    this.adnewObject.firstReminderDate = this.addDays(baseDate, interval * 2); // 60 jours
    this.adnewObject.secondReminderDate = this.addDays(baseDate, interval * 3); // 90 jours
    this.adnewObject.thirdReminderDate = this.addDays(baseDate, interval * 4); // 120 jours
  } else {
    this.adnewObject.firstReminderDate = null;
    this.adnewObject.secondReminderDate = null;
    this.adnewObject.thirdReminderDate = null;
  }
},


checkPendingNotifications() {
  const today = new Date().toISOString().split('T')[0];
  const notifications = [];

  this.files.forEach(file => {
    if (!file.studyOffer || file.studyOffer === '') {
      const thirdReminderDate = file.thirdReminderDate;
      console.log('ok', file)
      // 1ère relance
      if (file.firstReminderDate && file.firstReminderDate <= today) {
        notifications.push({
          type: 'first_reminder',
          message: `Première relance due pour le dossier ${file.victimSinisterNumber || file.id}`,
          dossier: file,
          date: file.firstReminderDate
        });
      }

      // 2ème relance
      if (file.secondReminderDate && file.secondReminderDate <= today) {
        notifications.push({
          type: 'second_reminder',
          message: `Deuxième relance due pour le dossier ${file.victimSinisterNumber || file.id}`,
          dossier: file,
          date: file.secondReminderDate
        });
      }

      // 3ème relance
      if (thirdReminderDate && thirdReminderDate <= today) {
        notifications.push({
          type: 'third_reminder',
          message: `Troisième relance due pour le dossier ${file.victimSinisterNumber || file.id}`,
          dossier: file,
          date: thirdReminderDate
        });

        // 🔁 Relance périodique après la 3ème, tous les 30 jours
        const baseDate = new Date(thirdReminderDate);
        const todayDate = new Date(today);
        const timeDiff = todayDate - baseDate;

        const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const interval = 30;

        if (daysPassed > interval) {
          const reminderCount = Math.floor(daysPassed / interval);
          const nextReminderDate = new Date(baseDate);
          nextReminderDate.setDate(baseDate.getDate() + reminderCount * interval);

          if (nextReminderDate.toISOString().split('T')[0] <= today) {
            notifications.push({
              type: 'periodic_reminder',
              message: `Relance périodique #${reminderCount} due pour le dossier ${file.victimSinisterNumber || file.id}`,
              dossier: file,
              date: nextReminderDate.toISOString().split('T')[0]
            });
          }
        }
      }
    }
  });

  return notifications;
},


// 3. Méthode pour vérifier les notifications à afficher
/*checkPendingNotifications() {
  const today = new Date().toISOString().split('T')[0];
  const notifications = [];
  
  // Pour chaque dossier de recours actif
  this.files.forEach(file => {
    // Vérifier si la date de règlement n'est pas renseignée
    if (!file.studyOffer || file.studyOffer === '') {
      
      // Vérifier première relance
      if (file.firstReminderDate && file.firstReminderDate <= today) {
        notifications.push({
          type: 'first_reminder',
          message: `Première relance due pour le dossier ${file.victimSinisterNumber || file.id}`,
          dossier: file,
          date: file.firstReminderDate
        });
      }
      
      // Vérifier deuxième relance
      if (file.secondReminderDate && file.secondReminderDate <= today) {
        notifications.push({
          type: 'second_reminder',
          message: `Deuxième relance due pour le dossier ${file.victimSinisterNumber || file.id}`,
          dossier: file,
          date: file.secondReminderDate
        });
      }
      
      // Vérifier troisième relance
      if (file.thirdReminderDate && file.thirdReminderDate <= today) {
        notifications.push({
          type: 'third_reminder',
          message: `Troisième relance due pour le dossier ${file.victimSinisterNumber || file.id}`,
          dossier: file,
          date: file.thirdReminderDate
        });
      }
    }
  });
  
  return notifications;
},*/
// 4. Méthode pour mettre à jour la liste des notifications
updateNotifications() {
  const pendingNotifications = this.checkPendingNotifications();
  
  // Mettre à jour la liste des todos (notifications)
  this.todos = pendingNotifications.map(notif => ({
    id: `${notif.type}_${notif.dossier.id}`,
    message: notif.message,
    type: notif.type,
    date: notif.date,
    dossier: notif.dossier,
    read: false
  }));
  
  console.log('Notifications mises à jour:', this.todos);
},



// 6. Méthode pour marquer une notification comme lue
markNotificationAsRead(notificationId) {
  const notif = this.todos.find(t => t.id === notificationId);
  if (notif) {
    notif.read = true;
  }
},

// 7. Méthode pour ouvrir un dossier depuis une notification
openDossierFromNotification(notification) {
  // Charger le dossier concerné
  this.initializeAdnewObject(notification.dossier);
  this.dialog = true; // Ouvrir le modal d'édition
  
  // Marquer la notification comme lue
  this.markNotificationAsRead(notification.id);
},


// 9. Méthode pour vérifier périodiquement les notifications (optionnel)
startNotificationCheck() {
  // Vérifier les notifications toutes les heures
  setInterval(() => {
    this.updateNotifications();
  }, 60 * 60 * 1000); // 1 heure
},

// 10. Dans mounted(), démarrer la vérification
mounted() {
  this.initFiles();
  this.startNotificationCheck();
  
  // Vérifier les notifications immédiatement
  this.updateNotifications();
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




