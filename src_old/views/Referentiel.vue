<template>
  <v-container fluid>
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
      </v-card>  -->
    <v-container fluid>
      <v-expansion-panels flat style="border: 1px solid #3A1C71;margin-bottom:10px">
        <v-expansion-panel class="elevation-0">
          <v-expansion-panel-header>
            <span>
              <v-icon class="ml-2" left> mdi-filter-variant </v-icon> Tri /
              Recherche ...
            </span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date de survenance début" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="sinisterDateStart" type="date" filled dense outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date de survenance fin" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="sinisterDateDateEnd" type="date" filled dense outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date déclaration début" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="StartDate" type="date" filled dense outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Date déclaration fin" class="pt-5 pa-2"
                  prepend-inner-icon="mdi-magnify" v-model="EndDate" type="date" filled dense outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Nom assuré" class="pt-5 pa-2" filled prepend-inner-icon="mdi-magnify"
                  dense v-model="customerNameSearch" outlined flat background-color="grey lighten-4"
                  rounded></v-text-field>
              </v-col>
              <!-- <v-col cols="12" md="3">
                <v-text-field
                  color="#3A1C71"
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
              </v-col> -->
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Numéro sinistre" class="pt-5 pa-2" filled
                  prepend-inner-icon="mdi-magnify" dense v-model="sinisterNumberSearch" outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <!-- <v-col cols="12" md="3">
                <v-select :items="StatusIiems" filled prepend-inner-icon="mdi-magnify" dense class="pt-5 pa-2" outlined
                  flat rounded label="Statut" color="#3A1C71" v-model="statusSearch"></v-select>
              </v-col> -->
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
    <!--  Pop up des produits-->
    <template>
      <div>
        <v-row justify="center">
          <v-dialog v-model="victimeDialogModal" overlay transition="dialog-bottom-transition" scrollable
            max-width="1300px">
            <v-card style="border-left: 10px solid #3A1C71;" tile>
              <!-- {{ victimModal.otherInfo.documentsProvides }} -->
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="4">
                    <h3 class="mt-5 ml-2">
                      Gestion pièces
                    </h3>

                    <v-text-field color="#3A1C71" label="Recherche" class="pt-5 " filled prepend-inner-icon="mdi-magnify"
                      dense v-model="searchData" outlined @change="searchDataProduct" flat
                      background-color="grey lighten-4" rounded></v-text-field>

                    <!-- <h3 class="mb-5">
                                Sélectionner les pièces à fournir
                              </h3> -->
                    <v-data-table v-model="selectedDocumentsModal" :headers="headersProduct" :items="Documents"
                      item-key="_id" :items-per-page="5" show-select :class="{
                        background: $vuetify.theme.themes.dark.background,
                      }" class="elevation-0">
                      <template v-slot:no-data>
                        <span>pas de données</span>
                      </template>
                    </v-data-table>
                    <div class="mt-2">
                      <v-btn class="white--text" color="#3A1C71" @click="proposedDocuments">Réclamer les pièces</v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <div style="margin-top:129px !important"></div>

                    <!-- <h3 class="mb-5">Liste des pièces à fournir</h3> -->
                    <v-data-table v-model="selectedProduct" :headers="headersProducts" :items="documentsProvides"
                      item-key="_id" :items-per-page="5" show-select class="elevation-0">
                      <template v-slot:no-data>
                        <span>pas de données</span>
                      </template>
                    </v-data-table>
                    <div class="mt-2">
                      <v-btn class="white--text" color="#3A1C71" @click="providedDocuments">Valider les pièces</v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <div style="margin-top:129px !important"></div>
                    <!-- <h3 class="mb-5">Liste des pièces fournies</h3> -->
                    <v-data-table :headers="headersProductss" :items="documentsAlreadyProvides" class="elevation-0"
                      items-per-page="5">
                      <template v-slot:no-data>
                        <span>pas de données</span>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
              </v-card-text>

              <div style="flex: 1 1 auto"></div>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
    </template>
    <template>
      <v-dialog v-model="alertWarning" max-width="500px">
        <v-card style="border-left: 10px solid #3A1C71;">
          <!-- {{ victimModal.otherInfo.documentsProvides }} -->
          <v-card-title>
            <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Alerte d'enregistrement</span>
          </v-card-title>

          <v-card-text>
            Pour un traitement adéquat de votre dossier et pour l'édition de
            statistiques fiables nous vous recommandons de bien vouloir remplir
            les champs suivants:
            <!-- <li v-for="n in this.valueEnd">{{ n }}</li> -->
            Merci de bien vouloir les remplir avant d'enregistrer votre dossier
            sinistre
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="addFileMail" max-width="1000px">
        <v-card style="border-left: 10px solid #3A1C71;">
          <!-- {{ victimModal.otherInfo.documentsProvides }} -->
          <v-card-title>
            <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Enregistrer un courrier</span>
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field outlined color="#3A1C71" v-model="adnewObjectMail.fileNumber" label="Identification">
                </v-text-field>
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
                <v-combobox outlined v-model="adnewObjectMail.agent" :items="userNameList" label="Agent" multiple>
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
              <v-col cols="12" sm="6" md="4">
                <v-text-field outlined color="#3A1C71" v-model="adnewObjectMail.assignmentDate" label="Date affectation"
                  type="date"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field outlined color="#3A1C71" v-model="adnewObjectMail.treatmentDate" label="Date traitement"
                  type="date"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field outlined color="#3A1C71" v-model="adnewObjectMail.outgoingMailNumber"
                  label="Numéro courrier départ"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select outlined v-model="adnewObjectMail.service" :items="items" label="Service"></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select outlined v-model="adnewObjectMail.nature" :items="natureMails" label="Nature courrier">
                </v-select>
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
      <v-dialog v-model="mailVictimeCourrier" max-width="1000px">
        <v-card style="border-left: 10px solid #3A1C71;">
          <!-- {{ victimModal.otherInfo.documentsProvides }} -->
          <v-card-title>
            <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Listing des courriers</span>


          </v-card-title>

          <v-card-text>
            <v-container fluid>
              <v-expansion-panels flat style="border: 1px solid #3A1C71;margin-bottom:10px">
                <v-expansion-panel class="elevation-0">
                  <v-expansion-panel-header>
                    <span>
                      <v-icon class="ml-2" left> mdi-filter-variant </v-icon>
                      Tri / Recherche ...
                    </span>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col cols="12" md="3">
                        <v-text-field color="#3A1C71" label="Date d'arrivée début" class="pt-5 pa-2"
                          prepend-inner-icon="mdi-magnify" v-model="receptionDateStart" filled dense outlined flat
                          type="date" background-color="grey lighten-4" rounded></v-text-field>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field color="#3A1C71" label="Date d'arrivée fin" class="pt-5 pa-2"
                          prepend-inner-icon="mdi-magnify" v-model="receptionDateEnd" filled dense outlined flat
                          type="date" background-color="grey lighten-4" rounded></v-text-field>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field color="#3A1C71" label="Date de traitement début" class="pt-5 pa-2"
                          prepend-inner-icon="mdi-magnify" v-model="treatmentDateStart" filled dense type="date" outlined
                          flat background-color="grey lighten-4" rounded></v-text-field>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field color="#3A1C71" label="Date de traitement fin" class="pt-5 pa-2"
                          prepend-inner-icon="mdi-magnify" v-model="treatmentDateEnd" filled dense type="date" outlined
                          flat background-color="grey lighten-4" rounded></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field color="#3A1C71" label="Numéro courrier arrivé" class="pt-5 pa-2"
                          prepend-inner-icon="mdi-magnify" v-model="mailNumber" filled dense outlined flat
                          background-color="grey lighten-4" rounded></v-text-field>
                      </v-col>

                      <!-- <v-col cols="12" md="3">
                <v-text-field
                  color="#3A1C71"
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
              </v-col> -->
                    </v-row>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="#3A1C71" outlined pill rounded class="mr-2" @click="victimeMailSearche()">
                        <v-icon left>
                          mdi-magnify
                        </v-icon>
                        Appliquer la recherche
                      </v-btn>
                    </v-card-actions>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-container>
            <v-data-table :headers="headersMail" :items="victimeMailListe" :page.sync="page" :items-per-page="20"
              hide-default-footer class="elevation-0" background-color="red" color="#3A1C71"
              @page-count="pageCount = $event">
              <template v-slot:item="{ item }">
                <tr @click="handleClickMail(item)" class="miniTableRow green-bg">
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
                  <td>
                    {{ item.actions }}
                    <v-menu elevation="0" right offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on" class="mr-10">
                          <v-icon color="success" size="30">mdi-forwardburger</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-tooltip bottom color="warning">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn class="ml-3" icon>
                              <v-icon size="20" @click="handleClickMail(item)" v-bind="attrs" v-on="on" color="warning">
                                mdi-file-edit-outline</v-icon>
                            </v-btn>
                          </template>
                          <span>Modifier le dossier</span>
                        </v-tooltip>
                        <v-tooltip bottom color="success">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn class="ml-3" icon>
                              <v-icon size="20" @click="handleClickMailGed(item)" color="success" v-bind="attrs"
                                v-on="on">mdi-file-document-multiple-outline</v-icon>
                            </v-btn>
                          </template>
                          <span>Gestion des fichiers </span>
                        </v-tooltip>

                        <!-- <v-tooltip bottom color="grey darken-4">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="ml-3" icon>
                          <v-icon
                            size="20"
                            color="grey darken-4"
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
                  <td>{{ item.fileNumber }}</td>
                  <td>
                    {{ item.sinister ? item.sinister.name : "" }}
                  </td>
                  <!-- <td>{{ item.transmitter }}</td> -->
                  <!-- <td>{{ JSON.stringify(item.agent) }}</td> -->
                  <td>{{ item.mailNumber }}</td>
                  <td>{{ item.receptionDateFr }}</td>
                  <td>{{ item.createdAt }}</td>
                  <td>{{ item.assignmentDateFr }}</td>
                  <td>{{ item.treatmentDateFr }}</td>
                  <td>{{ item.outgoingMailNumber }}</td>
                  <td>{{ item.service }}</td>
                  <td>{{ item.nature }}</td>
                  <td>{{ item.CEOInstruction }}</td>
                  <td>{{ item.observation }}</td>
                </tr>
              </template>
              <template v-slot:top>
                <v-toolbar class="ml-0 pl-0" flat>
                  <v-btn class="mr-2 btnDesign" color="#3A1C71" text-color="white" pill @click="addNewVictimeMail()">
                    Enregistrer un courrier
                    <v-icon class="ml-2" left>
                      mdi-plus-box-multiple
                    </v-icon>
                  </v-btn>

                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                      <div class="text-center pt-2">
                        <v-pagination v-bind="attrs" v-on="on" color="#3A1C71" v-model="page" :length="pageCount">
                        </v-pagination>
                      </div>
                    </template>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:no-data>
                <h4 class="text-h4 mb-4">pas de données</h4>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-dialog>
    </template>
    <template>
      <v-row class="  ml-4 mb-4 mt-5" justify="start">
        <h4 class="text-h4 mt-3 pageTitle ">
          Listing des sinistres
        </h4>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-switch v-model="showAllFil" label="Afficher toutes les données" color="#3A1C71"
          @change="showAllFillData"></v-switch>
        <v-spacer></v-spacer>
      </v-row>
      <v-row justify="center">
        <v-dialog v-model="addNewVictimeFile" max-width="1300px">
          <v-card style="border-left: 10px solid #3A1C71">
            <v-card-title>
              <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Ajouter une victime</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="8">
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Nom victime" color="#3A1C71" v-model="victimeFormData.fullName" filled>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Téléphone" v-model="victimeFormData.phone" color="#3A1C71"
                        filled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select :items="civiliteVictimes" label="Civilité" v-model="victimeFormData.civility"
                        color="#3A1C71" filled></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Age" color="#3A1C71" filled type="number" v-model="victimeFormData.age">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Sous couvert" color="#3A1C71" filled v-model="victimeFormData.underCover">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select :items="agencyrNameList" label="Compagnie tiers"
                        v-model="victimeFormData.thirdPartyCompany" color="#3A1C71" filled></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Situation socioprofessionnelle"
                        v-model="victimeFormData.socioProfessionalSituation" color="#3A1C71" filled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Immatriculation (place assise)" v-model="victimeFormData.vehicleRegistration"
                        color="#3A1C71" filled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Marque véhicule" v-model="victimeFormData.vehicleBrand" color="#3A1C71"
                        filled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field label="Taux de responsabilité" v-model="victimeFormData.responsibilityRate"
                        color="#3A1C71" filled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-select :items="productNameList" @change="actualiseVictimeWaranty()" filled label="Produit"
                        color="#3A1C71" v-model="victimeFormData.product"></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-select :items="garantedDataSeed" @change="actualiseVictimeWaranty()" filled label="Garantie"
                        color="#3A1C71" v-model="victimeFormData.waranty"></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-select :items="garantedSubDataSeed" filled label="Sous garantie" color="#3A1C71"
                        v-model="victimeFormData.subWaranty"></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-select :items="operationTypesSelect" label="Type d'opération"
                        v-model="victimeFormData.operationType" color="#3A1C71" filled></v-select>
                    </v-col>

                    <!-- <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Montant règlement"
                    color="#3A1C71"
                    v-model="victimeFormData.settlementAmount"
                    filled
                  ></v-text-field>
                </v-col> -->
                    <v-col cols="12" sm="6" md="3">
                      <v-select :items="offreStatut" label="Statut règlement" v-model="victimeFormData.status"
                        color="#3A1C71" filled></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-select :items="suiviData" label="Suivi" v-model="victimeFormData.followed" color="#3A1C71"
                        filled>
                      </v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field label="Date suivi" color="#3A1C71" filled type="date" disabled
                        background-color="#4DD0E1" v-model="victimeFormData.followedDate"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-textarea name="input-4-1" rows="2" filled label="Observation" color="#3A1C71"
                        v-model="victimeFormData.observation"></v-textarea>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" md="4">
                  <div class=" reclamationTitre">
                    <h3 class="textReclamation">Demande client</h3>
                  </div>
                  <v-list v-if="todos.length != 0" subheader two-line flat class="overflow-y-auto" max-height="463">
                    <v-list-item-group>
                      <v-list-item v-for="(todo) in todos" v-bind:data="todo" v-bind:key="todo._id">

                        <v-btn small outlined fab color="red" class="mr-5" v-if="!todo.isConfirmed"
                          @click="confirmed(todo)">
                        </v-btn>
                        <v-btn small fab color="success" class="mr-5" v-else>
                          <v-icon class="white--text">mdi-check-all</v-icon>
                        </v-btn>


                        <v-list-item-content style="border-bottom: 1px solid #AAACB1">
                          <v-list-item-title class="text-wrap mb-3">{{
                            todo.complaint
                          }}</v-list-item-title>
                          <v-list-item-subtitle>Demander le: {{ todo.createdAt }}
                          </v-list-item-subtitle>
                          <v-list-item-subtitle>Demander par: {{ todo.name }}
                          </v-list-item-subtitle>
                          <v-list-item-subtitle>Contact: {{ todo.phone }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                  <v-list v-else class="pl-0 pt-20 " style=" overflow: hidden !important" shaped>
                    <v-img src="../assets/noPiority.png" max-height="50px" width="100%" alt="logo"></v-img>
                  </v-list>
                </v-col>
              </v-row>


            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error darken-1" class="mr-5" @click="addNewVictimeFile = false" text>
                Fermer
              </v-btn>
              <v-btn color="success darken-1" @click="addVictimesFileFormModal()">
                Enregistrer le dossier
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="addFile" max-width="1000px">
          <v-card style="border-left: 10px solid #3A1C71">
            <v-card-title>
              <span class="text-h5 mb-5 mt-10" style="color:#3A1C71;">Informations Assuré</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="N° souscripteur" color="#3A1C71" @change="valueChange()"
                    v-model="adnewObject.subscriberNumber" filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Nom souscripteur" color="#3A1C71" @change="valueChange()"
                    v-model="adnewObject.subscriberName" filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="N° assuré" color="#3A1C71" @change="valueChange()"
                    v-model="adnewObject.customerNumber" filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field @change="valueChange()" label="Nom de l'assuré" v-model="adnewObject.name" color="#3A1C71"
                    filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Immatriculation" v-model="adnewObject.vehicleRegistration" color="#3A1C71"
                    filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Conducteur" v-model="adnewObject.conductorName" color="#3A1C71"
                    filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Marque" v-model="adnewObject.vehicleBrand" color="#3A1C71" filled></v-text-field>
                </v-col>
                <!-- <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Immatriculation" v-model="adnewObject.vehicleRegistration" color="#3A1C71"
                    filled></v-text-field>
                </v-col> -->
              </v-row>
              <span class="text-h5 mb-10 mt-5" style="color:#3A1C71;">Informations Tiers</span>
              <v-row class="mt-5">
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Immatriculation" v-model="adnewObject.thirdPartyRegistration" color="#3A1C71"
                    filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Nom du tiers" v-model="adnewObject.thirdPartyName" color="#3A1C71" filled>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select :items="agencyrNameList" label="Compagnie" v-model="adnewObject.thirdPartyCompany"
                    color="#3A1C71" filled></v-select>
                </v-col>
              </v-row>
              <span class="text-h5 mb-10 mt-5" style="color:#3A1C71;">Informations Produit</span>
              <v-row class="mt-5">

                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Branche" color="#3A1C71" filled disabled background-color="#4DD0E1"
                    v-model="adnewObject.branch"></v-text-field>

                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <!-- <v-text-field label="Produit" color="#3A1C71" filled disabled background-color="#4DD0E1"
                    v-model="adnewObject.product"></v-text-field> -->
                  <v-select :items="productListeData" @change="valueChange()" filled label="Produit" color="#3A1C71"
                    v-model="adnewObject.product"></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Libellé Cat." @change="valueChange()" color="#3A1C71" filled disabled
                    background-color="#4DD0E1" v-model="valLibCat"></v-text-field>

                  <!-- <v-select :items="productNameList" filled label="Catégorie" color="#3A1C71"
                    v-model="adnewObject.category"></v-select> -->
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Code agence" v-model="adnewObject.agencyCode" color="#3A1C71" filled disabled
                    @change="valueChange()" background-color="#4DD0E1"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Année sinistre" v-model="adnewObject.sinisterYear" color="#3A1C71" filled disabled
                    @change="valueChange()" background-color="#4DD0E1"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Numéro police" @change="valueChange()" v-model="adnewObject.policeNumber"
                    color="#3A1C71" filled>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Numéro avenant" v-model="adnewObject.amendmentNumber" color="#3A1C71" filled>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Date effet" color="#3A1C71" type="date" filled v-model="adnewObject.effectDate">
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Date échéance" color="#3A1C71" filled type="date" v-model="adnewObject.dueDate">
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-select @change="valueChange()" :items="garantedDataSeed" filled label="Garantie" color="#3A1C71"
                    v-model="adnewObject.waranty"></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-select @change="valueChange()" :items="garantedSubDataSeed" filled label="Sous garantie"
                    color="#3A1C71" v-model="adnewObject.subWaranty"></v-select>
                </v-col>
              </v-row>
              <span class="text-h5 mb-10 mt-5" style="color:#3A1C71;">Informations sinistre</span>
              <v-row class="mt-5">
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Numéro sinistre" color="#3A1C71" @change="valueChange()"
                    v-model="adnewObject.sinisterNumber" filled></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Intermédiaire" v-model="adnewObject.broker" color="#3A1C71" filled disabled
                    @change="valueChange()" background-color="#4DD0E1"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Réseau" v-model="adnewObject.brokerType" color="#3A1C71" filled disabled
                    @change="valueChange()" background-color="#4DD0E1"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Catégorie" color="#3A1C71" filled disabled background-color="#4DD0E1"
                    v-model="adnewObject.category"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Date survenance" color="#3A1C71" filled type="date"
                    v-model="adnewObject.sinisterDate"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Lieu sinistre" v-model="adnewObject.sinisterPlace" color="#3A1C71" filled>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Heure sinistre" v-model="adnewObject.sinisterHour" color="#3A1C71" filled
                    type="time"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Date déclaration" color="#3A1C71" type="date" v-model="adnewObject.declarationDate"
                    filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Date ouverture" color="#3A1C71" type="date" v-model="adnewObject.openingDate"
                    filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                  <v-text-field label="Circonstance" color="#3A1C71" filled v-model="adnewObject.circumstance">
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-select :items="sinisterStatus" filled label="Demande PV" color="#3A1C71"
                    v-model="adnewObject.operationType"></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-select :items="natureSinistre" filled label="Nature sinistre" color="#3A1C71"
                    v-model="adnewObject.nature"></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field label="Date psap initiale" color="#3A1C71" :disabled="makeDesable"
                    background-color="#4DD0E1" type="date" v-model="adnewObject.initialPsapDate" filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field filled label="Psap initiale" color="#3A1C71" :disabled="makeDesable"
                    background-color="#4DD0E1" v-model="adnewObject.psap"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field filled label="Bonus/Malus" color="#3A1C71" @change="valueChange()" v-if="makeDesable"
                    v-model="adnewObject.bonusMalus"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Date psap actualisée" color="#3A1C71" type="date" disabled @change="valueChange()"
                    background-color="#4DD0E1" v-if="makeDesable" v-model="adnewObject.updatedPsapDate" filled>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field filled type="number" label="Psap actualisée" color="#3A1C71" disabled
                    @change="valueChange()" background-color="#4DD0E1" v-if="makeDesable"
                    v-model="adnewObject.updatedPsap"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-textarea label="Observation Psap" name="input-7-1" rows="1" color="#3A1C71" filled
                    v-model="adnewObject.observationPsap">
                  </v-textarea>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-textarea label="Observation sur le dossier" name="input-7-1" rows="1" color="#3A1C71" filled
                    v-model="adnewObject.observation">
                  </v-textarea>
                </v-col>
              </v-row>
              <span class="text-h5 mb-10 mt-5" style="color:#3A1C71;">Inventaire (Information globale sur le
                dossier)</span>
              <v-row class="mt-5">
                <v-col cols="12" sm="6" md="3">
                  <v-select :items="StatusIiems" filled label="Statut inventaire" color="#3A1C71"
                    v-model="adnewObject.inventoryStatus"></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field filled type="date" label="Date clôture" color="#3A1C71" disabled
                    background-color="#4DD0E1" v-model="adnewObject.fileClosingDate"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="Observation Inventaire" color="#3A1C71" filled
                    v-model="adnewObject.inventoryObservation"></v-text-field>
                </v-col>

              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error darken-1" class="mr-5" @click="addFile = false" text>
                Fermer
              </v-btn>
              <!-- <v-btn color="success darken-1"
               @click="addFileFormModal()"
               >
                Enregistrer le dossier @click="seedObligation()"
              </v-btn> -->
              <v-btn color="success darken-1" @click="addFileFormModal()">
                Enregistrer le dossier
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="addVictime" max-width="1500px">
          <v-card style="border-left: 10px solid #3A1C71">
            <v-card-title>
              <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Gestion des victimes</span>
            </v-card-title>
            <v-card-text>
              <v-container fluid>
                <v-expansion-panels flat style="border: 1px solid #3A1C71;margin-bottom:10px">
                  <v-expansion-panel class="elevation-0">
                    <v-expansion-panel-header>
                      <span>
                        <v-icon class="ml-2" left> mdi-filter-variant </v-icon>
                        Tri / Recherche ...
                      </span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row>
                        <v-col cols="12" md="12">
                          <v-text-field color="#3A1C71" label="Nom victime" class="pt-5 pa-2"
                            prepend-inner-icon="mdi-magnify" v-model="victimeFullName" filled dense outlined flat
                            background-color="grey lighten-4" rounded></v-text-field>
                        </v-col>

                        <!-- <v-col cols="12" md="3">
                <v-text-field
                  color="#3A1C71"
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
              </v-col> -->
                      </v-row>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="#3A1C71" outlined pill rounded class="mr-2" @click="victimeManageSearche()">
                          <v-icon left>
                            mdi-magnify
                          </v-icon>
                          Appliquer la recherche
                        </v-btn>
                      </v-card-actions>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-container>
              <v-data-table :headers="headersVictims" :items="victimesListeData" :items-per-page="10" class="elevation-0" 
              >
                <template v-slot:item="{ item }">
                  <tr @click="upDateNewSinisterVictime(item)" class="miniTableRow green-bg">
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
                          <v-tooltip bottom color="warning">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn class="ml-3" icon>
                                <v-icon size="20" @click="upDateNewSinisterVictime(item)" v-bind="attrs" v-on="on"
                                  color="warning">mdi-file-edit-outline</v-icon>
                              </v-btn>
                            </template>
                            <span>Modifier le dossier</span>
                          </v-tooltip>
                          <v-tooltip bottom color="success">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn class="ml-3" icon>
                                <v-icon size="20" @click="docShow(item)" color="success" v-bind="attrs" v-on="on">
                                  mdi-file-document-multiple-outline</v-icon>
                              </v-btn>
                            </template>
                            <span>Gestion des pièces </span>
                          </v-tooltip>
                          <v-tooltip bottom color="grey darken-4">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn class="ml-3" icon>
                                <v-icon size="20" color="grey darken-4" v-bind="attrs" v-on="on"
                                  @click="victimeMail(item)">mdi-email-plus-outline</v-icon>
                              </v-btn>
                            </template>
                            <span>Gestion courrier</span>
                          </v-tooltip>
                          <!-- <v-tooltip bottom color="grey darken-4">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="ml-3" icon>
                          <v-icon
                            size="20"
                            color="grey darken-4"
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
                    <td>{{ item.fullName }}</td>
                    <td>{{ item.phone }}</td>
                    <td>{{ item.operationType }}</td>
                    <td>{{ item.socioProfessionalSituation }}</td>
                    <td>{{ item.civility }}</td>
                    <td>{{ item.age }}</td>
                    <td>{{ item.settlementAmount }}</td>
                    <!-- <td>{{ item.observation }}</td> -->
                  </tr>
                </template>
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-btn class="mr-2 btnDesign" color="#3A1C71" text-color="white" pill
                      @click="addNewSinisterVictime()">
                      Ajouter une victime
                      <v-icon class="ml-2" left> mdi-plus-box-multiple </v-icon>
                    </v-btn>

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
                          <v-pagination v-bind="attrs" v-on="on" color="#3A1C71" v-model="page" :length="pageCount">
                          </v-pagination>
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
                                <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
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
                        <v-card-title class="text-h5">Are you sure you want to delete this
                          item?</v-card-title>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                          <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                  <!-- <v-container fluid>
            
              </v-container> -->
                </template>

                <!-- <template v-slot:item.actions="{ item }">
  
            </template> -->
                <template v-slot:no-data>
                  <h4 class="text-h4 mb-4">pas de données</h4>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <template>
      <v-row justify="center">
        <v-dialog v-model="addFileExcel" max-width="1500px">
          <v-card style="border-left: 10px solid #3A1C71">
            <v-card-title>
              <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Charger un fichier excel</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <v-file-input label="Sélectionner votre fichier excel ..." v-model="excelFile"
                    @change="FileSelecterTrue()" color="#3A1C71" filled accept=".xls,.xlsx,.csv"
                    prepend-icon="mdi-microsoft-excel"></v-file-input>
                </v-col>
                <v-col cols="6">
                  <v-text-field label="Rechercher par numéro sinistre ..." v-model="searchExcel" color="#3A1C71" filled
                    prepend-icon="mdi-file-find-outline"></v-text-field>
                </v-col>
              </v-row>
              Assurez-vous que les champs de votre feuille excel soient
              conformes à celui du tableau ci-dessous sans avoir de champ
              vide.<br />Si un champ date est vide mettre une date temporaire
              exemple:"01-01-1960" et si un champ texte est vide utilisez "_".
            </v-card-text>
            <v-container fluid>
              <v-data-table :headers="headersExcel" :items="indemnityData" :page.sync="pages" :items-per-page="5"
                :search="searchExcel" hide-default-footer :class="{ background: $vuetify.theme.themes.dark.background }"
                @page-count="pageCounts = $event" class="elevation-0">
     
                <template v-slot:item="{ item }">
                      <tr @click="editItem(item)" class=" miniTableRow green-bg">
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
                                    <v-icon size="20" @click="editItem(item)" v-bind="attrs" v-on="on"
                                      color="#a30b37">mdi-file-edit-outline</v-icon>
                                  </v-btn>
                                </template>
                                <span>Modification</span>
                              </v-tooltip>
                              <v-tooltip bottom color="#218380">
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn class="ml-3" icon>
                                    <v-icon size="20" @click="deleteItem(item)" v-bind="attrs" v-on="on"
                                      color="#218380">mdi-delete</v-icon>
                                  </v-btn>
                                </template>
                                <span>Supprimer</span>
                              </v-tooltip>
                            </v-list>
                          </v-menu>
                        </td>
                        <td>{{ item.batchNumber }}</td>
                        <td>{{ item.batchDate }}</td>
                        <td>{{ item.provision }}</td>
                      </tr>
                    </template>
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>Données du fichier excel</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="1000px">
                      <template v-slot:activator="{ on, attrs }">
                        <!-- <v-btn
                        color="primary"
                        dark
                        class="mb-2"
  
                      >
                        New Item
                      </v-btn> -->
                        <div class="text-center pt-2">
                          <v-pagination v-bind="attrs" v-on="on" color="#3A1C71" v-model="pages" :length="pageCounts">
                          </v-pagination>
                        </div>
                      </template>
                      <v-card style="border-left: 10px solid #3A1C71">
                        <v-card-title>
                          <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Modifier l'information</span>
                        </v-card-title>

                        <v-card-text>
                          <!-- <v-row>
                            <v-col cols="12" sm="12" md="6">
                              <v-text-field
                                v-model="editedItem.sinisterNumber"
                                filled
                                color="#3A1C71"
                                label="Numéro sinistre"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                              <v-text-field
                                v-model="editedItem.sinisterDate"
                                filled
                                color="#3A1C71"
                                label="Date survenance"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                              <v-text-field
                                v-model="editedItem.sinisterPlace"
                                filled
                                color="#3A1C71"
                                label="Lieu sinistre"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                v-model="editedItem.customerName"
                                filled
                                color="#3A1C71"
                                label="Nom de l'Assurer"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                v-model="editedItem.victimName"
                                filled
                                color="#3A1C71"
                                label="Nom victime"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                              <v-text-field
                                v-model="editedItem.contact"
                                filled
                                color="#3A1C71"
                                label="Contact"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                              <v-select
                                :items="civiliteIiems"
                                v-model="adnewObject.civility"
                                filled
                                label="Civilité victime"
                                color="#3A1C71"
                              ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                              <v-text-field
                                v-model="editedItem.address"
                                filled
                                color="#3A1C71"
                                label="Address"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                              <v-text-field
                                v-model="editedItem.professionalSocialSituation"
                                filled
                                color="#3A1C71"
                                label="Situation socioprofessionnelle"
                              ></v-text-field>
                            </v-col>
                          </v-row> -->
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field label="Numéro sinistre" color="#3A1C71" v-model="editedItem.sinisterNumber"
                                filled></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field label="Nom de l'assuré" v-model="editedItem.name" color="#3A1C71" filled>
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-select :items="sinisterStatus" filled label="Type d'opération" color="#3A1C71"
                                v-model="editedItem.operationType"></v-select>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                              <v-text-field label="Année sinistre" v-model="editedItem.sinisterYear" color="#3A1C71"
                                filled></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field label="Code agence" v-model="editedItem.agencyCode" color="#3A1C71" filled>
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field label="Catégorie" color="#3A1C71" filled v-model="editedItem.category">
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field label="Numéro police" v-model="editedItem.policeNumber" color="#3A1C71"
                                filled></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field label="Date survenance" color="#3A1C71" filled type="date"
                                v-model="editedItem.sinisterDate"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field label="Date déclaration" color="#3A1C71" type="date"
                                v-model="editedItem.declarationDate" filled></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field label="Lieu sinistre" v-model="editedItem.sinisterPlace" color="#3A1C71"
                                filled></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field label="Immatriculation" v-model="editedItem.vehicleRegistration"
                                color="#3A1C71" filled></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-select :items="productNameList" filled label="Produit" color="#3A1C71"
                                v-model="editedItem.product"></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field filled label="Psap" color="#3A1C71" v-model="editedItem.psap">
                              </v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                              <v-text-field label="Date effet" color="#3A1C71" type="date" filled
                                v-model="editedItem.effectDate"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field label="Date échéance" color="#3A1C71" filled type="date"
                                v-model="editedItem.dueDate"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="12">
                              <v-text-field label="Observation" color="#3A1C71" filled v-model="editedItem.observation">
                              </v-text-field>
                            </v-col>
                          </v-row>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="error  darken-1" class="mr-5" text @click="close">
                            Fermer
                          </v-btn>
                          <v-btn color="success darken-1" @click="save">
                            Enregistrer les modifications
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                      <v-card style="border-left: 10px solid #3A1C71">
                        <v-card-title class="justify-center text-h5">Supprimer cette élément</v-card-title>
                        <v-card-text class="text-center">Etes vous sur de vouloir supprimer cette élément du
                          tableau ?</v-card-text>
                        <v-card-actions class="justify-center">
                          <v-btn color="succes  darken-1" class="mr-5" depressed @click="closeDelete">Fermer</v-btn>
                          <v-btn color="error darken-1" @click="deleteItemConfirm">Oui, supprimer</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>

                <template v-slot:no-data>
                  <v-img src="../assets/noPiority.png" max-height="100" width="100" alt="logo"></v-img>
                </template>
              </v-data-table>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error darken-1" class="mr-5" text @click="addFileExcel = false">
                Fermer
              </v-btn>
              <v-btn color="success darken-1" @click="addFileToJson()">
                Charger les données
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <template>
      <div>
        <v-data-table :headers="headers" :items="Files" :page.sync="page" :items-per-page="10" locale="fr"
          class="elevation-0 mb-200" background-color="red" color="#3A1C71">
          <template v-slot:item="{ item }">
            <tr @click="handleClick(item)" class=" miniTableRow green-bg">
              <td>
                {{ item.actions }}
                <v-menu elevation="0" right offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" class="mr-10">
                      <v-icon color="success" size="30">mdi-forwardburger</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-tooltip bottom color="warning">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="ml-3" icon>
                          <v-icon size="20" @click="handleClick(item)" v-bind="attrs" v-on="on" color="warning">
                            mdi-file-edit-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>Modifier le dossier</span>
                    </v-tooltip>
                    <!-- <v-tooltip bottom color="success">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="ml-3" icon>
                          <v-icon
                            size="20"
                            @click="manageDocRecap(item)"
                            color="success"
                            v-bind="attrs"
                            v-on="on"
                            >mdi-google-spreadsheet</v-icon
                          >
                        </v-btn>
                      </template>
                      <span>Proposition d'offre </span>
                    </v-tooltip> -->
                    <v-tooltip bottom color="grey darken-4">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="ml-3" icon>
                          <v-icon size="20" color="grey darken-4" v-bind="attrs" v-on="on" @click="victimeManage(item)">
                            mdi-account-supervisor-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>Gestion victime</span>
                    </v-tooltip>
                    <!-- <v-tooltip bottom color="grey darken-4">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="ml-3" icon>
                          <v-icon
                            size="20"
                            color="grey darken-4"
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
              <!-- <td>
                <v-chip :color="getColor(item.status)" dark>
                  {{ item.operationType }}
                </v-chip>
              </td> -->
              <td>{{ item.operationType }}</td>
              <td>{{ item.subscriberNumber }}</td>
              <td>{{ item.subscriberName }}</td>
              <td>{{ item.customerNumber }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.vehicleRegistration }}</td>
              <td>{{ item.productName }}</td>
              <td>{{ item.branch }}</td>
              <td>{{ item.category }}</td>
              <td>{{ item.agencyCode }}</td>
              <td>{{ item.sinisterYear }}</td>
              <td>{{ item.policeNumber }}</td>
              <td>{{ item.amendmentNumber }}</td>
              <td>{{ item.effectDate }}</td>
              <td>{{ item.dueDate }}</td>
              <td>{{ item.waranty }}</td>
              <td>{{ item.subWaranty }}</td>
              <td>{{ item.sinisterNumber }}</td>
              <td>{{ item.broker ? item.broker.name : "" }}</td>
              <td>{{ item.brokerType }}</td>
              <td>{{ item.category }}</td>
              <td>{{ item.sinisterDate }}</td>
              <td>{{ item.sinisterPlace }}</td>
              <td>{{ item.sinisterHour }}</td>
              <td>{{ item.declarationDate }}</td>
              <td>{{ item.openingDate }}</td>
              <td>{{ item.nature }}</td>
              <td>{{ item.initialPsapDate }}</td>
              <td>{{ item.psap }}</td>
              <td>{{ item.bonusMalus }}</td>
              <td>{{ item.updatedPsapDate }}</td>
              <td>{{ item.updatedPsap }}</td>
              <td>{{ item.observationPsap }}</td>
              <td>{{ item.observation }}</td>
            </tr>
          </template>
          <template v-slot:top>
            <v-toolbar flat>
              <v-btn class="mr-2 btnDesign" color="#3A1C71" disabled text-color="white" pill @click="addNewVictime()">
                Ajouter un dossier
                <v-icon class="ml-2" left> mdi-plus-box-multiple </v-icon>
              </v-btn>
              <v-btn class="mr-2 btnDesign" color="#3A1C71" outlined pill text-color="white" @click="addFileExcel = true">
                Charger depuis un fichier
                <v-icon class="ml-2" left> mdi-microsoft-excel </v-icon>
              </v-btn>

              <v-spacer></v-spacer>

              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <!-- <v-container fluid>
                <v-expansion-panels flat style="border: 1px solid #3A1C71">
                  <v-expansion-panel class="elevation-0">
                    <v-expansion-panel-header>
                      Tri / Recherche ...
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row>
                        <v-col cols="12" md="3">
                          <v-text-field
                            color="#3A1C71"
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
                            color="#3A1C71"
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
                            color="#3A1C71"
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
                            color="#3A1C71"
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
                            color="#3A1C71"
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
                            color="#3A1C71"
                            v-model="statusSearch"
                          ></v-select>
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
                          <v-icon left>
                            mdi-magnify
                          </v-icon>
                          Appliquer la recherche
                        </v-btn>
                      </v-card-actions>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-container> -->
          </template>

          <!-- <template v-slot:item.actions="{ item }">
  
            </template> -->
          <template v-slot:no-data>
            <h4 class="text-h4 mb-4">pas de données</h4>
          </template>
        </v-data-table>
      </div>
    </template>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import { addFilendemnity } from "@/api/user";
