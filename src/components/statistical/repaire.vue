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
        style="border: 1px solid #3a1c71; margin-bottom: 10px"
      >
        <v-expansion-panel class="elevation-0">
          <v-expansion-panel-header>
            Tri / Recherche ...
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="12" md="3">
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
              <v-col cols="12" md="3">
                <v-select
                  :items="garagisteNameList"
                  filled
                  prepend-inner-icon="mdi-magnify"
                  dense
                  class="pt-5 pa-2"
                  outlined
                  flat
                  rounded
                  label="Garagiste"
                  color="#3A1C71"
                  v-model="mechanic"
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
              <v-btn
                color="error"
                outlined
                pill
                rounded
                @click="getStatRecap()"
                target="_blank"
              >
                <v-icon size="30" class="ml-3 mr-3" color="error" left>
                  mdi-microsoft-excel
                </v-icon>
                Récap suivie réparation
              </v-btn>
            </v-card-actions>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
    <template>
      <v-row class="ml-4 mb-4 mt-5" justify="start">
        <h4 class="text-h4 pageTitle">Suivi réparation gestionnaire</h4>
      </v-row>
      <v-row justify="center">
        <v-dialog v-model="addFile" max-width="1000px">
          <v-card style="border-left: 10px solid #3a1c71">
            <v-card-title>
              <span class="text-h5 mb-5 mt-5" style="color: #3a1c71"
                >Information du dossier</span
              >
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Numéro sinistre"
                    color="#3A1C71"
                    disabled
                    background-color="#4DD0E1"
                    v-model="adnewObject.sinisterNumber"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Nom de l'Assuré"
                    v-model="adnewObject.name"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Nom de la victime"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    v-model="adnewObject.fullName"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Contact victime"
                    v-model="adnewObject.phone"
                    color="#3A1C71"
                    disabled
                    background-color="#4DD0E1"
                    filled
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    disabled
                    background-color="#4DD0E1"
                    label="Nom agent"
                    color="#3A1C71"
                    v-model="adnewObject.agentName"
                    filled
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-card-title class="ml-0 pl-0">
                <span class="text-h5 mb-5 ml-0 mt-5" style="color: #3a1c71"
                  >Gestion du dossier</span
                >
              </v-card-title>

              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    :items="garagisteNameList"
                    label="garagiste"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.mechanic"
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Date opération"
                    color="#3A1C71"
                    filled
                    type="date"
                    v-model="adnewObject.transactionDate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    label="Constat amiable"
                    :items="Decision"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.jointReport"
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Date réception"
                    color="#3A1C71"
                    filled
                    type="date"
                    v-model="adnewObject.receivedDate"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Date depot facture "
                    color="#3A1C71"
                    filled
                    type="date"
                    v-model="adnewObject.invoiceDepositDate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Delai paiement facture"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    v-model="adnewObject.invoicePaymentDeadline"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Date paiement facture"
                    color="#3A1C71"
                    filled
                    type="date"
                    v-model="adnewObject.invoicePaymentDate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Prime"
                    color="#3A1C71"
                    filled
                    type="number"
                    v-model="adnewObject.prime"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    label="Recours"
                    color="#3A1C71"
                    filled
                    :items="Decision"
                    v-model="adnewObject.appeal"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    label="vehicule de remplacement"
                    color="#3A1C71"
                    filled
                    :items="Decision"
                    v-model="adnewObject.replacementVehicle"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    label="Expert"
                    :items="enquetteurNameList"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.expert"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    :items="TrDomage"
                    label="Tr dommage"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.trDamage"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                  <v-text-field
                    label="Observation"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.observation"
                  ></v-text-field>
                </v-col>
                <!-- <v-col cols="12" sm="6" md="4">
                  <v-select
                    label="Mois"
                    color="#3A1C71"
                    filled
                    :items="StatusIiems"
                    v-model="adnewObject.month"
                  ></v-select>
                </v-col> -->
              </v-row>
              <v-card-title class="ml-0 pl-0">
                <span class="text-h5 mb-5 ml-0 mt-5" style="color: #3a1c71"
                  >Suivi de réparation</span
                >
              </v-card-title>

              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Fiche de reception"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    v-model="adnewObject.receptionSheet"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Marque véhicule"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.vehicleBrand"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Nom déposant"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    v-model="adnewObject.applicantName"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="téléphone déposant"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    v-model="adnewObject.callingPhone"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Date depot"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    type="date"
                    v-model="adnewObject.filingDate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Durée prévionnelle"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    type="number"
                    v-model="adnewObject.repairTime"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Date de retrait"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    type="date"
                    v-model="adnewObject.withdrawalDate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Durée des travaux"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    type="number"
                    v-model="adnewObject.workDuration"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Montant achat pièce"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    type="number"
                    v-model="adnewObject.partPurchaseAmount"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Main doeuvre"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    type="number"
                    v-model="adnewObject.workForce"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Montant devis proforma"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    type="number"
                    v-model="adnewObject.proformaQuoteAmount"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Montant htva"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    type="number"
                    v-model="adnewObject.amountEVAT"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Tva"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    type="number"
                    v-model="adnewObject.VAT"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Montantdu devis ttc"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    type="number"
                    v-model="adnewObject.ttcAmount"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Montant de la facture a payer et accepter par compagnie"
                    color="#3A1C71"
                    filled
                    type="number"
                    v-model="adnewObject.ipacAmount"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Avance reçue"
                    color="#3A1C71"
                    filled
                    type="number"
                    v-model="adnewObject.advanceReceived"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Reste à payer"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    type="number"
                    v-model="adnewObject.leftToPay"
                  ></v-text-field>
                </v-col>
                <!-- <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Bonus-malus"
                    color="#3A1C71"
                    filled
                    type="number"
                    v-model="adnewObject.bonusMalus"
                  ></v-text-field>
                </v-col> -->
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Règlemnet garagiste"
                    color="#3A1C71"
                    filled
                    type="number"
                    v-model="adnewObject.mechanicSettlement"
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
              <v-btn color="success darken-1" @click="addPvFormModal()">
                Enregistrer le dossier
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="receptionFiche" max-width="1000px">
          <v-card style="border-left: 10px solid #3a1c71">
            <v-row>
              <v-card-title>
                <span class="text-h5 mb-5 mt-5 ml-5" style="color: #3a1c71"
                  >Fiche de réception et appréciation</span
                >
              </v-card-title>
              <v-spacer></v-spacer>
              <v-btn
                class="mt-8 mr-9"
                color="success darken-1"
                outlined
                @click="genereteDocFile(adnewObject.repaireId)"
              >
                Imprimer fiche de récèption et appréciation
              </v-btn>
            </v-row>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Numéro sinistre"
                    color="#3A1C71"
                    disabled
                    background-color="#4DD0E1"
                    v-model="adnewObject.sinisterNumber"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Nom de l'Assuré"
                    v-model="adnewObject.name"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Immatriculation"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    v-model="adnewObject.vehicleRegistration"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Marque"
                    v-model="adnewObject.vehicleBrand"
                    color="#3A1C71"
                    disabled
                    background-color="#4DD0E1"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Date d'accident"
                    disabled
                    type="date"
                    background-color="#4DD0E1"
                    v-model="adnewObject.sinisterDate"
                    color="#3A1C71"
                    filled
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Type de garantie"
                    disabled
                    background-color="#4DD0E1"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.trDamage"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    disabled
                    background-color="#4DD0E1"
                    label="Date remise de l'objet"
                    color="#3A1C71"
                    filled
                    type="date"
                    v-model="adnewObject.filingDate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Nom du déposant"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    v-model="adnewObject.applicantName"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Nom du prestaitaire"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    v-model="adnewObject.mechanic"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Delai de réparation"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    v-model="adnewObject.workDuration"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Date reception par client"
                    color="#3A1C71"
                    filled
                    disabled
                    background-color="#4DD0E1"
                    v-model="adnewObject.withdrawalDate"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-select
                    label="Choix de règlement"
                    :items="['REPARATION', 'INDEMNISATION']"
                    v-model="adnewObject.reglementChoose"
                    color="#3A1C71"
                    filled
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Accord"
                    color="#3A1C71"
                    v-model="adnewObject.agreement"
                    filled
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    background-color="#ffd670"
                    label="Préjudice matériel"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.materialIndermnity"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    background-color="#ffd670"
                    label="Pièces a récupérer"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.piecesToRecover"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    background-color="#ffd670"
                    label="Accéssoires"
                    color="#3A1C71"
                    filled
                    v-model="adnewObject.accessories"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-card-title class="ml-0 pl-0">
                <span class="text-h5 mb-5 ml-0 mt-5" style="color: #3a1c71"
                  >Note / Appréciation</span
                >
              </v-card-title>

              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Accueil"
                    color="#3A1C71"
                    filled
                    type="Number"
                    min="1"
                    max="5"
                    counter="1"
                    v-model="adnewObject.receptionAppreciation"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Delai de réparation"
                    color="#3A1C71"
                    filled
                    type="number"
                    min="1"
                    max="5"
                    counter="1"
                    v-model="adnewObject.repairTimeAppreciation"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Qualité de travil"
                    color="#3A1C71"
                    filled
                    type="number"
                    min="1"
                    max="5"
                    counter="1"
                    v-model="adnewObject.workQualityAppreciation"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="Accessoires"
                    color="#3A1C71"
                    filled
                    type="number"
                    min="1"
                    max="3"
                    counter="1"
                    v-model="adnewObject.accessoriesAppreciation"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Autres"
                    color="#3A1C71"
                    filled
                    type="number"
                    min="1"
                    max="2"
                    counter="1"
                    v-model="adnewObject.others"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Note NSIA"
                    color="#3A1C71"
                    filled
                    type="number"
                    min="1"
                    max="20"
                    counter="2"
                    v-model="adnewObject.totalAppreciation"
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
        <v-data-table
          :headers="headers"
          :items="repaire"
          :items-per-page="10"
          class="elevation-0"
          background-color="red"
          color="#3A1C71"
          :loading="loading ? '#3A1C71' : null"
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
                      <span>Modification</span>
                    </v-tooltip>
                    <!-- <v-tooltip bottom color="#218380">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="ml-3" icon>
                          <v-icon size="20" @click="genereteDoc(item)" v-bind="attrs" v-on="on"
                            color="#218380">mdi-hospital-box-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>Mission réparation</span>
                    </v-tooltip> -->
                    <v-tooltip bottom color="#218380">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn class="ml-3" icon>
                          <v-icon
                            size="20"
                            @click="genereteDoc(item)"
                            v-bind="attrs"
                            v-on="on"
                            color="#218380"
                            >mdi-hospital-box-outline</v-icon
                          >
                        </v-btn>
                      </template>
                      <span>Fiche de récèption</span>
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
              <td>{{ item.agentName }}</td>
              <td>{{ item.mechanic ? item.mechanic.name : "" }}</td>
              <td>{{ item.transactionDate }}</td>
              <td>{{ item.jointReport }}</td>
              <td>{{ item.receivedDate }}</td>
              <td>{{ item.receptionSheet }}</td>
              <td>{{ item.invoiceDepositDate }}</td>
              <td>{{ item.invoicePaymentDate }}</td>
              <td>{{ item.invoicePaymentDeadline }}</td>

              <td>{{ item.observation }}</td>
              <td>{{ item.month }}</td>
              <td>{{ item.vehicleBrand }}</td>
              <td>{{ item.applicantName }}</td>
              <td>{{ item.callingPhone }}</td>
              <td>{{ item.filingDate }}</td>
              <td>{{ item.repairTime }}</td>
              <td>{{ item.withdrawalDate }}</td>
              <td>{{ item.workDuration }}</td>
              <td>{{ item.prime }}</td>
              <td>{{ item.partPurchaseAmount }}</td>
              <td>{{ item.workForce }}</td>
              <td>{{ item.proformaQuoteAmount }}</td>
              <td>{{ item.amountEVAT }}</td>
              <td>{{ item.VAT }}</td>
              <td>{{ item.ttcAmount }}</td>
              <td>{{ item.ipacAmount }}</td>
              <td>{{ item.advanceReceived }}</td>
              <td>{{ item.leftToPay }}</td>
              <td>{{ item.bonusMalus }}</td>
              <td>{{ item.mechanicSettlement }}</td>
              <td>{{ item.appeal }}</td>
              <td>{{ item.replacementVehicle }}</td>
              <td>{{ item.expert ? item.expert.name : "" }}</td>
              <td>{{ item.trDamage }}</td>
            </tr>
          </template>
          <template v-slot:top>
            <v-toolbar flat> </v-toolbar>
          </template>
          <template v-slot:no-data>
            <h4 class="text-h4 mb-4">pas de données</h4>
          </template></v-data-table
        >
      </div>
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
    </template>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import { repaireRecap } from "@/api/user";
