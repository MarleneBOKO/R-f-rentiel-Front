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
        style="border: 1px solid #3A1C71;margin-bottom:10px"
      >
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
    <v-row class="  ml-4 mb-4 mt-5" justify="start">
      <h4 class="text-h4 pageTitle ">
        Listing des dossiers en expertise amiable
      </h4>
    </v-row>
    <template>
      <v-row justify="center">
        <v-dialog v-model="addFileDoc" max-width="1000px">
          <v-card style="border-left: 10px solid #3A1C71">
            <v-card-title>
              <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;"
                >Modification du médécin</span
              >
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Nom victime"
                    color="#3A1C71"
                    v-model="adnewObject.victimName"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Age victime"
                    v-model="adnewObject.victimAge"
                    color="#3A1C71"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Contacts victime"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.contact"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Nationalité"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.victimNationality"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Situation socio-pro"
                    color="#3A1C71"
                    v-model="adnewObject.professionalSocialSituation"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="N° pièce"
                    color="#3A1C71"
                    v-model="adnewObject.victimCNIPasseport"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-select
                    :items="StatusIiems"
                    filled
                    label="Statut"
                    color="#3A1C71"
                    v-model="adnewObject.status"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Date consolidation"
                    color="#3A1C71"
                    type="date"
                    v-model="adnewObject.consolidationDate"
                    filled
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="12">
                  <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;"
                    >Pièces communiquées</span
                  >
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Date certificat médical initial"
                    color="#3A1C71"
                    type="date"
                    v-model="adnewObject.initialMedicalCertificateDate"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Etabli par le docteur"
                    v-model="adnewObject.initialCertificateDoctorName"
                    color="#3A1C71"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Date certificat médical de guérison / consolidation"
                    color="#3A1C71"
                    filled
                    type="date"
                    v-model="adnewObject.healingCertificateDate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Etabli par le docteur"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.healingCertificateDoctorName"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Numéro procès verbal"
                    color="#3A1C71"
                    v-model="adnewObject.verbalProcessNumber"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Etabli par"
                    color="#3A1C71"
                    v-model="adnewObject.PVResponsableName"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;"
                    >Circonstance de l'accident</span
                  >
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Circonstance"
                    v-model="adnewObject.circumstance"
                    color="#3A1C71"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Date de l'accident"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.sinisterDate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Lieu sinistre"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.sinisterPlace"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Centre d'admission"
                    color="#3A1C71"
                    v-model="adnewObject.admissionPlace"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Lésions initiales"
                    color="#3A1C71"
                    v-model="adnewObject.initialLesion"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    label="Conclusion des lésions"
                    color="#3A1C71"
                    v-model="adnewObject.totalLesion"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;"
                    >Traitement et évolution des lésions</span
                  >
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Date début hospitalisation"
                    type="date"
                    v-model="adnewObject.hospitalizationStartDate"
                    color="#3A1C71"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Date fin hospitalisation"
                    color="#3A1C71"
                    filled
                    type="date"
                    v-model="adnewObject.hospitalizationEndDate"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Traitement"
                    v-model="adnewObject.treatment"
                    filled
                    color="#3A1C71"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Bilan"
                    v-model="adnewObject.balanceSheet"
                    color="#3A1C71"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;"
                    >Examen de la victime</span
                  >
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Etat antérieur"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.previousState"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Etat actuel"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.currentState"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                    label="Poids"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.victimWeight"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                    label="Tailles"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.victimHeight"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                    label="Mensurations"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.victimMeasurement"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Bilan des séquelles"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.sequelReport"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Doléance"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.grievance"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Discussion"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.discussion"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Nombre de jours"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.numberOfDay"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;"
                    >Evaluation des préjudices subis</span
                  >
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Taux IP"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.IPRate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Taux prétium doloris"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.painPretiumRate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Taux préjudice esthétique"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.estheticDamageRate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Frais futurs"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.futureSpawn"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;"
                    >Conclusions</span
                  >
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Nombre de jours"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    v-model="adnewObject.numberOfDay"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Taux IP"
                    color="#3A1C71"
                    v-model="adnewObject.IPRate"
                    filled
                    disabled
                    background-color="#4DD0E1"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Taux prétium doloris"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    v-model="adnewObject.painPretiumRate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Taux préjudice esthétique"
                    color="#3A1C71"
                    v-model="adnewObject.estheticDamageRate"
                    filled
                    disabled
                    background-color="#4DD0E1"
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
              <v-btn color="success darken-1" @click="addFileFormModalDoc()">
                Enregistrer les modifications
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <template>
      <v-row justify="center">
        <v-dialog v-model="addFileConsultation" max-width="1000px">
          <v-card style="border-left: 10px solid #3A1C71">
            <v-card-title>
              <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;"
                >Modification du médécin</span
              >
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Nom victime"
                    color="#3A1C71"
                    v-model="adnewObject.victimName"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Age victime"
                    v-model="adnewObject.victimAge"
                    color="#3A1C71"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Contacts victime"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.contact"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Nationalité"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.victimNationality"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Situation socio-pro"
                    color="#3A1C71"
                    v-model="adnewObject.professionalSocialSituation"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="N° pièce"
                    color="#3A1C71"
                    v-model="adnewObject.victimCNIPasseport"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    :items="StatusIiems"
                    filled
                    label="Statut"
                    color="#3A1C71"
                    v-model="adnewObject.status"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Lieu sinistre"
                    color="#3A1C71"
                    v-model="adnewObject.customerName"
                    filled
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="12">
                  <span class="text-h5 mb-5 mt-5" style="color:#3A1C71;"
                    >Consultation</span
                  >
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-textarea
                    label="Observations faites sur le dossier"
                    color="#3A1C71"
                    v-model="adnewObject.observationOnTheFile"
                    filled
                    rows="3"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-textarea
                    label="Observations faites sur la victime"
                    v-model="adnewObject.observationOnTheVictim"
                    color="#3A1C71"
                    filled
                    rows="3"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-textarea
                    label="Avis du médecin expert - contrôle médicale"
                    color="#3A1C71"
                    filled
                    rows="3"
                    v-model="adnewObject.expertNoticeMedicalControl"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-textarea
                    rows="3"
                    label="Conclusion"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.consultationConclusion"
                  ></v-textarea>
                </v-col>

                <v-col cols="12" sm="6" md="12">
                  <v-textarea
                    label="Recommandation"
                    rows="3"
                    color="#3A1C71"
                    v-model="adnewObject.consultationRecommendation"
                    filled
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="error darken-1"
                class="mr-5"
                @click="addFileConsultation = false"
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
      <v-row justify="center">
        <v-dialog v-model="offreMomo" max-width="500">
          <v-card>
            <v-card-text
              style="
    background:#3A1C71;
    background: -webkit-linear-gradient(to right, #4DD0E1, #3A1C71);
    background: linear-gradient(to right, #4DD0E1, #3A1C71);
  "
            >
              <div class="white--text text-h6 pb-5 pt-5">
                Choisir le type d'offre
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                class="mt-10 mb-5 mr-2"
                color="#4DD0E1"
                plain
                outlined
                @click="manageDocRecap()"
              >
                Offre directe
              </v-btn>

              <v-btn
                class="mt-10 mb-5 ml-2"
                color="#3A1C71"
                outlined
                @click="manageDocRecapMomo()"
              >
                Par mobile money ou moov money.
              </v-btn>
            </v-card-actions>
          </v-card>
          <!-- <v-sheet
            class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"

            dark
          >



          </v-sheet> -->
        </v-dialog>
      </v-row>
    </template>
    <template>
      <v-row justify="center">
        <v-dialog v-model="addFile" max-width="1000px">
          <v-card style="border-left: 10px solid #3A1C71">
            <v-card-title>
              <span class="text-h5 mb-5 mt-5" style="color: #3A1C71"
                >Modification du gestionnaire</span
              >
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Numéro sinistre"
                    color="#3A1C71"
                    v-model="adnewObject.sinisterNumber"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Date sinistre"
                    type="date"
                    v-model="adnewObject.sinisterDate"
                    color="#3A1C71"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Lieu sinistre"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.sinisterPlace"
                  ></v-text-field>
                </v-col>
                <!-- <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Numéro référence"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.reference"
                  ></v-text-field>
                </v-col> -->
                <v-col cols="12" sm="6" md="6">
                  <v-select
                    :items="StatusIiems"
                    filled
                    label="Statut"
                    color="#3A1C71"
                    v-model="adnewObject.status"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Nom Assuré"
                    color="#3A1C71"
                    v-model="adnewObject.customerName"
                    filled
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Nom victime"
                    color="#3A1C71"
                    v-model="adnewObject.victimName"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Age victime"
                    color="#3A1C71"
                    @change="valueChange()"
                    v-model="adnewObject.victimAge"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Contact victime"
                    v-model="adnewObject.contact"
                    color="#3A1C71"
                    filled
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
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Adresse"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.address"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Situatuion socioprofessionelle"
                    color="#3A1C71"
                    v-model="adnewObject.professionalSocialSituation"
                    filled
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                    label="Date demande courrier"
                    color="#3A1C71"
                    type="date"
                    v-model="adnewObject.mailRequestDate"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                    label="Date appel"
                    color="#3A1C71"
                    type="date"
                    v-model="adnewObject.callDate"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-autocomplete
                    :items="demandeurDexpertise"
                    v-model="adnewObject.requesterExpertiseName"
                    color="#3A1C71"
                    filled
                    clearable
                    deletable-chips
                    label="Demandeur d'expertise"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Nombre de jour ITT"
                    color="#3A1C71"
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
                    color="#3A1C71"
                    type="number"
                    filled
                    disabled
                    background-color="#4DD0E1"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="FMP"
                    color="#3A1C71"
                    type="number"
                    filled
                    @change="valueChange()"
                    v-model="adnewObject.fmp"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Taux prétium doloris"
                    color="#3A1C71"
                    disabled
                    background-color="#4DD0E1"
                    filled
                    v-model="adnewObject.painPretiumRate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Taux préjudice esthétique"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    v-model="adnewObject.estheticDamageRate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Frais futurs"
                    color="#3A1C71"
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
                    color="#3A1C71"
                    type="number"
                    @change="valueChange()"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="PSAP"
                    color="#3A1C71"
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
                    color="#3A1C71"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Provision"
                    v-model="adnewObject.provision"
                    color="#3A1C71"
                    filled
                    type="number"
                    @change="valueChange()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Taux de partage"
                    color="#3A1C71"
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
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.observationOnTheVictim"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <span class="text-h5 mb-5 mt-5" style="color: #3A1C71"
                    >Résultat des calculs</span
                  >
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Montant ITT"
                    color="#3A1C71"
                    filled
                    type="number"
                    @change="valueChange()"
                    v-model="adnewObject.ITTAmount"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Valeur Point"
                    color="#3A1C71"
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
                    color="#3A1C71"
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
                    color="#3A1C71"
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
                    color="#3A1C71"
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
                    color="#3A1C71"
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
                    color="#3A1C71"
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
                    color="#3A1C71"
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
                    color="#3A1C71"
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
                    color="#3A1C71"
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
                    color="#3A1C71"
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
      <div>
        <v-data-table
          :headers="headers"
          :items="IndemnityFiles"
          :page.sync="page"
          :items-per-page="20"
          hide-default-footer
          :class="{ background: $vuetify.theme.themes.dark.background }"
          @page-count="pageCount = $event"
        >
          <template v-slot:item="{ item }">
            <tr @click="handleClick(item)" class="green-bg">
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
                    <v-tooltip bottom color="#a30b37">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="ml-3" icon>
                          <v-icon
                            size="20"
                            @click="handleClick(item)"
                            v-bind="attrs"
                            v-on="on"
                            color="#a30b37"
                            >mdi-file-edit-outline</v-icon
                          >
                        </v-btn>
                      </template>
                      <span>Modification du gestionnaire</span>
                    </v-tooltip>
                    <v-tooltip bottom color="#218380">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="ml-3" icon>
                          <v-icon
                            size="20"
                            @click="handleClickDoc(item)"
                            v-bind="attrs"
                            v-on="on"
                            color="#218380"
                            >mdi-hospital-box-outline</v-icon
                          >
                        </v-btn>
                      </template>
                      <span>Modification du médécin</span>
                    </v-tooltip>
                    <v-tooltip bottom color="#3A1C71">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="ml-3" icon>
                          <v-icon
                            size="20"
                            @click="openOffreChoice(item)"
                            color="#3A1C71"
                            v-bind="attrs"
                            v-on="on"
                            >mdi-google-spreadsheet</v-icon
                          >
                        </v-btn>
                      </template>
                      <span>Proposition d'offre </span>
                    </v-tooltip>
                    <v-tooltip bottom color="#ff8600">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="ml-3" icon>
                          <v-icon
                            size="20"
                            color="#ff8600"
                            v-bind="attrs"
                            v-on="on"
                            @click="medicalRequest(item)"
                            >mdi-medical-bag</v-icon
                          >
                        </v-btn>
                      </template>
                      <span>Demande d'expertise médicale directe</span>
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
                    <v-tooltip bottom color="#690375">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="ml-3" icon>
                          <v-icon
                            size="20"
                            color="#690375"
                            v-bind="attrs"
                            v-on="on"
                            @click="medicalconsultation(item)"
                            >mdi-google-spreadsheet</v-icon
                          >
                        </v-btn>
                      </template>
                      <span>{{
                        item.status == "Consultation"
                          ? "Fiche de consultation "
                          : "Rapport d'expertise médical"
                      }}</span>
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
              <td>
                <v-chip color="red" dark>
                  {{ item.status }}
                </v-chip>
              </td>
              <td>{{ item.sinister.sinisterNumber }}</td>
              <td>{{ item.reference }}</td>

              <td>{{ item.sinister.name }}</td>
              <td>{{ item.sinister.sinisterDate }}</td>
              <td>{{ item.sinisterVictim.fullName }}</td>
              <td>{{ item.sinisterVictim.phone }}</td>
              <td>{{ item.sinisterVictim.civility }}</td>
              <td>{{ item.sinister.sinisterPlace }}</td>
              <td>{{ item.sinisterVictim.address }}</td>
              <td>{{ item.sinisterVictim.socioProfessionalSituation }}</td>
            </tr>
          </template>
          <template v-slot:top>
            <v-toolbar flat>
              <!-- <v-btn
                class="mr-2 btnDesign"
               
                :disabled ="loading"
                color="#3A1C71"
                text-color="white"
                pill
                @click="addNewVictime()"
              >
                Ajouter un dossier
                <v-icon class="ml-2" left> mdi-plus-box-multiple </v-icon>
              </v-btn>
              <v-btn
                class="mr-2 btnDesign"
               
                :disabled ="loading"
                color="#3A1C71"
                outlined
                pill
                text-color="white"
                @click="addFileExcel = true"
              >
                Charger depuis un fichier
                <v-icon class="ml-2" left> mdi-microsoft-excel </v-icon>
              </v-btn> -->

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
                      color="#3A1C71"
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
          </template></v-data-table
        >
      </div>
    </template>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { defaultMethods, messages } from "../utils/data";
import {
  addFileJson,
  addFileForm,
  updateFileForm,
  updateFileFormIndemnity,
  updateVictimeFileForm,
} from "@/api/user.js";
//import XLSX from "xlsx";
export default {
  name:'indemnityComponent',

  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: false,
    addFileExcel: false,
    offreMomo: false,
    addFile: false,
    addFileConsultation: false,
    page: 1,
    pages: 1,
    excelFile: null,
    adnewObject: {},
    resultFinal: [],
    result: [],
    startItem: "",
    lastData: [],
    pageCount: 0,
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
    civiliteIiems: ["Monsieur", "Madame"],
    pageCounts: 0,
    itemsPerPage: 10,
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
        text: "Nom de l'assuré",
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
    ...mapGetters(["IndemnityFiles", "UserProfile", "statFile", "FilesManage"]),
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
      "getIndemnityFiles",
      "getUserProfile",
      "getDownloadManageRecap",
      "getDownloadManageRecapMomo",
      "getDownloadMedicalExpertiseReport",
      "getDownloadMedicalExpertiseRequest",
      "getDownloadMedicalConsultationRequest",
    ]),
    async initFiles() {
      this.loading = true;
      try {
        await this.getIndemnityFiles({
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
        reader.onload = () => {
          /* Parse data */
          //const bstr = e.target.result;
         // const wb = 'XLSX.read(bstr, { type: "binary" })';
          /* Get first worksheet */
         // const wsname = wb.SheetNames[0];
          //const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = 'XLSX.utils.sheet_to_json(ws, { header: 1 })';

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
      // alert(JSON.stringify(item));
      this.adnewObject._id = item._id;
      this.adnewObject.sinisterID = item.sinister._id;
      this.adnewObject.sinisterVictimeID = item.sinisterVictim._id;
      this.adnewObject.sinisterNumber = item.sinister.sinisterNumber;
      this.adnewObject.sinisterDate = item.sinister.sinisterDate;
      this.adnewObject.sinisterPlace = item.sinister.sinisterPlace;
      this.adnewObject.status = item.status;
      this.adnewObject.customerName = item.sinister.name;
      this.adnewObject.victimName = item.sinisterVictim.fullName;
      this.adnewObject.victimAge = item.sinisterVictim.age;
      this.adnewObject.contact = item.sinisterVictim.phone;
      this.adnewObject.civility = item.sinisterVictim.civility;
      this.adnewObject.address = item.sinisterVictim.locality;
      this.adnewObject.professionalSocialSituation =
        item.sinisterVictim.socioProfessionalSituation;
      this.adnewObject.mailRequestDate = item.mailRequestDate;
      this.adnewObject.callDate = item.callDate;
      this.adnewObject.requesterExpertiseName = item.requesterExpertiseName;
      this.adnewObject.numberOfDay = item.numberOfDay;
      this.adnewObject.IPRate = item.IPRate;
      this.adnewObject.fmp = item.fmp;
      this.adnewObject.painPretiumRate = item.painPretiumRate;
      this.adnewObject.estheticDamageRate = item.estheticDamageRate;
      this.adnewObject.futureSpawn = item.futureSpawn;
      this.adnewObject.minimumWage = item.minimumWage;
      this.adnewObject.PSAP = item.PSAP;
      this.adnewObject.materialDamage = item.materialDamage;
      this.adnewObject.provision = item.provision;
      this.adnewObject.liabilityRate = item.liabilityRate;
      this.adnewObject.observationOnTheVictim = item.observationOnTheVictim;
      this.adnewObject.ITTAmount = item.ITTAmount;
      this.adnewObject.pointValue = item.pointValue;
      this.adnewObject.IPAmount = item.IPAmount;
      this.adnewObject.estheticDamageAmount = item.estheticDamageAmount;
      this.adnewObject.pretiumAmount = item.pretiumAmount;
      this.adnewObject.totalBody = item.totalBody;
      this.adnewObject.bodyIndermnity = item.bodyIndermnity;
      this.adnewObject.materialIndermnity = item.materialIndermnity;
      this.adnewObject.totalDamage = item.totalDamage;
      this.adnewObject.damageAfterSharing = item.damageAfterSharing;
      this.adnewObject.indermnityToBeReceived = item.indermnityToBeReceived;
      this.valueChange();
      this.calculatePointValue();
      this.addFile = true;
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
      //adnewObject.damageAfterSharing
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
        (this.adnewObject.totalDamage * this.adnewObject.liabilityRate) / 100
      );

      if (this.adnewObject.damageAfterSharing < 100000) {
        this.adnewObject.indermnityToBeReceived = 100000;
      } else {
        this.adnewObject.indermnityToBeReceived =
          this.adnewObject.damageAfterSharing -
          Number(this.adnewObject.provision);
      }
    },
    async updateFile() {
      this.loading = true;
      // alert(JSON.stringify());
      try {
        const schema = {
          sinisterNumber: this.adnewObject.sinisterNumber,
          sinisterDate: this.adnewObject.sinisterDate,
          sinisterPlace: this.adnewObject.sinisterPlace,
          name: this.adnewObject.customerName,
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
          sinister: this.adnewObject.sinisterID,
          fullName: this.adnewObject.victimName,
          age: this.adnewObject.victimAge,
          phone: this.adnewObject.contact,
          civility: this.adnewObject.civility,
          locality: this.adnewObject.address,
          victimCNIPasseport: this.adnewObject.victimCNIPasseport,
          nationality: this.adnewObject.victimNationality,
          socioProfessionalSituation: this.adnewObject
            .professionalSocialSituation,
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
    openOffreChoice(item) {
      this.offreMomo = true;
      this.offreChoice = item;
    },
    async addFileFormModal() {
      this.loading = true;
      try {
        const schema = {
          liabilityRate: this.adnewObject.liabilityRate,
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
          await this.updateFile();
          await this.updateFileVictime();
          await updateFileFormIndemnity({
            schema,
            id: this.adnewObject._id,
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
    handleClickDoc(item) {
      // alert(item.status);
      // alert(JSON.stringify(item.sinister._id));
      if (item.status == "Consultation") {
        this.adnewObject = Object.assign({}, item);
        let elements = [];
        elements = this.adnewObject.initialLesion;
        this.adnewObject.initialLesion = elements.join(";");
        this.adnewObject.initialLesion += ";";
        elements = [];
        elements = this.adnewObject.grievance;
        this.adnewObject.grievance = elements.join(";");
        this.adnewObject.grievance += ";";
        elements = [];
        elements = this.adnewObject.sequelReport;
        this.adnewObject.sequelReport = elements.join(";");
        this.adnewObject.sequelReport += ";";
        this.addFileConsultation = true;
      } else {
        // alert(JSON.stringify(this.adnewObject.sinisterID));
        this.adnewObject = Object.assign({}, item);
        let elements = [];
        elements = this.adnewObject.initialLesion;
        this.adnewObject.initialLesion = elements.join(";");
        this.adnewObject.initialLesion += ";";
        elements = [];
        elements = this.adnewObject.grievance;
        this.adnewObject.grievance = elements.join(";");
        this.adnewObject.grievance += ";";
        elements = [];
        elements = this.adnewObject.sequelReport;
        this.adnewObject.sequelReport = elements.join(";");
        this.adnewObject.sequelReport += ";";
        this.addFileDoc = true;
      }
      this.adnewObject._id = item._id;
      this.adnewObject.sinisterID = item.sinister._id;
      this.adnewObject.sinisterVictimeID = item.sinisterVictim._id;

      this.adnewObject.sinisterNumber = item.sinister.sinisterNumber;
      this.adnewObject.sinisterDate = item.sinister.sinisterDate;
      this.adnewObject.sinisterPlace = item.sinister.sinisterPlace;
      this.adnewObject.status = item.status;
      this.adnewObject.customerName = item.sinister.name;
      this.adnewObject.victimName = item.sinisterVictim.fullName;
      this.adnewObject.victimAge = item.sinisterVictim.age;
      this.adnewObject.contact = item.sinisterVictim.phone;
      this.adnewObject.civility = item.sinisterVictim.civility;
      this.adnewObject.address = item.sinisterVictim.locality;
      this.adnewObject.victimNationality = item.sinisterVictim.nationality;
      this.adnewObject.victimCNIPasseport =
        item.sinisterVictim.victimCNIPasseport;
      this.adnewObject.consolidationDate = item.consolidationDate;
      this.adnewObject.initialMedicalCertificateDate =
        item.initialMedicalCertificateDate;
      this.adnewObject.initialCertificateDoctorName =
        item.initialCertificateDoctorName;
      this.adnewObject.healingCertificateDate = item.healingCertificateDate;
      this.adnewObject.healingCertificateDoctorName =
        item.healingCertificateDoctorName;
      this.adnewObject.verbalProcessNumber = item.sinister.policeNumber;
      this.adnewObject.PVResponsableName = item.PVResponsableName;
      this.adnewObject.circumstance = item.circumstance;
      this.adnewObject.admissionPlace = item.admissionPlace;
      this.adnewObject.initialLesion = item.initialLesion;
      this.adnewObject.totalLesion = item.totalLesion;
      this.adnewObject.hospitalizationStartDate = item.hospitalizationStartDate;
      this.adnewObject.hospitalizationEndDate = item.hospitalizationEndDate;
      this.adnewObject.treatment = item.treatment;
      this.adnewObject.balanceSheet = item.balanceSheet;
      this.adnewObject.previousState = item.previousState;
      this.adnewObject.currentState = item.currentState;
      this.adnewObject.victimWeight = item.victimWeight;
      this.adnewObject.victimHeight = item.victimHeight;
      this.adnewObject.victimMeasurement = item.victimMeasurement;
      this.adnewObject.sequelReport = item.sequelReport;
      this.adnewObject.grievance = item.grievance;
      this.adnewObject.discussion = item.discussion;
      this.adnewObject.professionalSocialSituation =
        item.sinisterVictim.socioProfessionalSituation;
      this.adnewObject.mailRequestDate = item.mailRequestDate;
      this.adnewObject.callDate = item.callDate;
      this.adnewObject.requesterExpertiseName = item.requesterExpertiseName;
      this.adnewObject.numberOfDay = item.numberOfDay;
      this.adnewObject.IPRate = item.IPRate;
      this.adnewObject.fmp = item.fmp;
      this.adnewObject.painPretiumRate = item.painPretiumRate;
      this.adnewObject.estheticDamageRate = item.estheticDamageRate;
      this.adnewObject.futureSpawn = item.futureSpawn;
      this.adnewObject.minimumWage = item.minimumWage;
      this.adnewObject.PSAP = item.PSAP;
      this.adnewObject.materialDamage = item.materialDamage;
      this.adnewObject.provision = item.provision;
      this.adnewObject.liabilityRate = item.liabilityRate;
      this.adnewObject.observationOnTheVictim = item.observationOnTheVictim;
      this.adnewObject.ITTAmount = item.ITTAmount;
      this.adnewObject.pointValue = item.pointValue;
      this.adnewObject.IPAmount = item.IPAmount;
      this.adnewObject.estheticDamageAmount = item.estheticDamageAmount;
      this.adnewObject.pretiumAmount = item.pretiumAmount;
      this.adnewObject.totalBody = item.totalBody;
      this.adnewObject.bodyIndermnity = item.bodyIndermnity;
      this.adnewObject.materialIndermnity = item.materialIndermnity;
      this.adnewObject.totalDamage = item.totalDamage;
      this.adnewObject.damageAfterSharing = item.damageAfterSharing;
      this.adnewObject.indermnityToBeReceived = item.indermnityToBeReceived;

      this.valueChange();

      this.calculatePointValue();
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
    async manageDocRecap() {
      this.loading = true;

      const idSelect = this.offreChoice._id;
      //   alert(idSelect);
      await this.getDownloadManageRecap({ id: idSelect });
      defaultMethods.dispatchSuccess(
        this.$store,
        messages.createdSuccessfully("data")
      );
      this.loading = false;
      this.initFiles();
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
    async medicalconsultation(item) {
      this.loading = true;

      if (item.status == "Consultation") {
        const idSelect = item._id;
        await this.getDownloadMedicalConsultationRequest({ id: idSelect });
        defaultMethods.dispatchSuccess(
          this.$store,
          messages.createdSuccessfully("data")
        );
        this.loading = false;
        this.initFiles();
      } else {
        const idSelect = item._id;
        await this.getDownloadMedicalExpertiseReport({ id: idSelect });
        defaultMethods.dispatchSuccess(
          this.$store,
          messages.createdSuccessfully("data")
        );
        this.loading = false;
        this.initFiles();
      }
    },
    convertSequelReportToArray(item) {
      const result = [];
      let word = "";
      const startItem = item;

      for (let a = 0; a < startItem.length; a++) {
        if (startItem[a] != ";") {
          word += startItem[a];
        }

        if (startItem[a] == ";") {
          result.push(word);
          word = "";
        }
      }
      this.adnewObject.sequelReport = result;
      // alert(JSON.stringify());
    },
    convertInitialLesionToArray(item) {
      const result = [];
      let word = "";
      this.resultFinal = [];
      const startItem = item;

      for (let a = 0; a < startItem.length; a++) {
        if (startItem[a] != ";") {
          word += startItem[a];
        }

        if (startItem[a] == ";") {
          result.push(word);
          word = "";
        }
      }
      this.adnewObject.initialLesion = result;
      // alert(JSON.stringify());
    },
    convertGrievanceToArray(item) {
      const result = [];
      let word = "";
      this.resultFinal = [];
      const startItem = item;

      for (let a = 0; a < startItem.length; a++) {
        if (startItem[a] != ";") {
          word += startItem[a];
        }

        if (startItem[a] == ";") {
          result.push(word);
          word = "";
        }
      }
      this.adnewObject.grievance = result;
      // alert(JSON.stringify());
    },

    async addFileFormModalDoc() {
      this.loading = true;

      //initiale lésion

      this.result = [];
      let word = "";
      this.startItem = this.adnewObject.initialLesion;

      for (let a = 0; a < this.startItem.length; a++) {
        if (this.startItem[a] != ";") {
          word += this.startItem[a];
        }

        if (this.startItem[a] == ";") {
          this.result.push(word);
          word = "";
        }
      }
      this.adnewObject.initialLesion = this.result;
      // alert(JSON.stringify(this.adnewObject.initialLesion));
      //doléance
      this.startItem = "";
      this.result = [];
      this.startItem = this.adnewObject.grievance;

      for (let a = 0; a < this.startItem.length; a++) {
        if (this.startItem[a] != ";") {
          word += this.startItem[a];
        }

        if (this.startItem[a] == ";") {
          this.result.push(word);
          word = "";
        }
      }
      this.adnewObject.grievance = this.result;
      // alert(JSON.stringify(this.adnewObject.grievance));

      // Bilan sequelle
      this.startItem = "";
      this.result = [];
      this.startItem = this.adnewObject.sequelReport;

      for (let a = 0; a < this.startItem.length; a++) {
        if (this.startItem[a] != ";") {
          word += this.startItem[a];
        }

        if (this.startItem[a] == ";") {
          this.result.push(word);
          word = "";
        }
      }
      this.adnewObject.sequelReport = this.result;

      // alert(JSON.stringify(this.adnewObject.sequelReport));

      this.startItem = "";
      this.result = [];
      try {
        const schema = {
          consultationRecommendation: this.adnewObject
            .consultationRecommendation,
          consultationConclusion: this.adnewObject.consultationConclusion,
          expertNoticeMedicalControl: this.adnewObject
            .expertNoticeMedicalControl,
          observationOnTheVictim: this.adnewObject.observationOnTheVictim,
          observationOnTheFile: this.adnewObject.observationOnTheFile,
          //   customerName: this.adnewObject.customerName,
          //   sinisterNumber: this.adnewObject.sinisterNumber,
          status: this.adnewObject.status,

          //   victimName: this.adnewObject.victimName,
          //   victimAge: this.adnewObject.victimAge,
          //   contact: this.adnewObject.contact,
          //   civility: this.adnewObject.civility,
          //   address: this.adnewObject.address,

          //   professionalSocialSituation: this.adnewObject
          //     .professionalSocialSituation,
          initialMedicalCertificateDate: this.adnewObject
            .initialMedicalCertificateDate,
          initialCertificateDoctorName: this.adnewObject
            .initialCertificateDoctorName,
          healingCertificateDate: this.adnewObject.healingCertificateDate,
          healingCertificateDoctorName: this.adnewObject
            .healingCertificateDoctorName,
          totalLesion: this.adnewObject.totalLesion,
          consolidationDate: this.adnewObject.consolidationDate,
          verbalProcessNumber: this.adnewObject.verbalProcessNumber,
          PVResponsableName: this.adnewObject.PVResponsableName,
          circumstance: this.adnewObject.circumstance,
          //   sinisterDate: this.adnewObject.sinisterDate,
          //   sinisterPlace: this.adnewObject.sinisterPlace,
          admissionPlace: this.adnewObject.admissionPlace,
          initialLesion: this.adnewObject.initialLesion,
          hospitalizationStartDate: this.adnewObject.hospitalizationStartDate,
          hospitalizationEndDate: this.adnewObject.hospitalizationEndDate,
          treatment: this.adnewObject.treatment,
          balanceSheet: this.adnewObject.balanceSheet,
          previousState: this.adnewObject.previousState,
          currentState: this.adnewObject.currentState,
          sequelReport: this.adnewObject.sequelReport,
          grievance: this.adnewObject.grievance,
          discussion: this.adnewObject.discussion,
          numberOfDay: this.adnewObject.numberOfDay,
          IPRate: this.adnewObject.IPRate,
          painPretiumRate: this.adnewObject.painPretiumRate,
          estheticDamageRate: this.adnewObject.estheticDamageRate,
          futureSpawn: this.adnewObject.futureSpawn,
          victimWeight: this.adnewObject.victimWeight,
          victimHeight: this.adnewObject.victimHeight,
          victimMeasurement: this.adnewObject.victimMeasurement,
          doctorExpertiseDate: Date.now(),
        };

        if (this.adnewObject._id) {
          // update
          await this.updateFile();
          await this.updateFileVictime();
          await updateFileFormIndemnity({
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
      this.addFileDoc = false;
      this.addFileExcel = false;
      this.addFileConsultation = false;
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
</style>
