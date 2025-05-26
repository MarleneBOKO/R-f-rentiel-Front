<template>
  <v-container fluid>
    <v-data-iterator
      :items="statRecap"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
      :loading="loading ? '#061a40' : null"
    >
      <template v-slot:header>
        <v-container fluid>
          <v-expansion-panels flat style="border: 1px solid #061a40">
            <v-expansion-panel class="elevation-0">
              <v-expansion-panel-header>
                Tri / Recherche et importation vers excel ...
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="12" md="3">
                    <v-select
                      :items="companyNameList"
                      class="pt-5 pa-2"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      dense
                      outlined
                      v-model="company"
                      @change="showAllFillData"
                      flat
                      background-color="grey lighten-4"
                      rounded
                      label="Compagnie ..."
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select
                      :items="productNameList"
                      class="pt-5 pa-2"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      dense
                      v-model="productList"
                      outlined
                      multiple
                      @change="showAllFillData"
                      flat
                      background-color="grey lighten-4"
                      rounded
                      label="Produit..."
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      color="#061a40"
                      label="Date de début récap"
                      class="pt-5 pa-2"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      dense
                      v-model="startDate"
                      outlined
                      type="date"
                      hide-details
                      @change="showAllFillData"
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      color="#061a40"
                      label="Date fin récap"
                      class="pt-5 pa-2"
                      filled
                      prepend-inner-icon="mdi-magnify"
                      type="date"
                      dense
                      v-model="endDate"
                      @change="showAllFillData"
                      outlined
                      hide-details
                      flat
                      background-color="grey lighten-4"
                      rounded
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" md="3">
                    <template v-if="$vuetify.breakpoint.mdAndUp">
                      <span
                        class="mr-4
            "
                        color="#061a40"
                      >
                        Compagnie {{ page }} / {{ numberOfPages }}
                      </span>
                      <v-btn-toggle v-model="sortDesc" mandatory>
                        <v-btn
                          color="#fff"
                          elevation="1"
                          rounded
                          class="mr-1"
                          @click="formerPage"
                        >
                          <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn
                          color="#fff"
                          elevation="1"
                          rounded
                          class="ml-1"
                          @click="nextPage"
                        >
                          <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                      </v-btn-toggle>
                    </template>
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
                    :href="statFileRecap"
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

      <template v-slot:default="props">
        <v-row>
          <v-col v-for="item in props.items" :key="item.name" cols="12">
            <v-card elevation="0" class="mt-5 mb-5" cols="12" md="6">
              <v-row>
                <v-card-title
                  style="color:#061a40"
                  class="subheading  font-weight-bold"
                >
                  {{ item.name }}
                </v-card-title>
                <v-card-title
                  style="color:#061a40"
                  class="subheading  font-weight-bold"
                >
                  Chiffre d'affaires:{{ item.turnover }}
                </v-card-title>
                <!-- <v-switch
                  v-model="showAllFil"
                  label="Afficher toutes les données"
                  color="#061a40"
                  @change="showAllFillData"
                ></v-switch>
                <v-switch
                  v-model="showAllYearFil"
                  class="ml-5"
                  label="Afficher les données de l'année en cours"
                  color="#061a40"
                  @change="showAllFillData"
                ></v-switch> -->
                <v-spacer></v-spacer>
              </v-row>
              <v-divider></v-divider>
              <v-list style="background:#061a40; ">
                <v-list-item class="white--text" style="font-weight:bolder;">
                  <v-list-item-content>Nom du produit</v-list-item-content>
                  <v-list-item-content>Prime nette</v-list-item-content>
                  <v-list-item-content>Prime TTC</v-list-item-content>
                  <v-list-item-content>Commission</v-list-item-content>
                  <v-list-item-content
                    >Coût de police 100 %</v-list-item-content
                  >
                </v-list-item>
              </v-list>
              <v-divider></v-divider>

              <v-list dense>
                <v-list-item v-for="(key, index) in item.products" :key="index">
                  <v-list-item-content
                    :class="{ '#061a40--text': sortBy === key }"
                  >
                    {{ key.product }}:
                  </v-list-item-content>
                  <v-list-item-content
                    class="align-end"
                    :class="{ 'indigo--text': sortBy === key }"
                  >
                    {{ key.netPrime }}
                  </v-list-item-content>
                  <v-list-item-content
                    class="align-end"
                    :class="{ 'indigo--text': sortBy === key }"
                  >
                    {{ key.cdeaoPrime }}
                  </v-list-item-content>
                  <v-list-item-content
                    class="align-end"
                    :class="{ 'indigo--text': sortBy === key }"
                  >
                    {{ key.commission }}
                  </v-list-item-content>
                  <v-list-item-content
                    class="align-end"
                    :class="{ 'indigo--text': sortBy === key }"
                  >
                    {{ key.accessory100 }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="#061a40"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { defaultMethods, messages } from "@/utils/data";
export default {
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      loading: false,
      page: 1,
      productNameList: [],
      companyNameList: [],
      itemsPerPage: 1,
      sortBy: "",
      labels: [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Aout",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ],
      value: [200, 675, 410, 390, 310, 460, 250, 240, 240, 240, 240, 240],
    };
  },
  mounted() {
    this.initStatRecap();
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.statRecap.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.productNameList.filter((key) => key !== "Name");
    },

    ...mapGetters(["statRecap", "Companies", "Products", "statFileRecap"]),
  },
  watch: {
    statCall() {},
    Companies() {
      this.companyNameList = defaultMethods.getNameList(this.Companies.docs);
      // this.seedCoinsuranceCompanyNameList();
    },
    Products() {
      // alert('ok')
      this.productNameList = defaultMethods.getNameList(this.Products.docs);
    },
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    ...mapActions(["getStateRecap", "getCompanies", "getProducts"]),
    showAllFillData() {
      this.initStatRecap();
      //alert(this.showAllFil);
    },
    onEnter: function() {
      this.initStatRecap();
    },
    async initStatRecap() {
      this.loading = true;
      try {
        await this.getStateRecap({
          withoutPeriod: this.showAllFil,
          currentYear: this.showAllYearFil,
          periodStartDate: this.startDate,
          periodEndDate: this.endDate,
          company: this.company,
          products: JSON.stringify(this.productList),
        });
        await this.getProducts({ name: this.searchData });
        await this.getCompanies();
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
