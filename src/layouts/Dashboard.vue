<template>
  <v-app id="inspire" fill-height>
    <v-tabs v-model="tab" height="59" color="#fff" flat class="firstBar fixed-bar ma-0 pa-0" app>
      <!-- <v-tabs-slider></v-tabs-slider> -->

      <div style="width: 120px;margin-left:10px;">
        <v-img src="../assets/nsia.png" max-height="200px" width="100%" alt="logo"></v-img>
      </div>
      <v-spacer></v-spacer>
      <v-tab class="tab" active-class="tab_color" color="#3A1C71" href="#tab-1">
        Gestion
      </v-tab>

      <v-tab active-class="tab_color" disabled href="#tab-2">
        Agenda
        <v-badge class="ml-10  shake " color="error" bordered overlap content="0">
          <v-icon color="#3A1C71" size="25">mdi-calendar-clock</v-icon>
        </v-badge>
      </v-tab>
      <v-tab active-class="tab_color" disabled href="#tab-3">
        Contact
        <div class="ml-10">
          <v-icon color="#3A1C71" size="25">mdi-contacts-outline</v-icon>
        </div>
      </v-tab>
      <v-spacer></v-spacer>

      <div class="mr-5 ml-5 mt-2 ">
        <v-text style="color: #5E5669; font-weight: bold;">
          {{ UserProfile.fullName }} </v-text><br />
        <v-text style="color: #5E5669;">{{ UserProfile.role }}</v-text>
      </div>
      <!-- <v-badge
        bordered
        bottom
        class="mr-10 mt-3"
        color="success"
        dot
        offset-x="10"
        offset-y="10"
      >
        <v-avatar size="40">
          <v-img
            src="../assets/avatar.jpg"
            max-height="200px"
            width="100%"
            alt="logo"
          ></v-img>
        </v-avatar>
      </v-badge> -->

      <div class="text-center">
        <v-menu v-model="profilMenu" :close-on-content-click="false" :nudge-width="500" offset-y bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar v-bind="attrs" v-on="on" size="50" class="mr-10 mt-2" color="grey lighten-4">
              <v-img v-if="profile.idPicture" :src="profile.idPicture"></v-img>
              <v-icon v-else color="#3A1C71"> mdi-account </v-icon>
            </v-avatar>
            <v-badge bordered bottom color="green" dot offset-x="-0" offset-y="15"></v-badge>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <v-img v-if="UserProfile.idPicture" :src="profile.idPicture"></v-img>
                  <v-icon v-else color="#3A1C71"> mdi-account </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ UserProfile.fullName }}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{
                    UserProfile.role
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
              <v-list-item>
                <v-row style="justify-content:space-between;  width: 100%">
                  <v-btn v-on:click="updateUserProfile = true" color="#fff" class="clickable textColor2 ml-5" dark
                    width="auto">
                    <v-icon class="mr-5">mdi-account-alert-outline</v-icon>
                    Modifier le profil
                  </v-btn>

                  <v-btn v-on:click="logoutMethods" color="#fff" class="clickable textColor2 mr-5" dark width="auto">
                    Se déconnecter<v-icon class="ml-5">mdi-power</v-icon>
                  </v-btn>
                </v-row>
              </v-list-item>
            </v-list>

            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </v-tabs>


    <v-tabs-items v-model="tab">
      <v-tab-item value="tab-1">
        <!-- <v-toolbar class="firstBar fixed-bars ma-0 pa-0" height="60" flat app>
          <v-toolbar-items class=" ">
            <v-btn
              class="menuButton  elevation-0"
              active-class="border"
              v-for="item in menuItems"
              :value="value"
              :key="item.title"
              :to="item.route"
              :prepend-icon="item['icon-ctr']"
              :append-icon="item.model ? item.icon : item['icon-alt']"
            >
              <v-icon left dark>{{ item.icon }}</v-icon>
              {{ item.title }}
            </v-btn>
          </v-toolbar-items>
        </v-toolbar> -->
        <v-navigation-drawer left v-model="drawer" style="
        background:#3A1C71;
        background: -webkit-linear-gradient(to top, #4DD0E1, #3A1C71);
        background: linear-gradient(to top, #4DD0E1, #3A1C71);
      " app :width="SizeDrawer">
          <div v-if="hide">
            <v-list-group :value="true" :prepend-icon="iconRow" append-icon @click.stop="reaction()"
              class="menuButtonToggle" active-class="menuButtonToggle">
              <v-list-item route to="/" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-view-dashboard-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>
              <v-list-item route to="/callCenter" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-face-agent</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Ecoute client</v-list-item-title>
              </v-list-item>
              <v-list-item route to="/management" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-alert-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Référentiel</v-list-item-title>
              </v-list-item>
              <v-list-item route to="/pv" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-police-badge-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Procès-Verbal</v-list-item-title>
              </v-list-item>
              <v-list-item route to="/fmp" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-receipt-text-plus-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>FMP</v-list-item-title>
              </v-list-item>
              <v-list-item route to="/recours" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-source-branch-check</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Recours</v-list-item-title>
              </v-list-item>
              <!-- <v-list-item route to="/expertise-amiable" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-hospital-box-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Expertise amiable</v-list-item-title>
              </v-list-item> -->
              <v-list-item route to="/inventory" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-wallet-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Inventaire</v-list-item-title>
              </v-list-item>
              <!-- <v-list-item
                route
                to="/accord"
                class="menuButton"
                active-class="menuButton"
              >
                <v-list-item-action>
                  <v-icon>mdi-handshake-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Accord</v-list-item-title>
                </v-list-item-content>
              </v-list-item> -->

              <v-list-group :value="false" class="menuButtonToggle" active-class="menuButtonToggle"
                prepend-icon="mdi-router">
                <template v-slot:activator>
                  <v-list-item-title>Suivi</v-list-item-title>
                </template>

                <v-list-item class="menuButton" active-class="menuButton" v-for="([title, icon, route], i) in admins"
                  :key="i" link route :to="route">
                  <v-list-item-icon route :to="route">
                    <v-icon v-text="icon"></v-icon>
                  </v-list-item-icon>

                  <v-list-item-title route :to="route" v-text="title"></v-list-item-title>
                </v-list-item>
              </v-list-group>
              <v-list-group :value="false" prepend-icon="mdi-car" class="menuButtonToggle" active-class="menuButtonToggle">
                <template v-slot:activator>
                  <v-list-item-title>Réparation</v-list-item-title>
                </template>

                <v-list-item class="menuButton" active-class="menuButton" v-for="([title, icon, route], i) in repairList"
                  :key="i" link route :to="route">
                  <v-list-item-icon route :to="route">
                    <v-icon v-text="icon"></v-icon>
                  </v-list-item-icon>

                  <v-list-item-title route :to="route" v-text="title"></v-list-item-title>
                </v-list-item>
              </v-list-group>

              <v-list-group :value="false" class="menuButtonToggle" active-class="menuButtonToggle"
                prepend-icon="mdi-email-multiple-outline">
                <template v-slot:activator>
                  <v-list-item-title>Courrier</v-list-item-title>
                </template>

                <v-list-item class="menuButton" active-class="menuButton" v-for="([title, icon, route], i) in mailing"
                  :key="i" link route :to="route">
                  <v-list-item-icon route :to="route">
                    <v-icon v-text="icon"></v-icon>
                  </v-list-item-icon>

                  <v-list-item-title route :to="route" v-text="title"></v-list-item-title>
                </v-list-item>
              </v-list-group>
              <v-list-group :value="false" prepend-icon="mdi-chart-bell-curve-cumulative" class="menuButtonToggle" active-class="menuButtonToggle">
                <template v-slot:activator>
                  <v-list-item-title>Statistiques</v-list-item-title>
                </template>

                <v-list-item class="menuButton" active-class="menuButton" v-for="([title, icon, route], i) in statistique"
                  :key="i" link route :to="route">
                  <v-list-item-icon route :to="route">
                    <v-icon v-text="icon"></v-icon>
                  </v-list-item-icon>

                  <v-list-item-title route :to="route" v-text="title"></v-list-item-title>
                </v-list-item>
              </v-list-group>
              <!-- <v-list-item
                route
                to="/statistique"
                class="menuButton"
                active-class="menuButton"
              >
                <v-list-item-action>
                  <v-icon>mdi-chart-line</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Statistique</v-list-item-title>
                </v-list-item-content>
              </v-list-item> -->
            </v-list-group>
          </div>

          <div v-if="hides">
            <v-list-group :value="true" prepend-icon="mdi-arrow-down-drop-circle-outline" append-icon
              @click.stop="reaction()">
              <v-list-item route to="/" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-view-dashboard-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>
              <v-list-item route to="/management" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-alert-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Référentiel</v-list-item-title>
              </v-list-item>

              <v-list-item route to="/pv" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-police-badge-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Procès Verbal</v-list-item-title>
              </v-list-item>

              <v-list-item route to="/expertise-amiable" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-hospital-box-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Expertise amiable</v-list-item-title>
              </v-list-item>
              <v-list-item route to="/inventory" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-wallet-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Inventaire</v-list-item-title>
              </v-list-item>
              <!-- <v-list-item
                route
                to="/accord"
                class="menuButton"
                active-class="menuButton"
              >
                <v-list-item-action>
                  <v-icon>mdi-handshake-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Accord</v-list-item-title>
                </v-list-item-content>
              </v-list-item> -->

              <v-list-group :value="false" prepend-icon="mdi-router">
                <template v-slot:activator>
                  <v-list-item-title>Suivi</v-list-item-title>
                </template>

                <v-list-item class="menuButton" active-class="menuButton" v-for="([title, icon, route], i) in admins"
                  :key="i" link route :to="route">
                  <v-list-item-icon route :to="route">
                    <v-icon v-text="icon"></v-icon>
                  </v-list-item-icon>

                  <v-list-item-title route :to="route" v-text="title"></v-list-item-title>
                </v-list-item>
              </v-list-group>

              <v-list-item route to="/mail" class="menuButton" active-class="menuButton">
                <v-list-item-action>
                  <v-icon>mdi-email-multiple-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Courrier</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item route to="/statistique" class="menuButton" active-class="menuButton">
                <v-list-item-action>
                  <v-icon>mdi-chart-line</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Statistique</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </div>
        </v-navigation-drawer>
        <router-view></router-view>
        <v-navigation-drawer right v-model="drawer" :width="SizeDrawers" app>
          <v-sheet class="sheetTitle" style="
        background:#3A1C71;
        background: -webkit-linear-gradient(to right, #4DD0E1, #3A1C71);
        background: linear-gradient(to right, #4DD0E1, #3A1C71);" height="60" width="100%">
            <h2 class="titleAlert">Demande client</h2>

       <v-btn icon class="shake elevation-0 mr-5" flat small @click="showNotifications = !showNotifications">
  <v-badge overlap color="error" :content="unreadNotificationsCount" v-if="unreadNotificationsCount > 0">
    <v-icon color="white" class="mr-2">mdi-bell-alert-outline</v-icon>
  </v-badge>
  <v-icon color="white" class="mr-2" v-else>mdi-bell-outline</v-icon>
</v-btn>

    <!-- Menu des notifications -->
    <v-menu v-model="showNotifications" :close-on-content-click="false" offset-y max-width="400">
      <v-card>
        <v-card-title class="pb-2">
          <span class="text-h6">Notifications ({{ unreadNotificationsCount }})</span>
          <v-spacer></v-spacer>
          <v-btn icon small @click="showNotifications = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <!-- Liste des notifications -->
        <v-list v-if="todos.length > 0" max-height="300" style="overflow-y: auto;">
          <v-list-item
            v-for="notification in todos"
            :key="notification.id"
            @click="markNotificationAsRead(notification.id)"
            :class="{ 'grey lighten-4': notification.read }"
          >
            <v-list-item-avatar>
              <v-icon :color="notification.read ? 'grey' : 'error'">
                {{
                  notification.type === 'first_reminder' ? 'mdi-numeric-1-circle' :
                  notification.type === 'second_reminder' ? 'mdi-numeric-2-circle' :
                  'mdi-numeric-3-circle'
                }}
              </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="text-wrap">
                {{ notification.message }}
              </v-list-item-title>
              <v-list-item-subtitle>
                Date: {{ notification.date }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon small @click.stop="markNotificationAsRead(notification.id)">
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <!-- Aucun résultat -->
        <v-card-text v-else class="text-center grey--text">
          Aucune notification
        </v-card-text>
      </v-card>
    </v-menu>
             
          </v-sheet>




    
          <v-list class="pl-0 pt-20 " style=" overflow: hidden !important" shaped>
            <v-img src="../assets/noPiority.png" max-height="200px" width="100%" alt="logo"></v-img>
          </v-list>
        </v-navigation-drawer>

        <!-- <v-navigation-drawer app clipped right>
      <v-list>
        <v-list-item class="pa-0" v-for="n in 30" :key="n" link>
          <v-list-item-content class="alertList">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
              explicabo enim suscipit a ab illo doloribus error eum laudantium
              incidunt. {{ n }}
            </p>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

        <!-- <v-navigation-drawer
        v-model="drawer"
        absolute
        color="grey lighten-3"
        mini-variant
      >
        <v-avatar
          class="d-block text-center mx-auto mt-4"
          color="grey darken-1"
          size="36"
        ></v-avatar>

        <v-divider class="mx-3 my-5"></v-divider>

        <v-avatar
          v-for="n in 6"
          :key="n"
          class="d-block text-center mx-auto mb-9"
          color="grey lighten-1"
          size="28"
        ></v-avatar>
      </v-navigation-drawer> -->
        <v-row justify="center">
          <v-dialog v-model="updateUserProfile" max-width="1000px">
            <v-card style="border-left:10px solid #3A1C71">
              <v-card-title>
                <span class="text-h5">Modifier les information de l'utilisateur</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12" class="mb-10">
                      <v-row>
                        <v-img elevation="1" style="border: 0.5px solid #3A1C71; padding:20px; border-radius:20px;"
                          class="mr-4" v-if="profile.idPicture" :src="profile.idPicture"></v-img>
                        <v-icon style="border: 0.5px solid #3A1C71; padding:20px; border-radius:20px; " v-else
                          elevation="1" class="mr-4" color="#3A1C71">
                          mdi-account
                        </v-icon>
                        <v-file-input small-chips prepend-icon="mdi-camera" truncate-length="50"
                          v-model="idPicture"></v-file-input>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field outlined label="Nom complet*" color="#3A1C71" v-model="profile.fullName"
                        required></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="12" md="6">
                      <v-text-field outlined label="Mail*" color="#3A1C71" v-model="profile.email"
                        required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field outlined label="Téléphone*" color="#3A1C71" v-model="profile.phone"
                        required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field outlined label="Post Actuel*" color="#3A1C71" v-model="profile.role"
                        required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field outlined type="password" prepend-inner-icon="mdi-lock" label="Mots de passe Actuels*"
                        color="#3A1C71" v-model="profile.oldPassword" required></v-text-field>

                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="profile.passwords" :rules="passwordRules"
                        :type="passwordShow ? 'text' : 'password'" label="nouveau mots de passe*"
                        placeholder="nouveau mots de passe*" prepend-inner-icon="mdi-lock" outlined color="#3A1C71"
                        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="passwordShow = !passwordShow"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*Indique les informations requises</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="white--text ma-2" color="error" text @click="dialog = false">
                  Fermer
                </v-btn>
                <v-btn class="white--text ma-2" color="success" @click="onUpdatedUserProfile">
                  Enregistrer
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

       
      </v-tab-item>

      <v-tab-item value="tab-2">
        <v-navigation-drawer left v-model="drawer" style="
        background:#3A1C71;
        background: -webkit-linear-gradient(to top, #4DD0E1, #3A1C71);
        background: linear-gradient(to top, #4DD0E1, #3A1C71);
      " app :width="SizeDrawer">
          <div v-if="hide">
            <v-list-group :value="true" :prepend-icon="iconRow" append-icon @click.stop="reaction()"
              class="menuButtonToggle" active-class="menuButtonToggle">
              <v-list-item route to="/" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-view-dashboard-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>
              <v-list-item route to="/management" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-alert-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Référentiel</v-list-item-title>
              </v-list-item>
              <v-list-item route to="/pv" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-police-badge-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Procès-Verbal</v-list-item-title>
              </v-list-item>
              <v-list-item route to="/fmp" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-receipt-text-plus-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>FMP</v-list-item-title>
              </v-list-item>
              <v-list-item route to="/recours" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-source-branch-check</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Recours</v-list-item-title>
              </v-list-item>
              <v-list-item route to="/expertise-amiable" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-hospital-box-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Expertise amiable</v-list-item-title>
              </v-list-item>
              <v-list-item route to="/inventory" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-wallet-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Inventaire</v-list-item-title>
              </v-list-item>
              <!-- <v-list-item
                route
                to="/accord"
                class="menuButton"
                active-class="menuButton"
              >
                <v-list-item-action>
                  <v-icon>mdi-handshake-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Accord</v-list-item-title>
                </v-list-item-content>
              </v-list-item> -->

              <v-list-group :value="false" class="menuButtonToggle" active-class="menuButtonToggle"
                prepend-icon="mdi-router">
                <template v-slot:activator>
                  <v-list-item-title>Suivi</v-list-item-title>
                </template>

                <v-list-item class="menuButton" active-class="menuButton" v-for="([title, icon, route], i) in admins"
                  :key="i" link route :to="route">
                  <v-list-item-icon route :to="route">
                    <v-icon v-text="icon"></v-icon>
                  </v-list-item-icon>

                  <v-list-item-title route :to="route" v-text="title"></v-list-item-title>
                </v-list-item>
              </v-list-group>
              <v-list-group :value="false" prepend-icon="mdi-router">
                <template v-slot:activator>
                  <v-list-item-title>Réparation</v-list-item-title>
                </template>

                <v-list-item class="menuButton" active-class="menuButton" v-for="([title, icon, route], i) in repairList"
                  :key="i" link route :to="route">
                  <v-list-item-icon route :to="route">
                    <v-icon v-text="icon"></v-icon>
                  </v-list-item-icon>

                  <v-list-item-title route :to="route" v-text="title"></v-list-item-title>
                </v-list-item>
              </v-list-group>
              <v-list-item route to="/mail" class="menuButton" active-class="menuButton">
                <v-list-item-action>
                  <v-icon>mdi-email-multiple-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Courrier</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <!-- <v-list-item
                route
                to="/statistique"
                class="menuButton"
                active-class="menuButton"
              >
                <v-list-item-action>
                  <v-icon>mdi-chart-line</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Statistique</v-list-item-title>
                </v-list-item-content>
              </v-list-item> -->
            </v-list-group>
          </div>

          <div v-if="hides">
            <v-list-group :value="true" prepend-icon="mdi-arrow-down-drop-circle-outline" append-icon
              @click.stop="reaction()">
              <v-list-item route to="/" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-view-dashboard-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>
              <v-list-item route to="/management" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-alert-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Référentiel</v-list-item-title>
              </v-list-item>

              <v-list-item route to="/pv" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-police-badge-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Procès Verbal</v-list-item-title>
              </v-list-item>

              <v-list-item route to="/expertise-amiable" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-hospital-box-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Expertise amiable</v-list-item-title>
              </v-list-item>
              <v-list-item route to="/inventory" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-wallet-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Inventaire</v-list-item-title>
              </v-list-item>
              <!-- <v-list-item
                route
                to="/accord"
                class="menuButton"
                active-class="menuButton"
              >
                <v-list-item-action>
                  <v-icon>mdi-handshake-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Accord</v-list-item-title>
                </v-list-item-content>
              </v-list-item> -->

              <v-list-group :value="false" prepend-icon="mdi-router">
                <template v-slot:activator>
                  <v-list-item-title>Suivi</v-list-item-title>
                </template>

                <v-list-item class="menuButton" active-class="menuButton" v-for="([title, icon, route], i) in admins"
                  :key="i" link route :to="route">
                  <v-list-item-icon route :to="route">
                    <v-icon v-text="icon"></v-icon>
                  </v-list-item-icon>

                  <v-list-item-title route :to="route" v-text="title"></v-list-item-title>
                </v-list-item>
              </v-list-group>

              <v-list-item route to="/mail" class="menuButton" active-class="menuButton">
                <v-list-item-action>
                  <v-icon>mdi-email-multiple-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Courrier</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item route to="/statistique" class="menuButton" active-class="menuButton">
                <v-list-item-action>
                  <v-icon>mdi-chart-line</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Statistique</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </div>
        </v-navigation-drawer>
        <!-- calendrier romario -->
        <v-card class="illustrationCenter elevation-0">
          <v-img src="../assets/constructe.png" max-height="600" max-width="600" alt="logo"></v-img>
        </v-card>
        <v-navigation-drawer right v-model="drawer" :width="SizeDrawers" app>
          <v-sheet class="sheetTitle" style="
        background:#3A1C71;
        background: -webkit-linear-gradient(to right, #4DD0E1, #3A1C71);
        background: linear-gradient(to right, #4DD0E1, #3A1C71);
    
      " height="60" width="100%">
            <h2 class="titleAlert">Liste priorité</h2>

            <v-btn icon class=" shake elevation-0 mr-5" flat small>
              <v-badge overlap color="error" content="0">
                <v-icon color="white" class="mr-2">mdi-bell-alert-outline</v-icon></v-badge>
            </v-btn>
          </v-sheet>

          <v-list class="pl-0 pt-20 " style=" overflow: hidden !important" shaped>
            <v-img src="../assets/noPiority.png" max-height="200px" width="100%" alt="logo"></v-img>

            <!-- <v-card flat class="ma-0" v-for="n in 30" :key="n" link>
              <v-sheet flat class="alertList">
                <v-card class="d-flex justify-start mb-3" flat>
                  <span class="listLibele">
                    Rendez-vous
                  </span>
                </v-card>

                <p>
                  Pièce / 2022PD0080 / SOGEA SATOM / ayant droit Nadine Silva.
                </p>
              </v-sheet>
            </v-card> -->
          </v-list>
        </v-navigation-drawer>
        <!-- <v-row>

          <v-col>

            <v-sheet height="64">
              <v-toolbar flat>
                <v-btn
                  outlined
                  class="mr-4"
                  color="grey darken-2"
                  @click="setToday"
                >
                  Today
                </v-btn>
                <v-btn fab text small color="grey darken-2" @click="prev">
                  <v-icon small>
                    mdi-chevron-left
                  </v-icon>
                </v-btn>
                <v-btn fab text small color="grey darken-2" @click="next">
                  <v-icon small>
                    mdi-chevron-right
                  </v-icon>
                </v-btn>
                <v-toolbar-title v-if="$refs.calendar">
                  {{ $refs.calendar.title }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-menu bottom right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      outlined
                      color="grey darken-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <span>{{ typeToLabel[type] }}</span>
                      <v-icon right>
                        mdi-menu-down
                      </v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="type = 'day'">
                      <v-list-item-title>Day</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'week'">
                      <v-list-item-title>Week</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'month'">
                      <v-list-item-title>Month</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = '4day'">
                      <v-list-item-title>4 days</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-toolbar>
            </v-sheet>
            <v-sheet height="850">
              <v-calendar
                ref="calendar"
                v-model="focus"
                color="primary"
                :events="events"
                :event-color="getEventColor"
                :type="type"
                @click:event="showEvent"
                @click:more="viewDay"
                @click:date="viewDay"
                @change="updateRange"
              ></v-calendar>
              <v-menu
                v-model="selectedOpen"
                :close-on-content-click="false"
                :activator="selectedElement"
                offset-x
              >
                <v-card color="grey lighten-4" min-width="350px" flat>
                  <v-toolbar :color="selectedEvent.color" dark>
                    <v-btn icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-toolbar-title
                      v-html="selectedEvent.name"
                    ></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                    <span v-html="selectedEvent.details"></span>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn text color="secondary" @click="selectedOpen = false">
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-sheet>
          </v-col>
        </v-row> -->
        <v-footer class="footer" style="

        background:#3A1C71;
        background: -webkit-linear-gradient(to right, #4DD0E1, #3A1C71);
        background: linear-gradient(to right, #4DD0E1, #3A1C71);
      " app height="60">
          <v-text class="appName">REFERENTIEL DE SUIVI SINISTRE</v-text>

          <v-spacer></v-spacer>
          <div style="width: 150px;margin-left:10px;">
            <v-img src="../assets/ciad.png" max-height="200px" width="120" alt="logo"></v-img>
          </div>
        </v-footer>
      </v-tab-item>
      <v-tab-item value="tab-3">
        <v-navigation-drawer left v-model="drawer" style="
        background:#3A1C71;
        background: -webkit-linear-gradient(to top, #4DD0E1, #3A1C71);
        background: linear-gradient(to top, #4DD0E1, #3A1C71);
      " app :width="SizeDrawer">
          <div v-if="hide">
            <v-list-group :value="true" :prepend-icon="iconRow" append-icon @click.stop="reaction()"
              class="menuButtonToggle" active-class="menuButtonToggle">
              <v-list-item route to="/" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-view-dashboard-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>
              <v-list-item route to="/management" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-alert-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Référentiel</v-list-item-title>
              </v-list-item>
              <v-list-item route to="/pv" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-police-badge-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Procès-Verbal</v-list-item-title>
              </v-list-item>
              <v-list-item route to="/fmp" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-receipt-text-plus-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>FMP</v-list-item-title>
              </v-list-item>
              <v-list-item route to="/recours" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-source-branch-check</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Recours</v-list-item-title>
              </v-list-item>
              <v-list-item route to="/expertise-amiable" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-hospital-box-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Expertise amiable</v-list-item-title>
              </v-list-item>
              <v-list-item route to="/inventory" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-wallet-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Inventaire</v-list-item-title>
              </v-list-item>
              <!-- <v-list-item
                route
                to="/accord"
                class="menuButton"
                active-class="menuButton"
              >
                <v-list-item-action>
                  <v-icon>mdi-handshake-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Accord</v-list-item-title>
                </v-list-item-content>
              </v-list-item> -->

              <v-list-group :value="false" class="menuButtonToggle" active-class="menuButtonToggle"
                prepend-icon="mdi-router">
                <template v-slot:activator>
                  <v-list-item-title>Suivi</v-list-item-title>
                </template>

                <v-list-item class="menuButton" active-class="menuButton" v-for="([title, icon, route], i) in admins"
                  :key="i" link route :to="route">
                  <v-list-item-icon route :to="route">
                    <v-icon v-text="icon"></v-icon>
                  </v-list-item-icon>

                  <v-list-item-title route :to="route" v-text="title"></v-list-item-title>
                </v-list-item>
              </v-list-group>
             <v-list-group :value="false" prepend-icon="mdi-router">
                <template v-slot:activator>
                  <v-list-item-title>Réparation</v-list-item-title>
                </template>

                <v-list-item class="menuButton" active-class="menuButton" v-for="([title, icon, route], i) in repairList"
                  :key="i" link route :to="route">
                  <v-list-item-icon route :to="route">
                    <v-icon v-text="icon"></v-icon>
                  </v-list-item-icon>

                  <v-list-item-title route :to="route" v-text="title"></v-list-item-title>
                </v-list-item>
              </v-list-group>

              <v-list-item route to="/mail" class="menuButton" active-class="menuButton">
                <v-list-item-action>
                  <v-icon>mdi-email-multiple-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Courrier</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <!-- <v-list-item
                route
                to="/statistique"
                class="menuButton"
                active-class="menuButton"
              >
                <v-list-item-action>
                  <v-icon>mdi-chart-line</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Statistique</v-list-item-title>
                </v-list-item-content>
              </v-list-item> -->
            </v-list-group>
          </div>

          <div v-if="hides">
            <v-list-group :value="true" prepend-icon="mdi-arrow-down-drop-circle-outline" append-icon
              @click.stop="reaction()">
              <v-list-item route to="/" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-view-dashboard-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>
              <v-list-item route to="/management" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-alert-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Référentiel</v-list-item-title>
              </v-list-item>

              <v-list-item route to="/pv" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-police-badge-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Procès Verbal</v-list-item-title>
              </v-list-item>

              <v-list-item route to="/expertise-amiable" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-hospital-box-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Expertise amiable</v-list-item-title>
              </v-list-item>
              <v-list-item route to="/inventory" class="menuButton" active-class="menuButton">
                <v-list-item-icon>
                  <v-icon>mdi-wallet-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-title>Inventaire</v-list-item-title>
              </v-list-item>
              <!-- <v-list-item
                route
                to="/accord"
                class="menuButton"
                active-class="menuButton"
              >
                <v-list-item-action>
                  <v-icon>mdi-handshake-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Accord</v-list-item-title>
                </v-list-item-content>
              </v-list-item> -->

              <v-list-group :value="false" prepend-icon="mdi-router">
                <template v-slot:activator>
                  <v-list-item-title>Suivi</v-list-item-title>
                </template>

                <v-list-item class="menuButton" active-class="menuButton" v-for="([title, icon, route], i) in admins"
                  :key="i" link route :to="route">
                  <v-list-item-icon route :to="route">
                    <v-icon v-text="icon"></v-icon>
                  </v-list-item-icon>

                  <v-list-item-title route :to="route" v-text="title"></v-list-item-title>
                </v-list-item>
              </v-list-group>

              <v-list-item route to="/mail" class="menuButton" active-class="menuButton">
                <v-list-item-action>
                  <v-icon>mdi-email-multiple-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Courrier</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item route to="/statistique" class="menuButton" active-class="menuButton">
                <v-list-item-action>
                  <v-icon>mdi-chart-line</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Statistique</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </div>
        </v-navigation-drawer>
        <!-- calendrier romario -->
        <v-card class="illustrationCenter elevation-0">
          <v-img src="../assets/constructe.png" max-height="600" max-width="600" alt="logo"></v-img>
        </v-card>
        <v-navigation-drawer right v-model="drawer" :width="SizeDrawers" app>
          <v-sheet class="sheetTitle" style="
        background:#3A1C71;
        background: -webkit-linear-gradient(to right, #4DD0E1, #3A1C71);
        background: linear-gradient(to right, #4DD0E1, #3A1C71);
    
      " height="60" width="100%">
            <h2 class="titleAlert">Liste priorité</h2>

            <v-btn icon class=" shake elevation-0 mr-5" flat small>
              <v-badge overlap color="error" content="0">
                <v-icon color="white" class="mr-2">mdi-bell-alert-outline</v-icon></v-badge>
            </v-btn>
          </v-sheet>

          <v-list class="pl-0 pt-20 " style=" overflow: hidden !important" shaped>
            <v-img src="../assets/noPiority.png" max-height="200px" width="100%" alt="logo"></v-img>

            <!-- <v-card flat class="ma-0" v-for="n in 30" :key="n" link>
              <v-sheet flat class="alertList">
                <v-card class="d-flex justify-start mb-3" flat>
                  <span class="listLibele">
                    Rendez-vous
                  </span>
                </v-card>

                <p>
                  Pièce / 2022PD0080 / SOGEA SATOM / ayant droit Nadine Silva.
                </p>
              </v-sheet>
            </v-card> -->
          </v-list>
        </v-navigation-drawer>
        <!-- <v-row>

          <v-col>

            <v-sheet height="64">
              <v-toolbar flat>
                <v-btn
                  outlined
                  class="mr-4"
                  color="grey darken-2"
                  @click="setToday"
                >
                  Today
                </v-btn>
                <v-btn fab text small color="grey darken-2" @click="prev">
                  <v-icon small>
                    mdi-chevron-left
                  </v-icon>
                </v-btn>
                <v-btn fab text small color="grey darken-2" @click="next">
                  <v-icon small>
                    mdi-chevron-right
                  </v-icon>
                </v-btn>
                <v-toolbar-title v-if="$refs.calendar">
                  {{ $refs.calendar.title }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-menu bottom right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      outlined
                      color="grey darken-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <span>{{ typeToLabel[type] }}</span>
                      <v-icon right>
                        mdi-menu-down
                      </v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="type = 'day'">
                      <v-list-item-title>Day</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'week'">
                      <v-list-item-title>Week</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'month'">
                      <v-list-item-title>Month</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = '4day'">
                      <v-list-item-title>4 days</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-toolbar>
            </v-sheet>
            <v-sheet height="850">
              <v-calendar
                ref="calendar"
                v-model="focus"
                color="primary"
                :events="events"
                :event-color="getEventColor"
                :type="type"
                @click:event="showEvent"
                @click:more="viewDay"
                @click:date="viewDay"
                @change="updateRange"
              ></v-calendar>
              <v-menu
                v-model="selectedOpen"
                :close-on-content-click="false"
                :activator="selectedElement"
                offset-x
              >
                <v-card color="grey lighten-4" min-width="350px" flat>
                  <v-toolbar :color="selectedEvent.color" dark>
                    <v-btn icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-toolbar-title
                      v-html="selectedEvent.name"
                    ></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                    <span v-html="selectedEvent.details"></span>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn text color="secondary" @click="selectedOpen = false">
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-sheet>
          </v-col>
        </v-row>
        
         <v-footer class="footer" style="

        background:#3A1C71;
        background: -webkit-linear-gradient(to right, #4DD0E1, #3A1C71);
        background: linear-gradient(to right, #4DD0E1, #3A1C71);
      " app height="60">
          <v-text class="appName">REFERENTIEL DE SUIVI SINISTRE</v-text>

          <v-spacer></v-spacer>
          <div style="width: 150px;margin-left:10px;">
            <v-img src="../assets/ciad.png" max-height="200px" width="120" alt="logo"></v-img>
          </div>
        </v-footer> -->
       
      </v-tab-item>
    </v-tabs-items>
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { logout } from "@/api/auth";
import { updateUsers } from "@/api/user";
import { defaultMethods, messages } from "@/utils/data";

export default {
  name:'DashboardComponent',
  data: () => ({
    tab: null,
    showNotifications: false,
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    drawer: true,
    sidebar: false,
    todos: [],
    passwordShow: false,
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 6) || "Password must be 6  characters or more!",
    ],
    admins: [
      ["Expertise", "mdi-pan-right", "/expertise"],
      ["Etude / Offre", "mdi-pan-right", "/etude"],
      ["Chèque", "mdi-pan-right", "/cheque"],
      ["Bon", "mdi-pan-right", "/bon"],
      // ["Pool", "mdi-dots-horizontal", "/pool"],
      ["Contentieux", "mdi-pan-right", "/litigation"],
    ],
    mailing: [
      ["Arrivée", "mdi-pan-right", "/mail"],
      ["Départ", "mdi-pan-right", "/mailSortie"],
    ],
    repairList: [
      ["Gestionnaire", "mdi-pan-right", "/reparation"],
      ["Garagiste", "mdi-pan-right", "/mecha"],
    ],
    statistique: [
            ["Référentiel", "mdi-pan-right", "/statReferentiel"],
      ["Psap", "mdi-pan-right", "/statPsap"],
      ["Règlements", "mdi-pan-right", "/statReglement"],
      ["Inventaire", "mdi-pan-right", "/statInventaire"],

      ["Chèque", "mdi-pan-right", "/statCheque"],
      ["Recours", "mdi-pan-right", "/statRecours"],
      ["Courriers", "mdi-pan-right", "/statMail"],
      ["Réparation", "mdi-pan-right", "/statRepaire"],
      ["Bon", "mdi-pan-right", "/statBon"],
      ["Pv", "mdi-pan-right", "/statPv"],
      ["Contentieux", "mdi-pan-right", "/statContentieux"],

      ["Ecoute client", "mdi-pan-right", "/statCallCenter"],
      ["Etude", "mdi-pan-right", "/statEtude"],
    ],
    menuItems: [
      { title: "Home", route: "/", isAdmin: true, isUser: true, icon: "home" },
      {
        title: "Référentiel",
        route: "/management",
        isAdmin: true,
        isUser: true,
        icon: "mdi-alert-outline",
      },
      {
        title: "Procès Verbal",
        route: "/pv",
        isAdmin: true,
        isUser: true,
        icon: "mdi-police-badge-outline",
      },
      {
        title: "Expertise amiable",
        route: "/expertise-amiable",
        isAdmin: true,
        isUser: true,
        icon: "mdi-school-outline",
      },
      {
        title: "Inventaire",
        isAdmin: true,
        isUser: true,
        route: "/inventory",
        icon: "mdi-wallet-outline",
      },
      {
        title: "Accord",
        isAdmin: true,
        isUser: true,
        route: "/accord",
        icon: "mdi-wallet-outline",
      },
      {
        title: "Suivi Expertise",
        isAdmin: true,
        isUser: true,
        route: "/expertise",
        icon: "mdi-email-multiple-outline",
      },
      {
        title: "Suivi chèque",
        isAdmin: true,
        isUser: true,
        route: "/cheque",
        icon: "mdi-email-multiple-outline",
      },
      {
        title: "Suivi bon",
        isAdmin: true,
        isUser: true,
        route: "/bon",
        icon: "mdi-email-multiple-outline",
      },
      {
        title: "Suivi Etude / Offre",
        isAdmin: true,
        isUser: true,
        route: "/etude",
        icon: "mdi-email-multiple-outline",
      },
      {
        title: "Courrier",
        isAdmin: true,
        isUser: true,
        route: "/mail",
        icon: "mdi-email-multiple-outline",
      },
      // {
      //   title: "Statistique",
      //   isAdmin: true,
      //   isUser: true,
      //   route: "/statistique",
      //   icon: "mdi-chart-line",
      // },
    ],
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    SizeDrawer: "250",
    SizeDrawers: "250",
    updateUserProfile: false,
    hide: true,
    hides: false,
    iconRow: "mdi-arrow-down-drop-circle-outline",
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
  }),
mounted() {
  console.log("Mounted hook appelé"); // Ajouter cette ligne
    this.loadNotifications();
  this.$refs.calendar.checkChange();
  this.getUserProfile();
  document.body.style.zoom = "80%";
  if (this.isAdmin) {
    this.getAdminProfile();
  }
},
  created() {
    this.getPlaintListe();
  },
  computed: {
    ...mapGetters(["UserProfile", "AdminProfile", "plaint"]),
    isAdmin() {
      if (localStorage.getItem("admin-token")) return true;
      return false;
    },
    isUser() {
      if (localStorage.getItem("user-token")) return true;
      return false;
    },
    profile() {
      if (this.UserProfile && this.UserProfile._id) return this.UserProfile;
      else return this.AdminProfile;
    },
    unreadNotificationsCount() {
      return this.todos.filter(n => !n.read).length;
    },
  },
  methods: {
    ...mapActions(["getAdminProfile", "getUserProfile", "getRecour", "getPlaint"]),
    reaction() {
      if (this.SizeDrawer == "60" && this.hide == false) {
        this.iconRow = "mdi-arrow-right-drop-circle-outline";
        this.hides = false;
        this.SizeDrawer = "250";
        this.SizeDrawers = "250";
        this.hide = true;
      } else if (this.SizeDrawer == "250" && this.hides == false) {
        this.iconRow = "mdi-arrow-down-drop-circle-outline";
        this.hide = false;
        this.SizeDrawer = "60";
        this.SizeDrawers = "0";
        this.hides = true;
      }
    },



async loadNotifications() {
  console.log("🔄 Chargement des notifications...");

  try {
    const files = await this.getRecour({
      appealExerciseDateStart: "",
      appealExerciseDateEnd: "",
      fileName: "",
      sinisterNumber: "",
      status: "",
      periodStartDate: "",
      periodEndDate: ""
    });

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const notifications = [];

    files.forEach((file) => {
      ['firstReminderDate', 'secondReminderDate', 'thirdReminderDate'].forEach((field, i) => {
        const rawDate = file[field];

        if (rawDate) {
          const reminderDate = new Date(rawDate);
          const reminderDateStr = reminderDate.toISOString().split('T')[0];

          if (reminderDateStr === todayStr) {
            notifications.push({
              id: `${['first', 'second', 'third'][i]}_${file._id}`,
              message: `${['Première', 'Deuxième', 'Troisième'][i]} relance due pour le dossier ${file.sinisterNumber || file._id}`,
              type: `${['first', 'second', 'third'][i]}_reminder`,
              date: rawDate,
              read: false
            });
          }
        }
      });
    });

    // 💾 Charger les notifications déjà marquées comme lues depuis localStorage
    const readIds = JSON.parse(localStorage.getItem('readNotifications') || '[]');

    // 🔄 Appliquer l'état "lu" à celles déjà lues
    notifications.forEach(notif => {
      if (readIds.includes(notif.id)) {
        notif.read = true;
      }
    });

    this.todos = notifications;

    console.log("✅ Notifications chargées :", this.todos);
  } catch (error) {
    console.error("❌ Erreur lors du chargement des notifications :", error);
  }
},




//marquer la notificaion comme lue
markNotificationAsRead(id) {
  const notif = this.todos.find(n => n.id === id);
  if (notif && !notif.read) {
    notif.read = true;

    // Sauvegarde dans le localStorage
    const readIds = JSON.parse(localStorage.getItem('readNotifications') || '[]');
    if (!readIds.includes(id)) {
      readIds.push(id);
      localStorage.setItem('readNotifications', JSON.stringify(readIds));
    }
  }
},









    async getPlaintListe() {

      await this.getPlaint({
        confimed: false
      });
      this.todos = this.plaint
    },
    async onUpdatedUserProfile() {
      // update

      try {
        const formData = new FormData();
        if (this.idPicture) {
          formData.append("avatar", this.idPicture);
        }
        formData.append("fullName", this.profile.fullName);
        formData.append("email", this.profile.email);
        formData.append("phone", this.profile.phone);
        formData.append("role", this.profile.currentPosition);
        if (this.profile.passwords) {
          formData.append("oldPassword", this.profile.oldPassword);
          formData.append("password", this.profile.passwords);
        }

        await updateUsers({
          schema: formData,
        });

        defaultMethods.dispatchSuccess(
          this.$store,
          messages.updatedSuccessfully("L'utilisateur")
        );
        this.logoutMethods();
      } catch (error) {
        alert(error);
      }
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
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
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    logoutMethods() {
      logout();
    },
    updateRange({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        });
      }

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>
<style>
.illustrationCenter {
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-top: 400;
  display: flex;
  margin-top: 20px;
}

.footer {
  background-color: #3a1c71 !important;
  justify-content: center;
  align-items: center;
  align-content: center;
  /* border-top: 10px solid white; */
}

.appName {
  font-size: 25px;
  font-weight: bold;
  color: #fff;
}

.sheetTitle {
  border-top: 0px solid #f4f7fe !important;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  display: flex;
  border-bottom: 0.3px solid #f4f7fe !important;
  position: sticky;
  position: -webkit-sticky;
  /* for Safari */
  top: 0em;
  z-index: 2;
  background-color: #3a1c71 !important;
  overflow: hidden !important;
}

.sheetTitle:hover {
  border-top: 0px solid #f4f7fe !important;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  display: flex;
  border-bottom: 0.3px solid #f4f7fe !important;
  position: sticky;
  position: -webkit-sticky;
  /* for Safari */
  top: 0em;
  z-index: 2;
  background-color: #3a1c71 !important;
}

.titleAlert {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.tab_color {
  border-top: 5px solid #3a1c71 !important;
  color: #3a1c71 !important;
}

.tab {
  border-bottom: 0px solid #fff !important;
}

.fixed-bar {
  position: sticky !important;
  position: -webkit-sticky !important;
  /* for Safari */
  z-index: 20 !important;
  top: 0em;
  height: 40px;
  border-bottom: 0.3px solid #f4f7fe !important;
}

.firstBar {
  background-color: #fff !important;
  margin-bottom: 10px !important;
  border-bottom: 0.3px solid #f4f7fe !important;
  max-height: 70px;
}

.border {
  margin-left: 10px;
  margin-right: 10px;
  background: #3a1c71 !important;
  border-radius: 50px;
  color: #3a1c71 !important;
}

.table {
  background-color: #3a1c71 !important;
  margin-top: 100px !important;
}

.listLibele {
  font-size: 15px !important;
  font-weight: bold !important;
  color: #3a1c71 !important;
}

.alertList--red {
  border-left: 4px solid orangered !important;
  margin-bottom: 10px;
  margin-left: 0px !important;
  padding: 5px;
  font-size: 12px;
  border-radius: 0px !important;
  background-color: #fff !important;
  border-bottom: 1px solid #f4f7fe;
  overflow: hidden !important;
}

.alertList--yellow {
  border-left: 4px solid red !important;
  margin-bottom: 10px;
  margin-left: 0px !important;
  padding: 5px;
  font-size: 12px;
  border-radius: 0px !important;
  background-color: #fff !important;
  border-bottom: 1px solid #f4f7fe;
  overflow: hidden !important;
}

.text-wrap {
  font-size: 15px;
  color: #A9A9A9;
  margin-left: 5px
}

.text-wrap-title {
  font-size: 15px;
  color: #708090;
  margin-left: 5px
}

.alertList--green {
  border-left: 4px solid green !important;
  margin-bottom: 10px;
  margin-left: 0px !important;
  padding: 5px;
  font-size: 12px;
  border-radius: 0px !important;
  background-color: #fff !important;
  border-bottom: 1px solid #f4f7fe;
  overflow: hidden !important;
}


.alertList {
  border-left: 5px solid #3a1c71 !important;
  margin-bottom: 10px;
  margin-left: 0px !important;
  padding: 5px;
  font-size: 12px;
  border-radius: 0px !important;
  background-color: #fff !important;
  border-bottom: 1px solid #f4f7fe;
  overflow: hidden !important;
}

.badge {
  background-color: #3a1c71;
  color: #fff;
  border-radius: 50px;
  padding: 8px;
  margin: 5px;
}

.badgeContainer {
  align-items: flex-end;
  align-content: flex-end;
  justify-content: flex-end;
}

.menuButton {
  margin-right: 10px !important;
  margin-top: 5px !important;
  margin-bottom: 5px !important;
  height: 40px !important;
  border-top-right-radius: 50px !important;
  border-bottom-right-radius: 50px !important;
  color: #fff !important;
}

.menuButton:hover {
  margin-left: 10px !important;
  height: 40px !important;
  margin-top: 5px !important;
  margin-bottom: 5px !important;
  border-top-right-radius: 50px !important;
  border-bottom-right-radius: 50px !important;
  color: white !important;
}

.menuButtonToggle {
  color: #fff !important;
}

.menuButtonToggle:hover {
  color: white !important;
}

.textColor2 {
  color: #fff !important;
  font-weight: bolder;
  background: #3a1c71;
  background: -webkit-linear-gradient(to right, #4dd0e1, #3a1c71);
  background: linear-gradient(to right, #4dd0e1, #3a1c71);
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  margin-left: 1500px !important;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  background-color: #3a1c71 !important;
}

::-webkit-scrollbar-thumb {
  background-color: #3a1c71;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #531c91;
}

::-webkit-scrollbar-thumb:active {
  background-color: #300f55;
}

.w-100 {
  width: 100%;
}

.shake {
  animation: shake-animation 4s ease infinite;
  transform-origin: 50% 50%;
}

@keyframes shake-animation {
  0% {
    transform: translate(0, 0);
  }

  1.78571% {
    transform: translate(5px, 0);
  }

  3.57143% {
    transform: translate(0, 0);
  }

  5.35714% {
    transform: translate(5px, 0);
  }

  7.14286% {
    transform: translate(0, 0);
  }

  8.92857% {
    transform: translate(5px, 0);
  }

  10.71429% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(0, 0);
  }
}

.shakeConstruct {
  animation: shake-animation 4s ease infinite;
  transform-origin: 50% 50%;
}

@keyframes shake-animation {
  0% {
    transform: translate(0, 0);
  }

  1.78571% {
    transform: translate(5px, 0);
  }

  3.57143% {
    transform: translate(0, 0);
  }

  5.35714% {
    transform: translate(5px, 0);
  }

  7.14286% {
    transform: translate(0, 0);
  }

  8.92857% {
    transform: translate(5px, 0);
  }

  10.71429% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(0, 0);
  }
}
</style>





