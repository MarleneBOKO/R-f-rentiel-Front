<template>
  <v-container fluid>
    <v-tabs v-model="tab" height="59" color="#fff" flat class="firstBar fixed-bar ma-0 pa-0 ">
      <v-tab href="#tab-1" class="tab" active-class="tab_color" color="#144881">Exercice en cours</v-tab>
      <v-tab href="#tab-2" active-class="tab_color">Exercice antérieurs</v-tab>

    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item value="tab-1">

        <template>
          <v-expansion-panels flat style="border: 1px solid #3A1C71;margin-bottom:10px; margin-top:30px !important">
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
                    <v-text-field color="#3A1C71" label="Date inventaire début" class="pt-5 pa-2"
                      prepend-inner-icon="mdi-magnify" v-model="startUpdatedDate" type="date" filled dense outlined flat
                      background-color="grey lighten-4" rounded></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field color="#3A1C71" label="Date inventaire fin" class="pt-5 pa-2"
                      prepend-inner-icon="mdi-magnify" v-model="endUpdatedDate" type="date" filled dense outlined flat
                      background-color="grey lighten-4" rounded></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select :items="userNameListe" filled prepend-inner-icon="mdi-magnify" dense class="pt-5 pa-2"
                      outlined flat rounded label="Nom Agent" color="#3A1C71" v-model="agentName"></v-select>
                  </v-col>
                  <!-- <v-col cols="12" md="3">
                                                                            <v-text-field color="#3A1C71" label="Nom assuré" class="pt-5 pa-2" filled
                                                                              prepend-inner-icon="mdi-magnify" dense v-model="customerNameSearch" outlined flat
                                                                              background-color="grey lighten-4" rounded></v-text-field>
                                                                          </v-col> -->
                  <v-col cols="12" md="3">
                    <v-text-field color="#3A1C71" label="Nom victime" class="pt-5 pa-2" filled
                      prepend-inner-icon="mdi-magnify" dense v-model="victimNameSearch" outlined flat
                      background-color="grey lighten-4" rounded></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field color="#3A1C71" label="Numéro sinistre" class="pt-5 pa-2" filled
                      prepend-inner-icon="mdi-magnify" dense v-model="sinisterNumberSearch" outlined flat
                      background-color="grey lighten-4" rounded></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select :items="StatusIiems" filled prepend-inner-icon="mdi-magnify" dense class="pt-5 pa-2"
                      outlined flat rounded label="Statut" color="#3A1C71" v-model="statusSearch"></v-select>
                  </v-col>
                </v-row>
                <v-card-actions>
                  <h4 class="mr-20  totalAmount ">
                    Total PSAP : {{ totalPSAP }} FCFA
                  </h4>
                  <h4 class="  separator ">
                    ||
                  </h4>
                  <h4 class=" totalAmount ">
                    Total Règlement : {{ totalRèglement }} FCFA
                  </h4>
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
          <v-row class="  ml-4 mb-4 mt-5" justify="start">
            <h4 class="text-h4 mt-3 pageTitle ">
              Listing des inventaires exercice en cours
            </h4>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-switch v-model="showAllFil" label="Afficher toutes les données" color="#3A1C71"
              @change="showAllFillData"></v-switch>
            <v-spacer></v-spacer>
          </v-row>
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
          <v-row justify="center">
            <v-dialog v-model="addFile" max-width="1000px">
              <v-card style="border-left: 10px solid #3A1C71">
                <v-card-title>
                  <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Modification inventaire</span>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Numéro sinistre" color="#3A1C71" disabled background-color="#4DD0E1"
                        v-model="adnewObject.sinisterNumber" filled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Numéro Police" v-model="adnewObject.policeNumber" color="#3A1C71" filled
                        disabled background-color="#4DD0E1"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Assuré" v-model="adnewObject.name" color="#3A1C71" filled disabled
                        background-color="#4DD0E1"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Branche" v-model="adnewObject.productName" color="#3A1C71" filled disabled
                        background-color="#4DD0E1"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Catégorie" v-model="adnewObject.category" color="#3A1C71" filled disabled
                        background-color="#4DD0E1"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Réseau" v-model="adnewObject.brokerType" color="#3A1C71" filled disabled
                        background-color="#4DD0E1"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Point de vente" v-model="adnewObject.broker" color="#3A1C71" filled disabled
                        background-color="#4DD0E1"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Code point de vente" v-model="adnewObject.agencyCode" color="#3A1C71" filled
                        disabled background-color="#4DD0E1"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Date sinistre" v-model="adnewObject.sinisterDate" color="#3A1C71" filled
                        disabled background-color="#4DD0E1"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Année de survenance" v-model="adnewObject.sinisterYear" color="#3A1C71" filled
                        disabled background-color="#4DD0E1"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Date déclaration" v-model="adnewObject.declarationDate" color="#3A1C71" filled
                        disabled background-color="#4DD0E1"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Année de déclaration" v-model="adnewObject.sinisterYear" color="#3A1C71" filled
                        disabled background-color="#4DD0E1"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Date ouverture" v-model="adnewObject.openingDate" color="#3A1C71" filled
                        disabled background-color="#4DD0E1"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Nombre totale de victime" color="#3A1C71" filled disabled
                        background-color="#4DD0E1" v-model="adnewObject.totalVictim"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Nombre de victime réglé" v-model="adnewObject.remainingVictim" color="#3A1C71"
                        disabled background-color="#4DD0E1" filled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Psap initiale" v-model="adnewObject.psap" color="#3A1C71" disabled
                        background-color="#4DD0E1" filled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Date Psap initiale" v-model="adnewObject.initialPsapDate" color="#3A1C71"
                        disabled background-color="#4DD0E1" filled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Bonus / Malus" v-model="adnewObject.bonusMalus" color="#3A1C71" disabled
                        background-color="#4DD0E1" filled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Somme règlements exercices antérieurs" :items="enquetteurNameList"
                        v-model="adnewObject.previousTotalCompensationToBeReceived" color="#3A1C71" disabled
                        background-color="#4DD0E1" filled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Somme règlements exercices" :items="enquetteurNameList"
                        v-model="adnewObject.totalCompensationToBeReceived" color="#3A1C71" disabled
                        background-color="#4DD0E1" filled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Psap Cloture" color="#3A1C71" filled disabled background-color="#4DD0E1"
                        v-model="adnewObject.updatedPsap"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Date Psap Cloture" color="#3A1C71" filled disabled background-color="#4DD0E1"
                        v-model="adnewObject.updatedPsapDate"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Montnat Recours Exercés" color="#3A1C71" filled disabled
                        background-color="#4DD0E1" v-model="adnewObject.appealExercised"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Sommes Recours Encaissés Exercices antérieurs" color="#3A1C71" filled disabled
                        background-color="#4DD0E1" v-model="adnewObject.previousAppealExercised"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Sommes Recours Encaissés Exercices en Cours" color="#3A1C71" filled disabled
                        background-color="#4DD0E1" v-model="adnewObject.appealReceived"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Montant Restant à encaisser" color="#3A1C71" filled disabled
                        background-color="#4DD0E1" v-model="adnewObject.appealRemainToCollect"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Statut PV" color="#3A1C71" disabled background-color="#4DD0E1" filled
                        v-model="adnewObject.pvStatus"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Statut contentieux" color="#3A1C71" disabled background-color="#4DD0E1"
                        v-model="adnewObject.litigationStatus" filled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="FGA" color="#3A1C71" disabled background-color="#4DD0E1" filled
                        v-model="adnewObject.followeedFGAStatus"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="POOL 2 ROUES" color="#3A1C71" disabled background-color="#4DD0E1" filled
                        v-model="adnewObject.pool2RouesStatus"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field label="POOL TPM/TPV" color="#3A1C71" disabled background-color="#4DD0E1" filled
                        v-model="adnewObject.poolTpmTpvStatus"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field label="Réparation" color="#3A1C71" disabled background-color="#4DD0E1" filled
                        v-model="adnewObject.repairStatus"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-select :items="StatusIiems" filled label="Statut inventaire" color="#3A1C71"
                        v-model="adnewObject.inventoryStatus"></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field filled type="date" label="Date clôture" color="#3A1C71" disabled
                        background-color="#4DD0E1" v-model="adnewObject.fileClosingDate"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-textarea label="Observation" color="#3A1C71" filled name="input-7-1" rows="1"
                        v-model="adnewObject.inventoryObservation"></v-textarea>
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

          <v-data-table :headers="headers" :items="inventoryListe" :page.sync="page" :items-per-page="10"
            class="elevation-0" background-color="red" color="#3A1C71" locale="fr">
            <template v-slot:item="{ item }">

              <tr @click="handleClick(item)" class=" miniTableRow green-bg">
                <!-- <td>
                                                                                <v-chip :color="getColor(item.status)" dark>
                                                                                  {{ item.status }}
                                                                                </v-chip>
                                                                              </td> -->

                <!-- <td>{{ item.status }}</td> -->
                <td>{{ item.sinister ? item.sinister.sinisterNumber : "" }}</td>
                <td>{{ item.sinister ? item.sinister.policeNumber : "" }}</td>
                <td>{{ item.sinister ? item.sinister.subscriberName : "" }}</td>
                <td>{{ item.sinister ? item.sinister.name : "" }}</td>
                <td>{{ item.sinister ? item.sinister.productName : "" }}</td>
                <td>{{ item.sinister ? item.sinister.category : "" }}</td>
                <td>{{ item.sinister ? item.sinister.brokerType : "" }}</td>
                <td>{{ item.sinister && item.sinister.broker ? item.sinister.broker.name : "" }}</td>
                <td>{{ item.sinister ? item.sinister.agencyCode : "" }}</td>
                <td>{{ item.sinister ? item.sinister.sinisterDate : "" }}</td>
                <td>{{ item.sinister ? item.sinister.sinisterYear : "" }}</td>
                <td>{{ item.sinister ? item.sinister.declarationDate : "" }}</td>
                <td>{{ item.sinister ? item.sinister.sinisterYear : "" }}</td>
                <td>{{ item.sinister ? item.openingDate : "" }}</td>
                <td>{{ item.sinister ? item.totalVictim : "" }}</td>
                <td>{{ item.sinister ? item.remainingVictim : "" }}</td>
                <td>{{ item.sinister ? item.sinister.psap : "" }}</td>
                <td>{{ item.sinister ? item.sinister.initialPsapDate : "" }}</td>
                <td>{{ item.sinister ? item.sinister.bonusMalus : "" }}</td>
                <td>{{ item.previousTotalCompensationToBeReceived }}</td>
                <td>{{ item.totalCompensationToBeReceived }}</td>
                <td>{{ item.sinister ? item.sinister.updatedPsap : "" }}</td>
                <td>{{ item.sinister ? item.sinister.updatedPsapDate : "" }}</td>
                <td>{{ item.appealExercised }}</td>
                <td>{{ item.previousAppealExercised }}</td>
                <td>{{ item.appealReceived }}</td>
                <td>{{ item.appealRemainToCollect }}</td>
                <td>{{ item.pvStatus }}</td>
                <td>{{ item.litigationStatus }}</td>
                <td>{{ item.followeedFGAStatus }}</td>
                <td>{{ item.pool2RouesStatus }}</td>
                <td>{{ item.poolTpmTpvStatus }}</td>
                <td>{{ item.repairStatus }}</td>
                <td>{{ item.inventoryStatus }}</td>
                <td>{{ item.sinister.inventoryObservation }}</td>
                <td>{{ item.sinister ? item.sinister.agentName : "" }}</td>

              </tr>
            </template>
            <template v-slot:top>
              <v-toolbar flat>

              </v-toolbar>
            </template>
            <template v-slot:no-data>
              <h4 class="text-h4 mb-4">pas de données</h4>
            </template></v-data-table>

        </template>
      </v-tab-item>
      <v-tab-item value="tab-2">
        <template>
          <v-expansion-panels flat style="border: 1px solid #3A1C71;margin-bottom:10px; margin-top:30px !important">
            <v-expansion-panel class="elevation-0">
              <v-expansion-panel-header>
                Tri / Recherche ...
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>

                  <v-col cols="12" md="3">
                    <v-select :items="StatusIiems" filled prepend-inner-icon="mdi-magnify" dense class="pt-5 pa-2"
                      outlined flat rounded label="Statut" color="#3A1C71" v-model="statusSearchCapture"></v-select>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select :items="yearArray" filled prepend-inner-icon="mdi-magnify" dense class="pt-5 pa-2" outlined
                      flat rounded label="Année d'exercice" color="#3A1C71" v-model="years"></v-select>
                  </v-col>
                </v-row>
                <v-card-actions>
                  <h4 class="mr-20  totalAmount ">
                    Total PSAP : {{ totalPSAPCapture }} FCFA
                  </h4>
                  <h4 class="  separator ">
                    ||
                  </h4>
                  <h4 class=" totalAmount ">
                    Total Règlement : {{ totalRèglementCapture }} FCFA
                  </h4>
                  <v-spacer></v-spacer>
                  <v-btn color="#3A1C71" outlined pill rounded class="mr-2" @click="initFilesCapture()">
                    <v-icon left>
                      mdi-magnify
                    </v-icon>
                    Appliquer la recherche
                  </v-btn>
                  <v-btn color="#1D6F42" outlined pill rounded :href="inventoryCapturedStat" target="_blank">
                    <v-icon size="30" class="ml-3 mr-3" color="#1D6F42" left>
                      mdi-microsoft-excel
                    </v-icon>
                    Exporter vers un tableau EXCEL
                  </v-btn>
                </v-card-actions>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-row class="  ml-4 mb-10 mt-5" justify="start">
            <h4 class="text-h4 mt-3 pageTitle ">
              Listing des inventaires exercice {{ years ? years : "____" }}
            </h4>
            <v-divider class="mx-4" inset vertical></v-divider>
            <!-- <v-switch v-model="showAllFil" label="Afficher toutes les données" color="#3A1C71"
                                    @change="showAllFillData"></v-switch> -->
            <v-spacer></v-spacer>
          </v-row>
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
          <v-row justify="center">
            <v-dialog v-model="addFile" max-width="1000px">
              <v-card style="border-left: 10px solid #3A1C71">
                <v-card-title>
                  <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Modification inventaire</span>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Numéro sinistre" color="#3A1C71" disabled background-color="#4DD0E1"
                        v-model="adnewObject.sinisterNumber" filled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Numéro Police" v-model="adnewObject.policeNumber" color="#3A1C71" filled
                        disabled background-color="#4DD0E1"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Assuré" v-model="adnewObject.name" color="#3A1C71" filled disabled
                        background-color="#4DD0E1"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Branche" v-model="adnewObject.productName" color="#3A1C71" filled disabled
                        background-color="#4DD0E1"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Catégorie" v-model="adnewObject.category" color="#3A1C71" filled disabled
                        background-color="#4DD0E1"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Réseau" v-model="adnewObject.brokerType" color="#3A1C71" filled disabled
                        background-color="#4DD0E1"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Point de vente" v-model="adnewObject.broker" color="#3A1C71" filled disabled
                        background-color="#4DD0E1"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Code point de vente" v-model="adnewObject.agencyCode" color="#3A1C71" filled
                        disabled background-color="#4DD0E1"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Date sinistre" v-model="adnewObject.sinisterDate" color="#3A1C71" filled
                        disabled background-color="#4DD0E1"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Année de survenance" v-model="adnewObject.sinisterYear" color="#3A1C71" filled
                        disabled background-color="#4DD0E1"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Date déclaration" v-model="adnewObject.declarationDate" color="#3A1C71" filled
                        disabled background-color="#4DD0E1"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Année de déclaration" v-model="adnewObject.sinisterYear" color="#3A1C71" filled
                        disabled background-color="#4DD0E1"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Date ouverture" v-model="adnewObject.openingDate" color="#3A1C71" filled
                        disabled background-color="#4DD0E1"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Nombre totale de victime" color="#3A1C71" filled disabled
                        background-color="#4DD0E1" v-model="adnewObject.totalVictim"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Nombre de victime réglé" v-model="adnewObject.remainingVictim" color="#3A1C71"
                        disabled background-color="#4DD0E1" filled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Psap initiale" v-model="adnewObject.psap" color="#3A1C71" disabled
                        background-color="#4DD0E1" filled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Date Psap initiale" v-model="adnewObject.initialPsapDate" color="#3A1C71"
                        disabled background-color="#4DD0E1" filled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Bonus / Malus" v-model="adnewObject.bonusMalus" color="#3A1C71" disabled
                        background-color="#4DD0E1" filled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Somme règlements exercices antérieurs" :items="enquetteurNameList"
                        v-model="adnewObject.previousTotalCompensationToBeReceived" color="#3A1C71" disabled
                        background-color="#4DD0E1" filled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Somme règlements exercices" :items="enquetteurNameList"
                        v-model="adnewObject.totalCompensationToBeReceived" color="#3A1C71" disabled
                        background-color="#4DD0E1" filled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Psap Cloture" color="#3A1C71" filled disabled background-color="#4DD0E1"
                        v-model="adnewObject.updatedPsap"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Date Psap Cloture" color="#3A1C71" filled disabled background-color="#4DD0E1"
                        v-model="adnewObject.updatedPsapDate"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Montnat Recours Exercés" color="#3A1C71" filled disabled
                        background-color="#4DD0E1" v-model="adnewObject.appealExercised"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Sommes Recours Encaissés Exercices antérieurs" color="#3A1C71" filled disabled
                        background-color="#4DD0E1" v-model="adnewObject.previousAppealExercised"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Sommes Recours Encaissés Exercices en Cours" color="#3A1C71" filled disabled
                        background-color="#4DD0E1" v-model="adnewObject.appealReceived"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Montant Restant à encaisser" color="#3A1C71" filled disabled
                        background-color="#4DD0E1" v-model="adnewObject.appealRemainToCollect"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Statut PV" color="#3A1C71" disabled background-color="#4DD0E1" filled
                        v-model="adnewObject.pvStatus"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Statut contentieux" color="#3A1C71" disabled background-color="#4DD0E1"
                        v-model="adnewObject.litigationStatus" filled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="FGA" color="#3A1C71" disabled background-color="#4DD0E1" filled
                        v-model="adnewObject.followeedFGAStatus"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="POOL 2 ROUES" color="#3A1C71" disabled background-color="#4DD0E1" filled
                        v-model="adnewObject.pool2RouesStatus"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field label="POOL TPM/TPV" color="#3A1C71" disabled background-color="#4DD0E1" filled
                        v-model="adnewObject.poolTpmTpvStatus"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field label="Réparation" color="#3A1C71" disabled background-color="#4DD0E1" filled
                        v-model="adnewObject.repairStatus"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-select :items="StatusIiems" filled label="Statut inventaire" color="#3A1C71"
                        v-model="adnewObject.inventoryStatus"></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field filled type="date" label="Date clôture" color="#3A1C71" disabled
                        background-color="#4DD0E1" v-model="adnewObject.fileClosingDate"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-textarea label="Observation" color="#3A1C71" filled name="input-7-1" rows="1"
                        v-model="adnewObject.inventoryObservation"></v-textarea>
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

          <v-data-table :headers="headers" :items="inventoryCaptured" :page.sync="page" :items-per-page="10"
            class="elevation-0" background-color="red" color="#3A1C71" locale="fr">
            <template v-slot:item="{ item }">

              <tr @click="handleClick(item)" class="miniTableRow green-bg">
                <!-- <td>
                                                                        <v-chip :color="getColor(item.status)" dark>
                                                                          {{ item.status }}
                                                                        </v-chip>
                                                                      </td> -->

                <!-- <td>{{ item.status }}</td> -->
                <td>{{ item.sinisterNumber }}</td>
                <td>{{ item.policeNumber }}</td>
                <td>{{ item.subscriberName }}</td>
                <td>{{ item.customerName }}</td>
                <td>{{ item.product }}</td>
                <td>{{ item.category }}</td>
                <td>{{ item.brokerType }}</td>
                <td>{{ item.brokerName }}</td>
                <td>{{ item.agencyCode }}</td>
                <td>{{ item.sinisterDate }}</td>
                <td>{{ item.sinisterYear }}</td>
                <td>{{ item.declarationDate }}</td>
                <td>{{ item.sinisterYear }}</td>
                <td>{{ item.openingDate }}</td>
                <td>{{ item.totalVictim }}</td>
                <td>{{ item.remainingVictim }}</td>
                <td>{{ item.initialPsap }}</td>
                <td>{{ item.initialPsapDate }}</td>
                <td>{{ item.bonusMalus }}</td>
                <td>{{ item.previousTotalCompensationToBeReceived }}</td>
                <td>{{ item.totalCompensationToBeReceived }}</td>
                <td>{{ item.updatedPsap }}</td>
                <td>{{ item.updatedPsapDate }}</td>
                <td>{{ item.appealExercised }}</td>
                <td>{{ item.previousAppealExercised }}</td>
                <td>{{ item.appealReceived }}</td>
                <td>{{ item.appealRemainToCollect }}</td>
                <td>{{ item.pvStatus }}</td>
                <td>{{ item.litigationStatus }}</td>
                <td>{{ item.followeedFGAStatus }}</td>
                <td>{{ item.pool2RouesStatus }}</td>
                <td>{{ item.poolTpmTpvStatus }}</td>
                <td>{{ item.repairStatus }}</td>
                <td>{{ item.inventoryStatus }}</td>
                <td>{{ item.inventoryObservation }}</td>
                <td>{{ item.agentName }}</td>

              </tr>
            </template>
            <template v-slot:top>
              <v-toolbar flat>

              </v-toolbar>
            </template>
            <template v-slot:no-data>
              <h4 class="text-h4 mb-4">pas de données</h4>
            </template></v-data-table>

        </template>
      </v-tab-item>
    </v-tabs-items>
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
  addVictimeFileForm,
  updateFileForm,
  updateInventoryForm
} from "@/api/user.js";
export default {
  name:'inventoryComponent',

  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: false,
    addFileExcel: false,
    addFile: false,
    page: 1,
    tab: null,
    pages: 1,
    sinsiterSelectId: "",
    excelFile: null,
    adnewObject: {},
    victimeDialogModal: false,
    selectedDocumentsModal: [],
    commissariatNameList: [],
    enquetteurNameList: [],
    addVictime: false,
    victimesListeData: [],
    showAllFil: false,
    victimeFormData: {},
    userNameListe:{},
    addNewVictimeFile: false,
    pageCount: 0,
    pageCounts: 0,
    years: "",
    itemsPerPage: 10,
    yearArray: [],
    printDoc: "",
    unlockButton: true,
    civiliteIiems: ["Monsieur", "Madame"],
    Decision: ["Oui", "Non"],
    StatusIiems: [
      "EN COURS",
      "Soldé",
      "Sans suite",
      "Prescrit",
      "Recours"
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
        text: "Numéro police",
        // divider: true,
        width: "200px",
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "name",
      },

      {
        text: "Souscripteur",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "totalVictim",
      },
      {
        text: "Assuré",
        width: "200px",
        // divider: true,
        // class: "background white--text",
        align: "start",
        value: "remainingVictim",
      },
      {
        text: "Branche",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "vehicleRegistration",
      },
      {
        text: "Catégorie",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "closingPSAP",
      },
      {
        text: "Réseau",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "litigationStatus",
      },
      {
        text: "Point de vente",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "pvStatus",
      },
      {
        text: "Code point de vente",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "Date sinistre",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "Année de survenance",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "Date déclaration",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "Année de déclaration",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "Date ouverture",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "Nombre de victime",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "Nombre de victime réglé",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "PSAP Initiale",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "Date PSAP Initiale",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "Bonus / Malus",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "Somme règlements exercices antérieurs",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "Somme règlements exercices ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "PSAP Clotûre",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "Date PSAP Cloture",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "Montnat Recours Exercés",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "Sommes Recours Encaissés Exercices antérieurs",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "Sommes Recours Encaissés Exercices en Cours",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "Montant Restant à encaisser",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "PV",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "Contentieux",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "FGA",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "POOL 2 ROUES",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "Pool TPM/TPV",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "Réparation",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "Statut inventaire",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "Observations",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "Nom Agent",
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
      "inventoryListe",
      "statFile",
      "totalRèglement",
      "totalPSAP",
      "inventoryCaptured",
      "totalPSAPCapture",
      "totalRèglementCapture",
      "inventoryCapturedStat",
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
    Enquetteur() {
      this.enquetteurNameList = defaultMethods.getNameList(this.Enquetteur);
    },
    Commissariat() {
      this.commissariatNameList = defaultMethods.getNameList(this.Commissariat);
    },
    userListe() {
      this.userNameListe = defaultMethods.getNameList(this.userListe);

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
      "getUsers",
      "getVictimes",
      "getEnquetteur",
      "getCommissariat",
      "getDoc",
      "getInventory",
      "getCaptureInventaire"
    ]),
    showAllFillData() {
      this.initFiles();
      //alert(this.showAllFil);
    },
    async initFilesCapture() {
      this.loading = true;
      try {

        await this.getCaptureInventaire({
          years: this.years,
          statusSearch: this.statusSearchCapture,
        });
      } catch (error) {
        defaultMethods.dispatchError(
          this.$store,
          messages.failedToLoad("les dossiers")
        );
      }
      this.loading = false;
    },
    async YEARS() {
      // const years = []
      const d = new Date();
      let year = d.getFullYear();
      year = year - 10
      // alert(JSON.stringify(year - 10))
      for (let index = 0; index < 20; index++) {
        const element = year + index;
        // alert(element)
        this.yearArray.push(element)
      }
      // alert(JSON.stringify(this.yearArray))
    },
    async initFiles() {
      this.loading = true;
      try {
        await this.YEARS()
        await this.getInventory({
          withoutPeriod: this.startUpdatedDate ? true : this.showAllFil,
          StartDate: this.StartDate,
          EndDate: this.EndDate,
          startUpdatedDate: this.startUpdatedDate,
          endUpdatedDate: this.endUpdatedDate,
          agentName: this.agentName,
          customerName: this.customerNameSearch,
          victimName: this.victimNameSearch,
          sinisterNumber: this.sinisterNumberSearch,
          statusSearch: this.statusSearch,
        });
        await this.getUserProfile();
        await this.getProduct();
        await this.getEnquetteur();
        await this.getCommissariat();
        await this.getUsers()
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
      // alert(JSON.stringify(item))
      this.adnewObject.sinisterNumber = item.sinister.sinisterNumber;
      this.adnewObject.policeNumber = item.sinister.policeNumber;
      this.adnewObject.name = item.sinister.name;
      this.adnewObject.productName = item.sinister.productName;
      this.adnewObject.category = item.sinister.category;
      this.adnewObject.brokerType = item.sinister.brokerType;
      this.adnewObject.broker = item.sinister && item.sinister.broker ? item.sinister.broker.name : "";
      this.adnewObject.agencyCode = item.sinister.agencyCode;
      this.adnewObject.sinisterDate = item.sinister.sinisterDate;
      this.adnewObject.sinisterYear = item.sinister.sinisterYear;
      this.adnewObject.declarationDate = item.sinister.declarationDate;
      this.adnewObject.sinisterYear = item.sinister.sinisterYear;
      this.adnewObject.openingDate = item.openingDate;
      this.adnewObject.totalVictim = item.totalVictim;
      this.adnewObject.remainingVictim = item.remainingVictim;
      this.adnewObject.psap = item.sinister.psap;
      this.adnewObject.initialPsapDate = item.sinister.initialPsapDate;
      this.adnewObject.bonusMalus = item.sinister.bonusMalus;
      this.adnewObject.previousTotalCompensationToBeReceived = item.previousTotalCompensationToBeReceived;
      this.adnewObject.totalCompensationToBeReceived = item.totalCompensationToBeReceived;
      this.adnewObject.updatedPsap = item.sinister.updatedPsap;
      this.adnewObject.updatedPsapDate = item.sinister.updatedPsapDate;
      this.adnewObject.appealExercised = item.appealExercised;
      this.adnewObject.previousAppealExercised = item.previousAppealExercised;
      this.adnewObject.appealReceived = item.appealReceived;
      this.adnewObject.appealRemainToCollect = item.appealRemainToCollect;
      this.adnewObject.pvStatus = item.pvStatus;
      this.adnewObject.litigationStatus = item.litigationStatus;
      this.adnewObject.followeedFGAStatus = item.followeedFGAStatus;
      this.adnewObject.pool2RouesStatus = item.pool2RouesStatus;
      this.adnewObject.poolTpmTpvStatus = item.poolTpmTpvStatus;
      this.adnewObject.repairStatus = item.repairStatus;
      this.adnewObject.inventoryStatus = item.inventoryStatus;
      this.adnewObject.fileClosingDate = item.sinister.fileClosingDate;
      this.adnewObject.inventoryObservation = item.sinister.inventoryObservation;
      this.adnewObject.inventoryID = item.sinister._id;
      // this.editedIndex = this.adnewObject.indexOf(item);
      // this.adnewObject = Object.assign({}, item);
      // this.valueChange()
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

          inventoryStatus: this.adnewObject.inventoryStatus,
          inventoryObservation: this.adnewObject.inventoryObservation,
        };

        if (this.adnewObject.inventoryID) {
          // update
          // await this.updateFile();
          // await this.updateFileVictime();
          await updateInventoryForm({
            schema,
            id: this.adnewObject.inventoryID,
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

.totalAmount {
  font-size: 15px;
  /* font-weight: bold; */
  color: #3a1c71;
}

.separator {
  font-size: 15px;
  /* font-weight: bold; */
  color: #3a1c71;
  margin-right: 20px;
  margin-left: 20px
}

.green-bg {
  /* Set the display to `table-row` because Vuetify makes `flex` */
  display: table-row;
}

td {
  font-size: 12px !important;
  border-bottom: 1px solid #f4f7fe !important;
}
.miniTableRow:nth-child(even) {
  background-color: #f2f2f2;
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
</style>
