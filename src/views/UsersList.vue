<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <span class="text-h5">Gestion des Utilisateurs</span>
        <v-spacer></v-spacer>
        <v-btn color="#3A1C71" dark @click="dialogCreate = true">
          <v-icon left>mdi-account-plus</v-icon>
          Créer un utilisateur
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Rechercher"
          single-line
          hide-details
          outlined
          @input="searchUsers"
        ></v-text-field>

        <v-data-table
          :headers="headers"
          :items="usersList"
          :loading="loading"
          class="elevation-1 mt-5"
        >
          <template v-slot:item.avatar="{ item }">
            <v-avatar size="40" class="my-2">
              <v-img v-if="item.avatar" :src="item.avatar"></v-img>
              <v-icon v-else>mdi-account</v-icon>
            </v-avatar>
          </template>

          <template v-slot:item.isActive="{ item }">
            <v-chip :color="item.isActive ? 'success' : 'error'" small dark>
              {{ item.isActive ? 'Actif' : 'Inactif' }}
            </v-chip>
          </template>

         
          <template v-slot:item.actions="{ item }">
            <v-btn icon small @click="toggleUserStatus(item)">
              <v-icon :color="item.isActive ? 'error' : 'success'">
                {{ item.isActive ? 'mdi-account-off' : 'mdi-account-check' }}
              </v-icon>
            </v-btn>
          
            <v-btn icon small @click="editUser(item)">
              <v-icon color="primary">mdi-pencil</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Dialog Création Utilisateur -->
    <v-dialog v-model="dialogCreate" max-width="800px" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">Créer un nouvel utilisateur</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newUser.fullName"
                  label="Nom complet*"
                  outlined
                  color="#3A1C71"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newUser.email"
                  label="Email*"
                  outlined
                  color="#3A1C71"
                  type="email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newUser.phone"
                  label="Téléphone*"
                  outlined
                  color="#3A1C71"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="newUser.sex"
                  :items="sexOptions"
                  label="Sexe*"
                  outlined
                  color="#3A1C71"
                  required
                ></v-select>
              </v-col>
             <v-col cols="12" sm="6">
                <v-combobox
                    v-model="newUser.role"
                    :items="roleOptions"
                    label="Rôle*"
                    outlined
                    color="#3A1C71"
                    required
                    hint="Sélectionnez ou saisissez un rôle personnalisé"
                    persistent-hint
                ></v-combobox>
                </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="newUser.agency"
                  :items="agencies"
                  item-text="name"
                  item-value="_id"
                  label="Agence*"
                  outlined
                  color="#3A1C71"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newUser.password"
                  :type="showPassword ? 'text' : 'password'"
                  label="Mot de passe*"
                  outlined
                  color="#3A1C71"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-file-input
                  v-model="newUser.avatar"
                  label="Photo de profil"
                  outlined
                  color="#3A1C71"
                  prepend-icon="mdi-camera"
                  accept="image/*"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
          <small>*Champs obligatoires</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="closeCreateDialog">Annuler</v-btn>
          <v-btn color="success" @click="createUser" :loading="creating">
            Créer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>





    <v-dialog v-model="dialogUpdate" max-width="600px" persistent>
  <v-card>
    <v-card-title>
      <span class="text-h5">Modifier l'utilisateur</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field v-model="editedUser.fullName" label="Nom complet" outlined></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="editedUser.email" label="Email" outlined></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="editedUser.phone" label="Téléphone" outlined></v-text-field>
          </v-col>
            <v-col cols="12" sm="6">
                <v-combobox 
                    v-model="editedUser.role" 
                    :items="roleOptions" 
                    label="Rôle" 
                    outlined
                    hint="Sélectionnez ou saisissez un rôle personnalisé"
                    persistent-hint
                ></v-combobox>
                </v-col>
          <v-col cols="12">
            <v-text-field 
              v-model="editedUser.password" 
              label="Nouveau mot de passe (laisser vide pour ne pas changer)" 
              outlined 
              type="password"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" text @click="dialogUpdate = false">Annuler</v-btn>
      <v-btn color="primary" @click="saveUserUpdate" :loading="updating">Enregistrer</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

  </v-container>
</template>

<script>
import axios from 'axios';
import { defaultMethods, messages } from "@/utils/data";

