<template>
  <v-container class="grey lighten-5">
    <v-data-table
      style="text-align:right;"
      :headers="correspondant"
      :items="corresspondantData"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon color="warning" small @click="editCorrespondant(item)">
          mdi-pencil-box-multiple-outline</v-icon
        >

        <v-icon
          @click="deletCorrespondant(item)"
          class="ml-5"
          size="30"
          color="error"
          >mdi-delete-empty</v-icon
        >
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Correspondants</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="correspondantModal" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Ajouter un correspondant
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ correspondantTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <v-select
                        :items="affluanceTypes"
                        v-model="correspondantItem.affluenceType"
                        label="Titre"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        color="#061a40"
                        v-model="correspondantItem.fullName"
                        label="Nom et Prénoms "
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        color="#061a40"
                        v-model="correspondantItem.contact"
                        label="Contact"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        color="#061a40"
                        v-model="correspondantItem.email"
                        label="Mail"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        color="#061a40"
                        v-model="correspondantItem.birthday"
                        type="date"
                        label="Date d'anniversaire"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="correspondantClose">
                  Fermer
                </v-btn>
                <v-btn
                  depressed
                  large
                  text
                  @click="addPersonnel"
                  color="success"
                >
                  Ajouter
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="correspondantModalDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Etes vous sûrs de vouloire supprimer cet élément
                ?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="correspondantDelete"
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
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    correspondantModal: false,
    correspondantModalDelete: false,
    correspondant: [
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
      { text: "Actions", align: "right", value: "actions" },
    ],
    corresspondantData: [],
    correspondantIndex: -1,
    correspondantItem: {
      name: "",
      contact: "",
      email: "",
      birthday: "",
      affluenceType: "",
    },
    corresspondantdefaultItem: {
      name: "",
      contact: "",
      email: "",
      birthday: "",
      affluenceType: "",
    },
    affluanceTypes: ["Physique", "Morale"],
  }),

  computed: {
    correspondantTitle() {
      return this.correspondantIndex === -1
        ? "Ajouter un correspondant"
        : "Modifier informations correspondant";
    },
  },

  watch: {
    correspondantModal(val) {
      val || this.correspondantClose();
    },
    correspondantModalDelete(val) {
      val || this.correspondantDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.corresspondantData = [
        {
          fullName: "ok",
          contact: "123",
          email: "fff",
          birthday: "ff",
          affluenceType: "fdf",
        },
      ];
    },

    editCorrespondant(item) {
      this.correspondantIndex = this.corresspondantData.indexOf(item);
      this.correspondantItem = Object.assign({}, item);
      this.correspondantModal = true;
    },

    deletCorrespondant(item) {
      this.correspondantIndex = this.corresspondantData.indexOf(item);
      this.correspondantItem = Object.assign({}, item);
      this.correspondantModalDelete = true;
    },

    deleteItemConfirm() {
      this.corresspondantData.splice(this.correspondantIndex, 1);
      this.correspondantDelete();
    },

    correspondantClose() {
      this.correspondantModal = false;
      this.$nextTick(() => {
        this.correspondantItem = Object.assign(
          {},
          this.corresspondantdefaultItem
        );
        this.correspondantIndex = -1;
      });
    },

    correspondantDelete() {
      this.correspondantModalDelete = false;
      this.$nextTick(() => {
        this.correspondantItem = Object.assign(
          {},
          this.corresspondantdefaultItem
        );
        this.correspondantIndex = -1;
      });
    },

    addPersonnel() {
      if (this.correspondantIndex > -1) {
        Object.assign(
          this.prospect[this.correspondantIndex],
          this.correspondantItem
        );
      } else {
        this.corresspondantData.push(this.correspondantItem);
      }
      this.correspondantClose();
    },
  },
};
</script>
