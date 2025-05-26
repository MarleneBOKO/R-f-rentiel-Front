<template>
  <v-container fluid>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :loading="loading ? '#061a40' : null"
      :items="statRegul"
      item-key="name"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Listing des Régularisation</v-toolbar-title>
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
                  <v-col cols="12" sm="6" md="3">
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
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-select
                      :items="productNameList"
                      class="pt-5 pa-2"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      dense
                      outlined
                      v-model="product"
                      flat
                      background-color="grey lighten-4"
                      rounded
                      label="Produit"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-select
                      :items="companyNameList"
                      class="pt-5 pa-2"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      dense
                      outlined
                      v-model="company"
                      flat
                      background-color="grey lighten-4"
                      rounded
                      label="Compagnie"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      color="#061a40"
                      label="Date de début"
                      class="pt-5 pa-2"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      dense
                      type="date"
                      outlined
                      v-model="periodStartDate"
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      color="#061a40"
                      label="Date de fin"
                      class="pt-5 pa-2"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      dense
                      type="date"
                      outlined
                      v-model="periodEndDate"
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-text-field>
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
                    :href="statFileRegule"
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
  name: "chartCall",
  data() {
    return {
      singleSelect: false,
      loading: false,
      selected: [],
      headers: [
        {
          text: "N° client",
          align: "start",
          width: "90px",
          sortable: false,
          value: "customerNumber",
        },
        { text: "Nom / Raison sociale", width: "200px", value: "name" },
        { text: "compagnies", width: "200px", value: "company" },
        { text: "N° de police", width: "200px", value: "policeNumber" },
        { text: "Type d'opération", width: "200px", value: "actionType" },
        { text: "N° Avenant", width: "200px", value: "plugged" },
        { text: "Branche", width: "200px", value: "product" },
        { text: "Catégorie", width: "200px", value: "category" },
        { text: "Date Effet", width: "200px", value: "effectDateFr" },
        { text: "Date échéance", width: "200px", value: "dueDateFr" },
        {
          text: "Date Enregistrement",
          width: "200px",
          value: "recordingDateFr",
        },
        { text: "Prime nette", width: "200px", value: "netPrime" },
        { text: "Prime totale", width: "200px", value: "TTCPrime" },
        { text: "Assiette", width: "200px", value: "plate" },
        { text: "Date demande", width: "200px", value: "reminderDateFr" },
        {
          text: "Date retour compagnie",
          width: "200px",
          value: "companyReturnDateFr",
        },
        {
          text: "Date d'envoi client",
          width: "200px",
          value: "customerRequestDateFr",
        },
        { text: "Observation", width: "200px", value: "observation" },
      ],
      chartRegulation: [],
      workSheetColumnName: [
        "N° client",
        "Nom / Raison sociale",
        "compagnies",
        "N° de police",
        "Type d'opération",
        "N° Avenant",
        "Branche",
        "Catégorie",
        "Date Effet",
        "Date échéance",
        "Date Enregistrement",
        "Prime nette",
        "Prime totale",
        "Assiette",
        "Date demande",
        "Date retour compagnie",
        "Date d'envoi client",
        "Observation",
      ],
      workSheetName: "Statistique régularisation",
      nombre: "regul",
      users: [],
    };
  },
  mounted() {
    this.initStatRegul();
  },
  computed: {
    ...mapGetters(["statRegul", "Companies", "Products", "statFileRegule"]),
  },
  watch: {
    statCall() {},
  },
  methods: {
    onEnter: function() {
      this.initStatRegul();
    },
    showAllFillData() {
      this.initStatRegul();
      //alert(this.showAllFil);
    },
    importData() {
      this.users = this.statRegul;
      importDataExcel(
        this.workSheetColumnName,
        this.workSheetName,
        this.nombre,
        this.users
      );
    },
    ...mapActions(["getStateRegul", "getCompanies", "getProducts"]),
    async initStatRegul() {
      this.loading = true;
      try {
        await this.getStateRegul({
          fileName: this.fileName,
          product: this.product,
          company: this.company,
          periodStartDate: this.periodStartDate,
          periodEndDate: this.periodEndDate,
          withoutPeriod: this.showAllFil,
          currentYear: this.showYearFil,
        });

        await this.getProducts({ name: this.searchData });
        await this.getCompanies();
        this.companyNameList = defaultMethods.getNameList(this.Companies.docs);
        this.productNameList = defaultMethods.getNameList(this.Products.docs);
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
