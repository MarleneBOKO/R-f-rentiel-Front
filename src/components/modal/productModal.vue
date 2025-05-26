<!--  Pop up des produits-->
<template>
  <div>
    <v-card style="border-top: 10px solid #061a40">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <h3 class="mt-5 ml-2">Liste des produits</h3>
            <v-text-field
              color="#061a40"
              label="Recherche"
              class="pt-5 "
              filled
              prepend-inner-icon="mdi-magnify"
              dense
              v-model="searchData"
              outlined
              @change="searchDataProduct"
              flat
              background-color="grey lighten-4"
              rounded
            ></v-text-field>

            <v-data-table
              v-model="selectedProduct"
              :headers="headersProduct"
              :items="Products.docs"
              :items-per-page="5"
              item-key="name"
              show-select
            >
            </v-data-table>
            <div class="mt-5">
              <v-btn
                color="#061a40"
                rounded
                pill
                outlined
                @click="updateProposedProduct"
                ><v-icon left> mdi-pencil </v-icon>Proposer les produits
                selectionnés au Prospect</v-btn
              >
            </div>
          </v-col>

          <v-col cols="12" sm="6">
            <h3 class="mt-5 ml-2">Liste des produits proposés</h3>

            <v-data-table
              :headers="headersProposedProduct"
              :items="File.proposedProducts"
              class="mt-4"
              :items-per-page="5"
            >
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>

      <div style="flex: 1 1 auto"></div>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { defaultMethods, messages, rules } from "@/utils/data";
