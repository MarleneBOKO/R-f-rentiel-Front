<template>
  <v-container fluid>
    <v-dialog v-model="reasure" max-width="1500px">
      <v-card class="">
        <v-card-title class="">
          <div class="w-100 d-flex justify-space-between">
            <span class="text-h5">Effectuer Reassurance</span>
            <v-btn rounded @click="addOneCoinsurance">
              Ajouter compagnie à réassurer</v-btn
            >
          </div>
        </v-card-title>
        <v-card-text>
          <div v-for="(Réassurance, a) in coinsuranceModal" :key="a">
            <v-row>
              <v-col cols="1">
                <v-btn
                  @click="removeFromCoin(a)"
                  rounded
                  class="error white--text"
                >
                  -</v-btn
                >
              </v-col>
              <v-col cols="12" md="2">
                <v-select
                  :items="coinsuranceCompanyNameList"
                  @change="updateCoinsuranceCompanyNameList"
                  v-model="Réassurance.insurer"
                  label="Nom de la compagnie"
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  color="#061a40"
                  v-model="Réassurance.convergedRate"
                  label="Taux Conservé"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  color="#061a40"
                  v-model="Réassurance.preservePrime"
                  label="Prime conservée"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  color="#061a40"
                  v-model="Réassurance.observation"
                  label="Observations"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn @click="addReass" rounded color="error">
                  Ajouter Réassurance</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1"> </v-col>
              <v-col cols="11">
                <h3 class="mb-6">Ajouter une compagnie de réassurance</h3>

                <v-row>
                  <v-col cols="12" sm="3">
                    <v-text-field
                      color="#061a40"
                      v-model="reinsurer"
                      label="Réassureur"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-text-field
                      color="#061a40"
                      v-model="transferRate"
                      label="Taux de cession"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="2">
                    <v-text-field
                      color="#061a40"
                      v-model="premiumCeded"
                      label="Prime cédée"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="2">
                    <v-select
                      :items="['OUI', 'NON']"
                      @change="updateCoinsuranceCompanyNameList"
                      v-model="payment"
                      label="Paiement"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="1">
                    <v-btn rounded @click="addReassureur">
                      Ajouter Réassureur
                    </v-btn>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <h3 class="mb-3 mt-3">Réassureur pour la compagnie {{}}</h3>
                <v-divider></v-divider>

                <v-container class="grey lighten-5">
                  <v-row v-for="(item, i) in Réassurance.Réassurer" :key="i">
                    <v-col
                      cols="12"
                      sm="3"
                      class="pa-2 white"
                      v-text="item.reinsurer"
                    ></v-col>
                    <v-col
                      cols="12"
                      sm="3"
                      class="pa-2 white"
                      outlined
                      tile
                      v-text="item.transferRate"
                    ></v-col>
                    <v-col
                      cols="12"
                      sm="3"
                      class="pa-2 white"
                      outlined
                      tile
                      v-text="item.premiumCeded"
                    ></v-col>
                    <v-col
                      cols="12"
                      sm="3"
                      class="pa-2 white"
                      outlined
                      tile
                      v-text="item.payment"
                    ></v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      class="pa-2 gray"
                      outlined
                      tile
                    ></v-col>
                    <v-divider></v-divider>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
            <!-- only for update -->
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" text @click="closeInsurance">
            Retour
          </v-btn>
          <v-btn color="success darken-1" text @click="saveCoinsurance">
            Confirmer Coassurance
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  name: "reassurance",
  data: () => ({
    Réassurance: {
      insurer: "",
      preservePrime: "",
      convergedRate: "",
      observation: "",
      Réassurer: [
        {
          reinsurer: "",
          transferRate: "",
          premiumCeded: "",
          payment: "",
        },
      ],
    },
  }),
  methods: {
    addPersonnel() {
      this.Réassurance.Réassurer.push({
        reinsurer: this.reinsurer,
        transferRate: this.transferRate,
        premiumCeded: this.premiumCeded,
        payment: this.payment,
      });

      this.initPersonnelForm();
    },
    initPersonnelForm() {
      this.reinsurer = "";
      this.transferRate = "";
      this.premiumCeded = "";
      this.payment = "";
    },
  },
};
</script>
