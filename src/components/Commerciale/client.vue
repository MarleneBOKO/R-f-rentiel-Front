<template>
  <v-container fluid>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :loading="loading ? '#061a40' : null"
      :items="statClient"
      item-key="name"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Listing des clients</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <!-- <v-switch
            v-model="showAllFil"
            label="Afficher toutes les données"
            color="#061a40"
            @change="showAllFillData"
            class="pt-5"
          ></v-switch>
          <v-switch
            v-model="showYearFil"
            label="afficher les données de l'année "
            color="#061a40"
            @change="showAllFillData"
            class="ml-10 pt-5"
          ></v-switch> -->
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container fluid>
          <v-expansion-panels flat style="border: 1px solid #061a40">
            <v-expansion-panel class="elevation-0">
              <v-expansion-panel-header>
                Tri / Recherche et importation vers excel ...
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-text-field
                    color="#061a40"
                    label="Nom / Raison Sociale ..."
                    class="pt-5 pa-2"
                    filled
                    prepend-inner-icon="mdi-magnify"
                    dense
                    v-model="fileName"
                    outlined
                    flat
                    background-color="grey lighten-4"
                    rounded
                  ></v-text-field>
                  <!-- <v-text-field
                    color="#061a40"
                    label="Date d'enregistrement début"
                    class="pt-5 pa-2"
                    filled
                    v-model="startDate"
                    prepend-inner-icon="mdi-magnify"
                    dense
                    type="date"
                    outlined
                    flat
                    background-color="grey lighten-4"
                    rounded
                  ></v-text-field> -->
                  <v-text-field
                    color="#061a40"
                    label="Date obtention état client"
                    class="pt-5 pa-2"
                    filled
                    v-model="endDate"
                    prepend-inner-icon="mdi-magnify"
                    dense
                    type="date"
                    outlined
                    flat
                    background-color="grey lighten-4"
                    rounded
                  ></v-text-field>
                </v-row>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="#061a40"
                    outlined
                    pill
                    rounded
                    class="mr-2"
                    @click="onEnter"
                  >
                    <v-icon left>
                      mdi-magnify
                    </v-icon>
                    Appliquer la recherche
                  </v-btn>

                  <v-btn
                    color="#1D6F42"
                    rounded
                    class="white--text pa-5"
                    :href="statFileClient"
                    target="_blank"
                  >
                    <v-icon size="30" class="mr-8" color="#fff" left>
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
    </v-data-table>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { defaultMethods, messages } from "@/utils/data";
import { importDataExcel } from "../../exportDoc/index.js";
export default {
  name: "chartClient",
  data() {
    return {
      singleSelect: false,
      loading: false,
      selected: [],
      headers: [
        {
          text: "Nom / Raison sociale",
          align: "start",
          width: "200px",
          sortable: false,
          value: "name",
        },
        { text: "Nature du prospect", width: "200px", value: "nature" },
        { text: "Date d'anniversaire", width: "200px", value: "birthdayFr" },
        { text: "Contacts", width: "200px", value: "phone" },
        { text: "Situation géographique", width: "200px", value: "location" },
        { text: "Activité", width: "200px", value: "activityField" },
        { text: "Prime TTC", width: "200px", value: "totalPrime" },
        { text: "Prime Nette", width: "200px", value: "netPrime" },

        {
          text: "Date souscription",
          width: "200px",
          value: "becomeCustomerAt",
        },
        { text: "Nom de l'agent", width: "200px", value: "agentName" },
      ],
      workSheetColumnName: [
        "Nom / Raison sociale",
        "Nature",
        "Contacts",
        "Date d'anniversaire",
        "Activité",
        "Situation géographique",
        "Prime Nette",
        "Prime TTC",
        "Nom de l'agent",
      ],
      workSheetName: "Rapport Statistique des client",
      nombre: "client",
      users: [],
    };
  },
  mounted() {
    this.initStatClient();
  },
  computed: {
    ...mapGetters(["statClient", "statFileClient"]),
  },
  watch: {
    statClient() {
      this.companyNameList = defaultMethods.getNameList(this.Companies.docs);
      this.seedCoinsuranceCompanyNameList();
    },
  },
  methods: {
    importData() {
      //console.log(this.statCall);
      this.users = this.statClient;

      importDataExcel(
        this.workSheetColumnName,
        this.workSheetName,
        this.nombre,
        this.users
      );
    },
    onEnter: function() {
      this.initStatClient();
    },
    showAllFillData() {
      this.initStatClient();
      //alert(this.showAllFil);
    },
    ...mapActions(["getStateClient"]),
    async initStatClient() {
      this.loading = true;
      try {
        await this.getStateClient({
          fileName: this.fileName,
          // periodStartDate: this.startDate,
          periodEndDate: this.endDate,
          withoutPeriod: this.showAllFil,
          currentYear: this.showYearFil,
        });
      } catch (error) {
        defaultMethods.dispatchError(
          this.$store,
          messages.failedToLoad("les dossiers")
        );
      }
      this.loading = false;
    },
  },
};
</script>
