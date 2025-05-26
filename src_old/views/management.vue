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
    <template>
      <v-img height="300" src="../assets/backgr.jpeg">
        <v-row align="center" class=" ma-4 mt-15" justify="center">
          <v-col cols="12">
            <h1 class="text-h4 white--text large  mb-4">
              Bienvenue à vous !
            </h1>
            <h4 class="text-h4 white--text mb-4">
              {{ this.UserProfile.fullName }}
            </h4>
            <h5 class="text-h6 white--text subheading ">
              {{ this.UserProfile.role }}
            </h5>
          </v-col>
        </v-row>
      </v-img>
    </template>
    <template>
      <v-row justify="center">
        <v-dialog v-model="addFile" max-width="1000px">
          <v-card style="border-left: 10px solid #061a40">
            <v-card-title>
              <span class="text-h5 mb-5 mt-5" style="color: #061a40"
                >Modification du gestionnaire</span
              >
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Numéro sinistre"
                    color="#061A40"
                    v-model="adnewObject.sinisterNumber"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Date sinistre"
                    type="date"
                    v-model="adnewObject.sinisterDate"
                    color="#061A40"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Lieu sinistre"
                    color="#061A40"
                    filled
                    v-model="adnewObject.sinisterPlace"
                  ></v-text-field>
                </v-col>
                <!-- <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Numéro référence"
                    color="#061A40"
                    filled
                    v-model="adnewObject.reference"
                  ></v-text-field>
                </v-col> -->
                <v-col cols="12" sm="6" md="6">
                  <v-select
                    :items="StatusIiems"
                    filled
                    label="Statut"
                    color="#061A40"
                    v-model="adnewObject.status"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Nom Assuré"
                    color="#061A40"
                    v-model="adnewObject.customerName"
                    filled
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Nom victime"
                    color="#061A40"
                    v-model="adnewObject.victimName"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Age victime"
                    color="#061A40"
                    @change="valueChange()"
                    v-model="adnewObject.victimAge"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Contact victime"
                    v-model="adnewObject.contact"
                    color="#061A40"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-select
                    :items="civiliteIiems"
                    v-model="adnewObject.civility"
                    filled
                    label="Civilité victime"
                    color="#061A40"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Adresse"
                    color="#061A40"
                    filled
                    v-model="adnewObject.address"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Situatuion socioprofessionelle"
                    color="#061A40"
                    v-model="adnewObject.professionalSocialSituation"
                    filled
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                    label="Date demande courrier"
                    color="#061A40"
                    type="date"
                    v-model="adnewObject.mailRequestDate"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                    label="Date appel"
                    color="#061A40"
                    type="date"
                    v-model="adnewObject.callDate"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-autocomplete
                    :items="demandeurDexpertise"
                    v-model="adnewObject.requesterExpertiseName"
                    color="#061A40"
                    filled
                    clearable
                    deletable-chips
                    label="Demandeur d'expertise"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Nombre de jour ITT"
                    color="#061A40"
                    type="number"
                    @change="valueChange()"
                    v-model="adnewObject.numberOfDay"
                    filled
                    disabled
                    background-color="#4DD0E1"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Taux IP"
                    @change="valueChange()"
                    v-model="adnewObject.IPRate"
                    color="#061A40"
                    type="number"
                    filled
                    disabled
                    background-color="#4DD0E1"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="FMP"
                    color="#061A40"
                    type="number"
                    filled
                    @change="valueChange()"
                    v-model="adnewObject.fmp"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Taux prétium doloris"
                    color="#061A40"
                    disabled
                    background-color="#4DD0E1"
                    filled
                    v-model="adnewObject.painPretiumRate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Taux préjudice esthétique"
                    color="#061A40"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    v-model="adnewObject.estheticDamageRate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Frais futurs"
                    color="#061A40"
                    type="number"
                    disabled
                    background-color="#4DD0E1"
                    @change="valueChange()"
                    v-model="adnewObject.futureSpawn"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="SMIG"
                    v-model="adnewObject.minimumWage"
                    color="#061A40"
                    type="number"
                    @change="valueChange()"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="PSAP"
                    color="#061A40"
                    filled
                    type="number"
                    @change="valueChange()"
                    v-model="adnewObject.PSAP"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Dommage matériel"
                    v-model="adnewObject.materialDamage"
                    filled
                    type="number"
                    @change="valueChange()"
                    color="#061A40"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Provision"
                    v-model="adnewObject.provision"
                    color="#061A40"
                    filled
                    type="number"
                    @change="valueChange()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Taux de partage"
                    color="#061A40"
                    filled
                    type="number"
                    @change="valueChange()"
                    v-model="adnewObject.liabilityRate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-textarea
                    name="input-7-1"
                    label="Observation"
                    color="#061A40"
                    filled
                    v-model="adnewObject.observationOnTheVictim"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <span class="text-h5 mb-5 mt-5" style="color: #061a40"
                    >Résultat des calculs</span
                  >
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Montant ITT"
                    color="#061A40"
                    filled
                    type="number"
                    @change="valueChange()"
                    v-model="adnewObject.ITTAmount"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Valeur Point"
                    color="#061A40"
                    v-model="adnewObject.pointValue"
                    filled
                    type="number"
                    disabled
                    background-color="#4DD0E1"
                    @change="valueChange()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Montant IP"
                    color="#061A40"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    type="number"
                    @change="valueChange()"
                    v-model="adnewObject.IPAmount"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Préjudice Esthétique"
                    color="#061A40"
                    v-model="adnewObject.estheticDamageAmount"
                    filled
                    type="number"
                    @change="valueChange()"
                    disabled
                    background-color="#4DD0E1"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Prétium Doloris"
                    color="#061A40"
                    v-model="adnewObject.pretiumAmount"
                    filled
                    type="number"
                    @change="valueChange()"
                    disabled
                    background-color="#4DD0E1"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Total Corporel"
                    color="#061A40"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    type="number"
                    @change="valueChange()"
                    v-model="adnewObject.totalBody"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Indemnité Corporelle"
                    color="#061A40"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    type="number"
                    @change="valueChange()"
                    v-model="adnewObject.bodyIndermnity"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Indemnité matérielle"
                    color="#061A40"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    type="number"
                    @change="valueChange()"
                    v-model="adnewObject.materialIndermnity"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    label="Préjudice Total"
                    color="#061A40"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    type="number"
                    @change="valueChange()"
                    v-model="adnewObject.totalDamage"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    label="Préjudice après partage"
                    color="#061A40"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    type="number"
                    @change="valueChange()"
                    v-model="adnewObject.damageAfterSharing"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    label="Indemnité à recevoir"
                    color="#061A40"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    type="number"
                    @change="valueChange()"
                    v-model="adnewObject.indermnityToBeReceived"
                  ></v-text-field>
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
              <v-btn color="success darken-1" @click="addFileFormModal()">
                Enregistrer les modifications
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <template>
      <v-row justify="center">
        <v-dialog v-model="offreMomo" max-width="500">
          <v-sheet
            class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
            color="blue-grey darken-3"
            dark
          >
            <div class="grey--text text--lighten-1 text-body-2 mb-4">
              Quel type d'offre voulez-vous générer
            </div>

            <v-btn
              :disabled="loading"
              class="ma-1"
              color="grey"
              plain
              @click="manageDocRecap()"
            >
              Offre directe
            </v-btn>

            <v-btn
              :loading="loading"
              class="ma-1"
              color="error"
              plain
              @click="manageDocRecapMomo()"
            >
              Par mobile money ou moov money.
            </v-btn>
          </v-sheet>
        </v-dialog>
      </v-row>
    </template>
    <template>
      <div>
        <v-data-table
          :headers="headers"
          :items="Files"
          :page.sync="page"
          :items-per-page="20"
          hide-default-footer
          :loading="loading ? '#061a40' : null"
          :class="{ background: $vuetify.theme.themes.dark.background }"
          @page-count="pageCount = $event"
        >
          <template v-slot:item="{ item }">
            <tr @click="handleClick(item)" class="miniTableRow green-bg">
              <td>
                {{ item.actions }}
                <v-menu elevation="0" right offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" class="mr-10">
                      <v-icon color="success" size="30"
                        >mdi-forwardburger</v-icon
                      >
                    </v-btn>
                  </template>
                  <v-list>
                    <v-tooltip bottom color="warning">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="ml-3" icon>
                          <v-icon
                            size="20"
                            @click="handleClick(item)"
                            v-bind="attrs"
                            v-on="on"
                            color="warning"
                            >mdi-file-edit-outline</v-icon
                          >
                        </v-btn>
                      </template>
                      <span>Modifier les informations</span>
                    </v-tooltip>

                    <v-tooltip bottom color="grey darken-4">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="ml-3" icon>
                          <v-icon
                            size="20"
                            @click="openOffreChoice(item)"
                            color="grey darken-4"
                            v-bind="attrs"
                            v-on="on"
                            >mdi-google-spreadsheet</v-icon
                          >
                        </v-btn>
                      </template>
                      <span>Proposition d'offre </span>
                    </v-tooltip>
                    <v-tooltip bottom color="grey darken-4">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="ml-3" icon>
                          <v-icon
                            size="20"
                            color="grey darken-4"
                            v-bind="attrs"
                            v-on="on"
                            @click="medicalRequest(item)"
                            >mdi-medical-bag</v-icon
                          >
                        </v-btn>
                      </template>
                      <span>Demande d'expertise médicale directe</span>
                    </v-tooltip>
                    <!-- <v-tooltip bottom color="error">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="ml-3" icon>
                          <v-icon
                            size="20"
                            color="error"
                            v-bind="attrs"
                            v-on="on"
                            @click="medicalReport(item)"
                            >mdi-vector-link</v-icon
                          >
                        </v-btn>
                      </template>
                      <span>Rapport d'expertise médical</span>
                    </v-tooltip> -->
                  </v-list>
                </v-menu>
              </td>
              <td>
                <v-chip color="red" dark>
                  {{ item.status }}
                </v-chip>
              </td>
              <td>{{ item.sinisterNumber }}</td>
              <td>{{ item.reference }}</td>

              <td>{{ item.customerName }}</td>
              <td>{{ item.sinisterDate }}</td>
              <td>{{ item.victimName }}</td>
              <td>{{ item.contact }}</td>
              <td>{{ item.civility }}</td>
              <td>{{ item.sinisterPlace }}</td>
              <td>{{ item.address }}</td>
              <td>{{ item.professionalSocialSituation }}</td>
            </tr>
          </template>
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Listing des dossiers </v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>

              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <!-- <v-btn
                      color="primary"
                      dark
                      class="mb-2"

                    >
                      New Item
                    </v-btn> -->
                  <div class="text-center pt-2">
                    <v-pagination
                      v-bind="attrs"
                      v-on="on"
                      color="#061A40"
                      v-model="page"
                      :length="pageCount"
                    ></v-pagination>
                  </div>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.name"
                            label="Dessert name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.calories"
                            label="Calories"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.fat"
                            label="Fat (g)"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.carbs"
                            label="Carbs (g)"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.protein"
                            label="Protein (g)"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <v-container fluid>
              <v-expansion-panels flat style="border: 1px solid #061a40">
                <v-expansion-panel class="elevation-0">
                  <v-expansion-panel-header>
                    Tri / Recherche ...
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col cols="12" md="3">
                        <v-text-field
                          color="#061a40"
                          label="Date enregistrement début"
                          class="pt-5 pa-2"
                          prepend-inner-icon="mdi-magnify"
                          v-model="StartDate"
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
                          color="#061a40"
                          label="Date enregistrement fin"
                          class="pt-5 pa-2"
                          prepend-inner-icon="mdi-magnify"
                          v-model="EndDate"
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
                          color="#061a40"
                          label="Nom assuré"
                          class="pt-5 pa-2"
                          filled
                          prepend-inner-icon="mdi-magnify"
                          dense
                          v-model="customerNameSearch"
                          outlined
                          flat
                          background-color="grey lighten-4"
                          rounded
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field
                          color="#061a40"
                          label="Nom victime"
                          class="pt-5 pa-2"
                          filled
                          prepend-inner-icon="mdi-magnify"
                          dense
                          v-model="victimNameSearch"
                          outlined
                          flat
                          background-color="grey lighten-4"
                          rounded
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field
                          color="#061a40"
                          label="Numéro sinistre"
                          class="pt-5 pa-2"
                          filled
                          prepend-inner-icon="mdi-magnify"
                          dense
                          v-model="sinisterNumberSearch"
                          outlined
                          flat
                          background-color="grey lighten-4"
                          rounded
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-select
                          :items="StatusIiems"
                          filled
                          prepend-inner-icon="mdi-magnify"
                          dense
                          class="pt-5 pa-2"
                          outlined
                          flat
                          rounded
                          label="Statut"
                          color="#061A40"
                          v-model="statusSearch"
                        ></v-select>
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
                        @click="initFiles()"
                      >
                        <v-icon left>
                          mdi-magnify
                        </v-icon>
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
          </template>

          <!-- <template v-slot:item.actions="{ item }">

          </template> -->
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
import { defaultMethods, messages } from "../utils/data";
import { addFileJson, addFileForm, updateFileForm } from "@/api/user.js";
import XLSX from "xlsx";
export default {
  name: "managementComponent",

  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: false,
    addFileExcel: false,
    addFile: false,
    page: 1,
    pages: 1,
    excelFile: null,
    adnewObject: {},
    offreChoice: {},
    lastData: [],
    pageCount: 0,
    pageCounts: 0,
    offreMomo: false,
    itemsPerPage: 10,
    esthetiqueItem: [
      { text: "Très léger ", value: "5" },
      { text: "Léger", value: "10" },
      { text: "Modéré", value: "20" },
      { text: "Moyen", value: "40" },
      { text: "Assez important ", value: "60" },
      { text: "Important", value: "100" },
      { text: "Très important", value: "150" },
      { text: "Exceptionnel", value: "300" },
    ],
    civiliteIiems: ["Monsieur", "Madame"],
    StatusIiems: [
      "En cours",
      "Consultation",
      "Expertise amiable",
      "Contre expertise",
    ],
    demandeurDexpertise: [
      "SUNU ASSURANCES",
      "SANLAM ASSURANCES",
      "SAAR ASSURANCES",
      "NSIA ASSURANCES",
      "NOBILA ASSURANCES",
      "GENERALE DES ASSURANCES",
      "ATLANTIQUE ASSURANCES",
      "AFRICAINE DES ASSURANCES",
    ],
    headersExcel: [
      // { text: "Actions", align: "start", value: "actions", sortable: false },
      {
        text: "Actions",
        align: "left",
        value: "actions",
        sortable: false,
        width: "100px",
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
        value: "customerName",
      },
      {
        text: "Nom victime",
        width: "200px",
        // divider: true,
        // class: "background white--text",
        align: "start",
        value: "victimName",
      },
      {
        text: "Numéro référence",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "reference",
      },
      {
        text: "Date sinistre",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "sinisterDate",
      },
    ],
    headers: [
      // { text: "Actions", align: "start", value: "actions", sortable: false },
      {
        text: "Actions",
        align: "left",
        value: "actions",
        sortable: false,
        width: "100px",
      },
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
        text: "Numéro référence",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "reference",
      },

      {
        text: "Nom de l'Assuré",
        // divider: true,
        width: "200px",
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "customerName",
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
        text: "Nom victime",
        width: "200px",
        // divider: true,
        // class: "background white--text",
        align: "start",
        value: "victimName",
      },
      {
        text: "Contact",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "contact",
      },
      {
        text: "Civilité",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "civility",
      },
      {
        text: "Lieu sinistre",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "sinisterPlace",
      },
      {
        text: "Adresse",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "address",
      },
      {
        text: "Situation socioprofessionnelle",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "professionalSocialSituation",
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
    ...mapGetters(["Files", "UserProfile", "FilesManage","statFile"]),
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
  },

  // created() {
  //   this.initialize();
  // },
  mounted() {
    this.initFiles();
  },
  methods: {
    ...mapActions([
      "getFiles",
      "getUserProfile",
      "getDownloadManageRecap",
      "getDownloadManageRecapMomo",
      "getDownloadMedicalExpertiseReport",
      "getDownloadMedicalExpertiseRequest",
    ]),
    async initFiles() {
      this.loading = true;
      try {
        await this.getFiles({
          StartDate: this.StartDate,
          EndDate: this.EndDate,
          customerName: this.customerNameSearch,
          victimName: this.victimNameSearch,
          sinisterNumber: this.sinisterNumberSearch,
          statusSearch: this.statusSearch,
        });
        await this.getUserProfile();
      } catch (error) {
        defaultMethods.dispatchError(
          this.$store,
          messages.failedToLoad("les dossiers")
        );
      }
      this.loading = false;
    },
    FileSelecterTrue() {
      if (!this.excelFile) {
        console.log("Please upload a xlsx file");
        return;
      }
      if (this.excelFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

          // console.log(data);
          // const lastData = [];
          // const obj = {};

          data.forEach((element, index) => {
            // alert(JSON.stringify(lastData));
            if (index != 0) {
              const obj = {};
              data[index].forEach((elements, indexs) => {
                // alert(indexs);
                if (indexs == 0) {
                  obj["sinisterNumber"] = elements.toString();
                }
                if (indexs == 1) {
                  obj["customerName"] = elements.toString();
                }
                if (indexs == 2) {
                  obj["victimName"] = elements.toString();
                }
                if (indexs == 3) {
                  obj["reference"] = elements.toString();
                }
                if (indexs == 4) {
                  obj["sinisterDate"] = elements;
                }
              });
              this.lastData.push(obj);
            }
          });
          console.log(this.lastData);
        };

        reader.readAsBinaryString(this.excelFile);
      }
      this.excelFile = null;
    },
    handleClick(item) {
      // this.editedIndex = this.adnewObject.indexOf(item);
      this.adnewObject = Object.assign({}, item);
      this.valueChange();
      this.addFile = true;
    },
    deleteItem(item) {
      this.editedIndex = this.lastData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.lastData.splice(this.editedIndex, 1);
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
      this.editedIndex = this.lastData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.lastData[this.editedIndex], this.editedItem);
      } else {
        this.lastData.push(this.editedItem);
      }
      this.close();
    },
    openOffreChoice(item) {
      this.offreMomo = true;
      this.offreChoice = item;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async addFileToJson() {
      this.loading = true;
      await addFileJson(this.lastData);
      defaultMethods.dispatchSuccess(
        this.$store,
        messages.createdSuccessfully("data")
      );
      this.loading = false;
    },
    getPointValueFromRate(rate, points) {
      if (rate <= 5) {
        return points[0];
      }
      if (rate > 5 && rate <= 10) {
        return points[1];
      }
      if (rate > 10 && rate <= 15) {
        return points[2];
      }
      if (rate > 15 && rate <= 20) {
        return points[3];
      }
      if (rate > 20 && rate <= 30) {
        return points[4];
      }
      if (rate > 30 && rate <= 40) {
        return points[5];
      }
      if (rate > 40 && rate <= 50) {
        return points[6];
      }
      if (rate > 50 && rate <= 70) {
        return points[7];
      }
      if (rate > 70 && rate <= 90) {
        return points[8];
      }
      if (rate > 90 && rate <= 100) {
        return points[9];
      }
    },

    calculatePointValue() {
      const age = this.adnewObject.victimAge;
      const ipRate = this.adnewObject.IPRate;
      let result = this.adnewObject.pointValue;

      // age < 15
      if (age < 15) {
        result = this.getPointValueFromRate(ipRate, [
          6,
          12,
          14,
          16,
          17,
          18,
          18,
          19,
          25,
          29,
        ]);
      } else if (age >= 15 && age < 20) {
        result = this.getPointValueFromRate(ipRate, [
          6,
          12,
          14,
          16,
          17,
          18,
          18,
          19,
          20,
          24,
        ]);
      } else if (age >= 20 && age < 25) {
        result = this.getPointValueFromRate(ipRate, [
          6,
          12,
          14,
          14,
          16,
          17,
          18,
          19,
          20,
          24,
        ]);
      } else if (age >= 25 && age < 30) {
        result = this.getPointValueFromRate(ipRate, [
          6,
          12,
          14,
          14,
          16,
          17,
          17,
          18,
          19,
          22,
        ]);
      } else if (age >= 30 && age < 40) {
        result = this.getPointValueFromRate(ipRate, [
          6,
          12,
          14,
          14,
          16,
          16,
          17,
          18,
          19,
          22,
        ]);
      } else if (age >= 40 && age < 60) {
        result = this.getPointValueFromRate(ipRate, [
          6,
          12,
          12,
          12,
          14,
          14,
          16,
          17,
          18,
          20,
        ]);
      } else if (age >= 60 && age < 70) {
        result = this.getPointValueFromRate(ipRate, [
          5,
          10,
          12,
          12,
          14,
          14,
          15,
          16,
          17,
          19,
        ]);
      } else if (age > 70) {
        result = this.getPointValueFromRate(ipRate, [
          5,
          10,
          10,
          12,
          12,
          13,
          13,
          14,
          15,
          18,
        ]);
      }

      this.adnewObject.pointValue = result;
    },
    valueChange() {
      // alert(this.adnewObject.estheticDamageRate)
      this.adnewObject.ITTAmount = Math.round(
        (this.adnewObject.minimumWage * this.adnewObject.numberOfDay) / 30
      );

      // point value
      this.calculatePointValue();

      // montant Ip
      this.adnewObject.IPAmount = Math.round(
        (this.adnewObject.minimumWage *
          12 *
          this.adnewObject.pointValue *
          this.adnewObject.IPRate) /
          100
      );
      // montant  estheticDamageAmount
      this.adnewObject.estheticDamageAmount = Math.round(
        (40000 * 12 * this.adnewObject.estheticDamageRate) / 100
      );

      // montant  pretiumAmount
      this.adnewObject.pretiumAmount = Math.round(
        (40000 * 12 * this.adnewObject.painPretiumRate) / 100
      );
      // alert(this.adnewObject.pretiumAmount);
      let totalBody =
        Number(this.adnewObject.fmp) +
        Number(this.adnewObject.ITTAmount) +
        Number(this.adnewObject.IPAmount) +
        Number(this.adnewObject.pretiumAmount) +
        Number(this.adnewObject.estheticDamageAmount);
      // if (totalBody < 100000) {
      //   totalBody = 100000;
      //   alert(totalBody);
      // }

      this.adnewObject.totalBody = totalBody;

      //
      this.adnewObject.totalDamage =
        this.adnewObject.bodyIndermnity + this.adnewObject.materialIndermnity;
      this.adnewObject.materialIndermnity = Math.round(
        this.adnewObject.materialDamage
      );
      this.adnewObject.bodyIndermnity = Math.round(this.adnewObject.totalBody);
      this.adnewObject.damageAfterSharing = Math.round(
        (this.adnewObject.bodyIndermnity * this.adnewObject.liabilityRate) / 100
      );

      if (this.adnewObject.damageAfterSharing < 100000) {
        this.adnewObject.indermnityToBeReceived = 100000;
      } else {
        this.adnewObject.indermnityToBeReceived =
          this.adnewObject.damageAfterSharing -
          Number(this.adnewObject.provision);
      }
    },
    async manageDocRecapMomo() {
      this.loading = true;

      const idSelect = this.offreChoice._id;
      await this.getDownloadManageRecapMomo({ id: idSelect });
      defaultMethods.dispatchSuccess(
        this.$store,
        messages.createdSuccessfully("data")
      );
      this.loading = false;
      this.initFiles();
    },
    async manageDocRecap() {
      this.loading = true;

      const idSelect = this.offreChoice._id;
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
    async addFileFormModal() {
      this.loading = true;
      try {
        const schema = {
          sinisterNumber: this.adnewObject.sinisterNumber,
          sinisterDate: this.adnewObject.sinisterDate,
          sinisterPlace: this.adnewObject.sinisterPlace,
          // reference: this.adnewObject.reference,
          liabilityRate: this.adnewObject.liabilityRate,
          customerName: this.adnewObject.customerName,
          victimName: this.adnewObject.victimName,
          victimAge: this.adnewObject.victimAge,
          contact: this.adnewObject.contact,
          civility: this.adnewObject.civility,
          address: this.adnewObject.address,
          professionalSocialSituation: this.adnewObject
            .professionalSocialSituation,
          status: this.adnewObject.status,
          minimumWage: this.adnewObject.minimumWage,
          numberOfDay: this.adnewObject.numberOfDay,
          IPRate: this.adnewObject.IPRate,
          estheticDamageRate: this.adnewObject.estheticDamageRate,
          painPretiumRate: this.adnewObject.painPretiumRate,
          fmp: this.adnewObject.fmp,
          futureSpawn: this.adnewObject.futureSpawn,
          PSAP: this.adnewObject.PSAP,
          provision: this.adnewObject.provision,
          materialDamage: this.adnewObject.materialDamage,
          liabilityRat: this.adnewObject.liabilityRat,
          ITTAmount: this.adnewObject.ITTAmount,
          pointValue: this.adnewObject.pointValue,
          IPAmount: this.adnewObject.IPAmount,
          estheticDamageAmount: this.adnewObject.estheticDamageAmount,
          pretiumAmount: this.adnewObject.pretiumAmount,
          totalBody: this.adnewObject.totalBody,
          bodyIndermnity: this.adnewObject.bodyIndermnity,
          materialIndermnity: this.adnewObject.materialIndermnity,
          totalDamage: this.adnewObject.totalDamage,
          observationOnTheVictim: this.adnewObject.observationOnTheVictim,
          mailRequestDate: this.adnewObject.mailRequestDate,
          callDate: this.adnewObject.callDate,
          requesterExpertiseName: this.adnewObject.requesterExpertiseName,
          damageAfterSharing: this.adnewObject.damageAfterSharing,
          indermnityToBeReceived: this.adnewObject.indermnityToBeReceived,
          managerExpertiseDate: Date.now(),
        };

        if (this.adnewObject._id) {
          // update
          await updateFileForm({
            schema,
            id: this.adnewObject._id,
          });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.updatedSuccessfully("Dossier")
          );
        } else {
          // add
          await addFileForm({ schema });
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
  },
};
</script>

<style scoped>
.space {
  margin-left: -100px;
  margin-right: -100px;
}
.green-bg {
  /* Set the display to `table-row` because Vuetify makes `flex` */
  display: table-row;
}
.miniTableRow:nth-child(even) {
  background-color: #f2f2f2;
}
.green-bg:hover {
  /* `!important` is necessary here because Vuetify overrides this */
  background: #061a40 !important;
  color: white;
  height: 60px;
  animation: -45deg;
  cursor: pointer;
  box-shadow: inset 0 0 1em #061a40, 0 0 2em #eeeeee;
}
</style>
