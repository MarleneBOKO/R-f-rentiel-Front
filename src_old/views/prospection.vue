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
          <v-card style="border-left: 10px solid #061A40">
            <v-card-title>
              <span class="text-h5 mb-5 mt-5" style="color:#061A40;"
                >Modification du médécin</span
              >
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Nom victime"
                    color="#061A40"
                    v-model="adnewObject.victimName"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Age victime"
                    v-model="adnewObject.victimAge"
                    color="#061A40"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Contacts victime"
                    color="#061A40"
                    filled
                    v-model="adnewObject.contact"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Nationalité"
                    color="#061A40"
                    filled
                    v-model="adnewObject.victimNationality"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Situation socio-pro"
                    color="#061A40"
                    v-model="adnewObject.professionalSocialSituation"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="N° pièce"
                    color="#061A40"
                    v-model="adnewObject.victimCNIPasseport"
                    filled
                  ></v-text-field>
                </v-col>
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
                    label="Date consolidation"
                    color="#061A40"
                    type="date"
                    v-model="adnewObject.consolidationDate"
                    filled
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="12">
                  <span class="text-h5 mb-5 mt-5" style="color:#061A40;"
                    >Pièces communiquées</span
                  >
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Date certificat médical initial"
                    color="#061A40"
                    type="date"
                    v-model="adnewObject.initialMedicalCertificateDate"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Etabli par le docteur"
                    v-model="adnewObject.initialCertificateDoctorName"
                    color="#061A40"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Date certificat médical de guérison / consolidation"
                    color="#061A40"
                    filled
                    type="date"
                    v-model="adnewObject.healingCertificateDate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Etabli par le docteur"
                    color="#061A40"
                    filled
                    v-model="adnewObject.healingCertificateDoctorName"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Numéro procès verbal"
                    color="#061A40"
                    v-model="adnewObject.verbalProcessNumber"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Etabli par"
                    color="#061A40"
                    v-model="adnewObject.PVResponsableName"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <span class="text-h5 mb-5 mt-5" style="color:#061A40;"
                    >Circonstance de l'accident</span
                  >
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Circonstance"
                    v-model="adnewObject.circumstance"
                    color="#061A40"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Date de l'accident"
                    color="#061A40"
                    filled
                    v-model="adnewObject.sinisterDate"
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
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Centre d'admission"
                    color="#061A40"
                    v-model="adnewObject.admissionPlace"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Lésions initiales"
                    color="#061A40"
                    v-model="adnewObject.initialLesion"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    label="Conclusion des lésions"
                    color="#061A40"
                    v-model="adnewObject.totalLesion"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <span class="text-h5 mb-5 mt-5" style="color:#061A40;"
                    >Traitement et évolution des lésions</span
                  >
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Date début hospitalisation"
                    type="date"
                    v-model="adnewObject.hospitalizationStartDate"
                    color="#061A40"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Date fin hospitalisation"
                    color="#061A40"
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
                    color="#061A40"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Bilan"
                    v-model="adnewObject.balanceSheet"
                    color="#061A40"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <span class="text-h5 mb-5 mt-5" style="color:#061A40;"
                    >Examen de la victime</span
                  >
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Etat antérieur"
                    color="#061A40"
                    filled
                    v-model="adnewObject.previousState"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Etat actuel"
                    color="#061A40"
                    filled
                    v-model="adnewObject.currentState"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                    label="Poids"
                    color="#061A40"
                    filled
                    v-model="adnewObject.victimWeight"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                    label="Tailles"
                    color="#061A40"
                    filled
                    v-model="adnewObject.victimHeight"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                    label="Mensurations"
                    color="#061A40"
                    filled
                    v-model="adnewObject.victimMeasurement"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Bilan des séquelles"
                    color="#061A40"
                    filled
                    v-model="adnewObject.sequelReport"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Doléance"
                    color="#061A40"
                    filled
                    v-model="adnewObject.grievance"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Discussion"
                    color="#061A40"
                    filled
                    v-model="adnewObject.discussion"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Nombre de jours"
                    color="#061A40"
                    filled
                    v-model="adnewObject.numberOfDay"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <span class="text-h5 mb-5 mt-5" style="color:#061A40;"
                    >Evaluation des préjudices subis</span
                  >
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Taux IP"
                    color="#061A40"
                    filled
                    v-model="adnewObject.IPRate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Taux prétium doloris"
                    color="#061A40"
                    filled
                    v-model="adnewObject.painPretiumRate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Taux préjudice esthétique"
                    color="#061A40"
                    filled
                    v-model="adnewObject.estheticDamageRate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Frais futurs"
                    color="#061A40"
                    filled
                    v-model="adnewObject.futureSpawn"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <span class="text-h5 mb-5 mt-5" style="color:#061A40;"
                    >Conclusions</span
                  >
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Nombre de jours"
                    color="#061A40"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    v-model="adnewObject.numberOfDay"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Taux IP"
                    color="#061A40"
                    v-model="adnewObject.IPRate"
                    filled
                    disabled
                    background-color="#4DD0E1"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Taux prétium doloris"
                    color="#061A40"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    v-model="adnewObject.painPretiumRate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Taux préjudice esthétique"
                    color="#061A40"
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
        <v-dialog v-model="addFileConsultation" max-width="1000px">
          <v-card style="border-left: 10px solid #061A40">
            <v-card-title>
              <span class="text-h5 mb-5 mt-5" style="color:#061A40;"
                >Modification du médécin</span
              >
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Nom victime"
                    color="#061A40"
                    v-model="adnewObject.victimName"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Age victime"
                    v-model="adnewObject.victimAge"
                    color="#061A40"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Contacts victime"
                    color="#061A40"
                    filled
                    v-model="adnewObject.contact"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Nationalité"
                    color="#061A40"
                    filled
                    v-model="adnewObject.victimNationality"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Situation socio-pro"
                    color="#061A40"
                    v-model="adnewObject.professionalSocialSituation"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="N° pièce"
                    color="#061A40"
                    v-model="adnewObject.victimCNIPasseport"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    :items="StatusIiems"
                    filled
                    label="Statut"
                    color="#061A40"
                    v-model="adnewObject.status"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Lieu sinistre"
                    color="#061A40"
                    v-model="adnewObject.customerName"
                    filled
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="12">
                  <span class="text-h5 mb-5 mt-5" style="color:#061A40;"
                    >Consultation</span
                  >
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-textarea
                    label="Observations faites sur le dossier"
                    color="#061A40"
                    v-model="adnewObject.observationOnTheFile"
                    filled
                    rows="3"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-textarea
                    label="Observations faites sur la victime"
                    v-model="adnewObject.observationOnTheVictim"
                    color="#061A40"
                    filled
                    rows="3"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-textarea
                    label="Avis du médecin expert - contrôle médicale"
                    color="#061A40"
                    filled
                    rows="3"
                    v-model="adnewObject.expertNoticeMedicalControl"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-textarea
                    rows="3"
                    label="Conclusion"
                    color="#061A40"
                    filled
                    v-model="adnewObject.consultationConclusion"
                  ></v-textarea>
                </v-col>

                <v-col cols="12" sm="6" md="12">
                  <v-textarea
                    label="Recommandation"
                    rows="3"
                    color="#061A40"
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
              <v-btn
                color="success darken-1"
                :loading="loading ? '#061a40' : null"
                @click="addFileFormModal()"
              >
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
          :items="Files"
          :page.sync="page"
          :items-per-page="20"
          hide-default-footer
          :loading="loading ? '#061a40' : null"
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
                          <v-icon
                            size="20"
                            color="grey darken-4"
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
              <v-toolbar-title>Listing des dossiers médicaux</v-toolbar-title>
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
  name: "prospectionComponent",

  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: false,
    addFileExcel: false,
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
      "getDownloadMedicalExpertiseReport",
      "getDownloadMedicalConsultationRequest",
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
      // alert(item.status);
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
        this.addFile = true;
      }
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

    async addFileFormModal() {
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
          customerName: this.adnewObject.customerName,
          sinisterNumber: this.adnewObject.sinisterNumber,
          status: this.adnewObject.status,
          victimCNIPasseport: this.adnewObject.victimCNIPasseport,
          victimName: this.adnewObject.victimName,
          victimAge: this.adnewObject.victimAge,
          contact: this.adnewObject.contact,
          civility: this.adnewObject.civility,
          address: this.adnewObject.address,
          victimNationality: this.adnewObject.victimNationality,
          professionalSocialSituation: this.adnewObject
            .professionalSocialSituation,
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
          sinisterDate: this.adnewObject.sinisterDate,
          sinisterPlace: this.adnewObject.sinisterPlace,
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
      this.addFileConsultation = false;
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
