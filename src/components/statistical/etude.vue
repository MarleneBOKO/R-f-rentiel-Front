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
              <v-col cols="12" md="6">
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
      <v-dialog v-model="printListDoc" width="1200">
        <v-card dark class="pa-10 progresse">
          <v-btn color="success darken-1" class="mr-10" @click="materialDoc()">
            Offre matérielle
          </v-btn>
          <v-btn color="success darken-1" class="mr-10" @click="coporelDoc()">
            Offre corporelle
          </v-btn>
          <v-btn color="success darken-1" class="mr-10" @click="individualDoc()">
            Offre individuelle accident
          </v-btn>
          <v-btn color="success darken-1" class="mr-10" @click="deathDoc()">
            Offre décès
          </v-btn>
  
        </v-card>
      </v-dialog>
      <template>
        <v-row class="  ml-4 mb-4 mt-5" justify="start">
          <h4 class="text-h4 mt-3 pageTitle ">
            Statistiques Etudes / Offres
          </h4>
          <v-divider class="mx-4" inset vertical></v-divider>
          <!-- <v-switch v-model="showAllFil" label="Afficher toutes les données" color="#3A1C71"
            @change="showAllFillData"></v-switch>
          <v-spacer></v-spacer> -->
        </v-row>
        <v-row justify="center">
          <v-dialog v-model="addFileMoreDead" max-width="700px">
            <v-card style="border-left: 10px solid #3A1C71">
              <v-card-title>
                <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Ayant droit</span>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Nom & prénom" @change="ayantDroitValueChange()" color="#3A1C71"
                      v-model="ayantDroitDataListe.fullName" filled>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select :items="ayantDroitQualite" @change="ayantDroitValueChange()" filled label="Qualité"
                      color="#3A1C71" v-model="ayantDroitDataListe.quality"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select :items="Decision" filled @change="ayantDroitValueChange()" label="Orphelin double"
                      color="#3A1C71" v-model="ayantDroitDataListe.isOrphanDouble"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Age" @change="ayantDroitValueChange()" color="#3A1C71" filled
                      v-model="ayantDroitDataListe.age"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select :items="typeOfSex" filled @change="ayantDroitValueChange()" label="Sexe" color="#3A1C71"
                      v-model="ayantDroitDataListe.sex"></v-select>
                  </v-col>
                  <!-- <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Taux de partage" @change="ayantDroitValueChange()" color="#3A1C71" filled
                      v-model="ayantDroitDataListe.sharingRate"></v-text-field>
                  </v-col> -->
                  <!-- <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Revenue capitalisé" @change="ayantDroitValueChange()" color="#3A1C71" filled
                      v-model="ayantDroitDataListe.capitalize"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Franc de rente" color="#3A1C71" @change="ayantDroitValueChange()" filled
                      v-model="ayantDroitDataListe.pensionFranc"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Préjudice économique" @change="ayantDroitValueChange()" color="#3A1C71" filled
                      v-model="ayantDroitDataListe.economicDamage"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Préjudice moral" @change="ayantDroitValueChange()" color="#3A1C71" filled
                      v-model="ayantDroitDataListe.moralDamage"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Indemnité due" @change="ayantDroitValueChange()" color="#3A1C71" filled
                      v-model="ayantDroitDataListe.compensationDue"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Partage" @change="ayantDroitValueChange()" color="#3A1C71" filled
                      v-model="ayantDroitDataListe.share"></v-text-field>
                  </v-col> -->
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error darken-1" class="mr-5" @click="addFileMoreDead = false" text>
                  Fermer
                </v-btn>
                <v-btn color="success darken-1" @click="addAyantDroitFormModal()">
                  Enregistrer le dossier
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="addFileDead" max-width="1200px">
            <v-card style="border-left: 10px solid #3A1C71">
              <v-card-title>
                <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Etude Décès</span>
                <v-spacer></v-spacer>
  
                <v-btn color="success mr-10 darken-1" @click="handleClick('DeathStudy')">
                  Répartition de l'offre
                </v-btn>
                <v-btn color="success darken-1" @click="addAyantDroit()">
                  Ajout d'ayant droit
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <!-- <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Numéro sinistre" @change="deathStudyValueChange()"
                      v-model="deathStudyOfferData.sinisterNumber" color="#3A1C71" filled>
                    </v-text-field>
                  </v-col> -->
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Nom victime" disabled background-color="#4DD0E1" v-model="deathStudyOfferData.name"
                      color="#3A1C71" filled @change="deathStudyValueChange()">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Age" disabled background-color="#4DD0E1" color="#3A1C71" filled
                      @change="deathStudyValueChange()" type="number" v-model="deathStudyOfferData.age">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Sexe" disabled background-color="#4DD0E1" v-model="deathStudyOfferData.sex"
                      color="#3A1C71" filled @change="deathStudyValueChange()">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Date sinistre" disabled background-color="#4DD0E1" type="date"
                      v-model="deathStudyOfferData.sinisterDate" color="#3A1C71" filled @change="deathStudyValueChange()">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-select :items="repartitionKeysData" label="Clé de répartition" background-color="#ffb703"
                      v-model="deathStudyOfferData.distributionKey" color="#3A1C71" filled
                      @change="deathStudyValueChange()">
                    </v-select>
  
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Taux de partage" background-color="#ffb703" type="number"
                      v-model="deathStudyOfferData.sharingRate" color="#3A1C71" filled @change="deathStudyValueChange()">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Smig Mensuel" background-color="#ffb703" type="number"
                      v-model="deathStudyOfferData.monthlySMIG" color="#3A1C71" filled @change="deathStudyValueChange()">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Smig mensuel résidence" background-color="#ffb703" color="#3A1C71" filled
                      @change="deathStudyValueChange()" type="number"
                      v-model="deathStudyOfferData.monthlySMIGResidence"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Smig retenu" type="number" v-model="deathStudyOfferData.withholdingSMIG"
                      color="#3A1C71" filled @change="deathStudyValueChange()">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Smig annuel" type="number" v-model="deathStudyOfferData.annualSMIG" color="#3A1C71"
                      filled @change="deathStudyValueChange()">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Revenu mensuel" background-color="#ffb703" type="number"
                      v-model="deathStudyOfferData.monthlyIncome" color="#3A1C71" filled @change="deathStudyValueChange()">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Revenu annuel" type="number" v-model="deathStudyOfferData.annualIncome"
                      color="#3A1C71" filled @change="deathStudyValueChange()">
                    </v-text-field>
                  </v-col>
                </v-row>
                <span class="text-h5 mb-20 mt-10" style="color:#3A1C71;">Information ayant droit</span>
                <v-data-table :headers="headersDead" :items="ayantDroit" :items-per-page="10" local="fr"
                  class="elevation-0 mt-5" background-color="red" color="#3A1C71" :loading="loading ? '#3A1C71' : null">
                  <template v-slot:item="{ item }">
                    <tr @click="handleClickAyantDroit(item)" class=" miniTableRow green-bg">
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
                                  <v-icon size="20" @click="handleClickAyantDroit(item)" v-bind="attrs" v-on="on"
                                    color="#a30b37">mdi-file-edit-outline</v-icon>
                                </v-btn>
                              </template>
                              <span>Modification</span>
                            </v-tooltip>
                            <v-tooltip v-if="item.haveSettlementInEmitCheck = true" bottom color="error">
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn class="ml-3" icon>
                                  <v-icon size="20" @click="deleteAyantDroit(item)" v-bind="attrs" v-on="on"
                                    color="error">mdi-hospital-box-outline</v-icon>
                                </v-btn>
                              </template>
                              <span>Supprimé</span>
                            </v-tooltip>
                          </v-list>
                        </v-menu>
                      </td>
                      <td>{{ item.fullName }}</td>
                      <td>{{ item.quality }}</td>
                      <td>{{ item.isOrphanDouble == true ? "Oui" : "Non" }}</td>
                      <td>{{ item.age }}</td>
                      <td>{{ item.sex }}</td>
                      <td>{{ item.capitalizeRevenue }}</td>
                      <td>{{ item.pensionFranc }}</td>
                      <td>{{ item.economicDamage }}</td>
                      <td>{{ item.moralDamage }}</td>
                      <td>{{ item.compensationDue }}</td>
                      <td>{{ item.share }}</td>
                    </tr>
                  </template>
                  <template v-slot:no-data>
                    <v-img src="../../assets/noPiority.png" max-height="100" width="100" alt="logo"></v-img>
                  </template>
                </v-data-table>
                <span class="text-h5 mb-20 mt-10" style="color:#3A1C71;">Résultat d'étude</span>
                <v-row class="mt-5">
                  <!-- <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Total revenu à capitaliser" v-model="deathStudyOfferData.beneficiaryName" color="#3A1C71"
                      filled @change="deathStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Total Franc de rente" v-model="deathStudyOfferData.beneficiaryName" color="#3A1C71"
                      filled @change="deathStudyValueChange()"></v-text-field>
                  </v-col> -->
                  <!-- <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Total préjudice économique" type="number"
                      v-model="deathStudyOfferData.totalPrejudiceEconomic" color="#3A1C71" filled
                      @change="deathStudyValueChange()"></v-text-field>
                  </v-col> -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Total préjudice moral" disabled background-color="#4DD0E1" type="number"
                      v-model="deathStudyOfferData.totalMoralDamage" color="#3A1C71" filled
                      @change="deathStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Total indemnité due" disabled background-color="#4DD0E1" type="number"
                      v-model="deathStudyOfferData.totalCompensationDue" color="#3A1C71" filled
                      @change="deathStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Totalité partage" disabled background-color="#4DD0E1" type="number"
                      v-model="deathStudyOfferData.totalShare" color="#3A1C71" filled @change="deathStudyValueChange()">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Debours" type="number" v-model="deathStudyOfferData.disbursements" color="#3A1C71"
                      filled @change="deathStudyValueChange()">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Matériel" type="number" v-model="deathStudyOfferData.material" color="#3A1C71"
                      filled @change="deathStudyValueChange()">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Provision" type="number" v-model="deathStudyOfferData.provision" color="#3A1C71"
                      filled @change="deathStudyValueChange()">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Sous- tatal" type="number" disabled background-color="#4DD0E1"
                      v-model="deathStudyOfferData.underTotal" color="#3A1C71" filled @change="deathStudyValueChange()">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Frais funéraires" type="number" v-model="deathStudyOfferData.funeralExpenses"
                      color="#3A1C71" filled @change="deathStudyValueChange()">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Total indemnité" disabled background-color="#4DD0E1" type="number"
                      v-model="deathStudyOfferData.totalCompensation" color="#3A1C71" filled
                      @change="deathStudyValueChange()">
                    </v-text-field>
                  </v-col>
                </v-row>
  
              </v-card-text>
              <!-- <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="error darken-1"
                  class="mr-5"
                  @click="addFile = false"
                  text
                >
                  Fermer
                </v-btn>
                <v-btn color="success darken-1" @click="addPvFormModal()">
                  Enregistrer le dossier
                </v-btn>
              </v-card-actions> -->
            </v-card>
          </v-dialog>
          <v-dialog v-model="addMorePaymente" max-width="1000px">
            <v-card style="border-left: 10px solid #3A1C71">
              <v-card-title>
                <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Autre payement</span>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-select :items="bneficiaryItem" filled label="Type de bénéficiaire" color="#3A1C71"
                      v-model="morePayementStudy.beneficiaryType"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Nom bénéficiaire" v-model="morePayementStudy.beneficiaryName" color="#3A1C71"
                      filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Contact" v-model="morePayementStudy.beneficiaryContact" color="#3A1C71"
                      filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select :items="natureListe" filled label="Nature de règlement" color="#3A1C71"
                      v-model="morePayementStudy.nature"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Montant" v-model="morePayementStudy.amount" color="#3A1C71" filled
                      type="number"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Date offre" v-model="morePayementStudy.offerDate" color="#3A1C71" filled
                      type="date"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Date deuxieme signature" background-color="#ffb703"
                      v-model="morePayementStudy.secondSignatureDate" color="#3A1C71" filled type="date"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Date envoie service financier" v-model="morePayementStudy.financialServiceSendDate"
                      disabled background-color="#4DD0E1" color="#3A1C71" filled type="date"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Date retrait service financier"
                      v-model="morePayementStudy.financialServiceWithdrawalDate" color="#3A1C71" filled
                      type="date"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Date envoie service accueil" background-color="#ffb703"
                      v-model="morePayementStudy.receptionServiceSendDate" color="#3A1C71" filled
                      type="date"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-select :items="BankNameListe" label="Banque" v-model="morePayementStudy.bank" color="#3A1C71" filled>
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Numéro de chèque" color="#3A1C71" filled
                      v-model="morePayementStudy.checkNumber"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Date chèque" color="#3A1C71" filled type="date"
                      v-model="morePayementStudy.checkDate"></v-text-field>
                  </v-col>
  
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error darken-1" class="mr-5" @click="addFile = false" text>
                  Fermer
                </v-btn>
                <v-btn color="success darken-1" @click="addOtherPayementFormModal()">
                  Enregistrer le dossier
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="morePayementStudyForm" max-width="1200px">
            <v-card style="border-left: 10px solid #3A1C71">
              <v-card-title>
                <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Autres payement</span>
                <v-spacer></v-spacer>
                <v-btn color="success  darken-1" @click="newClickMorePayement()">
                  Nouveau payement
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-data-table :headers="headersMorepaiement" :items="beneficiaryListData" :items-per-page="10" local="fr"
                  class="elevation-0 mt-5" background-color="red" color="#3A1C71" :loading="loading ? '#3A1C71' : null">
                  <template v-slot:item="{ item }">
                    <tr @click="handleClickMorePayement(item)" class="miniTableRow green-bg">
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
                                  <v-icon size="20" @click="handleClickMorePayement(item)" v-bind="attrs" v-on="on"
                                    color="#a30b37">mdi-file-edit-outline</v-icon>
                                </v-btn>
                              </template>
                              <span>Modification</span>
                            </v-tooltip>
                            <v-tooltip v-if="item.haveSettlementInEmitCheck = true" bottom color="error">
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn class="ml-3" icon>
                                  <v-icon size="20" @click="Annuler(item)" v-bind="attrs" v-on="on"
                                    color="error">mdi-hospital-box-outline</v-icon>
                                </v-btn>
                              </template>
                              <span>Annulé</span>
                            </v-tooltip>
                          </v-list>
                        </v-menu>
                      </td>
  
                      <td>{{ item.beneficiaryType }}</td>
                      <td>{{ item.fullName }}</td>
                      <td>{{ item.contact }}</td>
                      <td>{{ item.nature }}</td>
                      <td>{{ item.amount }}</td>
                      <td>{{ item.offerDate }}</td>
                      <td>{{ item.secondSignatureDate }}</td>
                      <td>{{ item.financialServiceSendDate }}</td>
                      <td>{{ item.financialServiceWithdrawalDate }}</td>
                      <td>{{ item.receptionServiceSendDate }}</td>
                      <td>{{ item.checkNumber }}</td>
                      <td>{{ item.bank ? item.bank.name : "" }}</td>
                      <td>{{ item.checkDate }}</td>
                      <td>{{ item.printed == true ? "Oui" : "Non" }}</td>
                      <td>{{ item.printingDate }}</td>
                    </tr>
                  </template>
                  <template v-slot:no-data>
                    <v-img src="../../assets/noPiority.png" max-height="100" width="100" alt="logo"></v-img>
                  </template>
                </v-data-table>
              </v-card-text>
              <!-- <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error darken-1" class="mr-5" @click="addFile = false" text>
                  Fermer
                </v-btn>
                <v-btn color="success darken-1" @click="morePayementStudy()">
                  Enregistrer le dossier
                </v-btn>
              </v-card-actions> -->
            </v-card>
          </v-dialog>
          <v-dialog v-model="indemnityForm" max-width="1200px">
            <v-card style="border-left: 10px solid #3A1C71">
              <v-card-title>
                <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Expertise amiable</span>
                <v-spacer></v-spacer>
                <v-btn color="error darken-1" v-if="indemnityStudy.amount == 0" @click="Annuler(deathStudySave)">
                  Annuler l'offre
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Numéro sinistre" disabled background-color="#4DD0E1"
                      v-model="indemnityStudy.sinisterNumber" color="#3A1C71" filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Nom victime" disabled background-color="#4DD0E1" v-model="indemnityStudy.name"
                      color="#3A1C71" filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Age" disabled background-color="#4DD0E1" color="#3A1C71" filled type="number"
                      v-model="indemnityStudy.age"></v-text-field>
                  </v-col> <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Contact" disabled background-color="#4DD0E1" color="#3A1C71" filled 
                      v-model="indemnityStudy.phone"></v-text-field>
                  </v-col>
  
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Date appel" v-model="indemnityStudy.callDate" color="#3A1C71" filled
                      type="date"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-select :items="StatusIiemss" filled label="Type d'expertise" color="#3A1C71"
                      v-model="indemnityStudy.expertiseType"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Date Consultation / expertise" v-model="indemnityStudy.consultationDate"
                      color="#3A1C71" filled type="date"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Date arrivée" v-model="indemnityStudy.arrivalDate" color="#3A1C71" filled
                      type="date"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Localité" v-model="indemnityStudy.locality" color="#3A1C71" filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Montant FMP" disabled background-color="#4DD0E1" type="number"
                      v-model="indemnityStudy.totalFmp" color="#3A1C71" filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Montant DI" v-model="indemnityStudy.amountDI" color="#3A1C71" filled
                      type="number"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Montant DM" v-model="indemnityStudy.amountDM" color="#3A1C71" filled
                      type="number"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Provision" v-model="indemnityStudy.amicableExpertiseProvision" color="#3A1C71"
                      filled type="number"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="debours" color="#3A1C71" filled type="number"
                      v-model="indemnityStudy.amountDebour"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Indemnité à recevoire" v-model="indemnityStudy.amount" color="#3A1C71" filled
                      type="number"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Date offre" v-model="indemnityStudy.offerDate" color="#3A1C71" filled
                      type="date"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Date deuxieme signature" background-color="#ffb703"
                      v-model="indemnityStudy.secondSignatureDate" color="#3A1C71" filled type="date"></v-text-field>
                  </v-col>
                  <!-- <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Date impression" v-model="indemnityStudy.printingDate" color="#3A1C71" filled
                      type="number"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Imprimé" color="#3A1C71" filled type="number"
                      v-model="indemnityStudy.printed"></v-text-field>
                  </v-col> -->
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Date envoie service financier" disabled background-color="#4DD0E1"
                      v-model="indemnityStudy.financialServiceSendDate" color="#3A1C71" filled type="date"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Date retrait service financier"
                      v-model="indemnityStudy.financialServiceWithdrawalDate" color="#3A1C71" filled
                      type="date"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Date envoie service accueil" background-color="#ffb703"
                      v-model="indemnityStudy.receptionServiceSendDate" color="#3A1C71" filled type="date"></v-text-field>
                  </v-col>
  
  
                  <v-col cols="12" sm="6" md="4">
                    <v-select :items="BankNameListe" label="Banque" v-model="indemnityStudy.bank" color="#3A1C71" filled>
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Numéro de chèque" color="#3A1C71" filled
                      v-model="indemnityStudy.checkNumber"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Date chèque" color="#3A1C71" filled type="date"
                      v-model="indemnityStudy.checkDate"></v-text-field>
                  </v-col>
  
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error darken-1" class="mr-5" @click="addFile = false" text>
                  Fermer
                </v-btn>
                <v-btn color="success darken-1" @click="addIndemnityFormModal()">
                  Enregistrer le dossier
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="bodyPersonnaleStudy" max-width="1200px">
            <v-card style="border-left: 10px solid #3A1C71">
              <v-card-title>
                <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Etude Individuelle accidents</span>
                <v-spacer></v-spacer>
                <v-btn color="success  darken-1" @click="handleClick('IndividualBody')">
                  Répartition de l'offre
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Numéro sinistre" disabled background-color="#4DD0E1"
                      v-model="bodyIndividualStudyOfferData.sinisterNumber" color="#3A1C71" filled
                      @change="individualBodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Nom & prénom" disabled background-color="#4DD0E1"
                      v-model="bodyIndividualStudyOfferData.name" color="#3A1C71" filled
                      @change="individualBodyStudyValueChange()"></v-text-field>
                  </v-col>
  
  
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Capital d'invalidité" background-color="#ffb703" color="#3A1C71" filled
                      @change="individualBodyStudyValueChange()" type="number"
                      v-model="bodyIndividualStudyOfferData.lumpSumDisability"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Capital décès" background-color="#ffb703"
                      v-model="bodyIndividualStudyOfferData.deathBenefit" color="#3A1C71" filled type="number"
                      @change="individualBodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Montant ITT / Jour réel" color="#3A1C71" filled
                      @change="individualBodyStudyValueChange()" type="number"
                      v-model="bodyIndividualStudyOfferData.realDailyIttAmount"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Montant ITT / jour contractuelle" background-color="#ffb703" color="#3A1C71" filled
                      @change="individualBodyStudyValueChange()" type="number"
                      v-model="bodyIndividualStudyOfferData.contractualIttAmount"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="FMP" v-model="bodyIndividualStudyOfferData.fmp" color="#3A1C71" filled
                      type="number" @change="individualBodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Indemnité journalière" v-model="bodyIndividualStudyOfferData.dailyAllowance"
                      color="#3A1C71" filled type="number" @change="individualBodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Nombre de jours ITT" background-color="#ffb703"
                      v-model="bodyIndividualStudyOfferData.numberOfDays" color="#3A1C71" filled type="number"
                      @change="individualBodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Montant ITT" v-model="bodyIndividualStudyOfferData.ittAmount" color="#3A1C71"
                      filled @change="individualBodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Taux IP" background-color="#ffb703" v-model="bodyIndividualStudyOfferData.IPRate"
                      color="#3A1C71" filled type="number" @change="individualBodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Invalidité" v-model="bodyIndividualStudyOfferData.disability" color="#3A1C71"
                      filled type="number" @change="individualBodyStudyValueChange()"></v-text-field>
                  </v-col>
  
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Préjudice total" v-model="bodyIndividualStudyOfferData.totalDamage" color="#3A1C71"
                      filled type="number" @change="individualBodyStudyValueChange()"></v-text-field>
                  </v-col>
  
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Debours" v-model="bodyIndividualStudyOfferData.disbursements" color="#3A1C71"
                      filled type="number" @change="individualBodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Provision" v-model="bodyIndividualStudyOfferData.provision" color="#3A1C71" filled
                      type="number" @change="individualBodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Tiers payeurs" v-model="bodyIndividualStudyOfferData.thirdPartyPayers"
                      color="#3A1C71" filled type="number" @change="individualBodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Indemnité à recevoir"
                      v-model="bodyIndividualStudyOfferData.compensationToBeReceived" disabled background-color="#4DD0E1"
                      color="#3A1C71" type="number" filled @change="individualBodyStudyValueChange()"></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <!-- <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error darken-1" class="mr-5" @click="addFile = false" text>
                  Fermer
                </v-btn>
                <v-btn color="success darken-1" @click="postOfIndividualBodyStudy()">
                  Enregistrer le dossier
                </v-btn>
              </v-card-actions> -->
            </v-card>
          </v-dialog>
          <v-dialog v-model="bodyStudy" max-width="1200px">
            <v-card style="border-left: 10px solid #3A1C71">
              <v-card-title>
                <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Etude corporelle</span>
                <v-spacer></v-spacer>
                <v-btn color="success darken-1" @click="handleClick('BodyStudy')">
                  Répartition de l'offre
                </v-btn>
  
              </v-card-title>
              <!-- {{ bodyStudyOfferData }} -->
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Numéro sinistre" v-model="bodyStudyOfferData.sinisterNumber" color="#3A1C71"
                      filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Nom & prénom" v-model="bodyStudyOfferData.name" color="#3A1C71" filled>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Age" color="#3A1C71" filled @change="bodyStudyValueChange()" type="number"
                      v-model="bodyStudyOfferData.age"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-select filled :items="typeOfSex" v-model="bodyStudyOfferData.sex" color="#3A1C71" label="Sexe"
                      @change="bodyStudyValueChange()"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Date sinistre" v-model="bodyStudyOfferData.sinisterDate" color="#3A1C71" filled
                      type="date"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Date consolidation" background-color="#ffb703"
                      v-model="bodyStudyOfferData.consolidationDate" color="#3A1C71" filled @change="bodyStudyValueChange()"
                      type="date"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Smig Mensuel" background-color="#ffb703" v-model="bodyStudyOfferData.monthlySMIG"
                      color="#3A1C71" filled type="number" @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Smig mensuel résidence" background-color="#ffb703" color="#3A1C71" filled
                      @change="bodyStudyValueChange()" type="number"
                      v-model="bodyStudyOfferData.monthlySMIGResidence"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Smig retenu" v-model="bodyStudyOfferData.withholdingSMIG" color="#3A1C71" filled
                      disabled background-color="#4DD0E1" type="number" @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Smig annuel" v-model="bodyStudyOfferData.annualSMIG" color="#3A1C71" filled
                      disabled background-color="#4DD0E1" type="number" @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Revenu mensuel" background-color="#ffb703"
                      v-model="bodyStudyOfferData.monthlyIncome" color="#3A1C71" filled type="number"
                      @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Revenu annuel" v-model="bodyStudyOfferData.annualIncome" color="#3A1C71" filled
                      disabled background-color="#4DD0E1" type="number" @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Revenu mensuel après consolidation"
                      v-model="bodyStudyOfferData.incomeAfterAccident" background-color="#ffb703" color="#3A1C71" filled
                      type="number" @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-select filled :items="['60', '65']" background-color="#ffb703"
                      v-model="bodyStudyOfferData.retirementAge" color="#3A1C71" label="Age retraite"
                      @change="bodyStudyValueChange()"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Nombre de jour ITT" color="#3A1C71" filled @change="bodyStudyValueChange()"
                      type="number" v-model="bodyStudyOfferData.numberOfITTDays"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="FMP" v-model="bodyStudyOfferData.fmp" disabled background-color="#4DD0E1"
                      color="#3A1C71" filled type="number" @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-select label="Appliqué ITT" :items='decision' v-model="bodyStudyOfferData.applyItt" color="#3A1C71"
                      filled type="number" background-color="#ffb703" @change="bodyStudyValueChange()"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-text-field label="Montant ITT" v-model="bodyStudyOfferData.ITT" color="#3A1C71" filled disabled
                      type="number" background-color="#4DD0E1" @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-text-field label="Taux d'IP" background-color="#ffb703" v-model="bodyStudyOfferData.IPRate"
                      color="#3A1C71" filled type="number" @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Valeur Point" v-model="bodyStudyOfferData.pointValue" color="#3A1C71" filled
                      disabled type="number" background-color="#4DD0E1" @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Préjudice physiologique" v-model="bodyStudyOfferData.physiologicalHarm"
                      color="#3A1C71" filled disabled type="number" background-color="#4DD0E1"
                      @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Préjudice économique" v-model="bodyStudyOfferData.economicDamage" color="#3A1C71"
                      filled type="number" disabled background-color="#4DD0E1" @change="bodyStudyValueChange()">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Préjudice moral" color="#3A1C71" filled disabled type="number"
                      background-color="#4DD0E1" @change="bodyStudyValueChange()"
                      v-model="bodyStudyOfferData.prejudiceMoral"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Assistance d'une tierce personne" disabled background-color="#4DD0E1"
                      v-model="bodyStudyOfferData.thirdPartyAssistance" color="#3A1C71" filled type="number"
                      @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-select :items="[
                                        '0',
                                        '5',
                                        '10',
                                        '20',
                                        '40',
                                        '60',
                                        '100',
                                        '150',
                                        '300',
                                      ]" label="Taux prétium doloris" background-color="#ffb703" color="#3A1C71" filled
                      @change="bodyStudyValueChange()" v-model="bodyStudyOfferData.painPretiumRate"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Prétium doloris" disabled background-color="#4DD0E1"
                      v-model="bodyStudyOfferData.pretiumCruciatus" color="#3A1C71" filled type="number"
                      @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-select :items="[
                                        '0',
                                        '5',
                                        '10',
                                        '20',
                                        '40',
                                        '60',
                                        '100',
                                        '150',
                                        '300',
                                      ]" label="Taux préjudice esthétique" background-color="#ffb703" color="#3A1C71" filled
                      @change="bodyStudyValueChange()" v-model="bodyStudyOfferData.estheticDamageRate"></v-select>
                  </v-col>
  
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Préjudice esthétique" disabled background-color="#4DD0E1"
                      v-model="bodyStudyOfferData.damageAeshetic" color="#3A1C71" filled type="number"
                      @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-select :items="['Oui', 'Non']" color="#3A1C71" filled @change="bodyStudyValueChange()"
                      label="Appliqué préjudice de carrière" background-color="#ffb703"
                      v-model="bodyStudyOfferData.careerDamageApplicate">
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Préjudice de carrière" disabled background-color="#4DD0E1"
                      v-model="bodyStudyOfferData.careerDamage" color="#3A1C71" filled type="number"
                      @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Dommage corporel" disabled background-color="#4DD0E1"
                      v-model="bodyStudyOfferData.bodilyHarm" color="#3A1C71" filled type="number"
                      @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Préjudice matériel forfait" v-model="bodyStudyOfferData.fixedMaterialDamage"
                      color="#3A1C71" filled type="number" @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Achat prothèse" v-model="bodyStudyOfferData.prosthesisPurchase" color="#3A1C71"
                      filled type="number" @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Entretien prothèse" v-model="bodyStudyOfferData.prosthesisMaintenance"
                      color="#3A1C71" filled type="number" @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Préjudice total" disabled background-color="#4DD0E1"
                      v-model="bodyStudyOfferData.totalDamage" color="#3A1C71" filled type="number"
                      @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Taux de partage" background-color="#ffb703"
                      v-model="bodyStudyOfferData.sharingRate" color="#3A1C71" filled type="number"
                      @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Préjudice après partage" disabled background-color="#4DD0E1"
                      v-model="bodyStudyOfferData.damageAfterSharing" color="#3A1C71" filled type="number"
                      @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Provision" v-model="bodyStudyOfferData.provision" disabled
                      background-color="#4DD0E1" color="#3A1C71" filled type="number"
                      @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Tièrs payeurs" v-model="bodyStudyOfferData.thirdPartyPayers" color="#3A1C71" filled
                      type="number" @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Honoraires d'expertise" v-model="bodyStudyOfferData.expertFees" color="#3A1C71"
                      filled @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Indemnité à recevoir" type='number' background-color="#4DD0E1" disabled
                      v-model="bodyStudyOfferData.compensationToBeReceived" color="#3A1C71" filled
                      @change="bodyStudyValueChange()"></v-text-field>
                  </v-col>
                </v-row>
                <pre>{{ bodyStudyOfferData }}</pre>
              </v-card-text>
                                <pre>{{ bodyStudy }}</pre> 

              <!-- <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error darken-1" class="mr-5" @click="bodyStudy = false" text>
                  Fermer
                </v-btn>
                <v-btn color="success darken-1" @click="postOfBodyStudy()">
                  Enregistrer le dossier
                </v-btn>
              </v-card-actions> -->
            </v-card>
          </v-dialog>
          <v-dialog v-model="addFileMoreMaterial" max-width="500px">
            <v-card style="border-left: 10px solid #3A1C71">
              <v-card-title>
                <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Dégât</span>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Pièces" v-model="degatData.documents" color="#3A1C71" filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Nombre" v-model="degatData.number" color="#3A1C71" filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Montant Demandé" color="#3A1C71" filled type="number"
                      v-model="degatData.amountRequested"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Montant réglé" v-model="degatData.amountToBePaid" color="#3A1C71" filled>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field label="Motif" v-model="degatData.patterns" color="#3A1C71" filled></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error darken-1" class="mr-5" @click="addFileMoreMaterial = false" text>
                  Fermer
                </v-btn>
                <v-btn color="success darken-1" @click="addDegatFormModal()">
                  Enregistrer le dossier
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="addFileMaterial" max-width="1200px">
            <v-card style="border-left: 10px solid #3A1C71">
              <v-card-title>
                <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Etude matérielle</span>
                <v-spacer></v-spacer>
                <v-btn color="success mr-10 darken-1" @click="handleClick('MaterialStudy')">
                  Répartition de l'offre
                </v-btn>
                <v-btn color="success darken-1" @click="addNewDegatToList()">
                  Ajouter un dégat
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Numéro sinistre" color="#3A1C71" disabled background-color="#4DD0E1"
                      v-model="materialDamageData.sinisterNumber" filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Nom de l'Assuré" v-model="materialDamageData.name" color="#3A1C71" filled disabled
                      background-color="#4DD0E1"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Nom de la victime" color="#3A1C71" filled disabled background-color="#4DD0E1"
                      v-model="materialDamageData.fullName"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Contact victime" v-model="materialDamageData.phone" color="#3A1C71" disabled
                      background-color="#4DD0E1" filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Date sinistre" v-model="materialDamageData.sinisterDate" color="#3A1C71" disabled
                      type="date" background-color="#4DD0E1" filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Taux de partage" @change="postOfMaterialStudy()"
                      v-model="materialDamageData.sharingRate" color="#3A1C71" filled type="number"
                      background-color="#ffb703"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Total dégat" v-model="materialDamageData.total" color="#3A1C71" disabled
                      type="number" background-color="#4DD0E1" filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field label="Indemnité" v-model="materialDamageData.indemnity" color="#3A1C71" disabled
                      background-color="#4DD0E1" filled></v-text-field>
                  </v-col>
                </v-row>
                <v-data-table :headers="headersMaterial" :items="damageListe" :items-per-page="10" local="fr"
                  class="elevation-0" background-color="red" color="#3A1C71" :loading="loading ? '#3A1C71' : null">
                  <template v-slot:item="{ item }">
                    <tr @click="handleClickDeagat(item)" class="miniTableRow green-bg">
                      <td>{{ item.documents }}</td>
                      <td>{{ item.number }}</td>
                      <td>{{ item.amountRequested }}</td>
                      <td>{{ item.amountToBePaid }}</td>
                      <td>{{ item.patterns }}</td>
                    </tr>
                  </template>
                  <template v-slot:no-data>
                    <v-img src="../../assets/noPiority.png" max-height="100" width="100" alt="logo"></v-img>
                  </template>
                </v-data-table>
              </v-card-text>
              <!-- <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="error darken-1"
                  class="mr-5"
                  @click="addFile = false"
                  text
                >
                  Fermer
                </v-btn>
                <v-btn color="success darken-1" @click="addPvFormModal()">
                  Enregistrer le dossier
                </v-btn>
              </v-card-actions> -->
            </v-card>
          </v-dialog>
          <v-dialog v-model="addFileMoreNeneficiary" max-width="800px">
            <v-card style="border-left: 10px solid #3A1C71">
              <v-card-title>
                <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Bénéficiaire</span>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-select :items="bneficiaryItem" filled label="Type de bénéficiaire" color="#3A1C71"
                      v-model="beneficiary.beneficiaryType"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Nom & prénom" v-model="beneficiary.fullName" background-color="#ffb703"
                      color="#3A1C71" filled>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Contact" v-model="beneficiary.contact" color="#3A1C71" filled>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Montant" color="#3A1C71" filled type="number" v-model="beneficiary.amount">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Date accord" type="date" v-model="beneficiary.agreementDate" color="#3A1C71"
                      filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Date deuxieme signature" background-color="#ffb703" type="date"
                      v-model="beneficiary.secondSignatureDate" color="#3A1C71" filled>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Date envoi service financier" disabled background-color="#4DD0E1" type="date"
                      v-model="beneficiary.financialServiceSendDate" color="#3A1C71" filled>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Date retrait service financier" type="date"
                      v-model="beneficiary.financialServiceWithdrawalDate" color="#3A1C71" filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Date envoi service accueil" background-color="#ffb703" type="date"
                      v-model="beneficiary.receptionServiceSendDate" color="#3A1C71" filled>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Numéro chèque" v-model="beneficiary.checkNumber" color="#3A1C71" filled>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select :items="BankNameListe" label="Banque" v-model="beneficiary.bank" color="#3A1C71" filled>
                    </v-select>
  
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Date chèque" type="date" v-model="beneficiary.checkDate" color="#3A1C71" filled>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-textarea v-model="beneficiary.observation" color="#3A1C71" filled label="Observation"></v-textarea>
                  </v-col>
  
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error darken-1" class="mr-5" @click="addFileMoreNeneficiary = false" text>
                  Fermer
                </v-btn>
                <v-btn color="success darken-1" @click="addBeneficiaryFormModal()">
                  Enregistrer le dossier
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="delAyantdroitForm" max-width="500px">
            <v-card style="border-left: 10px solid rgb(185, 55, 55)">
                          <v-card-title class="justify-center text-h5">Supprimer cette élément</v-card-title>
                          <v-card-text class="text-center">Etes vous sur de vouloir supprimer cette Ayant droit de votre étude ?</v-card-text>
                          <v-card-actions class="justify-center">
                            <v-btn color="succes  darken-1" class="mr-5" depressed @click="closeDelete">Fermer</v-btn>
                            <v-btn color="error darken-1" @click="RemoveAyantDroitModal()">Oui, supprimer</v-btn>
                          </v-card-actions>
      
            </v-card>
          </v-dialog>
          <v-dialog v-model="delForm" max-width="800px">
            <v-card style="border-left: 10px solid red">
              <v-card-title>
                <span class=" text-h5 mb-5 mt-5" style="color:red;">Annulé règlement</span>
              </v-card-title>
              <v-card-text>
                <v-row>
  
                  <v-col cols="12" sm="6" md="12">
                    <v-textarea v-model="beneficiaryDel.observation" color="#3A1C71" filled
                      label="Observation"></v-textarea>
                  </v-col>
  
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error darken-1" class="mr-5" @click="delForm = false" text>
                  Fermer
                </v-btn>
                <v-btn color="success darken-1" @click="addRemoveModal()">
                  Enregistrer le dossier
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
  
          <v-dialog v-model="addProvisioneneficiary" max-width="800px">
            <v-card style="border-left: 10px solid #3A1C71">
              <v-card-title>
                <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Règlement Provision</span>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-select :items="bneficiaryItem" filled label="Type de bénéficiaire" color="#3A1C71"
                      v-model="beneficiaryProvisionData.beneficiaryType"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Nom & prénom" background-color="#ffb703"
                      v-model="beneficiaryProvisionData.fullName" color="#3A1C71" filled>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Contact" v-model="beneficiaryProvisionData.contact" color="#3A1C71" filled>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Montant" color="#3A1C71" filled type="number"
                      v-model="beneficiaryProvisionData.amount">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Date accord" type="date" v-model="beneficiaryProvisionData.agreementDate"
                      color="#3A1C71" filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Date deuxieme signature" background-color="#ffb703" type="date"
                      v-model="beneficiaryProvisionData.secondSignatureDate" color="#3A1C71" filled>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Date envoi service financier" type="date" disabled background-color="#4DD0E1"
                      v-model="beneficiaryProvisionData.financialServiceSendDate" color="#3A1C71" filled>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Date retrait service financier" type="date"
                      v-model="beneficiaryProvisionData.financialServiceWithdrawalDate" color="#3A1C71"
                      filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Date envoi service accueil" type="date"
                      v-model="beneficiaryProvisionData.receptionServiceSendDate" color="#3A1C71" filled>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Numéro chèque" v-model="beneficiaryProvisionData.checkNumber" color="#3A1C71"
                      filled>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select :items="BankNameListe" label="Banque" v-model="beneficiaryProvisionData.bank" color="#3A1C71"
                      filled>
                    </v-select>
  
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Date chèque" type="date" v-model="beneficiaryProvisionData.checkDate"
                      color="#3A1C71" filled>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-textarea v-model="beneficiaryProvisionData.observation" color="#3A1C71" filled
                      label="Observation"></v-textarea>
                  </v-col>
  
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error darken-1" class="mr-5" @click="addFileMoreNeneficiary = false" text>
                  Fermer
                </v-btn>
                <v-btn color="success darken-1" @click="addBeneficiaryProvisionFormModal()">
                  Enregistrer le dossier
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
  
  
  
  
          <v-dialog v-model="addProvision" max-width="1000px">
            <v-card style="border-left: 10px solid #3A1C71">
              <v-card-title>
                <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Provision</span>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Numéro sinistre" v-model="HistoryProvisionData.sinisterNumber" color="#3A1C71"
                      disabled background-color="#4DD0E1" filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Nom Bénéficiaire" v-model="HistoryProvisionData.fullName" color="#3A1C71" disabled
                      background-color="#4DD0E1" filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Contact Bénéficiaire" v-model="HistoryProvisionData.contact" color="#3A1C71"
                      disabled background-color="#4DD0E1" filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Total FMP" v-model="HistoryProvisionData.totalFmp" color="#3A1C71" disabled
                      background-color="#4DD0E1" filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Total Provision" background-color="#4DD0E1" disabled type="number"
                      v-model="HistoryProvisionData.totalProvision" color="#3A1C71" filled>
                    </v-text-field>
                  </v-col>
  
                </v-row>
                <v-data-table :headers="headersProvision" :items="beneficiaryListData" local="fr" :items-per-page="10"
                  class="elevation-0" background-color="red" color="#3A1C71" :loading="loading ? '#3A1C71' : null">
                  <template v-slot:item="{ item }">
                    <tr @click="beneficiaryProvisionRowClick(item)" class="miniTableRow green-bg">
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
                                  <v-icon size="20" @click="beneficiaryProvisionRowClick(item)" v-bind="attrs" v-on="on"
                                    color="#a30b37">mdi-file-edit-outline</v-icon>
                                </v-btn>
                              </template>
                              <span>Modification</span>
                            </v-tooltip>
                            <v-tooltip v-if="item.haveSettlementInEmitCheck = true" bottom color="error">
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn class="ml-3" icon>
                                  <v-icon size="20" @click="Annuler(item)" v-bind="attrs" v-on="on"
                                    color="error">mdi-hospital-box-outline</v-icon>
                                </v-btn>
                              </template>
                              <span>Annulé</span>
                            </v-tooltip>
                          </v-list>
                        </v-menu>
                      </td>
                      <td>{{ item.batchNumber }}</td>
                      <td>{{ item.batchDate }}</td>
                      <td>{{ item.amount }}</td>
                      <td>{{ item.agentName }}</td>
                      <td>{{ item.secondSignatureDate }}</td>
                      <td>{{ item.financialServiceSendDate }}</td>
                      <td>{{ item.financialServiceWithdrawalDate }}</td>
                      <td>{{ item.receptionServiceSendDate }}</td>
                      <td>{{ item.checkNumber }}</td>
                      <td>{{ item.bank ? item.bank.name : "" }}</td>
                      <td>{{ item.checkDate }}</td>
                      <td>{{ item.printed == true ? "Oui" : "Non" }}</td>
                      <td>{{ item.printingDate }}</td>
                    </tr>
                  </template>
                  <template v-slot:no-data>
                    <v-img src="../../assets/noPiority.png" max-height="100" width="100" alt="logo"></v-img>
                  </template>
                </v-data-table>
              </v-card-text>
              <!-- <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="error darken-1"
                  class="mr-5"
                  @click="addFile = false"
                  text
                >
                  Fermer
                </v-btn>
                <v-btn color="success darken-1" @click="addPvFormModal()">
                  Enregistrer le dossier
                </v-btn>
              </v-card-actions> -->
            </v-card>
          </v-dialog>
  
  
          <v-dialog v-model="pvManage" max-width="1000px">
            <v-card style="border-left: 10px solid #3A1C71">
              <v-card-title>
                <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Règlement PV</span>
                <v-spacer></v-spacer>
  
              </v-card-title>
              <v-card-text>
  
                <v-data-table :headers="headersRepatition" :items="beneficiaryListData" local="fr" :items-per-page="10"
                  class="elevation-0" background-color="red" color="#3A1C71" :loading="loading ? '#3A1C71' : null">
                  <template v-slot:item="{ item }">
                    <tr @click="beneficiaryRowClick(item)" class="miniTableRow green-bg">
                      <td>{{ item.beneficiaryType }}</td>
                      <td>{{ item.fullName }}</td>
                      <td>{{ item.contact }}</td>
                      <td>{{ item.amount }}</td>
                      <td>{{ item.agreementDate }}</td>
                      <td>{{ item.secondSignatureDate }}</td>
                      <td>{{ item.financialServiceSendDate }}</td>
                      <td>{{ item.financialServiceWithdrawalDate }}</td>
                      <td>{{ item.receptionServiceSendDate }}</td>
                      <td>{{ item.checkNumber }}</td>
                      <td>{{ item.bank ? item.bank.name : "" }}</td>
                      <td>{{ item.checkDate }}</td>
                      <td>{{ item.printed == true ? "Oui" : "Non" }}</td>
                      <td>{{ item.printingDate }}</td>
                    </tr>
                  </template>
                  <template v-slot:no-data>
                    <v-img src="../../assets/noPiority.png" max-height="100" width="100" alt="logo"></v-img>
                  </template>
                </v-data-table>
              </v-card-text>
              <!-- <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="error darken-1"
                  class="mr-5"
                  @click="addFile = false"
                  text
                >
                  Fermer
                </v-btn>
                <v-btn color="success darken-1" @click="addPvFormModal()">
                  Enregistrer le dossier
                </v-btn>
              </v-card-actions> -->
            </v-card>
          </v-dialog>
  
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
                <v-btn color="success" class="white--text" block @click="makePrintFunc()">Imprimer le document
                </v-btn>
                <!-- <v-spacer></v-spacer> -->
                <!-- <v-btn color="success" class="white--text" @click="printSimpleFacture('PROFORMA')">Imprimé Facture Proforma
            </v-btn> -->
              </v-card-actions>
            </v-card>
          </v-dialog>
  
  
          <v-dialog v-model="addFile" max-width="1000px">
            <v-card style="border-left: 10px solid #3A1C71">
              <v-card-title>
                <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">REPARTITION DE L'OFFRE</span>
                <v-spacer></v-spacer>
                <v-btn color="success darken-1 mr-10" @click="genereteDocSign('offerDoc')">
                  Imprimer le rapport d'offre
                </v-btn>
                <v-btn color="success darken-1" @click="addNewBeneficiaryToList()">
                  Ajouter un bénéficaire
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Montant de l'offre" v-model="divisionData.amount" color="#3A1C71" disabled
                      background-color="#4DD0E1" filled></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Date offre" type="date" @change="postOfMaterialStudy()"
                      v-model="divisionData.agreementDate" color="#3A1C71" filled>
                    </v-text-field>
                  </v-col>
  
                </v-row>
                <v-card-title>
                  <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;"></span>
                  <v-spacer></v-spacer>
                  <v-btn color="success darken-1 " @click="genereteDocSign('repartition')">
                    Imprimer la répartition
                  </v-btn>
                </v-card-title>
                <v-data-table :headers="headersRepatition" :items="beneficiaryListData" local="fr" :items-per-page="10"
                  class="elevation-0" background-color="red" color="#3A1C71" :loading="loading ? '#3A1C71' : null">
                  <template v-slot:item="{ item }">
                    <tr @click="beneficiaryRowClick(item)" class="miniTableRow green-bg">
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
                                  <v-icon size="20" @click="beneficiaryRowClick(item)" v-bind="attrs" v-on="on"
                                    color="#a30b37">mdi-file-edit-outline</v-icon>
                                </v-btn>
                              </template>
                              <span>Modification</span>
                            </v-tooltip>
                            <v-tooltip v-if="item.haveSettlementInEmitCheck = true" bottom color="error">
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn class="ml-3" icon>
                                  <v-icon size="20" @click="Annuler(item)" v-bind="attrs" v-on="on"
                                    color="error">mdi-hospital-box-outline</v-icon>
                                </v-btn>
                              </template>
                              <span>Annulé</span>
                            </v-tooltip>
                          </v-list>
                        </v-menu>
                      </td>
                      <td>{{ item.beneficiaryType }}</td>
                      <td>{{ item.fullName }}</td>
                      <td>{{ item.contact }}</td>
                      <!-- <td>{{ item.contact }}</td> -->
                      <td>{{ item.amount }}</td>
                      <td>{{ item.agreementDate }}</td>
                      <td>{{ item.secondSignatureDate }}</td>
                      <td>{{ item.financialServiceSendDate }}</td>
                      <td>{{ item.financialServiceWithdrawalDate }}</td>
                      <td>{{ item.receptionServiceSendDate }}</td>
                      <td>{{ item.checkNumber }}</td>
                      <td>{{ item.bank ? item.bank.name : "" }}</td>
                      <td>{{ item.checkDate }}</td>
                      <td>{{ item.printed == true ? "Oui" : "Non" }}</td>
                      <td>{{ item.printingDate }}</td>
                    </tr>
                  </template>
                  <template v-slot:no-data>
                    <v-img src="../../assets/noPiority.png" max-height="100" width="100" alt="logo"></v-img>
                  </template>
                </v-data-table>
              </v-card-text>
              <!-- <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="error darken-1"
                  class="mr-5"
                  @click="addFile = false"
                  text
                >
                  Fermer
                </v-btn>
                <v-btn color="success darken-1" @click="addPvFormModal()">
                  Enregistrer le dossier
                </v-btn>
              </v-card-actions> -->
            </v-card>
          </v-dialog>
          <v-dialog v-model="printDocChèque" max-width="1900px">
            <v-card style="border-left: 10px solid #3A1C71">
              <v-card-title>
                <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;">Listing des demandes</span>
              </v-card-title>
  
              <v-card-text>
  
                <v-expansion-panels flat style="border: 1px solid #3A1C71;margin-bottom:30px">
                  <v-expansion-panel class="elevation-0">
                    <v-expansion-panel-header>
                      <span>
                        <v-icon class="ml-2" left> mdi-filter-variant </v-icon> Tri /
                        Recherche ...
                      </span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-text-field color="#3A1C71" label="Date deuxieme signature début" class="pt-5 pa-2"
                            prepend-inner-icon="mdi-magnify" v-model="beneficiarySearchData.secondSignatureDateStart"
                            type="date" filled dense outlined flat background-color="grey lighten-4" rounded></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field color="#3A1C71" label="Date deuxieme signature fin" class="pt-5 pa-2"
                            prepend-inner-icon="mdi-magnify" v-model="beneficiarySearchData.secondSignatureDateEnd"
                            type="date" filled dense outlined flat background-color="grey lighten-4" rounded></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-select :items="userNameListe" color="#3A1C71" label="Nom agent" class="pt-5 pa-2" filled
                            prepend-inner-icon="mdi-magnify" dense v-model="beneficiarySearchData.agentName" outlined flat
                            background-color="grey lighten-4" rounded></v-select>
  
                        </v-col>
                      </v-row>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="#3A1C71" outlined pill rounded class="mr-2" @click="makeBeneficiaryFilter()">
                          <v-icon left>
                            mdi-magnify
                          </v-icon>
                          Appliquer la recherche
                        </v-btn>
                        <v-btn color="#1D6F42" outlined pill rounded :href="beneficiaryDataFileLink" target="_blank">
                          <v-icon size="30" class="ml-3 mr-3" color="#1D6F42" left>
                            mdi-microsoft-excel
                          </v-icon>
                          Exporter vers un tableau EXCEL
                        </v-btn>
                      </v-card-actions>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-data-table v-model="selected" :headers="headersDoc" :items="offerDoc" item-key="_id" show-select
                  class="elevation-0" background-color="red" :single-expanded="singleExpand" :expanded.sync="expand" show-expand color="#3A1C71" :loading="loading ? '#3A1C71' : null">
                  <template v-slot:top>
  
                    <v-row>
                      <v-switch v-model="singleSelect" @change="showNotPrint()" color="#3A1C71" class="mb-5 ml-5"
                        label="Pas encore imprimer"></v-switch>
                      <v-spacer></v-spacer>
                      <v-btn class="mr-2 mt-5 mb-5 btnDesign" :loading="loading" :disabled="loading" color="#3A1C71"
                        text-color="white" pill @click="printComptableDoc()">
                        Imprimer le rapport
                        <v-icon class="ml-2" left> mdi-plus-box-multiple </v-icon>
                      </v-btn></v-row>
                  </template>
  
                  <template v-slot:expanded-item="{headers, item}">
                    <td :colspan="headers.length">{{getText(item)}}</td>
  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
      <template>
        <div>
          <v-data-table :headers="headers" :items="offer" :items-per-page="10" local="fr" class="elevation-0"
            background-color="red" color="#3A1C71" :loading="loading ? '#3A1C71' : null">
            <template v-slot:item="{ item }">
              <tr class="miniTableRow green-bg">
                <td>
                  {{ item.actions }}
                  <v-menu elevation="0" right offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on" class="mr-10">
                        <v-icon color="success" size="30">mdi-forwardburger</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <!-- <v-tooltip bottom color="warning">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn class="ml-3" icon>
                            <v-icon size="20" @click="handleClick(item)" v-bind="attrs" v-on="on" color="warning">
                              mdi-slash-forward-box</v-icon>
                          </v-btn>
                        </template>
                        <span>Répartition de l'offre</span>
                      </v-tooltip> -->
                      <v-tooltip bottom color="success">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn class="ml-3" icon>
                            <v-icon size="20" @click="matérielClick(item)" color="success" v-bind="attrs" v-on="on">
                              mdi-palette-swatch-variant</v-icon>
                          </v-btn>
                        </template>
                        <span>Etude matérielle </span>
                      </v-tooltip>
                      <v-tooltip bottom color="grey darken-4">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn class="ml-3" icon>
                            <v-icon size="20" color="grey darken-4" v-bind="attrs" v-on="on"
                              @click="bodyStudyClick(item)">mdi-account-outline account-alert-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>Etude Corporelle</span>
                      </v-tooltip>
                      <v-tooltip bottom color="grey darken-4">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn class="ml-3" icon>
                            <v-icon size="20" color="grey darken-4" v-bind="attrs" v-on="on"
                              @click="individualBodyStudyClick(item)">mdi-account-injury-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>Etude individuelle accidents</span>
                      </v-tooltip>
                      <v-tooltip bottom color="grey darken-4">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn class="ml-3" icon>
                            <v-icon size="20" color="error darken-4" v-bind="attrs" v-on="on"
                              @click="deathStudyClick(item)">
                              mdi-emoticon-dead-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>Etude décès</span>
                      </v-tooltip>
                      <v-tooltip bottom color="grey darken-4">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn class="ml-3" icon>
                            <v-icon size="20" color="error darken-4" v-bind="attrs" v-on="on" @click="provisionClick(item)">
                              mdi-podium-silver</v-icon>
                          </v-btn>
                        </template>
                        <span>Provision</span>
                      </v-tooltip>
                      <v-tooltip bottom color="grey darken-4">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn class="ml-3" icon>
                            <v-icon size="20" color="error darken-4" v-bind="attrs" v-on="on"
                              @click="indemnityStudyClick(item)">
                              mdi-hospital-box-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>Expertise amiable</span>
                      </v-tooltip>
                      <v-tooltip bottom color="grey darken-4">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn class="ml-3" icon>
                            <v-icon size="20" color="error darken-4" v-bind="attrs" v-on="on"
                              @click="morePayementStudyClick(item)">
                              mdi-dots-horizontal-circle-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>Autres règlement</span>
                      </v-tooltip>
                    </v-list>
                  </v-menu>
                </td>
                <!-- <td>
                  <v-chip :color="getColor(item.status)" dark>
                    {{ item.operationType }}
                  </v-chip>
                </td> -->
                <td>
                  <v-chip :color="getColor(item.status)" dark>
                    {{ item.status }}
                  </v-chip>
                </td>
  
                <!-- <td>{{ item.status }}</td> -->
                <td>{{ item.sinister ? item.sinister.sinisterNumber : "" }}</td>
  
                <td>{{ item.sinister ? item.sinister.name : "" }}</td>
                <td>
                  {{ item.sinisterVictim ? item.sinisterVictim.fullName : "" }}
                </td>
                <td>
                  {{ item.sinisterVictim ? item.sinisterVictim.phone : "" }}
                </td>
  
              </tr>
            </template>

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
  import { defaultMethods, messages } from "../../utils/data";
  import {
    addFileJson,
    
    // addOperationTypeForm,
    updateVictimeFileForm,
    // addVictimeFileForm,
    // updateFileForm,
    addstudyMatéérial,
    updateEtudeOffre,
    updateDegat,
    addDegat,
    addBeneficiary,
    updateBeneficiary,
    addstudyBody,
    addstudyIndividualBody,
    addstudyIndividual,
    addAyantDroit,
    updateAyantDroit,
    deleteAyantDroit,
    addDeathStudy,
    removeBeneficiary
    // addMorePayement,
    // updateMorePayement
  } from "@/api/user.js";

  export default {
    name:'etudeComponent',
  
    data: () => ({
      dialog: false,
      dialogDelete: false,
      loading: false,
      addFileExcel: false,
      StatusIiemss: [
        // "En cours",
        "Consultation",
        "Expertise amiable",
        // "Contre expertise",
      ],
      addFile: false,
      page: 1,
      morePayementStudyForm: false,
      pages: 1,
      pvManage: false,
      sinsiterSelectId: "",
      excelFile: null,
      addMorePaymente: false,
      morePayementStudy: [],
      adnewObject: {},
      beneficiary: {},
      showAllFil: false,
      beneficiaryDel: {},
      delForm: false,
      itemSelect: "",
      signataire: "",
      signataireChoice: false,
      deathStudySave: {},
      HistoryProvisionData: {
        sinisterNumber: "",
        name: "",
        age: "",
        totalFmp: 0,
        totalProvision: 0
      },
      beneficiaryProvisionData: {
  
      },
      beneficiarySearchData: {},
      indemnityStudy: {
        sinisterNumber: "",
        offerDate: "",
        secondSignatureDate: "",
        financialServiceSendDate: "",
        financialServiceWithdrawalDate: "",
        receptionServiceSendDate: "",
        documentReceptionDate: "",
        checkNumber: "",
        Bank: "",
        checkDate: "",
        userNameListe: [],
        amicableExpertiseProvision: 0,
        age: 0,
        amount: 0,
        amountDebour: 0,
        amountDM: 0,
        amountDI: 0,
        totalFmp: 150000,
      },
      singleSelect: true,
      victimeDialogModal: false,
      selectedDocumentsModal: [],
      BankNameListe: [],
      typeOfStudy: "",
      victimeSelectID: "",
      matérialDocLink: "",
      bodyDocLink: "",
      individualBodyDocLink: "",
      deathDocLink: "",
      printListDoc: false,
      indemnityForm: false,
      delAyantdroitForm: false,
      ayantdroitSelectID: "",
      provisionDocLink: "",
      typeOfSex: ["Masculin", "Féminin"],
      decision: ["Oui", "Non"],
      natureListe: [
        "Débours",
        "FMP",
        "Honoraires Corporelles",
        "Honoraires Matérielles",
        "Honoraires Investigations",
        "Honoraires D'avocat",
        "Procès Verbaux"
      ],
      repartitionKeysData: ["Quatre enfant à charge", "Au-delà de quatre enfant", "Sans conjoint, sans enfant", "Avec conjoint(s), sans enfant", "Avec enfant(s), sans conjoint", "Sans clé de répartition"],
      commissariatNameList: [],
      enquetteurNameList: [],
      fille21: [
        {
          age: 0,
          franc: 11.022,
        },
        {
          age: 1,
          franc: 10.959,
        },
        {
          age: 2,
          franc: 10.696,
        },
        {
          age: 3,
          franc: 10.401,
        },
        {
          age: 4,
          franc: 10.084,
        },
        {
          age: 5,
          franc: 9.745,
        },
        {
          age: 6,
          franc: 9.383,
        },
        {
          age: 7,
          franc: 8.996,
        },
        {
          age: 8,
          franc: 8.584,
        },
        {
          age: 9,
          franc: 8.144,
        },
        {
          age: 10,
          franc: 7.676,
        },
        {
          age: 11,
          franc: 7.177,
        },
        {
          age: 12,
          franc: 6.645,
        },
        {
          age: 13,
          franc: 6.079,
        },
        {
          age: 14,
          franc: 5.476,
        },
        {
          age: 15,
          franc: 4.834,
        },
        {
          age: 16,
          franc: 4.15,
        },
        {
          age: 17,
          franc: 3.421,
        },
        {
          age: 18,
          franc: 2.646,
        },
        {
          age: 19,
          franc: 1.819,
        },
        {
          age: 20,
          franc: 0.938,
        },
        {
          age: 21,
          franc: 0,
        },
      ],
      fille25: [
        {
          age: 0,
          franc: 11.908,
        },
        {
          age: 1,
          franc: 11.92,
        },
        {
          age: 2,
          franc: 11.721,
        },
        {
          age: 3,
          franc: 11.495,
        },
        {
          age: 4,
          franc: 11.249,
        },
        {
          age: 5,
          franc: 10.986,
        },
        {
          age: 6,
          franc: 10.705,
        },
        {
          age: 7,
          franc: 10.405,
        },
        {
          age: 8,
          franc: 10.085,
        },
        {
          age: 9,
          franc: 9.743,
        },
        {
          age: 10,
          franc: 9.379,
        },
        {
          age: 11,
          franc: 8.991,
        },
        {
          age: 12,
          franc: 8.578,
        },
        {
          age: 13,
          franc: 8.138,
        },
        {
          age: 14,
          franc: 7.67,
        },
        {
          age: 15,
          franc: 7.171,
        },
        {
          age: 16,
          franc: 6.64,
        },
        {
          age: 17,
          franc: 6.074,
        },
        {
          age: 18,
          franc: 5.472,
        },
        {
          age: 19,
          franc: 4.831,
        },
        {
          age: 20,
          franc: 4.148,
        },
        {
          age: 21,
          franc: 3.42,
        },
        {
          age: 22,
          franc: 2.645,
        },
        {
          age: 23,
          franc: 1.819,
        },
        {
          age: 24,
          franc: 0.938,
        },
        {
          age: 25,
          franc: 0,
        },
      ],
      man21: [
        {
          age: 0,
          franc: 10.941,
        },
        {
          age: 1,
          franc: 10.942,
        },
        {
          age: 2,
          franc: 10.68,
        },
        {
          age: 3,
          franc: 10.387,
        },
        {
          age: 4,
          franc: 10.071,
        },
        {
          age: 5,
          franc: 9.732,
        },
        {
          age: 6,
          franc: 9.37,
        },
        {
          age: 7,
          franc: 8.984,
        },
        {
          age: 8,
          franc: 8.573,
        },
        {
          age: 9,
          franc: 8.134,
        },
        {
          age: 10,
          franc: 7.666,
        },
        {
          age: 11,
          franc: 7.167,
        },
        {
          age: 12,
          franc: 6.636,
        },
        {
          age: 13,
          franc: 6.07,
        },
        {
          age: 14,
          franc: 5.468,
        },
        {
          age: 15,
          franc: 4.826,
        },
        {
          age: 16,
          franc: 4.143,
        },
        {
          age: 17,
          franc: 3.416,
        },
        {
          age: 18,
          franc: 2.642,
        },
        {
          age: 19,
          franc: 1.817,
        },
        {
          age: 20,
          franc: 0.938,
        },
        {
          age: 21,
          franc: 0,
        },
      ],
      man25: [
        {
          age: 0,
          franc: 11.815,
        },
        {
          age: 1,
          franc: 11.896,
        },
        {
          age: 2,
          franc: 11.698,
        },
        {
          age: 3,
          franc: 11.473,
        },
        {
          age: 4,
          franc: 11.228,
        },
        {
          age: 5,
          franc: 10.965,
        },
        {
          age: 6,
          franc: 10.684,
        },
        {
          age: 7,
          franc: 10.384,
        },
        {
          age: 8,
          franc: 10.064,
        },
        {
          age: 9,
          franc: 9.723,
        },
        {
          age: 10,
          franc: 9.359,
        },
        {
          age: 11,
          franc: 8.971,
        },
        {
          age: 12,
          franc: 8.558,
        },
        {
          age: 13,
          franc: 8.118,
        },
        {
          age: 14,
          franc: 7.65,
        },
        {
          age: 15,
          franc: 7.151,
        },
        {
          age: 16,
          franc: 6.621,
        },
        {
          age: 17,
          franc: 6.057,
        },
        {
          age: 18,
          franc: 5.457,
        },
        {
          age: 19,
          franc: 4.819,
        },
        {
          age: 20,
          franc: 4.139,
        },
        {
          age: 21,
          franc: 3.414,
        },
        {
          age: 22,
          franc: 2.641,
        },
        {
          age: 23,
          franc: 1.816,
        },
        {
          age: 24,
          franc: 0.938,
        },
        {
          age: 25,
          franc: 0,
        },
      ],
      mere60: [
        {
          age: 0,
          franc: 14.606,
        },
        {
          age: 1,
          franc: 14.848,
        },
        {
          age: 2,
          franc: 14.845,
        },
        {
          age: 3,
          franc: 14.825,
        },
        {
          age: 4,
          franc: 14.798,
        },
        {
          age: 5,
          franc: 14.768,
        },
        {
          age: 6,
          franc: 14.734,
        },
        {
          age: 7,
          franc: 14.697,
        },
        {
          age: 8,
          franc: 14.658,
        },
        {
          age: 9,
          franc: 14.615,
        },
        {
          age: 10,
          franc: 14.569,
        },
        {
          age: 11,
          franc: 14.519,
        },
        {
          age: 12,
          franc: 14.467,
        },
        {
          age: 13,
          franc: 14.411,
        },
        {
          age: 14,
          franc: 14.352,
        },
        {
          age: 15,
          franc: 14.29,
        },
        {
          age: 16,
          franc: 14.224,
        },
        {
          age: 17,
          franc: 14.155,
        },
        {
          age: 18,
          franc: 14.083,
        },
        {
          age: 19,
          franc: 14.006,
        },
        {
          age: 20,
          franc: 13.925,
        },
        {
          age: 21,
          franc: 13.84,
        },
        {
          age: 22,
          franc: 13.749,
        },
        {
          age: 23,
          franc: 13.652,
        },
        {
          age: 24,
          franc: 13.55,
        },
        {
          age: 25,
          franc: 13.441,
        },
        {
          age: 26,
          franc: 13.326,
        },
        {
          age: 27,
          franc: 13.204,
        },
        {
          age: 28,
          franc: 13.074,
        },
        {
          age: 29,
          franc: 12.937,
        },
        {
          age: 30,
          franc: 12.791,
        },
        {
          age: 31,
          franc: 12.037,
        },
        {
          age: 32,
          franc: 12.473,
        },
        {
          age: 33,
          franc: 12.299,
        },
        {
          age: 34,
          franc: 12.113,
        },
        {
          age: 35,
          franc: 11.917,
        },
        {
          age: 36,
          franc: 11.709,
        },
        {
          age: 37,
          franc: 11.487,
        },
        {
          age: 38,
          franc: 11.25,
        },
        {
          age: 39,
          franc: 11.003,
        },
        {
          age: 40,
          franc: 10.738,
        },
        {
          age: 41,
          franc: 10.457,
        },
        {
          age: 42,
          franc: 10.158,
        },
        {
          age: 43,
          franc: 9.841,
        },
        {
          age: 44,
          franc: 9.505,
        },
        {
          age: 45,
          franc: 9.148,
        },
        {
          age: 46,
          franc: 8.768,
        },
        {
          age: 47,
          franc: 8.365,
        },
        {
          age: 48,
          franc: 7.937,
        },
        {
          age: 49,
          franc: 7.482,
        },
        {
          age: 50,
          franc: 6.998,
        },
        {
          age: 51,
          franc: 6.483,
        },
        {
          age: 52,
          franc: 5.936,
        },
        {
          age: 53,
          franc: 5.353,
        },
        {
          age: 54,
          franc: 4.731,
        },
        {
          age: 55,
          franc: 4.069,
        },
        {
          age: 56,
          franc: 3.361,
        },
        {
          age: 57,
          franc: 2.605,
        },
        {
          age: 58,
          franc: 1.797,
        },
        {
          age: 59,
          franc: 0.93,
        },
        {
          age: 60,
          franc: 0,
        },
      ],
      mere65: [
        {
          age: 0,
          franc: 14.685,
        },
        {
          age: 1,
          franc: 14.935,
        },
        {
          age: 2,
          franc: 14.938,
        },
        {
          age: 3,
          franc: 14.923,
        },
        {
          age: 4,
          franc: 14.903,
        },
        {
          age: 5,
          franc: 14.88,
        },
        {
          age: 6,
          franc: 14.853,
        },
        {
          age: 7,
          franc: 14.824,
        },
        {
          age: 8,
          franc: 14.793,
        },
        {
          age: 9,
          franc: 14.759,
        },
        {
          age: 10,
          franc: 14.722,
        },
        {
          age: 11,
          franc: 14.683,
        },
        {
          age: 12,
          franc: 14.641,
        },
        {
          age: 13,
          franc: 14.597,
        },
        {
          age: 14,
          franc: 14.55,
        },
        {
          age: 15,
          franc: 14.5,
        },
        {
          age: 16,
          franc: 14.449,
        },
        {
          age: 17,
          franc: 14.394,
        },
        {
          age: 18,
          franc: 14.337,
        },
        {
          age: 19,
          franc: 14.277,
        },
        {
          age: 20,
          franc: 14.214,
        },
        {
          age: 21,
          franc: 14.148,
        },
        {
          age: 22,
          franc: 14.077,
        },
        {
          age: 23,
          franc: 14.002,
        },
        {
          age: 24,
          franc: 13.923,
        },
        {
          age: 25,
          franc: 13.839,
        },
        {
          age: 26,
          franc: 13.75,
        },
        {
          age: 27,
          franc: 13.655,
        },
        {
          age: 28,
          franc: 13.556,
        },
        {
          age: 29,
          franc: 13.45,
        },
        {
          age: 30,
          franc: 13.338,
        },
        {
          age: 31,
          franc: 13.22,
        },
        {
          age: 32,
          franc: 13.094,
        },
        {
          age: 33,
          franc: 12.961,
        },
        {
          age: 34,
          franc: 12.82,
        },
        {
          age: 35,
          franc: 12.671,
        },
        {
          age: 36,
          franc: 12.512,
        },
        {
          age: 37,
          franc: 12.344,
        },
        {
          age: 38,
          franc: 12.166,
        },
        {
          age: 39,
          franc: 11.978,
        },
        {
          age: 40,
          franc: 11.778,
        },
        {
          age: 41,
          franc: 11.567,
        },
        {
          age: 42,
          franc: 11.343,
        },
        {
          age: 43,
          franc: 11.105,
        },
        {
          age: 44,
          franc: 10.854,
        },
        {
          age: 45,
          franc: 10.588,
        },
        {
          age: 46,
          franc: 10.306,
        },
        {
          age: 47,
          franc: 10.008,
        },
        {
          age: 48,
          franc: 9.692,
        },
        {
          age: 49,
          franc: 9.358,
        },
        {
          age: 50,
          franc: 9.003,
        },
        {
          age: 51,
          franc: 8.628,
        },
        {
          age: 52,
          franc: 8.23,
        },
        {
          age: 53,
          franc: 7.808,
        },
        {
          age: 54,
          franc: 7.36,
        },
        {
          age: 55,
          franc: 6.885,
        },
        {
          age: 56,
          franc: 6.38,
        },
        {
          age: 57,
          franc: 5.844,
        },
        {
          age: 58,
          franc: 5.272,
        },
        {
          age: 59,
          franc: 4.664,
        },
        {
          age: 60,
          franc: 4.015,
        },
        {
          age: 61,
          franc: 3.321,
        },
        {
          age: 62,
          franc: 2.578,
        },
        {
          age: 63,
          franc: 1.781,
        },
        {
          age: 64,
          franc: 0.924,
        },
        {
          age: 65,
          franc: 0,
        },
      ],
      mere100: [
        {
          age: 0,
          franc: 14.806,
        },
        {
          age: 1,
          franc: 15.065,
        },
        {
          age: 2,
          franc: 15.077,
        },
        {
          age: 3,
          franc: 15.072,
        },
        {
          age: 4,
          franc: 15.061,
        },
        {
          age: 5,
          franc: 15.048,
        },
        {
          age: 6,
          franc: 15.033,
        },
        {
          age: 7,
          franc: 15.016,
        },
        {
          age: 8,
          franc: 14.997,
        },
        {
          age: 9,
          franc: 14.976,
        },
        {
          age: 10,
          franc: 14.953,
        },
        {
          age: 11,
          franc: 14.929,
        },
        {
          age: 12,
          franc: 14.904,
        },
        {
          age: 13,
          franc: 14.876,
        },
        {
          age: 14,
          franc: 14.848,
        },
        {
          age: 15,
          franc: 14.818,
        },
        {
          age: 16,
          franc: 14.787,
        },
        {
          age: 17,
          franc: 14.755,
        },
        {
          age: 18,
          franc: 14.721,
        },
        {
          age: 19,
          franc: 14.686,
        },
        {
          age: 20,
          franc: 14.65,
        },
        {
          age: 21,
          franc: 14.612,
        },
        {
          age: 22,
          franc: 14.572,
        },
        {
          age: 23,
          franc: 14.529,
        },
        {
          age: 24,
          franc: 14.485,
        },
        {
          age: 25,
          franc: 14.438,
        },
        {
          age: 26,
          franc: 14.388,
        },
        {
          age: 27,
          franc: 14.336,
        },
        {
          age: 28,
          franc: 14.281,
        },
        {
          age: 29,
          franc: 14.223,
        },
        {
          age: 30,
          franc: 14.163,
        },
        {
          age: 31,
          franc: 14.099,
        },
        {
          age: 32,
          franc: 14.032,
        },
        {
          age: 33,
          franc: 13.961,
        },
        {
          age: 34,
          franc: 13.886,
        },
        {
          age: 35,
          franc: 13.807,
        },
        {
          age: 36,
          franc: 13.724,
        },
        {
          age: 37,
          franc: 13.636,
        },
        {
          age: 38,
          franc: 13.544,
        },
        {
          age: 39,
          franc: 13.448,
        },
        {
          age: 40,
          franc: 13.346,
        },
        {
          age: 41,
          franc: 13.24,
        },
        {
          age: 42,
          franc: 13.128,
        },
        {
          age: 43,
          franc: 13.011,
        },
        {
          age: 44,
          franc: 12.888,
        },
        {
          age: 45,
          franc: 12.76,
        },
        {
          age: 46,
          franc: 12.625,
        },
        {
          age: 47,
          franc: 12.485,
        },
        {
          age: 48,
          franc: 12.339,
        },
        {
          age: 49,
          franc: 12.186,
        },
        {
          age: 50,
          franc: 12.026,
        },
        {
          age: 51,
          franc: 11.861,
        },
        {
          age: 52,
          franc: 11.688,
        },
        {
          age: 53,
          franc: 11.509,
        },
        {
          age: 54,
          franc: 11.323,
        },
        {
          age: 55,
          franc: 11.13,
        },
        {
          age: 56,
          franc: 10.931,
        },
        {
          age: 57,
          franc: 10.725,
        },
        {
          age: 58,
          franc: 10.512,
        },
        {
          age: 59,
          franc: 10.293,
        },
        {
          age: 60,
          franc: 10.067,
        },
        {
          age: 61,
          franc: 9.835,
        },
        {
          age: 62,
          franc: 9.597,
        },
        {
          age: 63,
          franc: 9.352,
        },
        {
          age: 64,
          franc: 9.103,
        },
        {
          age: 65,
          franc: 8.848,
        },
        {
          age: 66,
          franc: 8.588,
        },
        {
          age: 67,
          franc: 8.324,
        },
        {
          age: 68,
          franc: 8.056,
        },
        {
          age: 69,
          franc: 7.784,
        },
        {
          age: 70,
          franc: 7.509,
        },
        {
          age: 71,
          franc: 7.232,
        },
        {
          age: 72,
          franc: 6.953,
        },
        {
          age: 73,
          franc: 6.672,
        },
        {
          age: 74,
          franc: 6.391,
        },
        {
          age: 75,
          franc: 6.11,
        },
        {
          age: 76,
          franc: 5.83,
        },
        {
          age: 77,
          franc: 5.551,
        },
        {
          age: 78,
          franc: 5.275,
        },
        {
          age: 79,
          franc: 5.001,
        },
        {
          age: 80,
          franc: 4.731,
        },
        {
          age: 81,
          franc: 4.466,
        },
        {
          age: 82,
          franc: 4.205,
        },
        {
          age: 83,
          franc: 3.95,
        },
        {
          age: 84,
          franc: 3.701,
        },
        {
          age: 85,
          franc: 3.459,
        },
        {
          age: 86,
          franc: 3.224,
        },
        {
          age: 87,
          franc: 2.997,
        },
        {
          age: 88,
          franc: 2.778,
        },
        {
          age: 89,
          franc: 2.567,
        },
        {
          age: 90,
          franc: 2.365,
        },
        {
          age: 91,
          franc: 2.173,
        },
        {
          age: 92,
          franc: 1.989,
        },
        {
          age: 93,
          franc: 1.815,
        },
        {
          age: 94,
          franc: 1.65,
        },
        {
          age: 95,
          franc: 1.494,
        },
        {
          age: 96,
          franc: 1.348,
        },
        {
          age: 97,
          franc: 1.21,
        },
        {
          age: 98,
          franc: 1.082,
        },
        {
          age: 99,
          franc: 0.963,
        },
        {
          age: 100,
          franc: 0.851,
        },
      ],
      pere60: [
        {
          age: 0,
          franc: 14.425,
        },
        {
          age: 1,
          franc: 14.745,
        },
        {
          age: 2,
          franc: 14.739,
        },
        {
          age: 3,
          franc: 14.715,
        },
        {
          age: 4,
          franc: 14.684,
        },
        {
          age: 5,
          franc: 14.648,
        },
        {
          age: 6,
          franc: 14.609,
        },
        {
          age: 7,
          franc: 14.566,
        },
        {
          age: 8,
          franc: 14.519,
        },
        {
          age: 9,
          franc: 14.47,
        },
        {
          age: 10,
          franc: 14.417,
        },
        {
          age: 11,
          franc: 14.36,
        },
        {
          age: 12,
          franc: 14.299,
        },
        {
          age: 13,
          franc: 14.235,
        },
        {
          age: 14,
          franc: 14.167,
        },
        {
          age: 15,
          franc: 14.095,
        },
        {
          age: 16,
          franc: 14.022,
        },
        {
          age: 17,
          franc: 13.945,
        },
        {
          age: 18,
          franc: 13.867,
        },
        {
          age: 19,
          franc: 13.785,
        },
        {
          age: 20,
          franc: 13.7,
        },
        {
          age: 21,
          franc: 13.61,
        },
        {
          age: 22,
          franc: 13.515,
        },
        {
          age: 23,
          franc: 13.415,
        },
        {
          age: 24,
          franc: 13.309,
        },
        {
          age: 25,
          franc: 13.196,
        },
        {
          age: 26,
          franc: 13.077,
        },
        {
          age: 27,
          franc: 12.95,
        },
        {
          age: 28,
          franc: 12.814,
        },
        {
          age: 29,
          franc: 12.67,
        },
        {
          age: 30,
          franc: 12.517,
        },
        {
          age: 31,
          franc: 12.355,
        },
        {
          age: 32,
          franc: 12.184,
        },
        {
          age: 33,
          franc: 12.004,
        },
        {
          age: 34,
          franc: 11.813,
        },
        {
          age: 35,
          franc: 11.612,
        },
        {
          age: 36,
          franc: 11.399,
        },
        {
          age: 37,
          franc: 11.175,
        },
        {
          age: 38,
          franc: 10.938,
        },
        {
          age: 39,
          franc: 10.688,
        },
        {
          age: 40,
          franc: 10.423,
        },
        {
          age: 41,
          franc: 10.144,
        },
        {
          age: 42,
          franc: 9.85,
        },
        {
          age: 43,
          franc: 9.538,
        },
        {
          age: 44,
          franc: 9.209,
        },
        {
          age: 45,
          franc: 8.861,
        },
        {
          age: 46,
          franc: 8.493,
        },
        {
          age: 47,
          franc: 8.103,
        },
        {
          age: 48,
          franc: 7.6899999999999995,
        },
        {
          age: 49,
          franc: 7.252,
        },
        {
          age: 50,
          franc: 6.787,
        },
        {
          age: 51,
          franc: 6.294,
        },
        {
          age: 52,
          franc: 5.769,
        },
        {
          age: 53,
          franc: 5.21,
        },
        {
          age: 54,
          franc: 4.613,
        },
        {
          age: 55,
          franc: 3.975,
        },
        {
          age: 56,
          franc: 3.293,
        },
        {
          age: 57,
          franc: 2.56,
        },
        {
          age: 58,
          franc: 1.772,
        },
        {
          age: 59,
          franc: 0.921,
        },
        {
          age: 60,
          franc: 0,
        },
      ],
      pere65: [
        {
          age: 0,
          franc: 14.492,
        },
        {
          age: 1,
          franc: 14.819,
        },
        {
          age: 2,
          franc: 14.818,
        },
        {
          age: 3,
          franc: 14.799,
        },
        {
          age: 4,
          franc: 14.773,
        },
        {
          age: 5,
          franc: 14.743,
        },
        {
          age: 6,
          franc: 14.71,
        },
        {
          age: 7,
          franc: 14.674,
        },
        {
          age: 8,
          franc: 14.634,
        },
        {
          age: 9,
          franc: 14.592,
        },
        {
          age: 10,
          franc: 14.547,
        },
        {
          age: 11,
          franc: 14.499,
        },
        {
          age: 12,
          franc: 14.447,
        },
        {
          age: 13,
          franc: 14.392,
        },
        {
          age: 14,
          franc: 14.335,
        },
        {
          age: 15,
          franc: 14.276,
        },
        {
          age: 16,
          franc: 14.213,
        },
        {
          age: 17,
          franc: 14.149,
        },
        {
          age: 18,
          franc: 14.084,
        },
        {
          age: 19,
          franc: 14.017,
        },
        {
          age: 20,
          franc: 13.947,
        },
        {
          age: 21,
          franc: 13.873,
        },
        {
          age: 22,
          franc: 13.796,
        },
        {
          age: 23,
          franc: 13.715,
        },
        {
          age: 24,
          franc: 13.628,
        },
        {
          age: 25,
          franc: 13.537,
        },
        {
          age: 26,
          franc: 13.44,
        },
        {
          age: 27,
          franc: 13.337,
        },
        {
          age: 28,
          franc: 13.228,
        },
        {
          age: 29,
          franc: 13.111,
        },
        {
          age: 30,
          franc: 12.988,
        },
        {
          age: 31,
          franc: 12.857,
        },
        {
          age: 32,
          franc: 12.72,
        },
        {
          age: 33,
          franc: 12.575,
        },
        {
          age: 34,
          franc: 12.423,
        },
        {
          age: 35,
          franc: 12.263,
        },
        {
          age: 36,
          franc: 12.095,
        },
        {
          age: 37,
          franc: 11.918,
        },
        {
          age: 38,
          franc: 11.731,
        },
        {
          age: 39,
          franc: 11.536,
        },
        {
          age: 40,
          franc: 11.33,
        },
        {
          age: 41,
          franc: 11.114,
        },
        {
          age: 42,
          franc: 10.886,
        },
        {
          age: 43,
          franc: 10.647,
        },
        {
          age: 44,
          franc: 10.396,
        },
        {
          age: 45,
          franc: 10.132,
        },
        {
          age: 46,
          franc: 9.855,
        },
        {
          age: 47,
          franc: 9.563,
        },
        {
          age: 48,
          franc: 9.255,
        },
        {
          age: 49,
          franc: 8.932,
        },
        {
          age: 50,
          franc: 8.591,
        },
        {
          age: 51,
          franc: 8.232,
        },
        {
          age: 52,
          franc: 7.854,
        },
        {
          age: 53,
          franc: 7.454,
        },
        {
          age: 54,
          franc: 7.031,
        },
        {
          age: 55,
          franc: 6.583,
        },
        {
          age: 56,
          franc: 6.109,
        },
        {
          age: 57,
          franc: 5.604,
        },
        {
          age: 58,
          franc: 5.068,
        },
        {
          age: 59,
          franc: 4.495,
        },
        {
          age: 60,
          franc: 3.881,
        },
        {
          age: 61,
          franc: 3.223,
        },
        {
          age: 62,
          franc: 2.513,
        },
        {
          age: 63,
          franc: 1.745,
        },
        {
          age: 64,
          franc: 0.911,
        },
        {
          age: 65,
          franc: 0,
        },
      ],
      pere100: [
        {
          age: 0,
          franc: 14.576,
        },
        {
          age: 1,
          franc: 14.91,
        },
        {
          age: 2,
          franc: 14.915,
        },
        {
          age: 3,
          franc: 14.903,
        },
        {
          age: 4,
          franc: 14.884,
        },
        {
          age: 5,
          franc: 14.861,
        },
        {
          age: 6,
          franc: 14.835,
        },
        {
          age: 7,
          franc: 14.807,
        },
        {
          age: 8,
          franc: 14.777,
        },
        {
          age: 9,
          franc: 14.744,
        },
        {
          age: 10,
          franc: 14.709,
        },
        {
          age: 11,
          franc: 14.671,
        },
        {
          age: 12,
          franc: 14.631,
        },
        {
          age: 13,
          franc: 14.588,
        },
        {
          age: 14,
          franc: 14.543,
        },
        {
          age: 15,
          franc: 14.497,
        },
        {
          age: 16,
          franc: 14.45,
        },
        {
          age: 17,
          franc: 14.401,
        },
        {
          age: 18,
          franc: 14.353,
        },
        {
          age: 19,
          franc: 14.304,
        },
        {
          age: 20,
          franc: 14.253,
        },
        {
          age: 21,
          franc: 14.2,
        },
        {
          age: 22,
          franc: 14.144,
        },
        {
          age: 23,
          franc: 14.086,
        },
        {
          age: 24,
          franc: 14.025,
        },
        {
          age: 25,
          franc: 13.959,
        },
        {
          age: 26,
          franc: 13.891,
        },
        {
          age: 27,
          franc: 13.818,
        },
        {
          age: 28,
          franc: 13.74,
        },
        {
          age: 29,
          franc: 13.658,
        },
        {
          age: 30,
          franc: 13.571,
        },
        {
          age: 31,
          franc: 13.48,
        },
        {
          age: 32,
          franc: 13.384,
        },
        {
          age: 33,
          franc: 13.284,
        },
        {
          age: 34,
          franc: 13.18,
        },
        {
          age: 35,
          franc: 13.071,
        },
        {
          age: 36,
          franc: 12.958,
        },
        {
          age: 37,
          franc: 12.839,
        },
        {
          age: 38,
          franc: 12.716,
        },
        {
          age: 39,
          franc: 12.588,
        },
        {
          age: 40,
          franc: 12.455,
        },
        {
          age: 41,
          franc: 12.316,
        },
        {
          age: 42,
          franc: 12.172,
        },
        {
          age: 43,
          franc: 12.023,
        },
        {
          age: 44,
          franc: 11.869,
        },
        {
          age: 45,
          franc: 11.709,
        },
        {
          age: 46,
          franc: 11.544,
        },
        {
          age: 47,
          franc: 11.373,
        },
        {
          age: 48,
          franc: 11.197,
        },
        {
          age: 49,
          franc: 11.016,
        },
        {
          age: 50,
          franc: 10.829,
        },
        {
          age: 51,
          franc: 10.637,
        },
        {
          age: 52,
          franc: 10.44,
        },
        {
          age: 53,
          franc: 10.237,
        },
        {
          age: 54,
          franc: 10.03,
        },
        {
          age: 55,
          franc: 9.818,
        },
        {
          age: 56,
          franc: 9.602,
        },
        {
          age: 57,
          franc: 9.381,
        },
        {
          age: 58,
          franc: 9.156,
        },
        {
          age: 59,
          franc: 8.928,
        },
        {
          age: 60,
          franc: 8.696,
        },
        {
          age: 61,
          franc: 8.461,
        },
        {
          age: 62,
          franc: 8.223,
        },
        {
          age: 63,
          franc: 7.983,
        },
        {
          age: 64,
          franc: 7.741,
        },
        {
          age: 65,
          franc: 7.498,
        },
        {
          age: 66,
          franc: 7.254,
        },
        {
          age: 67,
          franc: 7.01,
        },
        {
          age: 68,
          franc: 6.766,
        },
        {
          age: 69,
          franc: 6.523,
        },
        {
          age: 70,
          franc: 6.282,
        },
        {
          age: 71,
          franc: 6.043,
        },
        {
          age: 72,
          franc: 5.808,
        },
        {
          age: 73,
          franc: 5.577,
        },
        {
          age: 74,
          franc: 5.351,
        },
        {
          age: 75,
          franc: 5.132,
        },
        {
          age: 76,
          franc: 4.921,
        },
        {
          age: 77,
          franc: 4.72,
        },
        {
          age: 78,
          franc: 4.531,
        },
        {
          age: 79,
          franc: 4.356,
        },
        {
          age: 80,
          franc: 2.707,
        },
        {
          age: 81,
          franc: 3.582,
        },
        {
          age: 82,
          franc: 3.371,
        },
        {
          age: 83,
          franc: 3.167,
        },
        {
          age: 84,
          franc: 2.969,
        },
        {
          age: 85,
          franc: 2.778,
        },
        {
          age: 86,
          franc: 2.593,
        },
        {
          age: 87,
          franc: 2.415,
        },
        {
          age: 88,
          franc: 2.244,
        },
        {
          age: 89,
          franc: 2.081,
        },
        {
          age: 90,
          franc: 1.924,
        },
        {
          age: 91,
          franc: 1.775,
        },
        {
          age: 92,
          franc: 1.633,
        },
        {
          age: 93,
          franc: 1.498,
        },
        {
          age: 94,
          franc: 1.371,
        },
        {
          age: 95,
          franc: 1.25,
        },
        {
          age: 96,
          franc: 1.136,
        },
        {
          age: 97,
          franc: 1.03,
        },
        {
          age: 98,
          franc: 0.93,
        },
        {
          age: 99,
          franc: 0.836,
        },
        {
          age: 100,
          franc: 0.748,
        },
      ],
      cléDePartage: 0,
      ayantDroitDataListe: {
        quality: "",
        age: 0,
        sex: "",
        sharingRate: 0,
        capitalize: 0,
        pensionFranc: 0,
        economicDamage: 0,
        moralDamage: 0,
        compensationDue: 0,
        share: 0
      },
      quatreEnfant: [
        {
          type: "ascendants",
          pourcent: 5
        },
        {
          type: "conjoints",
          pourcent: 40
        },
        {
          type: "enfants",
          pourcent: 30
        },
        {
          type: "orphelins",
          pourcent: 50
        }
      ],
      plusQuatreEnfant: [
        {
          type: "ascendants",
          pourcent: 5
        },
        {
          type: "conjoints",
          pourcent: 35
        },
        {
          type: "enfants",
          pourcent: 40
        },
        {
          type: "orphelins",
          pourcent: 50
        }
      ],
      sansRien: [
        {
          type: "ascendants",
          pourcent: 25
        },
        {
          type: "conjoints",
          pourcent: 0
        },
        {
          type: "enfants",
          pourcent: 0
        },
        {
          type: "orphelins",
          pourcent: 0
        }
      ],
      avecConjoitSansEnfant: [
        {
          type: "ascendants",
          pourcent: 15
        },
        {
          type: "conjoints",
          pourcent: 40
        },
        {
          type: "enfants",
          pourcent: 0
        },
        {
          type: "orphelins",
          pourcent: 0
        }
      ],
      sansConjoitAvecEnfant: [
        {
          type: "ascendants",
          pourcent: 15
        },
        {
          type: "conjoints",
          pourcent: 0
        },
        {
          type: "enfants",
          pourcent: 50
        },
        {
          type: "orphelins",
          pourcent: 60
        }
      ],
      victimeNameList: [],
      degatData:
      {
        documents: "",
        number: 0,
        amountRequested: 0,
        amountToBePaid: 0,
        patterns: ""
  
      },
      matérialSelectedId: "",
  
      bodyIndividualStudyOfferData: {
        monthlySMIG: 0,
        monthlySMIGResidence: 0,
        withholdingSMIG: 0,
        annualSMIG: 0,
        monthlyIncome: 0,
        annualIncome: 0,
        numberOfITTDays: 0,
        fmp: 0,
        itt: 0,
        age: 0,
        IPRate: 0,
        ittAmount: 0,
        contractualIttAmount: 0,
        pointValue: 0,
        dailyAllowance: 0,
        numberOfDays: 0,
        disability: 0,
        lumpSumDisability: 0,
        deathBenefit: 0,
        totalDamage: 0,
        disbursements: 0,
        provision: 0,
        thirdPartyPayers: 0,
        compensationToBeReceived: 0,
      },
      deathStudyOfferData: {
        monthlySMIG: 0,
        monthlySMIGResidence: 0,
        withholdingSMIG: 0,
        annualSMIG: 0,
        monthlyIncome: 0,
        annualIncome: 0,
        numberOfITTDays: 0,
        fmp: 0,
        itt: 0,
        age: 0,
        totalPrejudiceEconomic: 0,
        totalPrejudiceMoral: 0,
        totalIndemniteDue: 0,
        totalPartage: 0,
        disbursements: 0,
        material: 0,
        provision: 0,
        underTotal: 0,
        funeralExpenses: 0,
        totalCompensation: 0,
      },
      materialDamageData: {
        indemnity: 0,
        total: 0,
        sharingRate: 0
      },
      addProvision: false,
      bodyStudyOfferData: {
        monthlySMIG: 0,
        monthlySMIGResidence: 0,
        withholdingSMIG: 0,
        annualSMIG: 0,
        monthlyIncome: 0,
        annualIncome: 0,
        numberOfITTDays: 0,
        fmp: 0,
        ITT: 0,
        age: 0,
        IPRate: 0,
        thirdPartyAssistance: 0,
        damageAfterSharing: 0,
        pointValue: 0,
        incomeAfterAccident: 0,
        retirementAge: 0,
        physiologicalHarm: 0,
        painPretiumRate: 0,
        estheticDamageRate: 0,
        careerDamage: 0,
        bodilyHarm: 0,
        sharingRate: 0,
   sinisterNumber: "", // initialisation des valeurs vides
      name: "",
      sinisterDate: "",
        provision: 0,
        thirdPartyPayers: 0,
        totalDamage: 0,
        expertFees: 0,
        compensationToBeReceived: 0,
        economicDamage: 0,
        prejudiceMoral: 0,
        retiumCruciatus: 0,
        damageAeshetic: 0,
        fixedMaterialDamage: 0,
        prosthesisPurchase: 0,
        prosthesisMaintenance: 0,
      },
      addVictime: false,
      victimesListeData: [],
      victimeFormData: {},
      isExpert: true,
  
      showText: true,
      rentValue: 0,
      showSelect: false,
      addNewVictimeFile: false,
      printDocChèque: false,
      pageCount: 0,
      pageCounts: 0,
      addProvisioneneficiary: false,
      sendToFinance: true,
      secondSignatureDateStart: "",
      secondSignatureDateEnd: "",
      financialServiceSendDateStart: "",
      financialServiceSendDateEnd: "",
      financialServiceWithdrawalDateStart: "",
      financialServiceWithdrawalDateEnd: "",
      receptionServiceSendDateStart: "",
      receptionServiceSendDateEnd: "",
      sinisterNumber: "",
      beneficiaryName: "",
      itemsPerPage: 10,
      selected: [],
      deadListe: [],
      expanded:[],
      singleExpand:false,
      offreStatut:["EN COURS",
      "Soldé",
      "Sans suite",
      "Prescrit",
      "Recours"],
      headersDoc : [
        // { text: "id", value: "_id", width: "100px" },
        {
          text:"Env. Emichèq",
          align:"start",
          width:"100px",
          value:"haveRequestInEmitCheck"
        },
        {
          text: "Concaterne",
          align: "start",
          width: "150px",
          value: "concaten",
        },
        {
          text: "Numéro sinistre",
          value: "studyOffer.sinisterVictim.sinister.sinisterNumber",
          width: "200px",
        },
  
         { text: "Nom de l'Assuré", width: "200px", value: "studyOffer.sinisterVictim.sinister.name" },
        { text: "Type bénéficiaire", width: "200px", value: "beneficiaryType" },
        { text: "Nom bénéficiaire", width: "200px", value: "fullName" },
  
  
              {
          text: "Montant règlement",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "amount",
        },
        {
          text: "Nom de la victime",
          width: "200px",
          value: "studyOffer.sinisterVictim.fullName",
        },
        {
          text: "Contact victime",
          width: "200px",
          value: "studyOffer.sinisterVictim.phone",
        },
  
        { text: "Date accord", width: "200px", value: "agreementDate" },
        { text: "Date deuxieme signature", width: "200px", value: "secondSignatureDate" },
        { text: "Date envoi service financier", width: "200px", value: "financialServiceSendDate" },
        { text: "Date retrait service financier", width: "200px", value: "financialServiceWithdrawalDate" },
        { text: "Date envoi service accueil", width: "200px", value: "receptionServiceSendDate" },
        { text: "Numéro chèque", width: "200px", value: "checkNumber" },
        { text: "Banque", width: "200px", value: "bank" },
        { text: "Date chèque", width: "200px", value: "checkDate" },
      ],
      desserts: [],
      printDoc: "",
      addFileMoreMaterial: false,
      addFileMaterial: false,
      bigStudyID: "",
      beneficiaryListe: [],
      bneficiaryItem: [
        "ASSURE",
        "VICTIME",
        "TIERS",
        "AYANTS DROIT",
        "ASSUREUR",
        "EXPERT",
        "AVOCAT",
        "GARAGISTE",
        "CONCESSIONNAIRE",
        "PHARMACIE",
        "HOPITAUX",
        "ENQUÊTEUR",
        "AUTRES ...",
      ],
      unlockButton: true,
      addFileDead: false,
      addFileMoreDead: false,
      civiliteIiems: ["Monsieur", "Madame"],
      Decision: ["Oui", "Non"],
      //  Descendant (s) enfant 
      // Concubine enfant majeur
      ayantDroitQualite: [
        "Ascendant (e)",
        "Descendant (e)",
        "Conjoint (e)",
        "Collatéral (le)",
        "Concubin (e)",
      ],
      suiviData: ["Suivi FGA", "Pool 2 Roues", "Pool TPM / TPV"],
      StatusIiems: ["Matérielle","Corporelle", "Individuel accident", "Décès", "Provisions", "Expertise amiable", "Autres .."],
      addFileMoreNeneficiary: false,
      bodyStudy: false,
      bodyPersonnaleStudy: false,
      materialListe: [],
      headers: [
        {
          text: "Actions",
          align: "left",
          value: "actions",
          sortable: false,
          width: "10px",
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
  
      ],
      headersDead: [
      {
          text: "Actions",
          align: "left",
          value: "actions",
          sortable: false,
          width: "10px",
        },
        {
          text: "Nom & prénoms",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "status",
        },
        {
          text: "Qualité",
          align: "start",
          width: "200px",
          sortable: false,
          value: "sinisterNumber",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
        },
        {
          text: "Orphelin double",
          align: "start",
          width: "200px",
          sortable: false,
          value: "isOrphanDouble",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
        },
  
        {
          text: "Age",
          // divider: true,
          width: "200px",
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "name",
        },
  
        {
          text: "Sex",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "fullName",
        },
        {
          text: "Revenu à capitaliser",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "fullName",
        },
        {
          text: "Franc de rente",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "fullName",
        },
        {
          text: "Préjudice économique",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "fullName",
        },
        {
          text: "Préjudice Moral",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "fullName",
        },
        {
          text: "Indemnité due",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "fullName",
        },
        {
          text: "Partage",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "fullName",
        },
      ],
      headersRepatition: [
        {
          text: "Actions",
          align: "left",
          value: "actions",
          sortable: false,
          width: "100px",
        },
        {
          text: "Type bénéficiaire",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "beneficiaryType",
        },
        {
          text: "Nom bénéficiaire",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "beneficiaryName",
        },
        {
          text: "Contact bénéficiaire",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "beneficiaryContact",
        },
        // {
        //   text: "Nature",
        //   width: "200px",
        //   // divider: true,
        //   // class: "deep-purple darken-4 white--text",
        //   align: "start",
        //   value: "beneficiaryContact",
        // },
        {
          text: "Montant règlement",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "settlementAmount",
        },
        {
          text: "Date accord",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "offerDate",
        },
        {
          text: "Date deuxieme signature",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "secondSignatureDate",
        },
        {
          text: "Date envoi service financier",
          width: "220px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "financialServiceSendDate",
        },
        {
          text: "Date retrait service financier",
          width: "220px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "financialServiceWithdrawalDate",
        },
        {
          text: "Date envoi service accueil ",
          width: "220px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "receptionServiceSendDate",
        },
        {
          text: "Numéro chèque",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "checkNumber",
        },
        {
          text: "Banque",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "Bank",
        },
        {
          text: "Date chèque",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "checkDate",
        },
        {
          text: "Imprimer",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "printed",
        },
        {
          text: "Date impression",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "printingDate",
        },
      ],
  
      headersMorepaiement: [
        {
          text: "Actions",
          align: "left",
          value: "actions",
          sortable: false,
          width: "100px",
        },
        {
          text: "Type bénéficiaire",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "beneficiaryType",
        },
        {
          text: "Nom bénéficiaire",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "beneficiaryName",
        },
        {
          text: "Contact bénéficiaire",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "beneficiaryContact",
        },
        {
          text: "Nature du règlement",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "nature",
        },
        {
          text: "Montant règlement",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "settlementAmount",
        },
        {
          text: "Date accord",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "offerDate",
        },
        {
          text: "Date deuxieme signature",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "secondSignatureDate",
        },
        {
          text: "Date envoi service financier",
          width: "220px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "financialServiceSendDate",
        },
        {
          text: "Date retrait service financier",
          width: "220px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "financialServiceWithdrawalDate",
        },
        {
          text: "Date envoi service accueil ",
          width: "220px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "receptionServiceSendDate",
        },
        {
          text: "Numéro chèque",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "checkNumber",
        },
        {
          text: "Banque",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "Bank",
        },
        {
          text: "Date chèque",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "checkDate",
        },
        {
          text: "Imprimer",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "printed",
        },
        {
          text: "Date impression",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "printingDate",
        },
      ],
      headersProvision: [
        {
          text: "Actions",
          align: "left",
          value: "actions",
          sortable: false,
          width: "100px",
        },
        {
          text: "Lot FMP",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "beneficiaryType",
        },
        {
          text: "Date Lot",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "beneficiaryName",
        },
  
        {
          text: "Montant provision",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "settlementAmount",
        },
        {
          text: "Nom agent",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "offerDate",
        },
        {
          text: "Date deuxieme signature",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "secondSignatureDate",
        },
        {
          text: "Date envoi service financier",
          width: "220px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "financialServiceSendDate",
        },
        {
          text: "Date retrait service financier",
          width: "220px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "financialServiceWithdrawalDate",
        },
        {
          text: "Date envoi service accueil ",
          width: "220px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "receptionServiceSendDate",
        },
        {
          text: "Numéro chèque",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "checkNumber",
        },
        {
          text: "Banque",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "Bank",
        },
        {
          text: "Date chèque",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "checkDate",
        },
        {
          text: "Imprimer",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "printed",
        },
        {
          text: "Date impression",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "printingDate",
        },
      ],
      headersMaterial: [
        {
          text: "Pièces",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "documents",
        },
        {
          text: "Nombre",
          align: "start",
          width: "200px",
          sortable: false,
          value: "number",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
        },
        {
          text: "Montant Demandé",
          // divider: true,
          width: "200px",
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "amountRequested",
        },
  
        {
          text: "Montant réglé",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "amountToBePaid",
        },
        {
          text: "Motif",
          width: "200px",
          // divider: true,
          // class: "deep-purple darken-4 white--text",
          align: "start",
          value: "patterns",
        },
      ],
  
      editedIndex: -1,
      divisionData: {
        amount: 0,
        agreementDate: ""
      },
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
        "expertListe",
        "Commissariat",
        "offer",
        "victimeList",
        "offerDoc",
        "bank",
        "statFile",
        "damageListe",
        "ayantDroit",
        "beneficiaryListData",
        "otherPayement",
        "userListe",
        "beneficiaryDataFileLink"
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
      expertListe() {
        this.enquetteurNameList = defaultMethods.getNameList(this.expertListe);
      },
      Commissariat() {
        this.commissariatNameList = defaultMethods.getNameList(this.Commissariat);
      },
  
      victimeList() {
        this.victimeNameList = defaultMethods.getNameList(this.victimeList);
      },
      bank() {
        this.BankNameListe = defaultMethods.getNameList(this.bank);
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
        "getVictimes",
        "getEnquetteur",
        "getCommissariat",
        "getDoc",
        "getStatOffer",
        "getVictimeListe",
        "getExpert",
        "getCommissariat",
        "getOfferDoc",
        "printOfferDoc",
        "getBank",
        "getBodyStudyOffer",
        "getIndividualBodyStudyOffer",
        "getmorePayementStudyOffer",
        "getmaterialStudyOffer",
        "getmaterialDegatStudyOffer",
        "getDeathStudyOffer",
        "getayantDroitStudyOffer",
        "getBeneficiary",
        "getMaterialDoc",
        "getRepartition",
        "getBodyDoc",
        "getIndividualBodyDoc",
        "getDeathDoc",
        "getindemnityStudyOffer",
        "getUsers"
      ]),
      showAllFillData() {
        this.initFiles();
        //alert(this.showAllFil);
      },

  
      async initFiles() {
        this.loading = true;
        try {
         // await this.getBank();
          await this.getStatOffer({
            statisticalFilter: this.statisticalFilter,
          startDate: this.startDate,
          endDate: this.endDate,
          });
          await this.getUserProfile();
          //await this.getProduct();
          // await this.getEnquetteur();
          // await this.getCommissariat();
          // await this.getVictimeListe();
          // await this.getExpert();
          //await this.getUsers()
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
      Annuler(item) {
        // alert(JSON.stringifdeleteAyantDroity(item))
        // this.beneficiary = Object.assign({}, item);
        this.beneficiaryDel.beneficiaryID = item._id
        // alert(this.beneficiaryDel.beneficiaryID)
        // this.beneficiary.bank = item.bank ? item.bank.name : ""
        // this.addFile = true;
        this.delForm = true;
      },
      deleteAyantDroit (item) {
   this.ayantdroitSelectID = item._id
  //lert(this.ayantdroitSelectID)
        this.delAyantdroitForm = true;
      },
      async beneficiaryRowClick(item) {
  
        this.beneficiary = Object.assign({}, item);
        this.beneficiary.beneficiaryID = item._id
  
        this.beneficiary.bank = item.bank ? item.bank.name : ""
        // this.addFile = true;
        this.addFileMoreNeneficiary = true;
      },
      async beneficiaryProvisionRowClick(item) {
        // alert(JSON.stringify(item))
        this.beneficiaryProvisionData = Object.assign({}, item);
        this.beneficiaryProvisionData.beneficiaryID = item._id
  
        this.beneficiaryProvisionData.bank = item.bank ? item.bank.name : ""
        this.addProvisioneneficiary = true;
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
  
      provisionClick(item) {
        console.log(item);
        this.loading = true
        this.bigStudyID = item._id
        this.typeOfStudy = "HistoryProvision"
        this.victimeSelectID = item.sinisterVictim._ids
        this.beneficiaryListData = []
        this.getBeneficiary({ studyOffer: item._id, studyType: "HistoryProvision" })
          .then(async (res) => {
            {
              // console.log(res);
              this.matérialSelectedId = res[0]._id
              // alert("ok")
              // await this.getayantDroitStudyOffer({ id: res[0]._id })
              // alert(JSON.stringify(res[0].sinister.sinisterNumber));
              this.HistoryProvisionData.sinisterNumber = res[0].studyOffer.sinisterVictim
                ? res[0].studyOffer.sinisterVictim.sinister.sinisterNumber
                : "";
              this.HistoryProvisionData.fullName = res[0].fullName;
              this.HistoryProvisionData.contact = res[0].contact;
              this.HistoryProvisionData.totalProvision = res[0].totalProvision;
              this.HistoryProvisionData.totalFmp = res[0].totalFmp;
  
            }
          });
        this.loading = false
        this.addProvision = true
  
  
      },
      reloadStudyDead() {
    
        this.getDeathStudyOffer({ id: this.bigStudyID }).then(async (res) => {
          {
            // console.log(res);  distributionKey
            this.matérialSelectedId = res[0]._id
            // alert(JSON.stringify(res[0]))
            await this.getayantDroitStudyOffer({ id: res[0]._id })
            // alert(JSON.stringify(res[0].sinister.sinisterNumber));
            this.deathStudyOfferData.sinisterNumber = res[0].sinister
              ? res[0].sinister.sinisterNumber
              : "";
            this.deathStudyOfferData.name = res[0].sinisterVictim
              ? res[0].sinisterVictim.fullName
              : "";
            this.deathStudyOfferData.age = res[0].sinisterVictim
              ? res[0].sinisterVictim.age
              : "";
            this.deathStudyOfferData.sex = res[0].sinisterVictim
              ? res[0].sinisterVictim.civility
              : "";
            this.deathStudyOfferData.sinisterDate = res[0].sinister
              ? res[0].sinister.sinisterDate
              : "";
            // this.deathStudyOfferData.consolidationDate =
            //   res[0].consolidationDate;
            this.deathStudyOfferData.monthlySMIG = res[0].monthlySMIG;
            this.deathStudyOfferData.monthlySMIGResidence =
              res[0].monthlySMIGResidence;
            this.deathStudyOfferData.withholdingSMIG =
              res[0].withholdingSMIG;
            this.deathStudyOfferData.annualSMIG = res[0].annualSMIG;
            this.deathStudyOfferData.monthlyIncome =
              res[0].monthlyIncome;
            this.deathStudyOfferData.annualIncome = res[0].annualIncome
  
  
  
  
            this.deathStudyOfferData.totalMoralDamage =
              res[0].totalMoralDamage;
            this.deathStudyOfferData.totalCompensationDue =
              res[0].totalCompensationDue;
            this.deathStudyOfferData.totalShare =
              res[0].totalShare;
            this.deathStudyOfferData.disbursements =
              res[0].disbursements;
            this.deathStudyOfferData.material =
              res[0].material;
            this.deathStudyOfferData.provision =
              res[0].provision;
            this.deathStudyOfferData.underTotal =
              res[0].underTotal;
            this.deathStudyOfferData.funeralExpenses =
              res[0].funeralExpenses;
  
            this.deathStudyOfferData.totalCompensation = res[0].totalCompensation;
            this.deathStudyOfferData.distributionKey = res[0].distributionKey;
            this.deathStudyOfferData.sharingRate = res[0].sharingRate;
            // this.deathStudyOfferData.totalCompensation = res[0].totalCompensation;
            // this.deathStudyOfferData.itt = res[0].ITT;
            // this.deathStudyOfferData.numberOfDays = res[0].numberOfDays;
            // this.deathStudyOfferData.disability = res[0].disability;
            // this.deathStudyOfferData.IPRate = res[0].IPRate;
            // this.deathStudyOfferData.lumpSumDisability =
            //   res[0].lumpSumDisability;
            // this.deathStudyOfferData.deathBenefit = res[0].deathBenefit;
            // this.deathStudyOfferData.totalDamage = res[0].totalDamage;
            // this.deathStudyOfferData.disbursements =
            //   res[0].disbursements;
            // this.deathStudyOfferData.provision = res[0].provision;
            // this.deathStudyOfferData.thirdPartyPayers =
            //   res[0].thirdPartyPayers;
            // this.deathStudyOfferData.compensationToBeReceived =
            //   res[0].compensationToBeReceived;
  
            // this.deathStudyOfferData.sinsterVictimeID = res[0].sinisterVictim._id;
            // this.deathStudyOfferData.sinsterID = res[0].sinister._id;
            this.deathStudyValueChange();
            // this.editedIndex = this.deathStudyOfferData.indexOf(res[0]);
            // this.deathStudyOfferData = Object.assign({}, res[0]);
            this.addFileDead = true;
          }
        });
      },
      deathStudyClick(item) {
        // console.log(item);
        this.bigStudyID = item._id
        this.typeOfStudy = "DeathStudy"
        this.victimeSelectID = item.sinisterVictim._ids
        this.getDeathStudyOffer({ id: item._id }).then(async (res) => {
          {
            // console.log(res);
            this.matérialSelectedId = res[0]._id
            // alert(JSON.stringify(res[0]))
            await this.getayantDroitStudyOffer({ id: res[0]._id })
            // alert(JSON.stringify(res[0].sinister.sinisterNumber));
            this.deathStudyOfferData.sinisterNumber = res[0].sinister
              ? res[0].sinister.sinisterNumber
              : "";
            this.deathStudyOfferData.name = res[0].sinisterVictim
              ? res[0].sinisterVictim.fullName
              : "";
            this.deathStudyOfferData.age = res[0].sinisterVictim
              ? res[0].sinisterVictim.age
              : "";
            this.deathStudyOfferData.sex = res[0].sinisterVictim
              ? res[0].sinisterVictim.civility
              : "";
            this.deathStudyOfferData.sinisterDate = res[0].sinister
              ? res[0].sinister.sinisterDate
              : "";
            // this.deathStudyOfferData.consolidationDate =
            //   res[0].consolidationDate;
            this.deathStudyOfferData.monthlySMIG = res[0].monthlySMIG;
            this.deathStudyOfferData.monthlySMIGResidence =
              res[0].monthlySMIGResidence;
            this.deathStudyOfferData.withholdingSMIG =
              res[0].withholdingSMIG;
            this.deathStudyOfferData.annualSMIG = res[0].annualSMIG;
            this.deathStudyOfferData.monthlyIncome =
              res[0].monthlyIncome;
            this.deathStudyOfferData.annualIncome = res[0].annualIncome
  
            this.deathStudyOfferData.totalMoralDamage =
              res[0].totalMoralDamage;
            this.deathStudyOfferData.totalCompensationDue =
              res[0].totalCompensationDue;
            this.deathStudyOfferData.totalShare =
              res[0].totalShare;
            this.deathStudyOfferData.totalMoralDamage =
              res[0].totalMoralDamage;
            this.deathStudyOfferData.totalCompensationDue =
              res[0].totalCompensationDue;
            this.deathStudyOfferData.totalShare =
              res[0].totalShare;
            this.deathStudyOfferData.disbursements =
              res[0].disbursements;
            this.deathStudyOfferData.material =
              res[0].material;
            this.deathStudyOfferData.provision =
              res[0].provision;
            this.deathStudyOfferData.underTotal =
              res[0].underTotal;
            this.deathStudyOfferData.funeralExpenses =
              res[0].funeralExpenses;
  
            this.deathStudyOfferData.totalCompensation = res[0].totalCompensation;
            this.deathStudyOfferData.distributionKey = res[0].distributionKey;
            this.deathStudyOfferData.sharingRate = res[0].sharingRate;
            // this.deathStudyOfferData.fmp = res[0].FMP;
            // this.deathStudyOfferData.itt = res[0].ITT;
            // this.deathStudyOfferData.numberOfDays = res[0].numberOfDays;
            // this.deathStudyOfferData.disability = res[0].disability;
            // this.deathStudyOfferData.IPRate = res[0].IPRate;
            // this.deathStudyOfferData.lumpSumDisability =
            //   res[0].lumpSumDisability;
            // this.deathStudyOfferData.deathBenefit = res[0].deathBenefit;
            // this.deathStudyOfferData.totalDamage = res[0].totalDamage;
            // this.deathStudyOfferData.disbursements =
            //   res[0].disbursements;
            // this.deathStudyOfferData.provision = res[0].provision;
            // this.deathStudyOfferData.thirdPartyPayers =
            //   res[0].thirdPartyPayers;
            // this.deathStudyOfferData.compensationToBeReceived =
            //   res[0].compensationToBeReceived;
  
            // this.deathStudyOfferData.sinsterVictimeID = res[0].sinisterVictim._id;
            // this.deathStudyOfferData.sinsterID = res[0].sinister._id;
            this.deathStudyValueChange();
            // this.editedIndex = this.deathStudyOfferData.indexOf(res[0]);
            // this.deathStudyOfferData = Object.assign({}, res[0]);
            this.addFileDead = true;
          }
        });
      },
      indemnityStudyClick(item) {
        // console.log(item);
        //alert(JSON.stringify(item))
        this.loading = true
        this.bigStudyID = item._id
        this.typeOfStudy = "AmicableExpertise"
        this.victimeSelectID = item.sinisterVictim._ids
        this.beneficiaryListData = []
        this.getBeneficiary({ studyOffer: item._id, studyType: "AmicableExpertise" })
          .then(async (res) => {
            {
              console.log(res[0]);
              this.matérialSelectedId = res[0]._id
              this.deathStudySave = res[0]
               //alert(JSON.stringify(res[0]));
              this.indemnityStudy.sinisterNumber = res[0].sinisterVictim
                ? res[0].sinisterVictim.sinister.sinisterNumber
                : "";
              this.indemnityStudy.name = res[0].sinisterVictim
                ? res[0].sinisterVictim.fullName
                : "";
              this.indemnityStudy.age = res[0].sinisterVictim
                ? res[0].sinisterVictim.age
                : "";
              this.indemnityStudy.phone = res[0].sinisterVictim
                ? res[0].sinisterVictim.phone
                : "";
              this.indemnityStudy.totalFmp = res[0].totalFmp;
              this.indemnityStudy.amountDI = res[0].amountDI;
              this.indemnityStudy.amountDM = res[0].amountDM;
              this.indemnityStudy.amountDebour = res[0].amountDebour;
              this.indemnityStudy.amount = res[0].amount;
              this.indemnityStudy.amicableExpertiseProvision = res[0].amicableExpertiseProvision;
              this.indemnityStudy.offerDate = res[0].offerDate;
              this.indemnityStudy.callDate = res[0].callDate;
              this.indemnityStudy.consultationDate = res[0].consultationDate;
  
  
              this.indemnityStudy.arrivalDate = res[0].arrivalDate;
              this.indemnityStudy.locality = res[0].locality;
              this.indemnityStudy.expertiseType = res[0].expertiseType;
              this.indemnityStudy.secondSignatureDate = res[0].secondSignatureDate;
              this.indemnityStudy.financialServiceSendDate = res[0].financialServiceSendDate;
              this.indemnityStudy.financialServiceWithdrawalDate = res[0].financialServiceWithdrawalDate;
              this.indemnityStudy.receptionServiceSendDate = res[0].receptionServiceSendDate;
              this.indemnityStudy.documentReceptionDate = res[0].documentReceptionDate;
              this.indemnityStudy.checkNumber = res[0].checkNumber;
              this.indemnityStudy.Bank = res[0].Bank;
              this.indemnityStudy.checkDate = res[0].checkDate;
  
            }
          });
        this.loading = false
        this.indemnityForm = true
  
      },
      morerovvisionayementStudyClick(item) {
        // console.log(item);
        this.bigStudyID = item._id
        this.typeOfStudy = "OtherPayment"
        this.victimeSelectID = item.sinisterVictim._ids
        this.beneficiaryListData = []
        this.getBeneficiary({ studyOffer: item._id, studyType: "OtherPayment" })
        // .then(async (res) => {
        //   {
        //     // console.log(res);
        //     this.matérialSelectedId = res[0]._id
        //     // alert(JSON.stringify(res[0]))
        //     await this.getayantDroitStudyOffer({ id: res[0]._id })
        //     // alert(JSON.stringify(res[0].sinister.sinisterNumber));
        //     this.deathStudyOfferData.sinisterNumber = res[0].sinister
        //       ? res[0].sinister.sinisterNumber
        //       : "";
        //     this.deathStudyOfferData.name = res[0].sinisterVictim
        //       ? res[0].sinisterVictim.fullName
        //       : "";
        //     this.deathStudyOfferData.age = res[0].sinisterVictim
        //       ? res[0].sinisterVictim.age
        //       : "";
        //     this.deathStudyOfferData.sex = res[0].sinisterVictim
        //       ? res[0].sinisterVictim.civility
        //       : "";
        //     this.deathStudyOfferData.sinisterDate = res[0].sinister
        //       ? res[0].sinister.sinisterDate
        //       : "";
        //     // this.deathStudyOfferData.consolidationDate =
        //     //   res[0].consolidationDate;
        //     this.deathStudyOfferData.monthlySMIG = res[0].monthlySMIG;
        //     this.deathStudyOfferData.monthlySMIGResidence =
        //       res[0].monthlySMIGResidence;
        //     this.deathStudyOfferData.withholdingSMIG =
        //       res[0].withholdingSMIG;
        //     this.deathStudyOfferData.annualSMIG = res[0].annualSMIG;
        //     this.deathStudyOfferData.monthlyIncome =
        //       res[0].monthlyIncome;
        //     this.deathStudyOfferData.annualIncome = res[0].annualIncome
  
        //     this.deathStudyOfferData.totalMoralDamage =
        //       res[0].totalMoralDamage;
        //     this.deathStudyOfferData.totalCompensationDue =
        //       res[0].totalCompensationDue;
        //     this.deathStudyOfferData.totalShare =
        //       res[0].totalShare;
        //     this.deathStudyOfferData.totalMoralDamage =
        //       res[0].totalMoralDamage;
        //     this.deathStudyOfferData.totalCompensationDue =
        //       res[0].totalCompensationDue;
        //     this.deathStudyOfferData.totalShare =
        //       res[0].totalShare;
        //     this.deathStudyOfferData.disbursements =
        //       res[0].disbursements;
        //     this.deathStudyOfferData.material =
        //       res[0].material;
        //     this.deathStudyOfferData.provision =
        //       res[0].provision;
        //     this.deathStudyOfferData.underTotal =
        //       res[0].underTotal;
        //     this.deathStudyOfferData.funeralExpenses =
        //       res[0].funeralExpenses;
  
        //     this.deathStudyOfferData.totalCompensation = res[0].totalCompensation;
        //     this.deathStudyOfferData.distributionKey = res[0].distributionKey;
        //     this.deathStudyOfferData.sharingRate = res[0].sharingRate;
        //     // this.deathStudyOfferData.fmp = res[0].FMP;
        //     // this.deathStudyOfferData.itt = res[0].ITT;
        //     // this.deathStudyOfferData.numberOfDays = res[0].numberOfDays;
        //     // this.deathStudyOfferData.disability = res[0].disability;
        //     // this.deathStudyOfferData.IPRate = res[0].IPRate;
        //     // this.deathStudyOfferData.lumpSumDisability =
        //     //   res[0].lumpSumDisability;
        //     // this.deathStudyOfferData.deathBenefit = res[0].deathBenefit;
        //     // this.deathStudyOfferData.totalDamage = res[0].totalDamage;
        //     // this.deathStudyOfferData.disbursements =
        //     //   res[0].disbursements;
        //     // this.deathStudyOfferData.provision = res[0].provision;
        //     // this.deathStudyOfferData.thirdPartyPayers =
        //     //   res[0].thirdPartyPayers;
        //     // this.deathStudyOfferData.compensationToBeReceived =
        //     //   res[0].compensationToBeReceived;
  
        //     // this.deathStudyOfferData.sinsterVictimeID = res[0].sinisterVictim._id;
        //     // this.deathStudyOfferData.sinsterID = res[0].sinister._id;
        //     this.deathStudyValueChange();
        //     // this.editedIndex = this.deathStudyOfferData.indexOf(res[0]);
        //     // this.deathStudyOfferData = Object.assign({}, res[0]);
        //     this.addFileDead = true;
        //   }
        // });
        this.loading = false
        this.morePayementStudyForm = true
  
      },
      offerDocPrint(item) {
        // console.log(item);
        this.loading = true
        this.bigStudyID = item._id
        this.victimeSelectID = item.sinisterVictim._ids
        this.getmaterialStudyOffer({ id: item._id }).then((res) => {
          {
            console.log(res);
            // alert(JSON.stringify(res[0]))
            this.matérialDocLink = res[0]._id
            // alert(JSON.stringify(res[0].sinister.sinisterNumber));
  
          }
        });
        this.getBodyStudyOffer({ id: item._id }).then((res) => {
          {
            console.log(res);
            // alert(JSON.stringify(res[0]))
            this.bodyDocLink = res[0]._id
            // alert(JSON.stringify(res[0].sinister.sinisterNumber));
  
          }
        });
        this.getDeathStudyOffer({ id: item._id }).then((res) => {
          {
            console.log(res);
            // alert(JSON.stringify(res[0]))
            this.deathDocLink = res[0]._id
            // alert(JSON.stringify(res[0].sinister.sinisterNumber));
  
          }
        });
        this.getIndividualBodyStudyOffer({ id: item._id }).then((res) => {
          {
            console.log(res);
            // alert(JSON.stringify(res[0]))
            this.individualBodyDocLink = res[0]._id
            // alert(JSON.stringify(res[0].sinister.sinisterNumber));
  
          }
        });
        this.loading = false
        this.printListDoc = true
  
      },
      individualBodyStudyClick(item) {
        // console.log(item);
        this.loading = true
        this.bigStudyID = item._id
        this.typeOfStudy = "IndividualBody"
        this.victimeSelectID = item.sinisterVictim._ids
        this.getIndividualBodyStudyOffer({ id: item._id }).then((res) => {
          {
            console.log(res);
            // alert(JSON.stringify(res))
            this.matérialSelectedId = res[0]._id
            // alert(JSON.stringify(res[0].sinister.sinisterNumber));
            this.bodyIndividualStudyOfferData.sinisterNumber = res[0].sinister
              ? res[0].sinister.sinisterNumber
              : "";
            this.bodyIndividualStudyOfferData.name = res[0].sinisterVictim
              ? res[0].sinisterVictim.fullName
              : "";
            this.bodyIndividualStudyOfferData.age = res[0].sinisterVictim
              ? res[0].sinisterVictim.age
              : "";
            this.bodyIndividualStudyOfferData.sex = res[0].sex
              ;
            this.bodyIndividualStudyOfferData.sinisterDate = res[0].sinister
              ? res[0].sinister.sinisterDate
              : "";
            this.bodyIndividualStudyOfferData.consolidationDate =
              res[0].consolidationDate;
            this.bodyIndividualStudyOfferData.monthlySMIG = res[0].monthlySMIG;
            this.bodyIndividualStudyOfferData.monthlySMIGResidence =
              res[0].monthlySMIGResidence;
            this.bodyIndividualStudyOfferData.withholdingSMIG =
              res[0].withholdingSMIG;
            this.bodyIndividualStudyOfferData.annualSMIG = res[0].annualSMIG;
            this.bodyIndividualStudyOfferData.monthlyIncome =
              res[0].monthlyIncome;
            this.bodyIndividualStudyOfferData.annualIncome = res[0].annualIncome;
            this.bodyIndividualStudyOfferData.numberOfITTDays =
              res[0].numberOfITTDays;
            this.bodyIndividualStudyOfferData.fmp = res[0].FMP;
            this.bodyIndividualStudyOfferData.provision = res[0].provision;
            this.bodyIndividualStudyOfferData.itt = res[0].ITT;
            this.bodyIndividualStudyOfferData.numberOfDays = res[0].numberOfDays;
            this.bodyIndividualStudyOfferData.disability = res[0].disability;
            this.bodyIndividualStudyOfferData.IPRate = res[0].IPRate;
            this.bodyIndividualStudyOfferData.lumpSumDisability =
              res[0].lumpSumDisability;
            this.bodyIndividualStudyOfferData.deathBenefit = res[0].deathBenefit;
            this.bodyIndividualStudyOfferData.contractualIttAmount = res[0].contractualIttAmount;
            this.bodyIndividualStudyOfferData.totalDamage = res[0].totalDamage;
            this.bodyIndividualStudyOfferData.disbursements =
              res[0].disbursements;
            // this.bodyIndividualStudyOfferData.provision = res[0].provision;
            this.bodyIndividualStudyOfferData.thirdPartyPayers =
              res[0].thirdPartyPayers;
            this.bodyIndividualStudyOfferData.compensationToBeReceived =
              res[0].compensationToBeReceived;
  
            // this.bodyIndividualStudyOfferData.sinsterVictimeID = res[0].sinisterVictim._id;
            // this.bodyIndividualStudyOfferData.sinsterID = res[0].sinister._id;
            this.individualBodyStudyValueChange();
            // this.editedIndex = this.bodyIndividualStudyOfferData.indexOf(res[0]);
            // this.bodyIndividualStudyOfferData = Object.assign({}, res[0]);
            this.bodyPersonnaleStudy = true;
          }
        });
        this.loading = false
      },
      materialDoc() {
  
      },
      coporelDoc() {
  
      },
      individualDoc() {
  
      },
      deathDoc() {
  
      },
      addNewBeneficiaryToList() {
        this.beneficiary = {},
          this.addFileMoreNeneficiary = true
      },
      addNewDegatToList() {
        this.degatData = {},
          this.addFileMoreMaterial = true
      },
      async RemoveAyantDroitModal() {
        // alert(this.matérialSelectedId)
        this.loading = true;
        try {
          if (this.ayantdroitSelectID) {
            await deleteAyantDroit({ id: this.ayantdroitSelectID });
          }
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.createdSuccessfully("Dossier")
          );
          this.ayantdroitSelectID = ""
          await this.getayantDroitStudyOffer({ id: this.matérialSelectedId })
          await this.reloadStudyDead()
        } catch (error) {
          defaultMethods.dispatchError(this.$store);
        }
        this.delAyantdroitForm = false;
        this.loading = false;
      },
      async addRemoveModal() {
        // alert(this.matérialSelectedId)
        this.loading = true;
        try {
          const schema = {
            observation: this.beneficiaryDel.observation,
          };
          if (this.beneficiaryDel.beneficiaryID) {
            await removeBeneficiary({ schema, id: this.beneficiaryDel.beneficiaryID });
          }
  
  
  
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.createdSuccessfully("Dossier")
          );
          this.beneficiaryListData = []
          this.getBeneficiary({ studyOffer: this.bigStudyID, studyType: this.typeOfStudy })
        } catch (error) {
          defaultMethods.dispatchError(this.$store);
        }
        this.delForm = false;
        this.loading = false;
      },
      async addIndemnityFormModal() {
        // alert(this.matérialSelectedId)
        this.loading = true;
        try {
          const schema = {
            studyOffer: this.bigStudyID,
            studyType: "AmicableExpertise",
            beneficiaryType: "VICTIME",
            fullName: this.indemnityStudy.name,
            contact: this.indemnityStudy.phone,
            // nature: this.indemnityStudy.nature,
            amount: this.indemnityStudy.amount,
            amountDI: this.indemnityStudy.amountDI,
            amountDM: this.indemnityStudy.amountDM,
            expertiseType: this.indemnityStudy.expertiseType,
            amountDebour: this.indemnityStudy.amountDebour,
            amicableExpertiseProvision: this.indemnityStudy.amicableExpertiseProvision,
  
            // compensationToBeReceived: this.indemnityStudy.compensationToBeReceived,
            offerDate: this.indemnityStudy.offerDate,
            callDate: this.indemnityStudy.callDate,
            consultationDate: this.indemnityStudy.consultationDate,
            arrivalDate: this.indemnityStudy.arrivalDate,
            locality: this.indemnityStudy.locality,
            secondSignatureDate: this.indemnityStudy.secondSignatureDate,
            // printingDate: this.indemnityStudy.printingDate,
            // printed: this.indemnityStudy.printed,
            bank: this.indemnityStudy.bank,
            checkDate: this.indemnityStudy.checkDate,
            checkNumber: this.indemnityStudy.checkNumber,
            receptionServiceSendDate: this.indemnityStudy.receptionServiceSendDate,
            financialServiceWithdrawalDate: this.indemnityStudy.financialServiceWithdrawalDate,
            financialServiceSendDate: this.indemnityStudy.financialServiceSendDate,
          };
  
          await addBeneficiary({ schema });
  
  
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.createdSuccessfully("Dossier")
          );
          this.beneficiaryListData = []
          this.getBeneficiary({ studyOffer: this.bigStudyID, studyType: "OtherPayment" })
        } catch (error) {
          defaultMethods.dispatchError(this.$store);
        }
        this.indemnityForm = false;
        this.loading = false;
      },
      async addOtherPayementFormModal() {
        // alert(this.matérialSelectedId)
        this.loading = true;
        try {
          const schema = {
            studyOffer: this.bigStudyID,
            studyType: "OtherPayment",
            beneficiaryType: this.morePayementStudy.beneficiaryType,
            fullName: this.morePayementStudy.beneficiaryName,
            contact: this.morePayementStudy.beneficiaryContact,
            nature: this.morePayementStudy.nature,
            amount: this.morePayementStudy.amount,
            // compensationToBeReceived: this.morePayementStudy.compensationToBeReceived,
            offerDate: this.morePayementStudy.offerDate,
            secondSignatureDate: this.morePayementStudy.secondSignatureDate,
            // printingDate: this.morePayementStudy.printingDate,
            // printed: this.morePayementStudy.printed,
            //bank: this.morePayementStudy.bank,
            //checkDate: this.morePayementStudy.checkDate,
            //checkNumber: this.morePayementStudy.checkNumber,
            receptionServiceSendDate: this.morePayementStudy.receptionServiceSendDate,
            financialServiceWithdrawalDate: this.morePayementStudy.financialServiceWithdrawalDate,
            financialServiceSendDate: this.morePayementStudy.financialServiceSendDate,
          };
          if (this.morePayementStudy.ID) {
            await updateBeneficiary({
              schema,
              id: this.morePayementStudy.ID,
              studyOffer: this.bigStudyID,
              sinisterVictim: this.victimeSelectID
            });
  
          } else {
            await addBeneficiary({ schema });
  
          }
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.createdSuccessfully("Dossier")
          );
          this.beneficiaryListData = []
          this.getBeneficiary({ studyOffer: this.bigStudyID, studyType: "OtherPayment" })
        } catch (error) {
          defaultMethods.dispatchError(this.$store);
        }
        this.addMorePaymente = false;
        this.loading = false;
      },
      async postOfIndividualBodyStudy() {
        // alert(this.matérialSelectedId)
        // this.loading = true;
        try {
          const schema = {
            studyOffer: this.bigStudyID,
            lumpSumDisability: this.bodyIndividualStudyOfferData.lumpSumDisability,
            deathBenefit: this.bodyIndividualStudyOfferData.deathBenefit,
            realDailyIttAmount: this.bodyIndividualStudyOfferData.realDailyIttAmount,
            contractualIttAmount: this.bodyIndividualStudyOfferData.contractualIttAmount,
            dailyAllowance: this.bodyIndividualStudyOfferData.dailyAllowance,
            numberOfDays: this.bodyIndividualStudyOfferData.numberOfDays,
            ittAmount: this.bodyIndividualStudyOfferData.ittAmount,
            IPRate: this.bodyIndividualStudyOfferData.IPRate,
            disability: this.bodyIndividualStudyOfferData.disability,
            totalDamage: this.bodyIndividualStudyOfferData.totalDamage,
            // itt: this.bodyIndividualStudyOfferData.itt,
            disbursements: this.bodyIndividualStudyOfferData.disbursements,
            provision: this.bodyIndividualStudyOfferData.provision,
            thirdPartyPayers: this.bodyIndividualStudyOfferData.thirdPartyPayers,
            compensationToBeReceived: this.bodyIndividualStudyOfferData.compensationToBeReceived,
          };
          await addstudyIndividualBody({
            schema,
          });
          // this.bodyPersonnaleStudy = false
          // this.reloadMatérialClick(this.bodyIndividualStudyOfferData.studyOfferID)
        } catch (error) {
          defaultMethods.dispatchError(this.$store);
        }
        // this.loading = false;
      },
      async postOfBodyStudy() {
        // alert(this.matérialSelectedId)
        // this.loading = true;
  
        try {
          const schema = {
            studyOffer: this.bigStudyID,

            monthlySMIGResidence: this.bodyStudyOfferData.monthlySMIGResidence,
            withholdingSMIG: this.bodyStudyOfferData.withholdingSMIG,
            annualSMIG: this.bodyStudyOfferData.annualSMIG,
            monthlyIncome: this.bodyStudyOfferData.monthlyIncome,
            applyItt: this.bodyStudyOfferData.applyItt,
            annualIncome: this.bodyStudyOfferData.annualIncome,
            incomeAfterAccident: this.bodyStudyOfferData.incomeAfterAccident,
            retirementAge: this.bodyStudyOfferData.retirementAge,
            numberOfITTDays: Number(this.bodyStudyOfferData.numberOfITTDays),
            sex: this.bodyStudyOfferData.sex,
            // fmp: Number(this.bodyStudyOfferData.fmp),
            ITT: Number(this.bodyStudyOfferData.ITT),
            IPRate: this.bodyStudyOfferData.IPRate,
            pointValue: this.bodyStudyOfferData.pointValue,
            physiologicalHarm: this.bodyStudyOfferData.physiologicalHarm,
            economicDamage: this.bodyStudyOfferData.economicDamage,
            prejudiceMoral: this.bodyStudyOfferData.prejudiceMoral,
            thirdPartyAssistance: this.bodyStudyOfferData.thirdPartyAssistance,
            painPretiumRate: this.bodyStudyOfferData.painPretiumRate,
            pretiumCruciatus: this.bodyStudyOfferData.pretiumCruciatus,
            estheticDamageRate: this.bodyStudyOfferData.estheticDamageRate,
            damageAeshetic: this.bodyStudyOfferData.damageAeshetic,
            careerDamageApplicate: this.bodyStudyOfferData.careerDamageApplicate,
            careerDamage: this.bodyStudyOfferData.careerDamage,
            bodilyHarm: this.bodyStudyOfferData.bodilyHarm,
            fixedMaterialDamage: this.bodyStudyOfferData.fixedMaterialDamage,
            prosthesisPurchase: this.bodyStudyOfferData.prosthesisPurchase,
            prosthesisMaintenance: this.bodyStudyOfferData.prosthesisMaintenance,
            totalDamage: this.bodyStudyOfferData.totalDamage,
            sharingRate: this.bodyStudyOfferData.sharingRate,
            damageAfterSharing: this.bodyStudyOfferData.damageAfterSharing,
            // provision: this.bodyStudyOfferData.provision,
            thirdPartyPayers: this.bodyStudyOfferData.thirdPartyPayers,
            expertFees: this.bodyStudyOfferData.expertFees,
            compensationToBeReceived: this.bodyStudyOfferData.compensationToBeReceived,
  
          };
          await addstudyBody({
            schema,
          });
          // this.bodyStudy = false
          this.reloadMatérialClick(this.bigStudyID)
        } catch (error) {
          defaultMethods.dispatchError(this.$store);
        }
        // this.loading = false;
      },
      async postOfMaterialStudy() {
        if (this.typeOfStudy == "MaterialStudy") {
          this.loading = true;
          try {
            const schema = {
              studyOffer: this.bigStudyID,
              sharingRate: this.materialDamageData.sharingRate,
              agreementDate: this.divisionData.agreementDate
            };
            await addstudyMatéérial({
              schema,
            });
            this.reloadMatérialClick(this.bigStudyID)
          } catch (error) {
            defaultMethods.dispatchError(this.$store);
          }
          this.loading = false;
        }
        if (this.typeOfStudy == "BodyStudy") {
          this.loading = true;
  
          try {
            const schema = {
              studyOffer: this.bigStudyID,
              // sharingRate: this.bodyStudyOfferData.sharingRate,
              agreementDate: this.divisionData.agreementDate
            };
            await addstudyBody({
              schema,
            });
            this.reloadMatérialClick(this.bigStudyID)
          } catch (error) {
            defaultMethods.dispatchError(this.$store);
          }
          this.loading = false;
        }
        if (this.typeOfStudy == "IndividualBody") {
          this.loading = true;
          try {
            const schema = {
              studyOffer: this.bigStudyID,
              // sharingRate: this.materialDamageData.sharingRate,
              agreementDate: this.divisionData.agreementDate
            };
            await addstudyIndividual({
              schema,
            });
            this.reloadMatérialClick(this.bigStudyID)
          } catch (error) {
            defaultMethods.dispatchError(this.$store);
          }
          this.loading = false;
        }
        if (this.typeOfStudy == "DeathStudy") {
          this.loading = true;
          try {
            const schema = {
              studyOffer: this.bigStudyID,
              // sharingRate: this.materialDamageData.sharingRate,
              agreementDate: this.divisionData.agreementDate
            };
            await addDeathStudy({
              schema,
            });
            this.reloadMatérialClick(this.bigStudyID)
          } catch (error) {
            defaultMethods.dispatchError(this.$store);
          }
          this.loading = false;
        }
        if (this.typeOfStudy == "HistoryProvision") {
          this.loading = true;
          try {
            const schema = {
              studyOffer: this.bigStudyID,
              // sharingRate: this.materialDamageData.sharingRate,
              agreementDate: this.divisionData.agreementDate
            };
            await addstudyMatéérial({
              schema,
            });
            this.reloadMatérialClick(this.bigStudyID)
          } catch (error) {
            defaultMethods.dispatchError(this.$store);
          }
          this.loading = false;
        }
  
      },
      getText(item){
        if(item.haveRequestInEmitCheck =='Oui'){
          return( item.emitChequeRequest.redacteur + " votre demande de chèque pour le bénéficiaire "+item.emitChequeRequest.Nom_Beneficiaire+ " a été envoyée dans Emicheq sous numéro d'identification " +item.emitChequeRequest.concaten+ " le "+item.emitChequeRequest.Date_Demande_Cheque+" pour un montant de "+ item.emitChequeRequest.Montant_Reglement +" FCFA  . En cas d'erreur, veuillez vous rapprocher du service informatique pour une correction. " )
  
        }else{
          return("Demande en attente d'envoi dans Emichèq")
        }
      },
      async reloadMatérialClick(item) {
        // alert(this.typeOfStudy)
  
        if (this.typeOfStudy == "MaterialStudy") {
          this.loading = true;
          this.getmaterialStudyOffer({ id: item }).then(async (res) => {
            {
              await this.getmaterialDegatStudyOffer({ id: res[0]._id })
              console.log(res);
              // alert(JSON.stringify(res[0]));
              this.matérialSelectedId = res[0]._id
              this.materialDamageData.sinisterNumber = res[0].sinister
                ? res[0].sinister.sinisterNumber
                : "";
              this.materialDamageData.name = res[0].sinister
                ? res[0].sinister.name
                : "";
              this.materialDamageData.fullName = res[0].sinisterVictim
                ? res[0].sinisterVictim.fullName
                : "";
              this.materialDamageData.phone = res[0].sinisterVictim
                ? res[0].sinisterVictim.phone
                : "";
              this.materialDamageData.sinisterDate = res[0].sinister
                ? res[0].sinister.sinisterDate
                : "";
              this.materialDamageData.sharingRate =
                res[0].sharingRate;
              this.materialDamageData.total =
                res[0].total;
              this.materialDamageData.indemnity =
                res[0].indemnity;
              this.divisionData.agreementDate = res[0].agreementDate;
              this.divisionData.amount = res[0].indemnity;
              this.materialDamageData.studyOfferID = item;
              // this.materialDamageData.sinsterID = res[0].sinister._id;
  
  
              // this.editedIndex = this.bodyStudyOfferData.indexOf(res[0]);
              // this.bodyStudyOfferData = Object.assign({}, res[0]);
  
            }
          });
          this.loading = false;
        }
        if (this.typeOfStudy == "BodyStudy") {
          this.loading = true;
  
          this.getBodyStudyOffer({ id: item }).then((res) => {
            {
              console.log(res);
              // alert(JSON.stringify(res[0]))  retirementAge  painPretiumRate
              // this.matérialSelectedId = res[0]._id
              // this.bodyStudyOfferData.sinisterNumber = res[0].sinister
              //   ? res[0].sinister.sinisterNumber
              //   : "";
              // this.bodyStudyOfferData.name = res[0].sinisterVictim
              //   ? res[0].sinisterVictim.fullName
              //   : "";
              // this.bodyStudyOfferData.age = res[0].sinisterVictim
              //   ? res[0].sinisterVictim.age
              //   : "";
              // this.bodyStudyOfferData.sinisterDate = res[0].sinister.sinisterDate;
              // this.bodyStudyOfferData.sex = res[0].sex
              // this.bodyStudyOfferData.painPretiumRate = res[0].painPretiumRate
              // this.bodyStudyOfferData.estheticDamageRate = res[0].estheticDamageRate
              // this.bodyStudyOfferData.careerDamageApplicate = res[0].careerDamageApplicate
              // this.bodyStudyOfferData.IPRate = res[0].IPRate
              // this.bodyStudyOfferData.retirementAge = res[0].retirementAge;
              // alert(JSON.stringify(this.bodyStudyOfferData))
  
              // this.bodyStudyOfferData.consolidationDate = res[0].consolidationDate;
              // this.bodyStudyOfferData.monthlySMIG = res[0].monthlySMIG;
              // this.bodyStudyOfferData.monthlySMIGResidence =
              //   res[0].monthlySMIGResidence;
              // this.bodyStudyOfferData.withholdingSMIG = res[0].withholdingSMIG;
              // this.bodyStudyOfferData.annualSMIG = res[0].annualSMIG;
              // this.bodyStudyOfferData.monthlyIncome = res[0].monthlyIncome;
              // this.bodyStudyOfferData.annualIncome = res[0].annualIncome;
              // this.bodyStudyOfferData.numberOfITTDays = res[0].numberOfITTDays;
              // this.bodyStudyOfferData.fmp = res[0].FMP;
              this.divisionData.amount = res[0].compensationToBeReceived;
              this.divisionData.agreementDate = res[0].agreementDate;
              // this.bodyStudyOfferData.provision = res[0].provision;
              // this.bodyStudyOfferData.ITT = res[0].ITT;
              // this.bodyStudyOfferData.incomeAfterAccident = res[0].incomeAfterAccident;
              // this.bodyStudyOfferData.physiologicalHarm = res[0].physiologicalHarm;
              // this.bodyStudyOfferData.economicDamage = res[0].economicDamage;
              // this.bodyStudyOfferData.prejudiceMoral = res[0].prejudiceMoral;
              // this.bodyStudyOfferData.thirdPartyAssistance =
              //   res[0].thirdPartyAssistance;
              // this.bodyStudyOfferData.pretiumCruciatus = res[0].pretiumCruciatus;
              // this.bodyStudyOfferData.damageAeshetic = res[0].damageAeshetic;
              // this.bodyStudyOfferData.careerDamage = res[0].careerDamage;
              // this.bodyStudyOfferData.bodilyHarm = res[0].bodilyHarm;
              // this.bodyStudyOfferData.fixedMaterialDamage =
              //   res[0].fixedMaterialDamage;
              // this.bodyStudyOfferData.prosthesisPurchase =
              //   res[0].prosthesisPurchase;
              // this.bodyStudyOfferData.prosthesisMaintenance =
              //   res[0].prosthesisMaintenance;
              // this.bodyStudyOfferData.totalDamage = res[0].totalDamage;
              // this.bodyStudyOfferData.sharingRate = res[0].sharingRate;
              // this.bodyStudyOfferData.provision = res[0].provision;
              // this.bodyStudyOfferData.thirdPartyPayers = res[0].thirdPartyPayers;
              // this.bodyStudyOfferData.expertFees = res[0].expertFees;
              // this.bodyStudyOfferData.compensationToBeReceived =
              //   res[0].compensationToBeReceived;
              // alert(this.bodyStudyOfferData.monthlySMIG)
              this.bodyStudyOfferData.studyOfferID = res[0]._id;
              this.bodyStudyOfferData.sinsterID = res[0].sinister._id;
              // this.bodyStudyValueChange();
  
  
              // this.editedIndex = this.bodyStudyOfferData.indexOf(res[0]);
              // this.bodyStudyOfferData = Object.assign({}, res[0]);
  
            }
          });
  
  
          this.loading = false;
        }
        if (this.typeOfStudy == "IndividualBody") {
          // this.loading = true;
          this.getIndividualBodyStudyOffer({ id: item }).then((res) => {
            {
              console.log(res);
              // alert(JSON.stringify(res))
              this.matérialSelectedId = res[0]._id
              // alert(JSON.stringify(res[0].sinister.sinisterNumber));
              // this.bodyIndividualStudyOfferData.sinisterNumber = res[0].sinister
              //   ? res[0].sinister.sinisterNumber
              //   : "";
              // this.bodyIndividualStudyOfferData.name = res[0].sinisterVictim
              //   ? res[0].sinisterVictim.fullName
              //   : "";
              // this.bodyIndividualStudyOfferData.age = res[0].sinisterVictim
              //   ? res[0].sinisterVictim.age
              //   : "";
              // this.bodyIndividualStudyOfferData.sex = res[0].sex
              //   ;
              // this.bodyIndividualStudyOfferData.sinisterDate = res[0].sinister
              //   ? res[0].sinister.sinisterDate
              //   : "";
              // this.bodyIndividualStudyOfferData.consolidationDate =
              //   res[0].consolidationDate;
              // this.bodyIndividualStudyOfferData.monthlySMIG = res[0].monthlySMIG;
              // this.bodyIndividualStudyOfferData.monthlySMIGResidence =
              //   res[0].monthlySMIGResidence;
              // this.bodyIndividualStudyOfferData.withholdingSMIG =
              //   res[0].withholdingSMIG;
              // this.bodyIndividualStudyOfferData.annualSMIG = res[0].annualSMIG;
              // this.bodyIndividualStudyOfferData.monthlyIncome =
              //   res[0].monthlyIncome;
              // this.bodyIndividualStudyOfferData.annualIncome = res[0].annualIncome;
              // this.bodyIndividualStudyOfferData.numberOfITTDays =
              //   res[0].numberOfITTDays;
              // this.bodyIndividualStudyOfferData.fmp = res[0].FMP;
              // this.bodyIndividualStudyOfferData.provision = res[0].provision;
              // this.bodyIndividualStudyOfferData.itt = res[0].ITT;
              // this.bodyIndividualStudyOfferData.numberOfDays = res[0].numberOfDays;
              // this.bodyIndividualStudyOfferData.disability = res[0].disability;
              // this.bodyIndividualStudyOfferData.IPRate = res[0].IPRate;
              // this.bodyIndividualStudyOfferData.lumpSumDisability =
              //   res[0].lumpSumDisability;
              // this.bodyIndividualStudyOfferData.deathBenefit = res[0].deathBenefit;
              // this.bodyIndividualStudyOfferData.totalDamage = res[0].totalDamage;
              // this.bodyIndividualStudyOfferData.disbursements =
              //   res[0].disbursements;
              // // this.bodyIndividualStudyOfferData.provision = res[0].provision;
              // this.bodyIndividualStudyOfferData.thirdPartyPayers =
              //   res[0].thirdPartyPayers;
              // this.bodyIndividualStudyOfferData.compensationToBeReceived =
              //   res[0].compensationToBeReceived;
              this.divisionData.amount = res[0].compensationToBeReceived;
              this.divisionData.agreementDate = res[0].agreementDate;
              // this.bodyIndividualStudyOfferData.sinsterVictimeID = res[0].sinisterVictim._id;
              // this.bodyIndividualStudyOfferData.sinsterID = res[0].sinister._id;
              // this.individualBodyStudyValueChange();
              // this.editedIndex = this.bodyIndividualStudyOfferData.indexOf(res[0]);
              // this.bodyIndividualStudyOfferData = Object.assign({}, res[0]);
              // this.bodyPersonnaleStudy = true;
            }
          });
          // this.loading = false;
        }
        if (this.typeOfStudy == "DeathStudy") {
          this.loading = true;
          this.getDeathStudyOffer({ id: item._id }).then(async (res) => {
            {
              // console.log(res);
              this.matérialSelectedId = res[0]._id
              // alert(JSON.stringify(res[0]))
              await this.getayantDroitStudyOffer({ id: res[0]._id })
              // alert(JSON.stringify(res[0].sinister.sinisterNumber));
              this.deathStudyOfferData.sinisterNumber = res[0].sinister
                ? res[0].sinister.sinisterNumber
                : "";
              this.deathStudyOfferData.name = res[0].sinisterVictim
                ? res[0].sinisterVictim.fullName
                : "";
              this.deathStudyOfferData.age = res[0].sinisterVictim
                ? res[0].sinisterVictim.age
                : "";
              this.deathStudyOfferData.sex = res[0].sinisterVictim
                ? res[0].sinisterVictim.civility
                : "";
              this.deathStudyOfferData.sinisterDate = res[0].sinister
                ? res[0].sinister.sinisterDate
                : "";
              // this.deathStudyOfferData.consolidationDate =
              //   res[0].consolidationDate;
              this.deathStudyOfferData.monthlySMIG = res[0].monthlySMIG;
              this.deathStudyOfferData.monthlySMIGResidence =
                res[0].monthlySMIGResidence;
              this.deathStudyOfferData.withholdingSMIG =
                res[0].withholdingSMIG;
              this.deathStudyOfferData.annualSMIG = res[0].annualSMIG;
              this.deathStudyOfferData.monthlyIncome =
                res[0].monthlyIncome;
              this.deathStudyOfferData.annualIncome = res[0].annualIncome
  
              this.deathStudyOfferData.totalMoralDamage =
                res[0].totalMoralDamage;
              this.deathStudyOfferData.totalCompensationDue =
                res[0].totalCompensationDue;
              this.deathStudyOfferData.totalShare =
                res[0].totalShare;
              this.deathStudyOfferData.totalMoralDamage =
                res[0].totalMoralDamage;
              this.deathStudyOfferData.totalCompensationDue =
                res[0].totalCompensationDue;
              this.deathStudyOfferData.totalShare =
                res[0].totalShare;
              this.deathStudyOfferData.disbursements =
                res[0].disbursements;
              this.deathStudyOfferData.material =
                res[0].material;
              this.deathStudyOfferData.provision =
                res[0].provision;
              this.deathStudyOfferData.underTotal =
                res[0].underTotal;
              this.deathStudyOfferData.funeralExpenses =
                res[0].funeralExpenses;
              this.divisionData.amount = res[0].amount;
              this.divisionData.agreementDate = res[0].agreementDate;
              this.deathStudyOfferData.totalCompensation = res[0].totalCompensation;
              this.deathStudyOfferData.distributionKey = res[0].distributionKey;
              this.deathStudyOfferData.sharingRate = res[0].sharingRate;
              // this.deathStudyOfferData.fmp = res[0].FMP;
              // this.deathStudyOfferData.itt = res[0].ITT;
              // this.deathStudyOfferData.numberOfDays = res[0].numberOfDays;
              // this.deathStudyOfferData.disability = res[0].disability;
              // this.deathStudyOfferData.IPRate = res[0].IPRate;
              // this.deathStudyOfferData.lumpSumDisability =
              //   res[0].lumpSumDisability;
              // this.deathStudyOfferData.deathBenefit = res[0].deathBenefit;
              // this.deathStudyOfferData.totalDamage = res[0].totalDamage;
              // this.deathStudyOfferData.disbursements =
              //   res[0].disbursements;
              // this.deathStudyOfferData.provision = res[0].provision;
              // this.deathStudyOfferData.thirdPartyPayers =
              //   res[0].thirdPartyPayers;
              // this.deathStudyOfferData.compensationToBeReceived =
              //   res[0].compensationToBeReceived;
  
              // this.deathStudyOfferData.sinsterVictimeID = res[0].sinisterVictim._id;
              // this.deathStudyOfferData.sinsterID = res[0].sinister._id;
              // this.deathStudyValueChange();
              // this.editedIndex = this.deathStudyOfferData.indexOf(res[0]);
              // this.deathStudyOfferData = Object.assign({}, res[0]);
              // this.addFileDead = true;
            }
          });
          this.loading = false;
        }
        // if (this.typeOfStudy == "HistoryProvision") {
        //   this.loading = true;
        //   this.getBeneficiary({ studyOffer: item._id, studyType: "HistoryProvision" })
        //     .then(async (res) => {
        //       {
        //         // console.log(res);
        //         this.matérialSelectedId = res[0]._id
        //         // alert("ok")
        //         // await this.getayantDroitStudyOffer({ id: res[0]._id })
        //         // alert(JSON.stringify(res[0].sinister.sinisterNumber));
        //         this.HistoryProvisionData.sinisterNumber = res[0].studyOffer.sinisterVictim
        //           ? res[0].studyOffer.sinisterVictim.sinister.sinisterNumber
        //           : "";
        //         this.HistoryProvisionData.fullName = res[0].fullName;
        //         this.HistoryProvisionData.contact = res[0].contact;
        //         this.HistoryProvisionData.totalProvision = res[0].totalProvision;
        //         this.HistoryProvisionData.totalFmp = res[0].totalFmp;
        //         this.divisionData.amount = res[0].amount;
        //         this.divisionData.agreementDate = res[0].agreementDate;
  
        //       }
        //     });
        //   this.loading = false;
        // }
  
  
  
  
  
  
  
  
  
      },
      async matérielClick(item) {
        // console.log(item);
        // alert(JSON.stringify(item._id));
        this.loading = true
        this.bigStudyID = item._id
        this.typeOfStudy = "MaterialStudy"
        this.victimeSelectID = item.sinisterVictim._ids
        this.getmaterialStudyOffer({ id: item._id }).then(async (res) => {
          {
            await this.getmaterialDegatStudyOffer({ id: res[0]._id })
            console.log(res);
            // alert(JSON.stringify(res[0]._id)); matérialDocLink
            this.matérialSelectedId = res[0]._id
            this.materialDamageData.sinisterNumber = res[0].sinister
              ? res[0].sinister.sinisterNumber
              : "";
            this.materialDamageData.name = res[0].sinister
              ? res[0].sinister.name
              : "";
            this.materialDamageData.fullName = res[0].sinisterVictim
              ? res[0].sinisterVictim.fullName
              : "";
            this.materialDamageData.phone = res[0].sinisterVictim
              ? res[0].sinisterVictim.phone
              : "";
            this.materialDamageData.sinisterDate = res[0].sinister
              ? res[0].sinister.sinisterDate
              : "";
            this.materialDamageData.sharingRate =
              res[0].sharingRate;
            this.materialDamageData.total =
              res[0].total;
            this.materialDamageData.indemnity =
              res[0].indemnity;
  
            this.materialDamageData.studyOfferID = item._id;
            // this.materialDamageData.sinsterID = res[0].sinister._id;
            this.bodyStudyValueChange();
  
            // this.editedIndex = this.bodyStudyOfferData.indexOf(res[0]);
            // this.bodyStudyOfferData = Object.assign({}, res[0]);
            this.addFileMaterial = true;
          }
        });
        this.loading = false
  
  
      },
     methods: {
  async bodyStudyClick(item) {
    console.log("Méthode bodyStudyClick appelée avec :", item);
    this.loading = true;
    this.bigStudyID = item._id;
    this.typeOfStudy = "BodyStudy";
    this.victimeSelectID = item.sinisterVictim?._id || "";

    try {
      const res = await this.getBodyStudyOffer({ id: item._id });

      const study = Array.isArray(res?.data) ? res.data[0] : res;

      if (!study) {
        console.warn("Aucune donnée retournée pour cette étude.");
        return;
      }

      const sinisterVictim = study.studyOffer?.sinisterVictim || {};
      const sinister = sinisterVictim.sinister || {};

      this.matérialSelectedId = study._id;

      this.bodyStudyOfferData = {
        sinisterNumber: sinister?.sinisterNumber || "",
        name: sinisterVictim?.fullName || "",
        age: sinisterVictim?.age || "",
        sinisterDate: sinister?.sinisterDate?.split("T")[0] || "",
        sex: study.sex || "",
        painPretiumRate: study.painPretiumRate?.toString() || "",
        estheticDamageRate: study.estheticDamageRate?.toString() || "",
        careerDamageApplicate: study.careerDamageApplicate || false,
        IPRate: study.IPRate || 0,
        retirementAge: study.retirementAge?.toString() || "",
        consolidationDate: study.consolidationDate?.split("T")[0] || "",
        monthlySMIG: study.monthlySMIG || 0,
        monthlySMIGResidence: study.monthlySMIGResidence || 0,
        withholdingSMIG: study.withholdingSMIG || 0,
        annualSMIG: study.annualSMIG || 0,
        monthlyIncome: study.monthlyIncome || 0,
        annualIncome: study.annualIncome || 0,
        applyItt: study.applyItt || false,
        numberOfITTDays: study.numberOfITTDays || 0,
        fmp: study.FMP || 0,
        provision: study.provision || 0,
        ITT: study.ITT || 0,
        incomeAfterAccident: study.incomeAfterAccident || 0,
        physiologicalHarm: study.physiologicalHarm || 0,
        economicDamage: study.economicDamage || 0,
        prejudiceMoral: study.prejudiceMoral || 0,
        thirdPartyAssistance: study.thirdPartyAssistance || 0,
        pretiumCruciatus: study.pretiumCruciatus || 0,
        damageAeshetic: study.damageAeshetic || 0,
        careerDamage: study.careerDamage || 0,
        bodilyHarm: study.bodilyHarm || 0,
        fixedMaterialDamage: study.fixedMaterialDamage || 0,
        prosthesisPurchase: study.prosthesisPurchase || 0,
        prosthesisMaintenance: study.prosthesisMaintenance || 0,
        totalDamage: study.totalDamage || 0,
        sharingRate: study.sharingRate || 0,
        thirdPartyPayers: study.thirdPartyPayers || 0,
        expertFees: study.expertFees || 0,
        compensationToBeReceived: study.compensationToBeReceived || 0
      };

      this.bodyStudyValueChange();
console.log("Contenu de bodyStudyOfferData :", this.bodyStudyOfferData);
    } catch (error) {

      console.error("Erreur lors de la récupération de l’étude corporelle :", error);
      this.$store.dispatch("dispatchError", "Erreur lors du chargement de l’étude corporelle.");
    } finally {
      console.log("bodyStudyOfferData (dans finally):", this.bodyStudyOfferData);
      this.loading = false;
      this.bodyStudy = true;
    }
  }
},

      async printRepartitionDoc() {
        this.loading = true
        try {
          await this.getRepartition({ studyType: this.typeOfStudy, smallStudy: this.matérialSelectedId, signataire: this.signataire == "La Directrice des Sinistres et Prestations" ? true : "", })
        } catch (error) {
          console.log(error)
        }
        finally {
  
          this.loading = false
          this.signataireChoice = false
  
        }
  
  
  
      },
      async makePrintFunc() {
        if (this.itemSelect === 'offerDoc') {
          await this.printDocOnButton()
        } else {
          await this.printRepartitionDoc()
        }
      },
      async genereteDocSign(item) {
        this.signataireChoice = true
        this.signataire = ""
        this.itemSelect = item
        // alert(JSON.stringify(item))
      },
      async printDocOnButton() {
        this.loading = true
        try {
          if (this.typeOfStudy == "MaterialStudy") {
  
  
            await this.getMaterialDoc({ id: this.matérialSelectedId, signataire: this.signataire == "La Directrice des Sinistres et Prestations" ? true : "", })
  
          }
          if (this.typeOfStudy == "BodyStudy") {
  
  
            await this.getBodyDoc({ id: this.matérialSelectedId, signataire: this.signataire == "La Directrice des Sinistres et Prestations" ? true : "", })
  
          }
          if (this.typeOfStudy == "IndividualBody") {
  
  
            await this.getIndividualBodyDoc({ id: this.matérialSelectedId, signataire: this.signataire == "La Directrice des Sinistres et Prestations" ? true : "", })
  
          }
          if (this.typeOfStudy == "DeathStudy") {
  
  
            await this.getDeathDoc({ id: this.matérialSelectedId, signataire: this.signataire == "La Directrice des Sinistres et Prestations" ? true : "", })
  
          }
        } catch (error) {
          console.log(error)
        }
        finally {
          this.loading = false
          this.signataireChoice = false
  
        }
  
      },
      async handleClick(item) {
        // alert(item)
        this.loading = true
        this.typeOfStudy = item
        if (item == "MaterialStudy") {
          this.getmaterialStudyOffer({ id: this.bigStudyID }).then(async (res) => {
            {
              this.divisionData.amount = res[0].indemnity
              this.divisionData.agreementDate = res[0].agreementDate
            }
          });
          await this.getBeneficiary({ smallStudy: this.matérialSelectedId, studyType: item })
          this.addFile = true;
          this.loading = false
        }
        if (item == "BodyStudy") {
          this.getBodyStudyOffer({ id: this.bigStudyID }).then(async (res) => {
            {
              // alert(JSON.stringify(res[0]))
              this.divisionData.amount = res[0].compensationToBeReceived
              this.divisionData.agreementDate = res[0].agreementDate
            }
          });
          await this.getBeneficiary({ smallStudy: this.matérialSelectedId, studyType: item })
          this.addFile = true;
          this.loading = false
        }
        if (item == "IndividualBody") {
          this.getIndividualBodyStudyOffer({ id: this.bigStudyID }).then(async (res) => {
            {
              // alert(JSON.stringify(res[0]))
              this.divisionData.amount = res[0].compensationToBeReceived
              this.divisionData.agreementDate = res[0].agreementDate
            }
          });
          await this.getBeneficiary({ smallStudy: this.matérialSelectedId, studyType: item })
          this.addFile = true;
          this.loading = false
        }
        if (item == "DeathStudy") {
          this.getDeathStudyOffer({ id: this.bigStudyID }).then(async (res) => {
            {
              // alert(JSON.stringify(res[0]))
              this.divisionData.amount = res[0].totalCompensation
              this.divisionData.agreementDate = res[0].agreementDate
            }
          });
          await this.getBeneficiary({ smallStudy: this.matérialSelectedId, studyType: item })
          this.addFile = true;
          this.loading = false
        }
        // if (item =="HistoryProvision"){
  
        // }
  
        // this.adnewObject.sinisterNumber = item.sinister.sinisterNumber;
        // this.adnewObject.name = item.sinister.name;
        // this.adnewObject.fullName = item.sinisterVictim.fullName;
        // this.adnewObject.followed = item.sinisterVictim.followed;
  
        // this.adnewObject.phone = item.sinisterVictim.phone;
        // this.adnewObject.beneficiaryType = item.beneficiaryType;
        // this.adnewObject.beneficiaryName = item.beneficiaryName;
        // this.adnewObject.beneficiaryContact = item.beneficiaryContact;
        // this.adnewObject.settlementAmount = item.settlementAmount;
        // this.adnewObject.offerDate = item.offerDate;
        // this.adnewObject.secondSignatureDate = item.secondSignatureDate;
        // this.adnewObject.financialServiceSendDate = item.financialServiceSendDate;
        // this.adnewObject.financialServiceWithdrawalDate =
        //   item.financialServiceWithdrawalDate;
        // this.adnewObject.receptionServiceSendDate = item.receptionServiceSendDate;
        // this.adnewObject.documentReceptionDate = item.documentReceptionDate;
        // this.adnewObject.checkNumber = item.checkNumber;
        // this.adnewObject.Bank = item.Bank;
        // this.adnewObject.checkDate = item.checkDate;
        // this.adnewObject.offrerID = item._id;
        // this.adnewObject.status = item.status;
        // this.adnewObject.sinsterVictimeID = item.sinisterVictim._id;
        // this.adnewObject.sinsterID = item.sinister._id;
        // this.valueChange();
        // this.editedIndex = this.adnewObject.indexOf(item);
        // this.adnewObject = Object.assign({}, item);
  
      },
      async docShow(item) {
        await this.getVictimesDoc({ id: item._id });
        // this.editedIndex = this.adnewObject.indexOf(item);
        // this.adnewObject = Object.assign({}, item);
        this.victimeDialogModal = true;
      },
      async printComptableDoc() {
        this.loading = true
        try {
          await this.printOfferDoc({
            ids: defaultMethods.getDocItemsId(this.selected),
          });
        } catch (error) {
          console.log(error)
        }
        finally {
          this.selected = {}
          this.printDocChèque = false
          this.loading = false
  
  
        }
  
      },
  
      async pvManageFunction() {
        // await this.getOfferDoc({ printed: !this.singleSelect });
  
        this.pvManage = true;
      },
      async makeBeneficiaryFilter() {
  
  
        try {
          this.singleSelect = {};
          this.loading = true
          await this.getOfferDoc({
            printed: !this.singleSelect,
            secondSignatureDateStart: this.beneficiarySearchData.secondSignatureDateStart,
            secondSignatureDateEnd: this.beneficiarySearchData.secondSignatureDateEnd,
            agentName: this.beneficiarySearchData.agentName,
          });
        } catch (error) {
          console.log(error)
        }
        finally {
          this.loading = false
          // this.printDocChèque = true;
        }
      },
      async addNewVictime() {
  
  
        try {
          this.singleSelect = {};
          this.loading = true
          await this.getOfferDoc({ printed: !this.singleSelect });
        } catch (error) {
          console.log(error)
        }
        finally {
          this.loading = false
          this.printDocChèque = true;
        }
      },
      async showNotPrint() {
        // await this.getOfferDoc({ printed: !this.singleSelect });
        try {
          // this.singleSelect = {};
          this.loading = true
          await this.getOfferDoc({ printed: !this.singleSelect });
        } catch (error) {
          console.log(error)
        }
        finally {
          this.loading = false
          // this.printDocChèque = true;
        }
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
      individualBodyStudyValueChange() {
        // if (
        //   Number(this.bodyIndividualStudyOfferData.monthlySMIG) <=
        //   Number(this.bodyIndividualStudyOfferData.monthlySMIGResidence)
        // ) {
        //   this.bodyIndividualStudyOfferData.withholdingSMIG = this.bodyIndividualStudyOfferData.monthlySMIGResidence;
        //   this.bodyIndividualStudyOfferData.annualSMIG =
        //     this.bodyIndividualStudyOfferData.monthlySMIGResidence * 12;
        // } else {
        //   // alert("ok");
        //   this.bodyIndividualStudyOfferData.withholdingSMIG = this.bodyIndividualStudyOfferData.monthlySMIG;
        //   this.bodyIndividualStudyOfferData.annualSMIG =
        //     this.bodyIndividualStudyOfferData.monthlySMIG * 12;
        // }
  
        // if (
        //   Number(this.bodyIndividualStudyOfferData.monthlyIncome) <=
        //   Number(this.bodyIndividualStudyOfferData.withholdingSMIG)
        // ) {
        //   this.bodyIndividualStudyOfferData.annualIncome =
        //     this.bodyIndividualStudyOfferData.withholdingSMIG * 12;
        // } else {
        //   this.bodyIndividualStudyOfferData.annualIncome =
        //     this.bodyIndividualStudyOfferData.monthlyIncome * 12;
        // }
        // if (this.bodyIndividualStudyOfferData.numberOfITTDays == 0) {
        //   let date1 = new Date(this.bodyIndividualStudyOfferData.sinisterDate);
        //   let date2 = new Date(
        //     this.bodyIndividualStudyOfferData.consolidationDate
        //   ); // To calculate the time difference of two dates
        //   let Difference_In_Time = date2.getTime() - date1.getTime(); // To calculate the no. of days between two dates
        //   let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        //   this.bodyIndividualStudyOfferData.numberOfITTDays =
        //     Difference_In_Days == 0 ? 1 : Difference_In_Days;
        // }
  
        // if (
        //   Number(
        //     this.bodyIndividualStudyOfferData.annualIncome <
        //     this.bodyIndividualStudyOfferData.annualSMIG * 6
        //   )
        // ) {
        //   this.bodyIndividualStudyOfferData.itt = Math.round(
        //     (this.bodyIndividualStudyOfferData.annualIncome / 365) *
        //     this.bodyIndividualStudyOfferData.numberOfITTDays
        //   );
        // } else {
        //   this.bodyIndividualStudyOfferData.itt = Math.round(
        //     ((this.bodyIndividualStudyOfferData.annualSMIG * 6) / 365) *
        //     this.bodyIndividualStudyOfferData.numberOfITT6ays
        //   );
        // } bodyIndividualStudyOfferData.dailyAllowance
        this.bodyIndividualStudyOfferData.realDailyIttAmount = (Number(this.bodyIndividualStudyOfferData.deathBenefit) + Number(this.bodyIndividualStudyOfferData.lumpSumDisability)) / 4000
        if (this.bodyIndividualStudyOfferData.contractualIttAmount < this.bodyIndividualStudyOfferData.realDailyIttAmount) {
          this.bodyIndividualStudyOfferData.dailyAllowance = this.bodyIndividualStudyOfferData.contractualIttAmount
        } else {
          this.bodyIndividualStudyOfferData.dailyAllowance = this.bodyIndividualStudyOfferData.realDailyIttAmount
        }
        this.bodyIndividualStudyOfferData.disability = Number(this.bodyIndividualStudyOfferData.IPRate) * Number(this.bodyIndividualStudyOfferData.lumpSumDisability) / 100
        this.bodyIndividualStudyOfferData.ittAmount = Number(this.bodyIndividualStudyOfferData.dailyAllowance) * Number(this.bodyIndividualStudyOfferData.numberOfDays)
        if (this.bodyIndividualStudyOfferData.IPRate != 0) {
          this.bodyIndividualStudyOfferData.totalDamage = Number(this.bodyIndividualStudyOfferData.fmp) + Number(this.bodyIndividualStudyOfferData.disability) + Number(this.bodyIndividualStudyOfferData.ittAmount)
        } else {
          this.bodyIndividualStudyOfferData.totalDamage = Number(this.bodyIndividualStudyOfferData.fmp) + Number(this.bodyIndividualStudyOfferData.disability) + Number(this.bodyIndividualStudyOfferData.deathBenefit) + Number(this.bodyIndividualStudyOfferData.ittAmount)
        }
  
        this.bodyIndividualStudyOfferData.compensationToBeReceived = Number(this.bodyIndividualStudyOfferData.totalDamage) - Number(this.bodyIndividualStudyOfferData.disbursements) - Number(this.bodyIndividualStudyOfferData.provision) - Number(this.bodyIndividualStudyOfferData.thirdPartyPayers)
        this.postOfIndividualBodyStudy()
      },
      deathStudyValueChange() {
        // sharingRate
        if (
          Number(this.deathStudyOfferData.monthlySMIG) <=
          Number(this.deathStudyOfferData.monthlySMIGResidence)
        ) {
          this.deathStudyOfferData.withholdingSMIG = this.deathStudyOfferData.monthlySMIGResidence;
          this.deathStudyOfferData.annualSMIG =
            this.deathStudyOfferData.monthlySMIGResidence * 12;
        } else {
          // alert("ok");
          this.deathStudyOfferData.withholdingSMIG = this.deathStudyOfferData.monthlySMIG;
          this.deathStudyOfferData.annualSMIG =
            this.deathStudyOfferData.monthlySMIG * 12;
        }
  
        if (
          Number(this.deathStudyOfferData.monthlyIncome) <=
          Number(this.deathStudyOfferData.withholdingSMIG)
        ) {
          this.deathStudyOfferData.annualIncome =
            this.deathStudyOfferData.withholdingSMIG * 12;
        } else {
          this.deathStudyOfferData.annualIncome =
            this.deathStudyOfferData.monthlyIncome * 12;
        }
        // alert("ok")
  
        if (this.deathStudyOfferData.funeralExpenses < this.deathStudyOfferData.annualSMIG * 2) {
          console.log('ok')
        } else {
          this.deathStudyOfferData.funeralExpenses = this.deathStudyOfferData.annualSMIG * 2
        }
        this.deathStudyOfferData.underTotal = Number(this.deathStudyOfferData.totalShare) - Number(this.deathStudyOfferData.disbursements) + Number(this.deathStudyOfferData.material) - Number(this.deathStudyOfferData.provision)
        this.deathStudyOfferData.totalCompensation = Number(this.deathStudyOfferData.underTotal) + Number(this.deathStudyOfferData.funeralExpenses)
  
        this.postOfDeathStudy()
      },
      addAyantDroit() {
        this.ayantDroitDataListe = {}
        this.addFileMoreDead = true
      },
  
      async postOfDeathStudy() {
        // alert(this.matérialSelectedId)
  
        try {
          const schema = {
            studyOffer: this.bigStudyID,
            distributionKey: this.deathStudyOfferData.distributionKey,
            sharingRate: this.deathStudyOfferData.sharingRate,
            monthlySMIG: this.deathStudyOfferData.monthlySMIG,
            monthlySMIGResidence: this.deathStudyOfferData.monthlySMIGResidence,
            withholdingSMIG: this.deathStudyOfferData.withholdingSMIG,
            annualSMIG: this.deathStudyOfferData.annualSMIG,
            monthlyIncome: this.deathStudyOfferData.monthlyIncome,
            annualIncome: this.deathStudyOfferData.annualIncome,
            disbursements: this.deathStudyOfferData.disbursements,
            material: this.deathStudyOfferData.material,
            provision: this.deathStudyOfferData.provision,
            underTotal: this.deathStudyOfferData.underTotal,
            funeralExpenses: this.deathStudyOfferData.funeralExpenses,
            totalCompensation: this.deathStudyOfferData.totalCompensation,
          };
          await addDeathStudy({
            schema,
          });
          // this.bodyPersonnaleStudy = false
          // this.reloadMatérialClick(this.bodyIndividualStudyOfferData.studyOfferID)
        } catch (error) {
          defaultMethods.dispatchError(this.$store);
        }
  
      },
      bodyStudyValueChange() {
        // bodilyHarm  economicDamage this.bodyStudyOfferData.fmp thirdPartyAssistance
        // economicDamage
        if (
          Number(this.bodyStudyOfferData.monthlySMIG) <=
          Number(this.bodyStudyOfferData.monthlySMIGResidence)
        ) {
          this.bodyStudyOfferData.withholdingSMIG = this.bodyStudyOfferData.monthlySMIGResidence;
          this.bodyStudyOfferData.annualSMIG =
            this.bodyStudyOfferData.monthlySMIGResidence * 12;
        } else {
          // alert("ok");
          this.bodyStudyOfferData.withholdingSMIG = this.bodyStudyOfferData.monthlySMIG;
          this.bodyStudyOfferData.annualSMIG =
            this.bodyStudyOfferData.monthlySMIG * 12;
        }
  
        if (
          Number(this.bodyStudyOfferData.monthlyIncome) <=
          Number(this.bodyStudyOfferData.withholdingSMIG)
        ) {
          this.bodyStudyOfferData.annualIncome =
            this.bodyStudyOfferData.withholdingSMIG * 12;
        } else {
          this.bodyStudyOfferData.annualIncome =
            this.bodyStudyOfferData.monthlyIncome * 12;
        }
        if (this.bodyStudyOfferData.consolidationDate != "" && this.bodyStudyOfferData.numberOfITTDays == 0) {
          let date1 = new Date(this.bodyStudyOfferData.sinisterDate);
          let date2 = new Date(this.bodyStudyOfferData.consolidationDate); // To calculate the time difference of two dates
          let Difference_In_Time = date2.getTime() - date1.getTime(); // To calculate the no. of days between two dates
          let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          // alert(Difference_In_Time)
          this.bodyStudyOfferData.numberOfITTDays = Difference_In_Days
        }
        if (this.bodyStudyOfferData.applyItt == "Oui") {
          if (
            Number(
              this.bodyStudyOfferData.annualIncome <
              this.bodyStudyOfferData.annualSMIG * 6
            )
          ) {
            this.bodyStudyOfferData.ITT = Math.round(
              (this.bodyStudyOfferData.annualIncome / 365) *
              this.bodyStudyOfferData.numberOfITTDays
            );
  
          } else {
  
            this.bodyStudyOfferData.ITT = Math.round(
              ((this.bodyStudyOfferData.annualSMIG * 6) / 365) *
              this.bodyStudyOfferData.numberOfITTDays
            );
            // alert(this.bodyStudyOfferData.ITT) compensationToBeReceived
            // alert(typeof this.bodyStudyOfferData.ITT)
          }
        } else {
          this.bodyStudyOfferData.ITT = 0
        }
  
        this.calculatePointValue();
        this.bodyStudyOfferData.physiologicalHarm =
          (this.bodyStudyOfferData.annualSMIG *
            this.bodyStudyOfferData.IPRate *
            this.bodyStudyOfferData.pointValue) /
          100;
        this.rentValue = 0;
        if (this.bodyStudyOfferData.IPRate >= 50) {
          if (this.bodyStudyOfferData.sex == "Masculin") {
            let rentFilterValue = [];
            if (this.bodyStudyOfferData.retirementAge == 60) {
              rentFilterValue = this.pere60.filter(
                (element) => element.age == this.bodyStudyOfferData.age
              );
              this.rentValue = rentFilterValue[0].franc;
            }
            if (this.bodyStudyOfferData.retirementAge == 65) {
              let rentFilterValue = [];
              rentFilterValue = this.pere65.filter(
                (element) => element.age == this.bodyStudyOfferData.age
              );
              this.rentValue = rentFilterValue[0].franc;
            }
            // this.rentValue = this.francRentMan(this.bodyStudyOfferData.age);
  
            // alert(JSON.stringify(this.rentValue));
          } else {
            let rentFilterValue = [];
            if (this.bodyStudyOfferData.retirementAge == 60) {
              rentFilterValue = this.mere60.filter(
                (element) => element.age == this.bodyStudyOfferData.age
              );
              this.rentValue = rentFilterValue[0].franc;
            }
            if (this.bodyStudyOfferData.retirementAge == 65) {
              let rentFilterValue = [];
              rentFilterValue = this.mere65.filter(
                (element) => element.age == this.bodyStudyOfferData.age
              );
              this.rentValue = rentFilterValue[0].franc;
            }
            // this.rentValue = this.francRentMan(this.bodyStudyOfferData.age);
  
            // alert(JSON.stringify(this.rentValue));
          }
  
          let valueEconomoque = 0
          valueEconomoque = (this.bodyStudyOfferData.monthlyIncome -
            this.bodyStudyOfferData.incomeAfterAccident) *
            12 *
            this.rentValue;
          if (valueEconomoque > (this.bodyStudyOfferData.annualSMIG * 10)) {
            this.bodyStudyOfferData.economicDamage = this.bodyStudyOfferData.annualSMIG * 10
          } else {
            this.bodyStudyOfferData.economicDamage = valueEconomoque
          }
  
  
        } else {
          this.bodyStudyOfferData.economicDamage = 0;
        }
        if (this.bodyStudyOfferData.IPRate >= 80) {
          this.bodyStudyOfferData.prejudiceMoral =
            this.bodyStudyOfferData.annualSMIG * 2;
          this.bodyStudyOfferData.thirdPartyAssistance =
            ((this.bodyStudyOfferData.physiologicalHarm +
              this.bodyStudyOfferData.economicDamage +
              this.bodyStudyOfferData.prejudiceMoral) *
              50) /
            100;
        } else {
          this.bodyStudyOfferData.prejudiceMoral = 0;
          this.bodyStudyOfferData.thirdPartyAssistance = 0
        }
  
  
        this.bodyStudyOfferData.pretiumCruciatus =
          (this.bodyStudyOfferData.painPretiumRate *
            this.bodyStudyOfferData.annualSMIG) /
          100;
        this.bodyStudyOfferData.damageAeshetic =
          (this.bodyStudyOfferData.estheticDamageRate *
            this.bodyStudyOfferData.annualSMIG) /
          100;
        if (this.bodyStudyOfferData.careerDamageApplicate == "Oui") {
          this.bodyStudyOfferData.careerDamage =
            this.bodyStudyOfferData.monthlyIncome * 6;
        } else {
          this.bodyStudyOfferData.careerDamage = 0;
        }
        this.bodyStudyOfferData.bodilyHarm =
          Number(this.bodyStudyOfferData.fmp) +
          Number(this.bodyStudyOfferData.ITT) +
          Number(this.bodyStudyOfferData.physiologicalHarm) +
          Number(this.bodyStudyOfferData.economicDamage) +
          Number(this.bodyStudyOfferData.thirdPartyAssistance) +
          Number(this.bodyStudyOfferData.careerDamage) +
          Number(this.bodyStudyOfferData.prejudiceMoral) +
          Number(this.bodyStudyOfferData.pretiumCruciatus) +
          Number(this.bodyStudyOfferData.damageAeshetic);
  
        this.bodyStudyOfferData.totalDamage =
          Number(this.bodyStudyOfferData.bodilyHarm) +
          Number(this.bodyStudyOfferData.fixedMaterialDamage) +
          Number(this.bodyStudyOfferData.prosthesisPurchase) +
          Number(this.bodyStudyOfferData.prosthesisMaintenance);
        this.bodyStudyOfferData.damageAfterSharing = Math.round(
          (Number(this.bodyStudyOfferData.totalDamage) *
            Number(this.bodyStudyOfferData.sharingRate)) /
          100);
        this.bodyStudyOfferData.compensationToBeReceived =
          Number(this.bodyStudyOfferData.damageAfterSharing) -
          Number(this.bodyStudyOfferData.provision) -
          Number(this.bodyStudyOfferData.thirdPartyPayers) -
          Number(this.bodyStudyOfferData.expertFees)
  
        // alert(this.bodyStudyOfferData.damageAfterSharing);
        // this.bodyStudyValueChange();
        if (isNaN(this.bodyStudyOfferData.numberOfITTDays)) {
          this.bodyStudyOfferData.numberOfITTDays = 0
        }
        if (isNaN(this.bodyStudyOfferData.ITT)) {
          this.bodyStudyOfferData.ITT = 0
        }
        if (isNaN(this.bodyStudyOfferData.bodilyHarm)) {
          this.bodyStudyOfferData.bodilyHarm = 0
        }
        if (isNaN(this.bodyStudyOfferData.totalDamage)) {
          this.bodyStudyOfferData.totalDamage = 0
        }
        if (isNaN(this.bodyStudyOfferData.compensationToBeReceived)) {
          this.bodyStudyOfferData.compensationToBeReceived = 0
        }
        if (isNaN(this.bodyStudyOfferData.damageAfterSharing)) {
          this.bodyStudyOfferData.damageAfterSharing = 0
        }
  
        this.postOfBodyStudy()
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
        const age = this.bodyStudyOfferData.age;
        const ipRate = this.bodyStudyOfferData.IPRate;
        let result = this.bodyStudyOfferData.pointValue;
  
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
  
        this.bodyStudyOfferData.pointValue = result;
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
      async addVictimesFileFormModal(item) {
        this.loading = true;
        // alert(item.sinisterNumber);
        try {
          const schema = {
            sinister: item.sinsterID,
            followed: this.adnewObject.followed,
          };
          // if (this.victimeFormData.operationType == "Demande PV") {
          //   await addOperationTypeForm({ schema });
          // }
  
          if (item.sinsterVictimeID) {
            // update
            await updateVictimeFileForm({
              schema,
              id: item.sinsterVictimeID,
            });
          }
          // this.closeMail();
          // this.initialize();
        } catch (error) {
          defaultMethods.dispatchError(this.$store);
        }
      },
      newClickMorePayement() {
  
        this.morePayementStudy = {};
        this.addMorePaymente = true;
      },
      handleClickMorePayement(item) {
  
        this.morePayementStudy.beneficiaryType = item.beneficiaryType;
        this.morePayementStudy.fullName = item.fullName;
        this.morePayementStudy.contact = item.contact;
        this.morePayementStudy.nature = item.nature;
        this.morePayementStudy.amount = item.amount;
        this.morePayementStudy.offerDate = item.offerDate;
        this.morePayementStudy.secondSignatureDate = item.secondSignatureDate;
        this.morePayementStudy.financialServiceSendDate = item.financialServiceSendDate;
        this.morePayementStudy.bank = item.bank ? item.bank.name : "";
        this.morePayementStudy.checkNumber = item.checkNumber;
        this.morePayementStudy.checkDate = item.checkDate;
        this.morePayementStudy.ID = item._id
        this.addMorePaymente = true;
      },
      handleClickAyantDroit(item) {
  
        this.ayantDroitDataListe.fullName = item.fullName;
        this.ayantDroitDataListe.quality = item.quality;
        this.ayantDroitDataListe.age = item.age;
        this.ayantDroitDataListe.sex = item.sex;
        this.ayantDroitDataListe.sex = item.sex;
        this.ayantDroitDataListe.isOrphanDouble = item.isOrphanDouble == true ? "Oui" : "Non";
        this.ayantDroitDataListe.economicDamage = item.economicDamage;
        this.ayantDroitDataListe.moralDamage = item.moralDamage;
        this.ayantDroitDataListe.compensationDue = item.compensationDue;
        this.ayantDroitDataListe.share = item.share;
        this.ayantDroitDataListe.degatID = item._id
        this.addFileMoreDead = true;
      },
      handleClickDeagat(item) {
        this.degatData.documents = item.documents;
        this.degatData.number = item.number;
        this.degatData.amountRequested = item.amountRequested;
        this.degatData.amountToBePaid = item.amountToBePaid;
        this.degatData.patterns = item.patterns;
        this.degatData.degatID = item._id
        this.addFileMoreMaterial = true;
      },
      async addBeneficiaryProvisionFormModal() {
        this.loading = true;
        // alert( defaultMethods.getItemId(this.BankNameListe, this.beneficiary.bank))
        try {
          const schema = {
            // policeStation: defaultMethods.getItemId(
            //   this.Commissariat,
            //   this.adnewObject.policeStation
            // ),
            beneficiaryType: this.beneficiaryProvisionData.beneficiaryType,
            fullName: this.beneficiaryProvisionData.fullName,
            contact: this.beneficiaryProvisionData.contact,
            agreementDate: this.beneficiaryProvisionData.agreementDate,
            secondSignatureDate: this.beneficiaryProvisionData.secondSignatureDate,
            financialServiceSendDate: this.beneficiaryProvisionData.financialServiceSendDate,
            financialServiceWithdrawalDate: this.beneficiaryProvisionData.financialServiceWithdrawalDate,
            receptionServiceSendDate: this.beneficiaryProvisionData.receptionServiceSendDate,
            //checkNumber: this.beneficiaryProvisionData.checkNumber,
            //bank: defaultMethods.getItemId(this.bank, this.beneficiaryProvisionData.bank),
            //checkDate: this.beneficiaryProvisionData.checkDate,
  
            observation: this.beneficiary.observation
  
  
          };
  
          if (this.beneficiaryProvisionData.beneficiaryID) {
            await updateBeneficiary({
              schema,
              id: this.beneficiaryProvisionData.beneficiaryID,
              studyOffer: this.bigStudyID,
              sinisterVictim: this.victimeSelectID
  
  
            });
  
            defaultMethods.dispatchSuccess(
              this.$store,
              messages.updatedSuccessfully("Dossier")
            );
          }
          // this.reloadMatérialClick(this.materialDamageData.studyOfferID)
          this.getBeneficiary({ studyOffer: this.bigStudyID, studyType: "HistoryProvision" })
          this.addProvisioneneficiary = false
          // this.closeMail();
          // this.initialize();
        } catch (error) {
          defaultMethods.dispatchError(this.$store);
        }
        this.loading = false;
        // this.addFile = false;
        // this.addFileExcel = false;
        // this.dialog = false;
        // this.dialogDelete = false;
        this.initFiles();
      },
      async addBeneficiaryFormModal() {
        this.loading = true;
        // alert( defaultMethods.getItemId(this.BankNameListe, this.beneficiary.bank))
        try {
          const schema = {
            // policeStation: defaultMethods.getItemId(
            //   this.Commissariat,
            //   this.adnewObject.policeStation
            // ),
            beneficiaryType: this.beneficiary.beneficiaryType,
            amount: Number(this.beneficiary.amount),
            agreementDate: this.beneficiary.agreementDate,
            secondSignatureDate: this.beneficiary.secondSignatureDate,
            financialServiceSendDate: this.beneficiary.financialServiceSendDate,
            financialServiceWithdrawalDate: this.beneficiary.financialServiceWithdrawalDate,
            receptionServiceSendDate: this.beneficiary.receptionServiceSendDate,
            //checkNumber: this.beneficiary.checkNumber,
            //bank: defaultMethods.getItemId(this.bank, this.beneficiary.bank),
            //checkDate: this.beneficiary.checkDate,
            studyOffer: this.bigStudyID,
            smallStudy: this.matérialSelectedId,
            studyType: this.typeOfStudy,
            fullName: this.beneficiary.fullName,
            contact: this.beneficiary.contact,
            observation: this.beneficiary.observation
  
  
          };
  
          if (this.beneficiary.beneficiaryID) {
            await updateBeneficiary({
              schema,
              id: this.beneficiary.beneficiaryID,
              studyOffer: this.bigStudyID,
              sinisterVictim: this.victimeSelectID
  
            });
  
            defaultMethods.dispatchSuccess(
              this.$store,
              messages.updatedSuccessfully("Dossier")
            );
          } else {
            await addBeneficiary({ schema });
            defaultMethods.dispatchSuccess(
              this.$store,
              messages.createdSuccessfully("Dossier")
            );
          }
          this.reloadMatérialClick(this.bigStudyID)
          this.getBeneficiary({ smallStudy: this.matérialSelectedId, studyType: this.typeOfStudy })
          this.addFileMoreNeneficiary = false
          // this.closeMail();
          // this.initialize();
        } catch (error) {
          defaultMethods.dispatchError(this.$store);
        }
        this.loading = false;
        // this.addFile = false;
        // this.addFileExcel = false;
        // this.dialog = false;
        // this.dialogDelete = false;
        this.initFiles();
      },
      async addDegatFormModal() {
        this.loading = true;
        try {
          const schema = {
            // policeStation: defaultMethods.getItemId(
            //   this.Commissariat,
            //   this.adnewObject.policeStation
            // ),
            materialStudy: this.matérialSelectedId,
            documents: this.degatData.documents,
            number: this.degatData.number,
            amountRequested: this.degatData.amountRequested,
            amountToBePaid: this.degatData.amountToBePaid,
            patterns: this.degatData.patterns,
          };
  
          if (this.degatData.degatID) {
            await updateDegat({
              schema,
              id: this.degatData.degatID,
            });
  
            defaultMethods.dispatchSuccess(
              this.$store,
              messages.updatedSuccessfully("Dossier")
            );
          } else {
            await addDegat({ schema });
            defaultMethods.dispatchSuccess(
              this.$store,
              messages.createdSuccessfully("Dossier")
            );
          }
          this.reloadMatérialClick(this.bigStudyID)
          this.addFileMoreMaterial = false
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
      async ayantDroitValueChange() {
  
        if (this.deathStudyOfferData.distributionKey == "Quatre enfant à charge") {
          let qualityValue = "";
          let pensionFrancValue = []
          if (this.ayantDroitDataListe.quality == "Ascendant (e)") {
            qualityValue = "ascendants"
            this.cléDePartage = this.quatreEnfant.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
            if (this.ayantDroitDataListe.sex == "Masculin") {
  
              pensionFrancValue = this.pere100.filter(
                (element) => element.age == this.ayantDroitDataListe.age
              );
  
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
  
              pensionFrancValue = this.mere100.filter(
                (element) => element.age == this.ayantDroitDataListe.age
              );
            }
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
            this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 75 / 100
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
            // let capitalize = 0
  
  
          }
          if (this.ayantDroitDataListe.quality == "Descendant (e)") {
            qualityValue = "enfants"
            this.cléDePartage = this.quatreEnfant.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
  
  
            if (this.ayantDroitDataListe.sex == "Masculin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.man25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.fille25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
  
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            if (this.ayantDroitDataListe.age < 25) {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 100 / 100
            } else {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 75 / 100
            }
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
            // let capitalize = 0
  
  
          }
          if (this.ayantDroitDataListe.quality == "Conjoint (e)") {
            qualityValue = "conjoints"
            this.cléDePartage = this.quatreEnfant.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
            if (this.ayantDroitDataListe.sex == "Masculin") {
  
              pensionFrancValue = this.pere100.filter(
                (element) => element.age == this.ayantDroitDataListe.age
              );
  
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
  
              pensionFrancValue = this.mere100.filter(
                (element) => element.age == this.ayantDroitDataListe.age
              );
            }
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
            this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 150 / 100
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
          }
          if (this.ayantDroitDataListe.quality == "Collatéral (le)") {
            this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 50 / 100
          }
          if (this.ayantDroitDataListe.quality == "Concubin (e)") {
            qualityValue = "enfants"
            this.cléDePartage = this.quatreEnfant.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
  
  
            if (this.ayantDroitDataListe.sex == "Masculin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.man25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.fille25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
  
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            if (this.ayantDroitDataListe.age < 25) {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 100 / 100
            } else {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 75 / 100
            }
  
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
            // let capitalize = 0
          }
          if (this.ayantDroitDataListe.quality == "Orphelin double") {
            qualityValue = "orphelins"
            this.cléDePartage = this.quatreEnfant.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
  
  
            if (this.ayantDroitDataListe.sex == "Masculin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.man25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.fille25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
  
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            if (this.ayantDroitDataListe.age < 25) {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 100 / 100
            } else {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 75 / 100
            }
  
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
          }
        }
        if (this.deathStudyOfferData.distributionKey == "Au-delà de quatre enfant") {
          let qualityValue = "";
          let pensionFrancValue = []
          if (this.ayantDroitDataListe.quality == "Ascendant (e)") {
            qualityValue = "ascendants"
            this.cléDePartage = this.plusQuatreEnfant.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
            if (this.ayantDroitDataListe.sex == "Masculin") {
  
              pensionFrancValue = this.pere100.filter(
                (element) => element.age == this.ayantDroitDataListe.age
              );
  
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
  
              pensionFrancValue = this.mere100.filter(
                (element) => element.age == this.ayantDroitDataListe.age
              );
            }
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
            this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 75 / 100
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
            // let capitalize = 0
  
  
          }
          if (this.ayantDroitDataListe.quality == "Descendant (e)") {
            qualityValue = "enfants"
            this.cléDePartage = this.plusQuatreEnfant.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
  
  
            if (this.ayantDroitDataListe.sex == "Masculin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.man25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.fille25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
  
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            if (this.ayantDroitDataListe.age < 25) {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 100 / 100
            } else {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 75 / 100
            }
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
            // let capitalize = 0
  
  
          }
          if (this.ayantDroitDataListe.quality == "Conjoint (e)") {
            qualityValue = "conjoints"
            this.cléDePartage = this.plusQuatreEnfant.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
            if (this.ayantDroitDataListe.sex == "Masculin") {
  
              pensionFrancValue = this.pere100.filter(
                (element) => element.age == this.ayantDroitDataListe.age
              );
  
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
  
              pensionFrancValue = this.mere100.filter(
                (element) => element.age == this.ayantDroitDataListe.age
              );
            }
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
            this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 150 / 100
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
          }
          if (this.ayantDroitDataListe.quality == "Collatéral (le)") {
            this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 50 / 100
          }
          if (this.ayantDroitDataListe.quality == "Concubin (e)") {
            qualityValue = "enfants"
            this.cléDePartage = this.plusQuatreEnfant.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
  
  
            if (this.ayantDroitDataListe.sex == "Masculin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.man25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.fille25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
  
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            if (this.ayantDroitDataListe.age < 25) {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 100 / 100
            } else {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 75 / 100
            }
  
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
            // let capitalize = 0
          }
          if (this.ayantDroitDataListe.quality == "Orphelin double") {
            qualityValue = "orphelins"
            this.cléDePartage = this.plusQuatreEnfant.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
  
  
            if (this.ayantDroitDataListe.sex == "Masculin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.man25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.fille25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
  
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            if (this.ayantDroitDataListe.age < 25) {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 100 / 100
            } else {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 75 / 100
            }
  
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
          }
        }
        if (this.deathStudyOfferData.distributionKey == "Sans conjoint, sans enfant") {
          let qualityValue = "";
          let pensionFrancValue = []
          if (this.ayantDroitDataListe.quality == "Ascendant (e)") {
            qualityValue = "ascendants"
            this.cléDePartage = this.sansRien.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
            if (this.ayantDroitDataListe.sex == "Masculin") {
  
              pensionFrancValue = this.pere100.filter(
                (element) => element.age == this.ayantDroitDataListe.age
              );
  
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
  
              pensionFrancValue = this.mere100.filter(
                (element) => element.age == this.ayantDroitDataListe.age
              );
            }
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
            this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 75 / 100
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
            // let capitalize = 0
  
  
          }
          if (this.ayantDroitDataListe.quality == "Descendant (e)") {
            qualityValue = "enfants"
            this.cléDePartage = this.sansRien.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
  
  
            if (this.ayantDroitDataListe.sex == "Masculin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.man25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.fille25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
  
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            if (this.ayantDroitDataListe.age < 25) {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 100 / 100
            } else {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 75 / 100
            }
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
            // let capitalize = 0
  
  
          }
          if (this.ayantDroitDataListe.quality == "Conjoint (e)") {
            qualityValue = "conjoints"
            this.cléDePartage = this.sansRien.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
            if (this.ayantDroitDataListe.sex == "Masculin") {
  
              pensionFrancValue = this.pere100.filter(
                (element) => element.age == this.ayantDroitDataListe.age
              );
  
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
  
              pensionFrancValue = this.mere100.filter(
                (element) => element.age == this.ayantDroitDataListe.age
              );
            }
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
            this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 150 / 100
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
          }
          if (this.ayantDroitDataListe.quality == "Collatéral (le)") {
            this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 50 / 100
          }
          if (this.ayantDroitDataListe.quality == "Concubin (e)") {
            qualityValue = "enfants"
            this.cléDePartage = this.sansRien.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
  
  
            if (this.ayantDroitDataListe.sex == "Masculin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.man25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.fille25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
  
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            if (this.ayantDroitDataListe.age < 25) {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 100 / 100
            } else {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 75 / 100
            }
  
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
            // let capitalize = 0
          }
          if (this.ayantDroitDataListe.quality == "Orphelin double") {
            qualityValue = "orphelins"
            this.cléDePartage = this.sansRien.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
  
  
            if (this.ayantDroitDataListe.sex == "Masculin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.man25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.fille25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
  
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            if (this.ayantDroitDataListe.age < 25) {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 100 / 100
            } else {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 75 / 100
            }
  
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
          }
        }
        if (this.deathStudyOfferData.distributionKey == "Avec conjoint(s), sans enfant") {
          let qualityValue = "";
          let pensionFrancValue = []
          if (this.ayantDroitDataListe.quality == "Ascendant (e)") {
            qualityValue = "ascendants"
            this.cléDePartage = this.avecConjoitSansEnfant.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
            if (this.ayantDroitDataListe.sex == "Masculin") {
  
              pensionFrancValue = this.pere100.filter(
                (element) => element.age == this.ayantDroitDataListe.age
              );
  
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
  
              pensionFrancValue = this.mere100.filter(
                (element) => element.age == this.ayantDroitDataListe.age
              );
            }
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
            this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 75 / 100
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
            // let capitalize = 0
  
  
          }
          if (this.ayantDroitDataListe.quality == "Descendant (e)") {
            qualityValue = "enfants"
            this.cléDePartage = this.avecConjoitSansEnfant.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
  
  
            if (this.ayantDroitDataListe.sex == "Masculin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.man25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.fille25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
  
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            if (this.ayantDroitDataListe.age < 25) {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 100 / 100
            } else {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 75 / 100
            }
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
            // let capitalize = 0
  
  
          }
          if (this.ayantDroitDataListe.quality == "Conjoint (e)") {
            qualityValue = "conjoints"
            this.cléDePartage = this.avecConjoitSansEnfant.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
            if (this.ayantDroitDataListe.sex == "Masculin") {
  
              pensionFrancValue = this.pere100.filter(
                (element) => element.age == this.ayantDroitDataListe.age
              );
  
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
  
              pensionFrancValue = this.mere100.filter(
                (element) => element.age == this.ayantDroitDataListe.age
              );
            }
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
            this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 150 / 100
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
          }
          if (this.ayantDroitDataListe.quality == "Collatéral (le)") {
            this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 50 / 100
          }
          if (this.ayantDroitDataListe.quality == "Concubin (e)") {
            qualityValue = "enfants"
            this.cléDePartage = this.avecConjoitSansEnfant.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
  
  
            if (this.ayantDroitDataListe.sex == "Masculin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.man25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.fille25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
  
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            if (this.ayantDroitDataListe.age < 25) {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 100 / 100
            } else {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 75 / 100
            }
  
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
            // let capitalize = 0
          }
          if (this.ayantDroitDataListe.quality == "Orphelin double") {
            qualityValue = "orphelins"
            this.cléDePartage = this.avecConjoitSansEnfant.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
  
  
            if (this.ayantDroitDataListe.sex == "Masculin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.man25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.fille25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
  
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            if (this.ayantDroitDataListe.age < 25) {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 100 / 100
            } else {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 75 / 100
            }
  
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
          }
        }
        if (this.deathStudyOfferData.distributionKey == "Avec enfant(s), sans conjoint") {
          let qualityValue = "";
          let pensionFrancValue = []
          if (this.ayantDroitDataListe.quality == "Ascendant (e)") {
            qualityValue = "ascendants"
            this.cléDePartage = this.sansConjoitAvecEnfant.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
            if (this.ayantDroitDataListe.sex == "Masculin") {
  
              pensionFrancValue = this.pere100.filter(
                (element) => element.age == this.ayantDroitDataListe.age
              );
  
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
  
              pensionFrancValue = this.mere100.filter(
                (element) => element.age == this.ayantDroitDataListe.age
              );
            }
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
            this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 75 / 100
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
            // let capitalize = 0
  
  
          }
          if (this.ayantDroitDataListe.quality == "Descendant (e)") {
            qualityValue = "enfants"
            this.cléDePartage = this.sansConjoitAvecEnfant.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
  
  
            if (this.ayantDroitDataListe.sex == "Masculin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.man25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.fille25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
  
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            if (this.ayantDroitDataListe.age < 25) {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 100 / 100
            } else {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 75 / 100
            }
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
            // let capitalize = 0
  
  
          }
          if (this.ayantDroitDataListe.quality == "Conjoint (e)") {
            qualityValue = "conjoints"
            this.cléDePartage = this.sansConjoitAvecEnfant.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
            if (this.ayantDroitDataListe.sex == "Masculin") {
  
              pensionFrancValue = this.pere100.filter(
                (element) => element.age == this.ayantDroitDataListe.age
              );
  
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
  
              pensionFrancValue = this.mere100.filter(
                (element) => element.age == this.ayantDroitDataListe.age
              );
            }
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
            this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 150 / 100
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
          }
          if (this.ayantDroitDataListe.quality == "Collatéral (le)") {
            this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 50 / 100
          }
          if (this.ayantDroitDataListe.quality == "Concubin (e)") {
            qualityValue = "enfants"
            this.cléDePartage = this.sansConjoitAvecEnfant.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
  
  
            if (this.ayantDroitDataListe.sex == "Masculin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.man25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.fille25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
  
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            if (this.ayantDroitDataListe.age < 25) {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 100 / 100
            } else {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 75 / 100
            }
  
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
            // let capitalize = 0
          }
          if (this.ayantDroitDataListe.quality == "Orphelin double") {
            qualityValue = "orphelins"
            this.cléDePartage = this.sansConjoitAvecEnfant.filter(
              (element) => element.type == qualityValue
            );
            this.rentValue = this.cléDePartage[0].pourcent
            let AscendantNumber = 1
            this.ayantDroitDataListe.capitalize = ((this.deathStudyOfferData.annualIncome * this.rentValue) / 100) / AscendantNumber
  
  
            if (this.ayantDroitDataListe.sex == "Masculin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.man25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
            if (this.ayantDroitDataListe.sex == "Féminin") {
              if (this.ayantDroitDataListe.age <= 25) {
                pensionFrancValue = this.fille25.filter(
                  (element) => element.age == this.ayantDroitDataListe.age
                );
              }
            }
  
            // alert(pensionFrancValue)
            this.ayantDroitDataListe.pensionFranc = pensionFrancValue[0].franc
            if (this.ayantDroitDataListe.age < 25) {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 100 / 100
            } else {
              this.ayantDroitDataListe.economicDamage = Number(this.ayantDroitDataListe.capitalize) * this.ayantDroitDataListe.pensionFranc
              this.ayantDroitDataListe.moralDamage = Number(this.deathStudyOfferData.annualSMIG) * 75 / 100
            }
  
            this.ayantDroitDataListe.compensationDue = Number(this.ayantDroitDataListe.economicDamage) + Number(this.ayantDroitDataListe.moralDamage)
            this.ayantDroitDataListe.share = (Number(this.ayantDroitDataListe.compensationDue) * Number(this.deathStudyOfferData.sharingRate)) / 100
          }
        }
      },
      async addAyantDroitFormModal() {
        this.loading = true;
        try {
          if(this.ayantDroitDataListe.quality == 'Descendant (e)'){
            this.ayantDroitDataListe.isOrphanDouble =  this.ayantDroitDataListe.isOrphanDouble == "Oui" ? true : false
            }else{
              this.ayantDroitDataListe.isOrphanDouble = false
            }
          const schema = {
            // capitalizeRevenue: this.ayantDroitDataListe.capitalize,
            deathStudy: this.matérialSelectedId,
            fullName: this.ayantDroitDataListe.fullName,
            quality: this.ayantDroitDataListe.quality,
            age: this.ayantDroitDataListe.age,
            sex: this.ayantDroitDataListe.sex,
            isOrphanDouble:  this.ayantDroitDataListe.isOrphanDouble
            // pensionFranc: this.ayantDroitDataListe.pensionFranc,
            // economicDamage: this.ayantDroitDataListe.economicDamage,
            // moralDamage: this.ayantDroitDataListe.moralDamage,
            // compensationDue: this.ayantDroitDataListe.compensationDue,
            // share: this.ayantDroitDataListe.share
          };
          // alert(schema.isOrphanDouble)
          if (this.ayantDroitDataListe.degatID) {
            await updateAyantDroit({
              schema,
              id: this.ayantDroitDataListe.degatID,
            });
            defaultMethods.dispatchSuccess(
              this.$store,
              messages.updatedSuccessfully("Dossier")
            );
          } else {
            await addAyantDroit({ schema });
            defaultMethods.dispatchSuccess(
              this.$store,
              messages.createdSuccessfully("Dossier")
            );
          }
          //await this.getayantDroitStudyOffer({ id: this.matérialSelectedId })
           
          // if (this.deathStudyOfferData.distributionKey == "Avec enfant(s), sans conjoint") {
          //   this.cléDePartage = this.sansConjoitAvecEnfant.filter(
          //     (element) => element.type == this.ayantDroitDataListe.quality
          //   );
          //   this.rentValue = this.cléDePartage[0].pourcent
          // }
          // let numberOfMan =0
  
          // this.closeMail();
          // this.initialize();
        } catch (error) {
          defaultMethods.dispatchError(this.$store);
        }
        this.reloadStudyDead()
        this.loading = false;
        this.addFileMoreDead = false;
        this.addFileExcel = false;
        this.dialog = false;
        this.dialogDelete = false;
        //this.initFiles();
      },
      async addPvFormModal() {
        this.loading = true;
        try {
          let idBeneficiaireSelect = "";
          if (this.adnewObject.beneficiaryType === "Expert") {
            idBeneficiaireSelect = defaultMethods.getItemId(
              this.expertListe,
              this.adnewObject.beneficiaryName
            );
          } else if (this.adnewObject.beneficiaryType == "Victime") {
            idBeneficiaireSelect = defaultMethods.getItemId(
              this.victimeList,
              this.adnewObject.beneficiaryName
            );
          } else {
            idBeneficiaireSelect = "";
          }
  
          const schema = {
            // policeStation: defaultMethods.getItemId(
            //   this.Commissariat,
            //   this.adnewObject.policeStation
            // ),
            sinisterVictim: this.adnewObject.sinsterVictimeID,
            beneficiaryId: idBeneficiaireSelect,
            beneficiaryType: this.adnewObject.beneficiaryType,
            beneficiaryName: this.adnewObject.beneficiaryName,
            beneficiaryContact: this.adnewObject.beneficiaryContact,
            settlementAmount: this.adnewObject.settlementAmount,
            offerDate: this.adnewObject.offerDate,
            // ureDate,
            financialServiceSendDate: this.adnewObject.financialServiceSendDate,
            financialServiceWithdrawalDate: this.adnewObject
              .financialServiceWithdrawalDate,
            receptionServiceSendDate: this.adnewObject.receptionServiceSendDate,
            checkNumber: this.adnewObject.checkNumber,
            bank: defaultMethods.getItemId(this.bank, this.adnewObject.Bank),
            checkDate: this.adnewObject.checkDate,
            observation: this.adnewObject.observation,
            status: this.adnewObject.status,
            documentReceptionDate: this.adnewObject.documentReceptionDate,
          };
  
          if (this.adnewObject.offrerID) {
            await updateEtudeOffre({
              schema,
              id: this.adnewObject.offrerID,
            });
            await this.addVictimesFileFormModal(this.adnewObject);
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
  