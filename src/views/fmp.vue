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
                <v-text-field color="#3A1C71" label="Nom victime" class="pt-5 pa-2" filled
                  prepend-inner-icon="mdi-magnify" dense v-model="victimNameSearch" outlined flat
                  background-color="grey lighten-4" rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field color="#3A1C71" label="Numéro sinistre" class="pt-5 pa-2" filled
                  prepend-inner-icon="mdi-magnify" dense v-model="sinisterNumberSearch" outlined flat
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
      <v-dialog v-model="addLot" max-width="500px">
        <v-card style="border-left: 10px solid #3A1C71">
          <v-card-title>
            <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Créer un nouveau lot de facture</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="lotFacture.batchNumber" color="#3A1C71" filled
                  label="Numéro de lot"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="lotFacture.batchDate" type="date" filled label="Date du lot"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="lotFacture.provision" disabled type="number" background-color="#4DD0E1" filled
                  v-if="lotFacture.batchDate" label="Provision globale"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="lotFacture.Bonus" type="number" background-color="#4DD0E1" filled
                  v-if="lotFacture.batchDate" label="Provision à allouer"></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error darken-1" class="mr-5" @click="addLot = false" text>
              Fermer
            </v-btn>
            <v-btn color="success darken-1" @click="addBatch()">
              Enregistrer le dossier
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template>
      <v-dialog v-model="fmpCalculator" max-width="500px">
        <v-card style="border-left: 10px solid #3A1C71">
          <v-card-title>
            <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Gestion des FMP en compte courant</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Total Fmp" color="#3A1C71" v-model="addCalculateurFmp.totalFmp" filled
                  type="number" disabled background-color="#4DD0E1"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Total Provision" color="#3A1C71" @change="makeCalcule()" type="number" filled
                  disabled background-color="#4DD0E1" v-model="addCalculateurFmp.totalProvision"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Montant dû à la victime" v-model="addCalculateurFmp.amountDueToTheVictim"
                  color="#3A1C71" type="number" filled disabled background-color="#4DD0E1"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Montant dû à la compagnie" v-model="addCalculateurFmp.amountDueToTheCompany"
                  color="#3A1C71" type="number" filled disabled background-color="#4DD0E1"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-textarea label="Observation" color="#3A1C71" filled name="input-7-1" rows="1"
                  v-model="addCalculateurFmp.observation"></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Taux de responsabilité"  v-model="addCalculateurFmp.sinisterVictim"
                  color="#3A1C71" type="number" filled disabled background-color="#4DD0E1"></v-text-field>
              </v-col>
            </v-row>
            <pre>{{ addCalculateurFmp }}</pre>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error darken-1" class="mr-5" @click="fmpCalculator = false" text>
              Fermer
            </v-btn>
            <v-btn color="success darken-1" @click="addMailFormModal()">
              Enregistrer le dossier
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="miseAjourFacture" max-width="500px">
        <v-card style="border-left: 10px solid #3A1C71">
          <v-card-title>
            <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Modification de facture</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Numéro pièce" color="#3A1C71" filled
                  v-model="factureObjet.partNumber"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Montant facture" v-model="factureObjet.invoiceAmount" color="#3A1C71"
                  filled></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-text-field filled label="Observation" color="#3A1C71"
                  v-model="factureObjet.observation"></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error darken-1" class="mr-5" @click="miseAjourFacture = false" text>
              Fermer
            </v-btn>
            <v-btn color="success darken-1" @click="updateFactureFormModal()">
              Enregistrer le dossier
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="mailVictimeCourrier" max-width="1000px">
        <v-card style="border-left: 10px solid #3A1C71;">
          <!-- {{ victimModal.otherInfo.documentsProvides }} -->
          <v-card-title>
            <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Listing des courriers</span>
          </v-card-title>

          <v-card-text>
            <v-data-table :headers="headersMail" :items="victimeMailListe" :items-per-page="10" class="elevation-0"
              loacl="fr" background-color="red" color="#3A1C71">
              <template v-slot:item="{ item }">
                <tr @click="handleClickMail(item)" class=" miniTableRow green-bg">
                  <!-- <td>
                      <v-chip :color="getColor(item.status)" dark>
                        {{ item.status }}
                      </v-chip>
                    </td> -->
                  <td>
                    {{
                      item.sinisterVictim ? item.sinisterVictim.fullName : ""
                    }}
                  </td>

                  <td>{{ item.mailNumber }}</td>
                  <td>{{ item.mailDate }}</td>
                  <td>{{ item.observation }}</td>
                </tr>
              </template>
              <template v-slot:top>
                <v-toolbar class="ml-0 pl-0" flat>
                  <v-btn class="mr-2 btnDesign" color="#3A1C71" text-color="white" pill @click="addNewVictimeMail()">
                    Enregistré un courrier
                    <v-icon class="ml-2" left>
                      mdi-plus-box-multiple
                    </v-icon>
                  </v-btn>

                  <v-spacer></v-spacer>

                </v-toolbar>
              </template>
              <template v-slot:no-data>
                <h4 class="text-h4 mb-4">pas de données</h4>
              </template></v-data-table>
          </v-card-text>
        </v-card>
      </v-dialog>
    </template>
    <template>
      <v-row class="  ml-4 mb-4 mt-5" justify="start">
        <h4 class="text-h4 pageTitle ">
          Listing des FMP
        </h4>
      </v-row>
      <v-row justify="center">
        <v-dialog v-model="addNewVictimeFile" max-width="1000px">
          <v-card style="border-left: 10px solid #3A1C71">
            <v-card-title>
              <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Détail du lot</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="Numéro lot" color="#3A1C71" disabled background-color="#4DD0E1"
                    v-model="factureObjet.batchNumber" filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="Date lot" disabled background-color="#4DD0E1" v-model="factureObjet.batchDate"
                    color="#3A1C71" type="date" filled></v-text-field>
                </v-col>
              </v-row>

              <div class="w-100 d-flex justify-space-between">
                <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Ajouter facture</span>
                <v-btn class="mx-2" fab dark small color="success" @click="addOneFacture">
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </div>
              <div v-for="(factureObjet, a) in factureModal" :key="a">
                <v-row>
                  <!-- <v-col cols="12" sm="6" md="4">
                  <v-select
                    :items="civiliteVictimes"
                    label="Civilité"
                    v-model="factureObjet.civility"
                    color="#3A1C71"
                    filled
                  ></v-select>
                </v-col> -->
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Numéro pièce" color="#3A1C71" filled
                      v-model="factureObjet.partNumber"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Montant facture" v-model="factureObjet.invoiceAmount" color="#3A1C71"
                      filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field filled label="Observation" color="#3A1C71"
                      v-model="factureObjet.observation"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="1">
                    <v-btn class="mx-2" fab dark small color="error" @click="removeFromCoin(a)">
                      <v-icon dark>
                        mdi-minus
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error darken-1" class="mr-5" @click="addNewVictimeFile = false" text>
                Fermer
              </v-btn>
              <v-btn color="success darken-1" @click="addFactureFormModal()">
                Enregistrer le dossier
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="addFile" max-width="1000px">
          <v-card style="border-left: 10px solid #3A1C71">
            <v-card-title>
              <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Enregistrer un nouveau dossier</span>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Numéro sinistre" color="#3A1C71" @change="valueChange()"
                    v-model="adnewObject.sinisterNumber" filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field @change="valueChange()" label="Nom de l'assuré" v-model="adnewObject.name" color="#3A1C71"
                    filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select :items="sinisterStatus" filled label="Type d'opération" color="#3A1C71"
                    v-model="adnewObject.operationType"></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Année sinistre" v-model="adnewObject.sinisterYear" color="#3A1C71"
                    filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Code agence" v-model="adnewObject.agencyCode" color="#3A1C71"
                    filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Catégorie" color="#3A1C71" filled v-model="adnewObject.category"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Numéro police" v-model="adnewObject.policeNumber" color="#3A1C71"
                    filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Date survenance" color="#3A1C71" filled type="date"
                    v-model="adnewObject.sinisterDate"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Date déclaration" color="#3A1C71" type="date" v-model="adnewObject.declarationDate"
                    filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Lieu sinistre" v-model="adnewObject.sinisterPlace" color="#3A1C71"
                    filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Immatriculation" v-model="adnewObject.vehicleRegistration" color="#3A1C71"
                    filled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select :items="productNameList" filled label="Produit" color="#3A1C71"
                    v-model="adnewObject.product"></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field filled label="Psap" color="#3A1C71" v-model="adnewObject.psap"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Date effet" color="#3A1C71" type="date" filled
                    v-model="adnewObject.effectDate"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Date échéance" color="#3A1C71" filled type="date"
                    v-model="adnewObject.dueDate"></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error darken-1" class="mr-5" @click="addFile = false" text>
                Fermer
              </v-btn>
              <v-btn color="success darken-1" @click="addFileFormModal()">
                Enregistrer le dossier
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="addVictime" max-width="1500px">
          <v-card style="border-left: 10px solid #3A1C71">
            <v-card-title>
              <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Calcul FMP</span>
            </v-card-title>

            <v-toolbar class="mb-10" flat>
              <v-btn class="mr-2 btnDesign" :disabled="loading" color="#3A1C71" text-color="white" pill @click="newBatch">
                Ajouter Lot
                <v-icon class="ml-2" left>
                  mdi-plus-box-multiple
                </v-icon>
              </v-btn>
              <!-- <v-btn
                class="mr-2 btnDesign"
                
                :disabled ="lotSelect"
                color="#3A1C71"
                text-color="white"
                pill
                @click="addNewSinisterVictime()"
              >
                Ajouter facture
                <v-icon class="ml-2" left>
                  mdi-plus-box-multiple
                </v-icon>
              </v-btn> -->
              <v-btn class="mr-2 btnDesign" :disabled="loading" color="#3A1C71" text-color="white" pill
                @click="(fmpCalculator = true), makeCalcule()">
                Calculateur FMP
                <v-icon class="ml-2" left>
                  mdi-plus-box-multiple
                </v-icon>
              </v-btn>

              <v-col cols="12" sm="6" md="2">
                <v-autocomplete label="Lot à imprimer" filled dense outlined flat color="#3A1C71" multiple
                  :items="batchNameAray" class="mr-5 ml-0 mb-0 mt-8 " v-model="printDoc"
                  @change="schowElement()"></v-autocomplete>
              </v-col>
              <v-btn class="mr-2 btnDesign" color="#3A1C71" text-color="white" pill @click="genereteDoc()">
                Générer le bordereau de détails FMP
                <v-icon class="ml-2" left>
                  mdi-plus-box-multiple
                </v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">s
                  <!-- <v-btn
                          color="primary"
                          dark
                          class="mb-2"
    
                        >
                          New Item
                        </v-btn> -->
                  <div class="text-center pt-2">
                    <v-pagination v-bind="attrs" v-on="on" color="#3A1C71" v-model="page"
                      :length="pageCount"></v-pagination>
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

            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="5">
                  <v-data-table :headers="headersLot" :items="batch" loacl="fr" :class="{
                    background: $vuetify.theme.themes.dark.background,
                  }" class="elevation-0">
                    <template v-slot:item="{ item }">
                      <tr @click="showFacture(item)" class=" miniTableRow green-bg">
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
                                    <v-icon size="20" @click="upDateBatchSelect(item)" v-bind="attrs" v-on="on"
                                      color="#a30b37">mdi-file-edit-outline</v-icon>
                                  </v-btn>
                                </template>
                                <span>Modification</span>
                              </v-tooltip>
                              <v-tooltip bottom color="#218380">
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn class="ml-3" icon>
                                    <v-icon size="20" @click="addMoreFacture(item)" v-bind="attrs" v-on="on"
                                      color="#218380">mdi-hospital-box-outline</v-icon>
                                  </v-btn>
                                </template>
                                <span>Ajouter des factures</span>
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
                        <td>{{ item.batchNumber }}</td>
                        <td>{{ item.batchDate }}</td>
                        <td>{{ item.provision }}</td>
                      </tr>
                    </template>

                    <!-- <template v-slot:item.actions="{ item }">
    
              </template> -->
                    <template v-slot:no-data>
                      <h4 class="text-h6 mt-4">
                        Vous n'avez pas de lot enregistré
                      </h4>
                    </template>
                  </v-data-table>
                </v-col>
                <v-col cols="12" sm="6" md="7">
                  <v-data-table :headers="headersFacture" :items="fmpFacture" :items-per-page="10" :class="{
                    background: $vuetify.theme.themes.dark.background,
                  }" local="fr" class="elevation-0">
                    <template v-slot:item="{ item }">
                      <tr @click="upDateFactureOneSelect(item)" class=" miniTableRow green-bg">
                        <td>{{ item.partNumber }}</td>
                        <td>{{ item.invoiceAmount }}</td>
                        <td>{{ item.observation }}</td>
                      </tr>
                    </template>

                    <!-- <template v-slot:item.actions="{ item }">
    
              </template> -->
                    <template v-slot:no-data>
                      <h4 class="text-h6 mt-4">
                        vous n'avez pas sélectionné de lot
                      </h4>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

    <template>
      <div>
        <v-data-table :headers="headers" :items="fmp" :items-per-page="10" class="elevation-0" background-color="red"
          color="#3A1C71" local="fr">
          <template v-slot:item="{ item }">
            <tr @click="handleClick(item)" class=" miniTableRow green-bg">
              <!-- <td>
                  <v-chip :color="getColor(item.status)" dark>
                    {{ item.status }}
                  </v-chip>
                </td> -->

              <!-- <td>{{ item.status }}</td> -->
              <td>{{ item.sinister.sinisterNumber }}</td>
              <td>{{ item.sinister.name }}</td>
              <td>{{ item.sinisterVictim.fullName }}</td>
              <td>{{ item.sinisterVictim.phone }}</td>
              <td>{{ item.agentName }}</td>
              <td>{{ item.totalFmp }}</td>
              <td>{{ item.totalProvision }}</td>
              <td>{{ item.amountDueToTheVictim }}</td>
              <td>{{ item.amountDueToTheCompany }}</td>
              <td>{{ item.observation }}</td>
            </tr>
          </template>
          <template v-slot:top>
            <v-toolbar flat>

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
                            @click="initfmp()"
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
          </template></v-data-table>
      </div>
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
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import { addFilendemnity } from "@/api/user";
import { defaultMethods, messages } from "../utils/data";
import {
  addFileJson,
  addFileForm,
  updateFileForm,
  updateFacture,
  addFactureFileForm,
  manageDocumentProposed,
  updateFmp,
  addBatch,
  updateBatch,
  invoiceUpdate,
  addBeneficiary
} from "@/api/user.js";
export default {
  name:'fmpComponent',

  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: false,
    fmpCalculator: false,
    addFileExcel: false,
    offreStatut: ["EN COURS",
      "Soldé",
      "Sans suite",
      "Prescrit",
      "Recours"],
    addFile: false,
    page: 1,
    pages: 1,
    sinsiterSelectId: "",
    victimeId: "",
    excelFile: null,
    fetchReloadId: "",
    miseAjourFacture: false,
    mailVictimeCourrier: false,
    addLot: false,
    adnewObject: {},

    lotSelect: true,
    unlockButton: true,
    adnewObjectMail: {},
    productNameList: [],
    addCalculateurFmp: [],
    civiliteVictimes: ["Monsieur", "Madame"],
    sinisterStatus: ["Demande PV", "Déclaration"],
    documentNameList: [],
    documentsProvides: [],
    documentsAlreadyProvides: [],

    operationTypesSelect: [
      "Accord",
      "Bon de prise en charge",
      "Calcul FMP",
      "Contentieux",
      "Demande d'expertise amiable",
      "Demande d'expertise Matérielle",
      "Demande d'expertise décès",
      "Demande d'expertise Corporelle",
      "Demande d'expertise financiere",
      "Etude / Offre",
      "Suivi FGA",
      "Pool 2 Roues",
      "Pool TPM / TPV",
      "Recours",
      "Suivi de reparation",
    ],
    victimeDialogModal: false,
    selectedDocumentsModal: [],
    addVictime: false,
    victimesListeData: [],
    victimeFormData: {},
    batchNameAray: [],
    factureObjet: {},
    lotFacture: {
      batchNumber: "",
      batchDate: "",
      provision: 0,
      Bonus: 0,
    },

    factureModal: [
      {
        partNumber: "",
        invoiceAmount: 0,
        observation: "",
      },
    ],
    addNewVictimeFile: false,
    pageCount: 0,
    addFileMail: false,
    pageCounts: 0,
    itemsPerPage: 10,
    civiliteIiems: ["Monsieur", "Madame"],
    StatusIiems: [
      "En cours",
      "Consultation",
      "Expertise amiable",
      "Contre expertise",
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
        text: "Nom agent",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "agentName",
      },
      {
        text: "Total fmp ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "totalFmp",
      },
      {
        text: "Total provision",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "totalProvision",
      },
      {
        text: "Montant du a la victime",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "amountDueToTheVictim",
      },

      {
        text: "Montant du a la compagnie ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "amountDueToTheCompany",
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
    headersLot: [
      // {
      //   text: "Statut",
      //   width: "100px",
      //   // divider: true,
      //   // class: "deep-purple darken-4 white--text",
      //   align: "start",
      //   value: "status",
      // },
      {
        text: "Actions",
        align: "left",
        value: "actions",
        sortable: false,
        width: "100px",
      },
      {
        text: "Numéro lot",
        // divider: true,
        width: "200px",
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "batchNumber",
      },
      {
        text: "Date lot",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "batchDate",
      },
      {
        text: "Provision",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "provision",
      },
    ],
    headersFacture: [
      // {
      //   text: "Statut",
      //   width: "100px",
      //   // divider: true,
      //   // class: "deep-purple darken-4 white--text",
      //   align: "start",
      //   value: "status",
      // },
      {
        text: "Numéro pièce",
        width: "200px",
        // divider: true,
        // class: "background white--text",
        align: "start",
        value: "partNumber",
      },
      {
        text: "Montant facture",
        width: "250px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "invoiceAmount",
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

    headersMail: [
      // {
      //   text: "Statut",
      //   width: "100px",
      //   // divider: true,
      //   // class: "deep-purple darken-4 white--text",
      //   align: "start",
      //   value: "status",
      // },
      {
        text: "Nom victim",
        align: "start",
        sortable: false,
        value: "sinisterNumber",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
      },

      {
        text: "Numéro courrier",
        // divider: true,
        // width: "200px",
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "name",
      },
      {
        text: "Date courrier",
        // width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "sinisterDate",
      },
      {
        text: "Observation",
        // width: "200px",
        // divider: true,
        // class: "background white--text",
        align: "start",
        value: "sinisterPlace",
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
      "fmp",
      "victimeDocumentListe",
      "victimeListe",
      "UserProfile",
      "productListe",
      "indemnityData",
      "Products",
      "Documents",
      "Victime",
      "victimeMailListe",
      "fmpFacture",
      "batch",
      "totalFmp",
      "statFile",
      "fmpUniqueValue",
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
    Products() {
      this.productNameList = defaultMethods.getNameList(this.Products);
    },
    Documents() {
      this.documentNameList = defaultMethods.getNameList(this.Documents);
    },
    batch() {
      this.batchNameAray = defaultMethods.getNameList(this.batch);
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
      "getFmp",
      "getUserProfile",
      "getDocuments",
      "getProducts",
      "getVictimes",
      "getVictimesDoc",
      "getVictimeMail",
      "getFmpFacture",
      "getBatch",
      "getDocFmp",
      "getUniqueFmp",
    ]),
    
    addOneFacture() {
      this.factureModal.push({
        partNumber: "",
        invoiceAmount: 0,
        observation: "",
      });
    },
    schowElement() {
      if (this.printDoc != "") {
        this.unlockButton = false;
      }
    },
    removeFromCoin(id) {
      // id -= 1;
      this.factureModal.splice(id, 1);
      this.seedCoinsuranceCompanyNameList();
    },
      // async genereteDoc() {
      //   // alert(JSON.stringify(this.batch));
      //   this.loading = true
      //   await this.getDocFmp({
      //     ids: defaultMethods.getItemsId(this.batch, this.printDoc),
      //     id: this.adnewObject._id,
      //   });
      //   this.loading = false

      // },



async genereteDoc() {
  this.loading = true;
  console.log("Données avant génération du bordereau:", {
    batch: this.batch,
    printDoc: this.printDoc,
    amountDueToTheCompany: this.adnewObject?.amountDueToTheCompany
  });
  
  try {
    // Assurez-vous que batch est défini et contient des éléments
    if (!this.batch || this.batch.length === 0) {
      console.error("Aucun lot à traiter");
      return;
    }
    
    // Créer un tableau d'IDs à partir de batch
    const batchIds = this.batch.map(item => item._id).filter(id => id);
    
    // Utiliser printDoc s'il existe, sinon utiliser un tableau vide
    const printDocIds = Array.isArray(this.printDoc) ? this.printDoc : [];
    
    // Fusionner les IDs et éliminer les doublons si nécessaire
    const allIds = [...new Set([...batchIds, ...printDocIds])];
    
    // S'assurer qu'on a des IDs valides avant d'appeler l'API
    if (allIds.length > 0) {
      await this.getDocFmp({
        ids: allIds,
        id: this.adnewObject._id,
        amountDueToTheCompany: this.adnewObject?.amountDueToTheCompany || 0
      });
    } else {
      console.error("Aucun ID valide trouvé dans les lots");
    }
  } catch (error) {
    console.error("Erreur lors de la génération du bordereau:", error);
  } finally {
    this.loading = false;
  }
},
    newBatch() {
      // id -= 1;
      this.lotFacture = {};
      this.addLot = true;
    },
    async initFiles() {
      this.loading = true;
      try {
        await this.getFmp({
          StartDate: this.StartDate,
          EndDate: this.EndDate,
          customerName: this.customerNameSearch,
          victimName: this.victimNameSearch,
          sinisterNumber: this.sinisterNumberSearch,
          statusSearch: this.statusSearch,
        });
        await this.getUserProfile();

        await this.getProducts();
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
      await this.getDocuments({ name: this.searchData });
      //  alert(JSON.stringify(this.victimeListe))
      //   this.victimesListeData = this.victimeListe;
      // this.adnewObject = Object.assign({}, item);
      // this.addFile = true;
      this.addVictime = true;
    },
      async reloadData() {
      
        console.log(">> reloadData() appelée");
        await this.getUniqueFmp({ id: this.fetchReloadId });
        // alert(JSON.stringify());
        this.addCalculateurFmp = Object.assign({}, this.fmpUniqueValue);
        
  // Vérifie que le champ est bien copié
  if (
    this.fmpUniqueValue?.sinisterVictim?.responsibilityRate !== undefined
  ) {
    this.addCalculateurFmp.responsibilityRate =
      this.fmpUniqueValue.sinisterVictim.responsibilityRate;
  } else {
    console.warn("responsibilityRate introuvable dans sinisterVictim");
  }

        this.makeCalcule();
        // this.addCalculateurFmp = Object.assign({}, item);
      },
    async handleClick(item) {
      // alert(JSON.stringify(item._id));
      //   this.fmpFacture = [];
      this.fetchReloadId = item._id;
      await this.getBatch({ fmp: item._id });

      // this.editedIndex = this.adnewObject.indexOf(item);
      this.adnewObject = Object.assign({}, item);
      this.addCalculateurFmp = Object.assign({}, item);
      this.makeCalcule();
      //   this.adnewObject.product = item.productName;
      // this.adnewObject.name = item.sinister.name;
      this.addVictime = true;
    },
    handleClickMail(item) {
      this.adnewObjectMail.mailNumber = item.mailNumber;
      this.adnewObjectMail.mailDate = item.mailDate;
      this.adnewObjectMail.observation = item.observation;
      this.adnewObjectMail.fullName = item.sinisterVictim.fullName;
      this.adnewObjectMail.mailID = item._id;
      // this.editedIndex = this.adnewObject.indexOf(item);
      // this.adnewObject = Object.assign({}, item);
      this.addFileMail = true;
    },
    async updateFactureFormModal() {
      this.loading = true;
      // alert(JSON.stringify(this.factureObjet));
      try {
        const schema = {
          //   fmp: this.adnewObject._id,
          // batch: this.factureObjet._id,
          partNumber: this.factureObjet.partNumber,
          invoiceAmount: this.factureObjet.invoiceAmount,
          observation: this.factureObjet.observation,
        };

        if (this.factureObjet._id) {
          // update
          await invoiceUpdate({
            schema,
            id: this.factureObjet._id,
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
      await this.getFmpFacture({ batch: this.factureObjet.batch._id });
      this.miseAjourFacture = false;

      this.initFiles();
    },
    async addMailFormModal() {
      this.loading = true;
      try {
        const schema = {
      totalFmp: this.addCalculateurFmp.totalFmp,
      totalProvision: this.addCalculateurFmp.totalProvision,
      amountDueToTheVictim: this.addCalculateurFmp.amountDueToTheVictim,
      amountDueToTheCompany: this.addCalculateurFmp.amountDueToTheCompany,
      observation: this.addCalculateurFmp.observation,
      responsibilityRate: this.addCalculateurFmp.sinisterVictim  // Corrected path
    };

        if (this.addCalculateurFmp._id) {
          // update
          await updateFmp({
            schema,
            id: this.addCalculateurFmp._id,
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
      (this.addFileMail = false), this.initFiles();
    },
    async addBeneficiaryFormModal(item) {
      try {
        const schema = {
          sinisterVictim: item.sinisterVictim._id,
          studyType: "HistoryProvision",
          beneficiaryType: "VICTIME",
          fullName: item.sinisterVictim.fullName,
          contact: item.sinisterVictim.phone,
          batchDate: this.lotFacture.batchDate,
          batchNumber: this.lotFacture.batchNumber,
          amount: Number(this.lotFacture.Bonus),
        };
        // alert(Number())
        if (isNaN(this.lotFacture.Bonus)) {
          this.lotFacture.Bonus = 0
        }
        if (this.lotFacture.Bonus != 0) {
          await addBeneficiary({ schema });
        } else {
          console.log(this.lotFacture.Bonus)

        }

        defaultMethods.dispatchSuccess(
          this.$store,
          messages.createdSuccessfully("Dossier")
        );
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }

    },
    async addBatch() {
      this.loading = true;
      // alert(JSON.stringify());
      try {
        const schema = {
          fmp: this.adnewObject._id,
          batchNumber: this.lotFacture.batchNumber,
          provision: Number(this.lotFacture.provision) + Number(this.lotFacture.Bonus),
          batchDate: this.lotFacture.batchDate,
        };
        if (this.lotFacture._id) {
          // update
          await updateBatch({
            schema,
            id: this.lotFacture._id,
          });

          defaultMethods.dispatchSuccess(
            this.$store,
            messages.updatedSuccessfully("Dossier")
          );

        } else {
          await addBatch({ schema });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.createdSuccessfully("Dossier")
          );

        }
        if (Number(this.lotFacture.Bonus) != 0) {
          await this.addBeneficiaryFormModal(this.adnewObject)
        }
        await this.reloadData();
        await this.getBatch({ fmp: this.adnewObject._id });
        this.loading = false;
        this.addLot = false;
        // this.closeMail();
        // this.initialize();
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
      this.initFiles();
    },
    async victimeMail(item) {
      console.log(item);
      this.victimeId = item._id;
      await this.getVictimeMail({ id: item._id });
      this.mailVictimeCourrier = true;
    },
    makeCalcule() {
      // alert("ok")
      let valueCalcule =
        this.addCalculateurFmp.totalFmp - this.addCalculateurFmp.totalProvision;
      if (valueCalcule > 0) {
        this.addCalculateurFmp.amountDueToTheVictim = valueCalcule;
        this.addCalculateurFmp.amountDueToTheCompany = 0;
      } else {
        this.addCalculateurFmp.amountDueToTheVictim = 0;
        this.addCalculateurFmp.amountDueToTheCompany = valueCalcule * -1;
      }
    },
    valueChange() {
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
        this.adnewObject.agencyCode =
          this.adnewObject.sinisterNumber[6] +
          this.adnewObject.sinisterNumber[7] +
          this.adnewObject.sinisterNumber[8] +
          this.adnewObject.sinisterNumber[9];
        this.adnewObject.category =
          this.adnewObject.sinisterNumber[10] +
          this.adnewObject.sinisterNumber[11] +
          this.adnewObject.sinisterNumber[12];
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
      this.factureObjet = {};
      this.addNewVictimeFile = true;
    },
    upDateFacture(item) {
      //   alert(item);
      this.factureObjet = Object.assign({}, item);
      this.addNewVictimeFile = true;
    },
    upDateFactureOneSelect(item) {
      //   alert(item);
      this.factureObjet = Object.assign({}, item);
      this.miseAjourFacture = true;
    },
    addMoreFacture(item) {
      // alert(JSON.stringify(item));
      this.factureObjet = Object.assign({}, item);
      this.factureModal = Object.assign(
        [],
        [
          {
            partNumber: "",
            invoiceAmount: 0,
            observation: "",
          },
        ]
      );
      // this.lotFacture = Object.assign({}, item);
      this.addNewVictimeFile = true;
    },
    upDateBatchSelect(item) {
      //   alert(item);
      this.lotFacture = Object.assign({}, item);
      this.addLot = true;
    },
    deleteItem(item) {
      this.editedIndex = this.indemnityData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    async showFacture(item) {
      this.loading = true;
      await this.getFmpFacture({ batch: item._id });
      this.loading = false;
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
    async addFactureFormModal() {
      // alert(JSON.stringify(this.factureObjet.fmp._id));
      this.loading = true;
      for (let i = 0; i < this.factureModal.length; i++) {
        try {
          const schema = {
            batch: this.factureObjet._id,
            partNumber: this.factureModal[i].partNumber,
            invoiceAmount: this.factureModal[i].invoiceAmount,
            observation: this.factureModal[i].observation,
          };
          // if (this.victimeFormData.operationType == "Demande PV") {
          //   await addOperationTypeForm({ schema });
          // }

          if (this.factureModal[i]._id) {
            // update
            await updateFacture({
              schema,
              id: this.factureModal[i]._id,
            });
            defaultMethods.dispatchSuccess(
              this.$store,
              messages.updatedSuccessfully("Dossier")
            );
          } else {
            // add
            await addFactureFileForm({ schema });
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
      }

      this.loading = false;
      this.addNewVictimeFile = false;
      await this.getFmpFacture({ batch: this.factureObjet._id });
      await this.reloadData()
      //   this.victimesListeData = this.victimeListe;
    },
    async addFileFormModal() {
      this.loading = true;
      try {
        const schema = {
          sinisterNumber: this.adnewObject.sinisterNumber,
          name: this.adnewObject.name,
          psap: this.adnewObject.psap,
          operationType: this.adnewObject.operationType,
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
      this.initDeclaration();
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
        await manageDocumentProposed({
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
</style>
