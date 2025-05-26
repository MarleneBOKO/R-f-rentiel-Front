import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import pv from "../views/pv.vue";
import mail from "../views/mail.vue";
import mailSortie from "../views/courrierSorti.vue";
import inventory from "../views/inventory.vue";
import cheque from "../views/cheque.vue";
import indemnite from "../views/indemnity.vue";
import etude from "../views/etude.vue";
import expertise from "../views/expertise.vue";
import bon from "../views/bon.vue";
import mecani from "../views/mecanique.vue";
import repaire from "../views/repaire.vue";
import Recour from "../views/recour";
import fmp from "../views/fmp";
import contrat from "../views/contrat";
import litigation from "../views/litigation";
import pool from "../views/pool";
import callCenter from "../views/callCenter"
import statPsapComponet from '../components/statistical/psap.vue'
import statChequeComponet from '../components/statistical/cheque.vue'
import statReglementComponet from '../components/statistical/reglement.vue'
import statPvComponet from '../components/statistical/pv.vue'
import statRecoursComponet from '../components/statistical/recours.vue'
import statMailComponet from '../components/statistical/mail.vue'
import statRepaireComponet from '../components/statistical/repaire.vue'
import statInventaireComponet from '../components/statistical/inventaire.vue'
import statBonComponet from '../components/statistical/bon.vue'
import statContentieuxComponet from '../components/statistical/contentieux.vue'
import statCallCenterComponet from '../components/statistical/callCenter.vue'
import statEtudeComponet from '../components/statistical/etude.vue'
import statReferentielComponet from '../components/statistical/referentiel.vue'

// import login from '../login'
//import App from '../App.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "loginApp",
    component: () => import("@/views/Login"),
    beforeEnter(to, from, next) {
      const user = localStorage.getItem("user-token");
      const admin = localStorage.getItem("admin-token");

      // student
      if (user || admin) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/",
    name: "Dashboard",
    component: () => import("@/layouts/Dashboard"),
    beforeEnter(to, from, next) {
      const user = localStorage.getItem("user-token");
      const admin = localStorage.getItem("admin-token");

      // student
      if (user || admin) {
        next();
      } else {
        next("/login");
      }
    },
    children: [
      {
        path: "/",
        name: "Dash",
        component: Home,
      },
      {
        path: "/management",
        name: "Management",
        component: () => import("@/views/Referentiel"),
      },

      {
        path: "/pv",
        name: "prospection",
        component: pv,
      },
      {
        path: "/callCenter",
        name: "Ecoute client",
        component: callCenter,
      },
      {
        path: "/expertise-amiable",
        name: "indemnity",
        component: indemnite,
      },
      {
        path: "/mail",
        name: "mail",
        component: mail,
      },
      {
        path: "/inventory",
        name: "mail",
        component: inventory,
      },
      {
        path: "/mailSortie",
        name: "mailSortie",
        component: mailSortie,
      },
      {
        path: "/fmp",
        name: "fmp",
        component: fmp,
      },
      {
        path: "/mecha",
        name: "mecanique",
        component: mecani,
      },
      {
        path: "/recours",
        name: "recours",
        component: Recour,
      },
      {
        path: "/reparation",
        name: "mecanique",
        component: repaire,
      },
      {
        path: "/expertise",
        name: "expertise",
        component: expertise,
      },
      {
        path: "/cheque",
        name: "cheque",
        component: cheque,
      },
      {
        path: "/etude",
        name: "etude",
        component: etude,
      },
      {
        path: "/bon",
        name: "mail",
        component: bon,
      },
      {
        path: "/statistique",
        name: "contrat",
        component: contrat,
      },
      {
        path: "/litigation",
        name: "Contentieux",
        component: litigation,
      },
      {
        path: "/pool",
        name: "Pool",
        component: pool,
      },

            {
        path: "/statPsap",
        name: "statPsapComponet",
        component: statPsapComponet,
      },
      {
        path: "/statCheque",
        name: "statChequeComponet",
        component: statChequeComponet,
      },
            {
        path: "/statReglement",
        name: "statReglementComponet",
        component: statReglementComponet,
      },
            {
        path: "/statPv",
        name: "statPvComponet",
        component: statPvComponet,
      },
            {
        path: "/statRecours",
        name: "statRecoursComponet",
        component: statRecoursComponet,
      },
            {
        path: "/statMail",
        name: "statMailComponet",
        component: statMailComponet,
      },
            {
        path: "/statRepaire",
        name: "statRepaireComponet",
        component: statRepaireComponet,
      },
      {
        path: "/statInventaire",
        name: "statInventaireComponet",
        component: statInventaireComponet,
      },
      {
        path: "/statBon",
        name: "statBonComponet",
        component: statBonComponet,
      },
      {
        path: "/statContentieux",
        name: "statContentieuxComponet",
        component: statContentieuxComponet,
      },
      {
        path: "/statCallCenter",
        name: "statCallCenterComponet",
        component: statCallCenterComponet,
      },
      {
        path: "/statEtude",
        name: "statEtudeComponet",
        component: statEtudeComponet,
      },
      {
        path: "/statReferentiel",
        name: "statReferentielComponet",
        component: statReferentielComponet,
      },

    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
