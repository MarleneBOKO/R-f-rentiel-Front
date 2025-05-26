<template>
  <div>
    <v-stepper style="border-top: 10px solid #061a40" v-model="e1">
      <v-stepper-header>
        <v-stepper-step color="#061a40" :complete="e1 > 1" step="1">
          Demande de cotation
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step color="#061a40" :complete="e1 > 2" step="2">
          Gestionnaire de fichiers précédemment joint a la cotation
        </v-stepper-step>
        <v-divider></v-divider>
      </v-stepper-header>
      <!-- {{ warrantyModal }} -->
      <!-- {{ categoriesSubPartItems }} -->
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card elevation="0" class="mb-12">
            <h2 class="mt-2 mb-5">
              Formuler une demande de cotation à l'endroit des compagnies
              Sélectionnées
            </h2>

            <v-row align="center">
              <!-- <v-row
              class="ml-1 mr-1"
              v-for="(listCompagnie, k) in compagnieSelect"
              :key="k"
            >
              <v-col cols="12" md="1">
                <v-btn
                  class="mx-2"
                  @click="remove(k)"
                  fab
                  dark
                  small
                  color="error"
                  v-show="k || (!k && compagnieSelect.length > 1)"
                >
                  <v-icon dark>
                    mdi-progress-close
                  </v-icon>
                </v-btn></v-col
              >
              <v-col cols="12" md="5">
                <v-select
                  v-model="listCompagnie.compagnie"
                  :items="companyNameList"
                  attach
                  @change="showAgentList(listCompagnie.compagnie)"
                  chips
                  color="#061a40"
                  label=" Sélectionnées la compagnie"
                ></v-select>
              </v-col>
              <v-col cols="12" md="5">
                <v-combobox
                  v-model="listCompagnieAgent"
                  :items="agentNameList"
                  color="#061a40"
                  @change="selectagentList(listCompagnieAgent)"
                  label="Sélectionnées les agents de la compagnie"
                  multiple
                  chips
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :key="JSON.stringify(data.item)"
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      :disabled ="data.disabled "
                      @click:close="data.parent.selectItem(data.item)"
                    >
                      <v-avatar
                        class="accent white--text"
                        left
                        v-text="data.item.slice(0, 1).toUpperCase()"
                      ></v-avatar>
                      {{ data.item }}
                    </v-chip>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="12" md="1">
                <v-btn
                  class="mx-2"
                  @click="add(k)"
                  fab
                  dark
                  small
                  v-show="k == compagnieSelect.length - 1"
                  color="#061a40"
                >
                  <v-icon dark>
                    mdi-plus-circle-outline
                  </v-icon>
                </v-btn></v-col
              >
            </v-row> -->
              <v-col cols="12" md="6">
                <v-select
                  v-model="quotingModal.companies"
                  :items="companyNameList"
                  attach
                  @change="showAgentList(quotingModal.companies)"
                  chips
                  multiple
                  color="#061a40"
                  label=" Sélectionnées la compagnie"
                >
                  <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index === 0">
                      <span>{{ item }}</span>
                    </v-chip>
                    <span v-if="index === 1" class="grey--text text-caption">
                      (+{{ quotingModal.companies.length - 1 }} Autres
                      compagnies)
                    </span>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-combobox
                  v-model="quotingModal.listCompagnieAgent"
                  :items="agentNameList"
                  color="#061a40"
                  @change="selectagentList(quotingModal.listCompagnieAgent)"
                  label="Sélectionnées les agents de la compagnie"
                  multiple
                  chips
                >
                  <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index === 0">
                      <span>{{ item }}</span>
                    </v-chip>
                    <span v-if="index === 1" class="grey--text text-caption">
                      (+{{ quotingModal.listCompagnieAgent.length - 1 }} Autres
                      Agents)
                    </span>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="quotingModal.title"
                  label="Objet du mail"
                ></v-text-field>
              </v-col>
              <v-col cols="6" md="6">
                <v-file-input
                  chips
                  v-model="quotingModal.files"
                  counter
                  multiple
                  show-size
                  small-chips
                  label="Ajouter les fichiers joints au mail"
                  truncate-length="50"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <quill-editor
                  ref="editor"
                  v-model="quotingModal.observation"
                  class="mt-5"
                  label="Corps du mail"
                  outlined
                  :options="editorOption"
                />
              </v-col>
              <!-- <v-col cols="12" md="12">
                <v-textarea
                  outlined
                  v-model="quotingModal.observation"
                  name="input-7-4"
                  label="Corps du mail"
                  value=""
                ></v-textarea>
              </v-col> -->
            </v-row>
          </v-card>
          <v-card-actions>
            <v-btn
              color="warning"
              rounded
              outlined
              pill
              style="margin-right:20px"
              @click="e1 += 1"
            >
              Gestionnaire de fichiers
            </v-btn>
            <v-btn
              color="success"
              rounded
              outlined
              pill
              style="margin-right:20px"
              @click="alertClause = true"
            >
              FIN DE FORMULATION DE LA COTATION
            </v-btn>
          </v-card-actions>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card
            elevation="0"
            style="overflow-y: scroll"
            height="500px"
            class="mb-12"
          >
            <v-item-group multiple>
              <v-container>
                <v-row>
                  <v-col v-for="n in filesListe" :key="n" cols="12" md="4">
                    <v-item>
                      <v-card class="d-flex align-center" height="200">
                        <v-card-text style="height: 100px; position: relative">
                          <h4 style="text-align: center;">
                            {{ n.name }}
                          </h4>
                          <v-fab-transition>
                            <v-btn
                              color="#061a40"
                              :href="n.url"
                              target="_blank"
                              dark
                              absolute
                              route
                              bottom
                              right
                              fab
                            >
                              <v-icon target="_blank" route :href="n.url"
                                >mdi-download</v-icon
                              >
                            </v-btn>
                          </v-fab-transition>
                        </v-card-text>
                      </v-card>
                    </v-item>
                  </v-col>
                </v-row>
              </v-container>
            </v-item-group>
          </v-card>
          <v-btn
            color="warning"
            rounded
            outlined
            pill
            style="margin-right:20px"
            @click="e1 -= 1"
          >
            Retour à la demande de cotation
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <v-dialog v-model="alertClause" persistent max-width="500px">
      <v-card style="border-top: 10px solid red">
        <v-card-title class="text-h5">
          Alerte : Mise en place cotation
        </v-card-title>
        <v-card-text>
          <v-col cols="12" sm="12">
            <v-select
              :items="['NON', 'OUI']"
              v-model="quotingModal.sendEmailToCompanies"
              label="ENVOYER LA COTATION AUX COMPAGNIES"
              outlined
            ></v-select>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="warning"
            class="mr-20"
            text
            @click="alertClause = false"
          >
            Retour
          </v-btn>
          <v-btn
            color="error"
            class="ml-20"
            :loading="loading"
            @click="sendWarrenty"
          >
            METTRE EN PLACE LA COTATION
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { defaultMethods } from "@/utils/data";
import { manageWarrantyTable } from "@/api/user";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.snow.css";
export default {
  props: {
    QuotingRequestData: {
      type: Object,
      required: true,
    },
  },
  components: { quillEditor },
  data() {
    return {
      e1: 1,
      quotingModal: {},
      companyNameList: [],
      warrantyModal: [],
      categoriesItems: [],
      subWarrantiesItems: [],
      alertClause: false,
      categorySuggestion: "",
      subCategorySuggestion: "",
      warrantyCategorySuggestions: [],
      warrantyCategoryBackup: [],
      warrantyCategorySuggestionsBackup: [],
      warrantyCapitalDetailSuggestions: undefined,
      tdWith: "width:33%;",
      categoriesSubPartItems: [],
      agentNameList: [],
      agentListe: [],
      listCompagnieAgent: [],
      agentMail: [],
      loading: false,
      motsClé: "",
      filesListe: {},
      compagnieSelect: [
        {
          compagnie: "",
          compagnieAgent: [],
        },
      ],
    };
  },
  mounted() {
    this.initQuoting();
  },
  computed: {
    ...mapGetters(["Companies"]),
    subCapitalDetailWidth() {
      return this.warrantyCapitalDetailSuggestions &&
        this.warrantyCapitalDetailSuggestions.list
        ? `width:${100 / this.warrantyCapitalDetailSuggestions.list.length}%;`
        : "";
    },
  },
  watch: {
    statQuoting() {
      this.companyNameList = defaultMethods.getNameList(this.Companies);
    },
    QuotingRequest() {
      this.seedWarrantyModal();
      this.seedCapitalDetailSuggestions();
    },
    warrantyModal() {
      // this.updateWarrantyCategorySuggestion()
      this.seedCategoriesItem();
      this.seedSuggestsubWarranties();
    },
  },
  methods: {
    ...mapActions(["getCompanies"]),
    async initQuoting() {
      try {
        await this.getCompanies();
        this.QuotingRequest = this.QuotingRequestData;
        //alert(JSON.stringify(this.QuotingRequest));
        this.seedWarrantyModal();

        this.companyNameList = defaultMethods.getNameList(this.Companies.docs);
      } catch (error) {
        console.log(error);
      }
    },

    async seedWarrantyModal() {
      const result = [];

      this.warrantyCategorySuggestions = this.QuotingRequest.warrantySuggestions
        ? this.QuotingRequest.warrantySuggestions.categories
        : [];

      if (this.QuotingRequest && this.QuotingRequest.quoting) {
        const table = this.QuotingRequest.quoting;
        // seed modal
        this.quotingModal.title = table.title;
        this.quotingModal.duration = table.duration;
        this.quotingModal.annualRent = table.annualRent;
        this.quotingModal.turnover = table.turnover;
        this.quotingModal.effective = table.effective;
        this.quotingModal.quality = table.quality;
        this.quotingModal.payroll = table.payroll;
        this.quotingModal.siteType = table.siteType;
        this.quotingModal.observation = table.observation;
        this.filesListe = table.files;
        this.quotingModal.companies = defaultMethods.getItemsName(
          this.Companies.docs,
          table.companies
        );
      } else {
        const warrantySuggestions = this.warrantyCategorySuggestions;
        for (let category of warrantySuggestions) {
          const categorySchema = {
            _id: category._id,
            condition: category.name,
            subWarranties: category.subCategories,
            capital: "",
            franchise: "",
            isCategory: true,
            fromCategory: undefined,
          };
          if (
            this.QuotingRequest.warrantySuggestions &&
            this.QuotingRequest.warrantySuggestions.capitalDetail
          ) {
            categorySchema.capitalDetails = {};
          }
          result.push(categorySchema);

          for (let subCategory of category.subCategories) {
            const schema = {
              _id: undefined,
              condition: subCategory,
              capital: "",
              franchise: "",
              isCategory: false,
              fromCategory: category._id,
            };
            if (
              this.QuotingRequest.warrantySuggestions &&
              this.QuotingRequest.warrantySuggestions.capitalDetail
            ) {
              schema.capitalDetails = {};
            }
            result.push(schema);
          }
        }
      }

      this.warrantyModal = result;
    },
    seedCategoriesItem() {
      this.categoriesItems = [];
      this.warrantyCategorySuggestions = [];

      if (
        this.QuotingRequest.quoting &&
        this.QuotingRequest.quoting.warrantyTables
      ) {
        // this.warrantyCategoryBackup.push(defaultMethods.getNameList(this.QuotingRequest.quoting.warrantyTables))
        for (let item of this.warrantyCategorySuggestions) {
          this.warrantyCategoryBackup.push(item.name);
          this.warrantyCategorySuggestionsBackup.push({
            _id: item._id,
            condition: item.name,
            subWarranties: item.subCategories,
            capital: item.capital,
            franchise: item.franchise,
            isCategory: true,
            fromCategory: undefined,
          });
        }
      }
      this.categoriesSubPartItems = [];

      for (let item of this.warrantyModal)
        if (item.isCategory && item.condition && item.condition.length > 0) {
          if (this.warrantyCategoryBackup.includes(item.condition)) {
            this.warrantyCategoryBackup.splice(
              this.warrantyCategoryBackup.indexOf(item.condition),
              1
            );
            this.warrantyCategorySuggestionsBackup.splice(
              this.warrantyCategoryBackup.indexOf(item.condition),
              1
            );
          }

          this.categoriesItems.push(item.condition);
          this.categoriesSubPartItems.push(item.condition);
          this.warrantyCategorySuggestions.push(item);
        }

      this.categoriesItems = [
        ...this.categoriesItems,
        ...this.warrantyCategoryBackup,
      ];
      this.warrantyCategorySuggestions = [
        ...this.warrantyCategorySuggestions,
        ...this.warrantyCategorySuggestionsBackup,
      ];
    },
    add() {
      this.compagnieSelect.push({});
    },
    remove(index) {
      this.compagnieSelect.splice(index, 1);
    },
    addCategory() {
      const category = {
        condition: this.categorySuggestion,
        capitalDetails: {},
      };
      if (
        this.warrantyCapitalDetailSuggestions &&
        this.warrantyCapitalDetailSuggestions.list
      ) {
        for (let subCd of this.warrantyCapitalDetailSuggestions.list) {
          category.capitalDetails[subCd] = "";
        }
      }

      for (let item of this.warrantyCategorySuggestions) {
        if (this.categorySuggestion == item.condition) {
          category._id = item._id;
          category.subWarranties = item.subWarranties;
          category.capitalDetails = {};
        }
      }
      this.warrantyModal.push({
        _id: category._id,
        condition: category.condition,
        subWarranties: category.subWarranties,
        capitalDetails: category.capitalDetails ?? undefined,
        capital: "",
        franchise: "",
        isCategory: true,
        fromCategory: undefined,
      });

      this.categorySuggestion = "";
    },

    seedSuggestsubWarranties() {
      this.seedCategoriesItem();
      if (
        this.warrantyCategorySuggestions &&
        this.warrantyCategorySuggestions.length > 0
      ) {
        for (let item of this.warrantyCategorySuggestions) {
          if (item.condition && item.condition.length > 0) {
            if (item.condition == this.categorySuggestion) {
              this.subWarrantiesItems = [];
              if (item.subWarranties && item.subWarranties.length) {
                for (let sub of item.subWarranties) {
                  this.subWarrantiesItems.push(sub.condition);
                }
              }
            }
          }
        }
      }
    },
    addSubCategory() {
      let categories = [];

      for (let i in this.warrantyCategorySuggestions) {
        const item = this.warrantyCategorySuggestions[i];
        if (item.isCategory) {
          categories.push({
            index: i,
            _id: item._id,
            condition: item.condition,
            capitalDetails: item.capitalDetails,
          });
        }
      }
      for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        if (category.condition == this.categorySuggestion) {
          const details = {};
          for (let key in category.capitalDetails) {
            details[key] = "";
          }
          if (i < categories.length - 1) {
            const index = categories[i + 1].index;
            this.subCategorySuggestion;
            this.warrantyModal.splice(index, 0, {
              _id: undefined,
              condition: this.subCategorySuggestion,
              capital: "",
              capitalDetails: details,
              franchise: "",
              isCategory: false,
              fromCategory: category._id,
            });
          } else {
            this.warrantyModal.push({
              _id: undefined,
              condition: this.subCategorySuggestion,
              capital: "",
              capitalDetails: details,
              franchise: "",
              isCategory: false,
              fromCategory: category._id,
            });
          }

          this.subCategorySuggestion = "";
        }
      }
    },
    removeItem(index, isCategory) {
      if (isCategory) {
        let i = index;
        let item = this.warrantyModal[index];
        while (!item.isCategory || index == i) {
          if (item.isCategory) {
            this.warrantyCategoryBackup.push(item.condition);
            this.warrantyCategorySuggestionsBackup.push(item);
          }

          this.warrantyModal.splice(index, 1);
          item = this.warrantyModal[index];
          i++;
        }
      } else {
        // remove sub
        this.warrantyModal.splice(index, 1);
      }
    },
    getModalCapitalDetailsSchema(schema) {
      const result = {};
      for (let item of schema) {
        result[item.name] = item.value;
      }
      return result;
    },
    getCapitalDetailsSchema(schema) {
      const result = [];
      for (let key in schema) {
        result.push({
          name: key,
          value: schema[key],
        });
      }
      return result;
    },
    getWarrantySchema() {
      let i = 0;
      let item;
      const schema = [];
      while (i < this.warrantyModal.length) {
        item = this.warrantyModal[i];
        console.log(item);
        if (item.isCategory) {
          schema.push({
            condition: item.condition,
            capital: item.capital,
            franchise: item.franchise,
            capitalDetails: item.capitalDetails
              ? this.getCapitalDetailsSchema(item.capitalDetails)
              : [],
            subWarranties: [],
          });
        } else {
          schema[schema.length - 1].subWarranties.push({
            condition: item.condition,
            capital: item.capital,
            franchise: item.franchise,
            capitalDetails: item.capitalDetails
              ? this.getCapitalDetailsSchema(item.capitalDetails)
              : [],
          });
        }
        i++;
      }
      console.log("schema", schema);
      return schema;
    },

    showAgentList(items) {
      this.motsClé = items;
      this.agentListe = defaultMethods.getCompanyAgent(
        this.Companies.docs,
        this.motsClé
      );
      this.agentNameList = [];
      console.log(this.agentListe);
      for (let i = 0; i < this.agentListe.length; i++) {
        this.agentNameList.push(this.agentListe[i]);
      }
    },
    selectagentList(items) {
      //alert(items);
      this.agentMail = defaultMethods.getCompanyAgentMail(items);
    },
    async sendWarrenty() {
      this.loading = true;
      try {
        const formData = new FormData();

        if (this.quotingModal.companies) {
          formData.append(
            "companies",
            JSON.stringify(
              defaultMethods.getItemsId(
                this.Companies.docs,
                this.quotingModal.companies
              )
            )
          );
        }
        if (this.agentMail != []) {
          // alert(this.agentMail);
          formData.append("emails", this.agentMail);
        }

        // if (this.quotingModal.duration) {
        //   formData.append("duration", this.quotingModal.duration);
        // }

        // if (this.quotingModal.annualRent) {
        //   formData.append("annualRent", this.quotingModal.annualRent);
        // }
        // if (this.quotingModal.turnover) {
        //   formData.append("turnover", this.quotingModal.turnover);
        // }
        // if (this.quotingModal.effective) {
        //   formData.append("effective", this.quotingModal.effective);
        // }
        // if (this.quotingModal.quality) {
        //   formData.append("quality", this.quotingModal.quality);
        // }
        // if (this.quotingModal.payroll) {
        //   formData.append("payroll", this.quotingModal.payroll);
        // }
        // if (this.quotingModal.siteType) {
        //   formData.append("siteType", this.quotingModal.siteType);
        // }
        if (this.quotingModal.observation) {
          formData.append("observation", this.quotingModal.observation);
        }
        if (this.quotingModal.title) {
          formData.append("title", this.quotingModal.title);
        }
        if (this.quotingModal.files) {
          for (let i = 0; i < this.quotingModal.files.length; i++) {
            formData.append("files", this.quotingModal.files[i]);
          }
        }
        if (this.quotingModal.sendEmailToCompanies == "OUI") {
          formData.append(
            "sendEmailToCompanies",
            (this.quotingModal.sendEmailToCompanies = true)
          );
        } else {
          formData.append(
            "sendEmailToCompanies",
            (this.quotingModal.sendEmailToCompanies = false)
          );
        }

        // get warranty schema
        // const warrantySchema = this.getWarrantySchema();

        // formData.append("warrantyTables", JSON.stringify(warrantySchema));

        await manageWarrantyTable({
          schema: formData,
          id: this.QuotingRequest._id,
        });

        defaultMethods.dispatchSuccess(this.$store, "Success");
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
      this.alertClause = false;
      this.loading = false;
      this.$emit("closeDialog");
    },

    seedCapitalDetailSuggestions() {
      if (
        this.QuotingRequest.warrantySuggestions &&
        this.QuotingRequest.warrantySuggestions.capitalDetail
      ) {
        this.warrantyCapitalDetailSuggestions = this.QuotingRequest.warrantySuggestions.capitalDetail;

        this.tdWith = "24.75%";
      }
    },
  },
};
</script>

<style>
input {
  outline: none;
}
</style>
