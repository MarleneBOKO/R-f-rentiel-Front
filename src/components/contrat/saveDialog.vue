<template>
  <div>
    <v-card style="border-top: 10px solid #061a40">
      <!-- tool -->
      <div v-if="modal._id && show == true" class="d-flex mt-10 justify-end">
        <v-toolbar-items>
          <v-row align="center" justify="space-around">
            <v-btn
              rounded
              color="red"
              outlined
              pill
              class="mr-12"
              @click="regulationDialog = true"
            >
              <v-icon left> mdi-pencil </v-icon>
              Clause de regule
            </v-btn>
          </v-row>
        </v-toolbar-items>
        <v-toolbar-items>
          <v-row align="center" justify="space-around">
            <v-btn
              color="warning"
              rounded
              outlined
              pill
              class="mr-12"
              @click="pbDialog = true"
            >
              <v-icon left> mdi-pencil </v-icon>
              Clause de pb
            </v-btn>
          </v-row>
        </v-toolbar-items>
        <v-toolbar-items>
          <v-row align="center" justify="space-around">
            <v-btn
              color="#061a40"
              rounded
              outlined
              pill
              class="mr-12"
              @click="coinsuranceDialog = true"
            >
              <v-icon left> mdi-pencil </v-icon>
              Coassurance
            </v-btn>
          </v-row>
        </v-toolbar-items>
        <v-toolbar-items>
          <v-row align="center" justify="space-around">
            <v-btn
              color="secondary"
              outlined
              rounded
              pill
              class="mr-12"
              @click="reinsuranceDialog = true"
            >
              <v-icon left> mdi-pencil </v-icon>
              Réassurance
            </v-btn>
          </v-row>
        </v-toolbar-items>
      </div>
      <v-card-text>
        <h2 class="pt-8 pl-3">Informations contrat</h2>

        <v-container fluid>
          <v-row align="center">
            <v-col cols="6">
              <v-select
                :items="companyNameList"
                v-model="modal.company"
                label="Compagnie sélectionnée"
                outlined
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-select
                :items="avenantList"
                v-model="modal.actionType"
                label=" Type d'avenant"
                outlined
              ></v-select>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                color="#061a40"
                v-model="modal.policeNumber"
                label="Numéro police"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                color="#061a40"
                v-model="modal.plugged"
                label="Numéro avenant"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-select
                :items="categorie"
                v-model="modal.category"
                label="Catégorie"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                color="#061a40"
                v-model="modal.netPrime"
                label="Prime nette"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                color="#061a40"
                v-model="modal.accessory100"
                @blur="seed50Accessory"
                label="Coût de police"
              ></v-text-field>
            </v-col>

            <!-- totalPrime -->
            <v-col v-if="show == false" cols="12" sm="3">
              <v-text-field
                color="#061a40"
                v-model="modal.TTCPrime"
                @change="valeue(modal.totalPrime)"
                type="number"
                label="Prime TTC"
              ></v-text-field>
            </v-col>
            <v-col v-if="show == true" cols="12" sm="3">
              <v-text-field
                color="#061a40"
                v-model="modal.totalPrime"
                @change="valeue(item)"
                type="number"
                label="Prime TTC"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                color="#061a40"
                v-model="modal.accessory50"
                type="number"
                label="Cout de police 50 %"
                disabled
                background-color="#4DD0E1"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                color="#061a40"
                v-model="modal.commission"
                type="number"
                label="Commission"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                color="#061a40"
                v-model="modal.commissionRate"
                type="number"
                label="Taux commission"
                suffix="%"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                color="#061a40"
                v-model="modal.effectDate"
                type="date"
                label=" Date Effet"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                color="#061a40"
                v-model="modal.dueDate"
                type="date"
                label=" Date Echéance"
              ></v-text-field>
            </v-col>
            <v-col v-if="withContractEstablished" cols="12">
              <v-select
                :items="['OUI', 'NON']"
                v-model="modal.contractEstablished"
                label="Fin mise en place contrat"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                color="#061a40"
                v-model="modal.TACAVA"
                label="FGA"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                color="#061a40"
                v-model="modal.cdeaoPrime"
                label="TAXE"
              ></v-text-field>
            </v-col>
            <!-- <v-col cols="12" sm="3">
              <v-text-field
                color="#061a40"
                v-model="modal.TE"
                label="TAXE"
              ></v-text-field>
            </v-col> -->
            <v-col cols="12" sm="3">
              <v-text-field
                color="#061a40"
                v-model="modal.TVA"
                label="CEDEAO"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                color="#061a40"
                disabled
                background-color="#4DD0E1"
                v-model="modal.commissionTTC"
                label="Commission TTC"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-row justify="space-around">
                <v-checkbox
                  disabled
                  background-color="#4DD0E1"
                  v-model="modal.haveRegulationClause"
                >
                  <template v-slot:label>
                    <div>Clause Régule</div>
                  </template>
                </v-checkbox>

                <v-checkbox
                  disabled
                  background-color="#4DD0E1"
                  v-model="modal.havePbClause"
                >
                  <template v-slot:label>
                    <div>Clause de PB</div>
                  </template>
                </v-checkbox>

                <v-checkbox
                  disabled
                  background-color="#4DD0E1"
                  v-model="modal.haveCoinsurance"
                >
                  <template v-slot:label>
                    <div>Coassurance</div>
                  </template>
                </v-checkbox>

                <v-checkbox
                  disabled
                  background-color="#4DD0E1"
                  v-model="modal.haveReinsurance"
                >
                  <template v-slot:label>
                    <div>Réassurance</div>
                  </template>
                </v-checkbox>
              </v-row>
            </v-col>

            <v-col cols="12" md="12">
              <v-textarea
                outlined
                name="input-7-4"
                label="Observations"
                v-model="modal.observation"
                value=""
              ></v-textarea>
            </v-col>
            <v-row justify="end">
              <v-btn color="error" right text @click="closeContract">
                Fermer
              </v-btn>

              <v-btn
                color="success"
                class="mr-6"
                right
                @click="textAlertClause"
              >
                Enregistrer
              </v-btn>
            </v-row>
          </v-row>
        </v-container>
      </v-card-text>

      <div style="flex: 1 1 auto"></div>
    </v-card>

    <!-- regulation clause -->
    <v-dialog v-model="regulationDialog" max-width="500px">
      <v-card style="border-top: 10px solid #061a40">
        <v-card-title>
          <span class="text-h5">Effectuer une clause de régularisation</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  color="#061a40"
                  v-model="regulationClauseModal.plate"
                  label="Assiette"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  color="#061a40"
                  v-model="regulationClauseModal.observation"
                  label="Observation"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  color="#061a40"
                  v-model="regulationClauseModal.reminderDate"
                  label="Date de rappel"
                  type="date"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  color="#061a40"
                  v-model="regulationClauseModal.companyRequestDate"
                  label="Date envoi compagnie"
                  type="date"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  color="#061a40"
                  v-model="regulationClauseModal.companyReturnDate"
                  label="Date retour compagnie"
                  type="date"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  color="#061a40"
                  v-model="regulationClauseModal.customerRequestDate"
                  label="Date envoi client"
                  type="date"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  color="#061a40"
                  v-model="regulationClauseModal.customerReturnDate"
                  label="date retour client"
                  type="date"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error " text @click="closeClause"> Fermer </v-btn>
          <v-btn color="success " @click="saveRegulation">
            Confirmer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- regulation PB -->
    <v-dialog v-model="pbDialog" max-width="500px">
      <v-card style="border-top: 10px solid #061a40">
        <v-card-title>
          <span class="text-h5">Effectuer une clause de PB</span>
        </v-card-title>
        <!-- {{ regulationClauseModal }} -->
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  color="#061a40"
                  v-model="pbClauseModal.plate"
                  label="Assiette"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  color="#061a40"
                  v-model="pbClauseModal.observation"
                  label="Observation"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  color="#061a40"
                  v-model="pbClauseModal.reminderDate"
                  label="Date de rappel"
                  type="date"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  color="#061a40"
                  v-model="pbClauseModal.companyRequestDate"
                  label="Date envoi compagnie"
                  type="date"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  color="#061a40"
                  v-model="pbClauseModal.companyReturnDate"
                  label="Date retour compagnie"
                  type="date"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  color="#061a40"
                  v-model="pbClauseModal.customerRequestDate"
                  label="Date envoi client"
                  type="date"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  color="#061a40"
                  v-model="pbClauseModal.customerReturnDate"
                  label="date retour client"
                  type="date"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error " text @click="closeClause"> Retour </v-btn>
          <v-btn color="success " @click="savePb"> Confirmer </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Coassurance -->
    <v-dialog v-model="coinsuranceDialog" max-width="500px">
      <v-card style="border-top: 10px solid #061a40" class="">
        <v-card-title class="">
          <div class="w-100 d-flex justify-space-between">
            <span class="text-h5">Enregistrer Coassurance</span>
            <v-btn
              color="secondary"
              outlined
              rounded
              pill
              @click="addOneCoinsurance"
            >
              Ajouter</v-btn
            >
          </div>
        </v-card-title>
        <v-card-text>
          <v-container>
            <div v-for="(coinsurance, a) in coinsuranceModal" :key="a">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    color="#061a40"
                    v-model="coinsurance.shareRate"
                    :disabled="coinsurance.haveReinsurance"
                    label="Taux de coass"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    :items="coinsuranceCompanyNameList"
                    @change="updateCoinsuranceCompanyNameList"
                    :disabled="coinsurance.haveReinsurance"
                    v-model="coinsurance.company"
                    label="Nom de la compagnie"
                  ></v-select>
                </v-col>

                <v-col v-if="coinsurance._id" cols="12">
                  <v-select
                    :items="[true, false]"
                    v-model="coinsurance.isLeader"
                    label="Compagnie leader"
                    disabled
                    background-color="#4DD0E1"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    :items="[true, false]"
                    v-model="coinsurance.isPayed"
                    label="Prime reversée"
                  ></v-select>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    color="#061a40"
                    v-model="coinsurance.observation"
                    label="Observations"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-btn
                    @click="removeFromCoin(a)"
                    color="error"
                    outlined
                    rounded
                    pill
                  >
                    Supprimer</v-btn
                  >
                </v-col>
              </v-row>
              <!-- only for update -->
            </div>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="closeInsurance">
            Fermer
          </v-btn>
          <v-btn color="success " @click="saveCoinsurance">
            Confirmer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Reassurance -->
    <v-dialog v-model="reinsuranceDialog" max-width="500px">
      <v-card style="border-top: 10px solid #061a40">
        <v-card class="">
          <v-card-title class="">
            <div class="w-100 d-flex justify-space-between">
              <span class="text-h5">Effectuer Reassurance</span>
            </div>
          </v-card-title>
          <v-data-table
            class="pt-3"
            flat
            :loading="loading ? '#061a40' : null"
            :headers="headersReinsurance"
            :items="reinsuranceCompanies"
            :items-per-page="15"
            sort-by=""
          >
            <template v-slot:item.shareRate="{ item }">
              <td>{{ item.shareRate }} %</td>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn
                @click="startReinsurance(item)"
                color="indigo"
                outlined
                rounded
                pill
                class="white--text"
              >
                Réassurer
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-card>
    </v-dialog>
    <template>
      <v-row justify="center">
        <v-dialog v-model="alertClause" persistent max-width="500px">
          <v-card style="border-top: 10px solid red">
            <v-card-title class="text-h5">
              Alerte : Clauses contractuelles
            </v-card-title>
            <v-card-text>{{ this.textAlert }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                v-if="modal._id"
                color="warning"
                text
                @click="alertClause = false"
              >
                Retour
              </v-btn>
              <v-btn
                color="error"
                :loading="loading ? '#061a40' : null"
                @click="saveContract"
              >
                Enregistrer Sans les clauses
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <v-dialog v-model="reinsuranceSecondDialog" max-width="1000px">
      <v-card style="border-top: 10px solid #061a40" class="">
        <v-container>
          <v-card-title class="">
            <div class="w-100 d-flex justify-space-between">
              <span class="text-h5">Effectuer Réassurance</span>
              <v-btn
                @click="saveReinsurance"
                color="success"
                outlined
                rounded
                pill
                >Enregistrer</v-btn
              >
            </div>
          </v-card-title>
          <v-form>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  color="#061a40"
                  v-model="reinsuranceModal.preservePrime"
                  label="Prime conservé"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  color="#061a40"
                  v-model="reinsuranceModal.observation"
                  label="Observation"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <div class="d-flex">
                  <v-btn
                    color="#061a40"
                    outlined
                    rounded
                    pill
                    @click="addReinsurer"
                    >Ajouter une compagnie</v-btn
                  >
                </div>
                <div v-for="(reinsurer, o) in reinsurers" :key="o">
                  <v-row>
                    <v-col cols="12" sm="3">
                      <v-text-field
                        color="#061a40"
                        v-model="reinsurer.name"
                        label="Compagnie"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2">
                      <v-text-field
                        color="#061a40"
                        v-model="reinsurer.cedePrime"
                        label="Prime cedé"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-text-field
                        color="#061a40"
                        v-model="reinsurer.shareRate"
                        label="Taux de partage"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2">
                      <v-select
                        :items="['OUI', 'NON']"
                        v-model="reinsurer.isPayed"
                        label="Payé"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="1">
                      <v-btn
                        color="error"
                        outlined
                        rounded
                        pill
                        @click="removeFromReinsurer(o)"
                        >Supprimer</v-btn
                      >
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import { defaultMethods, messages } from "@/utils/data";

import {
  addCoinsurance,
  updateCoinsurance,
  updateContract,
  updateRegulationClause,
  addRegulationClause,
  addContract,
  addPbClause,
  updatePbClause,
  getReinsurance,
  addReinsurance,
  updateReinsurance,
} from "@/api/user.js";
export default {
  props: {
    modal: {
      type: Object,
      default: () => {},
    },
    withContractEstablished: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      show: false,
      companyNameList: [],
      avenantList: [
        "Affaire Nouvelle",
        "Renouvellement",
        "Incorporation",
        "Retrait",
        "Suspension",
        "Remise en vigeur",
        "Precision",
        "Modification",
        "Resiliation",
        "Régularisation",
        "Prorogation",
        "Ajustement",
        "Saturation",
        "Changement d'immatriculation",
      ],
      loading: false,
      valeurPrime: "",
      regulationDialog: false,
      alertClause: false,
      showButton: false,
      pbDialog: false,
      valueAdd: false,
      coinsuranceDialog: false,
      reinsuranceDialog: false,
      editedItem: {},
      textAlert: "",
      coinsuranceModal: [
        {
          shareRate: 0,
          company: "",
          observation: "",
        },
      ],
      pbClauseModal: {
        reminderDate: "",
        companyRequestDate: "",
        companyReturnDate: "",
        customerRequestDate: "",
        customerReturnDate: "",
      },

      regulationClauseModal: {
        reminderDate: "",
        companyRequestDate: "",
        companyReturnDate: "",
        customerRequestDate: "",
        customerReturnDate: "",
      },
      coinsuranceCompanyNameList: [],
      reinsuranceModal: {},
      headersReinsurance: [
        {
          text: "Compagnie",
          align: "start",
          sortable: false,
          value: "company",
        },
        { text: "Taux de partage", value: "shareRate" },
        { text: "", value: "actions", sortable: false },
      ],
      reinsuranceCompanies: [],
      reinsuranceSecondDialog: false,
      reminderMenu: false,
      companyRequestMenu: false,
      companyReturnMenu: false,
      customerRequestMenu: false,
      customerReturnMenu: false,
      productName: "",
      reinsurers: [],
      reminderMenu1: false,
      companyRequestMenu1: false,
    };
  },

  computed: {
    ...mapGetters(["Companies", "Products"]),
  },
  watch: {
    Companies() {
      this.companyNameList = defaultMethods.getNameList(this.Companies.docs);
      this.seedCoinsuranceCompanyNameList();
    },
    modal() {
      if (this.modal) {
        this.seedContract();
        // this.modal.company = defaultMethods.getItemName(
        //   this.Companies.docs,
        //   this.modal.company
        // );
        // this.modal.commercial = defaultMethods.getItemName(
        //   this.Users.docs,
        //   this.modal.commercial
        // );

        this.seedContractOtherInfo();
      } else {
        this.modal = {
          accessory100: 0,
          accessory50: 0,
        };
      }
    },
    Products() {
      this.productName = defaultMethods.getItemName(
        this.Products.docs,
        this.modal.product
      );

      switch (this.productName) {
        case "BAOBAB +":
          {
            this.categorie = ["ASSURANCE DE PERSONNES"];
          }
          break;
        case "ASK KPELE":
          {
            this.categorie = ["ASSURANCE DE PERSONNES"];
          }
          break;
        case "ASSURANCE CREDIT":
          {
            this.categorie = ["ASSURANCE DE PERSONNES"];
          }
          break;
        case "ASSURANCE CAUTION":
          {
            this.categorie = ["DOMMAGES AUX BIENS"];
          }
          break;
        case "ASSURANCE CREDIT BAIL":
          {
            this.categorie = ["DOMMAGES AUX BIENS"];
          }
          break;
        case "INDEMNITE DE FIN DE CARRIERE":
          {
            this.categorie = ["ASSURANCE DE PERSONNE"];
          }
          break;
        case "ASSURANCE SANTE":
          {
            this.categorie = ["MALADIE"];
          }
          break;
        case "ASSURANCES TRANSPORTS":
          {
            this.categorie = [
              "CORP",
              "AERIEN",
              "TERRESTRE",
              "MARITIME",
              "FERROVIAIRE",
            ];
          }
          break;
        case "AUTOMOBILE":
          {
            this.categorie = [
              "FLOTTE AUTO",
              "FLOT MOTO",
              "MONO AUTO",
              "MONO MOTO",
            ];
          }
          break;
        case "BRIS DE MACHINE":
          {
            this.categorie = ["DOMMAGES AUX BIENS"];
          }
          break;
        case "FAUX PAIEMENTS":
          {
            this.categorie = ["DOMMAGES AUX BIENS"];
          }
          break;
        case "GLOBALE DE BANQUE":
          {
            this.categorie = ["DOMMAGES AUX BIENS"];
          }
          break;
        case "GLOBALE DOMMAGES":
          {
            this.categorie = ["INCENDIE"];
          }
          break;
        case "INDIVIDUELLE ACCIDENTS":
          {
            this.categorie = ["ASSURANCE DE PERSONNES"];
          }
          break;
        case "MULTIRISQUE HABITATION":
          {
            this.categorie = ["INCENDIE"];
          }
          break;
        case "MULTIRISQUE PROFESSIONNELLE":
          {
            this.categorie = ["INCENDIE"];
          }
          break;
        case "PREVOYANCE DECES":
          {
            this.categorie = ["ASSURANCE DE PERSONNES"];
          }
          break;
        case "RC CHEF D'ENTREPRISE":
          {
            this.categorie = ["RESPONSABILITE CIVILE"];
          }
          break;
        case "RC CHEF DE FAMILLE":
          {
            this.categorie = ["RESPONSABILITE CIVILE"];
          }
          break;
        case "RC DECENNALE":
          {
            this.categorie = ["RESPONSABILITE CIVILE"];
          }
          break;
        case "RC EXPLOITATION":
          {
            this.categorie = ["RESPONSABILITE CIVILE"];
          }
          break;
        case "RC SCOLAIRE":
          {
            this.categorie = ["RESPONSABILITE CIVILE"];
          }
          break;
        case "RETRAITE COMPLEMENTAIRE":
          {
            this.categorie = ["ASSURANCE DE PERSONNES"];
          }
          break;
        case "TEMPORAIRE DECES":
          {
            this.categorie = ["ASSURANCE DE PERSONNES"];
          }
          break;
        case "TOUS DOMMAGES SAUF":
          {
            this.categorie = ["INCENDIE"];
          }
          break;
        case "TOUS RISQUES MONTAGE":
          {
            this.categorie = ["DOMMAGES AUX BIENS"];
          }
          break;
        case "TOUS RISQUES CHANTIER":
          {
            this.categorie = ["DOMMAGES AUX BIENS"];
          }
          break;
        case "TRAVEL ASSURANCE":
          {
            this.categorie = ["VOYAGE"];
          }
          break;
        case "VIOLENCE POLITIQUE":
          {
            //alert("ok");
            this.categorie = ["RESPONSABILITE CIVILE"];
          }
          break;
        case "VITALIS":
          {
            //alert("ok");
            this.categorie = ["ASSURANCE DE PERSONNES"];
          }
          break;
        case "DECES EMPRUNTEUR":
          {
            //alert("ok");
            this.categorie = ["ASSURANCE DE PERSONNES"];
          }
          break;
        case "DETOURNEMENT ET ABUS":
          {
            //alert("ok");
            this.categorie = ["DOMMAGES AUX BIENS"];
          }
          break;
        case "TOUS RISQUES SAUF":
          {
            //alert("ok");
            this.categorie = ["INCENDIE"];
          }
          break;
        case "RC ENVIRONNEMENT":
          {
            //alert("ok");
            this.categorie = ["RESPONSABILITE CIVILE"];
          }
          break;
        case "RC AERONEF":
          {
            //alert("ok");
            this.categorie = ["RESPONSABILITE CIVILE"];
          }
          break;
        case "RC AVIATION":
          {
            //alert("ok");
            this.categorie = ["RESPONSABILITE CIVILE"];
          }
          break;
        case "RC MEDICALE":
          {
            //alert("ok");
            this.categorie = ["RESPONSABILITE CIVILE"];
          }
          break;
        case "RC DES DIRIGEANTS SOCIAUX":
          {
            //alert("ok");
            this.categorie = ["RESPONSABILITE CIVILE"];
          }
          break;
        case "RC PROFESSIONNELLE":
          {
            //alert("ok");
            this.categorie = ["RESPONSABILITE CIVILE"];
          }
          break;
        case "TOUS RISQUES INFORMATIQUES":
          {
            //alert("ok");
            this.categorie = ["DOMMAGES AUX BIENS"];
          }
          break;
      }
    },
  },
  methods: {
    ...mapActions(["getCompanies", "getProducts"]),

    closeContract() {
      this.$emit("closeDialog");
    },
    async saveContract() {
      this.loading = true;
      try {
        if (this.modal.contractEstablished == "OUI") {
          this.valueAdd = true;
        } else {
          this.valueAdd = false;
        }
        if (this.modal.TTCPrime) {
          this.valeurPrime = this.modal.TTCPrime;
        } else if (this.modal.totalPrime) {
          this.valeurPrime = this.modal.totalPrime;
        }
        const schema = {
          policeNumber: this.modal.policeNumber,
          plugged: this.modal.plugged,
          actionType: this.modal.actionType,
          category: this.modal.category,
          company: defaultMethods.getItemId(
            this.Companies.docs,
            this.modal.company
          ),
          TACAVA: this.modal.TACAVA,
          TE: this.modal.TE,
          TVA: this.modal.TVA,
          effectDate: this.modal.effectDate,
          dueDate: this.modal.dueDate,
          // paymentDate: this.modal.paymentDate,
          // commissionTTC: this.modal.commissionTTC,
          netPrime: this.modal.netPrime,
          commission: this.modal.commission,
          commissionRate: this.modal.commissionRate,
          totalPrime: this.valeurPrime,
          cdeaoPrime: this.modal.cdeaoPrime,
          observation: this.modal.observation,
          accessory100: this.modal.accessory100,
          accessory50: this.modal.accessory100 / 2,
          contractEstablished: this.valueAdd,
        };
        //  update
        if (this.modal._id) {
          await updateContract({
            schema,
            id: this.modal._id,
          });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.updatedSuccessfully("Contract")
          );
        } else {
          schema.file =
            this.modal.file && this.modal.file._id
              ? this.modal.file._id
              : this.modal.file;

          if (this.modal.quoting) schema.quoting = this.modal.quoting;
          if (this.modal.fromContract)
            schema.fromContract = this.modal.fromContract;
          // alert(JSON.stringify(schema.commission));
          await addContract({
            schema,
          });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.createdSuccessfully("Contract")
          );
        }

        this.$emit("success");
      } catch (error) {
        console.log(error);
        defaultMethods.dispatchError(this.$store);
      }
      this.loading = false;
    },
    formatNumber(item) {
      item = Object.assign({}, item);
      item = defaultMethods.arrayFieldsToInteger(item);
      this.modal = Object.assign({}, item);
    },

    async init() {
      this.loading = true;

      await this.getProducts({ name: this.searchData });
      await this.getCompanies();
      try {
        this.seedContract();

        this.seedContractOtherInfo();
        if (this.modal.contractEstablished == true) {
          this.show = true;
        } else {
          this.show = false;
        }
      } catch (error) {
        defaultMethods.dispatchError(
          this.$store,
          messages.failedToLoad("les companies")
        );
      }
      this.loading = false;
    },

    seedContract() {
      if (this.modal.isNew) {
        //alert(this.modal.company);

        this.modal.otherInfo = {};
        if (this.modal._id) {
          this.modal.fromContract = this.modal._id;
          delete this.modal._id;
          if (this.modal.quoting) delete this.modal.quoting;
        }
        if (this.modal.commission) {
          // delete this.modal.commission;
        }
        if (this.modal.paymentDate) {
          delete this.modal.paymentDate;
        }
      }
    },
    textAlertClause() {
      if (!this.modal._id) {
        this.textAlert =
          "Ce contrat sera mis en place sans clauses. Pour ajouter des clauses, veuillez vous référer à l'interface de modification de contrat.";
        this.alertClause = true;
      } else {
        if (
          this.modal.haveRegulationClause == false ||
          this.modal.havePbClause == false ||
          this.modal.haveCoinsurance == false ||
          this.modal.haveReinsurance == false
        ) {
          this.textAlert =
            "Vous avez demandé une action sur contrat sans clause êtes-vous sur de votre choix ?";
          this.alertClause = true;
        } else {
          this.saveContract();
        }
      }
    },

    seedContractOtherInfo() {
      // reinsurance default list
      if (this.modal.haveCoinsurance && this.modal.otherInfo) {
        this.reinsuranceCompanies = this.modal.otherInfo.coinsurance;
      } else {
        this.reinsuranceCompanies = [
          {
            shareRate: 100,
            company: this.modal.company,
          },
        ];
      }
      if (this.modal.otherInfo) {
        // clause regulation
        if (this.modal.otherInfo.regulationClause) {
          this.regulationClauseModal = this.modal.otherInfo.regulationClause;
        }
        // pb clause
        // clause regulation
        if (this.modal.otherInfo.pbClause) {
          this.pbClauseModal = this.modal.otherInfo.pbClause;
        }
        // coinsurance

        if (this.modal.otherInfo && this.modal.otherInfo.coinsurance) {
          this.coinsuranceModal = this.modal.otherInfo.coinsurance;
          for (let i = 0; i < this.coinsuranceModal.length; i++) {
            this.coinsuranceModal[i].company = defaultMethods.getItemName(
              this.Companies.docs,
              this.coinsuranceModal[i].company
            );
          }
        }
      }
    },
    async saveRegulation() {
      this.loading = true;
      try {
        const schema = {
          plate: this.regulationClauseModal.plate,
          reminderDate: this.regulationClauseModal.reminderDate,
          observation: this.regulationClauseModal.observation,
          companyRequestDate: this.regulationClauseModal.companyRequestDate,
          companyReturnDate: this.regulationClauseModal.companyReturnDate,
          customerRequestDate: this.regulationClauseModal.customerRequestDate,
          customerReturnDate: this.regulationClauseModal.customerReturnDate,
        };

        if (this.regulationClauseModal._id) {
          await updateRegulationClause({
            schema,
            id: this.regulationClauseModal._id,
          });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.updatedSuccessfully("Contract")
          );
          this.regulationDialog = false;
          this.init();
        } else {
          // add

          await addRegulationClause({ schema, id: this.modal._id });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.createdSuccessfully("Contract")
          );
          this.regulationDialog = false;
          this.init();
        }
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
      this.loading = false;
    },
    async savePb() {
      this.loading = true;
      try {
        const schema = {
          plate: this.pbClauseModal.plate,
          reminderDate: this.pbClauseModal.reminderDate,
          observation: this.pbClauseModal.observation,
          companyRequestDate: this.pbClauseModal.companyRequestDate,
          companyReturnDate: this.pbClauseModal.companyReturnDate,
          customerRequestDate: this.pbClauseModal.customerRequestDate,
          customerReturnDate: this.pbClauseModal.customerReturnDate,
        };

        if (this.pbClauseModal._id) {
          // update
          await updatePbClause({
            schema,
            id: this.pbClauseModal._id,
          });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.updatedSuccessfully("Contract")
          );
          this.pbDialog = false;
          this.init();
        } else {
          // add

          await addPbClause({ schema, id: this.modal._id });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.createdSuccessfully("Contract")
          );
          this.pbDialog = false;
          this.init();
        }
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
      this.loading = false;
    },
    validReinsuranceData(array) {
      const result = [];
      let totalRate = 0;

      const companyList = [];
      for (let i = 0; i < array.length; i++) {
        const item = array[i];

        // body validation

        // rate
        totalRate += Number(item.shareRate);

        // company
        if (companyList.includes(item.name))
          return {
            success: false,
            message: `Le nom ${item.name} a été dupliquer`,
          };

        companyList.push(item.name);

        result.push({
          shareRate: item.shareRate,
          name: item.name,
          isPayed: item.isPayed == "OUI" ? true : false,
          cedePrime: item.cedePrime,
        });
      }

      if (totalRate !== 100)
        return {
          success: false,
          message: `Le taux de partage total doit être de 100, j'ai obtenu  ${totalRate}`,
        };

      return {
        success: true,
        data: result,
      };
    },
    async saveReinsurance() {
      const result = this.validReinsuranceData(this.reinsurers);
      if (!result.success)
        return defaultMethods.dispatchError(this.$store, result.message);

      const schema = {
        insurer: this.reinsuranceModal.insurer,
        preservePrime: this.reinsuranceModal.preservePrime,
        observation: this.reinsuranceModal.observation,
        reinsurer: result.data,
      };

      try {
        this.loading = true;

        if (this.reinsuranceModal._id) {
          // update
          await updateReinsurance({
            schema,
            id: this.reinsuranceModal._id,
          });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.updatedSuccessfully("réassurance")
          );
          this.reinsuranceSecondDialog = false;
          this.init();
        } else {
          // add
          await addReinsurance({
            schema,
            id: this.modal._id,
          });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.createdSuccessfully("réassurance")
          );
          this.reinsuranceSecondDialog = false;
          this.init();
        }
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
      this.loading = false;
    },
    async startReinsurance(item) {
      this.reinsuranceModal = {};
      this.reinsuranceModal.insurer = defaultMethods.getItemId(
        this.Companies.docs,
        item.company
      );
      this.reinsurers = [
        {
          name: "",
          cedePrime: 0,
          shareRate: 0,
          isPayed: "NON",
        },
      ];
      try {
        this.loading = true;

        if (this.reinsuranceModal.insurer) {
          let data = await getReinsurance({
            contract: this.modal._id,
            insurer: this.reinsuranceModal.insurer,
          });

          data = data.data;
          if (data != null) {
            this.reinsuranceModal = {
              _id: data._id,
              preservePrime: data.preservePrime,
              observation: data.observation,
              insurer: data.insurer,
            };

            const result = [];
            for (let i = 0; i < data.reinsurer.length; i++) {
              const reinsurer = data.reinsurer[i];
              result.push({
                shareRate: reinsurer.shareRate,
                name: reinsurer.name,
                cedePrime: reinsurer.cedePrime,
                isPayed: reinsurer.isPayed == true ? "OUI" : "NON",
                _id: reinsurer._id,
              });
            }
            this.reinsurers = result;
          }
        }

        this.reinsuranceSecondDialog = true;
      } catch (error) {
        console.log(error);
        defaultMethods.dispatchError(this.$store);
      }
      this.loading = false;
    },

    addReinsurer() {
      if (!Array.isArray(this.reinsurers)) this.reinsurers = [];
      this.reinsurers.push({
        name: "",
        cedePrime: 0,
        shareRate: 0,
        isPayed: "NON",
      });
    },
    removeFromReinsurer(id) {
      // id -= 1;
      this.reinsurers.splice(id, 1);
    },

    async saveCoinsurance() {
      this.loading = true;
      try {
        // we need validate data
        const result = this.validCoinsuranceData(this.coinsuranceModal);
        if (!result.success)
          return defaultMethods.dispatchError(this.$store, result.message);

        const schema = {
          data: result.data,
        };
        if (this.coinsuranceModal[0]._id) {
          // update
          await updateCoinsurance({
            schema,
            id: this.modal._id,
          });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.updatedSuccessfully("coassurance")
          );
          this.coinsuranceDialog = false;
          this.init();
        } else {
          // add
          await addCoinsurance({
            schema,
            id: this.modal._id,
          });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.createdSuccessfully("coassurance")
          );
          this.coinsuranceDialog = false;
          this.init();
        }
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
      this.loading = false;
    },
    // coinsurance
    seedCoinsuranceCompanyNameList() {
      this.coinsuranceCompanyNameList = defaultMethods.getNameList(
        this.Companies.docs
      );
    },
    updateCoinsuranceCompanyNameList() {
      // seed
      this.seedCoinsuranceCompanyNameList();
      for (let a = 0; a < this.coinsuranceModal.lenght; a++) {
        const coinsurance = this.coinsuranceModal[a];
        for (let i = 0; i < this.coinsuranceCompanyNameList.lenght; i++) {
          console.log(coinsurance.company, this.coinsuranceCompanyNameList[i]);
          if (coinsurance.company == this.coinsuranceCompanyNameList[i])
            this.coinsuranceCompanyNameList.splice(i, 1);
        }
      }
    },
    validCoinsuranceData(array) {
      const result = [];
      let totalRate = 0;

      const companyList = [];
      for (let i = 0; i < array.length; i++) {
        const item = array[i];

        // body validation

        // rate
        totalRate += Number(item.shareRate);

        // company
        if (companyList.includes(JSON.stringify(item.company)))
          throw new Error(
            `Duplicate company id  :${item.company} for coinsurance`
          );
        companyList.push(JSON.stringify(item.company));

        // get company id
        (item.company = defaultMethods.getItemId(
          this.Companies.docs,
          item.company
        )),
          result.push({
            shareRate: item.shareRate,
            company: item.company,
            isPayed: item.isPayed,
            observation: item.observation,
          });
      }

      if (totalRate !== 100)
        return {
          success: false,
          message: `Le taux partage total doit être de 100, j'ai obtenu ${totalRate}`,
        };

      return {
        success: true,
        data: result,
      };
    },
    addOneCoinsurance() {
      this.coinsuranceModal.push({});
    },
    removeFromCoin(id) {
      // id -= 1;
      this.coinsuranceModal.splice(id, 1);
      this.seedCoinsuranceCompanyNameList();
    },
    closeClause() {
      this.regulationDialog = false;
      this.pbDialog = false;
      this.coinsuranceDialog = false;
      this.reinsuranceDialog = false;
    },
    seed50Accessory() {
      if (this.modal.accessory100 && Number(this.modal.accessory100) > 0) {
        this.modal.accessory50 = this.modal.accessory100 / 2;
      }
    },
    closeInsurance() {
      this.coinsuranceDialog = false;
      // this.currentProduct = null;
      this.contractDialog = false;

      this.coinsuranceModal = [
        {
          shareRate: 0,
          company: "",
          observation: "",
        },
      ];
      this.seedCoinsuranceCompanyNameList();
    },
  },
};
</script>

<style></style>
