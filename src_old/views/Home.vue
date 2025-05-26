<template>
  <div class="home">
    <v-row>
      <v-col cols="12" sm="4">
        <v-hover v-slot="{ hover }" open-delay="200">
          <v-card
            style="
              background: #4dd0e1;
              background: -webkit-linear-gradient(to right, #4dd0e1, #3a1c71);
              background: linear-gradient(to right, #4dd0e1, #3a1c71);
            "
            color="cyan darken-1"
            :elevation="hover ? 16 : 2"
          >
            <v-row>
              <v-col cols="12" >
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="mb-4">
                      <v-btn color="cyan white--text lighten-2" elevation="0">
                        Nbre de dossiers sinistres
                      </v-btn>
                    </div>
                    <v-list-item-title class="headline mb-1 white--text">
                      .....
                    </v-list-item-title>
                    <v-list-item-subtitle class="white--text"
                      >.....</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-col>
      
            </v-row>
          </v-card>
        </v-hover>
      </v-col>
      <v-col cols="12" sm="4">
        <v-hover v-slot="{ hover }" open-delay="200">
          <v-card
            style="
              background: #f06292;
              background: -webkit-linear-gradient(to right, #f06292, #3a1c71);
              background: linear-gradient(to right, #f06292, #3a1c71);
            "
            color="pink darken-1"
            :elevation="hover ? 16 : 2"
          >
            <v-row>
              <v-col cols="12">
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="mb-4">
                      <v-btn color="pink white--text lighten-2" elevation="0">
                        Nbre de dossiers traités
                      </v-btn>
                    </div>
                    <v-list-item-title class="headline mb-1 white--text">
                      .....
                    </v-list-item-title>
                    <v-list-item-subtitle class="white--text"
                      >.....</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-col>
           
            </v-row>
          </v-card>
        </v-hover>
      </v-col>
      <v-col cols="12" sm="4">
        <v-hover v-slot="{ hover }" open-delay="200">
          <v-card
            style="
              background: #fb8c00;
              background: -webkit-linear-gradient(to right, #fb8c00, #3a1c71);
              background: linear-gradient(to right, #fb8c00, #3a1c71);
            "
            color="orange darken-1"
            :elevation="hover ? 16 : 2"
          >
            <v-row>
              <v-col cols="12" >
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="mb-4">
                      <v-btn color="orange white--text lighten-2" elevation="0">
                        Nbre de dossiers en Suspens
                      </v-btn>
                    </div>
                    <v-list-item-title class="headline mb-1 white--text">
                      <v-row>
                        <v-col> ..... </v-col>
                      </v-row>
                    </v-list-item-title>
                    <v-list-item-subtitle class="white--text"
                      >.....</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-col>
         
            </v-row>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card class="elevation-0" height="100%">
          <v-app-bar flat color="rgba(0,0,0,0)">
            <v-toolbar-title class="title black--text pl-0 ml-2">
              Point graphique
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="#3A1C71" class="white--text mr-2">Semaine</v-btn>
            <v-btn color="#3A1C71 lighten-4" class="#3A1C71--text">Mois</v-btn>
          </v-app-bar>
          <v-sparkline
            :fill="fill"
            :line-width="width"
            :padding="padding"
            :smooth="radius || false"
            :value="value"
            auto-draw
            color="#3A1C71"
          ></v-sparkline>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card class="elevation-0" height="100%">
          <v-app-bar flat color="rgba(0,0,0,0)">
            <v-toolbar-title class="title black--text pl-0 ml-2">
              Point sur l'activité
            </v-toolbar-title>
          </v-app-bar>
          <v-app-bar flat color="rgba(0,0,0,0)" class="mb-10">
            <v-btn fab color="purple lighten-4" elevation="0">
              <v-img
                src="../assets/sheet.png"
                max-height="50"
                width="50"
                alt="logo"
              ></v-img>
            </v-btn>
            <v-toolbar-title class="title black--text ml-2">
              Dossiers Enregistrés
              <span class="caption"><br />Par rapport à la semaine passée</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title class="subtitle-1 black--text ml-2">
              ..... Fcfa
            </v-toolbar-title>
            <v-icon color="green" class="ml-2">fas fa-long-arrow-alt-up</v-icon>
          </v-app-bar>
          <v-app-bar flat color="rgba(0,0,0,0)">
            <v-btn fab color="green lighten-4" elevation="0">
              <v-img
                src="../assets/sheetMake.png"
                max-height="50"
                width="50"
                alt="logo"
              ></v-img>
            </v-btn>
            <v-toolbar-title class="title black--text ml-2">
              Dossiers Réglés
              <span class="caption"><br />Par rapport a la semaine passée</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title class="subtitle-1 black--text ml-2">
              ..... Fcfa
            </v-toolbar-title>
            <v-icon color="red" class="ml-2">fas fa-long-arrow-alt-down</v-icon>
          </v-app-bar>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" class="mt-10">
        <v-card class="elevation-0" height="100%">
          <v-row>
            <v-col cols="12" sm="4">
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="mb-4">Evolution Annuelle</div>
                  <v-list-item-title class="headline mb-1 black--text mb-2">
                    ..... Fcfa
                  </v-list-item-title>
                  <v-list-item-subtitle class="grey--text"
                    >..... Fcfa</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12" sm="8">
              <v-sparkline
                :value="value"
                :smooth="radius || false"
                :padding="padding"
                :line-width="width"
                :stroke-linecap="lineCap"
                :fill="fills"
                :type="type"
                :auto-line-width="autoLineWidth"
                auto-draw
                color="red"
              >
              </v-sparkline>
              <v-card-actions class="justify-end">
                <v-btn text color="green">
                  <v-icon class="mt-n2 pr-2">fas fa-sort-down</v-icon> 8.5
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" class="mt-10">
        <v-card flat color="#fff" height="100%">
          <v-row>
            <v-col cols="12" sm="6" class="">
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="mb-4">Rendement Mensuel</div>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-progress-circular
                        rotate="360"
                        size="100"
                        width="15"
                        value="70"
                        color="teal"
                      >
                        70%
                      </v-progress-circular>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-list-item-subtitle class="grey--text mt-8"
                        >..... FCFA</v-list-item-subtitle
                      >
                      <v-list-item-subtitle class="grey--text"
                        >..... FCFA</v-list-item-subtitle
                      >
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-sol cols="12" sm="6" align="center">
              <v-list-item two-line class="mt-10">
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1 black--text">
                    ..... FCFA
                  </v-list-item-title>
                  <v-list-item-subtitle class="grey--text"
                    >Totalité</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-sol>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="loading" persistent width="500">
              <div class="wrapper">
          <div class="box-wrap">
            <div class="box one"></div>
            <div class="box two"></div>
            <div class="box three"></div>
            <div class="box four"></div>
            <div class="box five"></div>
            <div class="box six"></div>
          </div>
        </div>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import { addFilendemnity } from "@/api/user";
import { defaultMethods, messages } from "../utils/data";
export default {
  name: "HomeComponent",
  data: () => ({
    tab: null,
    text: "center",
    fill: true,
    loading: false,
    padding: 8,
    radius: 10,
    value: [0, 2, 4, 16, 50, 100, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    width: 2,
    lineCap: "round",
    type: "trend",
    autoLineWidth: false,
    fills: false,
  }),
  computed: {
    ...mapGetters([
      "Files",
      "victimeDocumentListe",
      "victimeListe",
      "UserProfile",
      "productListe",
      "indemnityData",
      "Products",
      "Documents",
      "Victime",
      "victimeMailListe",
      "userListe",
      "statFile",
    ]),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  mounted() {
    this.initFiles();
  },
  methods: {
    ...mapActions([
      "getFiles",
      "getUserProfile",
      "getDocuments",
      "getProducts",
      "getVictimes",
      "getVictimesDoc",
      "getVictimeMail",
      "getUsers",
    ]),
    async initFiles() {
      this.loading = true;
      try {
        await this.getFiles({
          StartDate: this.StartDate,
          EndDate: this.EndDate,
          customerName: this.customerNameSearch,
          victimName: this.victimNameSearch,
          sinisterNumber: this.sinisterNumberSearch,
          statusSearch: this.statusSearch,
        });
        await this.getUserProfile();
        await this.getUsers();
        await this.getProducts();
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
<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-card__text
    color: #000
</style>
<style scoped>
.border {
  border-right: 1px solid grey;
}
.progresse {
 
}
.home {
  height: 100vh;
  margin: 20px !important;
  margin-top: 50px !important;
}

/*data loading*/

.wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -100px;
  width: 200px;
  height: 200px;
  background-color: transparent;
  border: none;
}
.wrapper .box-wrap {
  width: 70%;
  height: 70%;
  margin: calc((100% - 70%) / 2) calc((100% - 70%) / 2);
  position: relative;
  transform: rotate(-45deg);
}
.wrapper .box-wrap .box {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(135, 0, 0, 0.6);
  background: linear-gradient(
    to right,
    #141562,
    #486fbc,
    #eab5a1,
    #8dd6ff,
    #4973c9,
    #d07ca7,
    #f4915e,
    #f5919e,
    #b46f89,
    #141562,
    #486fbc
  );
  background-position: 0% 50%;
  background-size: 1000% 1000%;
  visibility: hidden;
}
.wrapper .box-wrap .box.one {
  animation: moveGradient 15s infinite, oneMove 3.5s infinite;
}
.wrapper .box-wrap .box.two {
  animation: moveGradient 15s infinite, twoMove 3.5s 0.15s infinite;
}
.wrapper .box-wrap .box.three {
  animation: moveGradient 15s infinite, threeMove 3.5s 0.3s infinite;
}
.wrapper .box-wrap .box.four {
  animation: moveGradient 15s infinite, fourMove 3.5s 0.575s infinite;
}
.wrapper .box-wrap .box.five {
  animation: moveGradient 15s infinite, fiveMove 3.5s 0.725s infinite;
}
.wrapper .box-wrap .box.six {
  animation: moveGradient 15s infinite, sixMove 3.5s 0.875s infinite;
}

@keyframes moveGradient {
  to {
    background-position: 100% 50%;
  }
}

@keyframes oneMove {
  0% {
    visibility: visible;
    clip-path: inset(0% 35% 70% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  14.2857% {
    clip-path: inset(0% 35% 70% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  28.5714% {
    clip-path: inset(35% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  42.8571% {
    clip-path: inset(35% 70% 35% 0 round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  57.1428% {
    clip-path: inset(35% 70% 35% 0 round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  71.4285% {
    clip-path: inset(0% 70% 70% 0 round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  85.7142% {
    clip-path: inset(0% 70% 70% 0 round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  100% {
    clip-path: inset(0% 35% 70% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
}

@keyframes twoMove {
  0% {
    visibility: visible;
    clip-path: inset(0% 70% 70% 0 round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  14.2857% {
    clip-path: inset(0% 70% 70% 0 round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  28.5714% {
    clip-path: inset(0% 35% 70% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  42.8571% {
    clip-path: inset(0% 35% 70% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  57.1428% {
    clip-path: inset(35% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  71.4285% {
    clip-path: inset(35% 70% 35% 0 round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  85.7142% {
    clip-path: inset(35% 70% 35% 0 round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  100% {
    clip-path: inset(0% 70% 70% 0 round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
}

@keyframes threeMove {
  0% {
    visibility: visible;
    clip-path: inset(35% 70% 35% 0 round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  14.2857% {
    clip-path: inset(35% 70% 35% 0 round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  28.5714% {
    clip-path: inset(0% 70% 70% 0 round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  42.8571% {
    clip-path: inset(0% 70% 70% 0 round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  57.1428% {
    clip-path: inset(0% 35% 70% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  71.4285% {
    clip-path: inset(0% 35% 70% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  85.7142% {
    clip-path: inset(35% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  100% {
    clip-path: inset(35% 70% 35% 0 round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
}

@keyframes fourMove {
  0% {
    visibility: visible;
    clip-path: inset(35% 0% 35% 70% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  14.2857% {
    clip-path: inset(35% 0% 35% 70% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  28.5714% {
    clip-path: inset(35% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  42.8571% {
    clip-path: inset(70% 35% 0% 35% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  57.1428% {
    clip-path: inset(70% 35% 0% 35% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  71.4285% {
    clip-path: inset(70% 0 0 70% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  85.7142% {
    clip-path: inset(70% 0 0 70% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  100% {
    clip-path: inset(35% 0% 35% 70% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
}

@keyframes fiveMove {
  0% {
    visibility: visible;
    clip-path: inset(70% 0 0 70% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  14.2857% {
    clip-path: inset(70% 0 0 70% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  28.5714% {
    clip-path: inset(35% 0% 35% 70% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  42.8571% {
    clip-path: inset(35% 0% 35% 70% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  57.1428% {
    clip-path: inset(35% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  71.4285% {
    clip-path: inset(70% 35% 0% 35% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  85.7142% {
    clip-path: inset(70% 35% 0% 35% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  100% {
    clip-path: inset(70% 0 0 70% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
}

@keyframes sixMove {
  0% {
    visibility: visible;
    clip-path: inset(70% 35% 0% 35% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  14.2857% {
    clip-path: inset(70% 35% 0% 35% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  28.5714% {
    clip-path: inset(70% 0 0 70% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  42.8571% {
    clip-path: inset(70% 0 0 70% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  57.1428% {
    clip-path: inset(35% 0% 35% 70% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  71.4285% {
    clip-path: inset(35% 0% 35% 70% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  85.7142% {
    clip-path: inset(35% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  100% {
    clip-path: inset(70% 35% 0% 35% round 5%);
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
}
</style>