import {
  addCall,
  updateCall,
  addAppointment,
  // updateFile,
  updateAppointment,
  addQuoting,
  updateQuoting,
  updateContract,
  addContract,
  addIncorporation,
  withdrawProspect,
  addRegulationClause,
  updateRegulationClause,
  addPbClause,
  updatePbClause,
  addCoinsurance,
  updateCoinsurance,
  createQuotingRequest,
  updateQuotingRequest,
} from "@/api/user.js";
import { updateFile } from "@/api/admin.js";
export default {
  name: "callModalComponent",
  components: {},
  props: {
    rdvRequest: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      defaultMethods,
      reminderMenu: false,
      companyRequestMenu: false,
      companyReturnMenu: false,
      customerRequestMenu: false,
      customerReturnMenu: false,
      rules,
      switch1: true,
      panel: [],
      tab: null,
      garantietitre: [
        {
          tab: "RESPONSABILITE CIVILE CHEF D'ENTREPRISE",
          content: "Tab 1 Content",
        },
        { tab: "MULTIRISQUE PROFESSIONNELLE", content: "Tab 2 Content" },
        { tab: "GLOBAL DE BANQUE BOA", content: "Tab 3 Content" },
        { tab: "MULTIRISQUE HABITATION", content: "Tab 4 Content" },
        { tab: "TRC", content: "Tab 5 Content" },
        { tab: "IND", content: "Tab 6 Content" },
      ],
      items: ["NSIA", "SANLAM", "SAHAM", "ATLANTIQUE ASSURANCE"],
      link: [
        {
          text: "Prospection",
          disabled background-color="#4DD0E1": false,
          href: "/prospection",
        },
        {
          text: "Gestion dossier",
          disabled background-color="#4DD0E1": true,
          href: "breadcrumbs_link_1",
        },
      ],
      natureprospect: ["Physics", "Entreprise"],
      quotingProduct: "",
      focus: "",
      focuss: "",
      search: "",
      events: [],
      type: "month",
      types: "month",
      typeToLabel: {
        month: "Month",
        week: "Week",
        day: "Day",
        "4day": "4 Days",
      },
      select: "",
      selectedEvent: {},
      selectedElement: null,

      selectedOpen: false,
      colors: ["red"],
      names: ["Appel"],
      colorss: ["green"],
      namess: ["Rendez vous"],
      categories: ["John Smith"],
      addgarantie: false,
      returnDate: false,
      dialog: false,
      callDialog: false,
      appointmentAddDialog: false,
      appointmentDialog: false,
      productDialog: false,
      quotingDialog: false,
      garantie: false,
      contractDialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      quotingModal: {},
      prospect: false,
      dialogDelete: false,
      categoriegarantie: [
        {
          titreCatégorie: "I- Responsabilité Civile Exploitation",
          value1: "",
          value2: "",
          Souscategoriegarantie: [
            {
              titreCatégorie: "domage",
              value1: "",
              value2: "",
            },
            {
              titreCatégorie: "domage",
              value1: "",
              value2: "",
            },
          ],
        },
        {
          titreCatégorie: "II- Responsabilité Civile Professionnelle",
          value1: "",
          value2: "",
          Souscategoriegarantie: [
            {
              titreCatégorie: "Domage1",
              value1: "",
              value2: "",
            },
          ],
        },
        {
          titreCatégorie: "III- Défense et Recours",
          value1: "10 000 000",
          value2: "Néant",
        },
      ],
      produitsugest: [
        {
          text: " Liste des produits",
          value: "name",
        },
      ],
      produittake: [
        {
          text: "Liste des produits Proposer",
          value: "nom",
        },
      ],

      headers: [
        {
          text: "Nom et Prénoms ",
          align: "start",
          sortable: false,
          value: "fullName",
        },
        { text: "Contact", value: "contact" },
        { text: "Mail", value: "email" },
        { text: "Date d'anniversaire", value: "birthday" },
        { text: "Type d'influence", value: "affluenceType" },

        // { text: "Actions", value: "actions", sortable: false },
      ],
      listproduit: [
        {
          name: "Cart d'identité",
        },
        {
          name: "permis de conduit",
        },
        {
          name: "Atestation de residence",
        },
      ],
      prospectdata: [],
      test: ["name"],
      editedIndex: -1,
      editedItem: {
        nom: "",
        Nature: "",
        Contact: "",
        Activité: "",
        Mail: "",
        Anniverssaire: "",
        Localisation: "",
      },
      defaultItem: {
        nom: "",
        Nature: "",
        Contact: "",
        Activité: "",
        Mail: "",
        Anniverssaire: "",
        Localisation: "",
      },
      incorporationDialog: false,
      withDrawModal: false,
      coinsuranceDialog: false,
      reasure: false,
      CotationDialog: false,
      returnCompagn: false,
      regulationDialog: false,
      pbDialog: false,

      email: "",
      emailRules: [
        (v) => !!v || "E-mail is ",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      callModal: {},
      appointmentModal: {},
      itemsDone: [
        {
          text: "Oui",
          value: true,
        },
        {
          text: "Non",
          value: false,
        },
      ],
      appointmentEvents: [],
      loading: false,
      valid: false,
      testMail: [],
      firstName: "",
      UserNames: [],

      headersProduct: [
        {
          text: "Nom du produit",
          align: "start",
          sortable: false,
          value: "name",
        },
        //  { text: "Abréviation", value: "acronym" },
        // { text: "Description", value: "description" },
        // { text: "Demande de cotation", value: "quotingRequest", sortable: false },
      ],
      cotingHeaders: [
        {
          text: "Nom du produit",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Date demande cotation", value: "acronym" },
        { text: "Date retour demande cotation", value: "description" },
        { text: "Date envoi client", value: "quotingRequest", sortable: false },
        { text: "Date retour client", value: "customerReturnDate" },
        { text: "Statut", value: "customerReturnDate" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      headersProposedProduct: [
        {
          text: "Nom du produit",
          align: "start",
          sortable: false,
          value: "name",
        },
        //{ text: "Abréviation", value: "acronym" },
        // { text: "Description", value: "description" },
        //{ text: "Demande de cotation", value: "quotingRequest", sortable: false },
        //{ text: "Date retour client", value: "customerReturnDate" },
        //{ text: "Actions", value: "actions", sortable: false },
      ],
      selectedProduct: {},
      selectedProductContract: {},
      currentProduct: null,

      proposedProductNameList: [],
      companyNameList: [],
      coinsuranceCompanyNameList: [],
      CommercialNameList: [],
      userNameList: [],
      prospectsNameList: [],

      contractModal: {
        accessory100: 0,
        accessory50: 0,
      },
      incorporationModal: {},
      regulationClauseModal: {
        reminderDate: "",
        companyRequestDate: "",
        companyReturnDate: "",
        customerRequestDate: "",
        customerReturnDate: "",
      },
      pbClauseModal: {
        reminderDate: "",
        companyRequestDate: "",
        companyReturnDate: "",
        customerRequestDate: "",
        customerReturnDate: "",
      },

      coinsuranceModal: [
        {
          shareRate: 0,
          company: "",
          observation: "",
        },
      ],
      proposedProductId: null,
      usersEmail: [],
    };
  },

  mounted() {
    this.initFile();

    this.$refs.calendar.checkChange();
    this.$refs.calendars.checkChange();
  },
  computed: {
    ...mapGetters([
      "File",
      "Products",
      "Companies",
      "Quoting",
      "Users",
      "Contract",
    ]),
    formTitle() {
      return this.editedIndex === -1 ? "Programmer" : "Modifier";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    File() {
      this.seedProposedProduct();

      //  prospects name liste

      this.prospectsNameList = defaultMethods.getNameList(this.File.prospects);
      // get contract
      this.seedContract();
      this.getCallEvent();
      this.getAppointmentEvent();
    },
    contractModal() {},
    Companies() {
      this.companyNameList = defaultMethods.getNameList(this.Companies.docs);
      this.seedCoinsuranceCompanyNameList();
    },
    Users() {
      this.userNameList = defaultMethods.getNameList(this.Users.docs);
    },
    Quoting() {
      if (this.Quoting && this.Quoting._id) {
        this.quotingModal = this.Quoting;
        this.quotingModal.companies = defaultMethods.getItemsName(
          this.Companies.docs,
          this.Quoting.companies
        );
      }
    },

    currentProduct() {
      if (this.currentProduct !== null) {
        // get quoting

        // get contract
        this.seedContract();
      }
    },
    Contract() {
      if (this.Contract) {
        this.contractModal = this.Contract;
        this.contractModal.company = defaultMethods.getItemName(
          this.Companies.docs,
          this.contractModal.company
        );
        this.contractModal.commercial = defaultMethods.getItemName(
          this.Users.docs,
          this.contractModal.commercial
        );

        this.contractModal.dueDate = defaultMethods.getDateFormat(
          this.contractModal.dueDate
        );
        this.contractModal.effectDate = defaultMethods.getDateFormat(
          this.contractModal.effectDate
        );
        this.contractModal.paymentDate = defaultMethods.getDateFormat(
          this.contractModal.paymentDate
        );

        if (this.Contract.otherInfo) {
          // clause regulation
          if (this.Contract.otherInfo.regulationClause) {
            this.regulationClauseModal = this.Contract.otherInfo.regulationClause;
          }

          // pb clause
          // clause regulation
          if (this.Contract.otherInfo.pbClause) {
            this.pbClauseModal = this.Contract.otherInfo.pbClause;
          }

          // coinsurance
          if (this.Contract.otherInfo.coinsurance) {
            this.coinsuranceModal = this.Contract.otherInfo.coinsurance;
            for (let i = 0; i < this.coinsuranceModal.length; i++) {
              this.coinsuranceModal[i].company = defaultMethods.getItemName(
                this.Companies.docs,
                this.coinsuranceModal[i].company
              );
            }
          }
        }
      } else {
        this.contractModal = {
          accessory100: 0,
          accessory50: 0,
        };
      }
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions([
      "getFile",
      "getProducts",
      "getCompanies",
      "getQuoting",
      "getUsers",
      "getContract",
    ]),
    initialize() {
      this.prospectdata = [
        {
          nom: "Koudenou Jean Baptiste",
          Nature: "Physique",
          Contact: "62144455 / 22335747",
          Activité: "Député",
          Mail: "Jean95@test.com",
          Localisation: "CNSAD",
          Anniverssaire: "22/08/2000",
        },
        {
          nom: "Koudenou Jean Baptiste",
          Nature: "Physique",
          Contact: "62144455 / 22335747",
          Activité: "Député",
          Mail: "Jean95@test.com",
          Localisation: "CNSAD",
          Anniverssaire: "22/08/2000",
        },
      ];
    },

    onGetConfirmQuotationRequestDate(item) {
      this.proposedProductId = item.quotingRequestId;
      this.returnDate = true;
      this.datereturne = item.quotingRequestReturnDate;
      this.customerReturnDate = item.customerReturnDate;
    },
    async onConfirmQuotationRequestDate() {
      const res = await updateQuotingRequest({
        schema: {
          returnDate: this.datereturne,
          customerReturnDate: this.customerReturnDate,
        },
        id: this.proposedProductId,
      });

      if (res.success) {
        defaultMethods.dispatchSuccess(this.$store, res.message);
        await this.getFile(this.rdvRequest);
      } else {
        defaultMethods.dispatchError(this.$store);
      }
      this.returnDate = false;
    },
    // files
    searchDataProduct() {
      this.getinitFile();
    },
    async getinitFile() {
      this.loading = true;
      try {
        //alert("ok");
        return new Promise((resolve, reject) => {
          this.getFile(this.rdvRequest._id);
          this.getProducts({ name: this.searchData })
            .then((res) => {
              resolve(true);
              console.log(res);
            })
            .catch((error) => {
              reject(error);
            });
        });
      } catch (error) {
        defaultMethods.dispatchError(
          this.$store,
          messages.failedToLoad("les dossiers")
        );
      }
      this.loading = false;
    },
    async initFile() {
      this.loading = true;
      try {
        this.File = this.rdvRequest;
        await this.getProducts({ name: this.searchData });
        await this.getCompanies();
        await this.getUsers();
      } catch (error) {
        defaultMethods.dispatchError(
          this.$store,
          messages.failedToLoad("les dossiers")
        );
      }
      this.loading = false;
    },
    closeCall() {
      this.callModal = {};
      this.callDialog = false;
    },
    // call
    async saveCall() {
      this.loading = true;
      try {
        //alert(this.callModal.assignTo);
        const schema = {
          assignTo: defaultMethods.getItemsId(
            this.Users.docs,
            this.callModal.assignTo
          ),
          reason: this.callModal.reason,
          hour: this.callModal.hour,
          date: this.callModal.date,
          returnObservation: this.callModal.returnObservation,
          done: this.callModal.done,
        };
        //alert(this.callModal._id);
        if (this.callModal._id) {
          // update ,
          await updateCall({
            schema,
            id: this.callModal._id,
          });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.updatedSuccessfully("Call")
          );
          this.closeCall();
          this.initFile();
        } else {
          // add
          // console.log(schema);
          await addCall({ schema, id: this.rdvRequest });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.createdSuccessfully("Appel")
          );
          this.closeCall();
          this.initFile();
        }
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
      this.loading = false;
    },

    // quoting request
    async makeQuotingRequest(id) {
      try {
        await createQuotingRequest({
          schema: { file: this.File._id, product: id },
        });
        defaultMethods.dispatchSuccess(
          this.$store,
          messages.createdSuccessfully("Quoting request")
        );
        this.closeProduct();
        this.initFile();
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
    },
    // quoting
    async saveQuoting() {
      this.loading = true;

      try {
        const schema = {
          companies: defaultMethods.getItemsId(
            this.Companies.docs,
            this.quotingModal.companies
          ),

          product: defaultMethods.getItemId(
            this.File.proposedProducts,
            this.currentProduct
          ),
          duration: this.quotingModal.duration,
          netPrime: this.quotingModal.netPrime,
          TTCPrime: this.quotingModal.TTCPrime,
          annualRent: this.quotingModal.annualRent,
          // dateReturnCustomer: this.quotingModal.dateReturnCustomer,
          turnover: this.quotingModal.turnover,
          effective: this.quotingModal.effective,
          quality: this.quotingModal.quality,
          payroll: this.quotingModal.payroll,
          siteType: this.quotingModal.siteType,
          observation: this.quotingModal.observation,
          file: this.File._id,
        };

        if (this.quotingModal.dateReturnCustomer) {
          schema.dateReturnCustomer = this.quotingModal.dateReturnCustomer;
        }
        if (this.quotingModal._id) {
          // update
          await updateQuoting({
            schema,
            id: this.quotingModal._id,
          });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.updatedSuccessfully("Dossier")
          );
          this.closeQuoting();
          this.initFile();
        } else {
          // add
          await addQuoting({ schema, id: this.rdvRequest });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.createdSuccessfully("Appel")
          );
          this.closeQuoting();
          this.initFile();
        }
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
      this.loading = false;
    },
    async saveQuotingRequest() {
      this.loading = true;
      try {
        const schema = {
          product: defaultMethods.getItemId(
            this.File.proposedProducts,
            this.product
          ),
          emails: defaultMethods.getItemsEmail(
            this.Users.docs,
            this.usersEmail
          ),
          observation: this.observation,
          file: this.File._id,
        };

        // add
        await createQuotingRequest({ schema });
        defaultMethods.dispatchSuccess(
          this.$store,
          messages.createdSuccessfully("Demande cotation")
        );

        this.CotationDialog = false;
        this.product = null;
        this.observation = null;
        this.CommercialNameList = null;
        this.initFile();
      } catch (error) {
        console.log(error);

        defaultMethods.dispatchError(this.$store);
      }
      this.loading = false;
    },

    closeQuoting() {
      this.quotingModal = {};
      this.quotingDialog = false;
      this.currentProduct = null;
    },
    async initQuoting() {
      try {
        this.loading = true;

        await this.getQuoting({
          product: defaultMethods.getItemId(
            this.File.proposedProducts,
            this.currentProduct
          ),
        });
        this.loading = false;
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
    },
    all() {
      this.panel = [...Array(this.items.length).keys()].map((k, i) => i);
    },

    select_value() {
      // get quoting
      this.initQuoting();
      // get guarentie
      // get contract
    },

    // contract
    async seedContract() {
      this.loading = true;
      try {
        if (this.File && this.File._id && this.currentProduct) {
          await this.getContract({
            id: this.File._id,
            product: defaultMethods.getItemId(
              this.File.proposedProducts,
              this.currentProduct
            ),
          });
        } else {
          this.Contract = {};
          this.contractModal = {};
        }
      } catch (error) {
        defaultMethods.dispatchError(
          this.$store,
          messages.failedToLoad("les dossiers")
        );
      }
      this.loading = false;
    },
    seed50Accessory() {
      if (
        this.contractModal.accessory100 &&
        Number(this.contractModal.accessory100) > 0
      ) {
        this.contractModal.accessory50 = this.contractModal.accessory100 / 2;
      }
    },
    async saveContract() {
      this.loading = true;
      try {
        const schema = {
          policeNumber: this.contractModal.policeNumber,
          plugged: this.contractModal.plugged,
          category: this.contractModal.category,
          company: defaultMethods.getItemId(
            this.Companies.docs,
            this.contractModal.company
          ),
          commercial: defaultMethods.getItemId(
            this.Users.docs,
            this.contractModal.commercial
          ),
          effectDate: this.contractModal.effectDate,
          dueDate: this.contractModal.dueDate,
          paymentDate: this.contractModal.paymentDate,
          netPrime: this.contractModal.netPrime,
          commission: this.contractModal.commission,
          totalPrime: this.contractModal.totalPrime,
          cdeaoPrime: this.contractModal.cdeaoPrime,
          observation: this.contractModal.observation,
          accessory100: this.contractModal.accessory100,
          accessory50: this.contractModal.accessory100 / 2,
        };

        if (this.contractModal._id) {
          // update
          await updateContract({
            schema,
            id: this.contractModal._id,
          });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.updatedSuccessfully("Contract")
          );
          this.closeContract();
          this.initFile();
        } else {
          // add
          schema.product = defaultMethods.getItemId(
            this.File.proposedProducts,
            this.currentProduct
          );
          schema.file = this.File._id;
          await addContract({ schema, id: this.rdvRequest });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.createdSuccessfully("Contract")
          );
          this.closeContract();
          this.initFile();
        }
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
      this.loading = false;
    },
    closeClause() {
      this.regulationDialog = false;
      this.pbDialog = false;
    },
    closeContract() {
      this.contractDialog = false;
      this.contractModal = {
        accessory100: 0,
        accessory50: 0,
      };
      this.currentProduct = null;
      this.incorporationDialog = false;
      this.incorporationModal = {};
      this.withDrawModal = false;
      this.regulationDialog = false;
      this.pbDialog = false;
    },

    // incorporation
    async saveIncorporation() {
      this.loading = true;
      try {
        // add

        await addIncorporation({
          schema: {
            contract: this.contractModal._id,
            prospect: this.incorporationModal,
          },
          id: this.File._id,
        });
        defaultMethods.dispatchSuccess(
          this.$store,
          messages.createdSuccessfully("Incorporation")
        );
        this.closeContract();
        this.initFile();
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
      this.loading = false;
    },

    // retrait
    async makeWithDraw() {
      this.loading = true;
      try {
        await withdrawProspect({
          schema: {
            contract: this.contractModal._id,
            prospect: defaultMethods.getItemId(
              this.File.prospects,
              this.incorporationModal.name
            ),
          },
          id: this.File._id,
        });
        defaultMethods.dispatchSuccess(
          this.$store,
          messages.createdSuccessfully("Incorporation")
        );
        this.closeContract();
        this.initFile();
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
      this.loading = false;
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
          // update
          await updateRegulationClause({
            schema,
            id: this.regulationClauseModal._id,
          });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.updatedSuccessfully("Contract")
          );
          this.closeContract();
          this.initFile();
        } else {
          // add

          await addRegulationClause({ schema, id: this.contractModal._id });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.createdSuccessfully("Contract")
          );
          this.closeContract();
          this.initFile();
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
          this.closeContract();
          this.initFile();
        } else {
          // add

          await addPbClause({ schema, id: this.contractModal._id });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.createdSuccessfully("Contract")
          );
          this.closeContract();
          this.initFile();
        }
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
      this.loading = false;
    },

    // Reset the panel
    none() {
      this.panel = [];
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    setTodays() {
      this.focuss = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    prevs() {
      this.$refs.calendars.prev();
    },
    nexts() {
      this.$refs.calendars.next();
    },
    showCallEvent({ nativeEvent, event }) {
      const edit = async () => {
        this.callModal = {
          _id: event._id,
          assignTo: event.assignTo,
          reason: event.name,
          hour: event.hour,
          date: event.date,
          done: event.done,
          returnObservation: event.returnObservation,
        };
        this.editedIndex = 1;
        // this.ModalText = {
        //   btn: "update",
        //   title: `Update ${this.program.type}`,
        // };
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.callDialog = true))
        );
      };

      if (this.callDialog) {
        this.closeCall();
        requestAnimationFrame(() => requestAnimationFrame(() => edit()));
      } else {
        edit();
      }

      nativeEvent.stopPropagation();
    },
    getCallEvent() {
      this.events = [];
      if (!this.File || !this.File.otherInfo || !this.File.otherInfo.calls) {
        //alert("po");
        return;
      } else {
        for (let i = 0; i < this.File.otherInfo.calls.length; i++) {
          const program = this.File.otherInfo.calls[i];
          const progDate = program.date;
          //console.log(program.assignTo);
          const assignTo = defaultMethods.getNameList(program.assignTo);
          const date = new Date(`${program.date}`);
          const hours = program.hour.split(":");
          date.setHours(hours[0]);
          date.setMinutes(hours[1]);
          this.events.push({
            name: program.reason,
            start: date,
            end: date,
            date: progDate,
            assignTo: assignTo,
            color: "red",
            timed: true,
            hour: program.hour,
            done: program.done,
            returnObservation: program.returnObservation,
            _id: program._id,
          });
        }
      }
    },

    // appointment
    showAppointmentEvent({ nativeEvent, event }) {
      const edit = async () => {
        this.appointmentModal = {
          _id: event._id,
          reason: event.name,
          assignTo: event.assignTo,
          startPeriod: event.startPeriod,
          participants: event.participants,
          endPeriod: event.endPeriod,
          hour: event.hour,
          location: event.location,
          date: event.date,
          done: event.done,
          returnObservation: event.returnObservation,
        };

        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.appointmentAddDialog = true))
        );
      };

      if (this.appointmentAddDialog) {
        this.closeAppointment();
        requestAnimationFrame(() => requestAnimationFrame(() => edit()));
      } else {
        edit();
      }

      nativeEvent.stopPropagation();
    },
    closeAppointment() {
      this.appointmentModal = {};
      this.appointmentAddDialog = false;
      // this.appointmentDialog = false;
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    viewDays({ date }) {
      this.focuss = date;
      this.types = "day";
    },
    getAppointmentEvent() {
      this.appointmentEvents = [];

      if (
        !this.File ||
        !this.File.otherInfo ||
        !this.File.otherInfo.appointments
      )
        return;
      for (let i = 0; i < this.File.otherInfo.appointments.length; i++) {
        const program = this.File.otherInfo.appointments[i];

        const progDate = program.date;
        const assignTo = defaultMethods.getNameList(program.assignTo);
        const startPeriod = program.period.start;
        const endPeriod = program.period.end;
        //alert(program.period.start)
        const date = new Date(`${program.date}`);
        const dates = new Date(`${program.date}`);
        const hours = program.period.start.split(":");
        //alert(startPeriod)
        date.setHours(hours[0]);
        date.setMinutes(hours[1]);
        const hourss = program.period.end.split(":");

        dates.setHours(hourss[0]);
        dates.setMinutes(hourss[1]);
        this.appointmentEvents.push({
          name: program.reason,
          location: program.location,
          assignTo: assignTo,
          date: progDate,
          start: date,
          end: dates,
          endPeriod: endPeriod,
          participants: program.participants,
          hour: program.hour,
          startPeriod: startPeriod,
          done: program.done,
          returnObservation: program.returnObservation,
          color: "blue",
          timed: true,
          _id: program._id,
        });
        console.log(this.appointmentEvents);
      }
    },
    async saveAppointment() {
      this.loading = true;
      try {
        const schema = {
          assignTo: defaultMethods.getItemsId(
            this.Users.docs,
            this.appointmentModal.assignTo
          ),
          reason: this.appointmentModal.reason,
          participants: this.appointmentModal.participants,
          startPeriod: this.appointmentModal.startPeriod,
          endPeriod: this.appointmentModal.endPeriod,
          date: this.appointmentModal.date,
          hour: this.appointmentModal.startPeriod,
          location: this.appointmentModal.location,
          returnObservation: this.appointmentModal.returnObservation,
          done: this.appointmentModal.done,
        };
        if (this.appointmentModal._id) {
          // update
          await updateAppointment({
            schema,
            id: this.appointmentModal._id,
          });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.updatedSuccessfully("Dossier")
          );
          this.closeAppointment();
          this.initFile();
        } else {
          // add
          await addAppointment({
            schema,
            id: this.rdvRequest._id,
          });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.createdSuccessfully("Rendez-vous")
          );
          this.closeAppointment();

          this.initFile();
        }
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
      this.loading = false;
    },

    async updateProposedProduct() {
      try {
        const schema = {
          schema: {
            name: this.File.name,
            prospects: this.File.prospects,
            phone: this.File.phone,
            email: this.File.email,
            nature: this.File.nature,
            location: this.File.location,
            description: this.File.description,
            activityField: this.File.activityField,
            birthday: this.File.birthday,
            proposedProducts: defaultMethods.getIdList(this.selectedProduct),
          },
          id: this.File._id,
        };

        await updateFile(schema);
        defaultMethods.dispatchSuccess(
          this.$store,
          messages.updatedSuccessfully("Dossier")
        );
        //this.closeProduct();
        this.getinitFile();
      } catch (error) {
        console.log(error);
        defaultMethods.dispatchError(this.$store);
      }
    },
    closeProduct() {
      this.productDialog = false;
      this.selectedProduct = {};
    },

    seedProposedProduct() {
      this.selectedProduct = this.File.proposedProducts;
      this.proposedProductNameList = defaultMethods.getNameList(
        this.File.proposedProducts
      );
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
      console.log("here", this.coinsuranceModal);
      for (let a = 0; a < this.coinsuranceModal.lenght; a++) {
        const coinsurance = this.coinsuranceModal[a];
        for (let i = 0; i < this.coinsuranceCompanyNameList.lenght; i++) {
          console.log(coinsurance.company, this.coinsuranceCompanyNameList[i]);
          if (coinsurance.company == this.coinsuranceCompanyNameList[i])
            this.coinsuranceCompanyNameList.splice(i, 1);
        }
      }
    },
    addOneCoinsurance() {
      this.coinsuranceModal.push({});
    },
    closeInsurance() {
      this.coinsuranceDialog = false;
      this.currentProduct = null;
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
    removeFromCoin(id) {
      // id -= 1;
      this.coinsuranceModal.splice(id, 1);
      this.seedCoinsuranceCompanyNameList();
    },
    async saveCoinsurance() {
      this.loading = true;
      try {
        // we need validate data
        const result = this.validCoinsuranceData(this.coinsuranceModal);
        console.log(result);
        if (!result.success)
          return defaultMethods.dispatchError(this.$store, result.message);

        const schema = {
          data: result.data,
        };
        if (this.coinsuranceModal[0]._id) {
          // update
          await updateCoinsurance({
            schema,
            id: this.contractModal._id,
          });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.updatedSuccessfully("coassurance")
          );
          this.closeInsurance();
          this.initFile();
        } else {
          // add
          await addCoinsurance({
            schema,
            id: this.contractModal._id,
          });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.createdSuccessfully("coassurance")
          );
          this.closeInsurance();

          this.initFile();
        }
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
      this.loading = false;
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
          message: `Total shared rate must be 100,got ${totalRate}`,
        };

      return {
        success: true,
        data: result,
      };
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },

    addprospect(item) {
      this.editedIndex = this.prospectdata.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.prospect = true;
    },
    updateprospect(item) {
      this.editedIndex = this.prospectdata.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.prospect = true;
    },

    deleteItem(item) {
      this.editedIndex = this.prospectdata.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.prospectdata.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    onSave() {},

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.prospectdata[this.editedIndex], this.editedItem);
      } else {
        this.prospectdata.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
