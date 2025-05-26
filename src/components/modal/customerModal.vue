<template>
  <!-- New appointment-->
  <v-card style="border-top: 10px solid #061a40">
    <v-card-title>
      <span class="text-h5">Retour du client</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-select
              :items="compagniereturSelect"
              v-model="customerReturn.company"
              label="Compagnie sélectionnée"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="customerReturn.observation"
              outlined
              name="input-7-4"
              label="Observation"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="customerReturn.setUpContract"
              :items="Décision"
              label="Mise en place contrat"
              outlined
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error " text @click="closeAppointment">
        Fermer
      </v-btn>
      <v-btn color="success " @click="saveCustomerReturn">
        Enregistrer retour client
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { importDataExcel } from "../../exportDoc/index.js";
import { defaultMethods, messages, rules } from "@/utils/data";
import {
  addCall,
  updateCall,
  addAppointment,
  // updateFile,
  updateAppointment,
  addQuoting,
  updateQuoting,
  // updateContract,
  addContract,
  addIncorporation,
  withdrawProspect,
  addRegulationClause,
  updateRegulationClause,
  addPbClause,
  updatePbClause,
  addCoinsurance,
  updateCoinsurance,
  addCompanyReturn,
  updateCompanyReturn,
  manageCustomerReturn,
} from "@/api/user.js";
import { updateFile } from "@/api/admin.js";
export default {
  name: "production",
  props: {
    QuotingRequestData: {
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
      compagniereturSelect: [],
      syntheseData: [
        {
          company: "NSIA",
          netPrime: "35000",
          accessory: "25000",
          tax: "2500",
          TTCPrime: "3500",
        },
      ],
      netPrime: "35",
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
      companyReturnHeaders: [
        {
          text: "Compagnie",
          align: "start",
          sortable: false,
          value: "company",
        },
        { text: "Prime nette", value: "netPrime" },
        { text: "Coût de police", value: "accessory" },
        { text: "Taxe", value: "tax" },
        { text: "Prime TTC", value: "TTCPrime" },
        { text: "Date retour", value: "returnDateFr" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      Décision: ["OUI", "NON"],
      items: ["NSIA", "SANLAM", "SAHAM", "ATLANTIQUE ASSURANCE"],
      link: [
        {
          text: "Cotation",
          disabled background-color="#4DD0E1": false,
          href: "/cotation",
        },
        {
          text: "Gestion dossier",
          disabled background-color="#4DD0E1": true,
          href: "breadcrumbs_link_1",
        },
      ],
      natureprospect: ["Physics", "Entreprise"],
      focus: "",
      search: "",
      events: [],
      type: "month",
      typeToLabel: {
        month: "Month",
        week: "Week",
        day: "Day",
        "4day": "4 Days",
      },
      regulation: false,
      PB: false,
      coassurance: false,
      reassurance: false,
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
      dialog: false,
      appelsModal: false,
      callDialog: false,
      dialog3: false,
      appointmentAddDialog: false,
      appointmentDialog: false,
      productDialog: false,
      quotingDialog: false,
      garantie: false,
      contractDialog: false,
      notifications: false,
      sinisterDialog: false,
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
      Avenantheaders: [
        {
          text: "Date Opération",
          align: "start",
          sortable: false,
          value: "createdAt",
        },
        // { text: "Nature", value: "nature" },
        // { text: "Description", value: "description" },
        { text: "Type avenant", value: "type" },
        { text: "Numéro Police", value: "policeNumber" },
        { text: "Effet", value: "effectDate" },
        { text: "Echéance", value: "dueDate" },
        { text: "Prime nette", value: "netPrime" },
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
      appointmentEvents: [],
      loading: false,
      valid: false,
      firstName: "",

      headersProduct: [
        {
          text: "Nom du produit",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Abréviation", value: "acronym" },
        { text: "Description", value: "description" },
        { text: "", value: "actions", sortable: false },
      ],
      selectedProduct: {},
      currentProduct: null,
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
        "Changement d'immatriculation",
      ],
      proposedProductNameList: [],
      companyNameList: [],
      coinsuranceCompanyNameList: [],
      CommercialNameList: [],
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
      customerReturnDialog: false,
      companyReturnDialog: false,
      companyReturnModal: {},
      customerReturn: {},
      workSheetColumnName: [
        "",
        "Prime nette",
        "Coût de police",
        "Taxe",
        "Prime TTC",
      ],
      workSheetName: "Tableau synthese de cotation",
      nombre: "Scotation",
      users: [],
    };
  },

  mounted() {
    this.initQuotingRequest();
    // this.$refs.calendar.checkChange();
  },
  computed: {
    ...mapGetters([
      "File",
      "Products",
      "Companies",
      "Quoting",
      "Users",
      "Contract",
      "FileEndorsements",
      "QuotingRequest",
      "CompanyReturns",
      "CustomerReturn",
    ]),
    formTitle() {
      return this.editCompanyReturn === -1
        ? "Proposition de la compagnie"
        : "Proposition de la compagnie";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    QuotingRequest() {
      if (this.QuotingRequest && this.QuotingRequest.product) {
        this.currentProduct = this.QuotingRequest.product._id;

        // console.log(this.QuotingRequest.product._id);

        this.seedContract();

        this.initQuoting();
      }
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
      this.initFileEndorsement();
    },
    contractModal() {},
    Companies() {
      this.companyNameList = defaultMethods.getNameList(this.Companies.docs);
      this.seedCoinsuranceCompanyNameList();
    },
    Users() {
      this.CommercialNameList = defaultMethods.getNameList(this.Users.docs);
    },

    async Quoting() {
      if (this.Quoting && this.Quoting._id) {
        //alert("ok");
        this.seedContract();
        this.initCompanyReturn();
        this.quotingModal = {
          _id: this.Quoting._id,
          duration: this.Quoting.duration,
          // netPrime: this.Quoting.netPrime,
          // TTCPrime: this.Quoting.TTCPrime,
          annualRent: this.Quoting.annualRent,
          // dateReturnCustomer: this.Quoting.dateReturnCustomer,
          turnover: this.Quoting.turnover,
          effective: this.Quoting.effective,
          quality: this.Quoting.quality,
          payroll: this.Quoting.payroll,
          siteType: this.Quoting.siteType,
          observation: this.Quoting.observation,
        };
        this.quotingModal.companies = defaultMethods.getItemsName(
          this.Companies.docs,
          this.Quoting.companies
        );
        // alert(this.Quoting._id);
        await this.getCustomReturn({
          id: this.Quoting._id,
        });
      }
    },
    CustomerReturn() {
      this.customerReturn = {
        observation: this.CustomerReturn.observation,
        company: defaultMethods.getItemName(
          this.Companies.docs,
          this.CustomerReturn.company
        ),
        setUpContract:
          this.CustomerReturn.setUpContract == true ? "OUI" : "NON",
      };
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

        // this.contractModal.dueDate =
        //   this.contractModal.dueDate
        // this.contractModal.effectDate =
        //   this.contractModal.effectDate
        // this.contractModal.paymentDate =
        //   this.contractModal.paymentDate

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

  methods: {
    ...mapActions([
      "getFile",
      "getProducts",
      "getCompanies",
      "getQuoting",
      "getUsers",
      "getContract",
      "getQuotingRequest",
      "getFileEndorsement",
      "getCompanyReturns",
      "getCustomReturn",
    ]),

    async initFileEndorsement() {
      if (this.File && this.File._id) {
        await this.getFileEndorsement({
          id: this.File._id,
        });
      }
    },
    async importData() {
      this.users = this.CompanyReturns.docs;
      importDataExcel(
        this.workSheetColumnName,
        this.workSheetName,
        this.nombre,
        this.users
      );
    },
    async initQuotingRequest() {
      this.loading = true;
      try {
        this.quotingRequest = this.QuotingRequestData;
        await this.getProducts({ name: this.searchData });
        await this.getCompanies();
        await this.getUsers();
        await this.getQuoting({
          quotingRequest: this.QuotingRequest._id,
        });
        if (this.QuotingRequest.quoting.companies) {
          this.compagniereturSelect = defaultMethods.getItemsName(
            this.Companies.docs,
            this.QuotingRequest.quoting.companies
          );
        }
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    // files
    async initFile() {
      this.loading = true;
      try {
        if (this.File && this.File._id) {
          await this.getFile(this.File._id);
        }
        await this.getProducts({ name: this.searchData });
        await this.getCompanies();
        await this.getUsers();
        this.initFileEndorsement();
        this.seedContract();
        // await this.getFileEndorsement({
        //   id:this.$route.params.id
        // });
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
      this.appelsModal = false;
    },
    // call
    async saveCall() {
      this.loading = true;
      try {
        if (this.callModal._id) {
          // update
          await updateCall({
            schema: {
              reason: this.callModal.reason,
              hour: this.callModal.hour,
              date: this.callModal.date,
            },
            id: this.callModal._id,
          });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.updatedSuccessfully("Dossier")
          );
          this.closeCall();
          this.initFile();
        } else {
          // add
          await addCall({ schema: this.callModal, id: this.$route.params.id });
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

    // company return
    async initCompanyReturn() {
      try {
        await this.getCompanyReturns(this.Quoting._id);
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
    },
    closeCompanyReturn() {
      this.companyReturnModal = {};
      this.companyReturnDialog = false;
      this.customerReturnDialog = false;
    },
    editCompanyReturn(item) {
      this.companyReturnModal.accessory = item.accessory;
      this.companyReturnModal.netPrime = item.netPrime;
      this.companyReturnModal.TTCPrime = item.TTCPrime;
      this.companyReturnModal.tax = item.tax;
      this.companyReturnModal.returnDate = item.returnDate;
      this.companyReturnModal._id = item._id;
      this.companyReturnModal.company = item.company.name;
      this.customerReturnDialog = true;
    },
    async saveCompanyReturn() {
      this.loading = true;
      try {
        //alert(this.Quoting._id);
        const schema = {
          company: defaultMethods.getItemId(
            this.Companies.docs,
            this.companyReturnModal.company
          ),

          accessory: this.companyReturnModal.accessory,
          netPrime: this.companyReturnModal.netPrime,
          TTCPrime: this.companyReturnModal.TTCPrime,
          tax: this.companyReturnModal.tax,
          returnDate: this.companyReturnModal.returnDate,

          quoting: this.Quoting._id,
        };

        if (this.companyReturnModal._id) {
          // update

          await updateCompanyReturn({
            schema,
            id: this.companyReturnModal._id,
          });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.updatedSuccessfully("Retour Compagnie")
          );
          this.customerReturnDialog = false;
          this.initQuotingRequest();
        } else {
          // add

          await addCompanyReturn({ schema });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.createdSuccessfully("Retour Compagnie")
          );
          this.closeCompanyReturn();
          this.initQuotingRequest();
        }
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
      this.loading = false;
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
          quotingRequest: this.QuotingRequest._id,
          product: this.currentProduct,
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
          await addQuoting({ schema, id: this.$route.params.id });
          defaultMethods.dispatchSuccess(
            this.$store,
            messages.createdSuccessfully("Appel")
          );
          this.closeQuoting();
          this.initFile();
          location.reload();
        }
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
      this.loading = false;
    },
    closeQuoting() {
      // this.quotingModal = {};
      this.quotingDialog = false;
      // this.currentProduct = null;
    },
    async initQuoting() {
      try {
        this.loading = true;

        await this.getQuoting({
          quotingRequest: this.QuotingRequest._id,
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
        if (
          this.File &&
          this.File._id &&
          this.currentProduct &&
          this.Quoting &&
          this.Quoting._id
        ) {
          await this.getContract({
            id: this.File._id,
            quoting: this.Quoting._id,
            // product: this.currentProduct,
            // product: defaultMethods.getItemId(
            //   this.File.proposedProducts,
            //   this.currentProduct
            // ),
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
          actionType: this.contractModal.actionType,
          category: this.contractModal.category,
          company: defaultMethods.getItemId(
            this.Companies.docs,
            this.contractModal.company
          ),
          // commercial: defaultMethods.getItemId(
          //   this.Users.docs,
          //   this.contractModal.commercial
          // ),
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

        // if (this.contractModal._id) {
        //   // update
        //   await updateContract({
        //     schema,
        //     id: this.contractModal._id,
        //   });
        //   defaultMethods.dispatchSuccess(
        //     this.$store,
        //     messages.updatedSuccessfully("Contract")
        //   );
        //   this.closeContract();
        //   this.initFile();
        // } else {
        // add
        schema.product = this.currentProduct;
        // schema.product = defaultMethods.getItemId(
        //   this.File.proposedProducts,
        //   this.currentProduct
        // );
        schema.file = this.File._id;
        await addContract({ schema, id: this.$route.params.id });
        defaultMethods.dispatchSuccess(
          this.$store,
          messages.createdSuccessfully("Contract")
        );
        this.closeContract();
        this.initFile();
        // }
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
      // this.currentProduct = null;
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
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showCallEvent({ nativeEvent, event }) {
      const edit = async () => {
        this.callModal = {
          _id: event._id,
          reason: event.name,
          hour: event.hour,
          date: event.start,
        };
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

      if (!this.File || !this.File.otherInfo || !this.File.otherInfo.calls)
        return;
      for (let i = 0; i < this.File.otherInfo.calls.length; i++) {
        const program = this.File.otherInfo.calls[i];
        const date = new Date(`${program.date}`);
        const hours = program.hour.split(":");
        date.setHours(hours[0]);
        date.setMinutes(hours[1]);
        this.events.push({
          name: program.reason,
          start: date,
          end: date,
          color: "red",
          timed: true,
          hour: program.hour,
          _id: program._id,
        });
      }
    },

    // appointment
    showAppointmentEvent({ nativeEvent, event }) {
      const edit = async () => {
        this.appointmentModal = {
          _id: event._id,
          reason: event.name,
          hour: event.hour,
          location: event.location,
          date: event.start,
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
      this.$emit("close");
      this.appointmentAddDialog = false;
      this.appointmentDialog = false;
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
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
        const date = new Date(`${program.date}`);
        const hours = program.hour.split(":");
        date.setHours(hours[0]);
        date.setMinutes(hours[1]);
        this.appointmentEvents.push({
          name: program.reason,
          start: date,
          end: date,
          color: "blue",
          timed: true,
          hour: program.hour,
          location: program.location,
          _id: program._id,
        });
      }
    },
    async saveAppointment() {
      this.loading = true;
      try {
        if (this.appointmentModal._id) {
          // update
          await updateAppointment({
            schema: {
              reason: this.appointmentModal.reason,
              hour: this.appointmentModal.hour,
              date: this.appointmentModal.date,
              location: this.appointmentModal.location,
            },
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
            schema: this.appointmentModal,
            id: this.$route.params.id,
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
    async saveCustomerReturn() {
      this.loading = true;
      try {
        const schema = {
          company: defaultMethods.getItemId(
            this.Companies.docs,
            this.customerReturn.company
          ),
          observation: this.customerReturn.observation,
          setUpContract:
            this.customerReturn.setUpContract == "OUI" ? true : false,
          quoting: this.Quoting._id,
        };

        // add
        await manageCustomerReturn({
          schema,
        });
        defaultMethods.dispatchSuccess(
          this.$store,
          messages.createdSuccessfully("retour client")
        );
        this.appointmentAddDialog = false;
        this.initQuotingRequest();

        this.closeAppointment();
      } catch (error) {
        defaultMethods.dispatchError(this.$store);
      }
      this.loading = false;
    },

    // proposed product
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
        this.closeProduct();
        this.initFile();
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

<style></style>