export default {
  name: 'UsersList',
  data() {
    return {
      search: '',
      loading: false,
      creating: false,
      dialogCreate: false,
      showPassword: false,
      dialogUpdate: false, // Pour ouvrir/fermer le modal d'édition
    updating: false,
    editedUser: {
      _id: null,
      fullName: '',
      email: '',
      phone: '',
      role: '',
      // on ne met pas le password ici par défaut
    },
      usersList: [],
      agencies: [],
      headers: [
        { text: 'Avatar', value: 'avatar', sortable: false },
        { text: 'Nom', value: 'fullName' },
        { text: 'Email', value: 'email' },
        { text: 'Téléphone', value: 'phone' },
        { text: 'Rôle', value: 'role' },
        { text: 'Statut', value: 'isActive' },
        
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      sexOptions: ['Masculin', 'Féminin'],
      roleOptions: ['Admin', 'Gestionnaire', 'Expert', 'Prestataire'],
      newUser: {
        fullName: '',
        email: '',
        phone: '',
        sex: '',
        role: '',
        agency: '',
        password: '',
        avatar: null,
      },
    };
  },
  mounted() {
    this.fetchUsers();
    this.fetchAgencies();
  },
  methods: {

async fetchUsers() {
  this.loading = true;
  try {
    const response = await axios.get('/user');
    console.log("Réponse brute:", response.data);
    
    // 🔹 CORRECTION ICI - c'est data.docs pour la pagination
    if (response.data.data?.docs && Array.isArray(response.data.data.docs)) {
      this.usersList = response.data.data.docs;
    } else if (response.data.docs && Array.isArray(response.data.docs)) {
      this.usersList = response.data.docs;
    } else if (Array.isArray(response.data.data)) {
      this.usersList = response.data.data;
    } else {
      console.error("Format de réponse inattendu:", response.data);
      this.usersList = [];
    }
    
    console.log("Users chargés:", this.usersList);
  } catch (error) {
    console.error('Erreur chargement utilisateurs:', error.response || error);
    this.usersList = [];
    alert('Erreur lors du chargement des utilisateurs');
  } finally {
    this.loading = false;
  }
},
    async fetchAgencies() {
      try {
        const response = await axios.get('/agency');
        this.agencies = response.data.data;
      } catch (error) {
        console.error('Erreur chargement agences:', error);
      }
    },
    async searchUsers() {
      this.loading = true;
      try {
        const response = await axios.get(`/user?query=${this.search}`);
        this.usersList = response.data.data;
      } catch (error) {
        console.error('Erreur recherche:', error);
      } finally {
        this.loading = false;
      }
    },
   // Dans UsersList.vue, méthode createUser
async createUser() {
  this.creating = true;
  try {
    const formData = new FormData();
    // Assurez-vous que tous les champs requis par votre schéma sont présents
    formData.append('fullName', this.newUser.fullName);
    formData.append('email', this.newUser.email);
    formData.append('phone', this.newUser.phone);
    formData.append('sex', this.newUser.sex);
    formData.append('role', this.newUser.role);
    formData.append('agency', this.newUser.agency);
    formData.append('password', this.newUser.password);
    
    if (this.newUser.avatar) {
      formData.append('avatar', this.newUser.avatar);
    }

    // AJOUTER LE HEADER ICI
    await axios.post('/user', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    defaultMethods.dispatchSuccess(this.$store, messages.createdSuccessfully('Utilisateur'));
    this.closeCreateDialog();
    this.fetchUsers();
  } catch (error) {
    // Affichez l'erreur précise venant du backend pour déboguer
    console.error('Détails erreur:', error.response?.data);
    alert('Erreur: ' + (error.response?.data?.message || 'Échec de création'));
  } finally {
    this.creating = false;
  }
},
    closeCreateDialog() {
      this.dialogCreate = false;
      this.newUser = {
        fullName: '',
        email: '',
        phone: '',
        sex: '',
        role: '',
        agency: '',
        password: '',
        avatar: null,
      };
    },
    async toggleUserStatus(user) {
      const action = user.isActive ? 'désactiver' : 'activer';
      if (confirm(`Voulez-vous ${action} cet utilisateur ?`)) {
        try {
          await axios.put(`/user/${user._id}`, { isActive: !user.isActive });
          defaultMethods.dispatchSuccess(this.$store, `Utilisateur ${action === 'activer' ? 'activé' : 'désactivé'}`);
          this.fetchUsers();
        } catch (error) { 
          console.error('Erreur:', error);
        }
      }
    },
    async toggleBlockUser(user) {
      const action = user.isBlocked ? 'débloquer' : 'bloquer';
      if (confirm(`Voulez-vous ${action} cet utilisateur ?`)) {
        try {
          await axios.put(`/user/${user._id}`, { isBlocked: !user.isBlocked });
          defaultMethods.dispatchSuccess(this.$store, `Utilisateur ${action === 'bloquer' ? 'bloqué' : 'débloqué'}`);
          this.fetchUsers();
        } catch (error) {
          console.error('Erreur:', error);
        }
      }
    },
    editUser(user) {
      // À implémenter si nécessaire
      console.log('Éditer:', user);
      this.editedUser = { ...user }; // On copie les données de l'utilisateur sélectionné
    this.dialogUpdate = true;
    },

    // 2. Envoyer les modifications au backend
  async saveUserUpdate() {
    this.updating = true;
    try {
      // Puisque vous avez enlevé Multer, on envoie du JSON simple
      const payload = {
        fullName: this.editedUser.fullName,
        email: this.editedUser.email,
        phone: this.editedUser.phone,
        role: this.editedUser.role,
      };

      // N'envoyer le password que s'il a été saisi
      if (this.editedUser.password) {
        payload.password = this.editedUser.password;
      }

      await axios.put(`/user/${this.editedUser._id}`, payload);
      
      defaultMethods.dispatchSuccess(this.$store, "Utilisateur mis à jour avec succès");
      this.dialogUpdate = false;
      this.fetchUsers(); // Recharger la liste
    } catch (error) {
      console.error('Erreur update:', error);
      alert('Erreur lors de la modification');
    } finally {
      this.updating = false;
    }
  },
  },
};
</script>