import { defaultMethods, messages } from "../utils/data";
import {
  // addFileJson,
  addFileForm,
  updateFileForm,
  updateVictimeFileForm,
  addVictimeFileForm,
  manageDocumentProposed,
  updateMailForm,
  addMailForm,
  manageDocumentProposedTrue,
  updatePlaintForm,
} from "@/api/user.js";
// import { async } from "q";
export default {
  name: "referentielComponent",

  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: false,
    victimeFullName: "",
    e1: 1,
    todos: [],
    makeDesable: false,
    addFileExcel: false,
    offreStatut: ["Suspens", "Soldé", "Sans suite", "Recours", "Prescrit"],
    suiviData: ["Suivi FGA", "Pool 2 Roues", "Pool TPM / TPV", "Pool VT", "Rien"],
    addFile: false,
    page: 1,
    pages: 1,
    filesListe: {},
    sinsiterSelectId: "",
    victimeId: "",
    excelFile: null,
    addFileMailGed: false,
    mailVictimeCourrier: false,
    adnewObject: {
      updatedPsap: 0
    },
    valLibCat: "",
    adnewObjectMail: {},
    showAllFil: false,
    productNameList: [],
    userNameList: [],
    searchExcel: "",
    civiliteVictimes: ["Monsieur", "Madame", "Monsieur le Directeur Général", "Madame la Directrice Générale", "Monsieur le Représentant", "Madame la Représentante", "Monsieur le Maire", "Madame le Maire", "Monsieur le commissaire", "Madame la commissaire", "Monsieur le Procureur", "Madame le Procureur", "Chère Maitre", "Chere Maitre", "Monsieur le Président", "ONG"],
    sinisterStatus: ["Oui", "Non"],
    documentNameList: [],
    documentsProvides: [],
    textColoneError: [
      "Numéro sinistre",
      "Nom de l'assuré",
      "Demande PV",
      "Année sinsitre",
      "Code Agence",
      "Intermédiaire",
      "Réseau",
      "Catégorie",
      "Numéro police",
      "Date survenance",
      "Date déclaration",
      "Lieu sinistre",
      "Immatriculation",
      "Produit",
      "PSAP",
      "Date effet",
      "Date échéance",
    ],
    valueEnd: [],
    documentsAlreadyProvides: [],
    headersProduct: [
      {
        text: "Sélectionner les pièces à fournir",
        align: "start",
        sortable: false,
        value: "name",
      },
    ],
    headersProducts: [
      {
        text: "Liste des pièces à fournir",
        align: "start",
        sortable: false,
        value: "name",
      },
    ],
    headersProductss: [
      {
        text: "Liste des pièces fournies",
        align: "start",
        sortable: false,
        value: "name",
      },
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
    victimeDialogModal: false,
    selectedDocumentsModal: [],
    addVictime: false,
    victimesListeData: [],
    StatusIiems: [
      "EN COURS",
      "Soldé",
      "Sans suite",
      "Prescrit",
      "Recours"
    ],
    victimeFormData: {
      product: ""
    },
    alertWarning: false,
    sinisterSelectInfo: {},
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
    addNewVictimeFile: false,
    pageCount: 0,
    productListeData: [],
    addFileMail: false,
    pageCounts: 0,
    catXperta:
      [
        {
          "codeCat": 100,
          "libCat": "DOMMAGES CORPORELS",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": "IAG",
          "libCat": "INDIVIDUELLE ACCIDENTS GROUPE",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": "IAI",
          "libCat": "INDIVIDUELLE ACCIDENTS PARTICULIER",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": "111",
          "libCat": "INDIVIDUELLE ACCIDENT PARTICULIER",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 200,
          "libCat": "AUTOMOBILE",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": "202",
          "libCat": "TRANSPORT POUR PROPRE COMPTE Autres risques",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": "201",
          "libCat": "PROMENADE AFFAIRES Autres risques",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": "207",
          "libCat": "VÉHICULES D'AUTO-ECOLE Autres risques",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": "510",
          "libCat": "VEHICULES SPECIAUX Autres risques",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": "203",
          "libCat": "TRANSPORT PUBLIC DE MARCHANDISES Autres risques",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": "205",
          "libCat": "VEHICULES MOTORISES DEUX OU TROIS ROUES Autres risques",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": "204",
          "libCat": "TRANSPORT PUBLIC DE VOYAGEURS Autres risques",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": "208",
          "libCat": "VÉHICULES DE LOCATION Autres risques",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": "206",
          "libCat": "VEHICULES CONFIES AUX GARAGISTES Autres risques",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 219,
          "libCat": "Cyclomoteurs Autres risques",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 221,
          "libCat": "Tandems  à  moteurs Autres risques",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 238,
          "libCat": "Mobylettes Autres risques",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 239,
          "libCat": "Motocyclettes Autres risques",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 240,
          "libCat": "Triporteurs Autres risques",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 241,
          "libCat": "Side-car Autres risques",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 212,
          "libCat": "PROMENADE AFFAIRES POUR PERSONNE MORALE Autres risques",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 211,
          "libCat": "VÉHICULES DE TRANSPORT DE PERSONNES MUNIS D'UN HOROCOMPTEUR TAXIMÈTRE Autres risques",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": "209",
          "libCat": "ENGINS MOBILES DE CHANTIER Autres risques",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": "220",
          "libCat": "Scooters Autres risques",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 300,
          "libCat": "INCENDIE & MULTIRISQUE",
          "BRANCHE": "INCENDIE & MULTIRISQUE"
        },
        {
          "codeCat": "MHI",
          "libCat": "Multirisque habitation",
          "BRANCHE": "INCENDIE & MULTIRISQUE"
        },
        {
          "codeCat": "MP2",
          "libCat": "Multirisque Professionnelle",
          "BRANCHE": "INCENDIE & MULTIRISQUE"
        },
        {
          "codeCat": "TRS",
          "libCat": "Tous Risques Sauf",
          "BRANCHE": "INCENDIE & MULTIRISQUE"
        },
        {
          "codeCat": "011",
          "libCat": "GLOBALES DOMMAGES",
          "BRANCHE": "INCENDIE & MULTIRISQUE"
        },
        {
          "codeCat": "003",
          "libCat": "Multirisque Professionnelle",
          "BRANCHE": "INCENDIE & MULTIRISQUE"
        },
        {
          "codeCat": 400,
          "libCat": "AUTRES DOMMAGES AUX BIENS",
          "BRANCHE": "AUTRES DOMMAGES AUX BIENS"
        },
        {
          "codeCat": "430",
          "libCat": "TOUS RISQUES CHANTIERS",
          "BRANCHE": "AUTRES DOMMAGES AUX BIENS"
        },
        {
          "codeCat": "450",
          "libCat": "GLOBALE BANQUE",
          "BRANCHE": "AUTRES DOMMAGES AUX BIENS"
        },
        {
          "codeCat": "451",
          "libCat": "RC DECENNALE",
          "BRANCHE": "AUTRES DOMMAGES AUX BIENS"
        },
        {
          "codeCat": "412",
          "libCat": "BRIS DE MACHINES POSTES MOBILES",
          "BRANCHE": "AUTRES DOMMAGES AUX BIENS"
        },
        {
          "codeCat": "411",
          "libCat": "BRIS DE MACHINES POSTES FIXES",
          "BRANCHE": "AUTRES DOMMAGES AUX BIENS"
        },
        {
          "codeCat": 500,
          "libCat": " RESPONSABILITE CIVILE",
          "BRANCHE": " RESPONSABILITE CIVILE"
        },
        {
          "codeCat": "583",
          "libCat": "RC AUTRES PROFESSIONS",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": "517",
          "libCat": "RC SPORTS",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": "531",
          "libCat": "RC Entreprises Industrielles et Commerciales",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": "581",
          "libCat": "RC PROFESSIONS MEDICALES PARA-MEDICALE",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": "518",
          "libCat": "RC EXPOSITIONS",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": "584",
          "libCat": "RC MANIFESTATIONS SPORTIVES",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": "RCS",
          "libCat": "RC Scolaire",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": "551",
          "libCat": "RC PARTICULIER",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": "532",
          "libCat": "RC EXPLOITATION",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": "210",
          "libCat": "RC Exploitation Industrielle et Commerciale",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": "540",
          "libCat": "RC Entreprises Bâtiment et Génie Civil",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": "516",
          "libCat": "RC EXCURSIONS",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": "586",
          "libCat": "RC COLONIE DE VACANCES",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": "573",
          "libCat": "RC ASSOCIATIONS",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": "582",
          "libCat": "RC PROFESSIONS JURIQUES",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": "C53",
          "libCat": "RC Entreprises Industrielles et Commerciales",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": 600,
          "libCat": " TRANSPORTS CORPS ET FACULTES",
          "BRANCHE": " TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": "617",
          "libCat": "Facultés",
          "BRANCHE": " TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": "616",
          "libCat": "Facultés",
          "BRANCHE": " TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": "615",
          "libCat": "RC FACULTES TERRESTRES",
          "BRANCHE": " TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": "618",
          "libCat": "Facultés",
          "BRANCHE": " TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": "621",
          "libCat": "CORPS MARITIMES",
          "BRANCHE": " TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": "620",
          "libCat": "CORPS MARITIMES",
          "BRANCHE": " TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": "640",
          "libCat": "RC NAVIGATION DE PLAISANCE",
          "BRANCHE": " TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": 800,
          "libCat": " ASSISTANCE",
          "BRANCHE": "ASSISTANCE"
        },
        {
          "codeCat": "SOS",
          "libCat": "Assistance Voyageur",
          "BRANCHE": "ASSISTANCE"
        }
      ],
    catMercure:
      [
        {
          "codeCat": 105,
          "libCat": "FORFAIT JOURNALIER",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 135,
          "libCat": "ASSURANCE ECO SANTE",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 136,
          "libCat": "ASSURANCE PERTE D'EMPLOI",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 160,
          "libCat": "NSIA ASSISTANCE ROUTIERE",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 111,
          "libCat": "INDIVIDUELLE ACCIDENT PARTICULIER",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 112,
          "libCat": "INDIVIDUELLE ACCIDENT GROUPE",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 113,
          "libCat": "COMPLEMENTAIRE ACCIDENT DE TRAVAIL",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 117,
          "libCat": "ZEM ASSUR",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 118,
          "libCat": "INDIVIDUELLE ACCIDENT PARTICULIER",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 119,
          "libCat": "INDIVIDUELLE ACCIDENT GROUPE",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 131,
          "libCat": "PROTECTION SOCIALE PARTICULIER",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 132,
          "libCat": "PROTECTION SOCIALE GROUPE",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 133,
          "libCat": "ASSISTANCE",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 150,
          "libCat": "SECURITE ROUTIERE",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 151,
          "libCat": "INDIVIDUELLE CHAUFFEUR",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 152,
          "libCat": "INDIVIDUELLE CONDUCTEUR MOTO",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 153,
          "libCat": "ASSURANCE VIE",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 170,
          "libCat": "ASSURANCE INTERURBAINE",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 180,
          "libCat": "PROTECTION CONDUCTEUR",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 190,
          "libCat": "ANTI-AGRESSION",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 121,
          "libCat": "MALADIES PARTICULIER",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 122,
          "libCat": "MALADIE GROUPE",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 123,
          "libCat": "NSIA BILAN SANTE",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 124,
          "libCat": "SANTE GROUPE",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 125,
          "libCat": "NSIA FORFAIT JOURNALIER GROUPE",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 126,
          "libCat": "NSIA FORFAIT JOURNALIER INDIVIDUEL",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 127,
          "libCat": "NSIA HOSPI GROUPE",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 128,
          "libCat": "NSIA HOSPI INDIVIDUEL",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 129,
          "libCat": "MICRO ASSURANCE SANTE",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 130,
          "libCat": "ASSURANCE ASSISTANCE VOYAGEUR",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 134,
          "libCat": "TRAVEL ASSURANCE",
          "BRANCHE": "DOMMAGES CORPORELS"
        },
        {
          "codeCat": 201,
          "libCat": "PROMENADE & AFFAIRES",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 202,
          "libCat": "TRANSPORT POUR PROPRE COMPTE",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 203,
          "libCat": "TRANSPORT PUBLIC DE MARCHANDISES",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 204,
          "libCat": "TRANSPORT PUBLIC DE VOYAGEURS",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 205,
          "libCat": "VEHICULES MOTORISES DEUX OU TROIS ROUES",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 206,
          "libCat": "AMBULANCES, CORBILLARDS ET FOURGONS FUNÈBRES",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 207,
          "libCat": "VÉHICULES D'AUTO-ECOLE",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 208,
          "libCat": "VEHICULES DE LOCATION SANS CHAUFFEUR",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 209,
          "libCat": "ENGINS MOBILES DE CHANTIER",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 211,
          "libCat": "ENGINS ARROSEURS & BALAYEURS",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 212,
          "libCat": "TRACTEUR AGRICOLE CIRCULANTS SUR ROUTE",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 213,
          "libCat": "TRACTEUR AGRICOLE NON CIRCULANT SUR ROUTE",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 214,
          "libCat": "VEHICULES CONFIES AUX GARAGISTES",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 215,
          "libCat": "TRANSPORT DE MATIERES INFLAMMABLES",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 216,
          "libCat": "VEHICULE EN TRANSIT",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 217,
          "libCat": "SPECIAL VEHICULE EN TRANSIT 5 JOURS",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 218,
          "libCat": "SPECIAL VEHICULE EN TRANSIT 10 JOURS",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 219,
          "libCat": "VEHICULE EN COASSURANCE",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 225,
          "libCat": "MOTO DEUX OU TROIS ROUES",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 210,
          "libCat": "FLOTTE AUTOMOBILE",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 220,
          "libCat": "FLOTTE MOTOS DEUX OU TROIS ROUES",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": 230,
          "libCat": "COASSURANCE VEHICULE EN TRANSIT",
          "BRANCHE": "AUTOMOBILE"
        },
        {
          "codeCat": "308",
          "libCat": "INCENDIE",
          "BRANCHE": "INCENDIE & MULTIRISQUE"
        },
        {
          "codeCat": 311,
          "libCat": "MULTIRISQUE HABITATION",
          "BRANCHE": "INCENDIE & MULTIRISQUE"
        },
        {
          "codeCat": 312,
          "libCat": "MULTIRISQUE PROFESSIONNELLE",
          "BRANCHE": "INCENDIE & MULTIRISQUE"
        },
        {
          "codeCat": 313,
          "libCat": "MULTIRISQUE ENTREPRISE",
          "BRANCHE": "INCENDIE & MULTIRISQUE"
        },
        {
          "codeCat": 320,
          "libCat": "MULTIRISQUE HABITATION",
          "BRANCHE": "INCENDIE & MULTIRISQUE"
        },
        {
          "codeCat": 309,
          "libCat": "INCENDIE MRH",
          "BRANCHE": "INCENDIE & MULTIRISQUE"
        },
        {
          "codeCat": 321,
          "libCat": "INCENDIE RISQUES SIMPLES",
          "BRANCHE": "INCENDIE & MULTIRISQUE"
        },
        {
          "codeCat": 322,
          "libCat": "INCENDIE RISQUES COMMERCIAUX",
          "BRANCHE": "INCENDIE & MULTIRISQUE"
        },
        {
          "codeCat": 323,
          "libCat": "INCENDIE RISQUES INDUSTRIELS",
          "BRANCHE": "INCENDIE & MULTIRISQUE"
        },
        {
          "codeCat": 324,
          "libCat": "PERTE D'EXPLOITATION APRES INCENDIE",
          "BRANCHE": "INCENDIE & MULTIRISQUE"
        },
        {
          "codeCat": 411,
          "libCat": "BRIS DE MACHINES POSTES FIXES",
          "BRANCHE": "AUTRES DOMMAGES AUX BIENS"
        },
        {
          "codeCat": 412,
          "libCat": "BRIS DE MACHINES POSTES MOBILES",
          "BRANCHE": "AUTRES DOMMAGES AUX BIENS"
        },
        {
          "codeCat": 414,
          "libCat": "PERTE D'EXPLOITATION APRES BRIS DE MACHINES",
          "BRANCHE": "AUTRES DOMMAGES AUX BIENS"
        },
        {
          "codeCat": 430,
          "libCat": "TOUS RISQUES CHANTIERS",
          "BRANCHE": "AUTRES DOMMAGES AUX BIENS"
        },
        {
          "codeCat": 420,
          "libCat": "TOUS RISQUES INFORMATIQUES",
          "BRANCHE": "AUTRES DOMMAGES AUX BIENS"
        },
        {
          "codeCat": 421,
          "libCat": "TOUS RISQUES ELECTRONIQUES",
          "BRANCHE": "AUTRES DOMMAGES AUX BIENS"
        },
        {
          "codeCat": 440,
          "libCat": "TOUS RISQUES BIJOUTIERS",
          "BRANCHE": "AUTRES DOMMAGES AUX BIENS"
        },
        {
          "codeCat": 450,
          "libCat": "GLOBALE BANQUE",
          "BRANCHE": "AUTRES DOMMAGES AUX BIENS"
        },
        {
          "codeCat": 470,
          "libCat": "DEGATS DES EAUX",
          "BRANCHE": "AUTRES DOMMAGES AUX BIENS"
        },
        {
          "codeCat": 480,
          "libCat": "BRIS DE GLACES",
          "BRANCHE": "AUTRES DOMMAGES AUX BIENS"
        },
        {
          "codeCat": 490,
          "libCat": "RISQUES EXCEPTIONNELS",
          "BRANCHE": "AUTRES DOMMAGES AUX BIENS"
        },
        {
          "codeCat": 460,
          "libCat": "VOL AVEC AGRESSION ET OU EFFRACTION",
          "BRANCHE": "AUTRES DOMMAGES AUX BIENS"
        },
        {
          "codeCat": 461,
          "libCat": "VOL TRANSPORT DE FONDS",
          "BRANCHE": "AUTRES DOMMAGES AUX BIENS"
        },
        {
          "codeCat": 462,
          "libCat": "VOL AVEC EFFRACTION",
          "BRANCHE": "AUTRES DOMMAGES AUX BIENS"
        },
        {
          "codeCat": 463,
          "libCat": "VOL COFFRE FORT",
          "BRANCHE": "AUTRES DOMMAGES AUX BIENS"
        },
        {
          "codeCat": 464,
          "libCat": "ASSURANCE PROTECTION CARTE BANCAIRE",
          "BRANCHE": "AUTRES DOMMAGES AUX BIENS"
        },
        {
          "codeCat": 510,
          "libCat": "RC CHEF DE FAMILLE",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": 520,
          "libCat": "RC ARTISANTS COMMERÇANTS",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": 530,
          "libCat": "RC ENTREPRISES INDUST & COMMERCIALES",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": 535,
          "libCat": "RC GARAGISTES",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": 540,
          "libCat": "RC GENIE CIVIL (BATIMENTS ET CONSTRUCTION)",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": 550,
          "libCat": "RC DECENALE",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": 560,
          "libCat": "RC COLLECTIVITES",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": 570,
          "libCat": "RC DIVERSES",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": 571,
          "libCat": "RC SCOLAIRE",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": 572,
          "libCat": "RC COLONIES DE VACANCES",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": 573,
          "libCat": "RC ASSOCIATIONS SPORTIVES",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": 581,
          "libCat": "RC PROFESSIONS MÉDICALES & PARA-MEDICALE",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": 582,
          "libCat": "RC PROFESSIONS JURIQUES",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": 583,
          "libCat": "RC AUTRES PROFESSIONS",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": 584,
          "libCat": "RC MANIFESTATIONS SPORTIVES",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": 585,
          "libCat": "RC CHASSE",
          "BRANCHE": "RESPONSABILITE CIVILE"
        },
        {
          "codeCat": 610,
          "libCat": "FACULTES MARITIMES AERIENNES - FAP SAUF",
          "BRANCHE": "TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": 611,
          "libCat": "FACULTÉS MARITIMES",
          "BRANCHE": "TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": 612,
          "libCat": "FACULTÉS AERIENNES",
          "BRANCHE": "TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": 613,
          "libCat": "FACULTÉS TERRESTRES",
          "BRANCHE": "TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": 614,
          "libCat": "FACULTÉS FLUVIALES LAGUNAIRES",
          "BRANCHE": "TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": 616,
          "libCat": "FACULTÉS MARITIMES",
          "BRANCHE": "TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": 617,
          "libCat": "FACULTES AERIENNES",
          "BRANCHE": "TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": 618,
          "libCat": "FACULTÉS TERRESTRES",
          "BRANCHE": "TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": 619,
          "libCat": "FACULTES FLUVIALES",
          "BRANCHE": "TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": 621,
          "libCat": "CORPS MARITIMES",
          "BRANCHE": "TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": 623,
          "libCat": "CORPS FLUVIAUX LAGUNAIRES",
          "BRANCHE": "TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": 624,
          "libCat": "CORPS MARITIMES",
          "BRANCHE": "TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": 625,
          "libCat": "CORPS DE PECHE",
          "BRANCHE": "TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": 626,
          "libCat": "CORPS DE PLAISANCE",
          "BRANCHE": "TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": 627,
          "libCat": "CORPS FLUVIAUX LAGUNAIRES",
          "BRANCHE": "TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": 628,
          "libCat": "CORPS AERIEN",
          "BRANCHE": "TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": 629,
          "libCat": "AERO CLUB",
          "BRANCHE": "TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": 631,
          "libCat": "CORPS AERIEN",
          "BRANCHE": "TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": 632,
          "libCat": "RC AERIEN (TRANSPORT ET OU AFFRETEUR)",
          "BRANCHE": "TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": 615,
          "libCat": "RC FACULTES TERRESTRES",
          "BRANCHE": "TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": 622,
          "libCat": "RC MARITIMES (TRANSPORTS ET OU AFFRETEUR)",
          "BRANCHE": "TRANSPORTS CORPS ET FACULTES"
        },
        {
          "codeCat": 640,
          "libCat": "RC NAVIGATION DE PLAISANCE",
          "BRANCHE": "TRANSPORTS CORPS ET FACULTES"
        }
      ],
    itemsPerPage: 10,
    civiliteIiems: ["Monsieur", "Madame"],
    // StatusIiems: [
    //   "En cours",
    //   "Consultation",
    //   "Expertise amiable",
    //   "Contre expertise",
    // ],
    natureSinistre: [
      "Corporels",
      "Décès",
      "Matériels",
      "Corporels + Matériel",
      "Décès + Matériel",
      "Corporels + Matériels + décès",
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
        text: "N° souscripteur",
        align: "start",
        width: "200px",
        sortable: false,
        value: "subscriberNumber",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
      },
      {
        text: "Nom souscripteur",
        // divider: true,
        width: "200px",
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "subscriberName",
      },
      {
        text: "Produit",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "product",
      },
      {
        text: "Catégory",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "category",
      },
      {
        text: "Immatriculation",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "vehicleRegistration",
      },

      {
        text: "Immatriculation Tiers",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "thirdPartyRegistration",
      },
      // {
      //   text: "Branche",
      //   width: "200px",
      //   // divider: true,
      //   // class: "deep-purple darken-4 white--text",
      //   align: "start",
      //   value: "branch",
      // },

      // {
      //   text: "Catégorie",
      //   width: "200px",
      //   // divider: true,
      //   // class: "deep-purple darken-4 white--text",
      //   align: "start",
      //   value: "category",
      // },
      // {
      //   text: "Code agence",
      //   width: "200px",
      //   // divider: true,
      //   // class: "deep-purple darken-4 white--text",
      //   align: "start",
      //   value: "agencyCode",
      // },
      // {
      //   text: "Année sinistre",
      //   width: "200px",
      //   // divider: true,
      //   // class: "deep-purple darken-4 white--text",
      //   align: "start",
      //   value: "sinisterYear",
      // },

      {
        text: "Compagnie tiers",
        width: "200px",
        // divider: true,
        // class: "background white--text",
        align: "start",
        value: "thirdPartyCompany",
      },
      {
        text: "Nom de l'assuré",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "thirdPartyName",
      },
      {
        text: "Numéro police",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "policeNumber",
      },

      {
        text: "Numéro avenant",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "amendmentNumber",
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
        text: "Nom de l'assuré",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "name",
      },
      // {
      //   text: "Intermédiaire",
      //   width: "200px",
      //   // divider: true,
      //   // class: "deep-purple darken-4 white--text",
      //   align: "start",
      //   value: "broker",
      // },
      // {
      //   text: "Réseau",
      //   width: "200px",
      //   // divider: true,
      //   // class: "deep-purple darken-4 white--text",
      //   align: "start",
      //   value: "brokerType",
      // },
      {
        text: "Numéro sinistre",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "sinisterNumber",
      },
      {
        text: "Date survenance",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "sinisterDate",
      },
      // {
      //   text: "Lieu sinistre",
      //   width: "200px",
      //   // divider: true,
      //   // class: "deep-purple darken-4 white--text",
      //   align: "start",
      //   value: "sinisterPlace",
      // },
      // {
      //   text: "Heure sinistre",
      //   width: "200px",
      //   // divider: true,
      //   // class: "deep-purple darken-4 white--text",
      //   align: "start",
      //   value: "sinisterHour",
      // },

      {
        text: "Date déclaration",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "declarationDate",
      },
      {
        text: "Date ouverture",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "openingDate",
      },
      // {
      //   text: "Circonstance",
      //   width: "200px",
      //   // divider: true,
      //   // class: "deep-purple darken-4 white--text",
      //   align: "start",
      //   value: "circumstance",
      // },
      {
        text: "Status",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "status",
      },
      {
        text: "Nature sinistre",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "nature",
      },
      // {
      //   text: "Garantie",
      //   width: "200px",
      //   // divider: true,
      //   // class: "deep-purple darken-4 white--text",
      //   align: "start",
      //   value: "waranty",
      // },
      // {
      //   text: "Sous garantie",
      //   width: "200px",
      //   // divider: true,
      //   // class: "deep-purple darken-4 white--text",
      //   align: "start",
      //   value: "subWaranty",
      // },
      {
        text: "Date psap initiale",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "initialPsapDate",
      },
      {
        text: "Psap initiale",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "psap",
      },
      // {
      //   text: "Bonis/Malis",
      //   width: "200px",
      //   // divider: true,
      //   // class: "deep-purple darken-4 white--text",
      //   align: "start",
      //   value: "bonusMalus",
      // },
      {
        text: "Date psap actualisé",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "updatedPsapDate",
      },
      {
        text: "Psap actualisé",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "updatedPsap",
      },
      // {
      //   text: "Observation Psap",
      //   width: "200px",
      //   // divider: true,
      //   // class: "deep-purple darken-4 white--text",
      //   align: "start",
      //   value: "observationPsap",
      // },
      // {
      //   text: "Observation",
      //   width: "200px",
      //   // divider: true,
      //   // class: "deep-purple darken-4 white--text",
      //   align: "start",
      //   value: "observation",
      // },
    ],
    sinisterSelectId: "",
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
        text: "Type d'opération",
        align: "start",
        width: "200px",
        sortable: false,
        value: "operationType",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
      },
      {
        text: "N° souscripteur",
        align: "start",
        width: "200px",
        sortable: false,
        value: "subscriberNumber",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
      },
      {
        text: "Nom souscripteur",
        // divider: true,
        width: "200px",
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "subscriberName",
      },
      {
        text: "N° assuré",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "customerNumber",
      },
      {
        text: "Nom de l'assuré",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "name",
      },
      {
        text: "Immatriculation",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "vehicleRegistration",
      },
      {
        text: "Produit",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "product",
      },
      {
        text: "Branche",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "branch",
      },

      {
        text: "Catégorie",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "category",
      },
      {
        text: "Code agence",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "agencyCode",
      },
      {
        text: "Année sinistre",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "sinisterYear",
      },

      {
        text: "Numéro police",
        width: "200px",
        // divider: true,
        // class: "background white--text",
        align: "start",
        value: "policeNumber",
      },
      {
        text: "Numéro avenant",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "amendmentNumber",
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
        text: "Date échéance",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "dueDate",
      },
      {
        text: "Garantie",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "waranty",
      },
      {
        text: "Sous garantie",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "subWaranty",
      },

      {
        text: "Numéro sinistre",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "sinisterNumber",
      },
      {
        text: "Intermédiaire",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "broker",
      },
      {
        text: "Réseau",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "brokerType",
      },
      {
        text: "Catégorie",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "category",
      },
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
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "sinisterPlace",
      },
      {
        text: "Heure sinistre",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "sinisterHour",
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
        text: "Date ouverture",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "openingDate",
      },
 
      // {
      //   text: "Demande PV",
      //   width: "200px",
      //   // divider: true,
      //   // class: "deep-purple darken-4 white--text",
      //   align: "start",
      //   value: "operationType",
      // },
      {
        text: "Nature sinistre",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "nature",
      },

      {
        text: "Date psap initiale",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "initialPsapDate",
      },
      {
        text: "Psap initiale",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "psap",
      },
      {
        text: "Bonis/Malis",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "bonusMalus",
      },
      {
        text: "Date psap actualisé",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "updatedPsapDate",
      },
      {
        text: "Psap actualisé",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "updatedPsap",
      },
      {
        text: "Observation Psap",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observationPsap",
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
    headersVictims: [
      {
        text: "Actions",
        align: "left",
        value: "actions",
        sortable: false,
        width: "100px",
      },
      // {
      //   text: "Statut",
      //   width: "100px",
      //   // divider: true,
      //   // class: "deep-purple darken-4 white--text",
      //   align: "start",
      //   value: "status",
      // },

      {
        text: "Nom victime",
        // divider: true,
        width: "200px",
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "fullName",
      },
      {
        text: "Téléphone",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "phone",
      },
      {
        text: "Type d'opération",
        width: "200px",
        // divider: true,
        // class: "background white--text",
        align: "start",
        value: "operationType",
      },
      {
        text: "Situation socio-proffesionnel",
        width: "250px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "socioProfessionalSituation",
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
        text: "Age",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "age",
      },
      {
        text: "Montant règlement",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "settlementAmount",
      },

    ],
    headersMail: [
      {
        text: "Actions",
        align: "left",
        value: "actions",
        sortable: false,
        width: "100px",
      },
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
      // { text: "Emetteur", width: "200px", value: "transmitter"},
      // { text: "Agent", width: "200px", value: "agent"},
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
    garantedDataSeed: [],
    garantedSubDataSeed: [],
    editedItem: {
      sinisterNumbe: "",
      name: "",
      operationType: "",
      sinisterYear: "",
      agencyCode: "",
      category: "",
      policeNumber: "",
      sinisterDate: "",
      declarationDate: "",
      sinisterPlace: "",
      vehicleRegistration: "",
      product: "",
      psap: "",
      effectDate: "",
      dueDate: "",
      observation: "",
    },
    firstSelect: 0,
    previewBonus: 0,
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
      "Files",
      "victimeDocumentListe",
      "victimeListe",
      "UserProfile",
      "productListe",
      "indemnityData",
      "Products",
      "Documents",
      "Victime",
      "victimeMailListe",
      "userListe",
      "statFile",
      "agency",
      "brokerListe",
      "plaint",
      "inventorySimulateData"
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
    agency() {
      this.agencyrNameList = defaultMethods.getNameList(this.agency);
    },
    userListe() {
      this.userNameList = defaultMethods.getNameList(this.userListe);
    },
    Products() {
      this.productNameList = defaultMethods.getNameList(this.Products);
    },
    Documents() {
      this.documentNameList = defaultMethods.getNameList(this.Documents);
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
      "getDocuments",
      "getProducts",
      "getVictimes",
      "getVictimesDoc",
      "getVictimeMail",
      "getUsers",
      "getAgency",
      "addFilendemnity",
      "getBroker",
      "getmInventorySimulate",
      "getPlaint"
    ]),
    showAllFillData() {
      this.initFiles();
      //alert(this.showAllFil);
    },

    async initFiles() {
      this.loading = true;
      try {
        await this.getFiles({
          withoutPeriod: this.showAllFil,
          StartDate: this.StartDate,
          EndDate: this.EndDate,
          sinisterDateStart: this.sinisterDateStart,
          sinisterDateDateEnd: this.sinisterDateDateEnd,
          customerName: this.customerNameSearch,
          victimName: this.victimNameSearch,
          sinisterNumber: this.sinisterNumberSearch,
          statusSearch: this.statusSearch,
        });
        await this.getUserProfile();
        await this.getUsers();
        await this.getProducts();
        await this.getAgency();
        await this.getBroker();
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
        // alert("S'il vous plaît sélectionner un fichier excel");
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
    async victimeManageSearche() {
      this.loading = true;
      await this.getVictimes({
        sinister: this.sinsiterSelectId,
        victimName: this.victimeFullName,
      });
      this.loading = false;

      //  alert(JSON.stringify(this.victimeListe))
      this.victimesListeData = this.victimeListe;
      // this.adnewObject = Object.assign({}, item);
      // this.addFile = true;
    },
    async victimeManage(item) {
      this.loading = true;
      this.sinsiterSelectId = item._id;
      this.sinisterSelectInfo = item
      await this.getVictimes({
        sinister: item._id,
      });

      await this.getDocuments({ name: this.searchData });
      //  alert(JSON.stringify(this.victimeListe))
      this.victimesListeData = this.victimeListe;
      // this.adnewObject = Object.assign({}, item);
      // this.addFile = true;
      this.loading = false;
      this.addVictime = true;
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
          isConfirmed: true
        };

        if (i._id) {
          await updatePlaintForm({
            schema,
            id: i._id
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
      await this.getPlaintListe()
      this.loading = false;
    },
    async findDoc() {
      await this.getDocuments({ name: this.searchData });
      await this.getVictimes({
        sinister: this.sinsiterSelectId,
      });
      this.victimesListeData = this.victimeListe;
    },

    handleClick(item) {
      // alert(JSON.stringify(item))

      // this.editedIndex = this.adnewObject.indexOf(item);
      this.adnewObject = Object.assign({}, item);
      this.sinisterSelectId = item._id
      this.adnewObject.product = item.productName;
      // alert(item.bonusMalus )
      this.previewBonus = Number(item.bonusMalus)
      this.adnewObject.bonusMalus = 0;
      this.adnewObject.operationType =
        item.operationType == "Demande PV" ? "Oui" : "Non";
      // this.adnewObject.updatedPsap =10
      // alert(JSON.stringify(item));
      this.firstSelect = 1
      this.valueChange();
      // this.adnewObject.name = item.sinister.name;
      this.addFile = true;
    },
    handleClickMail(item) {
      // alert(JSON.stringify(item));
      this.adnewObjectMail.fileNumber = item.fileNumber;
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
      this.filesListe = [];
      this.adnewObjectMail.mailID = item._id;
      // this.editedIndex = this.adnewObject.indexOf(item);
      // this.adnewObject = Object.assign({}, item);
      this.addFileMail = true;
    },
    handleClickMailGed(item) {
      // alert(JSON.stringify(item));

      this.filesListe = item.files;
      // this.adnewObjectMail.mailID = item._id;
      // this.editedIndex = this.adnewObject.indexOf(item);
      // this.adnewObject = Object.assign({}, item);
      this.addFileMailGed = true;
    },
    async addMailFormModal() {
      this.loading = true;
      try {
        const formData = new FormData();
        if (this.adnewObjectMail.fileNumber) {
          formData.append("fileNumber", this.adnewObjectMail.fileNumber);
        }
        if (this.adnewObjectMail.mailNumber) {
          formData.append("mailNumber", this.adnewObjectMail.mailNumber);
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
          // alert(JSON.stringify(this.userListe));
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
        //   sendEmail: this.adnewObjectMail.sendEmail == "OUI"? true : false,
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
        // this.initialize();
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
      this.loading = false;
      this.addFile = false;
      this.addFileExcel = false;
      this.dialog = false;
      this.dialogDelete = false;
      (this.addFileMail = false), this.victimeMailSelactReload();
    },
    async victimeMailSelactReload() {
      // alert(JSON.stringify(item));

      await this.getVictimeMail({ id: this.victimeId });
    },
    async victimeMail(item) {
      // alert(JSON.stringify(item));
      console.log(item);
      this.victimeId = item._id;
      await this.getVictimeMail({ id: item._id });
      this.mailVictimeCourrier = true;
    },
    async victimeMailSearche() {
      await this.getVictimeMail({
        id: this.victimeId,
        receptionDateStart: this.receptionDateStart,
        receptionDateEnd: this.receptionDateEnd,
        treatmentDateStart: this.treatmentDateStart,
        treatmentDateEnd: this.treatmentDateEnd,
        mailNumber: this.mailNumber,
      });
    },
    valueChange() {
      // alert(
      //   this.adnewObject.sinisterNumber[0] + this.adnewObject.sinisterNumber[1]
      // );
      // alert(this.adnewObject.initialPsapDate)
      if (this.adnewObject.psap != 0 && this.adnewObject.initialPsapDate != null) {
        // alert("ok");
        this.makeDesable = true;
      } else {
        this.makeDesable = false;
      }
      let brokerInfo = [];
      if (
        this.adnewObject.sinisterNumber[0] +
        this.adnewObject.sinisterNumber[1] ==
        "BJ" ||
        this.adnewObject.sinisterNumber[0] +
        this.adnewObject.sinisterNumber[1] ==
        "bj"
      ) {
        this.adnewObject.sinisterYear =
          this.adnewObject.sinisterNumber[2] +
          this.adnewObject.sinisterNumber[3] +
          this.adnewObject.sinisterNumber[4] +
          this.adnewObject.sinisterNumber[5];

      } else {
        this.adnewObject.sinisterYear =
          this.adnewObject.sinisterNumber[0] +
          this.adnewObject.sinisterNumber[1] +
          this.adnewObject.sinisterNumber[2] +
          this.adnewObject.sinisterNumber[3];
        this.adnewObject.agencyCode =
          this.adnewObject.sinisterNumber[4] +
          this.adnewObject.sinisterNumber[5] +
          this.adnewObject.sinisterNumber[6] +
          this.adnewObject.sinisterNumber[7];
        this.adnewObject.category =
          this.adnewObject.sinisterNumber[8] +
          this.adnewObject.sinisterNumber[9] +
          this.adnewObject.sinisterNumber[10];
      }

      if (this.adnewObject.policeNumber) {
        if (
          this.adnewObject.policeNumber[0] +
          this.adnewObject.policeNumber[1] ==
          "BJ" ||
          this.adnewObject.policeNumber[0] +
          this.adnewObject.policeNumber[1] ==
          "bj"
        ) {
          this.adnewObject.branch = ""
          this.adnewObject.agencyCode =
            this.adnewObject.policeNumber[2] +
            this.adnewObject.policeNumber[3] +
            this.adnewObject.policeNumber[4] +
            this.adnewObject.policeNumber[5];
          this.adnewObject.category =
            this.adnewObject.policeNumber[6] +
            this.adnewObject.policeNumber[7] +
            this.adnewObject.policeNumber[8];
          let rentFilterValue = [];
          rentFilterValue = this.catXperta.filter(
            (element) => element.codeCat == this.adnewObject.category
          );
          if (rentFilterValue != "") {
            this.valLibCat = rentFilterValue[0].libCat;
            this.adnewObject.branch = rentFilterValue[0].BRANCHE;
          }
        }
        else {
          this.adnewObject.branch = ""
          this.adnewObject.agencyCode =
            this.adnewObject.policeNumber[0] +
            this.adnewObject.policeNumber[1] +
            this.adnewObject.policeNumber[2] +
            this.adnewObject.policeNumber[3];
          this.adnewObject.category =
            this.adnewObject.policeNumber[4] +
            this.adnewObject.policeNumber[5] +
            this.adnewObject.policeNumber[6];
          let rentFilterValue = [];
          // alert(this.adnewObject.category)
          rentFilterValue = this.catMercure.filter(
            (element) => element.codeCat == this.adnewObject.category
          );
          // alert(JSON.stringify(rentFilterValue))
          if (rentFilterValue != "") {
            this.valLibCat = rentFilterValue[0].libCat;
            this.adnewObject.branch = rentFilterValue[0].BRANCHE;
          }
        }
      }

      // alert(this.adnewObject.branch)
      // produit   adnewObject.subWaranty  garantedSubDataSeed    garantedDataSeed
      switch (this.adnewObject.branch) {
        case 'DOMMAGES CORPORELS':
          this.productListeData = ["Individuelle accidents"]
          break;
        case "AUTOMOBILE":
          this.productListeData = ["Automobile"]
          break;
        case 'INCENDIE & MULTIRISQUE':
          this.productListeData = [
            "Multirisque habitation",
            "MULTIRISQUE PROFESSIONNELLE",
            "Tous Risques Sauf",
            "GLOBALES DOMMAGES",
          ]
          break;
        case 'AUTRES DOMMAGES AUX BIENS':
          this.productListeData = [
            "TOUS RISQUES CHANTIERS",
            "RC DECENNALE",
            "GLOBALE BANQUE",
            "BRIS DE MACHINES POSTES MOBILES",
            "BRIS DE MACHINES POSTES FIXES"
          ]
          break;
        case 'RESPONSABILITE CIVILE':
          this.productListeData = [
            "RC AUTRES PROFESSIONS",
            "RC SPORTS",
            "RC DECENNALE",
            "RC DIVERS",
            "RC Entreprises Industrielles et Commerciales",
            "RC PROFESSIONS MEDICALES PARA-MEDICALE",
            "RC EXPOSITIONS",
            "RC MANIFESTATIONS SPORTIVES",
            "RC Scolaire",
            "RC PARTICULIER",
            "RC EXPLOITATION",
            "RC ASSOCIATIONS SPORTIVES",
            "RC Exploitation Industrielle et Commerciale",
            "RC Entreprises Bâtiment et Génie Civil",
            "RC EXCURSIONS",
            "RC COLONIE DE VACANCES",
            "RC ASSOCIATIONS",
            "RC PROFESSIONS JURIQUES",
          ]
          break;
        case 'TRANSPORTS CORPS ET FACULTES':
          this.productListeData = [
            "Facultés MARITIMES",
            "FACULTES AERIENNES",
            "RC FACULTES TERRESTRES",
            "Facultés TERRESTRES",
            "CORPS MARITIMES",
            "Autres RC",
            "Autres corps",
            "RC Transport",
            "RC NAVIGATION DE PLAISANCE"
          ]
          break;
        case 'ASSISTANCE':
          this.productListeData = ["Travel Assurance", "Assistance Voyageur"]
          break;
        default:
          console.log(`Sorry, we are out of .`);
      }
      // alert(this.adnewObject.product)

      // garantie   adnewObject.subWaranty  garantedSubDataSeed    garantedDataSeed
      switch (this.adnewObject.product) {

        case 'Individuelle accidents':
          this.garantedDataSeed = [
            "FMP",
            "ITT",
            "INVALIDITE",
            "DECES"]
          break;
        // case 'DOMMAGES CORPORELS':
        //   this.productListeData = ["Individuelle accidents"]
        //   break;
        case 'Automobile':
          this.garantedDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "Assistance routière",
            "Remboursement anticipé",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;


        case "Multirisque habitation":
          this.garantedDataSeed = [
            "INCENDIE/EXPLOSION/FOUDRE",
            "VOL",
            "DEGATS DES EAUX",
            "BRIS DE GLACE",
            "RESPONSABILITE ",
            "BRIS DE MACHINES",
            "TOUS RISQUES INFORMATIQUES",
            "Perte d'exploitation",
            "Tempètes Ouragan Cyclone",
            "Risques spéciaux",
            "Dommage aux appareils électriques",
            "Frais de déblais & de démolition"
          ]
          break;

        case "Multirisque Professionnelle":
          this.garantedDataSeed = [
            "INCENDIE/EXPLOSION/FOUDRE",
            "VOL",
            "DEGATS DES EAUX",
            "BRIS DE GLACE",
            "RESPONSABILITE ",
            "BRIS DE MACHINES",
            "TOUS RISQUES INFORMATIQUES",
            "Perte d'exploitation",
            "Tempètes Ouragan Cyclone",
            "Risques spéciaux",
            "Dommage aux appareils électriques",
            "Frais de déblais & de démolition"
          ]
          break;

        case "Tous Risques Sauf":
          this.garantedDataSeed = [
            "INCENDIE/EXPLOSION/FOUDRE",
            "VOL",
            "DEGATS DES EAUX",
            "BRIS DE GLACE",
            "RESPONSABILITE ",
            "BRIS DE MACHINES",
            "TOUS RISQUES INFORMATIQUES",
            "Perte d'exploitation",
            "Tempètes Ouragan Cyclone",
            "Risques spéciaux",
            "Dommage aux appareils électriques",
            "Frais de déblais & de démolition"
          ]
          break;
        case "GLOBALES DOMMAGES":
          this.garantedDataSeed = [
            "INCENDIE/EXPLOSION/FOUDRE",
            "VOL",
            "DEGATS DES EAUX",
            "BRIS DE GLACE",
            "RESPONSABILITE ",
            "BRIS DE MACHINES",
            "TOUS RISQUES INFORMATIQUES",
            "Perte d'exploitation",
            "Tempètes Ouragan Cyclone",
            "Risques spéciaux",
            "Dommage aux appareils électriques",
            "Frais de déblais & de démolition"
          ]
          break;

        case
          "TOUS RISQUES CHANTIERS"
          :
          this.garantedDataSeed = [
            "TOUS RISQUES CHANTIERS",
          ]
          break;
        case
          "RC DECENNALE"
          :
          this.garantedDataSeed = [
            "RC DECENNALE", "Responsabilité Civile Exploitation"
          ]
          break;
        case
          "GLOBALE BANQUE"
          :
          this.garantedDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détérioration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport",
            "Vol",
          ]
          break;
        case
          "BRIS DE MACHINES POSTES MOBILES"
          :
          this.garantedDataSeed = [
            "BRIS DE MACHINES POSTES MOBILES",
          ]
          break;
        case
          "BRIS DE MACHINES POSTES FIXES"
          :
          this.garantedDataSeed = [
            "BRIS DE MACHINES POSTES FIXES"
          ]
          break;
        case
          "RC AUTRES PROFESSIONS":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case
          "RC SPORTS":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        // case

        //   "RC DECENNALE":

        //   this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
        //   break;
        case

          "RC DIVERS":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case

          "RC PROFESSIONS MEDICALES PARA-MEDICALE":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case

          "RC EXPOSITIONS":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case


          "RC MANIFESTATIONS SPORTIVES":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case

          "RC Scolaire":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case

          "RC PARTICULIER":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case

          "RC EXPLOITATION":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case

          "RC Exploitation Industrielle et Commerciale":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case
          "RC Entreprises Bâtiment et Génie Civil"
          :
          this.garantedDataSeed = ["Responsabilité Civile Professionnelle"]
          break;
        case
          "RC EXCURSIONS"
          :
          this.garantedDataSeed = ["Responsabilité Civile Professionnelle"]
          break;
        case
          "RC COLONIE DE VACANCES "
          :
          this.garantedDataSeed = ["Responsabilité Civile Professionnelle"]
          break;
        case
          "RC ASSOCIATION SPORTIVES"
          :
          this.garantedDataSeed = ["Responsabilité Civile Professionnelle"]
          break;
        case "RC ASSOCIATIONS":
          this.garantedDataSeed = ["Défense et Recours"]
          break;
        case
          "RC PROFESSIONS JURIQUES":
          this.garantedDataSeed = ["Défense et Recours"]
          break;
        case
          "RC Entreprises Industrielles et Commerciales":
          this.garantedDataSeed = ["Défense et Recours"]
          break;

        case 'Facultés MARITIMES':
          this.garantedDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "FAP SAUF",
            "RC"
          ]
          break;
        case 'FACULTES AERIENNES':
          this.garantedDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "FAP SAUF",
            "RC"
          ]
          break;
        case 'RC FACULTES TERRESTRES':
          this.garantedDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "FAP SAUF",
            "RC"
          ]
          break;
        case 'CORPS MARITIMES':
          this.garantedDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "FAP SAUF",
            "RC"
          ]
          break;
        case 'Autres RC':
          this.garantedDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "FAP SAUF",
            "RC"
          ]
          break;
        case 'Autres corps':
          this.garantedDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "FAP SAUF",
            "RC"
          ]
          break;
        case 'RC Transport':
          this.garantedDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "FAP SAUF",
            "RC"
          ]
          break;
        case 'RC NAVIGATION DE PLAISANCE':
          this.garantedDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "FAP SAUF",
            "RC"
          ]
          break;
        case 'Assistance Voyageur':
          this.garantedDataSeed = ["Assistance", "Travel Assurance"]
          break;
        default:
          console.log(`Sorry, we are out of .`);
      }
      // alert(JSON.stringify(this.adnewObject.waranty))

      // Sous garantie   adnewObject.subWaranty  garantedSubDataSeed    garantedDataSeed
      switch (this.adnewObject.waranty) {
        case "FMP":
          this.garantedSubDataSeed = [
            "FMP",
            "ITT",
            "INVALIDITE",
            "DECES"]
          break;
        case
          "ITT":
          this.garantedSubDataSeed = [
            "FMP",
            "ITT",
            "INVALIDITE",
            "DECES"]
          break;
        case
          "INVALIDITE":
          this.garantedSubDataSeed = [
            "FMP",
            "ITT",
            "INVALIDITE",
            "DECES"]
          break;
        case
          "DECES":
          this.garantedSubDataSeed = [
            "FMP",
            "ITT",
            "INVALIDITE",
            "DECES"]
          break;

        case "RC":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "CEDEAO":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "DEFENSE ET RECOURS":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "INDIVIDUELLE CONDUCTEUR":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "Assistance routière":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "Remboursement anticipé":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "PROTECTION ILLIMITEE":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "BRIS DE GLACE":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION",
            "Dommages aux glaces",
            "Frais de cloture provisoire",
            "Honoraires d'Expert"
          ]
          break;
        case "INCENDIE":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "VOL":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "TOUS RISQUES":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "MINI TOUS RISQUES":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "VOL ACCESSOIRES":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "VANDALISME":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "TIERCE COLLISION":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;

        case "INCENDIE/EXPLOSION/FOUDRE":
          this.garantedSubDataSeed = [
            "Sous-garantie",
            "Contenu (Mobilier & Matériels)",
            "Privation de jouissance",
            "Perte d'usage",
            "Perte de loyer",
            "Recours des voisins et tiers",
            "Dommages aux appareils électriques",
            "Pertes indirectes",
            "RLS",
            "RLO",
            "Aménagements",
            "Marchandises",
            "Frais de déblai et de démolition",
            "Frais de mise en conformité",
            "Frais et Honoraires d'expert",
            "Risques spéciaux",
            "Honoraires d'Expert",
          ]
          break;
        // case "VOL":
        //   this.garantedSubDataSeed = [

        //   ]
        //   break;
        case
          "DEGATS DES EAUX":
          this.garantedSubDataSeed = [
            "Contenu",
            "Bâtiment & contenu",
            "Bâtiment",
            "Frais de recherche de fuite",
            "Honoraires d'Expert",
          ]
          break;
        // case "BRIS DE GLACE"
        //   :
        //   this.garantedSubDataSeed = [

        //   ]
        //   break;
        case "RESPONSABILITE":
          this.garantedSubDataSeed = [
            "Dommages corporels",
            "Dommages matériels / Evènements",
            "Voyage séjour",
            "Défense et Recours",
            "Honoraires d'Expert"
          ]
          break;
        case 'BRIS DE MACHINES':
          this.garantedSubDataSeed = [
            "Honoraires d'Expert",
            "bris de machines"
          ]
          break;
        case 'TOUS RISQUES INFORMATIQUES':
          this.garantedSubDataSeed = [
            "Matériel informatique",
            "Frais supplémentaires",
            "Reconstitution des médias",
            "Honoraires d'Expert",
          ]
          break;
        case "Perte d'exploitation":
          this.garantedSubDataSeed = [
            "Perte d'exploitation",
            "Honoraires d'Expert"
          ]
          break;
        case "Tempètes Ouragan Cyclone":
          this.garantedSubDataSeed = [
            "Tempètes Ouragan Cyclone"
          ]
          break;
        case "Risques spéciaux":
          this.garantedSubDataSeed = [
            "Risques spéciaux"
          ]
          break;
        case "Dommage aux appareils électriques":
          this.garantedSubDataSeed = [
            "Dommage aux appareils électriques"
          ]
          break;
        case "Frais de déblais & de démolition":
          this.garantedSubDataSeed = [
            "Frais de déblais & de démolition"
          ]
          break;

        case 'TOUS RISQUES CHANTIERS':
          this.garantedSubDataSeed = [
            "Dommages à l'ouvrage",
            "Erreur de conception",
            "Installation temporaire, équipements outillage et accessoires",
            "Dommages aux câbles et installations souterraines",
            "Frais de déblais et de démolition",
            "Responsabilité Civile + RC Croisée",
            "Dommages immatériels consécutifs",
            "Dommages aux biens existants et avoisinants",
            "Honoraires d'Expert",
            "GEMP",
            "Heures supplémentaire, Travail de nuit, de jours fériés et de dimanche",
            "Vol ou tentative de vol",
            "Maintenance - Visite - Etendue",
            "Défense et Recours",
            "Engins de chantiers",
          ]
          break;
        case 'RC DECENNALE':
          this.garantedSubDataSeed = [
            "Défense et Recours",
            "Honoraires d'Expert",
            "Dommage à l'ouvrage"
          ]
          break;
        case "Vol avec agression dans les locaux":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport"
          ]
          break;
        case "Vol en coffre-fort":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport"
          ]
          break;
        case "Vol en chambre-forte":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport"
          ]

          break;
        case "Vol":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport",
            "Contenu",
            "Détériorations mobilières et immobilières",
            "Honoraires d'Expert"
          ]

          break;
        case "Vol en caisses":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport"
          ]

          break;
        case "Vol guichet automatique par carte  au 1 er risque":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport"
          ]

          break;
        case "Vols par enlèvement de coffres-fort, chambres fortes et GAB":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport"
          ]

          break;
        case "Faux paiement":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport"
          ]

          break;
        case "Détournement/Fraude":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport"
          ]

          break;
        case "Fraude informatique":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport"
          ]

          break;
        case "Détériration mobilières et immobilières":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport"
          ]

          break;
        case "Honoraires d'expert":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport"
          ]

          break;
        case "Vol en cours de transport":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport"
          ]

          break;



        case 'BRIS DE MACHINES POSTES MOBILES':
          this.garantedSubDataSeed =
            [
              "BRIS DE MACHINES POSTES MOBILES",
              "Dommages",
              "incendie",
              "Perte d'exploitation",
              "Honoraires d'Expert"
            ]
          break;
        case 'BRIS DE MACHINES POSTES FIXES':
          this.garantedSubDataSeed = [
            "BRIS DE MACHINES POSTES FIXES",
            "Dommages",
            "Incendie",
            "Perte d'exploitation",
            "Honoraires d'Expert"
          ]
          break;
        case "Responsabilité Civile Exploitation":
          this.garantedSubDataSeed = [
            "Dommages Corporels",
            "Dommages Matériels et immatériels",
            "Dommages Immatériels consécutifs",
            "FMP",
            "Faute inexcusable",
            "Maladies professionnelles",
            "Intoxication alimentaires des employés",
            "RC vol par les préposés",
            "Rc incendie Explosion hors locaux permanents de l'assuré",
            "RC Dégâts des Eaux hors locaux permanents de l'assuré",
            "Individuelle accidents",
            "Honoraires d'Expert"
          ]
          break;
        case "Responsabilité Civile Professionnelle":
          this.garantedSubDataSeed = [
            "Tous dommages confondus par sinistre et par année d'assurance",
            "Gestiion non adossé à un contrat d'assurance",
            "Honoraires d'Expert",
            "FMP"
          ]
          break;
        case "Défense et Recours":
          this.garantedSubDataSeed = [
            "Défense et Recours",
            "Honoraires d'Expert "
          ]
          break;
        case 'Accidents caractérisés':
          this.garantedSubDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "Avaries Particulières",
            "Avaries communes",
            "Corps",
            "Honoraires d'Expert",
          ]
          break;
        case 'TOUS RISQUES':
          this.garantedSubDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "Avaries Particulières",
            "Avaries communes",
            "Corps",
            "Honoraires d'Expert",
          ]
          break;
        case 'Risques spéciaux':
          this.garantedSubDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "Avaries Particulières",
            "Avaries communes",
            "Corps",
            "Honoraires d'Expert",
          ]
          break;
        case 'Chargement déchargement':
          this.garantedSubDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "Avaries Particulières",
            "Avaries communes",
            "Corps",
            "Honoraires d'Expert",
          ]
          break;
        case 'Risque de guerre et assimiles':
          this.garantedSubDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "Avaries Particulières",
            "Avaries communes",
            "Corps",
            "Honoraires d'Expert",
          ]
          break;
        case 'FAP SAUF':
          this.garantedSubDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "Avaries Particulières",
            "Avaries communes",
            "Corps",
            "Honoraires d'Expert",
          ]
          break;
        case 'RC':
          this.garantedSubDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "Avaries Particulières",
            "Avaries communes",
            "Corps",
            "Honoraires d'Expert",
          ]
          break;
        case 'Travel Assurance':
          this.garantedSubDataSeed = [
            "Travel Assurance",
            "Assistance"
          ]
          break;
        case 'Assistance':
          this.garantedSubDataSeed = [
            "Travel Assurance",
            "Assistance"
          ]
          break;

        default:
          console.log(`Sorry, we are out of .`);
      }
      if (this.adnewObject.agencyCode != 0) {
        brokerInfo = defaultMethods.getBrokerInfo(
          this.brokerListe,
          this.adnewObject.agencyCode
        );
        // console.log(brokerInfo);
        // alert(this.adnewObject.agencyCode)
        // alert(JSON.stringify(this.brokerListe));
        if (brokerInfo != "") {
          this.adnewObject.broker = brokerInfo[0].name;
          this.adnewObject.brokerType = brokerInfo[0].nature;
        }
      }
      // if (this.firstSelect != 1) {
      this.getmInventorySimulate({ id: this.sinisterSelectId }).then((res) => {
        // alert(JSON.stringify(res))
        // alert(Number(this.adnewObject.psap) + Number(this.adnewObject.bonusMalus) + Number(this.previewBonus))
        this.adnewObject.updatedPsap = Number(this.adnewObject.psap) + Number(this.adnewObject.bonusMalus) + Number(this.previewBonus) - Number(res.totalCompensationToBeReceived) - Number(res.previousTotalCompensationToBeReceived)
        // alert(this.adnewObject.updatedPsap)
      })
      // }

      this.firstSelect = 0


      // const today = new Date();
      // const yyyy = today.getFullYear();
      // let mm = today.getMonth() + 1; // Months start at 0!
      // let dd = today.getDate();

      // if (dd < 10) dd = '0' + dd;
      // if (mm < 10) mm = '0' + mm;

      // const formattedToday = yyyy + '-' + mm + '-' + dd;
      // this.adnewObject.updatedPsapDate = formattedToday


      // alert(JSON.stringify(brokerInfo));
    },
    async docShow(item) {
      try {
        return new Promise((resolve, reject) => {
          // alert(JSON.stringify(item));
          let myID = "";
          if (item._id) {
            myID = item._id;
          } else {
            myID = item.id;
          }
          this.getVictimesDoc({ id: myID })
            .then((res) => {
              resolve(true);

              this.victimModal = Object.assign({}, this.Victime);
              if (this.Victime.otherInfo) {
                this.documentsProvides =
                  this.victimModal.otherInfo.documentsProvided ?? [];

                if (this.documentsProvides != []) {
                  // alert(JSON.stringify(this.victimModal.otherInfo.documentsProvided));
                  this.selectedDocumentsModal = this.documentsProvides;
                  this.documentsAlreadyProvides = this.seedDoc(
                    this.documentsProvides,
                    true
                  );
                  this.selectedProduct = this.seedDoc(
                    this.documentsProvides,
                    true
                  );
                }
              }
              this.victimeDialogModal = true;
              console.log(res);
            })
            .catch((error) => {
              reject(error);
            });
        });
      } catch (error) {
        alert(error);
      }
    },
    // this.editedIndex = this.adnewObject.indexOf(item);
    // this.adnewObject = Object.assign({}, item);

    addNewVictimeMail() {
      this.adnewObjectMail = {};
      this.addFileMail = true;
    },
    addNewVictime() {
      this.adnewObject = {};
      this.addFile = true;
    },
    addNewSinisterVictime() {
      this.victimeFormData = {};
      this.addNewVictimeFile = true;
      // alert(JSON.stringify()
      switch (this.sinisterSelectInfo.product.name) {

        case 'Individuelle accidents':
          this.garantedDataSeed = [
            "FMP",
            "ITT",
            "INVALIDITE",
            "DECES"]
          break;
        case 'AUTOMOBILE':
          this.garantedDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "Assistance routière",
            "Remboursement anticipé",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "Multirisque habitation":
          this.garantedDataSeed = [
            "INCENDIE/EXPLOSION/FOUDRE",
            "VOL",
            "DEGATS DES EAUX",
            "BRIS DE GLACE",
            "RESPONSABILITE ",
            "BRIS DE MACHINES",
            "TOUS RISQUES INFORMATIQUES",
            "Perte d'exploitation",
            "Tempètes Ouragan Cyclone",
            "Risques spéciaux",
            "Dommage aux appareils électriques",
            "Frais de déblais & de démolition"
          ]
          break;

        case "Multirisque Professionnelle":
          this.garantedDataSeed = [
            "INCENDIE/EXPLOSION/FOUDRE",
            "VOL",
            "DEGATS DES EAUX",
            "BRIS DE GLACE",
            "RESPONSABILITE ",
            "BRIS DE MACHINES",
            "TOUS RISQUES INFORMATIQUES",
            "Perte d'exploitation",
            "Tempètes Ouragan Cyclone",
            "Risques spéciaux",
            "Dommage aux appareils électriques",
            "Frais de déblais & de démolition"
          ]
          break;

        case "Tous Risques Sauf":
          this.garantedDataSeed = [
            "INCENDIE/EXPLOSION/FOUDRE",
            "VOL",
            "DEGATS DES EAUX",
            "BRIS DE GLACE",
            "RESPONSABILITE ",
            "BRIS DE MACHINES",
            "TOUS RISQUES INFORMATIQUES",
            "Perte d'exploitation",
            "Tempètes Ouragan Cyclone",
            "Risques spéciaux",
            "Dommage aux appareils électriques",
            "Frais de déblais & de démolition"
          ]
          break;
        case "GLOBALES DOMMAGES":
          this.garantedDataSeed = [
            "INCENDIE/EXPLOSION/FOUDRE",
            "VOL",
            "DEGATS DES EAUX",
            "BRIS DE GLACE",
            "RESPONSABILITE ",
            "BRIS DE MACHINES",
            "TOUS RISQUES INFORMATIQUES",
            "Perte d'exploitation",
            "Tempètes Ouragan Cyclone",
            "Risques spéciaux",
            "Dommage aux appareils électriques",
            "Frais de déblais & de démolition"
          ]
          break;

        case
          "TOUS RISQUES CHANTIERS"
          :
          this.garantedDataSeed = [
            "TOUS RISQUES CHANTIERS",
          ]
          break;
        case
          "RC DECENNALE"
          :
          this.garantedDataSeed = [
            "RC DECENNALE", "Responsabilité Civile Exploitation"
          ]
          break;
        case
          "GLOBALE BANQUE"
          :
          this.garantedDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détérioration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport",
            "Vol",
          ]
          break;
        case
          "BRIS DE MACHINES POSTES MOBILES"
          :
          this.garantedDataSeed = [
            "BRIS DE MACHINES POSTES MOBILES",
          ]
          break;
        case
          "BRIS DE MACHINES POSTES FIXES"
          :
          this.garantedDataSeed = [
            "BRIS DE MACHINES POSTES FIXES"
          ]
          break;
        case
          "RC AUTRES PROFESSIONS":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case
          "RC SPORTS":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        // case

        //   "RC DECENNALE":

        //   this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
        //   break;
        case

          "RC DIVERS":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case

          "RC PROFESSIONS MEDICALES PARA-MEDICALE":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case

          "RC EXPOSITIONS":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case


          "RC MANIFESTATIONS SPORTIVES":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case

          "RC Scolaire":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case

          "RC PARTICULIER":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case

          "RC EXPLOITATION":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case

          "RC Exploitation Industrielle et Commerciale":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case
          "RC Entreprises Bâtiment et Génie Civil"
          :
          this.garantedDataSeed = ["Responsabilité Civile Professionnelle"]
          break;
        case
          "RC EXCURSIONS"
          :
          this.garantedDataSeed = ["Responsabilité Civile Professionnelle"]
          break;
        case
          "RC COLONIE DE VACANCES "
          :
          this.garantedDataSeed = ["Responsabilité Civile Professionnelle"]
          break;
        case
          "RC ASSOCIATION SPORTIVES"
          :
          this.garantedDataSeed = ["Responsabilité Civile Professionnelle"]
          break;
        case "RC ASSOCIATIONS":
          this.garantedDataSeed = ["Défense et Recours"]
          break;
        case
          "RC PROFESSIONS JURIQUES":
          this.garantedDataSeed = ["Défense et Recours"]
          break;
        case
          "RC Entreprises Industrielles et Commerciales":
          this.garantedDataSeed = ["Défense et Recours"]
          break;

        case 'Facultés MARITIMES':
          this.garantedDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "FAP SAUF",
            "RC"
          ]
          break;
        case 'FACULTES AERIENNES':
          this.garantedDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "FAP SAUF",
            "RC"
          ]
          break;
        case 'RC FACULTES TERRESTRES':
          this.garantedDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "FAP SAUF",
            "RC"
          ]
          break;
        case 'CORPS MARITIMES':
          this.garantedDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "FAP SAUF",
            "RC"
          ]
          break;
        case 'Autres RC':
          this.garantedDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "FAP SAUF",
            "RC"
          ]
          break;
        case 'Autres corps':
          this.garantedDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "FAP SAUF",
            "RC"
          ]
          break;
        case 'RC Transport':
          this.garantedDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "FAP SAUF",
            "RC"
          ]
          break;
        case 'RC NAVIGATION DE PLAISANCE':
          this.garantedDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "FAP SAUF",
            "RC"
          ]
          break;
        case 'Assistance Voyageur':
          this.garantedDataSeed = ["Assistance", "Travel Assurance"]
          break;
        default:
          console.log(`Sorry, we are out of .`);
      }


    },
    async getPlaintListe() {
      await this.getPlaint({
        id: this.victimeFormData._id,
      });
      this.todos = this.plaint
    },
    async upDateNewSinisterVictime(item) {
      this.victimeFormData = Object.assign({}, item);
      this.victimeFormData.thirdPartyCompany = item.thirdPartyCompany
        ? item.thirdPartyCompany.name
        : "";
      this.victimeFormData.product = item.product
        ? item.product.name
        : "";
      // alert(JSON.stringify(this.victimeFormData));
      this.actualiseVictimeWaranty()
      await this.getPlaintListe()

      // alert(JSON.stringify(this.adnewObject.waranty))


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
      this.indemnityData.forEach(async (item) => {

        const schema = {
          sinisterNumber: item.sinisterNumber,
          name: item.customerName,
          psap: Number(item.psap),
          operationType: item.operationType,
          subscriberNumber: item.subscriberNumber,
          subscriberName: item.subscriberName,
          sinisterYear: item.sinisterYear,
          customerNumber: item.customerNumber,
          category: item.category,
          openingDate: item.openingDate,
          nature: item.nature,
          initialPsapDate: item.initialPsapDate,
          updatedPsap: item.updatedPsap,
          thirdPartyCompany: item.thirdPartyCompany,
          thirdPartyRegistration: item.thirdPartyRegistration,
          thirdPartyName: item.thirdPartyName,
          amendmentNumber: item.amendmentNumber,
          agencyCode: item.agencyCode,
          sinisterPlace: item.sinisterPlace,
          vehicleRegistration: item.vehicleRegistration,
          policeNumber: item.policeNumber,
          sinisterDate: item.sinisterDate,
          declarationDate: item.declarationDate,
          product: defaultMethods.getItemId(this.Products, item.product),
          observation: item.observation,
          effectDate: item.effectDate,
          dueDate: item.dueDate,
        };
        await addFileForm({ schema });
      });
      // await addFileJson(this.indemnityData);
      // defaultMethods.dispatchSuccess(
      //   this.$store,
      //   messages.createdSuccessfully("data")
      // );
      this.loading = false;
      this.addFileExcel = false;
      await this.initFiles();
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
    actualiseVictimeWaranty() {
      // alert(this.victimeFormData.waranty)
      // garantie   adnewObject.subWaranty  garantedSubDataSeed    garantedDataSeed
      switch (this.victimeFormData.product) {

        case 'Individuelle accidents':
          this.garantedDataSeed = [
            "FMP",
            "ITT",
            "INVALIDITE",
            "DECES"]
          break;
        // case 'DOMMAGES CORPORELS':
        //   this.productListeData = ["Individuelle accidents"]
        //   break;
        case 'Automobile':
          this.garantedDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "Assistance routière",
            "Remboursement anticipé",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;


        case "Multirisque habitation":
          this.garantedDataSeed = [
            "INCENDIE/EXPLOSION/FOUDRE",
            "VOL",
            "DEGATS DES EAUX",
            "BRIS DE GLACE",
            "RESPONSABILITE ",
            "BRIS DE MACHINES",
            "TOUS RISQUES INFORMATIQUES",
            "Perte d'exploitation",
            "Tempètes Ouragan Cyclone",
            "Risques spéciaux",
            "Dommage aux appareils électriques",
            "Frais de déblais & de démolition"
          ]
          break;

        case "Multirisque Professionnelle":
          this.garantedDataSeed = [
            "INCENDIE/EXPLOSION/FOUDRE",
            "VOL",
            "DEGATS DES EAUX",
            "BRIS DE GLACE",
            "RESPONSABILITE ",
            "BRIS DE MACHINES",
            "TOUS RISQUES INFORMATIQUES",
            "Perte d'exploitation",
            "Tempètes Ouragan Cyclone",
            "Risques spéciaux",
            "Dommage aux appareils électriques",
            "Frais de déblais & de démolition"
          ]
          break;

        case "Tous Risques Sauf":
          this.garantedDataSeed = [
            "INCENDIE/EXPLOSION/FOUDRE",
            "VOL",
            "DEGATS DES EAUX",
            "BRIS DE GLACE",
            "RESPONSABILITE ",
            "BRIS DE MACHINES",
            "TOUS RISQUES INFORMATIQUES",
            "Perte d'exploitation",
            "Tempètes Ouragan Cyclone",
            "Risques spéciaux",
            "Dommage aux appareils électriques",
            "Frais de déblais & de démolition"
          ]
          break;
        case "GLOBALES DOMMAGES":
          this.garantedDataSeed = [
            "INCENDIE/EXPLOSION/FOUDRE",
            "VOL",
            "DEGATS DES EAUX",
            "BRIS DE GLACE",
            "RESPONSABILITE ",
            "BRIS DE MACHINES",
            "TOUS RISQUES INFORMATIQUES",
            "Perte d'exploitation",
            "Tempètes Ouragan Cyclone",
            "Risques spéciaux",
            "Dommage aux appareils électriques",
            "Frais de déblais & de démolition"
          ]
          break;

        case
          "TOUS RISQUES CHANTIERS"
          :
          this.garantedDataSeed = [
            "TOUS RISQUES CHANTIERS",
          ]
          break;
        case
          "RC DECENNALE"
          :
          this.garantedDataSeed = [
            "RC DECENNALE", "Responsabilité Civile Exploitation"
          ]
          break;
        case
          "GLOBALE BANQUE"
          :
          this.garantedDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détérioration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport",
            "Vol",
          ]
          break;
        case
          "BRIS DE MACHINES POSTES MOBILES"
          :
          this.garantedDataSeed = [
            "BRIS DE MACHINES POSTES MOBILES",
          ]
          break;
        case
          "BRIS DE MACHINES POSTES FIXES"
          :
          this.garantedDataSeed = [
            "BRIS DE MACHINES POSTES FIXES"
          ]
          break;
        case
          "RC AUTRES PROFESSIONS":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case
          "RC SPORTS":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        // case

        //   "RC DECENNALE":

        //   this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
        //   break;
        case

          "RC DIVERS":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case

          "RC PROFESSIONS MEDICALES PARA-MEDICALE":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case

          "RC EXPOSITIONS":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case


          "RC MANIFESTATIONS SPORTIVES":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case

          "RC Scolaire":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case

          "RC PARTICULIER":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case

          "RC EXPLOITATION":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case

          "RC Exploitation Industrielle et Commerciale":

          this.garantedDataSeed = ["Responsabilité Civile Exploitation"]
          break;
        case
          "RC Entreprises Bâtiment et Génie Civil"
          :
          this.garantedDataSeed = ["Responsabilité Civile Professionnelle"]
          break;
        case
          "RC EXCURSIONS"
          :
          this.garantedDataSeed = ["Responsabilité Civile Professionnelle"]
          break;
        case
          "RC COLONIE DE VACANCES "
          :
          this.garantedDataSeed = ["Responsabilité Civile Professionnelle"]
          break;
        case
          "RC ASSOCIATION SPORTIVES"
          :
          this.garantedDataSeed = ["Responsabilité Civile Professionnelle"]
          break;
        case "RC ASSOCIATIONS":
          this.garantedDataSeed = ["Défense et Recours"]
          break;
        case
          "RC PROFESSIONS JURIQUES":
          this.garantedDataSeed = ["Défense et Recours"]
          break;
        case
          "RC Entreprises Industrielles et Commerciales":
          this.garantedDataSeed = ["Défense et Recours"]
          break;

        case 'Facultés MARITIMES':
          this.garantedDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "FAP SAUF",
            "RC"
          ]
          break;
        case 'FACULTES AERIENNES':
          this.garantedDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "FAP SAUF",
            "RC"
          ]
          break;
        case 'RC FACULTES TERRESTRES':
          this.garantedDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "FAP SAUF",
            "RC"
          ]
          break;
        case 'CORPS MARITIMES':
          this.garantedDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "FAP SAUF",
            "RC"
          ]
          break;
        case 'Autres RC':
          this.garantedDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "FAP SAUF",
            "RC"
          ]
          break;
        case 'Autres corps':
          this.garantedDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "FAP SAUF",
            "RC"
          ]
          break;
        case 'RC Transport':
          this.garantedDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "FAP SAUF",
            "RC"
          ]
          break;
        case 'RC NAVIGATION DE PLAISANCE':
          this.garantedDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "FAP SAUF",
            "RC"
          ]
          break;
        case 'Assistance Voyageur':
          this.garantedDataSeed = ["Assistance", "Travel Assurance"]
          break;
        default:
          console.log(`Sorry, we are out of .`);
      }
      // Sous garantie   adnewObject.subWaranty  garantedSubDataSeed    garantedDataSeed
      switch (this.victimeFormData.waranty) {
        case "FMP":
          this.garantedSubDataSeed = [
            "FMP",
            "ITT",
            "INVALIDITE",
            "DECES"]
          break;
        case
          "ITT":
          this.garantedSubDataSeed = [
            "FMP",
            "ITT",
            "INVALIDITE",
            "DECES"]
          break;
        case
          "INVALIDITE":
          this.garantedSubDataSeed = [
            "FMP",
            "ITT",
            "INVALIDITE",
            "DECES"]
          break;
        case
          "DECES":
          this.garantedSubDataSeed = [
            "FMP",
            "ITT",
            "INVALIDITE",
            "DECES"]
          break;

        case "RC":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "CEDEAO":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "DEFENSE ET RECOURS":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "INDIVIDUELLE CONDUCTEUR":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "Assistance routière":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "Remboursement anticipé":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "PROTECTION ILLIMITEE":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "BRIS DE GLACE":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION",
            "Dommages aux glaces",
            "Frais de cloture provisoire",
            "Honoraires d'Expert"
          ]
          break;
        case "INCENDIE":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "VOL":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "TOUS RISQUES":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "MINI TOUS RISQUES":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "VOL ACCESSOIRES":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "VANDALISME":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;
        case "TIERCE COLLISION":
          this.garantedSubDataSeed = [
            "RC",
            "CEDEAO",
            "DEFENSE ET RECOURS",
            "INDIVIDUELLE CONDUCTEUR",
            "FMP",
            "Collisions",
            "INVALIDITE",
            "Dommages",
            "Dommages avec franchise",
            "Dommages sans franchise",
            "Assistance routière",
            "Remboursement anticipé",
            "DECES",
            "PROTECTION ILLIMITEE",
            "BRIS DE GLACE",
            "INCENDIE",
            "VOL",
            "TOUS RISQUES",
            "MINI TOUS RISQUES",
            "MINI TOUS RISQUES AVEC FRANCHISE",
            "MINI TOUS RISQUES SANS FRANCHISE",
            "VOL ACCESSOIRES",
            "VANDALISME",
            "TIERCE COLLISION"
          ]
          break;

        case "INCENDIE/EXPLOSION/FOUDRE":
          this.garantedSubDataSeed = [
            "Sous-garantie",
            "Contenu (Mobilier & Matériels)",
            "Privation de jouissance",
            "Perte d'usage",
            "Perte de loyer",
            "Recours des voisins et tiers",
            "Dommages aux appareils électriques",
            "Pertes indirectes",
            "RLS",
            "RLO",
            "Aménagements",
            "Marchandises",
            "Frais de déblai et de démolition",
            "Frais de mise en conformité",
            "Frais et Honoraires d'expert",
            "Risques spéciaux",
            "Honoraires d'Expert",
          ]
          break;
        // case "VOL":
        //   this.garantedSubDataSeed = [

        //   ]
        //   break;
        case
          "DEGATS DES EAUX":
          this.garantedSubDataSeed = [
            "Contenu",
            "Bâtiment & contenu",
            "Bâtiment",
            "Frais de recherche de fuite",
            "Honoraires d'Expert",
          ]
          break;
        // case "BRIS DE GLACE"
        //   :
        //   this.garantedSubDataSeed = [

        //   ]
        //   break;
        case "RESPONSABILITE":
          this.garantedSubDataSeed = [
            "Dommages corporels",
            "Dommages matériels / Evènements",
            "Voyage séjour",
            "Défense et Recours",
            "Honoraires d'Expert"
          ]
          break;
        case 'BRIS DE MACHINES':
          this.garantedSubDataSeed = [
            "Honoraires d'Expert",
            "bris de machines"
          ]
          break;
        case 'TOUS RISQUES INFORMATIQUES':
          this.garantedSubDataSeed = [
            "Matériel informatique",
            "Frais supplémentaires",
            "Reconstitution des médias",
            "Honoraires d'Expert",
          ]
          break;
        case "Perte d'exploitation":
          this.garantedSubDataSeed = [
            "Perte d'exploitation",
            "Honoraires d'Expert"
          ]
          break;
        case "Tempètes Ouragan Cyclone":
          this.garantedSubDataSeed = [
            "Tempètes Ouragan Cyclone"
          ]
          break;
        case "Risques spéciaux":
          this.garantedSubDataSeed = [
            "Risques spéciaux"
          ]
          break;
        case "Dommage aux appareils électriques":
          this.garantedSubDataSeed = [
            "Dommage aux appareils électriques"
          ]
          break;
        case "Frais de déblais & de démolition":
          this.garantedSubDataSeed = [
            "Frais de déblais & de démolition"
          ]
          break;

        case 'TOUS RISQUES CHANTIERS':
          this.garantedSubDataSeed = [
            "Dommages à l'ouvrage",
            "Erreur de conception",
            "Installation temporaire, équipements outillage et accessoires",
            "Dommages aux câbles et installations souterraines",
            "Frais de déblais et de démolition",
            "Responsabilité Civile + RC Croisée",
            "Dommages immatériels consécutifs",
            "Dommages aux biens existants et avoisinants",
            "Honoraires d'Expert",
            "GEMP",
            "Heures supplémentaire, Travail de nuit, de jours fériés et de dimanche",
            "Vol ou tentative de vol",
            "Maintenance - Visite - Etendue",
            "Défense et Recours",
            "Engins de chantiers",
          ]
          break;
        case 'RC DECENNALE':
          this.garantedSubDataSeed = [
            "Défense et Recours",
            "Honoraires d'Expert",
            "Dommage à l'ouvrage"
          ]
          break;
        case "Vol avec agression dans les locaux":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport"
          ]
          break;
        case "Vol en coffre-fort":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport"
          ]
          break;
        case "Vol en chambre-forte":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport"
          ]

          break;
        case "Vol":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport",
            "Contenu",
            "Détériorations mobilières et immobilières",
            "Honoraires d'Expert"
          ]

          break;
        case "Vol en caisses":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport"
          ]

          break;
        case "Vol guichet automatique par carte  au 1 er risque":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport"
          ]

          break;
        case "Vols par enlèvement de coffres-fort, chambres fortes et GAB":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport"
          ]

          break;
        case "Faux paiement":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport"
          ]

          break;
        case "Détournement/Fraude":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport"
          ]

          break;
        case "Fraude informatique":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport"
          ]

          break;
        case "Détériration mobilières et immobilières":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport"
          ]

          break;
        case "Honoraires d'expert":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport"
          ]

          break;
        case "Vol en cours de transport":
          this.garantedSubDataSeed = [
            "Vol avec agression dans les locaux",
            "Vol en coffre-fort",
            "Vol en chambre-forte",
            "Vol",
            "Vol en caisses",
            "Vol guichet automatique par carte  au 1 er risque",
            "Vols par enlèvement de coffres-fort, chambres fortes et GAB",
            "Faux paiement",
            "Détournement/Fraude",
            "Fraude informatique",
            "Détériration mobilières et immobilières",
            "Honoraires d'expert",
            "Vol en cours de transport"
          ]

          break;



        case 'BRIS DE MACHINES POSTES MOBILES':
          this.garantedSubDataSeed =
            [
              "BRIS DE MACHINES POSTES MOBILES",
              "Dommages",
              "incendie",
              "Perte d'exploitation",
              "Honoraires d'Expert"
            ]
          break;
        case 'BRIS DE MACHINES POSTES FIXES':
          this.garantedSubDataSeed = [
            "BRIS DE MACHINES POSTES FIXES",
            "Dommages",
            "Incendie",
            "Perte d'exploitation",
            "Honoraires d'Expert"
          ]
          break;
        case "Responsabilité Civile Exploitation":
          this.garantedSubDataSeed = [
            "Dommages Corporels",
            "Dommages Matériels et immatériels",
            "Dommages Immatériels consécutifs",
            "FMP",
            "Faute inexcusable",
            "Maladies professionnelles",
            "Intoxication alimentaires des employés",
            "RC vol par les préposés",
            "Rc incendie Explosion hors locaux permanents de l'assuré",
            "RC Dégâts des Eaux hors locaux permanents de l'assuré",
            "Individuelle accidents",
            "Honoraires d'Expert"
          ]
          break;
        case "Responsabilité Civile Professionnelle":
          this.garantedSubDataSeed = [
            "Tous dommages confondus par sinistre et par année d'assurance",
            "Gestiion non adossé à un contrat d'assurance",
            "Honoraires d'Expert",
            "FMP"
          ]
          break;
        case "Défense et Recours":
          this.garantedSubDataSeed = [
            "Défense et Recours",
            "Honoraires d'Expert "
          ]
          break;
        case 'Accidents caractérisés':
          this.garantedSubDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "Avaries Particulières",
            "Avaries communes",
            "Corps",
            "Honoraires d'Expert",
          ]
          break;
        case 'TOUS RISQUES':
          this.garantedSubDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "Avaries Particulières",
            "Avaries communes",
            "Corps",
            "Honoraires d'Expert",
          ]
          break;
        case 'Risques spéciaux':
          this.garantedSubDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "Avaries Particulières",
            "Avaries communes",
            "Corps",
            "Honoraires d'Expert",
          ]
          break;
        case 'Chargement déchargement':
          this.garantedSubDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "Avaries Particulières",
            "Avaries communes",
            "Corps",
            "Honoraires d'Expert",
          ]
          break;
        case 'Risque de guerre et assimiles':
          this.garantedSubDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "Avaries Particulières",
            "Avaries communes",
            "Corps",
            "Honoraires d'Expert",
          ]
          break;
        case 'FAP SAUF':
          this.garantedSubDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "Avaries Particulières",
            "Avaries communes",
            "Corps",
            "Honoraires d'Expert",
          ]
          break;
        case 'RC':
          this.garantedSubDataSeed = [
            "Accidents caractérisés",
            "TOUS RISQUES",
            "Risques spéciaux",
            "Chargement déchargement",
            "Risque de guerre et assimiles",
            "Avaries Particulières",
            "Avaries communes",
            "Corps",
            "Honoraires d'Expert",
          ]
          break;
        case 'Travel Assurance':
          this.garantedSubDataSeed = [
            "Travel Assurance",
            "Assistance"
          ]
          break;
        case 'Assistance':
          this.garantedSubDataSeed = [
            "Travel Assurance",
            "Assistance"
          ]
          break;

        default:
          console.log(`Sorry, we are out of .`);
      }

    },
    async addVictimesFileFormModal() {
      this.loading = true;
      // alert(JSON.stringify(this.victimeFormData.product))
      try {
        const schema = {
          sinister: this.sinsiterSelectId,
          followed: this.victimeFormData.followed,
          fullName: this.victimeFormData.fullName,
          phone: this.victimeFormData.phone,
          vehicleRegistration: this.victimeFormData.vehicleRegistration,

          operationType: this.victimeFormData.operationType,
          thirdPartyCompany: defaultMethods.getItemId(
            this.agency,
            this.victimeFormData.thirdPartyCompany
          ),
          socioProfessionalSituation: this.victimeFormData.socioProfessionalSituation,
          civility: this.victimeFormData.civility,
          product: defaultMethods.getItemId(this.Products, this.victimeFormData.product),
          waranty: this.victimeFormData.waranty,
          subWaranty: this.victimeFormData.subWaranty,
          age: this.victimeFormData.age,
          underCover: this.victimeFormData.underCover,
          vehicleBrand: this.victimeFormData.vehicleBrand,
          responsibilityRate: this.victimeFormData.responsibilityRate,
          status: this.victimeFormData.status,
          settlementAmount: this.victimeFormData.settlementAmount,
          observation: this.victimeFormData.observation,
        };
        // if (this.victimeFormData.operationType == "Demande PV") {
        //   await addOperationTypeForm({ schema });
        // }
        // alert(schema.thirdPartyCompany);
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
      this.addNewVictimeFile = false;
      await this.getVictimes({ sinister: this.sinsiterSelectId });
      this.victimesListeData = this.victimeListe;
    },
    seedObligation() {
      this.valueEnd = [];
      if (
        this.adnewObject.sinisterNumber == "" ||
        this.adnewObject.sinisterNumber == "_"
      ) {
        this.valueEnd.push(this.textColoneError[0]);
      }
      if (this.adnewObject.name == "" || this.adnewObject.name == "_") {
        this.valueEnd.push(this.textColoneError[1]);
      }
      if (
        this.adnewObject.operationType == "" ||
        this.adnewObject.operationType == "_"
      ) {
        this.valueEnd.push(this.textColoneError[2]);
      }
      // if (this.adnewObject.sinisterYear == "") {
      //   this.valueEnd.push(this.textColoneError[3]);
      // }
      // if (this.adnewObject.agencyCode == "") {
      //   this.valueEnd.push(this.textColoneError[4]);
      // }
      // if (this.adnewObject.BrokerName == "") {
      //   this.valueEnd.push(this.textColoneError[5]);
      // }
      // if (this.adnewObject.brokerType == "") {
      //   this.valueEnd.push(this.textColoneError[6]);
      // }
      // if (this.adnewObject.category == "") {
      //   this.valueEnd.push(this.textColoneError[7]);
      // }
      if (
        this.adnewObject.policeNumber == "" ||
        this.adnewObject.policeNumber == "_"
      ) {
        this.valueEnd.push(this.textColoneError[8]);
      }
      if (
        this.adnewObject.sinisterDate == "" ||
        this.adnewObject.sinisterDate == "_"
      ) {
        this.valueEnd.push(this.textColoneError[9]);
      }
      if (
        this.adnewObject.declarationDate == "" ||
        this.adnewObject.declarationDate == "_"
      ) {
        this.valueEnd.push(this.textColoneError[10]);
      }
      if (
        this.adnewObject.sinisterPlace == "" ||
        this.adnewObject.sinisterPlace == "_"
      ) {
        this.valueEnd.push(this.textColoneError[11]);
      }
      if (
        this.adnewObject.vehicleRegistration == "" ||
        this.adnewObject.vehicleRegistration == "_"
      ) {
        this.valueEnd.push(this.textColoneError[12]);
      }
      if (this.adnewObject.product == "" || this.adnewObject.product == "_") {
        this.valueEnd.push(this.textColoneError[13]);
      }
      // if (this.adnewObject.psap == "") {
      //   this.valueEnd.push(this.textColoneError[14]);
      // }
      if (
        this.adnewObject.effectDate == "" ||
        this.adnewObject.effectDate == "_"
      ) {
        this.valueEnd.push(this.textColoneError[15]);
      }
      if (this.adnewObject.dueDate == "" || this.adnewObject.dueDate == "_") {
        this.valueEnd.push(this.textColoneError[16]);
      }
      if (this.valueEnd == "") {
        this.addFileFormModal();
      } else {
        this.alertWarning = true;
      }
    },
    async addFileFormModal() {
      this.loading = true;
      // alert(this.adnewObject.updatedPsap)



      // this.adnewObject.product alert(JSON.stringify(this.adnewObject.operationType));
      try {
        const schema = {
          sinisterNumber: this.adnewObject.sinisterNumber,
          name: this.adnewObject.name,
          psap: this.adnewObject.psap,
          // fileClosingDate: this.adnewObject.fileClosingDate,
          subscriberNumber: this.adnewObject.subscriberNumber,
          subscriberName: this.adnewObject.subscriberName,
          
          customerNumber: this.adnewObject.customerNumber,
          branch: this.adnewObject.branch,
          thirdPartyRegistration: this.adnewObject.thirdPartyRegistration,
          thirdPartyName: this.adnewObject.thirdPartyName,
          thirdPartyCompany: this.adnewObject.thirdPartyCompany,
          amendmentNumber: this.adnewObject.amendmentNumber,
          waranty: this.adnewObject.waranty,
          conductorName: this.adnewObject.conductorName,
          vehicleBrand: this.adnewObject.vehicleBrand,
          subWaranty: this.adnewObject.subWaranty,
          broker: defaultMethods.getItemId(
            this.brokerListe,
            this.adnewObject.broker
          ),

          brokerType: this.adnewObject.brokerType,
          sinisterHour: this.adnewObject.sinisterHour,
          openingDate: this.adnewObject.openingDate,
          inventoryStatus: this.adnewObject.inventoryStatus,
          inventoryObservation: this.adnewObject.inventoryObservation,
          circumstance: this.adnewObject.circumstance,
          nature: this.adnewObject.nature,
          initialPsapDate: this.adnewObject.initialPsapDate,
          bonusMalus: Number(this.adnewObject.bonusMalus) + Number(this.previewBonus),
          // updatedPsapDate: this.adnewObject.updatedPsapDate,
          updatedPsap: this.adnewObject.updatedPsap,
          observationPsap: this.adnewObject.observationPsap,
          operationType:
            this.adnewObject.operationType == "Oui"
              ? "Demande PV"
              : "Déclaration",
          sinisterYear: this.adnewObject.sinisterYear,
          agencyCode: this.adnewObject.agencyCode,
          category: this.adnewObject.category,
          sinisterPlace: this.adnewObject.sinisterPlace,
          vehicleRegistration: this.adnewObject.vehicleRegistration,
          policeNumber: this.adnewObject.policeNumber,
          sinisterDate: this.adnewObject.sinisterDate,
          declarationDate: this.adnewObject.declarationDate,
          product: defaultMethods.getItemId(
            this.Products,
            this.adnewObject.product
          ),
          observation: this.adnewObject.observation,
          effectDate: this.adnewObject.effectDate,
          dueDate: this.adnewObject.dueDate,
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

    // Gestion pièces
    seedProposedProduct() {
      this.selectedProduct = this.File.proposedProducts;
      this.proposedProductNameList = defaultMethods.getNameList(
        this.File.proposedProducts
      );
    },
    seedDoc(data, isProvide = undefined) {
      const result = [];
      if (isProvide == undefined) {
        for (let i = 0; i < data.length; i++) {
          result.push({
            _id: data[i]._id,
            name: data[i].name,
          });
        }
      } else {
        for (let i = 0; i < data.length; i++) {
          if (isProvide == data[i].isProvide) {
            result.push({
              _id: data[i]._id,
              name: data[i].name,
            });
          }
        }
      }
      // alert(result);
      return result;
    },
    getProposedData(data, value, third = undefined) {
      const schema = [];
      for (let i = 0; i < data.length; i++) {
        if (third != undefined) {
          let isProvide = false;
          for (let a = 0; a < third.length; a++) {
            if (third[a]._id == data[i]._id) {
              isProvide = true;
              break;
            }
          }

          schema.push({
            isProvide,
            document: data[i]._id,
          });
        } else {
          schema.push({
            isProvide: value,
            document: data[i]._id,
          });
        }
      }
      return schema;
    },
    searchDataProduct() {
      this.findDoc();
    },
    async proposedDocuments() {
      try {
        const schema = this.getProposedData(this.selectedDocumentsModal, false);
        await manageDocumentProposed({
          id: this.victimModal._id,
          schema: { list: schema },
        });
        defaultMethods.dispatchSuccess(
          this.$store,
          messages.updatedSuccessfully("Document")
        );
        await this.docShow({ _id: this.victimModal._id });
        //this.productDialog = false;
        // this.initVictims();
        // this.getOneVictimInfo();
        // this.initDeclaration();
      } catch (error) {
        console.log(error);
        defaultMethods.dispatchError(this.$store);
      }
    },
    async providedDocuments() {
      try {
        const schema = this.getProposedData(
          this.documentsProvides,
          true,
          this.selectedProduct
        );
        await manageDocumentProposedTrue({
          id: this.victimModal._id,
          schema: { list: schema },
        });
        defaultMethods.dispatchSuccess(
          this.$store,
          messages.updatedSuccessfully("Document")
        );
        await this.docShow({ id: this.victimModal._id });

        //this.productDialog = false;
        // this.initVictims();
        // this.getOneVictimInfo();
        // this.initDeclaration();
      } catch (error) {
        console.log(error);
        defaultMethods.dispatchError(this.$store);
      }
    },
    // proposed product
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

.reclamationTitre {
  background: #3a1c71;
  background: -webkit-linear-gradient(to right, #4dd0e1, #3a1c71);
  background: linear-gradient(to right, #4dd0e1, #3a1c71);
  justify-content: "center";
  align-content: "center";
  align-items: center;
  height: 60px !important;
  margin-bottom: 20px !important;
  display: flex
}

.pageTitle {
  font-size: 10px;
  font-weight: bold;
  color: #3a1c71;

}

.textReclamation {
  color: #fff !important;
  font-size: 20px !important;
  font-weight: "bold" !important;
  justify-content: "center";
  align-content: "center";
  align-items: center;
  margin-left: 10px
}

.v-list-item {
  color: #000 !important;
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