import { defaultMethods, messages } from "../../utils/data";
import {
  addFileJson,
  // addOperationTypeForm,
  updateVictimeFileForm,
  // addVictimeFileForm,
  // updateFileForm,
  repaireRecap,
  updateRepaire,
} from "@/api/user.js";
export default {
  name: "repaireComponent",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: false,
    addFileExcel: false,
    addFile: false,
    page: 1,
    pages: 1,
    sinsiterSelectId: "",
    excelFile: null,
    adnewObject: {},
    victimeDialogModal: false,
    selectedDocumentsModal: [],
    commissariatNameList: [],
    enquetteurNameList: [],
    victimeNameList: [],
    addVictime: false,
    victimesListeData: [],
    garagisteNameList: [],
    startItem: [],
    victimeFormData: {},
    isExpert: true,
    showText: true,
    showSelect: false,
    receptionFiche: false,
    transactionDateStart: "",
    transactionDateEnd: "",
    invoiceDepositDateStart: "",
    invoiceDepositDateEnd: "",
    invoicePaymentDateStart: "",
    invoicePaymentDateEnd: "",
    sinisterNumber: "",
    sinisterVictimName: "",
    mechanic: "",
    result: [],
    elementsArray: [],
    addNewVictimeFile: false,
    pageCount: 0,
    pageCounts: 0,
    itemsPerPage: 10,
    printDoc: "",
    unlockButton: true,
    civiliteIiems: ["Monsieur", "Madame"],
    Decision: ["Oui", "Non"],
    StatusIiems: [
      "Toute la base",
      "Véhicules prospectés",
      "Véhicules acceptant réparation",
      "Véhicules envoyés en réparation",
      "Véhicules non livrés",
      "Véhicules livrés",
    ],
    TrDomage: [
      "RC",
      "Bris de glace",
      "Vole",
      "Incendie",
      "Mini Tout risque",
      "Tout risque",
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
        text: "garagiste",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "mechanic",
      },
      {
        text: "Date opération",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "transactionDate",
      },
      {
        text: "Constat amiable",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "jointReport",
      },

      {
        text: "Date réception ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "receivedDate",
      },
      {
        text: "Fiche de reception",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "receptionSheet",
      },
      {
        text: "Date depot facture ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "invoiceDepositDate",
      },
      {
        text: "Date paiement facture ",
        width: "250px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "invoicePaymentDate",
      },
      {
        text: "Delai paiement facture ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "invoicePaymentDeadline",
      },
      {
        text: "Observation",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "observation",
      },
      {
        text: "Mois",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "month",
      },
      {
        text: "Marque véhicule ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "vehicleBrand",
      },
      {
        text: "Nom deposant",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "applicantName",
      },
      {
        text: "telephone deposant",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "callingPhone",
      },
      {
        text: "Date depot ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "filingDate",
      },
      {
        text: "Délaie de reparéation ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "repairTime",
      },
      {
        text: "Date de retrait",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "withdrawalDate",
      },
      {
        text: "Duré des traveaux",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "workDuration",
      },
      {
        text: "Prime ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "prime",
      },
      {
        text: "Montant achat pièce ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "partPurchaseAmount",
      },
      {
        text: "Main doeuvre ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "workForce",
      },
      {
        text: "Montant devis proforma ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "proformaQuoteAmount",
      },
      {
        text: "Montant htva ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "amountEVAT",
      },
      {
        text: "Tva ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "VAT",
      },
      {
        text: "Montantdu devis ttc ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "ttcAmount",
      },
      {
        text: "Montant de la facture a payer et accepter par compagnie ",
        width: "250px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "ipacAmount",
      },
      {
        text: "Avance recue  ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "advanceReceived",
      },
      {
        text: "Reste à payer ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "leftToPay",
      },
      {
        text: "Bonus-malus",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "bonusMalus",
      },
      {
        text: "Reglemnet garagiste  ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "mechanicSettlement",
      },
      {
        text: "Recours",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "appeal",
      },
      {
        text: "vehicule de remplacement ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "replacementVehicle",
      },
      {
        text: "Expert ",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "expert",
      },
      {
        text: "Tr dommage",
        width: "200px",
        // divider: true,
        // class: "deep-purple darken-4 white--text",
        align: "start",
        value: "trDamage",
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
      "inventoryListe",
      "Commissariat",
      "repaire",
      "victimeList",
      "expertListe",
      "garagisteListe",
      "statFile",
      // "statFileRecap"
    ]),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  //SET_STATISTIQUE_FILE_RECAP
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
    garagisteListe() {
      this.garagisteNameList = defaultMethods.getNameList(this.garagisteListe);
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
      "getStatRepair",
      "getVictimeListe",
      "getExpert",
      "getGaragiste",
      "getDocRepaire",
      "getStatRecapRepaire",
    ]),
    async initFiles() {
      this.loading = true;
      try {
        await this.getStatRepair({
          statisticalFilter: this.statisticalFilter,
          startDate: this.startDate,
          endDate: this.endDate,
          mechanic: defaultMethods.getItemId(
            this.garagisteListe,
            this.mechanic
          ),
        });
        await this.getUserProfile();
        // // await this.getProduct();
        // await this.getEnquetteur();
        // // await this.getCommissariat();
        // await this.getVictimeListe();
        await this.getExpert();
        await this.getGaragiste();
      } catch (error) {
        defaultMethods.dispatchError(
          this.$store,
          messages.failedToLoad("les dossiers")
        );
      }
      this.loading = false;
    },
    async getStatRecap() {
      this.loading = true;

      try {
        await repaireRecap(); // Assuming this is an asynchronous function
        await this.getStatRecapRepaire({
          mechanic: defaultMethods.getItemId(
            this.garagisteListe,
            this.mechanic
          )
        });
      } catch (error) {
        // Handle any errors that might occur during the async operations
        console.error("An error occurred:", error);
      }
      this.loading = false;
    },
    // async getStatRecap() {
    //   this.loading = true
    //   await this.getStatRecapRepaire({
    //       mechanic: defaultMethods.getItemId(
    //         this.garagisteListe,
    //         this.mechanic
    //       ),
    //     });
    //   this.loading = false
    // },
    getColor(item) {
      if (item == "En cours") return "orange";
      else if (item == "Consultation") return "red";
      else return "green";
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
    async genereteDoc(item) {
      // alert(JSON.stringify(this.batch));
      this.adnewObject.sinisterNumber = item.sinister.sinisterNumber;
      this.adnewObject.name = item.sinister.name;
      this.adnewObject.fullName = item.sinisterVictim.fullName;
      this.adnewObject.phone = item.sinisterVictim.phone;
      this.adnewObject.agentName = item.agentName;
      this.adnewObject.mechanic = item.mechanic ? item.mechanic.name : "";
      this.adnewObject.transactionDate = item.transactionDate;
      this.adnewObject.jointReport = item.jointReport;
      this.adnewObject.receivedDate = item.receivedDate;
      this.adnewObject.receptionSheet = item.receptionSheet;
      this.adnewObject.invoiceDepositDate = item.invoiceDepositDate;
      this.adnewObject.invoicePaymentDate = item.invoicePaymentDate;
      this.adnewObject.invoicePaymentDeadline = item.invoicePaymentDeadline;
      this.adnewObject.observation = item.observation;
      this.adnewObject.month = item.month;
      this.adnewObject.vehicleBrand = item.vehicleBrand;
      this.adnewObject.applicantName = item.applicantName;
      this.adnewObject.callingPhone = item.callingPhone;
      this.adnewObject.filingDate = item.filingDate;
      this.adnewObject.repairTime = item.repairTime;
      this.adnewObject.withdrawalDate = item.withdrawalDate;
      this.adnewObject.workDuration = item.workDuration;
      this.adnewObject.prime = item.prime;
      this.adnewObject.partPurchaseAmount = item.partPurchaseAmount;
      this.adnewObject.workForce = item.workForce;
      this.adnewObject.proformaQuoteAmount = item.proformaQuoteAmount;
      this.adnewObject.amountEVAT = item.amountEVAT;
      this.adnewObject.VAT = item.VAT;
      this.adnewObject.ttcAmount = item.ttcAmount;
      this.adnewObject.ipacAmount = item.ipacAmount;
      this.adnewObject.advanceReceived = item.advanceReceived;
      this.adnewObject.leftToPay = item.leftToPay;
      this.adnewObject.bonusMalus = item.bonusMalus;
      this.adnewObject.mechanicSettlement = item.mechanicSettlement;
      this.adnewObject.appeal = item.appeal;
      this.adnewObject.replacementVehicle = item.replacementVehicle;
      this.adnewObject.expert = item.expert ? item.expert.name : "";
      this.adnewObject.trDamage = item.trDamage;
      this.adnewObject.agreement = item.agreement;

      this.elementsArray = [];
      this.elementsArray = item.materialIndermnity;
      this.adnewObject.materialIndermnity = this.elementsArray.join(";");
      this.adnewObject.materialIndermnity += ";";
      // alert(JSON.stringify(this.adnewObject.materialIndermnity));
      this.elementsArray = [];
      this.elementsArray = item.piecesToRecover;
      this.adnewObject.piecesToRecover = this.elementsArray.join(";");
      this.adnewObject.piecesToRecover += ";";

      this.elementsArray = [];
      this.elementsArray = item.accessories;
      this.adnewObject.accessories = this.elementsArray.join(";");
      this.adnewObject.accessories += ";";

      this.adnewObject.reglementChoose = item.reglementChoose;

      // this.adnewObject.materialIndermnity = item.materialIndermnity;
      // this.adnewObject.piecesToRecover = item.piecesToRecover;
      // this.adnewObject.accessories = item.accessories;
      this.adnewObject.receptionAppreciation = item.receptionAppreciation;
      this.adnewObject.repairTimeAppreciation = item.repairTimeAppreciation;
      this.adnewObject.workQualityAppreciation = item.workQualityAppreciation;
      this.adnewObject.accessoriesAppreciation = item.accessoriesAppreciation;
      this.adnewObject.others = item.others;
      this.adnewObject.totalAppreciation = item.totalAppreciation;
      // this.adnewObject.studyOffer = ;
      this.adnewObject.sinsterVictimeID = item.sinisterVictim._id;
      this.adnewObject.repaireId = item._id;
      // this.editedIndex = this.adnewObject.indexOf(item);
      // this.adnewObject = Object.assign({}, item);
      this.valueChange();
      this.receptionFiche = true;
      // await this.getDocRepaire({
      //   id: item._id,
      // });
    },
    async genereteDocFile(item) {
      await this.getDocRepaire({
        id: item,
      });
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

    handleClick(item) {
      // alert(JSON.stringify(item));
      this.adnewObject.sinisterNumber = item.sinister.sinisterNumber;
      this.adnewObject.name = item.sinister.name;
      this.adnewObject.fullName = item.sinisterVictim.fullName;
      this.adnewObject.phone = item.sinisterVictim.phone;
      this.adnewObject.agentName = item.agentName;
      this.adnewObject.mechanic = item.mechanic ? item.mechanic.name : "";
      this.adnewObject.transactionDate = item.transactionDate;
      this.adnewObject.jointReport = item.jointReport;
      this.adnewObject.receivedDate = item.receivedDate;
      this.adnewObject.receptionSheet = item.receptionSheet;
      this.adnewObject.invoiceDepositDate = item.invoiceDepositDate;
      this.adnewObject.invoicePaymentDate = item.invoicePaymentDate;
      this.adnewObject.invoicePaymentDeadline = item.invoicePaymentDeadline;
      this.adnewObject.observation = item.observation;
      this.adnewObject.month = item.month;
      this.adnewObject.vehicleBrand = item.vehicleBrand;
      this.adnewObject.applicantName = item.applicantName;
      this.adnewObject.callingPhone = item.callingPhone;
      this.adnewObject.filingDate = item.filingDate;
      this.adnewObject.repairTime = item.repairTime;
      this.adnewObject.withdrawalDate = item.withdrawalDate;
      this.adnewObject.workDuration = item.workDuration ? item.workDuration : 0;
      this.adnewObject.prime = item.prime;
      this.adnewObject.partPurchaseAmount = item.partPurchaseAmount;
      this.adnewObject.workForce = item.workForce;
      this.adnewObject.proformaQuoteAmount = item.proformaQuoteAmount;
      this.adnewObject.amountEVAT = item.amountEVAT ? item.amountEVAT : 0;
      this.adnewObject.VAT = item.VAT ? item.VAT : 0;
      this.adnewObject.ttcAmount = item.ttcAmount ? item.ttcAmount : 0;
      this.adnewObject.ipacAmount = item.ipacAmount;
      this.adnewObject.advanceReceived = item.advanceReceived;
      this.adnewObject.leftToPay = item.leftToPay;
      this.adnewObject.bonusMalus = item.bonusMalus;
      this.adnewObject.mechanicSettlement = item.mechanicSettlement;
      this.adnewObject.appeal = item.appeal;
      this.adnewObject.replacementVehicle = item.replacementVehicle;
      this.adnewObject.expert = item.expert ? item.expert.name : "";
      this.adnewObject.trDamage = item.trDamage;
      // this.adnewObject.studyOffer = ;
      this.adnewObject.sinsterVictimeID = item.sinisterVictim._id;
      this.adnewObject.repaireId = item._id;
      // this.editedIndex = this.adnewObject.indexOf(item);
      // this.adnewObject = Object.assign({}, item);
      this.valueChange();
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
    difference(date1, date2) {
      const date1utc = Date.UTC(
        date1.getFullYear(),
        date1.getMonth(),
        date1.getDate()
      );
      const date2utc = Date.UTC(
        date2.getFullYear(),
        date2.getMonth(),
        date2.getDate()
      );
      const day = 1000 * 60 * 60 * 24;
      return (date2utc - date1utc) / day;
    },
    valueChange() {
      const date1 = new Date(this.adnewObject.filingDate);
      const date2 = new Date(this.adnewObject.withdrawalDate);
      this.adnewObject.workDuration = this.difference(date1, date2);
      this.adnewObject.amountEVAT =
        parseInt(this.adnewObject.partPurchaseAmount) +
        parseInt(this.adnewObject.workForce);
      this.adnewObject.VAT = (parseInt(this.adnewObject.workForce) * 18) / 100;
      this.adnewObject.ttcAmount =
        parseInt(this.adnewObject.partPurchaseAmount) +
        parseInt(this.adnewObject.workForce) +
        parseInt(this.adnewObject.VAT);
      this.adnewObject.leftToPay =
        parseInt(this.adnewObject.ipacAmount) -
        parseInt(this.adnewObject.advanceReceived);
      // alert(this.adnewObject.workDuration);
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
    async addPvFormModal() {
      this.loading = true;
      // this.result = [];
      let word = "";

      // const
      // alert(JSON.stringify(this.startItem))
      // for (let a = 0; a < this.startItem.length; a++) {
      //   if (this.startItem[a] != ";") {
      //     word += this.startItem[a];
      //   }

      //   if (this.startItem[a] == ";") {
      //     this.result.push(word);
      //     word = "";
      //   }
      // }
      // this.adnewObject.agreement = this.result;
      if (this.adnewObject.materialIndermnity) {
        this.result = [];
        this.word = "";
        this.startItem = [];

        this.startItem = this.adnewObject.materialIndermnity;
        // alert(JSON.stringify(this.startItem) )
        for (let a = 0; a < this.startItem.length; a++) {
          if (this.startItem[a] != ";") {
            word += this.startItem[a];
          }

          if (this.startItem[a] == ";") {
            this.result.push(word);
            word = "";
          }
        }

        this.adnewObject.materialIndermnity = this.result;
      }

      if (this.adnewObject.piecesToRecover) {
        this.result = [];
        this.word = "";
        this.startItem = [];
        this.startItem = this.adnewObject.piecesToRecover;

        for (let a = 0; a < this.startItem.length; a++) {
          if (this.startItem[a] != ";") {
            word += this.startItem[a];
          }

          if (this.startItem[a] == ";") {
            this.result.push(word);
            word = "";
          }
        }
        this.adnewObject.piecesToRecover = this.result;
      }

      if (this.adnewObject.accessories) {
        this.result = [];
        this.word = "";
        this.startItem = [];
        this.startItem = this.adnewObject.accessories;

        for (let a = 0; a < this.startItem.length; a++) {
          if (this.startItem[a] != ";") {
            word += this.startItem[a];
          }

          if (this.startItem[a] == ";") {
            this.result.push(word);
            word = "";
          }
        }
        this.adnewObject.accessories = this.result;
      }

      // alert("ici");
      try {
        const schema = {
          // policeStation: defaultMethods.getItemId(
          //   this.Commissariat,
          //   this.adnewObject.policeStation
          // ),
          sinisterVictim: this.adnewObject.sinsterVictimeID,
          mechanic: defaultMethods.getItemId(
            this.garagisteListe,
            this.adnewObject.mechanic
          ),
          transactionDate: this.adnewObject.transactionDate,
          jointReport: this.adnewObject.jointReport,
          receivedDate: this.adnewObject.receivedDate,
          receptionSheet: this.adnewObject.receptionSheet,
          invoiceDepositDate: this.adnewObject.invoiceDepositDate,
          invoicePaymentDate: this.adnewObject.invoicePaymentDate,
          invoicePaymentDeadline: this.adnewObject.invoicePaymentDeadline,
          observation: this.adnewObject.observation,
          month: this.adnewObject.month,
          vehicleBrand: this.adnewObject.vehicleBrand,
          applicantName: this.adnewObject.applicantName,
          callingPhone: this.adnewObject.callingPhone,
          filingDate: this.adnewObject.filingDate,
          repairTime: this.adnewObject.repairTime,
          withdrawalDate: this.adnewObject.withdrawalDate,
          workDuration: this.adnewObject.workDuration
            ? this.adnewObject.workDuration
            : 0,
          prime: this.adnewObject.prime,
          partPurchaseAmount: this.adnewObject.partPurchaseAmount,
          workForce: this.adnewObject.workForce,
          proformaQuoteAmount: this.adnewObject.proformaQuoteAmount,
          amountEVAT: this.adnewObject.amountEVAT
            ? this.adnewObject.amountEVAT
            : 0,
          VAT: this.adnewObject.VAT ? this.adnewObject.VAT : 0,
          ttcAmount: this.adnewObject.ttcAmount
            ? this.adnewObject.ttcAmount
            : 0,
          ipacAmount: this.adnewObject.ipacAmount,
          advanceReceived: this.adnewObject.advanceReceived,
          leftToPay: this.adnewObject.leftToPay,
          bonusMalus: this.adnewObject.bonusMalus,
          reglementChoose: this.adnewObject.reglementChoose,

          agreement: this.adnewObject.agreement,
          materialIndermnity: this.adnewObject.materialIndermnity,
          piecesToRecover: this.adnewObject.piecesToRecover,
          accessories: this.adnewObject.accessories,
          receptionAppreciation: this.adnewObject.receptionAppreciation,
          repairTimeAppreciation: this.adnewObject.repairTimeAppreciation,
          workQualityAppreciation: this.adnewObject.workQualityAppreciation,
          accessoriesAppreciation: this.adnewObject.accessoriesAppreciation,
          others: this.adnewObject.others,
          totalAppreciation: this.adnewObject.totalAppreciation,
          mechanicSettlement: this.adnewObject.mechanicSettlement,
          // appeal: this.adnewObject.appeal,
          replacementVehicle: this.adnewObject.replacementVehicle,
          expert: defaultMethods.getItemId(
            this.expertListe,
            this.adnewObject.expert
          ),
          trDamage: this.adnewObject.trDamage,
          // observation: this.adnewObject.observation,
        };

        if (this.adnewObject.repaireId) {
          await updateRepaire({
            schema,
            id: this.adnewObject.repaireId,
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
      this.receptionFiche = false;
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
.green-bg {
  /* Set the display to `table-row` because Vuetify makes `flex` */
  display: table-row;
}

td {
  font-size: 12px !important;
  border-bottom: 1px solid #f4f7fe !important;
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
